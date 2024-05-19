import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserService } from '../user.service';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<UserEntity>;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('getUserByUserCode', () => {
    it('deve retornar um usuário existente', async () => {
      const user = { userCode: 'test-user' } as UserEntity;
      mockRepository.findOne.mockResolvedValue(user);

      expect(await service.getUserByUserCode('test-user')).toEqual(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userCode: 'test-user' },
      });
    });

    it('deve criar e retornar um novo usuário se não existir', async () => {
      mockRepository.findOne.mockResolvedValue(null);
      const user = { userCode: 'new-user' } as UserEntity;
      mockRepository.save.mockResolvedValue(user);

      expect(await service.getUserByUserCode('new-user')).toEqual(user);
      expect(mockRepository.save).toHaveBeenCalled();
    });
  });
});

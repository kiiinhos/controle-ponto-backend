import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserRepository } from '../user.repository';
import { UserEntity } from '../user.entity';
import { Repository } from 'typeorm';

describe('UserRepository', () => {
  let repository: UserRepository;
  let mockRepo: Repository<UserEntity>;

  const mockRepository = {
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserRepository,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepository,
        },
      ],
    }).compile();

    repository = module.get<UserRepository>(UserRepository);
    mockRepo = module.get<Repository<UserEntity>>(
      getRepositoryToken(UserEntity),
    );
  });

  it('deve estar definido', () => {
    expect(repository).toBeDefined();
  });

  describe('getUserByUserCode', () => {
    it('deve retornar um usuário existente', async () => {
      const user = { userCode: 'test-user' } as UserEntity;
      mockRepository.findOne.mockResolvedValue(user);

      expect(await repository.getUserByUserCode('test-user')).toBe(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userCode: 'test-user' },
      });
    });

    it('deve retornar null se o usuário não for encontrado', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      expect(await repository.getUserByUserCode('unknown-user')).toBeNull();
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userCode: 'unknown-user' },
      });
    });
  });

  describe('register', () => {
    it('deve registrar um novo usuário', async () => {
      const user = { userCode: 'new-user' } as UserEntity;
      mockRepository.findOne.mockResolvedValue(null);
      mockRepository.save.mockResolvedValue(user);
      mockRepository.create.mockReturnValue(user);

      expect(await repository.register(user)).toBe(user);
      expect(mockRepository.save).toHaveBeenCalledWith(user);
      expect(mockRepository.create).toHaveBeenCalledWith(user);
    });

    it('deve retornar o usuário existente se ele já estiver registrado', async () => {
      const user = { userCode: 'existing-user' } as UserEntity;
      mockRepository.findOne.mockResolvedValue(user);

      expect(await repository.register(user)).toBe(user);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { userCode: user.userCode },
      });
    });
  });
});

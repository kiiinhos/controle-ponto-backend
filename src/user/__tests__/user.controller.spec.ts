import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from '../user.controller';
import { UserService } from '../user.service';
import { NotFoundException } from '@nestjs/common';

describe('UserController', () => {
  let controller: UserController;
  let service: UserService;

  const mockUserService = {
    getUserByUserCode: jest.fn().mockImplementation((userCode) => {
      if (userCode === 'existingUser') {
        return { userCode: 'existingUser' };
      }
      return null;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('getUser', () => {
    it('deve retornar um usuário existente', async () => {
      const result = await controller.getUser('existingUser');
      expect(result).toEqual({ userCode: 'existingUser' });
    });

    it('deve lançar uma exceção NotFoundException para um usuário inexistente', async () => {
      try {
        await controller.getUser('nonExistingUser');
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
        expect(e.message).toBe('User with userCode nonExistingUser not found');
      }
    });
  });
});

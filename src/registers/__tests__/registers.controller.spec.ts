import { Test, TestingModule } from '@nestjs/testing';
import { RegistersController } from '../registers.controller';
import { RegistersService } from '../registers.service';
import { UserEntry, UserExit } from '../registers.interface';

describe('RegistersController', () => {
  let controller: RegistersController;
  let service: RegistersService;

  const mockRegistersService = {
    getEntryHistory: jest.fn(),
    getExitHistory: jest.fn(),
    registryEntry: jest.fn(),
    registryExit: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistersController],
      providers: [
        {
          provide: RegistersService,
          useValue: mockRegistersService,
        },
      ],
    }).compile();

    controller = module.get<RegistersController>(RegistersController);
    service = module.get<RegistersService>(RegistersService);
  });

  it('deve estar definido', () => {
    expect(controller).toBeDefined();
  });

  describe('getEntryHistory', () => {
    it('deve retornar o histórico de entradas', async () => {
      const result: UserEntry[] = [
        {
          userCode: 'test-user',
          dateEntry: '2024-05-19',
          hourEntry: '10:00:00',
        },
      ];
      (service.getEntryHistory as jest.Mock).mockResolvedValue(result);

      expect(await controller.getEntryHistory('test-user')).toBe(result);
      expect(service.getEntryHistory).toHaveBeenCalledWith('test-user');
    });
  });

  describe('getExitHistory', () => {
    it('deve retornar o histórico de saídas', async () => {
      const result: UserExit[] = [
        { userCode: 'test-user', dateExit: '2024-05-19', hourExit: '18:00:00' },
      ];
      (service.getExitHistory as jest.Mock).mockResolvedValue(result);

      expect(await controller.getExitHistory('test-user')).toBe(result);
      expect(service.getExitHistory).toHaveBeenCalledWith('test-user');
    });
  });

  describe('registerEntry', () => {
    it('deve registrar uma entrada', async () => {
      const result = {
        id: 1,
        userCode: 'test-user',
        dateEntry: '2024-05-19',
        hourEntry: '10:00:00',
      };
      (service.registryEntry as jest.Mock).mockResolvedValue(result);

      expect(await controller.registerEntry({ userCode: 'test-user' })).toBe(
        result,
      );
      expect(service.registryEntry).toHaveBeenCalledWith('test-user');
    });
  });

  describe('registerExit', () => {
    it('deve registrar uma saída', async () => {
      const result = {
        id: 1,
        userCode: 'test-user',
        dateExit: '2024-05-19',
        hourExit: '18:00:00',
      };
      (service.registryExit as jest.Mock).mockResolvedValue(result);

      expect(await controller.registerExit({ userCode: 'test-user' })).toBe(
        result,
      );
      expect(service.registryExit).toHaveBeenCalledWith('test-user');
    });
  });
});

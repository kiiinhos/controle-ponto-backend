import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RegistersService } from '../registers.service';
import { UserEntryEntity } from '../entities/user-entry.entity';
import { UserExitEntity } from '../entities/user-exit.entity';
import { UserHistoryEntity } from '../entities/user-history.entity';
import { getCurrentDateAndTimeInSaoPaulo } from '../../utils/dateUtils';

type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

const createMockRepository = <T = any>(): MockRepository<T> => ({
  find: jest.fn(),
  create: jest.fn(),
  save: jest.fn(),
});

describe('RegistersService', () => {
  let service: RegistersService;
  let userEntryRepository: MockRepository;
  let userExitRepository: MockRepository;
  let userHistoryRepository: MockRepository;

  beforeEach(async () => {
    userEntryRepository = createMockRepository();
    userExitRepository = createMockRepository();
    userHistoryRepository = createMockRepository();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        RegistersService,
        {
          provide: getRepositoryToken(UserEntryEntity),
          useValue: userEntryRepository,
        },
        {
          provide: getRepositoryToken(UserExitEntity),
          useValue: userExitRepository,
        },
        {
          provide: getRepositoryToken(UserHistoryEntity),
          useValue: userHistoryRepository,
        },
      ],
    }).compile();

    service = module.get<RegistersService>(RegistersService);
  });

  it('deve estar definido', () => {
    expect(service).toBeDefined();
  });

  describe('registryEntry', () => {
    it('deve registrar uma entrada', async () => {
      const userCode = 'test-user';
      const { currentDate, currentTime } = getCurrentDateAndTimeInSaoPaulo();
      const entry = {
        userCode,
        dateEntry: currentDate,
        hourEntry: currentTime,
      };

      userEntryRepository.create.mockReturnValue(entry);
      userEntryRepository.save.mockResolvedValue(entry);

      const result = await service.registryEntry(userCode);

      expect(userEntryRepository.create).toHaveBeenCalledWith({
        userCode,
        dateEntry: expect.any(String),
        hourEntry: expect.any(String),
      });
      expect(userEntryRepository.save).toHaveBeenCalledWith(entry);
      expect(result).toEqual(entry);
    });
  });

  describe('registryExit', () => {
    it('deve registrar uma saída', async () => {
      const userCode = 'test-user';
      const { currentDate, currentTime } = getCurrentDateAndTimeInSaoPaulo();
      const exit = { userCode, dateExit: currentDate, hourExit: currentTime };

      userExitRepository.create.mockReturnValue(exit);
      userExitRepository.save.mockResolvedValue(exit);

      const result = await service.registryExit(userCode);

      expect(userExitRepository.create).toHaveBeenCalledWith({
        userCode,
        dateExit: expect.any(String),
        hourExit: expect.any(String),
      });
      expect(userExitRepository.save).toHaveBeenCalledWith(exit);
      expect(result).toEqual(exit);
    });
  });
});

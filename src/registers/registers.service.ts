import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntryEntity } from './entities/user-entry.entity';
import { UserExitEntity } from './entities/user-exit.entity';
import { UserHistoryEntity } from './entities/user-history.entity';
import { UserEntry, UserExit, UserHistory } from './registers.interface';
import { getCurrentDateAndTimeInSaoPaulo } from '../utils/dateUtils';
import { calculateWorkTime } from '../utils/timeUtils';

@Injectable()
export class RegistersService {
  constructor(
    @InjectRepository(UserEntryEntity)
    private readonly userEntryRepository: Repository<UserEntryEntity>,
    @InjectRepository(UserExitEntity)
    private readonly userExitRepository: Repository<UserExitEntity>,
    @InjectRepository(UserHistoryEntity)
    private readonly userHistoryRepository: Repository<UserHistoryEntity>,
  ) {}

  async getEntryHistory(userCode: string): Promise<UserEntry[]> {
    const entries = await this.userEntryRepository.find({
      where: { userCode },
    });
    return entries.map((entry) => ({
      userCode: entry.userCode,
      dateEntry: entry.dateEntry,
      hourEntry: entry.hourEntry,
    }));
  }

  async getExitHistory(userCode: string): Promise<UserExit[]> {
    const exits = await this.userExitRepository.find({ where: { userCode } });
    return exits.map((exit) => ({
      userCode: exit.userCode,
      dateExit: exit.dateExit,
      hourExit: exit.hourExit,
    }));
  }

  async getUserHistory(userCode: string): Promise<UserHistory[]> {
    return await this.userHistoryRepository.find({ where: { userCode } });
  }

  async registryEntry(userCode: string) {
    const { currentDate, currentTime } = getCurrentDateAndTimeInSaoPaulo();

    const entry = this.userEntryRepository.create({
      userCode,
      dateEntry: currentDate,
      hourEntry: currentTime,
    });
    return await this.userEntryRepository.save(entry);
  }

  async registryExit(userCode: string) {
    const { currentDate, currentTime } = getCurrentDateAndTimeInSaoPaulo();

    const exit = this.userExitRepository.create({
      userCode,
      dateExit: currentDate,
      hourExit: currentTime,
    });

    const latestEntry = await this.userEntryRepository.findOne({
      where: { userCode, dateEntry: currentDate },
      order: { hourEntry: 'DESC' },
    });

    if (latestEntry) {
      const workTime = calculateWorkTime(
        { dateEntry: latestEntry.dateEntry, hourEntry: latestEntry.hourEntry },
        { dateExit: exit.dateExit, hourExit: exit.hourExit },
      );

      const history = this.userHistoryRepository.create({
        userCode,
        dateEntry: latestEntry.dateEntry,
        hourEntry: latestEntry.hourEntry,
        dateExit: exit.dateExit,
        hourExit: exit.hourExit,
        workTime,
      });

      await this.userHistoryRepository.save(history);
    }

    return await this.userExitRepository.save(exit);
  }
}

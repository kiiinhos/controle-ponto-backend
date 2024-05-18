import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistersController } from './registers.controller';
import { RegistersService } from './registers.service';
import { UserEntryEntity } from './entities/user-entry.entity';
import { UserExitEntity } from './entities/user-exit.entity';
import { UserHistoryEntity } from './entities/user-history.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      UserEntryEntity,
      UserExitEntity,
      UserHistoryEntity,
    ]),
  ],
  controllers: [RegistersController],
  providers: [RegistersService],
})
export class RegistersModule {}

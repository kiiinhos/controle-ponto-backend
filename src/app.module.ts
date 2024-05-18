import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { RegistersModule } from './registers/registers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user/user.entity';
import { UserEntryEntity } from './registers/entities/user-entry.entity';
import { UserExitEntity } from './registers/entities/user-exit.entity';
import { UserHistoryEntity } from './registers/entities/user-history.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '12345',
      database: 'postgres',
      entities: [
        UserEntity,
        UserEntryEntity,
        UserExitEntity,
        UserHistoryEntity,
      ],
      synchronize: true, // Apenas para ambiente de desenvolvimento
    }),
    UserModule,
    RegistersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

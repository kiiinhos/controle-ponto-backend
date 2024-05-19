import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserModule } from '../user/user.module';
import { RegistersModule } from '../registers/registers.module';
import { UserEntity } from '../user/user.entity';
import { UserEntryEntity } from '../registers/entities/user-entry.entity';
import { UserExitEntity } from '../registers/entities/user-exit.entity';
import { UserHistoryEntity } from '../registers/entities/user-history.entity';

describe('AppModule', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          isGlobal: true,
        }),
        TypeOrmModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: async (configService: ConfigService) => ({
            type: 'postgres',
            host: configService.get<string>('DB_HOST'),
            port: configService.get<number>('DB_PORT'),
            username: configService.get<string>('DB_USERNAME'),
            password: configService.get<string>('DB_PASSWORD'),
            database: configService.get<string>('DB_DATABASE'),
            entities: [
              UserEntity,
              UserEntryEntity,
              UserExitEntity,
              UserHistoryEntity,
            ],
            synchronize: true,
            ssl: configService.get<boolean>('DB_SSL')
              ? { rejectUnauthorized: false }
              : false,
          }),
          inject: [ConfigService],
        }),
        UserModule,
        RegistersModule,
      ],
    }).compile();
  });

  it('deve estar definido', () => {
    expect(app).toBeDefined();
  });
});

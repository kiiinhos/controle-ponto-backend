import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { RegistersModule } from './registers/registers.module';
import { UserEntity } from './user/user.entity';
import { UserEntryEntity } from './registers/entities/user-entry.entity';
import { UserExitEntity } from './registers/entities/user-exit.entity';
import { UserHistoryEntity } from './registers/entities/user-history.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
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
        ssl:
          configService.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    RegistersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

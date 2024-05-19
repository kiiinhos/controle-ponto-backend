import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../app.module';
import * as request from 'supertest';
import { NestFactory } from '@nestjs/core';

jest.mock('@nestjs/core', () => ({
  ...jest.requireActual('@nestjs/core'),
  NestFactory: {
    create: jest.fn(),
  },
}));

describe('Main', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    jest.spyOn(app, 'listen').mockImplementation(() => Promise.resolve());
    (NestFactory.create as jest.Mock).mockReturnValue(Promise.resolve(app));
  });

  it('deve inicializar o aplicativo e retornar 404 para rota não definida', async () => {
    const { bootstrap } = await import('../main');
    await bootstrap();

    return request(app.getHttpServer()).get('/').expect(404);
  });

  afterAll(async () => {
    await app.close();
  });
});

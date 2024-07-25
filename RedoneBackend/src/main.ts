import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CustomValidationPipe } from './common/pipe/customValidation.pipe';
import { swaggerModuleConfig } from './~config/swagger.config';
import * as express from 'express';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  swaggerModuleConfig(app);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use('/uploads', express.static('uploads'));

  await app.listen(3030);
}
bootstrap();

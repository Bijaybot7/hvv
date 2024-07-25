import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ApplicationModule } from 'src/modules/application/application.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { CommentModule } from 'src/modules/comments/comments.module';
import { LikeModule } from 'src/modules/likes/likes.module';
import { PostModule } from 'src/modules/posts/posts.module';
import { UsersModule } from 'src/modules/users/users.module';
import { VacancyModule } from 'src/modules/vacancy/vacancy.module';

export const swaggerModuleConfig = (app: INestApplication) => {
  // For Root Swagger Document
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Root API')
    .setDescription('API For Admin Portal.')
    .setVersion('1.0.0')
    .addBearerAuth
    // {
    //   description: 'Default JWT Authorization',
    //   type: 'http',
    //   in: 'header',
    //   scheme: 'bearer',
    //   bearerFormat: 'JWT',
    // },
    // 'defaultBearerAuth',
    ()
    .build();

  const rootApiDocument = SwaggerModule.createDocument(app, swaggerConfig, {
    include: [    UsersModule,
      AuthModule,
      VacancyModule,
      PostModule,
      ApplicationModule,
      LikeModule,
      CommentModule],
  });
  SwaggerModule.setup('api', app, rootApiDocument);
};

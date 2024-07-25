import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

//
import { MongooseModule } from '@nestjs/mongoose';

//
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { VacancyModule } from './modules/vacancy/vacancy.module';
import { ApplicationModule } from './modules/application/application.module';
import { CommentModule } from './modules/comments/comments.module';
import { LikeModule } from './modules/likes/likes.module';
import { PostModule } from './modules/posts/posts.module';
import { FileModule } from './modules/file/file.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/newBand'),
    ConfigModule.forRoot(),
    UsersModule,
    AuthModule,
    VacancyModule,
    PostModule,
    ApplicationModule,
    LikeModule,
    CommentModule,
    FileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

// post/post.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostService } from './posts.service';
import { PostController } from './posts.controller';
import { Post, PostSchema } from './entities/post.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}

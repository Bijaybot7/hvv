// like/like.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LikeService } from './likes.service';
import { LikeController } from './likes.controller';
import { Like, LikeSchema } from './entities/like.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Like.name, schema: LikeSchema }]),
  ],
  controllers: [LikeController],
  providers: [LikeService],
})
export class LikeModule {}

// like/like.controller.ts
import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LikeService } from './likes.service';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';
import { Like } from './entities/like.entity';

@Controller('likes')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @HttpPost()
  async create(@Body() createLikeDto: CreateLikeDto): Promise<Like> {
    return this.likeService.create(createLikeDto);
  }

  @Get()
  async findAll(): Promise<Like[]> {
    return this.likeService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Like> {
    return this.likeService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLikeDto: UpdateLikeDto,
  ): Promise<Like> {
    return this.likeService.update(id, updateLikeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.likeService.remove(id);
  }

  @Get('/post/:postId')
  async findByPostId(@Param('postId') postId: string): Promise<Like[]> {
    return this.likeService.findByPostId(postId);
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Like[]> {
    return this.likeService.findByUserId(userId);
  }
}

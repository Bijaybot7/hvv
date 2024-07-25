// post/post.controller.ts
import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @HttpPost()
  async create(@Body() createPostDto: CreatePostDto): Promise<Post> {
    return this.postService.create(createPostDto);
  }

  @Get()
  async findAll(): Promise<Post[]> {
    return this.postService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Post> {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
  ): Promise<Post> {
    return this.postService.update(id, updatePostDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.postService.remove(id);
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Post[]> {
    return this.postService.findByUserId(userId);
  }
}

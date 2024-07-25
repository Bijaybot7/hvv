// comment/comment.controller.ts
import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @HttpPost()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.commentService.remove(id);
  }

  @Get('/post/:postId')
  async findByPostId(@Param('postId') postId: string): Promise<Comment[]> {
    return this.commentService.findByPostId(postId);
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Comment[]> {
    return this.commentService.findByUserId(userId);
  }
}

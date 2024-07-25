// like/like.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Like, LikeDocument } from './entities/like.entity';
import { CreateLikeDto } from './dto/create-like.dto';
import { UpdateLikeDto } from './dto/update-like.dto';

@Injectable()
export class LikeService {
  constructor(
    @InjectModel(Like.name)
    private readonly likeModel: Model<LikeDocument>,
  ) {}

  async create(createLikeDto: CreateLikeDto): Promise<Like> {
    const existingLike = await this.likeModel
      .findOne({ postId: createLikeDto.postId, userId: createLikeDto.userId })
      .exec();

    if (existingLike) {
      await this.likeModel.findByIdAndDelete(existingLike._id).exec();
      return null;
    } else {
      const createdLike = new this.likeModel(createLikeDto);
      return createdLike.save();
    }
  }

  async findAll(): Promise<Like[]> {
    return this.likeModel.find().exec();
  }

  async findOne(id: string): Promise<Like> {
    const like = await this.likeModel.findById(id).exec();
    if (!like) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }
    return like;
  }

  async update(id: string, updateLikeDto: UpdateLikeDto): Promise<Like> {
    const updatedLike = await this.likeModel
      .findByIdAndUpdate(id, updateLikeDto, { new: true })
      .exec();
    if (!updatedLike) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }
    return updatedLike;
  }

  async remove(id: string): Promise<void> {
    const result = await this.likeModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Like with ID ${id} not found`);
    }
  }

  async findByPostId(postId: string): Promise<Like[]> {
    return this.likeModel.find({ postId }).exec();
  }

  async findByUserId(userId: string): Promise<Like[]> {
    return this.likeModel.find({ userId }).exec();
  }
}

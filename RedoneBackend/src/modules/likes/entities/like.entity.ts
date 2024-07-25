// like/entities/like.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type LikeDocument = HydratedDocument<Like>;

@Schema({ collection: 'likes', timestamps: true })
export class Like {
  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  userId: string;
}

export const LikeSchema = SchemaFactory.createForClass(Like);

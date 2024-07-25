// comment/entities/comment.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CommentDocument = HydratedDocument<Comment>;

@Schema({ collection: 'comments', timestamps: true })
export class Comment {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  postId: string;

  @Prop({ required: true })
  description: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);

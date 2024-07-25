// post/entities/post.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type PostDocument = HydratedDocument<Post>;

@Schema({ collection: 'posts', timestamps: true })
export class Post {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  image?: string;

  @Prop()
  video?: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);

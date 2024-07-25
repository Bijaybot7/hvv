import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ collection: 'users', timestamps: true })
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ unique: true, required: true })
  email?: string;

  @Prop({ required: true })
  role?: string;

  @Prop({ required: true })
  password?: string;

  @Prop()
  contact?: string;

  @Prop()
  genre?: string;

  @Prop()
  description?: string;

  @Prop()
  band?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

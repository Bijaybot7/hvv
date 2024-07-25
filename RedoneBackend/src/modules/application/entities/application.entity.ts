// application/entities/application.entity.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ApplicationDocument = HydratedDocument<Application>;

@Schema({ collection: 'applications', timestamps: true })
export class Application {
  @Prop({ required: true })
  userId: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  bandId: string;
  @Prop({ required: true })
  vaccancyId: string;
}

export const ApplicationSchema = SchemaFactory.createForClass(Application);

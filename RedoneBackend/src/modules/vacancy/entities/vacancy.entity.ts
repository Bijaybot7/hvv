import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VacancyDocument = HydratedDocument<Vacancy>;

@Schema({ collection: 'vacancy', timestamps: true })
export class Vacancy {
  @Prop({ required: true })
  bandName: string;

  @Prop({ required: true })
  userId: string;

  @Prop()
  position?: string;

  @Prop()
  location?: string;

  @Prop()
  experience?: string;

  @Prop()
  description?: string;
}

export const VacancySchema = SchemaFactory.createForClass(Vacancy);

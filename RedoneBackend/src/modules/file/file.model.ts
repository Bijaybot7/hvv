import { Schema, Document } from 'mongoose';

export interface File extends Document {
  name: string;
  path: string;
}

export const FileSchema = new Schema<File>({
  name: { type: String, required: true },
  path: { type: String, required: true },
});

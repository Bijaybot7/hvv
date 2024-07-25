import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as fs from 'fs';
import * as path from 'path';
import { File } from './file.model';

@Injectable()
export class FileService {
  constructor(@InjectModel(File.name) private fileModel: Model<File>) {}

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    try {
      const filePromises = files.map(async (file) => {
        const filePath = file.path;
        const fileContent = fs.readFileSync(filePath);
        fs.writeFileSync(filePath, fileContent);

        let relativePath = path.relative('uploads', filePath);
        relativePath = process.env.HOST + '/uploads/' + relativePath;

        const createdFile = new this.fileModel({
          name: file.originalname,
          path: relativePath,
        });

        await createdFile.save();

        return relativePath;
      });

      return Promise.all(filePromises);
    } catch (error) {
      console.error(error);
      throw new Error('Error uploading files');
    }
  }
}

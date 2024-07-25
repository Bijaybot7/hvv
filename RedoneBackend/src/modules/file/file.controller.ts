import { Controller, Post, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { join } from 'path';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const storage = diskStorage({
  destination: './uploads',
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

@Controller()
export class FileController {
  constructor(
  ) {}

  @Post('upload')
  @UseInterceptors(FilesInterceptor('files', 10, { storage }))
  async uploadFiles(@UploadedFiles() files: Array<Express.Multer.File>): Promise<{ message: string, paths: string[] }> {
    const paths = files.map(file => `http://localhost:3030/uploads/${file.filename}`);

    return { message: 'Files uploaded successfully', paths };
  }
}
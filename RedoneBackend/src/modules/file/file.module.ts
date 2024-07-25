import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FileController } from './file.controller';
import { FileService } from './file.service';
import { FileSchema } from './file.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'File', schema: FileSchema }])],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}

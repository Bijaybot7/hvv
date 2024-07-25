import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import registerModel from '../database/register-database';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [MongooseModule.forFeature(registerModel)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}

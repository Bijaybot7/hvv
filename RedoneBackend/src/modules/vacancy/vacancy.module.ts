// vacancy/vacancy.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VacancyService } from './vacancy.service';
import { VacancyController } from './vacancy.controller';
import { Vacancy, VacancySchema } from './entities/vacancy.entity';
import registerModel from '../database/register-database';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Vacancy.name, schema: VacancySchema }]),
  ],
  controllers: [VacancyController],
  providers: [VacancyService],
})
export class VacancyModule {}
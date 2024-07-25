// vacancy/vacancy.controller.ts
import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { VacancyService } from './vacancy.service';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';
import { Vacancy } from './entities/vacancy.entity';

@Controller('vacancies')
export class VacancyController {
  constructor(private readonly vacancyService: VacancyService) {}

  @Post()
  async create(@Body() createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    return this.vacancyService.create(createVacancyDto);
  }

  @Get()
  async findAll(): Promise<Vacancy[]> {
    return this.vacancyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Vacancy> {
    return this.vacancyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    return this.vacancyService.update(id, updateVacancyDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.vacancyService.remove(id);
  }
  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Vacancy[]> {
    return this.vacancyService.findByUserId(userId);
  }
}

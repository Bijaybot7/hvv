// vacancy/vacancy.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vacancy, VacancyDocument } from './entities/vacancy.entity';
import { CreateVacancyDto } from './dto/create-vacancy.dto';
import { UpdateVacancyDto } from './dto/update-vacancy.dto';

@Injectable()
export class VacancyService {
  constructor(
    @InjectModel(Vacancy.name)
    private readonly vacancyModel: Model<VacancyDocument>,
  ) {}

  async create(createVacancyDto: CreateVacancyDto): Promise<Vacancy> {
    const createdVacancy = new this.vacancyModel(createVacancyDto);
    return createdVacancy.save();
  }

  async findAll(): Promise<Vacancy[]> {
    return this.vacancyModel.find().exec();
  }

  async findOne(id: string): Promise<Vacancy> {
    const vacancy = await this.vacancyModel.findById(id).exec();
    if (!vacancy) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
    return vacancy;
  }

  async update(
    id: string,
    updateVacancyDto: UpdateVacancyDto,
  ): Promise<Vacancy> {
    const updatedVacancy = await this.vacancyModel
      .findByIdAndUpdate(id, updateVacancyDto, { new: true })
      .exec();
    if (!updatedVacancy) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
    return updatedVacancy;
  }

  async remove(id: string): Promise<void> {
    const result = await this.vacancyModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Vacancy with ID ${id} not found`);
    }
  }
  async findByUserId(userId: string): Promise<Vacancy[]> {
    return this.vacancyModel.find({ userId }).exec();
  }
}

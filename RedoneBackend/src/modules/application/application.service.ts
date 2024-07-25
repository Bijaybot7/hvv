// application/application.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Application,
  ApplicationDocument,
} from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';

@Injectable()
export class ApplicationService {
  constructor(
    @InjectModel(Application.name)
    private readonly applicationModel: Model<ApplicationDocument>,
  ) {}

  async create(
    createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    const createdApplication = new this.applicationModel(createApplicationDto);
    return createdApplication.save();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findOne(id: string): Promise<Application> {
    const application = await this.applicationModel.findById(id).exec();
    if (!application) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return application;
  }

  async update(
    id: string,
    updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    const updatedApplication = await this.applicationModel
      .findByIdAndUpdate(id, updateApplicationDto, { new: true })
      .exec();
    if (!updatedApplication) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
    return updatedApplication;
  }

  async remove(id: string): Promise<void> {
    const result = await this.applicationModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Application with ID ${id} not found`);
    }
  }

  async findByUserId(userId: string): Promise<Application[]> {
    return this.applicationModel.find({ userId }).exec();
  }

  async findByBandId(bandId: string): Promise<Application[]> {
    return this.applicationModel.find({ bandId }).exec();
  }

  async findByVaccancyId(vaccancyId: string): Promise<Application[]> {
    return this.applicationModel.find({ vaccancyId }).exec();
  }
}

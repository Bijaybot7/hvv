// application/application.controller.ts
import {
  Controller,
  Get,
  Post as HttpPost,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';

@Controller('applications')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) {}

  @HttpPost()
  async create(
    @Body() createApplicationDto: CreateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.create(createApplicationDto);
  }

  @Get()
  async findAll(): Promise<Application[]> {
    return this.applicationService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Application> {
    return this.applicationService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateApplicationDto: UpdateApplicationDto,
  ): Promise<Application> {
    return this.applicationService.update(id, updateApplicationDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.applicationService.remove(id);
  }

  @Get('/user/:userId')
  async findByUserId(@Param('userId') userId: string): Promise<Application[]> {
    return this.applicationService.findByUserId(userId);
  }

  @Get('/band/:bandId')
  async findByBandId(@Param('bandId') bandId: string): Promise<Application[]> {
    return this.applicationService.findByBandId(bandId);
  }

  @Get('/vaccancy/:vaccancyId')
  async findByVccancyId(
    @Param('vaccancyId') vaccancyId: string,
  ): Promise<Application[]> {
    return this.applicationService.findByVaccancyId(vaccancyId);
  }
}

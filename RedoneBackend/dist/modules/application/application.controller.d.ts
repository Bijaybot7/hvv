import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Application } from './entities/application.entity';
export declare class ApplicationController {
    private readonly applicationService;
    constructor(applicationService: ApplicationService);
    create(createApplicationDto: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: string): Promise<Application>;
    update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application>;
    remove(id: string): Promise<void>;
    findByUserId(userId: string): Promise<Application[]>;
    findByBandId(bandId: string): Promise<Application[]>;
    findByVccancyId(vaccancyId: string): Promise<Application[]>;
}

/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Model } from 'mongoose';
import { Application, ApplicationDocument } from './entities/application.entity';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
export declare class ApplicationService {
    private readonly applicationModel;
    constructor(applicationModel: Model<ApplicationDocument>);
    create(createApplicationDto: CreateApplicationDto): Promise<Application>;
    findAll(): Promise<Application[]>;
    findOne(id: string): Promise<Application>;
    update(id: string, updateApplicationDto: UpdateApplicationDto): Promise<Application>;
    remove(id: string): Promise<void>;
    findByUserId(userId: string): Promise<Application[]>;
    findByBandId(bandId: string): Promise<Application[]>;
    findByVaccancyId(vaccancyId: string): Promise<Application[]>;
}

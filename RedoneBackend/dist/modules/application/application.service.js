"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const application_entity_1 = require("./entities/application.entity");
let ApplicationService = class ApplicationService {
    constructor(applicationModel) {
        this.applicationModel = applicationModel;
    }
    async create(createApplicationDto) {
        const createdApplication = new this.applicationModel(createApplicationDto);
        return createdApplication.save();
    }
    async findAll() {
        return this.applicationModel.find().exec();
    }
    async findOne(id) {
        const application = await this.applicationModel.findById(id).exec();
        if (!application) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        return application;
    }
    async update(id, updateApplicationDto) {
        const updatedApplication = await this.applicationModel
            .findByIdAndUpdate(id, updateApplicationDto, { new: true })
            .exec();
        if (!updatedApplication) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
        return updatedApplication;
    }
    async remove(id) {
        const result = await this.applicationModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Application with ID ${id} not found`);
        }
    }
    async findByUserId(userId) {
        return this.applicationModel.find({ userId }).exec();
    }
    async findByBandId(bandId) {
        return this.applicationModel.find({ bandId }).exec();
    }
    async findByVaccancyId(vaccancyId) {
        return this.applicationModel.find({ vaccancyId }).exec();
    }
};
exports.ApplicationService = ApplicationService;
exports.ApplicationService = ApplicationService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(application_entity_1.Application.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ApplicationService);
//# sourceMappingURL=application.service.js.map
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
exports.VacancyService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const vacancy_entity_1 = require("./entities/vacancy.entity");
let VacancyService = class VacancyService {
    constructor(vacancyModel) {
        this.vacancyModel = vacancyModel;
    }
    async create(createVacancyDto) {
        const createdVacancy = new this.vacancyModel(createVacancyDto);
        return createdVacancy.save();
    }
    async findAll() {
        return this.vacancyModel.find().exec();
    }
    async findOne(id) {
        const vacancy = await this.vacancyModel.findById(id).exec();
        if (!vacancy) {
            throw new common_1.NotFoundException(`Vacancy with ID ${id} not found`);
        }
        return vacancy;
    }
    async update(id, updateVacancyDto) {
        const updatedVacancy = await this.vacancyModel
            .findByIdAndUpdate(id, updateVacancyDto, { new: true })
            .exec();
        if (!updatedVacancy) {
            throw new common_1.NotFoundException(`Vacancy with ID ${id} not found`);
        }
        return updatedVacancy;
    }
    async remove(id) {
        const result = await this.vacancyModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Vacancy with ID ${id} not found`);
        }
    }
    async findByUserId(userId) {
        return this.vacancyModel.find({ userId }).exec();
    }
};
exports.VacancyService = VacancyService;
exports.VacancyService = VacancyService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(vacancy_entity_1.Vacancy.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], VacancyService);
//# sourceMappingURL=vacancy.service.js.map
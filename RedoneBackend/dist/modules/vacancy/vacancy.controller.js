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
exports.VacancyController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const vacancy_service_1 = require("./vacancy.service");
const create_vacancy_dto_1 = require("./dto/create-vacancy.dto");
const update_vacancy_dto_1 = require("./dto/update-vacancy.dto");
let VacancyController = class VacancyController {
    constructor(vacancyService) {
        this.vacancyService = vacancyService;
    }
    async create(createVacancyDto) {
        return this.vacancyService.create(createVacancyDto);
    }
    async findAll() {
        return this.vacancyService.findAll();
    }
    async findOne(id) {
        return this.vacancyService.findOne(id);
    }
    async update(id, updateVacancyDto) {
        return this.vacancyService.update(id, updateVacancyDto);
    }
    async remove(id) {
        return this.vacancyService.remove(id);
    }
    async findByUserId(userId) {
        return this.vacancyService.findByUserId(userId);
    }
};
exports.VacancyController = VacancyController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 201, type: require("./entities/vacancy.entity").Vacancy }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_vacancy_dto_1.CreateVacancyDto]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/vacancy.entity").Vacancy] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/vacancy.entity").Vacancy }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/vacancy.entity").Vacancy }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_vacancy_dto_1.UpdateVacancyDto]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/vacancy.entity").Vacancy] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], VacancyController.prototype, "findByUserId", null);
exports.VacancyController = VacancyController = __decorate([
    (0, common_1.Controller)('vacancies'),
    __metadata("design:paramtypes", [vacancy_service_1.VacancyService])
], VacancyController);
//# sourceMappingURL=vacancy.controller.js.map
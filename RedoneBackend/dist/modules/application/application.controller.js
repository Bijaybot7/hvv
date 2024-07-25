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
exports.ApplicationController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const application_service_1 = require("./application.service");
const create_application_dto_1 = require("./dto/create-application.dto");
const update_application_dto_1 = require("./dto/update-application.dto");
let ApplicationController = class ApplicationController {
    constructor(applicationService) {
        this.applicationService = applicationService;
    }
    async create(createApplicationDto) {
        return this.applicationService.create(createApplicationDto);
    }
    async findAll() {
        return this.applicationService.findAll();
    }
    async findOne(id) {
        return this.applicationService.findOne(id);
    }
    async update(id, updateApplicationDto) {
        return this.applicationService.update(id, updateApplicationDto);
    }
    async remove(id) {
        return this.applicationService.remove(id);
    }
    async findByUserId(userId) {
        return this.applicationService.findByUserId(userId);
    }
    async findByBandId(bandId) {
        return this.applicationService.findByBandId(bandId);
    }
    async findByVccancyId(vaccancyId) {
        return this.applicationService.findByVaccancyId(vaccancyId);
    }
};
exports.ApplicationController = ApplicationController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 200, type: require("./entities/application.entity").Application }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_application_dto_1.CreateApplicationDto]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/application.entity").Application] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/application.entity").Application }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/application.entity").Application }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_application_dto_1.UpdateApplicationDto]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/application.entity").Application] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "findByUserId", null);
__decorate([
    (0, common_1.Get)('/band/:bandId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/application.entity").Application] }),
    __param(0, (0, common_1.Param)('bandId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "findByBandId", null);
__decorate([
    (0, common_1.Get)('/vaccancy/:vaccancyId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/application.entity").Application] }),
    __param(0, (0, common_1.Param)('vaccancyId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ApplicationController.prototype, "findByVccancyId", null);
exports.ApplicationController = ApplicationController = __decorate([
    (0, common_1.Controller)('applications'),
    __metadata("design:paramtypes", [application_service_1.ApplicationService])
], ApplicationController);
//# sourceMappingURL=application.controller.js.map
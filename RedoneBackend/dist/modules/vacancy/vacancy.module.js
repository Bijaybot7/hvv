"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VacancyModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const vacancy_service_1 = require("./vacancy.service");
const vacancy_controller_1 = require("./vacancy.controller");
const vacancy_entity_1 = require("./entities/vacancy.entity");
let VacancyModule = class VacancyModule {
};
exports.VacancyModule = VacancyModule;
exports.VacancyModule = VacancyModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([{ name: vacancy_entity_1.Vacancy.name, schema: vacancy_entity_1.VacancySchema }]),
        ],
        controllers: [vacancy_controller_1.VacancyController],
        providers: [vacancy_service_1.VacancyService],
    })
], VacancyModule);
//# sourceMappingURL=vacancy.module.js.map
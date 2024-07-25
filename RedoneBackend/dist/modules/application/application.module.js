"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const application_service_1 = require("./application.service");
const application_controller_1 = require("./application.controller");
const application_entity_1 = require("./entities/application.entity");
let ApplicationModule = class ApplicationModule {
};
exports.ApplicationModule = ApplicationModule;
exports.ApplicationModule = ApplicationModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                { name: application_entity_1.Application.name, schema: application_entity_1.ApplicationSchema },
            ]),
        ],
        controllers: [application_controller_1.ApplicationController],
        providers: [application_service_1.ApplicationService],
    })
], ApplicationModule);
//# sourceMappingURL=application.module.js.map
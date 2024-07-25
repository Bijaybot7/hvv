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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApplicationSchema = exports.Application = void 0;
const openapi = require("@nestjs/swagger");
const mongoose_1 = require("@nestjs/mongoose");
let Application = class Application {
    static _OPENAPI_METADATA_FACTORY() {
        return { userId: { required: true, type: () => String }, status: { required: true, type: () => String }, bandId: { required: true, type: () => String }, vaccancyId: { required: true, type: () => String } };
    }
};
exports.Application = Application;
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "userId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "status", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "bandId", void 0);
__decorate([
    (0, mongoose_1.Prop)({ required: true }),
    __metadata("design:type", String)
], Application.prototype, "vaccancyId", void 0);
exports.Application = Application = __decorate([
    (0, mongoose_1.Schema)({ collection: 'applications', timestamps: true })
], Application);
exports.ApplicationSchema = mongoose_1.SchemaFactory.createForClass(Application);
//# sourceMappingURL=application.entity.js.map
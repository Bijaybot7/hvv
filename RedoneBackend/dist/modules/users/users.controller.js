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
exports.UsersController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const create_user_dto_1 = require("./dto/create-user.dto");
const update_user_dto_1 = require("./dto/update-user.dto");
const users_service_1 = require("./users.service");
const update_user_details_dto_1 = require("./dto/update-user-details.dto");
const update_user_band_dto_1 = require("./dto/update-user-band.dto");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    create(createUserDto) {
        return this.usersService.createUser(createUserDto);
    }
    search(page, term) {
        return this.usersService.searchUsers(page, term);
    }
    getById(id) {
        return this.usersService.getUserById(id);
    }
    get(page, limit, sortColumn, sortDirection, name, email) {
        return this.usersService.getUsers(page, limit, sortColumn, sortDirection, name, email);
    }
    update(id, UpdateUserDto) {
        return this.usersService.updateUser(id, UpdateUserDto);
    }
    delete(id) {
        return this.usersService.delete(id);
    }
    seedData(no) {
        return this.usersService.seedData(no);
    }
    updateUserDetails(id, updateUserDetailsDto) {
        return this.usersService.updateUserDetails(id, updateUserDetailsDto);
    }
    updateUserBand(id, updateUserBandDto) {
        return this.usersService.updateUserBand(id, updateUserBandDto);
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true, whitelist: true })),
    openapi.ApiResponse({ status: 201, type: Object }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('search'),
    (0, swagger_1.ApiQuery)({ name: 'term', type: 'string' }),
    (0, swagger_1.ApiQuery)({ name: 'term', type: 'string', required: false }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('term')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "search", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiQuery)({ name: 'sortColumn', type: 'string', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'sortDirection', type: 'string', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'name', type: 'string', required: false }),
    (0, swagger_1.ApiQuery)({ name: 'email', type: 'string', required: false }),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('sortColumn')),
    __param(3, (0, common_1.Query)('sortDirection')),
    __param(4, (0, common_1.Query)('name')),
    __param(5, (0, common_1.Query)('email')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "get", null);
__decorate([
    (0, common_1.Put)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "delete", null);
__decorate([
    (0, common_1.Post)('seedData'),
    openapi.ApiResponse({ status: 201, type: [Object] }),
    __param(0, (0, common_1.Query)('no')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "seedData", null);
__decorate([
    (0, common_1.Put)('/details/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_details_dto_1.UpdateUserDetailsDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserDetails", null);
__decorate([
    (0, common_1.Put)('/band/:id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    openapi.ApiResponse({ status: 200, type: Object }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_user_band_dto_1.UpdateUserBandDto]),
    __metadata("design:returntype", void 0)
], UsersController.prototype, "updateUserBand", null);
exports.UsersController = UsersController = __decorate([
    (0, swagger_1.ApiTags)('Users'),
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map
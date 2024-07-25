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
exports.LikeController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const likes_service_1 = require("./likes.service");
const create_like_dto_1 = require("./dto/create-like.dto");
const update_like_dto_1 = require("./dto/update-like.dto");
let LikeController = class LikeController {
    constructor(likeService) {
        this.likeService = likeService;
    }
    async create(createLikeDto) {
        return this.likeService.create(createLikeDto);
    }
    async findAll() {
        return this.likeService.findAll();
    }
    async findOne(id) {
        return this.likeService.findOne(id);
    }
    async update(id, updateLikeDto) {
        return this.likeService.update(id, updateLikeDto);
    }
    async remove(id) {
        return this.likeService.remove(id);
    }
    async findByPostId(postId) {
        return this.likeService.findByPostId(postId);
    }
    async findByUserId(userId) {
        return this.likeService.findByUserId(userId);
    }
};
exports.LikeController = LikeController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 200, type: require("./entities/like.entity").Like }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_like_dto_1.CreateLikeDto]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/like.entity").Like] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/like.entity").Like }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/like.entity").Like }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_like_dto_1.UpdateLikeDto]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/post/:postId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/like.entity").Like] }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findByPostId", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/like.entity").Like] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LikeController.prototype, "findByUserId", null);
exports.LikeController = LikeController = __decorate([
    (0, common_1.Controller)('likes'),
    __metadata("design:paramtypes", [likes_service_1.LikeService])
], LikeController);
//# sourceMappingURL=likes.controller.js.map
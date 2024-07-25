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
exports.CommentController = void 0;
const openapi = require("@nestjs/swagger");
const common_1 = require("@nestjs/common");
const comments_service_1 = require("./comments.service");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const update_comment_dto_1 = require("./dto/update-comment.dto");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async create(createCommentDto) {
        return this.commentService.create(createCommentDto);
    }
    async findAll() {
        return this.commentService.findAll();
    }
    async findOne(id) {
        return this.commentService.findOne(id);
    }
    async update(id, updateCommentDto) {
        return this.commentService.update(id, updateCommentDto);
    }
    async remove(id) {
        return this.commentService.remove(id);
    }
    async findByPostId(postId) {
        return this.commentService.findByPostId(postId);
    }
    async findByUserId(userId) {
        return this.commentService.findByUserId(userId);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, common_1.Post)(),
    openapi.ApiResponse({ status: 200, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    openapi.ApiResponse({ status: 200, type: [require("./entities/comment.entity").Comment] }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    openapi.ApiResponse({ status: 200, type: require("./entities/comment.entity").Comment }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_comment_dto_1.UpdateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    openapi.ApiResponse({ status: 200 }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
__decorate([
    (0, common_1.Get)('/post/:postId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/comment.entity").Comment] }),
    __param(0, (0, common_1.Param)('postId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findByPostId", null);
__decorate([
    (0, common_1.Get)('/user/:userId'),
    openapi.ApiResponse({ status: 200, type: [require("./entities/comment.entity").Comment] }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findByUserId", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comments'),
    __metadata("design:paramtypes", [comments_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comments.controller.js.map
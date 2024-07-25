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
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = class CommentService {
    constructor(commentModel) {
        this.commentModel = commentModel;
    }
    async create(createCommentDto) {
        const createdComment = new this.commentModel(createCommentDto);
        return createdComment.save();
    }
    async findAll() {
        return this.commentModel.find().exec();
    }
    async findOne(id) {
        const comment = await this.commentModel.findById(id).exec();
        if (!comment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        return comment;
    }
    async update(id, updateCommentDto) {
        const updatedComment = await this.commentModel
            .findByIdAndUpdate(id, updateCommentDto, { new: true })
            .exec();
        if (!updatedComment) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
        return updatedComment;
    }
    async remove(id) {
        const result = await this.commentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Comment with ID ${id} not found`);
        }
    }
    async findByPostId(postId) {
        return this.commentModel.find({ postId }).exec();
    }
    async findByUserId(userId) {
        return this.commentModel.find({ userId }).exec();
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(comment_entity_1.Comment.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], CommentService);
//# sourceMappingURL=comments.service.js.map
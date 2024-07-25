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
exports.LikeService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const like_entity_1 = require("./entities/like.entity");
let LikeService = class LikeService {
    constructor(likeModel) {
        this.likeModel = likeModel;
    }
    async create(createLikeDto) {
        const existingLike = await this.likeModel
            .findOne({ postId: createLikeDto.postId, userId: createLikeDto.userId })
            .exec();
        if (existingLike) {
            await this.likeModel.findByIdAndDelete(existingLike._id).exec();
            return null;
        }
        else {
            const createdLike = new this.likeModel(createLikeDto);
            return createdLike.save();
        }
    }
    async findAll() {
        return this.likeModel.find().exec();
    }
    async findOne(id) {
        const like = await this.likeModel.findById(id).exec();
        if (!like) {
            throw new common_1.NotFoundException(`Like with ID ${id} not found`);
        }
        return like;
    }
    async update(id, updateLikeDto) {
        const updatedLike = await this.likeModel
            .findByIdAndUpdate(id, updateLikeDto, { new: true })
            .exec();
        if (!updatedLike) {
            throw new common_1.NotFoundException(`Like with ID ${id} not found`);
        }
        return updatedLike;
    }
    async remove(id) {
        const result = await this.likeModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException(`Like with ID ${id} not found`);
        }
    }
    async findByPostId(postId) {
        return this.likeModel.find({ postId }).exec();
    }
    async findByUserId(userId) {
        return this.likeModel.find({ userId }).exec();
    }
};
exports.LikeService = LikeService;
exports.LikeService = LikeService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(like_entity_1.Like.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], LikeService);
//# sourceMappingURL=likes.service.js.map
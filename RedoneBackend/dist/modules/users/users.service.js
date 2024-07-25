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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createUser(createUserDto) {
        const newUser = new this.userModel({
            name: createUserDto.name,
            email: createUserDto.email,
            password: createUserDto.password,
            role: createUserDto.role,
        });
        const createdUser = await newUser.save();
        return createdUser;
    }
    async updateUser(id, updateUserDto) {
        try {
            const updatedRecord = await this.userModel.findByIdAndUpdate(id, {
                name: updateUserDto.name,
                email: updateUserDto.email,
                password: updateUserDto.password,
                role: updateUserDto.role,
            }, { new: true });
            if (!updatedRecord) {
                throw new common_1.BadRequestException('Id is invalid');
            }
            return updatedRecord;
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                error: 'Error:' + error,
                message: 'Server error. Invite not updated',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async getUserById(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Id is invalid');
        }
        const user = await this.userModel.findById(id);
        if (!user) {
            throw new common_1.BadRequestException('Id is invalid');
        }
        return user;
    }
    async getUsers(page, limit, sortColumn, sortDirection, name, email) {
        if (limit <= 0) {
            limit = 5;
        }
        else if (limit > 20) {
            limit = 20;
        }
        var start = (page - 1) * limit;
        var filter = [];
        if (name) {
            filter.push({ name: { $regex: new RegExp(name, 'i') } });
        }
        if (email) {
            filter.push({ email: { $regex: new RegExp(email, 'i') } });
        }
        const totalRecords = await this.userModel.countDocuments({ filter });
        var sortDefinition = {};
        switch (sortColumn) {
            case 'name':
                sortDefinition = {
                    name: sortDirection && sortDirection != 'asc' ? -1 : 1,
                };
                break;
            case 'updatedAt':
                sortDefinition = {
                    updatedAt: sortDirection && sortDirection != 'asc' ? -1 : 1,
                };
                break;
            case 'createdAt':
                sortDefinition = {
                    createdAt: sortDirection && sortDirection != 'asc' ? -1 : 1,
                };
                break;
            default:
                sortDefinition = {
                    name: sortDirection && sortDirection != 'asc' ? -1 : 1,
                };
        }
        const data = await this.userModel
            .find(filter.length > 0 ? { $and: filter } : {})
            .select(['name', 'email', 'address', 'createdAt', 'updatedAt'])
            .skip(start)
            .limit(limit)
            .sort(sortDefinition);
        return {
            TotalRecords: totalRecords,
            Data: data,
        };
    }
    async searchUsers(page, term) {
        const limit = 10;
        const start = (page - 1) * limit;
        var filter = [];
        if (term) {
            filter.push({ name: { $regex: new RegExp(term, 'i') } });
            filter.push({ email: { $regex: new RegExp(term, 'i') } });
        }
        const totalRecords = await this.userModel.countDocuments(filter.length > 0 ? { $or: filter } : {});
        const totalPages = Math.ceil(totalRecords / limit);
        var results = await this.userModel
            .find(filter.length > 0 ? { $or: filter } : {})
            .select(['_id', 'name', 'email'])
            .skip(start)
            .limit(limit)
            .sort({ name: 1 });
        return {
            HasMore: page < totalPages,
            Results: results,
        };
    }
    async delete(id) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.NotFoundException({ id: 'Id is invalid' });
        }
        const deletedUser = await this.userModel.findByIdAndDelete(id);
        if (!deletedUser) {
            throw new common_1.NotFoundException({ id: 'Id is invalid' });
        }
        return deletedUser;
    }
    async seedData(no) {
        var createdUsers = [];
        for (var i = 0; i <= 100; i++) {
            const newUser = new this.userModel({
                name: 'test User' + i,
                email: `testuser${i}@test.com`,
                address: `address${i}`,
                password: 'admin',
            });
            createdUsers.push(await newUser.save());
        }
        return createdUsers;
    }
    async updateUserDetails(id, updateUserDetailsDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Id is invalid');
        }
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, {
                $set: {
                    contact: updateUserDetailsDto.contact,
                    genre: updateUserDetailsDto.genre,
                    description: updateUserDetailsDto.description,
                },
            }, { new: true });
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                error: 'Error:' + error,
                message: 'Server error. User details not updated',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async updateUserBand(id, updateUserBandDto) {
        if (!(0, mongoose_2.isValidObjectId)(id)) {
            throw new common_1.BadRequestException('Id is invalid');
        }
        try {
            const updatedUser = await this.userModel.findByIdAndUpdate(id, {
                $set: {
                    band: updateUserBandDto.band,
                },
            }, { new: true });
            if (!updatedUser) {
                throw new common_1.NotFoundException('User not found');
            }
            return updatedUser;
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                error: 'Error:' + error,
                message: 'Server error. Band field not updated',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], UsersService);
//# sourceMappingURL=users.service.js.map
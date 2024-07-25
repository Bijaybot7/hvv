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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const user_entity_1 = require("../users/entities/user.entity");
let AuthService = class AuthService {
    constructor(userModel, jwtSevice) {
        this.userModel = userModel;
        this.jwtSevice = jwtSevice;
    }
    async validateUserCredentials(signInDo) {
        try {
            const { email, password } = signInDo;
            const user = await this.userModel.findOne({ email: email });
            if (!user) {
                throw new common_1.UnauthorizedException();
            }
            if (user?.password !== password) {
                throw new common_1.UnauthorizedException();
            }
            const tokenGen = this.generateToken(user);
            return tokenGen;
        }
        catch (error) {
            throw new common_1.HttpException({
                statusCode: common_1.HttpStatus.FORBIDDEN,
                error: error,
                message: 'Error',
            }, common_1.HttpStatus.FORBIDDEN);
        }
    }
    async generateToken(user) {
        return {
            user: {
                name: user.name,
                email: user.email,
                env: process.env.JWT_SECRET,
                role: user.role,
                userId: user.id,
            },
            access_token: this.jwtSevice.sign({
                sub: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            }),
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_entity_1.User.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map
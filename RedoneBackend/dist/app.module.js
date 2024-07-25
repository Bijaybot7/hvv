"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const mongoose_1 = require("@nestjs/mongoose");
const auth_module_1 = require("./modules/auth/auth.module");
const users_module_1 = require("./modules/users/users.module");
const vacancy_module_1 = require("./modules/vacancy/vacancy.module");
const application_module_1 = require("./modules/application/application.module");
const comments_module_1 = require("./modules/comments/comments.module");
const likes_module_1 = require("./modules/likes/likes.module");
const posts_module_1 = require("./modules/posts/posts.module");
const file_module_1 = require("./modules/file/file.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forRoot('mongodb://localhost:27017/newBand'),
            config_1.ConfigModule.forRoot(),
            users_module_1.UsersModule,
            auth_module_1.AuthModule,
            vacancy_module_1.VacancyModule,
            posts_module_1.PostModule,
            application_module_1.ApplicationModule,
            likes_module_1.LikeModule,
            comments_module_1.CommentModule,
            file_module_1.FileModule,
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map
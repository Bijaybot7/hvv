"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.swaggerModuleConfig = void 0;
const swagger_1 = require("@nestjs/swagger");
const application_module_1 = require("../modules/application/application.module");
const auth_module_1 = require("../modules/auth/auth.module");
const comments_module_1 = require("../modules/comments/comments.module");
const likes_module_1 = require("../modules/likes/likes.module");
const posts_module_1 = require("../modules/posts/posts.module");
const users_module_1 = require("../modules/users/users.module");
const vacancy_module_1 = require("../modules/vacancy/vacancy.module");
const swaggerModuleConfig = (app) => {
    const swaggerConfig = new swagger_1.DocumentBuilder()
        .setTitle('Root API')
        .setDescription('API For Admin Portal.')
        .setVersion('1.0.0')
        .addBearerAuth()
        .build();
    const rootApiDocument = swagger_1.SwaggerModule.createDocument(app, swaggerConfig, {
        include: [users_module_1.UsersModule,
            auth_module_1.AuthModule,
            vacancy_module_1.VacancyModule,
            posts_module_1.PostModule,
            application_module_1.ApplicationModule,
            likes_module_1.LikeModule,
            comments_module_1.CommentModule],
    });
    swagger_1.SwaggerModule.setup('api', app, rootApiDocument);
};
exports.swaggerModuleConfig = swaggerModuleConfig;
//# sourceMappingURL=swagger.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const swagger_config_1 = require("./~config/swagger.config");
const express = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    (0, swagger_config_1.swaggerModuleConfig)(app);
    app.enableCors({
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
        credentials: true,
    });
    app.useGlobalPipes(new common_1.ValidationPipe({ transform: true }));
    app.use('/uploads', express.static('uploads'));
    await app.listen(3030);
}
bootstrap();
//# sourceMappingURL=main.js.map
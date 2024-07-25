"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtConfig = void 0;
const config_1 = require("@nestjs/config");
exports.jwtConfig = {
    imports: [config_1.ConfigModule],
    useFactory: async () => {
        return {
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        };
    },
    inject: [config_1.ConfigService],
    global: true,
};
//# sourceMappingURL=jwt.config.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateVacancyDto = void 0;
const openapi = require("@nestjs/swagger");
const swagger_1 = require("@nestjs/swagger");
const create_vacancy_dto_1 = require("./create-vacancy.dto");
class UpdateVacancyDto extends (0, swagger_1.PartialType)(create_vacancy_dto_1.CreateVacancyDto) {
    static _OPENAPI_METADATA_FACTORY() {
        return {};
    }
}
exports.UpdateVacancyDto = UpdateVacancyDto;
//# sourceMappingURL=update-vacancy.dto.js.map
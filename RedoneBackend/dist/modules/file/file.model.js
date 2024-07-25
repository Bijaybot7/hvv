"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileSchema = void 0;
const mongoose_1 = require("mongoose");
exports.FileSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    path: { type: String, required: true },
});
//# sourceMappingURL=file.model.js.map
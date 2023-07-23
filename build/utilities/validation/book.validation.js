"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateBook = void 0;
const joi_1 = __importDefault(require("joi"));
const validateCreateBook = (book) => {
    const Schema = joi_1.default.object().keys({
        title: joi_1.default.string().required(),
        description: joi_1.default.string().required(),
        page_count: joi_1.default.number().required()
    });
    return Schema.validate(book);
};
exports.validateCreateBook = validateCreateBook;

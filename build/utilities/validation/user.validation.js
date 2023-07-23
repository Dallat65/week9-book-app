"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateCreateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const validateCreateUser = (user) => {
    const Schema = joi_1.default.object().keys({
        firstName: joi_1.default.string().required(),
        lastName: joi_1.default.string().required(),
        email: joi_1.default.string().required()
    });
    return Schema.validate(user);
};
exports.validateCreateUser = validateCreateUser;
const validateLogin = (user) => {
    const Schema = joi_1.default.object().keys({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    return Schema.validate(user);
};
exports.validateLogin = validateLogin;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDatabase = async () => {
    try {
        const connect = mongoose_1.default.connect(`mongodb+srv://Dallat:Daniely65@cluster1.dllpieg.mongodb.net/Week9`);
        console.log(`mongoDB connected successfully!`);
    }
    catch (err) {
        console.log(err);
    }
};
exports.connectDatabase = connectDatabase;

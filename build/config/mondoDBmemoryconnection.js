"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbDisconnect = exports.dbConnect = void 0;
/* eslint-disable no-console */
const mongoose_1 = __importDefault(require("mongoose"));
const mongodb_memory_server_1 = require("mongodb-memory-server");
let mongoServer;
const dbConnect = async () => {
    mongoServer = await mongodb_memory_server_1.MongoMemoryServer.create();
    await mongoose_1.default.connect(mongoServer.getUri(), { dbName: "verifyMASTER" });
};
exports.dbConnect = dbConnect;
const dbDisconnect = async () => {
    await mongoose_1.default.disconnect();
};
exports.dbDisconnect = dbDisconnect;

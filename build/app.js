"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const database_1 = require("./config/database");
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const bookRoutes_1 = __importDefault(require("./routes/bookRoutes"));
const mongoDBmemoryconnection_1 = require("./config/mongoDBmemoryconnection");
dotenv_1.default.config();
const app = (0, express_1.default)();
if (process.env.NODE_ENV === "test") {
    (0, mongoDBmemoryconnection_1.dbConnect)();
}
else {
    (0, database_1.connectDatabase)();
}
// connectDatabase()
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use((0, morgan_1.default)('dev'));
app.use('/users', userRoutes_1.default);
app.use('/books', bookRoutes_1.default);
exports.default = app;

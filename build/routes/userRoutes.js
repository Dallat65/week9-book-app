"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usercontroller_1 = require("../controllers.ts/usercontroller");
const router = express_1.default.Router();
router.post('/create', usercontroller_1.createUser);
router.post('/login', usercontroller_1.login);
router.get('/getAll', usercontroller_1.getAll);
router.patch('/update', usercontroller_1.updateUser);
router.delete('/delete', usercontroller_1.deleteUser);
router.get('/getOneUser/', usercontroller_1.getOneUser);
router.get('/getByPage/:page?', usercontroller_1.getByPage);
exports.default = router;

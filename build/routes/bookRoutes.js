"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const bookscontroller_1 = require("../controllers.ts/bookscontroller");
const auth_1 = require("../utilities/auth");
const router = express_1.default.Router();
router.post('/create', auth_1.auth, bookscontroller_1.createBook);
router.get('/getAllBooks', auth_1.auth, bookscontroller_1.getAllBooks);
router.get('/getOneBook', auth_1.auth, bookscontroller_1.getOneBook);
router.put('/updateBook', auth_1.auth, bookscontroller_1.updateBook);
router.delete('/deletingBook', auth_1.auth, bookscontroller_1.deleteBook);
router.get('/getByPage/:page?', auth_1.auth, bookscontroller_1.getByPage);
exports.default = router;

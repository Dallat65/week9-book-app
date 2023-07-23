"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPage = exports.deleteBook = exports.updateBook = exports.getOneBook = exports.getAllBooks = exports.createBook = void 0;
const booksModel_1 = __importDefault(require("../models/booksModel"));
const book_validation_1 = require("../utilities/validation/book.validation");
const createBook = async (req, res) => {
    try {
        const { error } = (0, book_validation_1.validateCreateBook)(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const { title, description, page_count } = req.body;
        const findBook = await booksModel_1.default.findOne({ title });
        if (findBook) {
            return res.status(400).json({
                message: `Book already exist`
            });
        }
        if (!findBook) {
            let newBook = await booksModel_1.default.create({
                title,
                description,
                page_count
            });
            return res.status(200).json({
                message: `Book created successfully!`,
                book: newBook
            });
        }
        return res.status(401).json({
            message: `Unable to create book`
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/books/create'
        });
    }
};
exports.createBook = createBook;
const getAllBooks = async (req, res) => {
    try {
        const allBooks = await booksModel_1.default.find({});
        if (!allBooks) {
            return res.status(404).json({
                message: `Books not found`
            });
        }
        return res.status(200).json({
            message: `Books fetched successfully!`,
            allBooks
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/Books/login'
        });
    }
};
exports.getAllBooks = getAllBooks;
const getOneBook = async (req, res) => {
    try {
        const { _id } = req.body;
        const oneBook = await booksModel_1.default.findOne({ _id });
        // console.log(oneUser);
        if (!oneBook) {
            return res.status(404).json({
                message: `Book not found`
            });
        }
        return res.status(200).json({
            message: `Book fetched successfully!`,
            oneBook
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/Books/login'
        });
    }
};
exports.getOneBook = getOneBook;
const updateBook = async (req, res) => {
    try {
        const { title, description, page_count } = req.body;
        const book = await booksModel_1.default.findOne({ title });
        if (!book) {
            return res.status(404).json({
                message: `Book does not exist`
            });
        }
        const updatedBook = await booksModel_1.default.findOneAndUpdate({ title }, { description, page_count });
        console.log(req.body);
        if (updatedBook) {
            return res.status(200).json({
                message: `book updated successfully!`,
                updatedBook
            });
        }
        return res.status(401).json({
            message: `Error updating book`
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/Books/login'
        });
    }
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    try {
        const { title } = req.body;
        const deletedBook = await booksModel_1.default.findOneAndDelete({ title });
        if (!deletedBook) {
            return res.status(400).json({
                message: `Book does not exist`
            });
        }
        if (deletedBook) {
            return res.status(200).json({
                message: `book deleted successfully!`,
                deletedBook
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/Books/login'
        });
    }
};
exports.deleteBook = deleteBook;
const getByPage = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const books = await booksModel_1.default.find()
            .skip(offset)
            .limit(limit);
        const count = await booksModel_1.default.countDocuments();
        const totalPages = Math.ceil(count / limit);
        res.json({
            books,
            currentPage: page,
            totalPages,
        });
    }
    catch (error) {
        res.status(500).send({ message: `Couldn't retrieve book information` });
    }
};
exports.getByPage = getByPage;

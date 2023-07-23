"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getByPage = exports.deleteUser = exports.updateUser = exports.getOneUser = exports.getAll = exports.login = exports.createUser = void 0;
const userModel_1 = __importDefault(require("../models/userModel"));
const utility_1 = require("../utilities/utility");
const notification_1 = require("../utilities/notification");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const dotenv_1 = __importDefault(require("dotenv"));
const user_validation_1 = require("../utilities/validation/user.validation");
dotenv_1.default.config();
const createUser = async (req, res, next) => {
    try {
        const { error } = (0, user_validation_1.validateCreateUser)(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const { firstName, lastName, email } = req.body;
        const findUser = await userModel_1.default.findOne({ email });
        if (findUser) {
            return res.status(400).json({
                message: `User already exist`,
                status: 'error',
                method: req.method
            });
        }
        const salt = await (0, utility_1.SaltGenerator)();
        const password = process.env.NODE_ENV === "test" ? `${lastName}27966` : await (0, utility_1.passwordGenerator)(lastName);
        const hashedPassword = await (0, utility_1.hashPassword)(password, salt);
        if (!findUser) {
            let newUser = await userModel_1.default.create({
                firstName,
                lastName,
                email,
                password: hashedPassword,
                role: 'Author',
                books: []
            });
            let html = (0, notification_1.emailHtml)(email, password);
            await (0, notification_1.sendmail)(`${process.env.GMAIL_USERNAME}`, email, "Welcome!", html);
            return res.status(200).json({
                message: `User created successfully!`,
                role: newUser.role,
                user: newUser,
                status: 'success',
                method: req.method
            });
        }
        return res.status(401).json({
            message: `Unable to create user`,
            status: 'error',
            method: req.method
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/users/create',
            err
        });
    }
};
exports.createUser = createUser;
const login = async (req, res) => {
    try {
        const { error } = (0, user_validation_1.validateLogin)(req.body);
        if (error)
            return res.status(400).json({ message: error.details[0].message });
        const { email, password } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `User does not exist, please register`,
                status: 'error',
                method: req.method
            });
        }
        if (user) {
            const validate = await bcryptjs_1.default.compare(password, user.password);
            if (!validate) {
                return res.status(400).json({
                    message: `Invalid password`,
                    status: 'error',
                    method: req.method
                });
            }
            if (validate) {
                const token = await (0, utility_1.tokenGenerator)(`${user._id}`);
                console.log(token);
                res.cookie(`token`, token);
                return res.status(200).json({
                    message: `Login successful`,
                    email: user.email,
                    token: token,
                    status: 'success',
                    method: req.method
                });
            }
        }
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/users/login'
        });
    }
};
exports.login = login;
const getAll = async (req, res) => {
    try {
        const allUsers = await userModel_1.default.find({});
        if (!allUsers) {
            return res.status(404).json({
                message: `Users not found`,
                status: 'error',
                method: req.method
            });
        }
        return res.status(200).json({
            message: `Users fetched successfully!`,
            allUsers,
            status: 'success',
            method: req.method
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/users/login'
        });
    }
};
exports.getAll = getAll;
const getOneUser = async (req, res) => {
    try {
        const { _id } = req.body;
        const oneUser = await userModel_1.default.findOne({ _id });
        console.log(oneUser);
        if (!oneUser) {
            return res.status(404).json({
                message: `User not found`,
                status: 'error',
                method: req.method
            });
        }
        return res.status(200).json({
            message: `User fetched successfully!`,
            oneUser,
            status: 'success',
            method: req.method
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/users/login'
        });
    }
};
exports.getOneUser = getOneUser;
const updateUser = async (req, res) => {
    try {
        const { email, firstName, lastName } = req.body;
        const user = await userModel_1.default.findOne({ email });
        if (!user) {
            return res.status(404).json({
                message: `User does not exist`,
                status: 'error',
                method: req.method
            });
        }
        const updatedUser = await userModel_1.default.findOneAndUpdate({ email }, { firstName, lastName });
        console.log(req.body);
        if (updatedUser) {
            return res.status(200).json({
                message: `user updated successfully!`,
                updatedUser,
                status: 'success',
                method: req.method
            });
        }
        return res.status(401).json({
            message: `Error updating user`,
            status: 'error',
            method: req.method
        });
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/users/login'
        });
    }
};
exports.updateUser = updateUser;
const deleteUser = async (req, res) => {
    try {
        const { email } = req.body;
        const deletedUser = await userModel_1.default.findOneAndDelete({ email });
        if (!deletedUser) {
            return res.status(400).json({
                message: `User does not exist`,
                status: 'error',
                method: req.method
            });
        }
        if (deletedUser) {
            return res.status(200).json({
                message: `user deleted successfully!`,
                deletedUser,
                status: 'success',
                method: req.method
            });
        }
    }
    catch (err) {
        return res.status(500).json({
            message: 'Internal Server Error',
            Error: '/users/login'
        });
    }
};
exports.deleteUser = deleteUser;
const getByPage = async (req, res) => {
    try {
        const page = parseInt(req.params.page) || 1;
        const limit = 5;
        const offset = (page - 1) * limit;
        const users = await userModel_1.default.find()
            .skip(offset)
            .limit(limit);
        const count = await userModel_1.default.countDocuments();
        const totalPages = Math.ceil(count / limit);
        res.json({
            users,
            currentPage: page,
            totalPages,
        });
    }
    catch (error) {
        res.status(500).send({ message: `Couldn't retrieve user information` });
    }
};
exports.getByPage = getByPage;

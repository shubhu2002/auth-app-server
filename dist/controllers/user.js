"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkusername = exports.authenticateUser = exports.getAllUsers = exports.createUser = void 0;
const User_1 = require("../models/User");
const hashPassword_1 = __importDefault(require("../helpers/hashPassword"));
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.body;
        let hashedPassword;
        try {
            hashedPassword = yield (0, hashPassword_1.default)(user.password);
        }
        catch (error) {
            throw { status: 500, message: error.message };
        }
        user.password = hashedPassword;
        const newUser = new User_1.User(user);
        const saveUser = yield newUser.save();
        if (!saveUser) {
            throw { status: 400, message: "Could not create the user" };
        }
        res.status(201).json({
            success: true,
            saveUser,
        });
    }
    catch (error) {
        res.status(error.status || 404).json({
            success: false,
            message: error.message,
        });
    }
});
exports.createUser = createUser;
const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield User_1.User.getAllUsers();
        res.status(200).json({
            success: true,
            message: "Successful",
            data: users,
        });
    }
    catch (error) {
        res.status(404).json({
            success: false,
            message: "No Data Found !!",
        });
    }
});
exports.getAllUsers = getAllUsers;
const authenticateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        const user = yield User_1.User.getUserByUsername(username);
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }
        const isPasswordValid = yield User_1.User.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({
                success: false,
                message: "Invalid password",
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.authenticateUser = authenticateUser;
const checkusername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username } = req.body;
        let user = null;
        try {
            user = yield User_1.User.getUserByUsername(username);
        }
        catch (err) {
            if (err.message === "Error fetching user by username") {
                user = null;
            }
            else {
                return res
                    .status(err.status || 500)
                    .json({ message: err.message || err });
            }
        }
        if (user) {
            res
                .status(200)
                .json({ available: false, message: "Username already exists" });
        }
        else {
            res
                .status(200)
                .json({ available: true, message: "Username is available" });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});
exports.checkusername = checkusername;

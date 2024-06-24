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
exports.User = void 0;
const db_1 = __importDefault(require("../db"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class User {
    constructor({ username, fullname, password }) {
        this.username = username;
        this.fullname = fullname;
        this.password = password;
    }
    save() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { error, data: userData } = yield db_1.default
                    .from("auth_users")
                    .insert([
                    {
                        username: this.username,
                        fullname: this.fullname,
                        password: this.password,
                    },
                ])
                    .select()
                    .single();
                if (error)
                    throw error;
                return userData;
            }
            catch (err) {
                throw err;
            }
        });
    }
    static getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield db_1.default.from("auth_users").select("*");
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                throw new Error("Error fetching users");
            }
        });
    }
    static getUserByUsername(username) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { data, error } = yield db_1.default
                    .from("auth_users")
                    .select("*")
                    .eq("username", username)
                    .single();
                if (error)
                    throw error;
                return data;
            }
            catch (error) {
                throw new Error("Error fetching user by username");
            }
        });
    }
    static verifyPassword(plainPassword, hashedPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            return bcrypt_1.default.compare(plainPassword, hashedPassword);
        });
    }
}
exports.User = User;

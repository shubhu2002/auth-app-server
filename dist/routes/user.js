"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const router = express_1.default.Router();
router.post("/register", user_1.createUser);
router.get("/all", user_1.getAllUsers);
router.post("/login", user_1.authenticateUser);
router.post("/checkusername", user_1.checkusername);
exports.default = router;

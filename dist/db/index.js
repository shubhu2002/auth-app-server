"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const supabase_js_1 = require("@supabase/supabase-js");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const supabaseUrl = (_a = process.env.SUPABASE_URL) !== null && _a !== void 0 ? _a : "";
const supabaseKey = (_b = process.env.SUPABASE_KEY) !== null && _b !== void 0 ? _b : "";
const db = (0, supabase_js_1.createClient)(supabaseUrl, supabaseKey);
exports.default = db;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: String,
    username: String,
    email: String,
    dateofbirth: Date,
    password: String,
    role: String,
    isdeleted: Boolean,
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    },
    deleted_at: {
        type: Date,
        default: null,
    },
});
const user = mongoose_1.default.model("User", userSchema);
module.exports = user;

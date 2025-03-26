"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const login = require("../controller/login");
const router = express_1.default.Router();
router.post("/signup", createUser);
router.post("/login", login);
router.get("/logout", (req, res) => {
    res.clearCookie("token");
    res.json({ message: "Logged out" });
});
module.exports = router;

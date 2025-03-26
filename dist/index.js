"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const Connection = require("./db");
dotenv_1.default.config();
const app = (0, express_1.default)();
Connection();
const PORT = 8000;
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(cookieParser());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});
app.use("/api", require("./routes/routes"));
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
function cookieParser() {
    throw new Error('Function not implemented.');
}

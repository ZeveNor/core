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
Object.defineProperty(exports, "__esModule", { value: true });
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    if (!(email && password)) {
        return res.status(400).send("All input is required");
    }
    const user = yield User.findOne({
        email,
    });
    if (!(user && (yield bcrypt.compare(password, user.password)))) {
        return res.status(404).send("Invalid Credentials");
    }
    const secretToken = createSecretToken(user._id);
    res.cookie("secretToken", secretToken, {
        domain: process.env.DOMAIN,
        path: "/",
        expires: new Date(Date.now() + 8640000),
        secure: true,
        httpOnly: true,
        sameSite: "none",
    });
    res.json(user);
});
module.exports = login;

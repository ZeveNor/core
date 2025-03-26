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
const User = require("../schema/user");
const bcrypt = require("bcrypt");
const { createSecretToken } = require("../tools/generateToken");
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!(req.body.name &&
            req.body.username &&
            req.body.email &&
            req.body.dateofbirth &&
            req.body.password &&
            req.body.role)) {
            res.status(400).send('All input is required');
        }
        const oldUser = yield User.findOne({ email: req.body.email });
        if (oldUser) {
            return res.status(409).send("User Already Exist. Please Login");
        }
        const salt = 10;
        const encryptedPassword = yield bcrypt.hash(req.body.password, salt);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            email: req.body.email,
            dateofbirth: req.body.dateofbirth,
            password: encryptedPassword,
            role: req.body.role,
        });
        const user = yield newUser.save();
        const secretToken = createSecretToken(newUser._id);
        res.cookie("secretToken", secretToken, {
            path: "/",
            expires: new Date(Date.now() + 8640000),
            secure: true,
            httpOnly: true,
            sameSite: "None",
        });
        console.log("Cookie set successfully");
        res.json(user);
    }
    catch (err) {
        console.log("Error in signup", err);
    }
});
module.exports = createUser;

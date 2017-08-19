"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require("jsonwebtoken");
const store_1 = require("../store");
const User_1 = require("./User");
const HttpResponse_1 = require("../models/HttpResponse");
class AuthContoller {
    constructor() {
        this.collection = store_1.default.db.collection('users');
        this.userContoller = new User_1.default();
    }
    getUserToken(username, password) {
        return new Promise((resolve, reject) => {
            this.userContoller.getUserByUsername(username)
                .then((r) => {
                if (password != r.message.password) {
                    return reject(new HttpResponse_1.default(400, 'Authentication', 'Invalid credentials.'));
                }
                const token = jwt.sign(r.message, store_1.default.secret, {
                    expiresIn: 86400
                });
                resolve(new HttpResponse_1.default(200, 'Success', token));
            })
                .catch((r) => reject(r));
        });
    }
}
exports.default = AuthContoller;

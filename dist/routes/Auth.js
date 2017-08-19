"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Auth_1 = require("../controllers/Auth");
class AuthRouter {
    constructor() {
        this.router = express_1.Router();
        this.controller = new Auth_1.default();
        this.init();
    }
    init() {
        this.router.route('/login')
            .post(this.loginPost.bind(this));
    }
    loginPost(req, res, next) {
        this.controller.getUserToken(req.body.username, req.body.password)
            .then((r) => {
            res.status(r.status).json(r);
        })
            .catch((r) => {
            res.status(r.status).json(r);
        });
    }
}
exports.default = AuthRouter;

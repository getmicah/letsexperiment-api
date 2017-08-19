"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
class RootRouter {
    constructor() {
        this.router = express_1.Router();
        this.init();
    }
    init() {
        this.router.get('/', this.welcomeMessage.bind(this));
    }
    welcomeMessage(req, res, next) {
        res.json({
            message: 'welcome to api'
        });
    }
}
exports.default = RootRouter;

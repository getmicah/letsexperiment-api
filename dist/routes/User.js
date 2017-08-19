"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const jwt = require("jsonwebtoken");
const store_1 = require("../store");
const User_1 = require("../controllers/User");
const HttpResponse_1 = require("../models/HttpResponse");
class UserRouter {
    constructor() {
        this.router = express_1.Router();
        this.controller = new User_1.default();
        //this.middleware();
        this.routes();
    }
    middleware() {
        this.router.use((req, res, next) => {
            const token = req.body.token;
            if (token) {
                jwt.verify(token, store_1.default.secret, (err, decoded) => {
                    if (err) {
                        const r = new HttpResponse_1.default(400, 'Authentication', 'Failed to authenticate token.');
                        this.respond(res, r);
                    }
                    else {
                        store_1.default.authenticated = decoded;
                        next();
                    }
                });
            }
            else {
                const r = new HttpResponse_1.default(400, 'Authentication', 'No token provided.');
                this.respond(res, r);
            }
        });
    }
    routes() {
        this.router.route('/')
            .get(this.rootGet.bind(this))
            .post(this.rootPost.bind(this))
            .delete(this.rootDelete.bind(this));
        this.router.route('/:id')
            .get(this.idGet.bind(this))
            .put(this.idPut.bind(this))
            .delete(this.idDelete.bind(this));
        this.router.route('/:username')
            .get(this.usernameGet.bind(this))
            .put(this.usernamePut.bind(this))
            .delete(this.usernameDelete.bind(this));
    }
    respond(res, r) {
        res.status(r.status).json(r);
    }
    rootGet(req, res) {
        this.controller.getAllUsers()
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    rootPost(req, res) {
        this.controller.addUser(req.body)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    rootDelete(req, res) {
        this.controller.deleteAll(req.body.confirm)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    idGet(req, res, next) {
        this.controller.getUserById(req.params.id)
            .then((r) => this.respond(res, r))
            .catch((r) => {
            if (r.status === 400) {
                return next();
            }
            this.respond(res, r);
        });
    }
    idPut(req, res, next) {
        this.controller.updateUserById(req.params.id, req.body)
            .then((r) => this.respond(res, r))
            .catch((r) => {
            if (r.status === 400) {
                return next();
            }
            this.respond(res, r);
        });
    }
    idDelete(req, res, next) {
        this.controller.deleteUserById(req.params.id)
            .then((r) => this.respond(res, r))
            .catch((r) => {
            if (r.status === 400) {
                return next();
            }
            this.respond(res, r);
        });
    }
    usernameGet(req, res, next) {
        this.controller.getUserByUsername(req.params.username)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    usernamePut(req, res, next) {
        this.controller.updateUserByUsername(req.params.username, req.body)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    usernameDelete(req, res, next) {
        this.controller.deleteUserByUsername(req.params.username)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
}
exports.default = UserRouter;

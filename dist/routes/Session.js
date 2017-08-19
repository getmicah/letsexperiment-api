"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const Session_1 = require("../controllers/Session");
class SessionRouter {
    constructor() {
        this.router = express_1.Router();
        this.controller = new Session_1.default();
        this.routes();
    }
    middleware() {
        this.router.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
            if ('OPTIONS' == req.method) {
                res.send(200);
            }
            else {
                next();
            }
        });
    }
    respond(res, r) {
        res.status(r.status).json(r);
    }
    routes() {
        this.router.route('/')
            .get(this.rootGet.bind(this))
            .post(this.rootPost.bind(this))
            .delete(this.rootDelete.bind(this));
        this.router.route('/:id')
            .get(this.idGet.bind(this))
            .put(this.idPut.bind(this));
    }
    rootGet(req, res) {
        this.controller.getAllSessions()
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    rootPost(req, res) {
        this.controller.addSession(req.body)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    rootDelete(req, res) {
        this.controller.deleteAll(req.body.confirm)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    idGet(req, res) {
        this.controller.getSessionById(req.params.id)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
    idPut(req, res) {
        this.controller.updateSessionById(req.params.id, req.body)
            .then((r) => this.respond(res, r))
            .catch((r) => this.respond(res, r));
    }
}
exports.default = SessionRouter;

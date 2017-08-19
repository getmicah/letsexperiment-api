"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const store_1 = require("./store");
const config_1 = require("./config");
const Session_1 = require("./routes/Session");
class Server {
    constructor() {
        this.app = express();
        this.router = express.Router();
        store_1.default.init()
            .then(() => {
            this.middleware();
            this.routes();
        })
            .catch((err) => console.log(err));
    }
    middleware() {
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use(bodyParser.json());
    }
    routes() {
        this.router.use('/', new Session_1.default().router);
        this.app.use(`/v${config_1.default.server.version}`, this.router);
    }
}
exports.default = new Server().app.listen(process.env.PORT || config_1.default.server.port);

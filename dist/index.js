"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const store_1 = require("./store");
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
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', 'https://letsexperiment.github.io');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST');
            res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
            next();
        });
        this.app.use(function (req, res, next) {
            if (req.ip == '68.113.9.96' || req.ip == '151.101.61.147') {
                next();
            }
            else {
                res.status(403).end('forbidden');
            }
        });
        this.app.use(helmet());
    }
    routes() {
        this.router.use('/', new Session_1.default().router);
        this.app.use(`/v1`, this.router);
    }
}
exports.default = new Server().app.listen(process.env.PORT);

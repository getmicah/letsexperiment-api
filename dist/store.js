"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const config_1 = require("./config");
class Store {
    init() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(process.env.MONGODB_URI)
                .then((db) => {
                this.db = db;
                this.secret = config_1.default.auth.secret;
                resolve();
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
exports.default = new Store();

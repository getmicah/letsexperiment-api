"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
class Store {
    init() {
        return new Promise((resolve, reject) => {
            mongodb_1.MongoClient.connect(process.env.MONGODB_URI)
                .then((db) => {
                this.db = db;
                resolve();
            })
                .catch((err) => {
                reject(err);
            });
        });
    }
}
exports.default = new Store();

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const store_1 = require("../store");
const User_1 = require("../models/User");
const HttpResponse_1 = require("../models/HttpResponse");
class UserContoller {
    constructor() {
        this.collection = store_1.default.db.collection('users');
    }
    getAllUsers() {
        return new Promise((resolve, reject) => {
            this.collection.find({}).toArray((dbError, dbRes) => {
                if (dbError) {
                    return reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
    getUser(filter) {
        return new Promise((resolve, reject) => {
            this.collection.findOne(filter, (dbError, dbRes) => {
                if (dbError) {
                    return reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                if (dbRes === null) {
                    return reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'User doesn\'t exist.'));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
    getUserById(id) {
        return new Promise((resolve, reject) => {
            if (id.length !== 24) {
                return reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'User doesn\'t exist.'));
            }
            this.getUser({ _id: new mongodb_1.ObjectID(id) })
                .then((r) => resolve(r))
                .catch((r) => reject(r));
        });
    }
    getUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.collection.createIndex({
                username: 'text'
            });
            this.getUser({
                $text: {
                    $search: username,
                    $caseSensitive: false
                }
            })
                .then((r) => resolve(r))
                .catch((r) => reject(r));
        });
    }
    insertUser(user) {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(user.props.username)
                .then((r) => {
                reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'User already exists.'));
            })
                .catch((r) => {
                if (r.status === 500) {
                    return reject(r);
                }
                this.collection.insertOne(user.props, (dbError, dbRes) => {
                    if (dbError) {
                        return reject(new HttpResponse_1.default(500, 'Database', dbError));
                    }
                    resolve(new HttpResponse_1.default(200, 'Success', dbRes));
                });
            });
        });
    }
    addUser(props) {
        return new Promise((resolve, reject) => {
            const required = ['username', 'password'];
            const user = new User_1.default(props, required);
            user.validate()
                .then(user.hasRequiredProperties.bind(user))
                .then(() => {
                this.insertUser(user)
                    .then((r) => resolve(r))
                    .catch((r) => reject(r));
            })
                .catch((message) => {
                reject(new HttpResponse_1.default(400, 'InvalidInput', message));
            });
        });
    }
    updateUser(filter, props) {
        return new Promise((resolve, reject) => {
            if (Object.keys(props).length === 0) {
                return reject(new HttpResponse_1.default(400, 'InvalidInput', 'No properties to update'));
            }
            const user = new User_1.default(props);
            user.validate()
                .then(() => {
                this.collection.updateOne(filter, { $set: props }, (dbError, dbRes) => {
                    if (dbError) {
                        return reject(new HttpResponse_1.default(500, 'Database', dbError));
                    }
                    resolve(new HttpResponse_1.default(200, 'Success', dbRes));
                });
            })
                .catch((message) => {
                reject(new HttpResponse_1.default(400, 'InvalidInput', message));
            });
        });
    }
    updateUserById(id, props) {
        return new Promise((resolve, reject) => {
            this.getUserById(id).then(() => {
                this.updateUser({
                    _id: new mongodb_1.ObjectID(id)
                }, props)
                    .then((r) => resolve(r))
                    .catch((e) => reject(e));
            }).catch((r) => reject(r));
        });
    }
    updateUserByUsername(username, props) {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(username).then(() => {
                this.updateUser({ username }, props)
                    .then((r) => resolve(r))
                    .catch((r) => reject(r));
            }).catch((r) => reject(r));
        });
    }
    deleteUser(filter) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne(filter, (dbError, dbRes) => {
                if (dbError) {
                    return reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                if (dbRes.result.n === 0) {
                    return reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'User doesn\'t exist.'));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
    deleteUserById(id) {
        return new Promise((resolve, reject) => {
            this.getUserById(id).then(() => {
                this.deleteUser({
                    _id: new mongodb_1.ObjectID(id)
                })
                    .then((r) => resolve(r))
                    .catch((r) => reject(r));
            }).catch((r) => reject(r));
        });
    }
    deleteUserByUsername(username) {
        return new Promise((resolve, reject) => {
            this.getUserByUsername(username).then(() => {
                this.deleteUser({ username })
                    .then((r) => resolve(r))
                    .catch((r) => reject(r));
            }).catch((r) => reject(r));
        });
    }
    deleteAll(confirm) {
        return new Promise((resolve, reject) => {
            if (confirm !== 'true') {
                return reject(new HttpResponse_1.default(400, 'InvalidInput', 'Requires confirmation.'));
            }
            this.collection.deleteMany({}, (dbError, dbRes) => {
                if (dbError) {
                    return reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
}
exports.default = UserContoller;

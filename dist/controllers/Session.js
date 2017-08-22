"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const store_1 = require("../store");
const Session_1 = require("../models/Session");
const HttpResponse_1 = require("../models/HttpResponse");
class SessionContoller {
    constructor() {
        this.collection = store_1.default.db.collection('sessions');
    }
    getAllSessions() {
        return new Promise((resolve, reject) => {
            this.collection.find({}).toArray((dbError, dbRes) => {
                if (dbError) {
                    reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
    getSession(filter) {
        return new Promise((resolve, reject) => {
            this.collection.findOne(filter, (dbError, dbRes) => {
                if (dbError) {
                    reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                if (dbRes === null) {
                    reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'Session doesn\'t exist.'));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
    getSessionById(id) {
        return new Promise((resolve, reject) => {
            if (id.length !== 24) {
                reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'Session doesn\'t exist.'));
            }
            this.getSession({ _id: new mongodb_1.ObjectID(id) })
                .then((r) => resolve(r))
                .catch((r) => reject(r));
        });
    }
    insertSession(session) {
        return new Promise((resolve, reject) => {
            this.collection.insertOne(session.props, (dbError, dbRes) => {
                if (dbError) {
                    reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                resolve(new HttpResponse_1.default(200, 'Success', session.props));
            });
        });
    }
    addSession(props) {
        return new Promise((resolve, reject) => {
            const required = [
                'partnerOneNickname',
                'partnerTwoNickname',
                'partnerOneQuestions',
                'partnerTwoQuestions',
                'completedQuestions',
                'partnerOneIsDone',
                'partnerTwoIsDone',
                'partnerOneCurrentGroup',
                'partnerTwoCurrentGroup',
                'showTransfer'
            ];
            const session = new Session_1.default(props, required);
            session.validate()
                .then(session.hasRequiredProperties.bind(session))
                .then(() => {
                this.insertSession(session)
                    .then((r) => resolve(r))
                    .catch((r) => reject(r));
            })
                .catch((message) => {
                reject(new HttpResponse_1.default(400, 'InvalidInput', message));
            });
        });
    }
    updateSession(filter, props) {
        return new Promise((resolve, reject) => {
            if (Object.keys(props).length === 0) {
                reject(new HttpResponse_1.default(400, 'InvalidInput', 'No properties to update'));
            }
            const session = new Session_1.default(props);
            session.validate()
                .then(() => {
                this.collection.updateOne(filter, { $set: props }, (dbError, dbRes) => {
                    if (dbError) {
                        reject(new HttpResponse_1.default(500, 'Database', dbError));
                    }
                    resolve(new HttpResponse_1.default(200, 'Success', dbRes));
                });
            })
                .catch((message) => {
                reject(new HttpResponse_1.default(400, 'InvalidInput', message));
            });
        });
    }
    updateSessionById(id, props) {
        return new Promise((resolve, reject) => {
            this.getSessionById(id).then(() => {
                this.updateSession({
                    _id: new mongodb_1.ObjectID(id)
                }, props)
                    .then((r) => resolve(r))
                    .catch((e) => reject(e));
            }).catch((r) => reject(r));
        });
    }
    deleteSession(filter) {
        return new Promise((resolve, reject) => {
            this.collection.deleteOne(filter, (dbError, dbRes) => {
                if (dbError) {
                    reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                if (dbRes.result.n === 0) {
                    reject(new HttpResponse_1.default(400, 'InvalidQueryParameterValue', 'Session doesn\'t exist.'));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
    deleteSessionById(id) {
        return new Promise((resolve, reject) => {
            this.getSessionById(id).then(() => {
                this.deleteSession({
                    _id: new mongodb_1.ObjectID(id)
                })
                    .then((r) => resolve(r))
                    .catch((r) => reject(r));
            }).catch((r) => reject(r));
        });
    }
    deleteAll(confirm) {
        return new Promise((resolve, reject) => {
            if (confirm !== 'true') {
                reject(new HttpResponse_1.default(400, 'InvalidInput', 'Requires confirmation.'));
            }
            this.collection.deleteMany({}, (dbError, dbRes) => {
                if (dbError) {
                    reject(new HttpResponse_1.default(500, 'Database', dbError));
                }
                resolve(new HttpResponse_1.default(200, 'Success', dbRes));
            });
        });
    }
}
exports.default = SessionContoller;

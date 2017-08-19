"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectModel_1 = require("./ObjectModel");
const moment_1 = require("moment");
const userSchema = {
    id: 'user',
    properties: {
        username: {
            type: 'string',
            minimum: 1
        },
        password: {
            type: 'string',
            minimum: 5
        },
        created_at: {
            type: 'string'
        }
    },
    additionalProperties: false
};
class User extends ObjectModel_1.default {
    constructor(props, required) {
        super(props, userSchema, required);
        this.props.created_at = moment_1.utc(new Date()).toISOString();
    }
}
exports.default = User;

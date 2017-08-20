"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ObjectModel_1 = require("./ObjectModel");
const moment_1 = require("moment");
const sessionSchema = {
    properties: {
        partnerOneNickname: {
            type: 'string'
        },
        partnerTwoNickname: {
            type: 'string'
        },
        partnerOneQuestions: {
            type: 'array'
        },
        partnerTwoQuestions: {
            type: 'array'
        },
        partnerOneIsDone: {
            type: 'boolean'
        },
        partnerTwoIsDone: {
            type: 'boolean'
        },
        partnerOneCurrentGroup: {
            type: 'number'
        },
        partnerTwoCurrentGroup: {
            type: 'number'
        },
        created_at: {
            type: 'string'
        }
    },
    additionalProperties: false
};
class User extends ObjectModel_1.default {
    constructor(props, required) {
        super(props, sessionSchema, required);
        this.props.created_at = moment_1.utc(new Date()).toISOString();
    }
}
exports.default = User;

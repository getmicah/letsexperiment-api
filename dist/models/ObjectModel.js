"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ajv = require("ajv");
class ObjectModel {
    constructor(props, schema, required) {
        this.props = props;
        this.schema = schema;
        this.required = required;
        this.validator = ajv().compile(this.schema);
    }
    validate() {
        return new Promise((resolve, reject) => {
            if (this.validator(this.props)) {
                resolve();
            }
            else {
                reject('Error on validation.');
            }
        });
    }
    hasRequiredProperties() {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < this.required.length; i++) {
                if (!this.props.hasOwnProperty(this.required[i])) {
                    return reject({
                        text: 'Missing required properties.',
                        data: this.required
                    });
                }
            }
            resolve();
        });
    }
}
exports.default = ObjectModel;

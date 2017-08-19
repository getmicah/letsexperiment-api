"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    server: {
        version: 1,
        port: 3000
    },
    database: {
        path: '~/mongodb',
        host: 'localhost',
        name: 'letsexperiment',
        port: 12345,
        getUrl: function () {
            return `mongodb://${this.host}:${this.port}/${this.name}`;
        }
    },
    auth: {
        secret: 'contra'
    }
};

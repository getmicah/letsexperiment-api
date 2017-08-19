"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpResponse {
    constructor(status, type, message) {
        this.status = status;
        this.type = type;
        this.message = message;
    }
}
exports.default = HttpResponse;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getServices = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getServices(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/services`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServices = getServices;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getOperatingSystems = exports.getOperatingSystem = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getOperatingSystem(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/os/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getOperatingSystem = getOperatingSystem;
async function getOperatingSystems(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/os`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getOperatingSystems = getOperatingSystems;

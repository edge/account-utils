"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSession = exports.getSession = exports.deleteSession = exports.createSession = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function createSession(host, data, cb) {
    const req = superagent_1.default.post(`${host}/account/session`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createSession = createSession;
async function deleteSession(host, token, cb) {
    const req = superagent_1.default.delete(`${host}/account/session`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteSession = deleteSession;
async function getSession(host, token, cb) {
    const req = superagent_1.default.get(`${host}/account/session`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getSession = getSession;
async function updateSession(host, token, cb) {
    const req = superagent_1.default.put(`${host}/account/session`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateSession = updateSession;

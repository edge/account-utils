"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDomain = exports.getInfo = exports.getConfig = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getConfig(host, cb) {
    const req = superagent_1.default.get(`${host}/config`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getConfig = getConfig;
async function getInfo(host, cb) {
    const req = superagent_1.default.get(`${host}/`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getInfo = getInfo;
/** Parse a domain to determine whether it is an apex or subdomain. */
async function parseDomain(host, token, domain, cb) {
    const req = superagent_1.default.get(`${host}/psl/parse/${domain}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.parseDomain = parseDomain;

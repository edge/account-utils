"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRegions = exports.getRegion = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getRegion(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/regions/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getRegion = getRegion;
async function getRegions(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/regions`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getRegions = getRegions;

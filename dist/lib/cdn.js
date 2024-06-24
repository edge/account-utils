"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCdnGraphData = exports.deleteCdnCache = void 0;
const superagent_1 = __importDefault(require("superagent"));
// eslint-disable-next-line max-len
async function deleteCdnCache(host, token, key, data, cb) {
    const req = superagent_1.default.delete(`${host}/integration/${key}/cdn/cache`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteCdnCache = deleteCdnCache;
async function getCdnGraphData(host, token, key, range, cb) {
    const req = superagent_1.default.get(`${host}/integration/${key}/cdn/graph/${range}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getCdnGraphData = getCdnGraphData;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDnsZones = exports.getDnsZone = exports.deleteDnsZone = exports.createDnsZone = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function createDnsZone(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/dns`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createDnsZone = createDnsZone;
async function deleteDnsZone(host, token, zone, cb) {
    const req = superagent_1.default.delete(`${host}/dns/${zone}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteDnsZone = deleteDnsZone;
async function getDnsZone(host, token, zone, cb) {
    const req = superagent_1.default.get(`${host}/dns/${zone}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getDnsZone = getDnsZone;
async function getDnsZones(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/dns`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getDnsZones = getDnsZones;

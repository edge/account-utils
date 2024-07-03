"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateIntegration = exports.getIntegrations = exports.getIntegrationUsage = exports.getIntegration = exports.getInstantIntegrationUsage = exports.deleteIntegration = exports.createIntegration = exports.checkIntegrationDnsRecords = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function checkIntegrationDnsRecords(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/integration/${key}/dns`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.checkIntegrationDnsRecords = checkIntegrationDnsRecords;
async function createIntegration(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/integrations`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createIntegration = createIntegration;
async function deleteIntegration(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/integration/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteIntegration = deleteIntegration;
// eslint-disable-next-line max-len
async function getInstantIntegrationUsage(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/integrations/usage/instant`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getInstantIntegrationUsage = getInstantIntegrationUsage;
async function getIntegration(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/integration/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getIntegration = getIntegration;
// eslint-disable-next-line max-len
async function getIntegrationUsage(host, token, key, params, cb) {
    const req = superagent_1.default.get(`${host}/integration/${key}/usage`).set('Authorization', `Bearer ${token}`).query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getIntegrationUsage = getIntegrationUsage;
// eslint-disable-next-line max-len
async function getIntegrations(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/integrations`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getIntegrations = getIntegrations;
// eslint-disable-next-line max-len
async function updateIntegration(host, token, key, data, cb) {
    const req = superagent_1.default.put(`${host}/integration/${key}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateIntegration = updateIntegration;

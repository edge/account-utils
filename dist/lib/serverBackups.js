"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.restoreServerBackup = exports.getServerBackups = exports.getServerBackupsUsage = exports.getServerBackup = exports.deleteServerBackup = exports.createServerBackup = void 0;
const superagent_1 = __importDefault(require("superagent"));
// eslint-disable-next-line max-len
async function createServerBackup(host, token, server, data, cb) {
    const req = superagent_1.default.post(`${host}/server/${server}/backups`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createServerBackup = createServerBackup;
async function deleteServerBackup(host, token, server, key, cb) {
    const req = superagent_1.default.delete(`${host}/server/${server}/backup/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteServerBackup = deleteServerBackup;
async function getServerBackup(host, token, server, key, cb) {
    const req = superagent_1.default.get(`${host}/server/${server}/backup/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServerBackup = getServerBackup;
async function getServerBackupsUsage(host, token, server, cb) {
    const req = superagent_1.default.get(`${host}/server/${server}/backups/usage`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServerBackupsUsage = getServerBackupsUsage;
// eslint-disable-next-line max-len
async function getServerBackups(host, token, server, params, cb) {
    const req = superagent_1.default.get(`${host}/servers/${server}/backups`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServerBackups = getServerBackups;
// eslint-disable-next-line max-len
async function restoreServerBackup(host, token, server, key, cb) {
    const req = superagent_1.default.post(`${host}/server/${server}/backup/${key}/restore`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.restoreServerBackup = restoreServerBackup;

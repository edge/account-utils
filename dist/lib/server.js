"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateServerBackupStrategy = exports.updateServer = exports.stopServer = exports.startServer = exports.resizeServer = exports.removeServerBackupStrategy = exports.getServers = exports.getServerVncCredentials = exports.getServerTasks = exports.getServerMetrics = exports.getServer = exports.destroyServer = exports.createServerHostname = exports.createServer = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function createServer(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/servers`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createServer = createServer;
async function createServerHostname(host, token, cb) {
    const req = superagent_1.default.post(`${host}/servers/hostname`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createServerHostname = createServerHostname;
async function destroyServer(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/server/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.destroyServer = destroyServer;
async function getServer(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/server/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServer = getServer;
async function getServerMetrics(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/server/${key}/metrics`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServerMetrics = getServerMetrics;
// eslint-disable-next-line max-len
async function getServerTasks(host, token, key, params, cb) {
    const req = superagent_1.default.get(`${host}/server/${key}/tasks`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServerTasks = getServerTasks;
/**
 * Get a server's VNC credentials.
 * Subsequently, use your preferred WebSocket-based client to connect to `${host}/server/${key}/vnc`.
 * For example, NoVNC: https://novnc.com/info.html
 */
async function getServerVncCredentials(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/server/${key}/vnc/credentials`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServerVncCredentials = getServerVncCredentials;
async function getServers(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/servers`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getServers = getServers;
async function removeServerBackupStrategy(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/server/${key}/backups/strategy`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.removeServerBackupStrategy = removeServerBackupStrategy;
async function resizeServer(host, token, key, data, cb) {
    const req = superagent_1.default.post(`${host}/server/${key}/resize`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.resizeServer = resizeServer;
async function startServer(host, token, key, cb) {
    const req = superagent_1.default.post(`${host}/server/${key}/start`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.startServer = startServer;
async function stopServer(host, token, key, cb) {
    const req = superagent_1.default.post(`${host}/server/${key}/stop`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.stopServer = stopServer;
async function updateServer(host, token, key, data, cb) {
    const req = superagent_1.default.put(`${host}/server/${key}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateServer = updateServer;
// eslint-disable-next-line max-len
async function updateServerBackupStrategy(host, token, key, data, cb) {
    const req = superagent_1.default.put(`${host}/server/${key}/backups/strategy`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateServerBackupStrategy = updateServerBackupStrategy;

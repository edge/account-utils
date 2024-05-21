"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStorageFile = exports.updateStorageNode = exports.updateStorageFiles = exports.getStorageNode = exports.getStorageFiles = exports.deleteStorageNode = exports.deleteStorageFiles = exports.createStorageNode = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function createStorageNode(host, token, key, path, cb) {
    const req = superagent_1.default.post(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createStorageNode = createStorageNode;
// eslint-disable-next-line max-len
async function deleteStorageFiles(host, token, key, data, cb) {
    const req = superagent_1.default.delete(`${host}/storage/${key}/files`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteStorageFiles = deleteStorageFiles;
async function deleteStorageNode(host, token, key, path, cb) {
    const req = superagent_1.default.delete(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteStorageNode = deleteStorageNode;
// eslint-disable-next-line max-len
async function getStorageFiles(host, token, key, params, cb) {
    const req = superagent_1.default.get(`${host}/storage/${key}/files`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getStorageFiles = getStorageFiles;
// eslint-disable-next-line max-len
async function getStorageNode(host, token, key, path, params, cb) {
    const req = superagent_1.default.get(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getStorageNode = getStorageNode;
// eslint-disable-next-line max-len
async function updateStorageFiles(host, token, key, data, cb) {
    const req = superagent_1.default.put(`${host}/storage/${key}/files`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateStorageFiles = updateStorageFiles;
// eslint-disable-next-line max-len
async function updateStorageNode(host, token, key, path, data, cb) {
    const req = superagent_1.default.put(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateStorageNode = updateStorageNode;
/**
 * Upload a file to a Gateway (**not** the Account API).
 */
// eslint-disable-next-line max-len
async function uploadStorageFile(gateway, apiKey, key, path, file, cb) {
    const req = superagent_1.default.post(`${gateway}/files/${key}/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${apiKey}`).attach('file', file);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.uploadStorageFile = uploadStorageFile;

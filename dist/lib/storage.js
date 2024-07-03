"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadStorageFile = exports.updateStorageNode = exports.updateStorageFiles = exports.getStorageNode = exports.getStorageFiles = exports.deleteStorageNode = exports.deleteStorageFiles = exports.createStorageNode = void 0;
const superagent_1 = __importDefault(require("superagent"));
/**
 * Create a [folder] node in a storage integration.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to [folder] node
 * @return New node data
 */
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
/**
 * Delete a node.
 * If the node is a folder, then its child nodes are deleted automatically by API.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @return Old node data
 */
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
/**
 * Get a node.
 * If the node is a folder, then its child nodes are also retrieved in a list, subject to the `params` provided.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @param params Query parameters for child nodes
 */
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
/**
 * Update a node.
 * If the node is a folder, then its child nodes will be updated automatically by API as applicable to the update.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @param data Node update data
 * @return Updated node data
 */
// eslint-disable-next-line max-len
async function updateStorageNode(host, token, key, path, data, cb) {
    const req = superagent_1.default.put(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateStorageNode = updateStorageNode;
/**
 * Upload a file to a Gateway (**not** directly to the Account API).
 *
 * @param host Gateway URL (**not** API base URL)
 * @param apiKey Integration API key
 * @param key Integration key
 * @param path Path to file
 * @param file File data
 * @return Gateway response with UUID
 */
// eslint-disable-next-line max-len
async function uploadStorageFile(gateway, apiKey, key, path, file, cb) {
    const req = superagent_1.default.post(`${gateway}/files/${key}/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${apiKey}`).attach('file', file);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.uploadStorageFile = uploadStorageFile;

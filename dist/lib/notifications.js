"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateNotifications = exports.updateAllNotifications = exports.getNotifications = exports.getNotification = exports.deleteNotifications = void 0;
const superagent_1 = __importDefault(require("superagent"));
// eslint-disable-next-line max-len
async function deleteNotifications(host, token, data, cb) {
    const req = superagent_1.default.delete(`${host}/notifications`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteNotifications = deleteNotifications;
async function getNotification(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/notification/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getNotification = getNotification;
// eslint-disable-next-line max-len
async function getNotifications(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/notifications`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getNotifications = getNotifications;
// eslint-disable-next-line max-len
async function updateAllNotifications(host, token, data, cb) {
    const req = superagent_1.default.put(`${host}/notifications`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateAllNotifications = updateAllNotifications;
// eslint-disable-next-line max-len
async function updateNotifications(host, token, data, cb) {
    const req = superagent_1.default.put(`${host}/notifications`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateNotifications = updateNotifications;

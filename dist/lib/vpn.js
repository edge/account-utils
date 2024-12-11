"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateVpnUser = exports.updateVpn = exports.renewVpnCertificate = exports.getVpnUsers = exports.getVpnUser = exports.getVpnCertificate = exports.getVpns = exports.getVpn = exports.emailVpnCertificate = exports.deleteVpnUser = exports.deleteVpn = exports.createVpnUser = exports.createVpn = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function createVpn(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/vpns`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createVpn = createVpn;
// eslint-disable-next-line max-len
async function createVpnUser(host, token, key, data, cb) {
    const req = superagent_1.default.post(`${host}/vpn/${key}/users`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createVpnUser = createVpnUser;
async function deleteVpn(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/vpn/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteVpn = deleteVpn;
async function deleteVpnUser(host, token, key, userKey, cb) {
    const req = superagent_1.default.delete(`${host}/vpn/${key}/user/${userKey}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteVpnUser = deleteVpnUser;
// eslint-disable-next-line max-len
async function emailVpnCertificate(host, token, key, userKey, cb) {
    const req = superagent_1.default.patch(`${host}/vpn/${key}/user/${userKey}/cert/email`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.emailVpnCertificate = emailVpnCertificate;
async function getVpn(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/vpn/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getVpn = getVpn;
async function getVpns(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/vpns`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getVpns = getVpns;
// eslint-disable-next-line max-len
async function getVpnCertificate(host, token, key, userKey, filename, cb) {
    // Resolve overload arguments
    let _filename;
    let _cb;
    if (typeof filename === 'function') {
        _cb = filename;
    }
    else if (typeof filename === 'string') {
        _filename = filename;
        _cb = cb;
    }
    const req = superagent_1.default.get(`${host}/vpn/${key}/user/${userKey}/cert`)
        .responseType('blob')
        .set('Authorization', `Bearer ${token}`);
    const res = await _cb?.(req) || await req;
    if (_filename) {
        const el = document.createElement('a');
        const url = window.URL.createObjectURL(res.body);
        el.href = url;
        el.download = _filename;
        el.click();
        window.URL.revokeObjectURL(url);
    }
    else {
        return res.body;
    }
}
exports.getVpnCertificate = getVpnCertificate;
async function getVpnUser(host, token, key, userKey, cb) {
    const req = superagent_1.default.get(`${host}/vpn/${key}/user/${userKey}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getVpnUser = getVpnUser;
// eslint-disable-next-line max-len
async function getVpnUsers(host, token, key, params, cb) {
    let _key;
    let _params;
    let _cb;
    if (typeof key === 'function') {
        _cb = key;
    }
    else if (typeof key === 'string') {
        _key = key;
    }
    else if (key) {
        _params = key;
    }
    if (typeof params === 'function') {
        _cb = params;
    }
    else {
        _params = params;
        _cb = cb;
    }
    const url = _key ? `${host}/vpn/${_key}/users` : `${host}/vpns/users`;
    const req = superagent_1.default.get(url).set('Authorization', `Bearer ${token}`);
    _params && req.query(_params);
    const res = await _cb?.(req) || await req;
    return res.body;
}
exports.getVpnUsers = getVpnUsers;
// eslint-disable-next-line max-len
async function renewVpnCertificate(host, token, key, userKey, cb) {
    const req = superagent_1.default.patch(`${host}/vpn/${key}/user/${userKey}/cert/renew`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.renewVpnCertificate = renewVpnCertificate;
async function updateVpn(host, token, key, data, cb) {
    const req = superagent_1.default.put(`${host}/vpn/${key}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateVpn = updateVpn;
// eslint-disable-next-line max-len
async function updateVpnUser(host, token, key, userKey, data, cb) {
    const req = superagent_1.default.put(`${host}/vpn/${key}/user/${userKey}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateVpnUser = updateVpnUser;

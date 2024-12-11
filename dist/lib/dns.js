"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateDnsZoneRecord = exports.requestDnsZoneScan = exports.getDnsZones = exports.getDnsZoneRecords = exports.getDnsZoneRecord = exports.getDnsZone = exports.deleteDnsZoneRecord = exports.deleteDnsZone = exports.createDnsZoneRecord = exports.createDnsZone = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function createDnsZone(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/dns`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createDnsZone = createDnsZone;
// eslint-disable-next-line max-len
async function createDnsZoneRecord(host, token, zone, data, cb) {
    const req = superagent_1.default.post(`${host}/dns/${zone}/records`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createDnsZoneRecord = createDnsZoneRecord;
async function deleteDnsZone(host, token, zone, cb) {
    const req = superagent_1.default.delete(`${host}/dns/${zone}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteDnsZone = deleteDnsZone;
async function deleteDnsZoneRecord(host, token, zone, key, cb) {
    const req = superagent_1.default.delete(`${host}/dns/${zone}/record/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deleteDnsZoneRecord = deleteDnsZoneRecord;
async function getDnsZone(host, token, zone, cb) {
    const req = superagent_1.default.get(`${host}/dns/${zone}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getDnsZone = getDnsZone;
async function getDnsZoneRecord(host, token, zone, key, cb) {
    const req = superagent_1.default.get(`${host}/dns/${zone}/record/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getDnsZoneRecord = getDnsZoneRecord;
// eslint-disable-next-line max-len
async function getDnsZoneRecords(host, token, zone, params, cb) {
    const req = superagent_1.default.get(`${host}/dns/${zone}/records`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getDnsZoneRecords = getDnsZoneRecords;
async function getDnsZones(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/dns`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getDnsZones = getDnsZones;
async function requestDnsZoneScan(host, token, zone, cb) {
    const req = superagent_1.default.post(`${host}/dns/${zone}/scan`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.requestDnsZoneScan = requestDnsZoneScan;
// eslint-disable-next-line max-len
async function updateDnsZoneRecord(host, token, zone, key, data, cb) {
    const req = superagent_1.default.put(`${host}/dns/${zone}/record/${key}`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateDnsZoneRecord = updateDnsZoneRecord;

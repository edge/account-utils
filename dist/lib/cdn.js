"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
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
async function getCdnGraphData(host, token, key, params, cb) {
    const req = superagent_1.default.get(`${host}/integration/${key}/cdn/graph`).set('Authorization', `Bearer ${token}`).query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getCdnGraphData = getCdnGraphData;

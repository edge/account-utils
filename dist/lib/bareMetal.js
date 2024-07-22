"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBareMetals = exports.getBareMetal = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getBareMetal(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/bare-metal/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getBareMetal = getBareMetal;
// eslint-disable-next-line max-len
async function getBareMetals(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/bare-metals`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getBareMetals = getBareMetals;

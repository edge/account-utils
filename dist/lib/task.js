"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTasks = exports.getTask = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getTask(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/task/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getTask = getTask;
async function getTasks(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/tasks`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getTasks = getTasks;

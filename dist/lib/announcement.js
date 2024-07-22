"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markAnnouncementsUnread = exports.markAnnouncementsRead = exports.getAnnouncements = exports.getAnnouncement = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getAnnouncement(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/announcement/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getAnnouncement = getAnnouncement;
// eslint-disable-next-line max-len
async function getAnnouncements(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/announcements`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getAnnouncements = getAnnouncements;
// eslint-disable-next-line max-len
async function markAnnouncementsRead(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/announcements/read`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.markAnnouncementsRead = markAnnouncementsRead;
// eslint-disable-next-line max-len
async function markAnnouncementsUnread(host, token, data, cb) {
    const req = superagent_1.default.delete(`${host}/announcements/read`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.markAnnouncementsUnread = markAnnouncementsUnread;

"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeFromProduct = exports.subscribeToProduct = exports.getProductSubscriptions = exports.getProduct = void 0;
const superagent_1 = __importDefault(require("superagent"));
/** @todo require token */
async function getProduct(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/product/${key}`);
    token && req.set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getProduct = getProduct;
// eslint-disable-next-line max-len
async function getProductSubscriptions(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/products/subscriptions`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getProductSubscriptions = getProductSubscriptions;
async function subscribeToProduct(host, token, key, cb) {
    const req = superagent_1.default.post(`${host}/product/${key}/subscription`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.subscribeToProduct = subscribeToProduct;
async function unsubscribeFromProduct(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/product/${key}/subscription`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.unsubscribeFromProduct = unsubscribeFromProduct;

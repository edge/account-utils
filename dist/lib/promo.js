"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.redeemPromoCode = exports.getPromoEntitlements = exports.getPromoEntitlement = exports.deletePromoEntitlement = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function deletePromoEntitlement(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/promos/entitlement/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deletePromoEntitlement = deletePromoEntitlement;
async function getPromoEntitlement(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/promos/entitlement/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPromoEntitlement = getPromoEntitlement;
// eslint-disable-next-line max-len
async function getPromoEntitlements(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/promos/entitlements`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPromoEntitlements = getPromoEntitlements;
// eslint-disable-next-line max-len
async function redeemPromoCode(host, token, key, data, cb) {
    // Alternate form
    if (typeof key === 'string') {
        if (!data || typeof data === 'function')
            throw new Error('invalid data for redeemPromoCode');
        const req = superagent_1.default.post(`${host}/promo/${key}/redeem`).set('Authorization', `Bearer ${token}`).send(data);
        const res = await cb?.(req) || await req;
        return res.body;
    }
    // Standard form
    cb = data;
    data = key;
    const req = superagent_1.default.post(`${host}/promos/redeem`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.redeemPromoCode = redeemPromoCode;

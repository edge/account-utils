"use strict";
// Copyright (C) 2022 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyAccountMagicLinkToken = exports.verifyAccountEmail = exports.updateAccountEmail = exports.updateAccount = exports.sendAccountMagicLink = exports.resendAccountVerificationEmail = exports.removeAccountTOTP = exports.removeAccountEmail = exports.getAccountReferredAccounts = exports.getAccountProgress = exports.getAccount = exports.createAccount = exports.addAccountTOTP = exports.addAccountEmail = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function addAccountEmail(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/account/email`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.addAccountEmail = addAccountEmail;
async function addAccountTOTP(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/account/totp`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.addAccountTOTP = addAccountTOTP;
async function createAccount(host, data, cb) {
    const req = superagent_1.default.post(`${host}/account`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createAccount = createAccount;
async function getAccount(host, token, cb) {
    const req = superagent_1.default.get(`${host}/account`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getAccount = getAccount;
async function getAccountProgress(host, token, cb) {
    const req = superagent_1.default.get(`${host}/account/progress`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getAccountProgress = getAccountProgress;
async function getAccountReferredAccounts(host, token, cb) {
    const req = superagent_1.default.get(`${host}/account/referred`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getAccountReferredAccounts = getAccountReferredAccounts;
// eslint-disable-next-line max-len
async function removeAccountEmail(host, token, data, cb) {
    const req = superagent_1.default.delete(`${host}/account/email`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.removeAccountEmail = removeAccountEmail;
async function removeAccountTOTP(host, token, data, cb) {
    const req = superagent_1.default.delete(`${host}/account/totp`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.removeAccountTOTP = removeAccountTOTP;
// eslint-disable-next-line max-len
async function resendAccountVerificationEmail(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/account/email/verify/resend`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.resendAccountVerificationEmail = resendAccountVerificationEmail;
async function sendAccountMagicLink(host, data, cb) {
    const req = superagent_1.default.post(`${host}/account/magicLink`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.sendAccountMagicLink = sendAccountMagicLink;
async function updateAccount(host, token, data, cb) {
    const req = superagent_1.default.put(`${host}/account`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateAccount = updateAccount;
// eslint-disable-next-line max-len
async function updateAccountEmail(host, token, data, cb) {
    const req = superagent_1.default.put(`${host}/account/email`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.updateAccountEmail = updateAccountEmail;
// eslint-disable-next-line max-len
async function verifyAccountEmail(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/account/email/verify`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.verifyAccountEmail = verifyAccountEmail;
async function verifyAccountMagicLinkToken(host, token, cb) {
    const req = superagent_1.default.post(`${host}/account/magicLink/verify`).send({ token });
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.verifyAccountMagicLinkToken = verifyAccountMagicLinkToken;

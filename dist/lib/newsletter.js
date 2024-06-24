"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unsubscribeFromNewsletter = exports.subscribeToNewsletter = exports.getNewsletterSubscription = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function getNewsletterSubscription(host, token, cb) {
    const req = superagent_1.default.get(`${host}/newsletter/subscriber`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getNewsletterSubscription = getNewsletterSubscription;
// eslint-disable-next-line max-len
async function subscribeToNewsletter(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/newsletter/subscriber`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.subscribeToNewsletter = subscribeToNewsletter;
// eslint-disable-next-line max-len
async function unsubscribeFromNewsletter(host, token, data, cb) {
    const req = superagent_1.default.delete(`${host}/newsletter/subscriber`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.unsubscribeFromNewsletter = unsubscribeFromNewsletter;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.unholdInvoice = exports.setDefaultPaymentMethod = exports.removeDefaultPaymentMethod = exports.refreshPurchase = exports.getPurchases = exports.getPurchase = exports.getPayments = exports.getPaymentMethods = exports.getPaymentMethod = exports.getPayment = exports.getInvoices = exports.getInvoice = exports.getBillingCharges = exports.getAccountBalance = exports.downloadInvoice = exports.deletePaymentMethod = exports.createStripeSetupIntent = exports.cancelPurchase = exports.beginStripePurchase = exports.addPaymentMethod = void 0;
const superagent_1 = __importDefault(require("superagent"));
async function addPaymentMethod(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/billing/paymentMethods`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.addPaymentMethod = addPaymentMethod;
// eslint-disable-next-line max-len
async function beginStripePurchase(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/billing/purchases`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.beginStripePurchase = beginStripePurchase;
async function cancelPurchase(host, token, key, cb) {
    const req = superagent_1.default.post(`${host}/billing/purchase/${key}/cancel`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.cancelPurchase = cancelPurchase;
// eslint-disable-next-line max-len
async function createStripeSetupIntent(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/billing/paymentMethods/setup/stripe`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.createStripeSetupIntent = createStripeSetupIntent;
async function deletePaymentMethod(host, token, key, cb) {
    const req = superagent_1.default.delete(`${host}/billing/paymentMethod/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.deletePaymentMethod = deletePaymentMethod;
async function downloadInvoice(host, token, key, filename, cb) {
    // Resolve optional arguments
    if (typeof filename === 'function') {
        cb = filename;
        filename = undefined;
    }
    const req = superagent_1.default.get(`${host}/billing/invoice/${key}/download`)
        .responseType('blob')
        .set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    if (filename) {
        const el = document.createElement('a');
        const url = window.URL.createObjectURL(res.body);
        el.href = url;
        el.download = filename;
        el.click();
        window.URL.revokeObjectURL(url);
    }
    else {
        return res.body;
    }
}
exports.downloadInvoice = downloadInvoice;
async function getAccountBalance(host, token, cb) {
    const req = superagent_1.default.get(`${host}/billing/balance`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getAccountBalance = getAccountBalance;
// eslint-disable-next-line max-len
async function getBillingCharges(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/billing/charges`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getBillingCharges = getBillingCharges;
async function getInvoice(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/billing/invoice/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getInvoice = getInvoice;
async function getInvoices(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/billing/invoices`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getInvoices = getInvoices;
async function getPayment(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/billing/payment/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPayment = getPayment;
async function getPaymentMethod(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/billing/paymentMethod/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPaymentMethod = getPaymentMethod;
// eslint-disable-next-line max-len
async function getPaymentMethods(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/billing/paymentMethods`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPaymentMethods = getPaymentMethods;
async function getPayments(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/billing/payments`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPayments = getPayments;
async function getPurchase(host, token, key, cb) {
    const req = superagent_1.default.get(`${host}/billing/purchase/${key}`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPurchase = getPurchase;
async function getPurchases(host, token, params, cb) {
    const req = superagent_1.default.get(`${host}/billing/purchases`).set('Authorization', `Bearer ${token}`);
    params && req.query(params);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.getPurchases = getPurchases;
async function refreshPurchase(host, token, key, cb) {
    const req = superagent_1.default.post(`${host}/billing/purchase/${key}/refresh`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.refreshPurchase = refreshPurchase;
// eslint-disable-next-line max-len
async function removeDefaultPaymentMethod(host, token, data, cb) {
    const req = superagent_1.default.delete(`${host}/account/topup`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.removeDefaultPaymentMethod = removeDefaultPaymentMethod;
// eslint-disable-next-line max-len
async function setDefaultPaymentMethod(host, token, data, cb) {
    const req = superagent_1.default.post(`${host}/account/topup`).set('Authorization', `Bearer ${token}`).send(data);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.setDefaultPaymentMethod = setDefaultPaymentMethod;
async function unholdInvoice(host, token, key, cb) {
    const req = superagent_1.default.post(`${host}/billing/invoice/${key}/unhold`).set('Authorization', `Bearer ${token}`);
    const res = await cb?.(req) || await req;
    return res.body;
}
exports.unholdInvoice = unholdInvoice;

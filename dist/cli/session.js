"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const lib = __importStar(require("../lib"));
function createSession({ config, print, state }) {
    return async function (account, otp) {
        const res = await lib.err(lib.createSession(config.api.url, { account, otp }, r => r.timeout(config.api.timeout)));
        state.session = res.session;
        print(res);
    };
}
function deleteSession({ config, print, state }) {
    return async function () {
        if (!state.session)
            return;
        const res = await lib.err(lib.deleteSession(config.api.url, state.session._key, r => r.timeout(config.api.timeout)));
        state.session = undefined;
        print(res);
    };
}
function updateSession({ config, print, state }) {
    return async function () {
        if (!state.session)
            throw new Error('no session');
        const res = await lib.err(lib.updateSession(config.api.url, state.session._key, r => r.timeout(config.api.timeout)));
        state.session = res.session;
        print(res);
    };
}
function register(ctx) {
    const cmd = ctx.root.command('session');
    cmd.command('create <account> [totp]').action(createSession(ctx));
    cmd.command('delete').action(deleteSession(ctx));
    cmd.command('update').action(updateSession(ctx));
}
exports.register = register;

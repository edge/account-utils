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
function deleteFiles({ config, print, state }, self) {
    return async function (files) {
        if (!state.session)
            throw new Error('no session');
        const { key } = self.opts();
        const res = await lib.err(lib.deleteStorageFiles(config.api.url, state.session._key, key || state.integrationKey, { files }));
        print(res);
    };
}
function getFiles({ config, print, state }, self) {
    return async function () {
        if (!state.session)
            throw new Error('no session');
        const { key, limit = '10', page = '1' } = self.opts();
        const res = await lib.err(lib.getStorageFiles(config.api.url, state.session._key, key || state.integrationKey, {
            limit: parseInt(limit),
            page: parseInt(page)
        }));
        print(res);
    };
}
function uploadFile({ config, print, state }, self) {
    return async function (file, path) {
        const { apiKey, key } = self.opts();
        const res = await lib.uploadStorageFile(config.gateway.url, apiKey || state.storageApiKey, key || state.integrationKey, path, file, r => r.timeout(config.gateway.timeout));
        print(res);
    };
}
function useIntegration({ state }) {
    return function (key, apiKey) {
        state.integrationKey = key;
        state.storageApiKey = apiKey;
    };
}
function register(ctx) {
    const cmd = ctx.root.command('storage');
    const filesCmd = cmd.command('files')
        .option('--key <str>', 'integration key')
        .option('--limit <n>', 'number of files')
        .option('--page <n>', 'page number');
    filesCmd.action(getFiles(ctx, filesCmd));
    const filesDeleteCmd = filesCmd.command('delete <id...>')
        .option('--key <str>', 'integration key');
    filesDeleteCmd.action(deleteFiles(ctx, filesDeleteCmd));
    const uploadCmd = cmd.command('upload <file> <path>')
        .option('--api-key <str>', 'integration API key')
        .option('--key <str>', 'integration key');
    uploadCmd.action(uploadFile(ctx, uploadCmd));
    cmd.command('use <key> <api-key>').action(useIntegration(ctx));
}
exports.register = register;

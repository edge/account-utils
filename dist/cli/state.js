"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = __importDefault(require("fs/promises"));
const path_1 = __importDefault(require("path"));
async function createState(ctx) {
    const state = {};
    async function read() {
        const data = await promises_1.default.readFile(ctx.config.state.file);
        const newState = JSON.parse(data.toString());
        for (const prop in newState) {
            const p = prop;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            state[p] = newState[p];
        }
    }
    async function write() {
        const data = JSON.stringify(state);
        await promises_1.default.mkdir(path_1.default.dirname(ctx.config.state.file), { recursive: true });
        await promises_1.default.writeFile(ctx.config.state.file, data);
    }
    try {
        await read();
    }
    catch (err) {
        if (err.code !== 'ENOENT') {
            throw err;
        }
    }
    return {
        get integrationKey() {
            return state.integrationKey;
        },
        set integrationKey(v) {
            state.integrationKey = v;
            write();
        },
        get session() {
            return state.session;
        },
        set session(v) {
            state.session = v;
            write();
        },
        get storageApiKey() {
            return state.storageApiKey;
        },
        set storageApiKey(v) {
            state.storageApiKey = v;
            write();
        }
    };
}
exports.default = createState;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const main_1 = __importDefault(require("./main"));
const os_1 = __importDefault(require("os"));
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, main_1.default)(process.argv, {
    api: {
        timeout: parseInt(process.env.API_TIMEOUT || '60000'),
        url: process.env.API_URL || 'http://localhost:8419'
    },
    gateway: {
        timeout: parseInt(process.env.GATEWAY_TIMEOUT || '60000'),
        url: process.env.API_URL || 'http://gateway.local.network:3000'
    },
    json: {
        indent: parseInt(process.env.JSON_INDENT || '4')
    },
    state: {
        file: process.env.STATE_FILE || path_1.default.resolve(os_1.default.homedir(), '.edge', 'account-cli', 'state.json')
    }
})
    .catch(err => {
    console.error(err);
});

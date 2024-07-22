"use strict";
// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.
Object.defineProperty(exports, "__esModule", { value: true });
exports.err = exports.AccountError = void 0;
/**
 * Specialized Error class for Account API errors.
 * See `err()` for more detail and typical usage advice.
 */
class AccountError extends Error {
    code;
    data;
    responseError;
    constructor(code, message, data) {
        super(message);
        this.code = code;
        this.name = 'AccountError';
        this.data = data;
    }
    static fromResponse(err, keepOriginal) {
        if (err instanceof Error) {
            const re = err;
            if (re.response?.body?.message) {
                const e = new AccountError(re.response.status, re.response.body.message, re.response.body);
                if (keepOriginal)
                    e.responseError = re;
                return e;
            }
        }
        return err;
    }
}
exports.AccountError = AccountError;
/**
 * This wrapper function provides convenience when handling Account errors, specifically in HTTP responses (although
 * not exclusively Promises).
 * If an Error occurs, it is caught for processing; if it is a ResponseError, its response JSON is extracted.
 * The error message in the JSON is then thrown to the caller as an AccountError in place of the ResponseError.
 * If it is not a ResponseError with a usable JSON body, the original Error is thrown again.
 * If there is no error, the expected result is returned as normal.
 */
const err = async (result, keepResponse) => {
    try {
        if (result instanceof Promise) {
            return await result;
        }
        return result;
    }
    catch (err) {
        throw AccountError.fromResponse(err, keepResponse);
    }
};
exports.err = err;

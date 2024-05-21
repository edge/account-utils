import { ResponseError } from 'superagent';
/**
 * Specialized Error class for Account API errors.
 * See `err()` and `extractAccountError()` for more detail and typical usage advice.
 */
export declare class AccountError extends Error {
    code: number;
    data: unknown;
    responseError?: ResponseError;
    constructor(code: number, message: string, data: unknown);
    static fromResponse(err: unknown, keepOriginal?: boolean): unknown;
}
/**
 * This wrapper function provides convenience when handling Account errors, specifically in HTTP responses (although
 * not exclusively Promises).
 * If an Error occurs, it is caught for processing; if it is a ResponseError, its response JSON is extracted.
 * The error message in the JSON is then thrown to the caller as a AccountError in place of the ResponseError.
 * If it is not a ResponseError with a usable JSON body, the original Error is thrown again.
 * If there is no error, the expected result is returned as normal.
 */
export declare const err: <T>(result: T | Promise<T>, keepResponse?: boolean) => Promise<T>;

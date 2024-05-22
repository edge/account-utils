import { ResponseError } from 'superagent'

/**
 * Specialized Error class for Account API errors.
 * See `err()` for more detail and typical usage advice.
 */
export class AccountError extends Error {
  public code
  public data
  public responseError?: ResponseError

  constructor(code: number, message: string, data: unknown) {
    super(message)
    this.code = code
    this.name = 'AccountError'
    this.data = data
  }

  static fromResponse(err: unknown, keepOriginal?: boolean) {
    if (err instanceof Error) {
      const re = err as ResponseError
      if (re.response?.body?.message) {
        const e = new AccountError(re.response.status, re.response.body.message, re.response.body)
        if (keepOriginal) e.responseError = re
        return e
      }
    }
    return err
  }
}

/**
 * This wrapper function provides convenience when handling Account errors, specifically in HTTP responses (although
 * not exclusively Promises).
 * If an Error occurs, it is caught for processing; if it is a ResponseError, its response JSON is extracted.
 * The error message in the JSON is then thrown to the caller as a AccountError in place of the ResponseError.
 * If it is not a ResponseError with a usable JSON body, the original Error is thrown again.
 * If there is no error, the expected result is returned as normal.
 */
export const err = async <T>(result: T | Promise<T>, keepResponse?: boolean): Promise<T> => {
  try {
    if (result instanceof Promise) {
      return await result
    }
    return result
  }
  catch (err) {
    throw AccountError.fromResponse(err, keepResponse)
  }
}

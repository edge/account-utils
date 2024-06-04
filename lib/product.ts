import { RequestCallback } from '.'
import superagent from 'superagent'

/** Generic price type. */
export type Price = PriceFlatRate

/**
 * Flat rate pricing definition.
 * A fixed USD `cost` is charged over a `costBasis` in hours.
 */
export type PriceFlatRate = {
  type: 'flatRate'
  /** Cost (USD) */
  cost: number
  /** Cost basis (hours) */
  costBasis: number
}

/** Product */
export interface Product<T extends Price = Price> {
  /** Name of product (for reference) */
  name: string
  /** Summary (used in billing) */
  summary: string
  /** Price for product subscription */
  price: T
  /** Minimum duration of a subscription (hours) */
  minDuration?: number
  /** Active flag */
  active: boolean
  internal?: boolean
}

export interface GetProductResponse {
  product: Product
}

/** @todo require token */
export async function getProduct(host: string, token: string | undefined, key: string, cb?: RequestCallback): Promise<GetProductResponse> {
  const req = superagent.get(`${host}/products/${key}`)
  token && req.set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

import superagent from 'superagent'
import { Key, PaginationParams, RequestCallback, SearchResponse, Timestamps } from '.'

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

export interface ProductSubscription extends Key, Timestamps {
  /** Account key */
  account: string
  /** Subscription key */
  product: string
  /** Active flag */
  active: boolean
  /** Suspended flag */
  suspended?: boolean
}

export interface GetProductResponse {
  product: Product
}

export interface GetProductSubscriptionsRequest extends Omit<PaginationParams, 'sort'> {}

export interface SubscribeToProductResponse {
  subscription: ProductSubscription
  message: string
}

export interface UnsubscribeFromProductResponse {
  subscription: ProductSubscription
  message: string
}

/** @todo require token */
export async function getProduct(host: string, token: string | undefined, key: string, cb?: RequestCallback): Promise<GetProductResponse> {
  const req = superagent.get(`${host}/products/${key}`)
  token && req.set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getProductSubscriptions(host: string, token: string, params?: GetProductSubscriptionsRequest, cb?: RequestCallback): Promise<SearchResponse<ProductSubscription>> {
  const req = superagent.get(`${host}/subscriptions`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

export async function subscribeToProduct(host: string, token: string, key: string, cb?: RequestCallback): Promise<SubscribeToProductResponse> {
  const req = superagent.post(`${host}/products/${key}/subscription`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function unsubscribeFromProduct(host: string, token: string, key: string, cb?: RequestCallback): Promise<UnsubscribeFromProductResponse> {
  const req = superagent.delete(`${host}/products/${key}/subscription`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

export interface Promo extends Key, Timestamps {
  name: string

  active: boolean
  start: number | null
  end: number | null
  newAccountOnly: boolean

  config: PromoConfig

  codeConfig: PromoCodeConfig

  comments?: string
}

export interface PromoCreditConfig {
  type: 'credit'
  /** Amount in USD */
  amount: number
}

export type PromoCodeConfig = PromoSingleCodeConfig

export type PromoConfig = PromoCreditConfig | PromoDiscountConfig

export interface PromoDiscountConfig {
  type: 'discount'
  mode: 'fixed' | 'percentage'
  /** Amount in USD or %, depending on mode */
  amount: number
}

export interface PromoEntitlement extends Key, Timestamps {
  account: string
  code?: string
  promo: Promo
  expires?: number | null
  credit?: {
    remaining: number
  }
  status: 'active' | 'consume' | 'expired' | 'partConsumed' | 'void'
}

export interface PromoSingleCodeConfig {
  type: 'single'
  code: string
  maxUses: number
  maxConcurrentUses: number
  expiry: PromoSingleCodeExpiryConfig
}

export type PromoSingleCodeExpiryConfig =
  { type: 'never' } |
  { type: 'withPromo' } |
  { type: 'days', days: number } |
  { type: 'daysOrWithPromo', days: number }

export interface DeletePromoEntitlementResponse {
  entitlement: PromoEntitlement
}

export interface GetPromoEntitlementResponse {
  entitlement: PromoEntitlement
}

export interface GetPromoEntitlementsParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  account?: string | string[]
  promo?: string | string[]
  status?: string | string[]
}

export interface RedeemPromoCodeRequest {
  account: string
  code?: string
}

export interface RedeemPromoCodeResponse {
  entitlement: PromoEntitlement
}

export async function deletePromoEntitlement(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeletePromoEntitlementResponse> {
  const req = superagent.delete(`${host}/promos/entitlement/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getPromoEntitlement(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetPromoEntitlementResponse> {
  const req = superagent.get(`${host}/promos/entitlement/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getPromoEntitlements(host: string, token: string, params: GetPromoEntitlementsParams, cb?: RequestCallback): Promise<SearchResponse<PromoEntitlement>> {
  const req = superagent.get(`${host}/promos/entitlements`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

/** Redeem promo code. */
export async function redeemPromoCode(host: string, token: string, data: RedeemPromoCodeRequest, cb?: RequestCallback): Promise<RedeemPromoCodeResponse>
/**
 * Redeem promo code (alternate form).
 * This allows validating a code against a specific promotion.
 */
// eslint-disable-next-line max-len
export async function redeemPromoCode(host: string, token: string, key: string, data: RedeemPromoCodeRequest, cb?: RequestCallback): Promise<RedeemPromoCodeResponse>
// eslint-disable-next-line max-len
export async function redeemPromoCode(host: string, token: string, key: string | RedeemPromoCodeRequest, data?: RedeemPromoCodeRequest | RequestCallback, cb?: RequestCallback): Promise<RedeemPromoCodeResponse> {
  // Alternate form
  if (typeof key === 'string') {
    if (!data || typeof data === 'function') throw new Error('invalid data for redeemPromoCode')

    const req = superagent.post(`${host}/promo/${key}/redeem`).set('Authorization', `Bearer ${token}`).send(data)
    const res = await cb?.(req) || await req
    return res.body
  }

  // Standard form
  const req = superagent.post(`${host}/promos/redeem`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

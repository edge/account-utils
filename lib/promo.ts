import { Key, Timestamps } from '.'

export interface Entitlement extends Key, Timestamps {
  account: string
  code?: string
  promo: Promo
  expires?: number | null
  credit?: {
    remaining: number
  }
  status: EntitlementStatus
}

export type EntitlementStatus = 'active' | 'consume' | 'expired' | 'partConsumed' | 'void'

/** @todo */
export interface Promo {}

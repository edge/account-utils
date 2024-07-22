// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import type * as product from './product'
import superagent from 'superagent'
import type { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

/** Self-administrated 'bare metal' server */
export interface BareMetal extends Key, Timestamps {
  /** Account key */
  account: string
  /** Product key */
  product: string
  /** Subscription key */
  subscription: string | null

  /** Region (not relational) */
  region: string | null | undefined

  /** Display label */
  label: string
  /** Machine hostname */
  hostname: string
  /** Operating system (not relational) */
  os: string | null | undefined

  /** Network information */
  network: {
    /** IPv4 addresses */
    ip: string[]
  }

  /** Hardware specification */
  spec: {
    /** Bandwidth (Mbps) */
    bandwidth: number
    /** Number of CPUs */
    cpus: number
    /** Disk size (MiB) */
    disk: number
    /** RAM (MiB) */
    ram: number
  }

  /** Active flag */
  active: boolean
}

export interface GetBareMetalResponse {
  bareMetal: BareMetal
  product: product.Product
  subscription?: product.ProductSubscription
}

export interface GetBareMetalsParams extends PaginationParams, PeriodParams {
  key?: string[] | string
  account?: string[] | string
  product?: string[] | string
  subscription?: string[] | string
  active?: boolean

  region?: string[] | string
  label?: string[] | string
  hostname?: string[] | string
  os?: string[] | string

  search?: string
}

export interface GetBareMetalsResult {
  bareMetal: BareMetal
  product: product.Product
  subscription?: product.ProductSubscription
}

export async function getBareMetal(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetBareMetalResponse> {
  const req = superagent.get(`${host}/bare-metal/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getBareMetals(host: string, token: string, params?: GetBareMetalsParams, cb?: RequestCallback): Promise<SearchResponse<GetBareMetalsResult>> {
  const req = superagent.get(`${host}/bare-metals`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

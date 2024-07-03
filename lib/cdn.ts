// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { RequestCallback } from '.'
import { UsageDataRange } from './integration'
import superagent from 'superagent'

export interface DeleteCdnCacheRequest {
  path: string
}

export interface DeleteCdnCacheResponse {
  message: string
}

export interface GetCdnGraphDataParams {
  range: UsageDataRange
  count?: number
}

export interface GetCdnGraphDataResponse {
  /** Timestamp */
  ts: number[]
  /** Requests (total) */
  r: number[]
  /** Requests (total; bytes) */
  t: number[]
  /** Cached requests (%) */
  cr: number[]
  /** Cached traffic (%) */
  ct: number[]
  /** Bandwidth (bps) */
  b: number[]
}

// eslint-disable-next-line max-len
export async function deleteCdnCache(host: string, token: string, key: string, data: DeleteCdnCacheRequest, cb?: RequestCallback): Promise<DeleteCdnCacheResponse> {
  const req = superagent.delete(`${host}/integration/${key}/cdn/cache`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getCdnGraphData(host: string, token: string, key: string, params: GetCdnGraphDataParams, cb?: RequestCallback): Promise<GetCdnGraphDataResponse> {
  const req = superagent.get(`${host}/integration/${key}/cdn/graph`).set('Authorization', `Bearer ${token}`).query(params)
  const res = await cb?.(req) || await req
  return res.body
}

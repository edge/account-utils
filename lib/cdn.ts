import { RequestCallback } from '.'
import superagent from 'superagent'

export type CdnGraphRange = 'daily' | 'hourly'

export interface DeleteCdnCacheRequest {
  path: string
}

export interface DeleteCdnCacheResponse {
  message: string
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
  const req = superagent.delete(`${host}/integrations/${key}/cdn/cache`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getCdnGraphData(host: string, token: string, key: string, range: CdnGraphRange, cb?: RequestCallback): Promise<GetCdnGraphDataResponse> {
  const req = superagent.get(`${host}/integrations/${key}/cdn/graph/${range}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

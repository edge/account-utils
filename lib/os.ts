import superagent from 'superagent'
import { Key, RequestCallback, SearchResponse } from '.'

/** OS image */
export interface OS extends Key {
  /** Backend ID */
  id: number
  /** Group */
  group: string
  /** Sort order within group */
  position?: number
  /** Version */
  version: string
  /** Active flag */
  active: boolean
}

export interface GetOSParams {
  limit?: number
  page?: number
}

export interface GetOSResponse {
  os: OS
}

export async function getOperatingSystem(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetOSResponse> {
  const req = superagent.get(`${host}/os/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getOperatingSystems(host: string, token: string, params?: GetOSParams, cb?: RequestCallback): Promise<SearchResponse<OS>> {
  const req = superagent.get(`${host}/os`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

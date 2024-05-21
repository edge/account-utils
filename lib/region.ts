import superagent from 'superagent'
import { Key, RequestCallback, SearchResponse } from '.'

/** Network region */
export interface Region extends Key {
  /** Cluster IDs */
  clusters: number[]
  /** City */
  city: string
  /** Name */
  name: string
  /** Flag icon URL */
  flag?: string
  /** Resource costs */
  cost: {
    /** Bandwidth in USD/Mbps/hour */
    bandwidth: number
    /** CPU cost in USD/CPU/hour */
    cpus: number
    /** Disk cost in USD/MiB/hour */
    disk: number
    /** RAM cost in USD/MiB/hour */
    ram: number
  }
  /** Region (cluster) capacity */
  capacity: {
    /** Available bandwidth. **This is an advisory value only** and may be omitted */
    bandwidth?: number
    /** Available CPUs */
    cpus: number
    /** Available disk (MiB) */
    disk: number
    /** Available RAM (MiB) */
    ram: number
    /** Allowed number of servers */
    servers: number
  }
  /**
   * Active flag.
   * If false, the region cannot be used for new servers, even if it has capacity.
   */
  active: boolean
  /**
   * Internal flag.
   */
  internal?: boolean
}

export interface GetRegionResponse {
  region: Region
}

export interface GetRegionsParams {
  limit?: number
  page?: number
}

export async function getRegion(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetRegionResponse> {
  const req = superagent.get(`${host}/regions/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getRegions(host: string, token: string, params?: GetRegionsParams, cb?: RequestCallback): Promise<SearchResponse<Region>> {
  const req = superagent.get(`${host}/regions`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

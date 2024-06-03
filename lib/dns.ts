import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

/** DNS zone */
export interface DnsZone extends Key, Timestamps {
  /** Account key */
  account: string
  /** Nameserver status */
  ns?: {
    /** Confirmed flag; indicates whether NS records for the zone point correctly to Edge DNS */
    confirmed: boolean
    /** Last check timestamp */
    lastChecked: number
  }
  /** Active flag */
  active: boolean
  /** Suspended flag */
  suspended?: boolean
  /** DNS records count */
  records?: Record<string, number>
}

export interface CreateDnsZoneRequest {
  account: string
  zone: string
}

export interface CreateDnsZoneResponse {
  zone: DnsZone
  message: string
}

export interface DeleteDnsZoneResponse {
  zone: DnsZone
  message: string
}

export interface GetDnsZoneResponse {
  zone: DnsZone
}

export interface GetDnsZonesParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  account?: string | string[]
  active?: boolean
  suspended?: boolean

  ns?: boolean
  search?: string
}

export async function createDnsZone(host: string, token: string, data: CreateDnsZoneRequest, cb?: RequestCallback): Promise<CreateDnsZoneResponse> {
  const req = superagent.post(`${host}/dns`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteDnsZone(host: string, token: string, zone: string, cb?: RequestCallback): Promise<DeleteDnsZoneResponse> {
  const req = superagent.delete(`${host}/dns/${zone}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getDnsZone(host: string, token: string, zone: string, cb?: RequestCallback): Promise<GetDnsZoneResponse> {
  const req = superagent.get(`${host}/dns/${zone}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getDnsZones(host: string, token: string, params?: GetDnsZonesParams, cb?: RequestCallback): Promise<SearchResponse<DnsZone>> {
  const req = superagent.get(`${host}/dns`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}


import superagent from 'superagent'
import { Key, RequestCallback, SearchResponse, Timestamps } from '.'

export interface Service extends Key, Timestamps {
  public: boolean
  beta: boolean
}

export async function getServices(host: string, token: string, cb?: RequestCallback): Promise<SearchResponse<Service>> {
  const req = superagent.get(`${host}/services`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

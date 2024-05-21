import { RequestCallback } from '.'
import superagent from 'superagent'

export interface ParseDomainResponse {
  domain: string
  apex: boolean
}

/** Parse a domain to determine whether it is an apex or subdomain. */
export async function parseDomain(host: string, token: string, domain: string, cb?: RequestCallback): Promise<ParseDomainResponse> {
  const req = superagent.delete(`${host}/psl/parse/${domain}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

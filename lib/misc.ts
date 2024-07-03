// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import { RequestCallback } from '.'
import superagent from 'superagent'

export interface GetConfigResponse {
  billing: {
    minimumBillableUnit: number
  }
  cdn: {
    dataCost: number
    dataCostBasis: number
    minimumCost: number
    minimumCostBasis: number
    minimumTTL: number
    requestCost: number
    requestCostBasis: number
  }
  dns: {
    cost: number
    costBasis: number
    nameservers: string[]
    recordTypes: string[]
  }
  server: {
    limit: {
      bandwidth: {
        min: number
        max: number
      }
      cpu: {
        min: number
        max: number
      }
      disk: {
        min: number
        max: number
      }
      ram: {
        min: number
        max: number
      }
    }
  }
  suspend: {
    threshold: number
  }
  warning: {
    threshold: number
  }
}

export interface GetInfoResponse {
  name: string
  version: string
}

export interface ParseDomainResponse {
  domain: string
  apex: boolean
}

export async function getConfig(host: string, cb?: RequestCallback): Promise<GetConfigResponse> {
  const req = superagent.get(`${host}/config`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getInfo(host: string, cb?: RequestCallback): Promise<GetInfoResponse> {
  const req = superagent.get(`${host}/`)
  const res = await cb?.(req) || await req
  return res.body
}

/** Parse a domain to determine whether it is an apex or subdomain. */
export async function parseDomain(host: string, token: string, domain: string, cb?: RequestCallback): Promise<ParseDomainResponse> {
  const req = superagent.get(`${host}/psl/parse/${domain}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

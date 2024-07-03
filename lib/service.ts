// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

export interface Service extends Key, Timestamps {
  public: boolean
  beta: boolean
}

export interface GetServicesParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  public?: string | string[]
  beta?: string | string[]
}

export async function getServices(host: string, token: string, params?: GetServicesParams, cb?: RequestCallback): Promise<SearchResponse<Service>> {
  const req = superagent.get(`${host}/services`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

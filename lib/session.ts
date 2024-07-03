// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { Key, RequestCallback, Timestamps } from '.'

/**
 * A session provides authentication to authenticated APIs.
 * The session `_key` is the bearer token that should be provided.
 */
export interface Session extends Key, Timestamps {
  account: string
}

export interface CreateSessionRequest {
  account: string
  otp?: string
  backupCode?: string
}

export interface CreateSessionResponse {
  session: Session
  message: string
}

export interface DeleteSessionResponse {
  session: Session
  message: string
}

export interface GetSessionResponse {
  session: Session
}

export interface UpdateSessionResponse {
  session: Session
  message: string
}

export async function createSession(host: string, data?: CreateSessionRequest, cb?: RequestCallback): Promise<CreateSessionResponse> {
  const req = superagent.post(`${host}/account/session`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteSession(host: string, token: string, cb?: RequestCallback): Promise<DeleteSessionResponse> {
  const req = superagent.delete(`${host}/account/session`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getSession(host: string, token: string, cb?: RequestCallback): Promise<GetSessionResponse> {
  const req = superagent.get(`${host}/account/session`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function updateSession(host: string, token: string, cb?: RequestCallback): Promise<UpdateSessionResponse> {
  const req = superagent.put(`${host}/account/session`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

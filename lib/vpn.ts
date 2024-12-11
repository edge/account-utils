// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import type * as server from './server'
import type * as task from './task'
import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

export interface Vpn extends Key, Timestamps {
  /** Account number */
  account: string
  /** Region key */
  region: string
  /** Server key */
  server: string
  /** Name */
  name: string
  /** Multi-user flag */
  multiuser: boolean
  /** Number of users */
  users: number
  /** Speed */
  speed: VpnSpeed
  /** Status (synchronised with server) */
  status: server.ServerStatus
  /** Suspended service flag (administrative) */
  suspended?: boolean
}

export type VpnSpeed = 'fast' | 'faster' | 'fastest'

export interface VpnUser extends Key, Timestamps {
  /** Account key */
  account: string
  /** VPN key */
  vpn: string
  /** Certificate name (AKA username) */
  certificate: string
  /** Email address */
  email?: string | null
  /** First name */
  firstName: string
  /** Last name */
  lastName: string
  /** Company */
  company: string
  /** Department */
  department: string
}

export interface CreateVpnRequest {
  vpn: Pick<Vpn, 'account' | 'region' | 'name' | 'multiuser' | 'speed'>
}

export interface CreateVpnResponse {
  vpn: Vpn
  server: server.Server
  tasks: task.Task[]
  message: string
}

export interface CreateVpnUserRequest {
  vpnUser: Pick<VpnUser, 'certificate' | 'email' | 'firstName' | 'lastName' | 'company' | 'department'>
}

export interface CreateVpnUserResponse {
  vpn: Vpn
  vpnUser: VpnUser
}

export interface DeleteVpnResponse {
  vpn: Vpn
  server: server.Server
  task: task.Task
  message: string
}

export interface DeleteVpnUserResponse {
  vpn: Vpn
  vpnUser: VpnUser
}

export interface EmailVpnCertificateResponse {
  message: string
}

export interface GetVpnResponse {
  vpn: Vpn
}

export interface GetVpnUserResponse {
  vpnUser: VpnUser
}

export interface GetVpnsParams extends PeriodParams, PaginationParams {
  key?: string | string[]
  account?: string | string[]
  region?: string | string[]
  server?: string | string[]
  status?: string | string[]
  suspended?: boolean

  name?: string | string[]
  multiuser?: boolean

  search?: string
}

export interface GetVpnUsersParams extends PeriodParams, PaginationParams {
  vpn?: string | string[]
  key?: string | string[]
  account?: string | string[]

  search?: string
}

export interface RenewVpnCertificateResponse {
  message: string
}

export interface UpdateVpnRequest {
  vpn: Partial<Pick<Vpn, 'name' | 'multiuser' | 'speed'>>
}

export interface UpdateVpnResponse {
  vpn: Vpn
  server: server.Server
  tasks: task.Task[]
  message: string
}

export interface UpdateVpnUserRequest {
  vpnUser: Pick<VpnUser, 'email'>
}

export interface UpdateVpnUserResponse {
  vpnUser: VpnUser
}

export async function createVpn(host: string, token: string, data: CreateVpnRequest, cb?: RequestCallback): Promise<CreateVpnResponse> {
  const req = superagent.post(`${host}/vpns`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function createVpnUser(host: string, token: string, key: string, data: CreateVpnUserRequest, cb?: RequestCallback): Promise<CreateVpnUserResponse> {
  const req = superagent.post(`${host}/vpn/${key}/users`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteVpn(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeleteVpnResponse> {
  const req = superagent.delete(`${host}/vpn/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteVpnUser(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<DeleteVpnUserResponse> {
  const req = superagent.delete(`${host}/vpn/${key}/user/${userKey}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function emailVpnCertificate(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<EmailVpnCertificateResponse> {
  const req = superagent.patch(`${host}/vpn/${key}/user/${userKey}/cert/email`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getVpn(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetVpnResponse> {
  const req = superagent.get(`${host}/vpn/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getVpns(host: string, token: string, params?: GetVpnsParams, cb?: RequestCallback): Promise<SearchResponse<Vpn>> {
  const req = superagent.get(`${host}/vpns`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Download a VPN certificate (OpenVPN).
 */
export function getVpnCertificate(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<Blob>
/**
 * Download a VPN certificate (OpenVPN).
 * When a `filename` string is provided, this function attempts to download the PDF using a DOM workaround instead
 * of returning the data blob to the caller.
 * This will only work correctly in a web browser.
 *
 * @note **This implementation is experimental and requires cross-browser testing.**
 *       If you use this function, please provide feedback via https://github.com/edge/account-utils/issues
 */
export function getVpnCertificate(host: string, token: string, key: string, userKey: string, filename: string, cb?: RequestCallback): Promise<void>
// eslint-disable-next-line max-len
export async function getVpnCertificate(host: string, token: string, key: string, userKey: string, filename?: string | RequestCallback, cb?: RequestCallback): Promise<Blob | void> {
  // Resolve overload arguments
  let _filename
  let _cb
  if (typeof filename === 'function') {
    _cb = filename
  }
  else if (typeof filename === 'string') {
    _filename = filename
    _cb = cb
  }

  const req = superagent.get(`${host}/vpn/${key}/user/${userKey}/cert`)
    .responseType('blob')
    .set('Authorization', `Bearer ${token}`)

  const res = await _cb?.(req) || await req

  if (_filename) {
    const el = document.createElement('a')
    const url = window.URL.createObjectURL(res.body)
    el.href = url
    el.download = _filename
    el.click()
    window.URL.revokeObjectURL(url)
  }
  else {
    return res.body
  }
}

export async function getVpnUser(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<GetVpnUserResponse> {
  const req = superagent.get(`${host}/vpn/${key}/user/${userKey}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Get VPN users.
 * If a VPN key is given, only users for that VPN will be retrieved.
 */
export function getVpnUsers(host: string, token: string, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>
export function getVpnUsers(host: string, token: string, key: string, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>
export function getVpnUsers(host: string, token: string, params: GetVpnUsersParams, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>
export function getVpnUsers(host: string, token: string, key: string, params: GetVpnUsersParams, cb?: RequestCallback): Promise<SearchResponse<VpnUser>>
// eslint-disable-next-line max-len
export async function getVpnUsers(host: string, token: string, key?: string | GetVpnUsersParams | RequestCallback, params?: GetVpnUsersParams | RequestCallback, cb?: RequestCallback): Promise<SearchResponse<VpnUser>> {
  let _key
  let _params
  let _cb
  if (typeof key === 'function') {
    _cb = key
  }
  else if (typeof key === 'string') {
    _key = key
  }
  else if (key) {
    _params = key
  }
  if (typeof params === 'function') {
    _cb = params
  }
  else {
    _params = params
    _cb = cb
  }

  const url = _key ? `${host}/vpn/${_key}/users` : `${host}/vpns/users`
  const req = superagent.get(url).set('Authorization', `Bearer ${token}`)
  _params && req.query(_params)
  const res = await _cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function renewVpnCertificate(host: string, token: string, key: string, userKey: string, cb?: RequestCallback): Promise<RenewVpnCertificateResponse> {
  const req = superagent.patch(`${host}/vpn/${key}/user/${userKey}/cert/renew`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function updateVpn(host: string, token: string, key: string, data: UpdateVpnRequest, cb?: RequestCallback): Promise<UpdateVpnResponse> {
  const req = superagent.put(`${host}/vpn/${key}`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateVpnUser(host: string, token: string, key: string, userKey: string, data: UpdateVpnUserRequest, cb?: RequestCallback): Promise<UpdateVpnUserResponse> {
  const req = superagent.put(`${host}/vpn/${key}/user/${userKey}`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

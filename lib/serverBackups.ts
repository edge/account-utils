// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import * as task from './task'
import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

/** Server backup. */
export interface Backup extends Key, Timestamps {
  /** Account key */
  account: string
  /** Server key */
  server: string
  /** VM Backup ID */
  backup: number
  /** VM Backup size in MiB */
  size?: number
  /** Name */
  name: string
  /** Comment */
  comment?: string
  /** Status */
  status: 'active' | 'crashed' | 'creating' | 'deleted' | 'deleting'
  /** Expiry timestamp */
  expires?: number
}

export interface CreateServerBackupRequest {
  comment?: string
}

export interface CreateServerBackupResponse {
  backup: Backup
  task: task.Task
  message: string
}

export interface DeleteServerBackupResponse {
  backup: Backup
  task: task.Task
  message: string
}

export interface GetServerBackupResponse {
  backup: Backup
}

export interface GetServerBackupsParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  account?: string | string[]
  server?: string | string[]
  status?: string | string[]
}

/** @todo review and patch: https://github.com/edge/account-api/issues/317 */
export interface GetServerBackupsUsageResponse {
  usage: number[]
}

export interface RestoreServerBackupResponse {
  backup: Backup
  task: task.Task
  message: string
}

// eslint-disable-next-line max-len
export async function createServerBackup(host: string, token: string, server: string, data: CreateServerBackupRequest, cb?: RequestCallback): Promise<CreateServerBackupResponse> {
  const req = superagent.post(`${host}/server/${server}/backups`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteServerBackup(host: string, token: string, server: string, key: string, cb?: RequestCallback): Promise<DeleteServerBackupResponse> {
  const req = superagent.delete(`${host}/server/${server}/backup/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getServerBackup(host: string, token: string, server: string, key: string, cb?: RequestCallback): Promise<GetServerBackupResponse> {
  const req = superagent.get(`${host}/server/${server}/backup/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getServerBackupsUsage(host: string, token: string, server: string, cb?: RequestCallback): Promise<GetServerBackupsUsageResponse> {
  const req = superagent.get(`${host}/server/${server}/backups/usage`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getServerBackups(host: string, token: string, server: string, params?: GetServerBackupsParams, cb?: RequestCallback): Promise<SearchResponse<Backup>> {
  const req = superagent.get(`${host}/server/${server}/backups`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function restoreServerBackup(host: string, token: string, server: string, key: string, cb?: RequestCallback): Promise<RestoreServerBackupResponse> {
  const req = superagent.post(`${host}/server/${server}/backup/${key}/restore`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

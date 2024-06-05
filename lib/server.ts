import type * as task from './task'
import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

/** Deployed server */
export interface Server extends Key, Timestamps {
  /** Account key */
  account: string
  /** Region key */
  region: string
  /** VM Cluster ID */
  cluster: number
  /** VM Host ID */
  host: number
  /** VM Disk ID */
  disk: number
  /** Settings */
  settings: {
    /** Name */
    name: string
    /** VM hostname. This is **not** the machine hostname */
    hostname: string
    /** Domain. Also machine hostname */
    domain: string
    /** Operating system */
    os: {
      id: number
      group: string
      version: string
    }
  }
  /** Network information */
  network?: null | {
    /** IPv4 addresses */
    ip?: string[]
  }
  /** Specification */
  spec: {
    /** Bandwidth (Mbps) */
    bandwidth: number
    /** Number of CPUs */
    cpus: number
    /** Disk size (MiB) */
    disk: number
    /** RAM (MiB) */
    ram: number
  }
  /** Backup strategy */
  backups?: null | {
    strategy: {
      /** Schedule as cron expression */
      schedule: string
      /** Backup retention (ms) */
      retention: number
    }
    lastBackup?: {
      _key: string
      time: number
    }
    nextBackup: number
  }
  /** Status */
  status: ServerStatus
  /** Suspended service flag (administrative) */
  suspended?: boolean
  /** Updated by user timestamp (as opposed to updated generally) */
  updatedByUser?: number
}

/** Server status codes. */
export type ServerStatus =
  'active' |
  'crashed' |
  'creating' |
  'deleted' |
  'deleting' |
  'gone' |
  'pending' |
  'starting' |
  'stopped' |
  'stopping'

export interface CreateServerHostnameResponse {
  hostname: string
}

export interface CreateServerRequest extends Pick<Server, 'account' | 'region' | 'spec'> {
  settings: {
    name?: string
    domain?: string
    password: string
    os: {
      id: number
    }
  }
}

export interface CreateServerResponse {
  server: Server
  task: task.Task
  message: string
  /** May be set if there is a non-critical error creating the server */
  detail?: string
}

export interface DestroyServerResponse {
  server: Server
  task: task.Task
  message: string
}

export interface GetServerMetricsResponse {
  cpu: number[][]
  mem: number[][]
  disk: number[][]
  bwin: number[][]
  bwout: number[][]
}

export interface GetServerResponse {
  server: Server
}

export interface GetServerTasksParams extends PaginationParams {}

export interface GetServerVncCredentialsResponse {
  password: string
  server: string
  session: string
}

export interface GetServersParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  account?: string | string[]
  region?: string | string[]
  status?: string | string[]
  suspended?: boolean

  name?: string | string[]
  domain?: string | string[]

  search?: string
}

export interface RemoveServerBackupStrategyResponse {
  server: Server
}

export interface ResizeServerRequest {
  spec: Partial<Server['spec']>
}

export interface ResizeServerResponse {
  server: Server
  tasks: task.Task[]
  message: string
}

export interface StartServerResponse {
  server: Server
  task: task.Task
  message: string
}

export interface StopServerResponse {
  server: Server
  task: task.Task
  message: string
}

export interface UpdateServerBackupStrategyRequest {
  strategy: {
    schedule: string
    retention: number
  }
}

export interface UpdateServerBackupStrategyResponse {
  server: Server
}

export interface UpdateServerRequest {
  settings: {
    name?: string
  }
}

export interface UpdateServerResponse {
  server: Server
}

export async function createServer(host: string, token: string, data: CreateServerRequest, cb?: RequestCallback): Promise<CreateServerResponse> {
  const req = superagent.post(`${host}/servers`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function createServerHostname(host: string, token: string, cb?: RequestCallback): Promise<CreateServerHostnameResponse> {
  const req = superagent.post(`${host}/servers/hostname`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function destroyServer(host: string, token: string, key: string, cb?: RequestCallback): Promise<DestroyServerResponse> {
  const req = superagent.delete(`${host}/server/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getServer(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetServerResponse> {
  const req = superagent.get(`${host}/server/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getServerMetrics(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetServerMetricsResponse> {
  const req = superagent.get(`${host}/server/${key}/metrics`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getServerTasks(host: string, token: string, key: string, params?: GetServerTasksParams, cb?: RequestCallback): Promise<SearchResponse<task.Task>> {
  const req = superagent.get(`${host}/server/${key}/tasks`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Get a server's VNC credentials.
 * Subsequently, use your preferred WebSocket-based client to connect to `${host}/server/${key}/vnc`.
 * For example, NoVNC: https://novnc.com/info.html
 */
export async function getServerVncCredentials(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetServerVncCredentialsResponse> {
  const req = superagent.get(`${host}/server/${key}/vnc/credentials`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getServers(host: string, token: string, params?: GetServersParams, cb?: RequestCallback): Promise<SearchResponse<Server>> {
  const req = superagent.get(`${host}/servers`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

/** @todo */
// eslint-disable-next-line max-len
// export async function getServersUsage(host: string, token: string, params?: GetServersUsageParams, cb?: RequestCallback): Promise<SearchResponse<ServerUsage>> {
//   const req = superagent.get(`${host}/servers/usage`).set('Authorization', `Bearer ${token}`)
//   params && req.query(params)
//   const res = await cb?.(req) || await req
//   return res.body
// }

export async function removeServerBackupStrategy(host: string, token: string, key: string, cb?: RequestCallback): Promise<RemoveServerBackupStrategyResponse> {
  const req = superagent.delete(`${host}/server/${key}/backups/strategy`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function resizeServer(host: string, token: string, key: string, data: ResizeServerRequest, cb?: RequestCallback): Promise<ResizeServerResponse> {
  const req = superagent.post(`${host}/server/${key}/resize`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function startServer(host: string, token: string, key: string, cb?: RequestCallback): Promise<StartServerResponse> {
  const req = superagent.post(`${host}/server/${key}/start`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function stopServer(host: string, token: string, key: string, cb?: RequestCallback): Promise<StopServerResponse> {
  const req = superagent.post(`${host}/server/${key}/stop`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function updateServer(host: string, token: string, key: string, data: UpdateServerRequest, cb?: RequestCallback): Promise<UpdateServerResponse> {
  const req = superagent.put(`${host}/server/${key}`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateServerBackupStrategy(host: string, token: string, key: string, data: UpdateServerBackupStrategyRequest, cb?: RequestCallback): Promise<UpdateServerBackupStrategyResponse> {
  const req = superagent.put(`${host}/server/${key}/backups/strategy`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

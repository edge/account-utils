import { Config } from '@edge/cache-config'
import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

/**
 * Integration as saved to an account.
 */
export interface AccountIntegration<I extends Integration = Integration> extends Key, Timestamps {
  /** Account key */
  account: string
  /** Integration name */
  name: string
  /** Integration data */
  data: Omit<I, 'id'>
  /** Config mode */
  configMode?: 'advanced' | 'default' | 'simple'
  /** Active flag */
  active: boolean
  /** Suspended flag */
  suspended?: boolean
}

/**
 * CDN configuration.
 */
export interface ContentDeliveryConfig {
  domain: string
  additionalDomains?: string[]
  cache?: Config
  origin: string
  maxAssetSize?: number
  requestTimeout?: number
  retryTimeout?: number
}

/**
 * CDN integration.
 */
export interface ContentDeliveryIntegration {
  id: string
  service: 'cdn'
  config: ContentDeliveryConfig
}

/**
 * Integration.
 * Can be any type of integration, and should be disambiguated in user code based on `service`.
 */
export type Integration = ContentDeliveryIntegration | PageIntegration | StorageIntegration

export interface IntegrationUsage {
  start: number
  end: number
  cdn: {
    requests: {
      cached: number
      uncached: number
    }
    data: {
      in: {
        uncached: number
      }
      out: {
        cached: number
        uncached: number
      }
    }
  }
}

/** Page configuration. */
export interface PageConfig {
  domain: string
  content: string
}

/** Page integration. */
export interface PageIntegration {
  id: string
  service: 'page'
  config: PageConfig
}

/** Storage API key. */
export interface StorageAPIKey {
  active: boolean
}

/**
 * Storage configuration.
 */
export interface StorageConfig {
  apiKeys?: Record<string, StorageAPIKey>
}

/**
 * Storage integration.
 */
export interface StorageIntegration {
  id: string
  service: 'storage'
  config: StorageConfig
}

export interface CheckIntegrationDnsRecordsResponse {
  records: {
    domain: string
    zone?: string
    recordExists?: string
  }[]
}

export type CreateIntegrationRequest<I extends Integration> = Pick<AccountIntegration<I>, 'account' | 'name' | 'data' | 'configMode'>

export interface CreateIntegrationResponse<I extends Integration> {
  integration: AccountIntegration<I>
}

export interface DeleteIntegrationResponse<I extends Integration> {
  integration: AccountIntegration<I>
}

export interface GetInstantIntegrationUsageParams {
  integration?: string | string[]
  account?: string
}

export interface GetInstantIntegrationUsageResponse {
  [key: string]: IntegrationUsage
}

export interface GetIntegrationUsageParams {
  range: UsageDataRange
  count?: number
}

export type GetIntegrationUsageResponse = IntegrationUsage[]

export interface GetIntegrationResponse<I extends Integration> {
  integration: AccountIntegration<I>
}

export interface GetIntegrationsParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  account?: string | string[]
  name?: string | string[]
  domain?: string | string[]
  service?: string | string[]

  active?: boolean
  suspended?: boolean

  search?: string
}

export type UpdateIntegrationRequest = Pick<AccountIntegration, 'account' | 'name' | 'data' | 'configMode'>

export interface UpdateIntegrationResponse<I extends Integration = Integration> {
  integration: AccountIntegration<I>
}

export type UsageDataRange = 'daily' | 'hourly'

export async function checkIntegrationDnsRecords(host: string, token: string, key: string, cb?: RequestCallback): Promise<CheckIntegrationDnsRecordsResponse> {
  const req = superagent.get(`${host}/integration/${key}/dns`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function createIntegration<I extends Integration = Integration>(host: string, token: string, data: CreateIntegrationRequest<I>, cb?: RequestCallback): Promise<CreateIntegrationResponse<I>> {
  const req = superagent.post(`${host}/integrations`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteIntegration<I extends Integration = Integration>(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeleteIntegrationResponse<I>> {
  const req = superagent.delete(`${host}/integration/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getInstantIntegrationUsage(host: string, token: string, params?: GetInstantIntegrationUsageParams, cb?: RequestCallback): Promise<GetInstantIntegrationUsageResponse> {
  const req = superagent.get(`${host}/integrations/usage/instant`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getIntegration<I extends Integration = Integration>(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetIntegrationResponse<I>> {
  const req = superagent.get(`${host}/integration/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getIntegrationUsage(host: string, token: string, key: string, params: GetIntegrationUsageParams, cb?: RequestCallback): Promise<GetIntegrationUsageResponse> {
  const req = superagent.get(`${host}/integration/${key}/usage`).set('Authorization', `Bearer ${token}`).query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getIntegrations<I extends Integration = Integration>(host: string, token: string, params?: GetIntegrationsParams, cb?: RequestCallback): Promise<SearchResponse<AccountIntegration<I>>> {
  const req = superagent.get(`${host}/integrations`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateIntegration<I extends Integration = Integration>(host: string, token: string, key: string, data: UpdateIntegrationRequest, cb?: RequestCallback): Promise<UpdateIntegrationResponse<I>> {
  const req = superagent.put(`${host}/integration/${key}`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

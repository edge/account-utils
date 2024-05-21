import { Config } from '@edge/cache-config'
import superagent from 'superagent'
import { Key, RequestCallback, SearchResponse, Timestamps } from '.'

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

export type CreateIntegrationRequest = Pick<AccountIntegration, 'account' | 'name' | 'data' | 'configMode'>

export interface CreateIntegrationResponse {
  integration: AccountIntegration
}

export interface DeleteIntegrationResponse {
  integration: AccountIntegration
}

export interface GetIntegrationResponse {
  integration: AccountIntegration
}

export interface GetIntegrationsParams {
  key?: string | string[]
  account?: string | string[]
  name?: string | string[]
  domain?: string | string[]
  service?: string | string[]

  active?: boolean
  suspended?: boolean

  since?: number
  until?: number

  limit?: number
  page?: number

  search?: string

  sort?: string | string[]
}

export type UpdateIntegrationRequest = Pick<AccountIntegration, 'account' | 'name' | 'data' | 'configMode'>

export interface UpdateIntegrationResponse {
  integration: AccountIntegration
}

export async function checkIntegrationDnsRecords(host: string, token: string, key: string, cb?: RequestCallback): Promise<CheckIntegrationDnsRecordsResponse> {
  const req = superagent.get(`${host}/integrations/${key}/dns`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function createIntegration(host: string, token: string, data: CreateIntegrationRequest, cb?: RequestCallback): Promise<CreateIntegrationResponse> {
  const req = superagent.post(`${host}/integrations`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function deleteIntegration(host: string, token: string, key: string, cb?: RequestCallback): Promise<DeleteIntegrationResponse> {
  const req = superagent.delete(`${host}/integrations/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getIntegration(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetIntegrationResponse> {
  const req = superagent.get(`${host}/integrations/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getIntegrations(host: string, token: string, params?: GetIntegrationsParams, cb?: RequestCallback): Promise<SearchResponse<AccountIntegration>> {
  const req = superagent.get(`${host}/integrations`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateIntegration(host: string, token: string, key: string, data: UpdateIntegrationRequest, cb?: RequestCallback): Promise<UpdateIntegrationResponse> {
  const req = superagent.put(`${host}/integrations/${key}`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

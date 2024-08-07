// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { PaginationParams, RequestCallback, SearchResponse } from '.'

export interface File {
  integration: string
  id: string
  filename: string
  path: string
  size: number
  created: number
  lastModified: number
}

export interface Node {
  integration: string
  file?: string
  fullPath: string
  depth: number
  size: number
  created: number
  lastModified: number
}

export interface CreateStorageNodeResponse {
  node: Node
}

export interface DeleteStorageFilesRequest {
  files: string[]
}

export interface DeleteStorageFilesResponse {
  deleted: string[]
}

export interface DeleteStorageNodeResponse {
  node?: Node
  affected: number
}

export interface GetStorageFilesParams extends Omit<PaginationParams, 'sort'> {}

export interface GetStorageNodeParams extends PaginationParams {
  foldersTop?: boolean
}

export interface GetStorageNodeResponse {
  node?: Node
  children: Node[]
  childrenMetadata: {
    count: number
    limit: number
    page: number
    totalCount: number
  }
}

export interface UpdateStorageFilesRequest {
  files: Pick<File, 'id' | 'filename' | 'path'>[]
}

export interface UpdateStorageFilesResponse {
  files: File[]
  failed: string[]
}

export interface UpdateStorageNodeRequest {
  fullPath: string
}

export interface UpdateStorageNodeResponse {
  node?: Node
  affected: number
}

export type UploadStorageFileResponse = File

/**
 * Create a [folder] node in a storage integration.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to [folder] node
 * @return New node data
 */
export async function createStorageNode(host: string, token: string, key: string, path: string, cb?: RequestCallback): Promise<CreateStorageNodeResponse> {
  const req = superagent.post(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function deleteStorageFiles(host: string, token: string, key: string, data: DeleteStorageFilesRequest, cb?: RequestCallback): Promise<DeleteStorageFilesResponse> {
  const req = superagent.delete(`${host}/storage/${key}/files`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Delete a node.
 * If the node is a folder, then its child nodes are deleted automatically by API.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @return Old node data
 */
export async function deleteStorageNode(host: string, token: string, key: string, path: string, cb?: RequestCallback): Promise<DeleteStorageNodeResponse> {
  const req = superagent.delete(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getStorageFiles(host: string, token: string, key: string, params?: GetStorageFilesParams, cb?: RequestCallback): Promise<SearchResponse<File>> {
  const req = superagent.get(`${host}/storage/${key}/files`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Get a node.
 * If the node is a folder, then its child nodes are also retrieved in a list, subject to the `params` provided.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @param params Query parameters for child nodes
 */
// eslint-disable-next-line max-len
export async function getStorageNode(host: string, token: string, key: string, path: string, params?: GetStorageNodeParams, cb?: RequestCallback): Promise<GetStorageNodeResponse> {
  const req = superagent.get(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateStorageFiles(host: string, token: string, key: string, data: UpdateStorageFilesRequest, cb?: RequestCallback): Promise<UpdateStorageFilesResponse> {
  const req = superagent.put(`${host}/storage/${key}/files`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Update a node.
 * If the node is a folder, then its child nodes will be updated automatically by API as applicable to the update.
 *
 * @param host API host URL
 * @param token Bearer token
 * @param key Integration key
 * @param path Path to node
 * @param data Node update data
 * @return Updated node data
 */
// eslint-disable-next-line max-len
export async function updateStorageNode(host: string, token: string, key: string, path: string, data: UpdateStorageNodeRequest, cb?: RequestCallback): Promise<UpdateStorageNodeResponse> {
  const req = superagent.put(`${host}/storage/${key}/fs/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

/**
 * Upload a file to a Gateway (**not** directly to the Account API).
 *
 * @param host Gateway URL (**not** API base URL)
 * @param apiKey Integration API key
 * @param key Integration key
 * @param path Path to file
 * @param file File data
 * @return Gateway response with UUID
 */
// eslint-disable-next-line max-len
export async function uploadStorageFile(gateway: string, apiKey: string, key: string, path: string, file: string, cb?: RequestCallback): Promise<UploadStorageFileResponse> {
  const req = superagent.post(`${gateway}/files/${key}/${path.replace(/^\//, '')}`).set('Authorization', `Bearer ${apiKey}`).attach('file', file)
  const res = await cb?.(req) || await req
  return res.body
}

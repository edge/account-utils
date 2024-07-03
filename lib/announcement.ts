// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { Key, PaginationParams, RequestCallback, SearchResponse } from '.'

/** System-level announcement. */
export interface Announcement extends Key {
  /** Content */
  content: string
  /** Date (timestamp) */
  date: number
  /** Active flag */
  active: boolean
  /** Read flag */
  read?: boolean
}

export interface GetAnnouncementResponse {
  announcement: Announcement
}

export interface GetAnnouncementsParams extends Omit<PaginationParams, 'sort'> {
  unread?: boolean
}

export interface MarkAnnouncementsRequest {
  account: string
  announcements: string[]
}

export interface MarkAnnouncementsResponse {
  announcements: string[]
  message: string
}

export async function getAnnouncement(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetAnnouncementResponse> {
  const req = superagent.get(`${host}/announcement/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getAnnouncements(host: string, token: string, params?: GetAnnouncementsParams, cb?: RequestCallback): Promise<SearchResponse<Announcement>> {
  const req = superagent.get(`${host}/announcements`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function markAnnouncementsRead(host: string, token: string, data: MarkAnnouncementsRequest, cb?: RequestCallback): Promise<MarkAnnouncementsResponse> {
  const req = superagent.post(`${host}/announcements/read`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function markAnnouncementsUnread(host: string, token: string, data: MarkAnnouncementsRequest, cb?: RequestCallback): Promise<MarkAnnouncementsResponse> {
  const req = superagent.delete(`${host}/announcements/read`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

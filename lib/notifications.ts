import superagent from 'superagent'
import { Key, PaginationParams, PeriodParams, RequestCallback, SearchResponse, Timestamps } from '.'

export interface Notification extends Key, Timestamps {
  /** Account key */
  account: string
  /** Notification type ID */
  type: string
  /** Notification text */
  text: string
  /** Additional data */
  data?: Record<string, string | number | boolean | undefined>
  /** Read flag */
  read?: boolean
}

export type DeleteNotificationsRequest = Array<Key>

export type DeleteNotificationsResponse = Notification[]

export interface GetNotificationsParams extends PaginationParams, PeriodParams {
  key?: string | string[]
  account?: string | string[]
  type?: string | string[]
  read?: boolean

  search?: string
}

export interface GetNotificationResponse {
  notification: Notification
}

export interface UpdateAllNotificationsRequest {
  account: string
  read: boolean
}

export type UpdateAllNotificationsResponse = number

export type UpdateNotificationsRequest = Array<Key & {
  read: boolean
}>

export type UpdateNotificationsResponse = Notification[]

// eslint-disable-next-line max-len
export async function deleteNotifications(host: string, token: string, data: DeleteNotificationsRequest, cb?: RequestCallback): Promise<DeleteNotificationsResponse> {
  const req = superagent.delete(`${host}/notifications`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getNotification(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetNotificationResponse> {
  const req = superagent.get(`${host}/notification/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getNotifications(host: string, token: string, params?: GetNotificationsParams, cb?: RequestCallback): Promise<SearchResponse<Notification>> {
  const req = superagent.get(`${host}/notifications`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateAllNotifications(host: string, token: string, data: UpdateAllNotificationsRequest, cb?: RequestCallback): Promise<UpdateAllNotificationsResponse> {
  const req = superagent.put(`${host}/notifications`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function updateNotifications(host: string, token: string, data: UpdateNotificationsRequest, cb?: RequestCallback): Promise<UpdateNotificationsResponse> {
  const req = superagent.put(`${host}/notifications`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// Copyright (C) 2024 Edge Network Technologies Limited
// Use of this source code is governed by a GNU GPL-style license
// that can be found in the LICENSE.md file. All rights reserved.

import superagent from 'superagent'
import { Key, RequestCallback } from '.'

export interface NewsletterSubscriber extends Key {
  email: string
  isSubscribed: boolean
}

export interface GetNewsletterSubscriptionResponse {
  subscriber: NewsletterSubscriber
}

export interface SubscribeToNewsletterRequest {
  account: string
}

export interface SubscribeToNewsletterResponse {
  subscriber: NewsletterSubscriber
}

export interface UnsubscribeFromNewsletterRequest {
  account: string
}

export interface UnsubscribeFromNewsletterResponse {
  subscriber: NewsletterSubscriber
}

export async function getNewsletterSubscription(host: string, token: string, cb?: RequestCallback): Promise<GetNewsletterSubscriptionResponse> {
  const req = superagent.get(`${host}/newsletter/subscriber`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function subscribeToNewsletter(host: string, token: string, data: SubscribeToNewsletterRequest, cb?: RequestCallback): Promise<SubscribeToNewsletterResponse> {
  const req = superagent.post(`${host}/newsletter/subscriber`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function unsubscribeFromNewsletter(host: string, token: string, data: UnsubscribeFromNewsletterRequest, cb?: RequestCallback): Promise<UnsubscribeFromNewsletterResponse> {
  const req = superagent.delete(`${host}/newsletter/subscriber`).set('Authorization', `Bearer ${token}`).send(data)
  const res = await cb?.(req) || await req
  return res.body
}

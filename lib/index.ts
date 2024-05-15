export * as account from './account'
export * as promo from './promo'
export * as session from './session'

import * as account from './account'
import * as promo from './promo'
import * as session from './session'
import { SuperAgentRequest } from 'superagent'

export interface Key {
  _key: string
}

/**
 * Callback function allowing a SuperAgent HTTP request to be modified before it is sent.
 * https://visionmedia.github.io/superagent/
 */
export interface RequestCallback {
  (r: SuperAgentRequest): SuperAgentRequest
}

export interface Timestamps {
  created?: number
  updated?: number
}

export default {
  account,
  promo,
  session
}

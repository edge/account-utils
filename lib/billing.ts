import superagent from 'superagent'
import { Key, RequestCallback, SearchResponse, Timestamps } from '.'

export interface AccountBalance {
  token: {
    date: string
    usdPerXe: number
  }
  address: string
  wallet: BalanceInUsdAndXe
  available: BalanceInUsdAndXe
  reserved: BalanceInUsdAndXe
  total: BalanceInUsdAndXe
  credit: BalanceInUsdAndXe
  threshold: {
    suspend: BalanceInUsdAndXe
    warning: BalanceInUsdAndXe
  }
  purchases: {
    pending: number
  }
  consumption: {
    any: boolean
    anyExcludingDNS: boolean
    charges: {
      pending: number
      pendingAmount: number
    }
    invoices: {
      unpaid: number
      unpaidAmount: number
    }
  }
}

export interface BalanceInUsdAndXe {
  usd: number
  xe: number
}

export interface BillingCharge extends Key {
  /** Account key */
  account: string
  /** Main entity ID */
  entity: string
  /** Service detail */
  service: {
    /** Type of service chargeable */
    type: string
    /** Amount of service used (unit depending on type) */
    used: number | Record<string, number>
    /** Amount of service charged (unit depending on type) */
    charged: number | Record<string, number>
    /** Additional records to describe/explain service charge */
    records?: string[]
  }
  /** Summary of service chargeable */
  summary: string
  /** Charge amount (USD) */
  amount: number
  /** Invoice period start time */
  start: number
  /** Invoice period end time */
  end: number
}

/** Invoice data. */
export interface Invoice extends Key, Timestamps {
  /** Account key */
  account: string
  /** Payment key */
  payment?: string
  /** Total amount invoiced (USD) */
  amount: number
  /** USD-XE rate */
  rate: {
    date: string
    value: number
  }
  /**
   * Total amount invoiced (XE).
   * This is captured when the invoice is created based on the USD-XE rate captured in `rate`.
   */
  xeAmount: number
  /**
   * Purchase relation.
   * This is **only set** by [automatic top-up](../jobs/checkBalance/topup.ts).
   * It can be unset via the invoice unhold API or manually in the database.
   *
   * See https://github.com/edge/account-api/issues/194#issuecomment-1638269752 for background.
   */
  purchase?: string | null
  /**
   * Service items invoiced.
   * This may include multiple charges for the same entities, each of which includes the charge `_id`.
   * Although not displayed to the customer, it is retained for diagnostics and auditing purposes.
   * It is retained long-term even if the original charge data is evicted.
   */
  items: InvoiceItem[]
  /**
   * Summary of service items invoiced.
   * This is displayed to the customer and should only include one charge per entity.
   */
  displayItems: InvoiceDisplayItem[]
  /** Invoice payment status */
  status: 'hold' | 'paid' | 'unpaid'
  /** Invoice period start time */
  start: number
  /** Invoice period end time */
  end: number
}

export type InvoiceDisplayItem = Pick<InvoiceItem, 'entity' | 'summary' | 'amount'>

export interface InvoiceItem extends Pick<BillingCharge, 'entity' | 'summary' | 'amount'>, Partial<Pick<BillingCharge, 'start' | 'end'>> {
  _id: string
}

/** @todo */
export interface Payment {}

export type GetAccountBalanceResponse = AccountBalance

export interface GetBillingChargesParams {
  key?: string | string[]
  account?: string | string[]
  entity?: string | string[]
  serviceType?: string | string[]

  since?: number
  until?: number

  limit?: number
  page?: number
  sort?: string | string[]
}

export interface GetInvoiceResponse {
  invoice: Invoice
}

export interface GetInvoicesParams {
  key?: string | string[]
  account?: string | string[]
  status?: string | string[]

  since?: number
  until?: number

  limit?: number
  page?: number
  sort?: string | string[]

  search?: string
}

export interface UnholdInvoiceResponse {
  invoice: Invoice
  payment?: Payment
}

// export async function downloadInvoice(host: String, token: string, key: string, cb?: RequestCallback) {}

export async function getAccountBalance(host: string, token: string, cb?: RequestCallback): Promise<GetAccountBalanceResponse> {
  const req = superagent.get(`${host}/billing/balance`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

// eslint-disable-next-line max-len
export async function getBillingCharges(host: string, token: string, params?: GetBillingChargesParams, cb?: RequestCallback): Promise<SearchResponse<BillingCharge>> {
  const req = superagent.get(`${host}/billing/charges`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getInvoice(host: string, token: string, key: string, cb?: RequestCallback): Promise<GetInvoiceResponse> {
  const req = superagent.get(`${host}/billing/invoices/${key}`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

export async function getInvoices(host: string, token: string, params?: GetInvoicesParams, cb?: RequestCallback): Promise<SearchResponse<Invoice>> {
  const req = superagent.get(`${host}/billing/charges`).set('Authorization', `Bearer ${token}`)
  params && req.query(params)
  const res = await cb?.(req) || await req
  return res.body
}

export async function unholdInvoice(host: string, token: string, key: string, cb?: RequestCallback): Promise<UnholdInvoiceResponse> {
  const req = superagent.post(`${host}/billing/invoices/${key}/unhold`).set('Authorization', `Bearer ${token}`)
  const res = await cb?.(req) || await req
  return res.body
}

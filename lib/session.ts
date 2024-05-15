import { Key, Timestamps } from '.'

export interface Session extends Key, Timestamps {
  account: string
}

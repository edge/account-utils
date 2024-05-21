import { Command } from 'commander'
import createState from './state'

export interface Config {
  api: {
    timeout: number
    url: string
  }
  gateway: {
    timeout: number
    url: string
  }
  json: {
    indent: number
  }
  state: {
    file: string
  }
}

export interface Context {
  config: Config
  root: Command
  state: State

  print(data: unknown): void
}

export type State = Awaited<ReturnType<typeof createState>>

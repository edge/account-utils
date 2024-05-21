import type * as lib from '../lib'
import { Context } from './types'
import fs from 'fs/promises'
import path from 'path'

export default async function createState(ctx: Context) {
  interface InternalState {
    integrationKey?: string
    session?: lib.Session
    storageApiKey?: string
  }

  const state = <InternalState>{}

  async function read() {
    const data = await fs.readFile(ctx.config.state.file)
    const newState = JSON.parse(data.toString()) as typeof state
    for (const prop in newState) {
      const p = prop as keyof typeof state
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      state[p] = newState[p] as any
    }
  }

  async function write() {
    const data = JSON.stringify(state)
    await fs.mkdir(path.dirname(ctx.config.state.file), { recursive: true })
    await fs.writeFile(ctx.config.state.file, data)
  }

  try {
    await read()
  }
  catch (err) {
    if ((err as { code: string }).code !== 'ENOENT') {
      throw err
    }
  }

  return {
    get integrationKey() {
      return state.integrationKey
    },
    set integrationKey(v: string | undefined) {
      state.integrationKey = v
      write()
    },

    get session() {
      return state.session
    },
    set session(v: lib.Session | undefined) {
      state.session = v
      write()
    },

    get storageApiKey() {
      return state.storageApiKey
    },
    set storageApiKey(v: string | undefined) {
      state.storageApiKey = v
      write()
    }
  }
}

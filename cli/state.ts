import type * as lib from '../lib'
import { Context } from './types'
import fs from 'fs/promises'
import path from 'path'

export default async function createState(ctx: Context) {
  interface InternalState {
    session?: lib.Session
  }

  const state = <InternalState>{}

  async function read() {
    const data = await fs.readFile(ctx.config.state.file)
    const newState = JSON.parse(data.toString()) as typeof state
    for (const prop in newState) {
      const p = prop as keyof typeof state
      state[p] = newState[p]
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
    get session() {
      return state.session
    },

    set session(v: lib.Session | undefined) {
      state.session = v
      write()
    }
  }
}


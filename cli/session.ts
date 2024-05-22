import * as lib from '../lib'
import { Context } from './types'

function createSession({ config, print, state }: Context) {
  return async function(account: string, otp?: string) {
    const res = await lib.err(lib.createSession(config.api.url, { account, otp }, r => r.timeout(config.api.timeout)))
    state.session = res.session
    print(res)
  }
}

function deleteSession({ config, print, state }: Context) {
  return async function() {
    if (!state.session) return
    const res = await lib.err(lib.deleteSession(config.api.url, state.session._key, r => r.timeout(config.api.timeout)))
    state.session = undefined
    print(res)
  }
}

function updateSession({ config, print, state }: Context) {
  return async function() {
    if (!state.session) throw new Error('no session')
    const res = await lib.err(lib.updateSession(config.api.url, state.session._key, r => r.timeout(config.api.timeout)))
    state.session = res.session
    print(res)
  }
}

export function register(ctx: Context) {
  const cmd = ctx.root.command('session')

  cmd.command('create <account> [totp]').action(createSession(ctx))
  cmd.command('delete').action(deleteSession(ctx))
  cmd.command('update').action(updateSession(ctx))
}

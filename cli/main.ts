import * as session from './session'
import * as storage from './storage'
import { Command } from 'commander'
import createState from './state'
import { Config, Context } from './types'

export default async function main(argv: string[], config: Config) {
  const root = new Command('account-utils')
  const ctx = <Context>{ root, config }

  ctx.state = await createState(ctx)

  ctx.print = function(data) {
    const out = JSON.stringify(data, undefined, config.json.indent)
    console.log(out)
  }

  session.register(ctx)
  storage.register(ctx)

  await root.parseAsync(argv)
}

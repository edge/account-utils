import * as lib from '../lib'
import { Command } from 'commander'
import { Context } from './types'

function deleteFiles({ config, print, state }: Context, self: Command) {
  return async function(files: string[]) {
    if (!state.session) throw new Error('no session')
    const { key } = self.opts()

    const res = await lib.err(lib.deleteStorageFiles(
      config.api.url,
      state.session._key,
      key || state.integrationKey,
      { files }
    ))

    print(res)
  }
}

function getFiles({ config, print, state }: Context, self: Command) {
  return async function() {
    if (!state.session) throw new Error('no session')
    const { key, limit = '10', page = '1' } = self.opts()

    const res = await lib.err(lib.getStorageFiles(
      config.api.url,
      state.session._key,
      key || state.integrationKey,
      {
        limit: parseInt(limit),
        page: parseInt(page)
      }
    ))

    print(res)
  }
}

function uploadFile({ config, print, state }: Context, self: Command) {
  return async function(file: string, path: string) {
    const { apiKey, key } = self.opts()

    const res = await lib.uploadStorageFile(
      config.gateway.url,
      apiKey || state.storageApiKey,
      key || state.integrationKey,
      path,
      file,
      r => r.timeout(config.gateway.timeout)
    )
    print(res)
  }
}

function useIntegration({ state }: Context) {
  return function (key: string, apiKey: string) {
    state.integrationKey = key
    state.storageApiKey = apiKey
  }
}

export function register(ctx: Context) {
  const cmd = ctx.root.command('storage')

  const filesCmd = cmd.command('files')
    .option('--key <str>', 'integration key')
    .option('--limit <n>', 'number of files')
    .option('--page <n>', 'page number')

  filesCmd.action(getFiles(ctx, filesCmd))

  const filesDeleteCmd = filesCmd.command('delete <id...>')
    .option('--key <str>', 'integration key')
  filesDeleteCmd.action(deleteFiles(ctx, filesDeleteCmd))

  const uploadCmd = cmd.command('upload <file> <path>')
    .option('--api-key <str>', 'integration API key')
    .option('--key <str>', 'integration key')
  uploadCmd.action(uploadFile(ctx, uploadCmd))

  cmd.command('use <key> <api-key>').action(useIntegration(ctx))
}

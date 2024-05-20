import * as lib from '../lib'
import { validate } from '@edge/misc-utils'
import { config, requestCallback } from '.'

describe('account', () => {
  interface State {
    account: lib.Account
    session: lib.Session
    token: string
  }

  const state = <State>{}

  describe('create', () => {
    it('should create an account', async () => {
      /** @todo response validation */
      const data = await lib.createAccount(config.host, undefined, requestCallback)
      state.account = data.account
      state.session = data.session
      state.token = data.session._key
    })

    it('should get account data', async () => {
      /** @todo response validation */
      await lib.getAccount(config.host, state.token, requestCallback)
    })
  })

  describe('crypto', () => {
    it('should enable crypto view', () => void 0)
    it('should disable crypto view', () => void 0)
  })

  describe('progress', () => {
    it('should get account progress', async () => {
      const data = await lib.getAccountProgress(config.host, state.token, requestCallback)
      validate.validate<typeof data>({
        all: validate.bool,
        payment: validate.bool,
        service: validate.bool
      })(data)
    })

    it('should update isSetup flag', () => void 0)
  })

  describe('email', () => {
    it('should add and verify an email address', () => void 0)
    it('should update an email address', () => void 0)
    it('should log in with an email address', () => void 0)
    it('should remove an email address', () => void 0)
  })

  describe('2FA', () => {
    it('should add 2FA', () => void 0)
    it('should log in with 2FA', () => void 0)
    it('should remove 2FA', () => void 0)
  })

  describe('referrals', () => {
    it('should refer an account', () => void 0)
    it('should get the number of referred accounts', () => void 0)
  })
})

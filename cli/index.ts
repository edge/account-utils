import dotenv from 'dotenv'
import main from './main'
import os from 'os'
import path from 'path'

dotenv.config()

main(process.argv, {
  api: {
    timeout: parseInt(process.env.API_TIMEOUT || '60000'),
    url: process.env.API_URL || 'http://localhost:8419'
  },
  gateway: {
    timeout: parseInt(process.env.GATEWAY_TIMEOUT || '60000'),
    url: process.env.API_URL || 'http://gateway.local.network:3000'
  },
  json: {
    indent: parseInt(process.env.JSON_INDENT || '4')
  },
  state: {
    file: process.env.STATE_FILE || path.resolve(os.homedir(), '.edge', 'account-cli', 'state.json')
  }
})
  .catch(err => {
    console.error(err)
  })

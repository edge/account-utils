import { SuperAgentRequest } from 'superagent'
import dotenv from 'dotenv'
dotenv.config()

export const config = {
  host: process.env.HOST || 'http://localhost:8419'
}

export function requestCallback(r: SuperAgentRequest) {
  return r.set('environment', 'npm test')
}

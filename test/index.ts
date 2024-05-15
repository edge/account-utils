import dotenv from 'dotenv'
dotenv.config()

export const config = {
  host: process.env.HOST || 'http://localhost:8419'
}

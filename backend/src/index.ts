import { Hono } from 'hono'
import { cors } from 'hono/cors'
import api from './routes'

export type Bindings = {
  DATABASE_URL: string,
  jwtSecret: string,
  cryptoKey: string,
  directUrl: string
}
export type Variables = Record<string, any>

const app = new Hono()

app.use(cors())
app.route('/api/v1', api)

export default app

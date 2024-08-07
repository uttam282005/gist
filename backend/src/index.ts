import { Hono } from 'hono'
import { cors } from 'hono/cors'
import api from './routes'

export type Bindings = {
  DATABASE_URL: string,
  jwtSecret: string,
  cryptoKey: string,
  directUrl: string
  GROQ_API_KEY: string,
}
export type Variables = Record<string, any>

const app = new Hono()

app.use(cors({
  origin: ['http://localhost:5173', 'https://gist-smoky.vercel.app/'],
  credentials: true
}))
app.route('/api/v1', api)

export default app

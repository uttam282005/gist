import { Hono } from 'hono'
import { cors } from 'hono/cors'
import api from './routes'

export type Bindings = {
  DATABASE_URL: string,
  jwtSecret: string,
  cryptoKey: string,
  directUrl: string
  GROQ_API_KEY: string,
  AI: {
    [key: string]: (...args: any[]) => Promise<any>
  }
  VECTOR_INDEX: {
    [key: string]: (...args: any[]) => Promise<any>
  }
}

export type Variables = Record<string, any>

const app = new Hono()


app.use(cors())
app.route('/api/v1', api)


export default app

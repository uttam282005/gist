import { Hono } from 'hono'
import user from './user'
import blog from './blog'
import { authenticateUser } from '../middilewares/auth'
import { Bindings, Variables } from '..'

const api = new Hono<{
  Bindings: Bindings,
  Variables: Variables
}>()

api.use('/blog/*', authenticateUser);
api.use('/user/blog', authenticateUser);


api.route('/user', user);
api.route('/blog', blog);

export default api

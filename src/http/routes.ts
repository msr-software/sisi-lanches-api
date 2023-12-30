import { FastifyInstance } from 'fastify'
import { userRegister } from './controllers/user-register'
import { inputCreate, inputRead } from './controllers/input-crud'
import { authenticate } from './controllers/authenticate'
import { profile } from './controllers/profile'
import { verifyJWT } from './middleware/verify-jwt'
import { refresh } from './controllers/refresh'

export async function appRoutes(app: FastifyInstance) {
  app.post('/authenticate', authenticate)
  app.post('/users', userRegister)
  app.post('/input', inputCreate)
  app.get('/input', inputRead)

  app.patch('/token/refresh', refresh)
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}

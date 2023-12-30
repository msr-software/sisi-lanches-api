import { UserAlreadyExistsError } from '@/use-cases/errors/user-already-exists.error'
import { makeUserRegisterUseCase } from '@/use-cases/factories/make-user-register-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function userRegister(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const userData = registerBodySchema.parse(request.body)

  try {
    const userRegisterUseCase = makeUserRegisterUseCase()
    await userRegisterUseCase.execute(userData)
  } catch (error) {
    if (error instanceof UserAlreadyExistsError) {
      return reply.status(409).send({ message: error.message })
    }

    throw error
  }

  return reply.status(201).send()
}

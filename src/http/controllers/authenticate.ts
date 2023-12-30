import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { AuthenticateUseCase } from '@/use-cases/authentication'
import { InvalidCredentialError } from '@/use-cases/errors/invalid-credential.error'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const userData = authenticateBodySchema.parse(request.body)

  try {
    const userRegisterRepository = new PrismaUsersRepository()
    const authenticateUseCase = new AuthenticateUseCase(userRegisterRepository)
    const { user } = await authenticateUseCase.execute(userData)
    const token = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
        },
      },
    )
    const refreshToken = await reply.jwtSign(
      {},
      {
        sign: {
          sub: user.id,
          expiresIn: '7d',
        },
      },
    )
    return reply
      .setCookie('refreshToken', refreshToken, {
        path: '/',
        secure: true,
        sameSite: true,
        httpOnly: true,
      })
      .status(200)
      .send({ token })
  } catch (error) {
    if (error instanceof InvalidCredentialError) {
      return reply.status(400).send({ message: error.message })
    }

    throw error
  }
}

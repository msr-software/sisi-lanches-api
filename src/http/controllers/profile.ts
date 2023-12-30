/* eslint-disable @typescript-eslint/no-unused-vars */

import { makeGetUserProfileUseCase } from '@/use-cases/factories/make-user-profile-register-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

export async function profile(request: FastifyRequest, reply: FastifyReply) {
  await request.jwtVerify()

  const getUserProfile = makeGetUserProfileUseCase()
  const user = await getUserProfile.execute(request.user.sub)

  if (user) {
    const { password_hash, ...others } = user
    return reply.status(200).send({ user: others })
  }

  return reply.status(404).send(new Error('Not found'))
}

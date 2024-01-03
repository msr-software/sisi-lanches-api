import { FastifyReply, FastifyRequest } from 'fastify'

export async function healthCheck(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  return reply.status(200).send({ healthCheck: 'OK', params: request.query })
}

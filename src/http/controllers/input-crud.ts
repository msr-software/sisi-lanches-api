import { InputDto, InputQuery } from '@/repositories/input.repository'
import { makeInputReadUseCase } from '@/use-cases/factories/make-input-read-usecase'
import { makeInputRegisterUseCase } from '@/use-cases/factories/make-input-register-usecase'
import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

export async function inputCreate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const inputBodySchema = z.object({
    label: z.string(),
    type: z.enum(['INCOME', 'OUTCOME', 'PERSONAL']),
    createdAt: z.string(),
    value: z.number(),
  })

  const { createdAt, label, type, value } = inputBodySchema.parse(request.body)

  const inputRegisterUseCase = makeInputRegisterUseCase()

  await inputRegisterUseCase.execute({
    createdAt,
    label,
    type,
    value,
  })

  return reply.status(201).send()
}

export async function inputRead(request: FastifyRequest, reply: FastifyReply) {
  const queries = request.query as InputQuery
  const usecase = makeInputReadUseCase()
  const response: InputDto[] = await usecase.execute(queries)

  return reply.status(201).send(response)
}

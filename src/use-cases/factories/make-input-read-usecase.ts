import { PrismaInputRepository } from '@/repositories/prisma/prisma-input.repository'
import { InputReadUseCase } from '../input-read/input-read.usecase'

export function makeInputReadUseCase() {
  const inputRepo = new PrismaInputRepository()
  const inputReadUseCase = new InputReadUseCase(inputRepo)

  return inputReadUseCase
}

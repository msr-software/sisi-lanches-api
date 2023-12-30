import { PrismaInputRepository } from '@/repositories/prisma/prisma-input.repository'
import { InputRegisterUseCase } from '../input-register/input-register.usecase'

export function makeInputRegisterUseCase() {
  const inputRepo = new PrismaInputRepository()
  const inputRegisterUseCase = new InputRegisterUseCase(inputRepo)

  return inputRegisterUseCase
}

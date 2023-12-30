import { PrismaUsersRepository } from '@/repositories/prisma/prisma-users.repository'
import { UserRegisterUseCase } from '../user-register/user-register.usecase'

export function makeUserRegisterUseCase() {
  const userRegisterRepository = new PrismaUsersRepository()
  const userRegisterUseCase = new UserRegisterUseCase(userRegisterRepository)

  return userRegisterUseCase
}

import { UserRepository } from '@/repositories/user.repository'
import { InvalidCredentialError } from '../errors/invalid-credential.error'
import { compare } from 'bcryptjs'
import { User } from '@prisma/client'

interface AutenticateUseCaseRequest {
  email: string
  password: string
}

interface AutenticateUseCaseResponse {
  user: User
}

export class AuthenticateUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    email,
    password,
  }: AutenticateUseCaseRequest): Promise<AutenticateUseCaseResponse> {
    const user = await this.userRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialError()
    }

    const doesPasswordMatches = await compare(password, user.password_hash)
    if (!doesPasswordMatches) {
      throw new InvalidCredentialError()
    }

    return {
      user,
    }
  }
}

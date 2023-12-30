import { UserDto, UserRepository } from '@/repositories/user.repository'
import { hash } from 'bcryptjs'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

interface IUserRegisterModel {
  name: string
  email: string
  password: string
}

interface UserRegisterUseCaseResponse {
  user: UserDto
}

export class UserRegisterUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute({
    name,
    email,
    password,
  }: IUserRegisterModel): Promise<UserRegisterUseCaseResponse> {
    const passwordHash = await hash(password, 6)

    const userWithSameEmail = await this.userRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const userCreated = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
    })

    return { user: userCreated }
  }
}

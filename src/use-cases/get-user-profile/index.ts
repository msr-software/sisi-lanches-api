import { UserRepository } from '@/repositories/user.repository'

export class GetUserProfileUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findUserById(userId)
    return user
  }
}

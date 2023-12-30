import { UserCreate, UserDto, UserRepository } from '../user.repository'

export class InMemoryUsersRepository implements UserRepository {
  public users: UserDto[] = []

  async create(data: UserCreate): Promise<UserDto> {
    const user = {
      id: 'user-1',
      name: data.name,
      email: data.email,
      password_hash: data.password,
    }

    this.users.push(user)
    return user
  }

  async findUserById(userId: string): Promise<UserDto | null> {
    const user = this.users.find((item) => item.id === userId)

    if (user) {
      return user
    }

    return null
  }

  async findByEmail(email: string): Promise<UserDto | null> {
    const user = this.users.find((item) => item.email === email)

    if (!user) {
      return null
    }

    return user
  }
}

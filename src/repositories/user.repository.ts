export type UserCreate = {
  name: string
  email: string
  password: string
}

export type UserDto = {
  id: string
  name: string
  email: string
  password_hash: string
}

export interface UserRepository {
  create(data: UserCreate): Promise<UserDto>
  findByEmail(email: string): Promise<UserDto | null>
  findUserById(userId: string): Promise<UserDto | null>
}

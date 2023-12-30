import { prisma } from '@/lib/prisma'
import { UserCreate, UserDto, UserRepository } from '../user.repository'

export class PrismaUsersRepository implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }

  async findUserById(userId: string): Promise<UserDto | null> {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    })

    return user
  }

  async create({ email, name, password }: UserCreate) {
    const user = await prisma.user.create({
      data: {
        email,
        name,
        password_hash: password,
      },
    })

    return user
  }
}

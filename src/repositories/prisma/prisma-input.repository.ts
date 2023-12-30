import { prisma } from '@/lib/prisma'
import { InputDto, InputRepository } from '../input.repository'

export class PrismaInputRepository implements InputRepository {
  async readAll(): Promise<InputDto[]> {
    const inputs = await prisma.input.findMany()
    return inputs.map((item) => ({
      ...item,
      value: Number(item.value),
    }))
  }

  async create(input: InputDto): Promise<InputDto> {
    const { createdAt, id, label, type, value } = await prisma.input.create({
      data: input,
    })
    return {
      createdAt,
      label,
      value: Number(value),
      type,
      id,
    }
  }
}

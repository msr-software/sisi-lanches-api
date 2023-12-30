import { InputQuery, InputRepository } from '@/repositories/input.repository'
import { DateTime } from 'luxon'

export class InputReadUseCase {
  constructor(private readonly inputRepo: InputRepository) {}

  async execute({ endDate, startDate, type }: InputQuery) {
    let result = await this.inputRepo.readAll()

    if (startDate && endDate) {
      result = result.filter(
        (input) =>
          DateTime.fromISO(input.createdAt) >= DateTime.fromISO(startDate) &&
          DateTime.fromISO(input.createdAt) <= DateTime.fromISO(endDate),
      )
    }

    if (type) {
      result = result.filter((input) => input.type === type)
    }

    return result.map((item) => ({
      createdAt: item.createdAt,
      label: item.label,
      type: item.type,
      value: Number(item.value),
      id: item.id,
    }))
  }
}

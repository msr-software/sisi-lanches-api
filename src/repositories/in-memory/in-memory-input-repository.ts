import { InputDto, InputRepository } from '../input.repository'

export class InMemoryInputRepository implements InputRepository {
  public inputs: InputDto[] = []

  async readAll(): Promise<InputDto[]> {
    return this.inputs
  }

  async create(input: InputDto): Promise<InputDto> {
    const inputSaved = { id: 'string_id', ...input }
    this.inputs.push(inputSaved)
    await Promise.resolve()

    return inputSaved
  }
}

import { InputDto, InputRepository } from '@/repositories/input.repository'

interface InputRegisterUseCaseResponse {
  input: InputDto
}

export class InputRegisterUseCase {
  constructor(private readonly inputRepository: InputRepository) {}

  async execute(input: InputDto): Promise<InputRegisterUseCaseResponse> {
    const inputSaved = await this.inputRepository.create(input)

    return { input: inputSaved }
  }
}

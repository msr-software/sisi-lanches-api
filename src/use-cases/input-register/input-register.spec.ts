import { expect, describe, it } from 'vitest'
import { InMemoryInputRepository } from '@/repositories/in-memory/in-memory-input-repository'
import { InputRegisterUseCase } from './input-register.usecase'

describe('Input Register UseCase', () => {
  it('DEVE criar o input com sucesso QUANDO dados estiverem ok', async () => {
    const inputRepo = new InMemoryInputRepository()
    const sut = new InputRegisterUseCase(inputRepo)
    const { input } = await sut.execute({
      createdAt: '2023-12-25T21:08:26.260Z',
      label: 'x-tudao',
      type: 'INCOME',
      value: 14.5,
    })

    expect(input.id).toEqual(expect.any(String))
  })
})

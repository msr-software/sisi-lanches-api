import { expect, describe, it, beforeEach } from 'vitest'
import { UserRegisterUseCase } from './user-register.usecase'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { UserAlreadyExistsError } from '../errors/user-already-exists.error'

let userRepo: InMemoryUsersRepository
let sut: UserRegisterUseCase
describe('User Register UseCase', () => {
  beforeEach(() => {
    userRepo = new InMemoryUsersRepository()
    sut = new UserRegisterUseCase(userRepo)
  })

  it('DEVE criar um hask do password QUANDO criar um user', async () => {
    const { user } = await sut.execute({
      name: 'Teste 1',
      email: 'teste@teste.com',
      password: '123456',
    })

    const passwordCorrect = await compare('123456', user.password_hash)
    expect(passwordCorrect).toBe(true)
  })

  it('NÃO DEVE conseguir criar usuario com email já existente', async () => {
    const email = 'teste@teste.com'
    await sut.execute({
      name: 'Teste 1',
      email,
      password: '123456',
    })

    await expect(() =>
      sut.execute({
        name: 'Teste 1',
        email,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(UserAlreadyExistsError)
  })

  it('DEVE criar o usuário com sucesso', async () => {
    const { user } = await sut.execute({
      name: 'Teste 1',
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })
})

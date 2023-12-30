import { InMemoryUsersRepository } from '@/repositories/in-memory/in-memory-users-repository'
import { describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from '.'
import { hash } from 'bcryptjs'
import { InvalidCredentialError } from '../errors/invalid-credential.error'

describe('Authenticate Usecase', () => {
  it('DEVE conseguir realizar o login', async () => {
    const userRepo = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepo)

    await userRepo.create({
      name: 'teste user',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
    })
    const { user } = await sut.execute({
      email: 'teste@teste.com',
      password: '123456',
    })

    expect(user.id).toEqual(expect.any(String))
  })

  it('NÃO DEVE conseguir realizar o login com email inexistente', async () => {
    const userRepo = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepo)
    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })

  it('NÃO DEVE conseguir realizar o login com senha errado', async () => {
    const userRepo = new InMemoryUsersRepository()
    const sut = new AuthenticateUseCase(userRepo)

    await userRepo.create({
      name: 'teste user',
      email: 'teste@teste.com',
      password: await hash('123456', 6),
    })

    await expect(() =>
      sut.execute({
        email: 'teste@teste.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialError)
  })
})

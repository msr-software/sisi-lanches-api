export type InputQuery = {
  startDate: string
  endDate: string
  type: 'INCOME' | 'OUTCOME' | 'PERSONAL'
}

export type InputDto = {
  id?: string
  label: string
  value: number
  createdAt: string
  type: 'INCOME' | 'OUTCOME' | 'PERSONAL'
}

export interface InputRepository {
  create(input: InputDto): Promise<InputDto>
  readAll(): Promise<InputDto[]>
}

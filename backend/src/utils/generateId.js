
import { randomInt } from 'node:crypto'

export function generateId(prefix) {
  const normalizedPrefix = String(prefix).trim().toUpperCase()

  if (!/^[A-Z0-9]+$/.test(normalizedPrefix)) {
    throw new Error('Invalid ID prefix')
  }

  const number = randomInt(100000, 1000000)

  return `${normalizedPrefix}-${number}`
}

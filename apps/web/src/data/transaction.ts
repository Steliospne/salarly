import { createServerFn } from '@tanstack/react-start'
import { findTransactions } from './transactions.server'

export const getTransactions = createServerFn({ method: 'GET' }).handler(
  async () => {
    return findTransactions()
  },
)

import { prisma } from '@salarly/database'
import { tryCatch } from '@/lib/try-catch'

export async function findTransactions() {
  const { data, error } = await tryCatch(prisma.transaction.findMany())
  return {
    data,
    error: error as {
      name: string
      message: string
      stack?: string
      cause?: {} | undefined
    } | null,
  }
}

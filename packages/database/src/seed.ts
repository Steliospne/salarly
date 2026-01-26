import 'dotenv/config'
import { faker } from '@faker-js/faker'
import { prisma } from './client'

import type { User } from '../prisma/generated/client'
import { TransactionType } from '../prisma/generated/client'

const DEFAULT_USERS = [
  // Add your own user to pre-populate the database with
  {
    name: 'Tim Apple',
    email: 'tim@apple.com',
  },
] as Array<Partial<User>>

;(async () => {
  try {
    // Create users
    const users = await Promise.all(
      DEFAULT_USERS.map((user) =>
        prisma.user.upsert({
          where: {
            email: user.email!,
          },
          update: {
            name: user.name,
            email: user.email,
          },
          create: {
            id: faker.string.uuid(),
            name: user.name!,
            email: user.email!,
          },
        }),
      ),
    )

    console.log(`Created/updated ${users.length} user(s)`)

    // Create categories
    const categoryNames = [
      'Groceries',
      'Restaurants',
      'Transportation',
      'Entertainment',
      'Utilities',
      'Shopping',
      'Healthcare',
      'Education',
      'Salary',
      'Freelance',
      'Investment',
      'Gift',
    ]

    const categories = await Promise.all(
      categoryNames.map((name) =>
        prisma.category.upsert({
          where: { name },
          update: {},
          create: {
            id: faker.string.uuid(),
            name,
          },
        }),
      ),
    )

    console.log(`Created/updated ${categories.length} categor(ies)`)

    // Create transactions for each user
    const transactionsPerUser = 50
    const allTransactions = []

    for (const user of users) {
      const userTransactions = Array.from(
        { length: transactionsPerUser },
        () => {
          const type = faker.helpers.arrayElement<TransactionType>([
            'INCOME',
            'COST',
          ])
          const hasCategory = faker.datatype.boolean({ probability: 0.7 })
          const category = hasCategory
            ? faker.helpers.arrayElement(categories)
            : null

          return {
            id: faker.string.uuid(),
            userId: user.id,
            categoryId: category?.id ?? null,
            type,
            occurredAt: faker.date.past({ years: 2 }),
          }
        },
      )

      allTransactions.push(...userTransactions)
    }

    // Delete existing transactions for seeded users to avoid duplicates
    const userIds = users.map((u) => u.id)
    await prisma.transaction.deleteMany({
      where: {
        userId: {
          in: userIds,
        },
      },
    })

    // Create transactions in batches
    const batchSize = 100
    for (let i = 0; i < allTransactions.length; i += batchSize) {
      const batch = allTransactions.slice(i, i + batchSize)
      await prisma.transaction.createMany({
        data: batch,
      })
    }

    console.log(`Created ${allTransactions.length} transaction(s)`)

    console.log('Seed completed successfully!')
  } catch (error) {
    console.error(error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
})()

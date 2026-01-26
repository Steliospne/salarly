import { createFileRoute, useLoaderData } from '@tanstack/react-router'
import { getTransactions } from '@/data/transaction'

export const Route = createFileRoute('/_protected/dashboard')({
  component: Dashboard,
  loader: () => {
    return getTransactions()
  },
})

function Dashboard() {
  const transactions = useLoaderData({ from: '/_protected/dashboard' })

  console.log(transactions)
  return <div>Hello "/_protected/dashboard"!</div>
}

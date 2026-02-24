'use client'

import { useEffect, useState } from 'react'
import { Wallet, TrendingUp, TrendingDown, PiggyBank } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { SummaryCard } from '@/components/summary-card'
import { ChartsSection } from '@/components/charts-section'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function DashboardPage() {

  const [data, setData] = useState({
    total_balance: 0,
    total_income: 0,
    total_expense: 0,
    savings: 0
  })

  // 🔥 FETCH ANALYTICS
  useEffect(() => {
    fetch("http://localhost:8000/analytics/summary")
      .then(res => res.json())
      .then(setData)
  }, [])

  return (
    <LayoutWrapper title="Dashboard">

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          title="Total Balance"
          value={`$${data.total_balance.toFixed(2)}`}
          trend={5.2}
          icon={Wallet}
          variant="default"
        />
        <SummaryCard
          title="Total Income"
          value={`$${data.total_income.toFixed(2)}`}
          trend={8.1}
          icon={TrendingUp}
          variant="income"
        />
        <SummaryCard
          title="Total Expense"
          value={`$${data.total_expense.toFixed(2)}`}
          trend={-3.5}
          icon={TrendingDown}
          variant="expense"
        />
        <SummaryCard
          title="Savings"
          value={`$${data.savings.toFixed(2)}`}
          trend={12.3}
          icon={PiggyBank}
          variant="savings"
        />
      </div>

      {/* Charts Section */}
      <ChartsSection />

      {/* Quick Actions */}
      <div className="mt-8 flex gap-3">
        <Link href="/add-transaction">
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Add Transaction
          </Button>
        </Link>
        <Link href="/transactions">
          <Button variant="outline" className="border-border text-foreground hover:bg-muted/50 rounded-lg">
            View All Transactions
          </Button>
        </Link>
      </div>

    </LayoutWrapper>
  )
}
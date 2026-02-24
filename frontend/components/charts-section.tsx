'use client'

import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useTransactions } from '@/context/transaction-context'

const chartColors = {
  income: '#10b981',
  expense: '#ef4444',
  primary: '#3b82f6',
  secondary: '#06b6d4',
}

export function ChartsSection() {
  const { transactions, getRecentTransactions } = useTransactions()
  
  // Generate Income vs Expense data grouped by month
  const incomeExpenseData = [
    { month: 'Jan', income: 4000, expense: 2400 },
    { month: 'Feb', income: 3000, expense: 1398 },
    { month: 'Mar', income: 2000, expense: 9800 },
    { month: 'Apr', income: 2780, expense: 3908 },
    { month: 'May', income: 1890, expense: 4800 },
    { month: 'Jun', income: 2390, expense: 3800 },
  ]

  // Generate spending trend data
  const spendingData = [
    { month: 'Week 1', amount: 1200 },
    { month: 'Week 2', amount: 1800 },
    { month: 'Week 3', amount: 1100 },
    { month: 'Week 4', amount: 2200 },
  ]

  // Generate category distribution from transactions
  const categoryTotals = transactions
    .filter(tx => tx.type === 'expense')
    .reduce((acc, tx) => {
      const existing = acc.find(item => item.name === tx.category)
      if (existing) {
        existing.value += tx.amount
      } else {
        acc.push({ name: tx.category, value: tx.amount })
      }
      return acc
    }, [] as Array<{ name: string; value: number }>)

  const totalExpense = categoryTotals.reduce((sum, cat) => sum + cat.value, 0)
  const categoryData = categoryTotals
    .map((cat, idx) => ({
      ...cat,
      value: Math.round((cat.value / totalExpense) * 100),
      fill: ['#3b82f6', '#06b6d4', '#10b981', '#f59e0b', '#8b5cf6', '#ec4899'][idx % 6],
    }))
    .sort((a, b) => b.value - a.value)

  // Get recent transactions
  const recentTransactions = getRecentTransactions(4)
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Income vs Expense Bar Chart */}
      <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">Income vs Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
              }}
            />
            <Legend />
            <Bar dataKey="income" fill={chartColors.income} name="Income" radius={[8, 8, 0, 0]} />
            <Bar dataKey="expense" fill={chartColors.expense} name="Expense" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Monthly Spending Line Chart */}
      <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">Weekly Spending Trend</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={spendingData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
              }}
            />
            <Line
              type="monotone"
              dataKey="amount"
              stroke={chartColors.primary}
              strokeWidth={3}
              dot={{ fill: chartColors.primary, r: 5 }}
              activeDot={{ r: 7 }}
              name="Spending"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Category Distribution Pie Chart */}
      <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">Spending by Category</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}%`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.fill} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: 'var(--card)',
                border: '1px solid var(--border)',
                borderRadius: '0.5rem',
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Recent Transactions Summary */}
      <div className="bg-card rounded-xl border border-border/50 p-6 shadow-sm">
        <h3 className="text-lg font-semibold text-foreground mb-6">Recent Transactions</h3>
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
              <div className="flex-1">
                <p className="text-sm font-medium text-foreground">{tx.description}</p>
                <p className="text-xs text-muted-foreground">{tx.category}</p>
              </div>
              <div className="text-right">
                <p className={tx.type === 'income' ? 'text-green-600 font-semibold' : 'text-foreground font-semibold'}>
                  {tx.type === 'income' ? '+' : '-'}${tx.amount.toFixed(2)}
                </p>
                <p className="text-xs text-muted-foreground capitalize">completed</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

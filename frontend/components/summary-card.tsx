import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SummaryCardProps {
  title: string
  value: string
  trend?: number
  icon: LucideIcon
  variant?: 'default' | 'income' | 'expense' | 'savings'
}

export function SummaryCard({ title, value, trend, icon: Icon, variant = 'default' }: SummaryCardProps) {
  const variantStyles = {
    default: 'from-primary/10 to-primary/5',
    income: 'from-green-500/10 to-green-500/5',
    expense: 'from-destructive/10 to-destructive/5',
    savings: 'from-accent/10 to-accent/5',
  }

  const iconStyles = {
    default: 'text-primary',
    income: 'text-green-600 dark:text-green-400',
    expense: 'text-destructive',
    savings: 'text-accent',
  }

  const trendStyles = trend && trend > 0 ? 'text-green-600' : 'text-destructive'

  return (
    <div className={cn('bg-gradient-to-br', variantStyles[variant], 'rounded-xl border border-border/50 p-6 transition-all duration-300 hover:shadow-lg hover:border-border')}>
      <div className="flex items-start justify-between mb-4">
        <div className={cn('p-3 rounded-lg bg-background/50', iconStyles[variant])}>
          <Icon className="h-6 w-6" />
        </div>
        {trend !== undefined && (
          <div className={cn('text-sm font-semibold flex items-center gap-1', trendStyles)}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
          </div>
        )}
      </div>
      <h3 className="text-sm font-medium text-muted-foreground mb-2">{title}</h3>
      <p className="text-3xl font-bold text-foreground">{value}</p>
    </div>
  )
}

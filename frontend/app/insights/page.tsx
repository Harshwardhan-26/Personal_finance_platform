'use client'

import { useState } from 'react'
import { TrendingUp, AlertCircle, Target, Zap, PieChart, Lightbulb } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/modal'

interface InsightCard {
  icon: React.ReactNode
  title: string
  description: string
  value?: string
  action?: string
  actionType?: 'review' | 'budget' | 'savings'
}

export default function InsightsPage() {
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [budgetLimit, setBudgetLimit] = useState('3500')
  const insights: InsightCard[] = [
    {
      icon: <TrendingUp className="h-6 w-6 text-accent" />,
      title: 'Spending Trend',
      description: 'Your spending is up 12% this month compared to last month. Food and entertainment are the top categories.',
      value: '+12%',
    },
    {
      icon: <AlertCircle className="h-6 w-6 text-destructive" />,
      title: 'Unusual Activity Detected',
      description: 'You spent $150 at a restaurant on Jan 14. This is unusual for you. Would you like to review this?',
      action: 'Review',
      actionType: 'review',
    },
    {
      icon: <Target className="h-6 w-6 text-primary" />,
      title: 'Budget Suggestion',
      description: 'Based on your spending patterns, we recommend setting a monthly budget of $3,500 for optimal savings.',
      action: 'Set Budget',
      actionType: 'budget',
    },
    {
      icon: <Zap className="h-6 w-6 text-yellow-500" />,
      title: 'Quick Savings Opportunity',
      description: 'You can save $45/month by switching to a cheaper entertainment plan. We found 3 alternatives.',
      action: 'Explore Options',
      actionType: 'savings',
    },
  ]

  const alerts = [
    { type: 'warning', message: 'You\'re approaching your monthly spending limit (85% used)' },
    { type: 'info', message: 'New bill detected: Netflix subscription renewed for $15.99' },
    { type: 'success', message: 'Great job! You saved $120 this week by cooking at home.' },
  ]

  const forecast = [
    { month: 'Feb 2024', projected: '$2,850', trend: 'down' },
    { month: 'Mar 2024', projected: '$2,720', trend: 'down' },
    { month: 'Apr 2024', projected: '$2,950', trend: 'up' },
  ]

  return (
    <LayoutWrapper title="Insights">
      <div className="space-y-8">
        {/* Main Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {insights.map((insight, idx) => (
            <div
              key={idx}
              className="bg-card rounded-xl border border-border/50 p-6 hover:shadow-lg transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg bg-muted/50">{insight.icon}</div>
                {insight.value && (
                  <span className="text-xl font-bold text-accent">{insight.value}</span>
                )}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{insight.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{insight.description}</p>
              {insight.action && (
                <Button
                  onClick={() => setActiveModal(insight.actionType || '')}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10"
                >
                  {insight.action}
                </Button>
              )}
            </div>
          ))}
        </div>

        {/* Alerts Section */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-2 mb-6">
            <AlertCircle className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Recent Alerts</h2>
          </div>
          <div className="space-y-3">
            {alerts.map((alert, idx) => {
              const colorMap = {
                warning: 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200',
                info: 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200',
                success: 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200',
              }
              return (
                <div
                  key={idx}
                  className={`p-4 rounded-lg border ${colorMap[alert.type as keyof typeof colorMap]} text-sm font-medium`}
                >
                  {alert.message}
                </div>
              )
            })}
          </div>
        </div>

        {/* Forecast Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {forecast.map((item, idx) => (
            <div key={idx} className="bg-card rounded-xl border border-border/50 p-6">
              <div className="flex items-center gap-2 mb-4">
                <PieChart className="h-5 w-5 text-primary" />
                <h3 className="font-semibold text-foreground text-sm">{item.month}</h3>
              </div>
              <p className="text-3xl font-bold text-foreground mb-2">{item.projected}</p>
              <p className={`text-sm font-medium ${item.trend === 'up' ? 'text-destructive' : 'text-green-600'}`}>
                Trend: {item.trend === 'up' ? '↑ Increasing' : '↓ Decreasing'}
              </p>
            </div>
          ))}
        </div>

        {/* AI Insights Placeholder */}
        <div className="bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl border border-primary/20 p-8 text-center">
          <Lightbulb className="h-12 w-12 text-primary mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-foreground mb-2">Advanced Insights Coming Soon</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Our AI-powered engine is learning your spending patterns. Soon you'll get personalized recommendations for savings opportunities, investment suggestions, and financial goals tracking.
          </p>
          <Button className="mt-6 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg">
            Enable AI Insights
          </Button>
        </div>
      </div>

      {/* Review Transaction Modal */}
      <Modal
        isOpen={activeModal === 'review'}
        onClose={() => setActiveModal(null)}
        title="Review Flagged Transaction"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-muted/30 rounded-lg border border-border">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Description</p>
                <p className="font-medium text-foreground">Restaurant Dinner</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Amount</p>
                <p className="font-medium text-foreground">$150.00</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Date</p>
                <p className="font-medium text-foreground">January 14, 2024</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Category</p>
                <p className="font-medium text-foreground">Food</p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-800 dark:text-yellow-200">
              <strong>Why flagged:</strong> This transaction is 3x higher than your average restaurant spending. Consider if this was a special occasion.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              onClick={() => setActiveModal(null)}
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10"
            >
              Confirm Legitimate
            </Button>
            <Button
              variant="outline"
              onClick={() => setActiveModal(null)}
              className="flex-1 border-destructive text-destructive hover:bg-destructive/10 rounded-lg h-10"
            >
              Mark as Fraud
            </Button>
          </div>
        </div>
      </Modal>

      {/* Set Budget Modal */}
      <Modal
        isOpen={activeModal === 'budget'}
        onClose={() => setActiveModal(null)}
        title="Set Monthly Budget"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setActiveModal(null)
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Monthly Budget Limit</label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground font-medium">$</span>
              <Input
                type="number"
                value={budgetLimit}
                onChange={(e) => setBudgetLimit(e.target.value)}
                step="100"
                min="0"
                className="pl-8 h-11 rounded-lg bg-muted/50 border-border"
              />
            </div>
          </div>
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
            <p className="text-sm text-blue-800 dark:text-blue-200">
              You'll receive alerts when you reach 85% of your budget limit.
            </p>
          </div>
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10"
            >
              Set Budget
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setActiveModal(null)}
              className="flex-1 border-border text-foreground hover:bg-muted/50 rounded-lg h-10"
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>

      {/* Explore Savings Options Modal */}
      <Modal
        isOpen={activeModal === 'savings'}
        onClose={() => setActiveModal(null)}
        title="Savings Opportunities"
        size="md"
      >
        <div className="space-y-4">
          <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
            <p className="text-sm text-green-800 dark:text-green-200 font-medium mb-3">Estimated Savings: $45/month ($540/year)</p>
            <div className="space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">Premium Streaming Bundle</p>
                  <p className="text-xs text-muted-foreground">Netflix + Disney+ combined plan</p>
                </div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">Save 30%</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">Annual Gym Membership</p>
                  <p className="text-xs text-muted-foreground">Pay yearly instead of monthly</p>
                </div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">Save 15%</p>
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium text-foreground">Cashback Credit Card</p>
                  <p className="text-xs text-muted-foreground">Earn 1-5% on purchases</p>
                </div>
                <p className="text-sm font-semibold text-green-600 dark:text-green-400">Variable</p>
              </div>
            </div>
          </div>
          <Button
            onClick={() => setActiveModal(null)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10"
          >
            Got It
          </Button>
        </div>
      </Modal>
    </LayoutWrapper>
  )
}

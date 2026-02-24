'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { DollarSign, Type, Tag, Plus } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTransactions } from '@/context/transaction-context'

export default function AddTransactionPage() {
  const router = useRouter()
  const { addTransaction } = useTransactions()

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [successMessage, setSuccessMessage] = useState('')

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    category: 'Food',
    date: new Date().toISOString().split('T')[0],
    paymentMethod: 'Card',
  })

  const categories = [
    'Food',
    'Transport',
    'Entertainment',
    'Bills',
    'Shopping',
    'Healthcare',
    'Education',
    'Utilities',
    'Other',
  ]

  const paymentMethods = ['Cash', 'Card', 'UPI', 'Net Banking', 'Wallet']

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // ✅ CLEAN SUBMIT
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    await addTransaction({
      amount: parseFloat(formData.amount),
      description: formData.description,
      category: formData.category,
      date: formData.date,
      paymentMethod: formData.paymentMethod,
    })

    setSuccessMessage('Transaction added successfully!')

    // Reset form
    setFormData({
      amount: '',
      description: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Card',
    })

    setIsSubmitting(false)

    // ✅ ONLY NAVIGATE
    router.push('/transactions')
  }

  const handleReset = () => {
    setFormData({
      amount: '',
      description: '',
      category: 'Food',
      date: new Date().toISOString().split('T')[0],
      paymentMethod: 'Card',
    })
  }

  return (
    <LayoutWrapper title="Add Transaction">
      <div className="max-w-2xl">

        {successMessage && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm font-medium text-green-800">{successMessage}</p>
          </div>
        )}

        <div className="bg-card rounded-2xl border p-8 shadow-sm">
          <h2 className="text-2xl font-bold mb-8">Create New Transaction</h2>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Amount */}
            <div>
              <label className="flex items-center text-sm font-semibold">
                <DollarSign className="h-4 w-4 mr-2" /> Amount
              </label>
              <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="flex items-center text-sm font-semibold">
                <Type className="h-4 w-4 mr-2" /> Description
              </label>
              <Input
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            {/* Category */}
            <select name="category" value={formData.category} onChange={handleChange}>
              {categories.map((cat) => (
                <option key={cat}>{cat}</option>
              ))}
            </select>

            {/* Date */}
            <Input type="date" name="date" value={formData.date} onChange={handleChange} />

            {/* Payment */}
            <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
              {paymentMethods.map((m) => (
                <option key={m}>{m}</option>
              ))}
            </select>

            <div className="flex gap-4 pt-6">
              <Button type="submit" disabled={isSubmitting}>
                <Plus className="h-5 w-5 mr-2" />
                {isSubmitting ? 'Adding...' : 'Add Transaction'}
              </Button>

              <Button type="button" onClick={handleReset} variant="outline">
                Reset
              </Button>
            </div>

          </form>
        </div>
      </div>
    </LayoutWrapper>
  )
}
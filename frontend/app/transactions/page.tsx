'use client'

import { useState } from 'react'
import { Trash2 } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useTransactions } from '@/context/transaction-context'

export default function TransactionsPage() {
  const { transactions, deleteTransaction } = useTransactions()

  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  // Filter
  const filtered = transactions.filter((tx) =>
    tx.description?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination
  const totalPages = Math.ceil(filtered.length / itemsPerPage)
  const startIdx = (currentPage - 1) * itemsPerPage
  const paginatedTransactions = filtered.slice(startIdx, startIdx + itemsPerPage)

  return (
    <LayoutWrapper title="Transactions">
      <div className="space-y-6">

        {/* Search */}
        <div className="bg-card p-6 rounded-xl border">
          <Input
            placeholder="Search transactions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="bg-card rounded-xl border overflow-hidden">
          <table className="w-full">
            <thead className="bg-muted">
              <tr>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Description</th>
                <th className="p-4 text-left">Category</th>
                <th className="p-4 text-left">Method</th>
                <th className="p-4 text-right">Amount</th>
                <th className="p-4 text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {paginatedTransactions.length > 0 ? (
                paginatedTransactions.map((tx) => (
                  <tr key={tx.id} className="border-t">
                    <td className="p-4">{new Date(tx.date).toLocaleDateString()}</td>
                    <td className="p-4">{tx.description}</td>
                    <td className="p-4">{tx.category}</td>
                    <td className="p-4">{tx.paymentMethod || 'Unknown'}</td>
                    <td className="p-4 text-right font-semibold">
                      {((tx.type || 'expense') === 'income' ? '+' : '-')}${Number(tx.amount).toFixed(2)}
                    </td>
                    <td className="p-4 text-center">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => deleteTransaction(tx.id)}
                      >
                        <Trash2 className="h-4 w-4 text-red-500" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-8 text-center text-muted-foreground">
                    No transactions found
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-4 flex justify-between items-center border-t">
              <p className="text-sm">
                Page {currentPage} of {totalPages}
              </p>
              <div className="flex gap-2">
                <Button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Prev
                </Button>
                <Button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </LayoutWrapper>
  )
}
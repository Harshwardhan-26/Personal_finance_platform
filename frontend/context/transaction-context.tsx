'use client'

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

export interface Transaction {
  id: number
  date: string
  description: string
  category: string
  paymentMethod: string
  amount: number
  type: 'income' | 'expense'
}

interface TransactionContextType {
  transactions: Transaction[]
  addTransaction: (transaction: Omit<Transaction, 'id' | 'type'>) => Promise<void>
  deleteTransaction: (id: number) => Promise<void>
  updateTransaction: (id: number, updates: Partial<Omit<Transaction, 'id'>>) => Promise<void>
  getRecentTransactions: (limit?: number) => Transaction[]
  getTotalBalance: () => number
  getTotalIncome: () => number
  getTotalExpense: () => number
}

const TransactionContext = createContext<TransactionContextType | undefined>(undefined)

export function TransactionProvider({ children }: { children: React.ReactNode }) {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  // 🔥 SINGLE SOURCE OF TRUTH — load function
  const loadTransactions = async () => {
    const res = await fetch("http://localhost:8000/transactions")
    const data = await res.json()
    setTransactions(data)
  }

  // 🔥 LOAD ON APP START
  useEffect(() => {
    loadTransactions()
  }, [])

  // 🔥 ADD
  const addTransaction = useCallback(async (newTransaction) => {
  await fetch("http://localhost:8000/transactions/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    // 🔥 CRITICAL FIX — send snake_case
    body: JSON.stringify({
      amount: newTransaction.amount,
      description: newTransaction.description,
      category: newTransaction.category,
      date: newTransaction.date,
      payment_method: newTransaction.paymentMethod
    }),
  })

  await loadTransactions()   // reload state
}, [])

  // 🔥 DELETE
  const deleteTransaction = useCallback(async (id: number) => {
    await fetch(`http://localhost:8000/transactions/${id}`, {
      method: "DELETE",
    })

    await loadTransactions()   // 🔥 CRITICAL
  }, [])

  // 🔥 UPDATE
  const updateTransaction = useCallback(async (id: number, updates) => {
    await fetch(`http://localhost:8000/transactions/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updates),
    })

    await loadTransactions()   // 🔥 CRITICAL
  }, [])

  const getRecentTransactions = useCallback((limit = 5) => {
    return transactions.slice(0, limit)
  }, [transactions])

  const getTotalBalance = useCallback(() => {
    return transactions.reduce((sum, tx) =>
      tx.type === 'income' ? sum + tx.amount : sum - tx.amount, 0
    )
  }, [transactions])

  const getTotalIncome = useCallback(() => {
    return transactions
      .filter(tx => tx.type === 'income')
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [transactions])

  const getTotalExpense = useCallback(() => {
    return transactions
      .filter(tx => tx.type === 'expense')
      .reduce((sum, tx) => sum + tx.amount, 0)
  }, [transactions])

  const value: TransactionContextType = {
    transactions,
    addTransaction,
    deleteTransaction,
    updateTransaction,
    getRecentTransactions,
    getTotalBalance,
    getTotalIncome,
    getTotalExpense,
  }

  return (
    <TransactionContext.Provider value={value}>
      {children}
    </TransactionContext.Provider>
  )
}

export function useTransactions() {
  const context = useContext(TransactionContext)
  if (!context) throw new Error('useTransactions must be used within TransactionProvider')
  return context
}
'use client'

import { Sidebar } from '@/components/sidebar'
import { Header } from '@/components/header'

interface LayoutWrapperProps {
  children: React.ReactNode
  title: string
}

export function LayoutWrapper({ children, title }: LayoutWrapperProps) {
  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="ml-64 flex-1 flex flex-col pt-20">
        <Header title={title} />
        <div className="flex-1 overflow-auto">
          <div className="p-8">
            {children}
          </div>
        </div>
      </main>
    </div>
  )
}

'use client'

import { Search, Bell, User } from 'lucide-react'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface HeaderProps {
  title: string
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 left-64 right-0 h-20 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-30">
      <div className="h-full px-8 flex items-center justify-between gap-4">
        {/* Left Section - Title and Search */}
        <div className="flex-1 flex items-center gap-4">
          <h1 className="text-2xl font-bold text-foreground hidden sm:block">{title}</h1>
          
          <div className="hidden md:flex ml-auto items-center relative">
            <Search className="absolute left-3 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search transactions..."
              className="pl-10 pr-4 h-10 w-64 bg-muted/50 border-0 rounded-lg"
            />
          </div>
        </div>

        {/* Right Section - Icons */}
        <div className="flex items-center gap-2">
          {/* Notifications */}
          <Button
            variant="ghost"
            size="icon"
            className="rounded-lg"
          >
            <Bell className="h-5 w-5" />
          </Button>

          {/* Theme Toggle */}
          <ThemeToggle />

          {/* User Profile */}
          <Button
            variant="outline"
            size="icon"
            className="rounded-lg"
          >
            <User className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  )
}

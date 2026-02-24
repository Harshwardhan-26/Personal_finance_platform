'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Eye, EyeOff, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import { ThemeToggle } from '@/components/theme-toggle'

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [agreedToTerms, setAgreedToTerms] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Signup attempt:', { ...formData, agreedToTerms })
  }

  const passwordsMatch = formData.password === formData.confirmPassword && formData.password.length > 0
  const isFormValid = formData.name && formData.email && passwordsMatch && agreedToTerms

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background to-muted">
      {/* Header */}
      <div className="absolute top-4 right-4">
        <ThemeToggle />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-8">
        <div className="w-full max-w-md">
          {/* Card */}
          <div className="bg-card rounded-2xl shadow-lg p-8 border border-border/50">
            {/* Logo and Title */}
            <div className="text-center mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent text-primary-foreground font-bold text-xl mx-auto mb-4">
                FF
              </div>
              <h1 className="text-3xl font-bold text-foreground mb-2">Create Account</h1>
              <p className="text-sm text-muted-foreground">Join FinFlow today</p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Full Name</label>
                <Input
                  type="text"
                  name="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  className="h-11 rounded-lg bg-muted/50 border-border"
                  required
                />
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <Input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="h-11 rounded-lg bg-muted/50 border-border"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create a strong password"
                    value={formData.password}
                    onChange={handleChange}
                    className="h-11 rounded-lg bg-muted/50 border-border pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password Input */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Confirm Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="h-11 rounded-lg bg-muted/50 border-border pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
                {formData.confirmPassword && (
                  <div className="flex items-center gap-2 text-sm">
                    {passwordsMatch ? (
                      <>
                        <Check className="h-4 w-4 text-green-600" />
                        <span className="text-green-600">Passwords match</span>
                      </>
                    ) : (
                      <>
                        <span className="text-destructive">Passwords don't match</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Terms Checkbox */}
              <div className="flex items-start gap-2 py-2">
                <Checkbox
                  id="terms"
                  checked={agreedToTerms}
                  onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                  className="mt-1"
                />
                <label htmlFor="terms" className="text-xs text-muted-foreground cursor-pointer leading-tight">
                  I agree to the{' '}
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="#" className="text-primary hover:underline font-medium">
                    Privacy Policy
                  </Link>
                </label>
              </div>

              {/* Create Account Button */}
              <Button
                type="submit"
                disabled={!isFormValid}
                className="w-full h-11 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium text-base mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Create Account
              </Button>
            </form>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-card text-muted-foreground">Already have an account?</span>
              </div>
            </div>

            {/* Sign In Link */}
            <Link href="/login">
              <Button
                variant="outline"
                className="w-full h-11 rounded-lg border-border text-foreground hover:bg-muted/50"
              >
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

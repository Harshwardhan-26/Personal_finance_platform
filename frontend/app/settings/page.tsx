'use client'

import { useState } from 'react'
import { Bell, Lock, User, Palette, LogOut, ShieldAlert, Check } from 'lucide-react'
import { LayoutWrapper } from '@/components/layout-wrapper'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Modal } from '@/components/modal'
import { useTheme } from 'next-themes'

export default function SettingsPage() {
  const { theme, setTheme } = useTheme()
  const [activeModal, setActiveModal] = useState<string | null>(null)
  const [saveMessage, setSaveMessage] = useState('')
  
  // Profile state
  const [profile, setProfile] = useState({ fullName: 'John Doe', email: 'john@example.com' })
  const [profileForm, setProfileForm] = useState(profile)
  
  // Password state
  const [passwordForm, setPasswordForm] = useState({ current: '', new: '', confirm: '' })
  
  // Notifications state
  const [notifications, setNotifications] = useState({
    transactions: true,
    budget: true,
    weekly: true,
    offers: false,
  })
  
  // Selected theme
  const [selectedTheme, setSelectedTheme] = useState(theme || 'light')
  return (
    <LayoutWrapper title="Settings">
      <div className="max-w-3xl space-y-6">
        {/* Profile Section */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <User className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Profile Settings</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
              <Input
                value={profileForm.fullName}
                onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
                className="h-11 rounded-lg bg-muted/50 border-border"
                disabled
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
              <Input
                type="email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                className="h-11 rounded-lg bg-muted/50 border-border"
                disabled
              />
            </div>
            <Button
              onClick={() => setActiveModal('profile')}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-11"
            >
              Edit Profile
            </Button>
          </div>
        </div>

        {/* Security Section */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Lock className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Security</h2>
          </div>
          <Button
            onClick={() => setActiveModal('password')}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-11"
          >
            Change Password
          </Button>
        </div>

        {/* Notifications Section */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Bell className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Notifications</h2>
          </div>
          <div className="space-y-4">
            {[
              { key: 'transactions', label: 'Transaction Alerts', desc: 'Get notified for every transaction' },
              { key: 'budget', label: 'Budget Warnings', desc: 'Get notified when approaching budget limits' },
              { key: 'weekly', label: 'Weekly Digest', desc: 'Receive weekly spending summary' },
              { key: 'offers', label: 'Special Offers', desc: 'Get notified about promotions and offers' },
            ].map((item) => (
              <div key={item.key} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.desc}</p>
                </div>
                <Checkbox
                  checked={notifications[item.key as keyof typeof notifications]}
                  onCheckedChange={(checked) =>
                    setNotifications({ ...notifications, [item.key]: checked })
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Appearance Section */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Appearance</h2>
          </div>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-foreground block mb-3">Theme</label>
              <div className="grid grid-cols-3 gap-3">
                {['light', 'dark', 'system'].map((t) => (
                  <Button
                    key={t}
                    onClick={() => {
                      setSelectedTheme(t)
                      setTheme(t)
                    }}
                    variant={selectedTheme === t ? 'default' : 'outline'}
                    className="h-10 rounded-lg capitalize"
                  >
                    {t}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Privacy Section */}
        <div className="bg-card rounded-xl border border-border/50 p-6">
          <div className="flex items-center gap-3 mb-6">
            <ShieldAlert className="h-6 w-6 text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Privacy & Data</h2>
          </div>
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Your financial data is encrypted and secure. We never share your information with third parties.
            </p>
            <Button variant="outline" className="w-full border-border text-foreground hover:bg-muted/50 rounded-lg h-11">
              Download My Data
            </Button>
          </div>
        </div>

        {/* Logout Section */}
        <div className="bg-card rounded-xl border border-destructive/20 p-6">
          <div className="flex items-center gap-3 mb-4">
            <LogOut className="h-6 w-6 text-destructive" />
            <h2 className="text-xl font-semibold text-foreground">Logout</h2>
          </div>
          <p className="text-sm text-muted-foreground mb-4">Sign out of your account on all devices</p>
          <Button
            onClick={() => setActiveModal('logout')}
            className="w-full bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg h-11"
          >
            Logout
          </Button>
        </div>

        {/* Success Message */}
        {saveMessage && (
          <div className="fixed bottom-6 right-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 flex items-center gap-2">
            <Check className="h-5 w-5 text-green-600 dark:text-green-400" />
            <p className="text-sm font-medium text-green-800 dark:text-green-200">{saveMessage}</p>
          </div>
        )}
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={activeModal === 'profile'}
        onClose={() => setActiveModal(null)}
        title="Edit Profile"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            setProfile(profileForm)
            setSaveMessage('Profile updated successfully!')
            setActiveModal(null)
            setTimeout(() => setSaveMessage(''), 3000)
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Full Name</label>
            <Input
              type="text"
              value={profileForm.fullName}
              onChange={(e) => setProfileForm({ ...profileForm, fullName: e.target.value })}
              className="h-10 rounded-lg bg-muted/50 border-border"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Email Address</label>
            <Input
              type="email"
              value={profileForm.email}
              onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
              className="h-10 rounded-lg bg-muted/50 border-border"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10"
            >
              Save Changes
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

      {/* Change Password Modal */}
      <Modal
        isOpen={activeModal === 'password'}
        onClose={() => setActiveModal(null)}
        title="Change Password"
        size="md"
      >
        <form
          onSubmit={(e) => {
            e.preventDefault()
            if (passwordForm.new !== passwordForm.confirm) {
              alert('Passwords do not match!')
              return
            }
            setSaveMessage('Password updated successfully!')
            setPasswordForm({ current: '', new: '', confirm: '' })
            setActiveModal(null)
            setTimeout(() => setSaveMessage(''), 3000)
          }}
          className="space-y-4"
        >
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Current Password</label>
            <Input
              type="password"
              value={passwordForm.current}
              onChange={(e) => setPasswordForm({ ...passwordForm, current: e.target.value })}
              placeholder="Enter current password"
              className="h-10 rounded-lg bg-muted/50 border-border"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">New Password</label>
            <Input
              type="password"
              value={passwordForm.new}
              onChange={(e) => setPasswordForm({ ...passwordForm, new: e.target.value })}
              placeholder="Enter new password"
              className="h-10 rounded-lg bg-muted/50 border-border"
              required
            />
          </div>
          <div>
            <label className="text-sm font-medium text-foreground block mb-2">Confirm Password</label>
            <Input
              type="password"
              value={passwordForm.confirm}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirm: e.target.value })}
              placeholder="Confirm new password"
              className="h-10 rounded-lg bg-muted/50 border-border"
              required
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg h-10"
            >
              Update Password
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

      {/* Logout Confirmation Modal */}
      <Modal
        isOpen={activeModal === 'logout'}
        onClose={() => setActiveModal(null)}
        title="Confirm Logout"
        size="sm"
      >
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">Are you sure you want to logout? You'll be signed out on all devices.</p>
          <div className="flex gap-3">
            <Button
              onClick={() => {
                setSaveMessage('Logged out successfully!')
                setActiveModal(null)
                setTimeout(() => setSaveMessage(''), 3000)
              }}
              className="flex-1 bg-destructive hover:bg-destructive/90 text-destructive-foreground rounded-lg h-10"
            >
              Logout
            </Button>
            <Button
              onClick={() => setActiveModal(null)}
              variant="outline"
              className="flex-1 border-border text-foreground hover:bg-muted/50 rounded-lg h-10"
            >
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </LayoutWrapper>
  )
}

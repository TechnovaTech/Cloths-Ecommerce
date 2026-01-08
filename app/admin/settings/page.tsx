"use client"

import * as React from "react"
import { Save } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

interface SettingsData {
  siteName: string
  adminEmail: string
  currency: string
  taxRate: number
  shippingFee: number
  notifications: boolean
  emailAlerts: boolean
  maintenanceMode: boolean
}

export default function SettingsPage() {
  const [settings, setSettings] = React.useState<SettingsData>({
    siteName: "ATELIER",
    adminEmail: "admin@example.com",
    currency: "INR",
    taxRate: 10,
    shippingFee: 50,
    notifications: true,
    emailAlerts: true,
    maintenanceMode: false
  })
  const [loading, setLoading] = React.useState(true)
  const [saving, setSaving] = React.useState(false)

  React.useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch('/api/admin/settings')
      const data = await response.json()
      setSettings(data)
    } catch (error) {
      console.error('Failed to fetch settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings)
      })
      if (response.ok) {
        alert('Settings saved successfully!')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Settings" subtitle="Configure your store settings">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading settings...</div>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  return (
    <AdminAuthWrapper>
    <AdminLayout title="Settings" subtitle="Configure your store settings">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* General Settings */}
        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-serif font-bold text-primary">General Settings</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Site Name
              </label>
              <input
                type="text"
                value={settings.siteName}
                onChange={(e) => setSettings({...settings, siteName: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Admin Email
              </label>
              <input
                type="email"
                value={settings.adminEmail}
                onChange={(e) => setSettings({...settings, adminEmail: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Currency
              </label>
              <select
                value={settings.currency}
                onChange={(e) => setSettings({...settings, currency: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              >
                <option value="USD">USD - US Dollar</option>
                <option value="EUR">EUR - Euro</option>
                <option value="GBP">GBP - British Pound</option>
                <option value="INR">INR - Indian Rupee</option>
              </select>
            </div>
          </div>
        </div>

        {/* Store Settings */}
        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-serif font-bold text-primary">Store Settings</h3>
          </div>
          <div className="p-6 space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Tax Rate (%)
              </label>
              <input
                type="number"
                value={settings.taxRate}
                onChange={(e) => setSettings({...settings, taxRate: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Shipping Fee (₹)
              </label>
              <input
                type="number"
                value={settings.shippingFee}
                onChange={(e) => setSettings({...settings, shippingFee: Number(e.target.value)})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Enable Notifications</span>
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => setSettings({...settings, notifications: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Email Alerts</span>
                <input
                  type="checkbox"
                  checked={settings.emailAlerts}
                  onChange={(e) => setSettings({...settings, emailAlerts: e.target.checked})}
                  className="rounded"
                />
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-700">Maintenance Mode</span>
                <input
                  type="checkbox"
                  checked={settings.maintenanceMode}
                  onChange={(e) => setSettings({...settings, maintenanceMode: e.target.checked})}
                  className="rounded"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-primary text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2 disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
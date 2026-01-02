"use client"

import * as React from "react"
import { Save } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

export default function SettingsPage() {
  const [settings, setSettings] = React.useState({
    siteName: "ATELIER",
    adminEmail: "admin@atelier.com",
    currency: "USD",
    taxRate: "10",
    shippingFee: "15",
    notifications: true,
    emailAlerts: true,
    maintenanceMode: false
  })

  const handleSave = () => {
    console.log("Settings saved:", settings)
  }

  return (
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
                onChange={(e) => setSettings({...settings, taxRate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Shipping Fee ($)
              </label>
              <input
                type="number"
                value={settings.shippingFee}
                onChange={(e) => setSettings({...settings, shippingFee: e.target.value})}
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
          className="bg-primary text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
        >
          <Save size={16} />
          Save Settings
        </button>
      </div>
    </AdminLayout>
  )
}
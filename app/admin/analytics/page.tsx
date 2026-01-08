"use client"

import * as React from "react"
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

interface AnalyticsData {
  stats: {
    totalRevenue: number
    totalOrders: number
    totalCustomers: number
    totalProducts: number
    avgOrderValue: number
  }
  topProducts: {
    name: string
    sales: number
  }[]
}

export default function AnalyticsPage() {
  const [analyticsData, setAnalyticsData] = React.useState<AnalyticsData | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchAnalyticsData()
  }, [])

  const fetchAnalyticsData = async () => {
    try {
      const response = await fetch('/api/admin/analytics')
      const data = await response.json()
      setAnalyticsData(data)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Analytics Dashboard" subtitle="Track your business performance">
          <div className="flex items-center justify-center h-64">
            <div className="text-gray-600">Loading analytics...</div>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  if (!analyticsData) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Analytics Dashboard" subtitle="Track your business performance">
          <div className="flex items-center justify-center h-64">
            <div className="text-red-600">Failed to load analytics data</div>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  const stats = [
    { 
      title: "Total Revenue", 
      value: `₹${analyticsData.stats.totalRevenue.toLocaleString()}`, 
      change: "+12.5%", 
      icon: DollarSign 
    },
    { 
      title: "Orders", 
      value: analyticsData.stats.totalOrders.toLocaleString(), 
      change: "+8.2%", 
      icon: ShoppingBag 
    },
    { 
      title: "Customers", 
      value: analyticsData.stats.totalCustomers.toLocaleString(), 
      change: "+15.3%", 
      icon: Users 
    },
    { 
      title: "Products", 
      value: analyticsData.stats.totalProducts.toLocaleString(), 
      change: "+2.1%", 
      icon: TrendingUp 
    },
  ]
  return (
    <AdminAuthWrapper>
    <AdminLayout title="Analytics Dashboard" subtitle="Track your business performance">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 border border-border rounded-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-accent/10 rounded-sm">
                <stat.icon size={20} className="text-accent" />
              </div>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              {stat.title}
            </h3>
            <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-serif font-bold text-primary">Sales Overview</h3>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-100 rounded-sm flex items-center justify-center">
              <p className="text-gray-600">Sales Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-serif font-bold text-primary">Revenue Trends</h3>
          </div>
          <div className="p-6">
            <div className="h-64 bg-gray-100 rounded-sm flex items-center justify-center">
              <p className="text-gray-600">Revenue Chart Placeholder</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-serif font-bold text-primary">Top Products</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {analyticsData.topProducts.length > 0 ? (
                analyticsData.topProducts.map((product, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="text-sm font-medium">{product.name}</span>
                    <span className="text-sm text-gray-600">{product.sales} sales</span>
                  </div>
                ))
              ) : (
                <div className="text-sm text-gray-500">No sales data available</div>
              )}
            </div>
          </div>
        </div>

        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border">
            <h3 className="text-lg font-serif font-bold text-primary">Customer Insights</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Customers</span>
                <span className="text-sm text-primary">{analyticsData.stats.totalCustomers}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total Orders</span>
                <span className="text-sm text-blue-600">{analyticsData.stats.totalOrders}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Order Value</span>
                <span className="text-sm text-primary">₹{analyticsData.stats.avgOrderValue}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
"use client"

import * as React from "react"
import { TrendingUp, Users, ShoppingBag, DollarSign } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

const stats = [
  { title: "Total Revenue", value: "$45,231", change: "+12.5%", icon: DollarSign },
  { title: "Orders", value: "1,234", change: "+8.2%", icon: ShoppingBag },
  { title: "Customers", value: "5,678", change: "+15.3%", icon: Users },
  { title: "Growth Rate", value: "23.1%", change: "+2.1%", icon: TrendingUp },
]

export default function AnalyticsPage() {
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
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Minimalist Wool Overcoat</span>
                <span className="text-sm text-gray-600">45 sales</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Silk Blend Evening Shirt</span>
                <span className="text-sm text-gray-600">38 sales</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Structured Cotton Trousers</span>
                <span className="text-sm text-gray-600">32 sales</span>
              </div>
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
                <span className="text-sm font-medium">New Customers</span>
                <span className="text-sm text-green-600">+15.3%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Returning Customers</span>
                <span className="text-sm text-blue-600">68%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Order Value</span>
                <span className="text-sm text-primary">$287</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
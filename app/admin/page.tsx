"use client"

import * as React from "react"
import { User } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const stats = [
  { title: "Total Revenue", value: "$45,231", change: "+12.5%" },
  { title: "Orders", value: "1,234", change: "+8.2%" },
  { title: "Customers", value: "5,678", change: "+15.3%" },
  { title: "Products", value: "156", change: "+2.1%" },
]

const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", email: "john@email.com", amount: "$299", status: "Completed", date: "2024-01-15" },
  { id: "#ORD-002", customer: "Jane Smith", email: "jane@email.com", amount: "$459", status: "Processing", date: "2024-01-14" },
  { id: "#ORD-003", customer: "Mike Johnson", email: "mike@email.com", amount: "$199", status: "Shipped", date: "2024-01-13" },
  { id: "#ORD-004", customer: "Sarah Wilson", email: "sarah@email.com", amount: "$699", status: "Pending", date: "2024-01-12" },
]

export default function AdminDashboard() {
  return (
    <AdminLayout title="Dashboard" subtitle="Welcome back, Admin">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <div key={stat.title} className="bg-white p-6 border border-border rounded-sm">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              {stat.title}
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
              <span className="text-sm text-green-600 font-medium">{stat.change}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Recent Orders</h3>
          <button className="text-xs uppercase tracking-widest font-bold text-accent hover:text-primary">
            View All
          </button>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {recentOrders.slice(0, 4).map((order) => (
              <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                    <User size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-primary">{order.id}</p>
                    <p className="text-sm text-gray-600">{order.customer}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-primary">{order.amount}</p>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    order.status === "Completed" ? "bg-green-100 text-green-800" :
                    order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                    order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                    "bg-yellow-100 text-yellow-800"
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
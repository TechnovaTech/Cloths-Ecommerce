"use client"

import * as React from "react"
import { Filter, Eye, Edit, User } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const orders = [
  { id: "#ORD-001", customer: "John Doe", email: "john@email.com", amount: "$299", status: "Completed", date: "2024-01-15" },
  { id: "#ORD-002", customer: "Jane Smith", email: "jane@email.com", amount: "$459", status: "Processing", date: "2024-01-14" },
  { id: "#ORD-003", customer: "Mike Johnson", email: "mike@email.com", amount: "$199", status: "Shipped", date: "2024-01-13" },
  { id: "#ORD-004", customer: "Sarah Wilson", email: "sarah@email.com", amount: "$699", status: "Pending", date: "2024-01-12" },
  { id: "#ORD-005", customer: "David Brown", email: "david@email.com", amount: "$399", status: "Completed", date: "2024-01-11" },
]

export default function OrdersPage() {
  return (
    <AdminLayout title="Orders Management" subtitle="Track and manage customer orders">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Orders</h2>
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm text-sm hover:bg-gray-50">
            <Filter size={16} />
            Filter Orders
          </button>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Order ID</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Customer</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Amount</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Date</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium text-primary">{order.id}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={14} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.customer}</p>
                          <p className="text-sm text-gray-600">{order.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 font-bold text-primary">{order.amount}</td>
                    <td className="py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "Completed" ? "bg-green-100 text-green-800" :
                        order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                        order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-700">{order.date}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-600 hover:text-primary">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-primary">
                          <Edit size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
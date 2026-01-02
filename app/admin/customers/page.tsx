"use client"

import * as React from "react"
import { Eye, Edit, User } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const customers = [
  { id: 1, name: "John Doe", email: "john@email.com", orders: 12, spent: "$2,340", joined: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@email.com", orders: 8, spent: "$1,890", joined: "2023-08-22" },
  { id: 3, name: "Mike Johnson", email: "mike@email.com", orders: 15, spent: "$3,120", joined: "2023-04-10" },
  { id: 4, name: "Sarah Wilson", email: "sarah@email.com", orders: 6, spent: "$1,450", joined: "2023-09-05" },
  { id: 5, name: "David Brown", email: "david@email.com", orders: 9, spent: "$2,100", joined: "2023-07-18" },
]

export default function CustomersPage() {
  return (
    <AdminLayout title="Customers Management" subtitle="Manage your customer database">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border">
          <h2 className="text-lg font-serif font-bold text-primary">All Customers</h2>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Customer</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Orders</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Total Spent</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Joined</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {customers.map((customer) => (
                  <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={16} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{customer.name}</p>
                          <p className="text-sm text-gray-600">{customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-700">{customer.orders}</td>
                    <td className="py-4 font-bold text-primary">{customer.spent}</td>
                    <td className="py-4 text-gray-700">{customer.joined}</td>
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
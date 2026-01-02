"use client"

import * as React from "react"
import { Plus, Eye, Edit, Trash2, Tag } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const categories = [
  { id: 1, name: "Outerwear", products: 25, status: "Active", created: "2023-01-15" },
  { id: 2, name: "Shirts", products: 42, status: "Active", created: "2023-01-20" },
  { id: 3, name: "Trousers", products: 38, status: "Active", created: "2023-02-10" },
  { id: 4, name: "Knitwear", products: 18, status: "Active", created: "2023-02-15" },
  { id: 5, name: "Accessories", products: 15, status: "Active", created: "2023-03-01" },
  { id: 6, name: "Footwear", products: 12, status: "Active", created: "2023-03-10" },
]

export default function CategoriesPage() {
  return (
    <AdminLayout title="Categories Management" subtitle="Organize your product categories">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Categories</h2>
          <button className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2">
            <Plus size={16} />
            Add Category
          </button>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Category</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Products</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Created</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {categories.map((category) => (
                  <tr key={category.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                          <Tag size={16} className="text-accent" />
                        </div>
                        <p className="font-medium text-primary">{category.name}</p>
                      </div>
                    </td>
                    <td className="py-4 text-gray-700">{category.products}</td>
                    <td className="py-4">
                      <span className="text-xs px-2 py-1 rounded-full bg-green-100 text-green-800">
                        {category.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-700">{category.created}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-1 text-gray-600 hover:text-primary">
                          <Eye size={16} />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-primary">
                          <Edit size={16} />
                        </button>
                        <button className="p-1 text-gray-600 hover:text-red-600">
                          <Trash2 size={16} />
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
"use client"

import * as React from "react"
import { Plus, Eye, Edit, Trash2 } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const products = [
  { id: 1, name: "Minimalist Wool Overcoat", price: "$590", stock: 12, category: "Outerwear", status: "Active" },
  { id: 2, name: "Silk Blend Evening Shirt", price: "$240", stock: 8, category: "Shirts", status: "Active" },
  { id: 3, name: "Structured Cotton Trousers", price: "$320", stock: 15, category: "Trousers", status: "Active" },
  { id: 4, name: "Cashmere Knit Sweater", price: "$450", stock: 5, category: "Knitwear", status: "Low Stock" },
]

export default function ProductsPage() {
  return (
    <AdminLayout title="Products Management" subtitle="Manage your product catalog">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Products</h2>
          <button className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2">
            <Plus size={16} />
            Add Product
          </button>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Product</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Price</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Stock</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Category</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 font-medium text-primary">{product.name}</td>
                    <td className="py-4 text-gray-700">{product.price}</td>
                    <td className="py-4 text-gray-700">{product.stock}</td>
                    <td className="py-4 text-gray-700">{product.category}</td>
                    <td className="py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        product.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {product.status}
                      </span>
                    </td>
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
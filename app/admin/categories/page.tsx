"use client"

import * as React from "react"
import { Plus, Eye, Edit, Trash2, Tag, X } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const categories = [
  { id: 1, name: "Outerwear", products: 25, status: "Active", created: "2023-01-15", description: "Coats, jackets, and outer garments" },
  { id: 2, name: "Shirts", products: 42, status: "Active", created: "2023-01-20", description: "Dress shirts, casual shirts, and blouses" },
  { id: 3, name: "Trousers", products: 38, status: "Active", created: "2023-02-10", description: "Pants, jeans, and formal trousers" },
  { id: 4, name: "Knitwear", products: 18, status: "Active", created: "2023-02-15", description: "Sweaters, cardigans, and knitted items" },
  { id: 5, name: "Accessories", products: 15, status: "Active", created: "2023-03-01", description: "Belts, bags, and fashion accessories" },
  { id: 6, name: "Footwear", products: 12, status: "Active", created: "2023-03-10", description: "Shoes, boots, and sandals" },
]

export default function CategoriesPage() {
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [showViewModal, setShowViewModal] = React.useState(false)
  const [selectedCategory, setSelectedCategory] = React.useState(null)
  const [categoryForm, setCategoryForm] = React.useState({
    name: "",
    description: "",
    status: "Active"
  })

  const handleAddCategory = () => {
    console.log("Adding category:", categoryForm)
    setShowAddModal(false)
    setCategoryForm({ name: "", description: "", status: "Active" })
  }

  const handleEditCategory = (category) => {
    setSelectedCategory(category)
    setCategoryForm({
      name: category.name,
      description: category.description,
      status: category.status
    })
    setShowEditModal(true)
  }

  const handleViewCategory = (category) => {
    setSelectedCategory(category)
    setShowViewModal(true)
  }

  const handleUpdateCategory = () => {
    console.log("Updating category:", categoryForm)
    setShowEditModal(false)
    setSelectedCategory(null)
  }
  return (
    <AdminLayout title="Categories Management" subtitle="Organize your product categories">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Categories</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
          >
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
                        <button 
                          onClick={() => handleViewCategory(category)}
                          className="p-1 text-gray-600 hover:text-primary"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditCategory(category)}
                          className="p-1 text-gray-600 hover:text-primary"
                        >
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

      {/* Add Category Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-lg mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Add New Category</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  placeholder="Enter category name"
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-24"
                  placeholder="Enter category description"
                />
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 smooth-transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddCategory}
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  Add Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Category Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-lg mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Edit Category</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Category Name
                </label>
                <input
                  type="text"
                  value={categoryForm.name}
                  onChange={(e) => setCategoryForm({...categoryForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-24"
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Status
                </label>
                <select
                  value={categoryForm.status}
                  onChange={(e) => setCategoryForm({...categoryForm, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 smooth-transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateCategory}
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  Update Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Category Modal */}
      {showViewModal && selectedCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-lg mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Category Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
                  <Tag size={24} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-xl font-bold text-primary">{selectedCategory.name}</h4>
                  <p className="text-gray-600">{selectedCategory.products} products</p>
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <p className="text-gray-700">{selectedCategory.description}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Status
                  </label>
                  <span className="text-xs px-3 py-1 rounded-full bg-green-100 text-green-800">
                    {selectedCategory.status}
                  </span>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Created
                  </label>
                  <p className="text-gray-700">{selectedCategory.created}</p>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <button
                  onClick={() => setShowViewModal(false)}
                  className="px-6 py-3 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200 smooth-transition"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
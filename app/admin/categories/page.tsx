"use client"

import * as React from "react"
import { Plus, Edit, Trash2, X, Tag, Eye, Search } from "lucide-react"
import { AdminLayout } from '@/components/admin/AdminLayout'
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

export default function CategoriesAdmin() {
  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [showDetailModal, setShowDetailModal] = React.useState(false)
  const [editingCategory, setEditingCategory] = React.useState(null)
  const [viewingCategory, setViewingCategory] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(10)
  const [categoryForm, setCategoryForm] = React.useState({
    name: "",
    description: "",
    status: "active",
    images: []
  })
  
  React.useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (file, index) => {
    if (!file) return
    
    try {
      const reader = new FileReader()
      reader.onload = (e) => {
        const base64 = e.target.result
        const newImages = [...categoryForm.images]
        // Ensure we have enough slots in the array
        while (newImages.length <= index) {
          newImages.push('')
        }
        newImages[index] = base64
        setCategoryForm({...categoryForm, images: newImages})
        console.log('Image added at index', index, ':', base64.substring(0, 50) + '...')
        console.log('Current images array:', newImages)
      }
      reader.readAsDataURL(file)
    } catch (error) {
      console.error('Error processing image:', error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Ensure images array exists and filter out empty values
    const validImages = (categoryForm.images || []).filter(img => img && img.trim() !== '' && img !== 'data:')
    
    // Validate that at least 1 image is required
    if (validImages.length < 1) {
      alert('Please add at least 1 category image before submitting.')
      return
    }
    
    const formData = {
      name: categoryForm.name,
      description: categoryForm.description,
      status: categoryForm.status,
      images: validImages
    }
    
    console.log('Submitting category:', formData)
    console.log('Valid images count:', validImages.length)
    console.log('Images preview:', validImages.map(img => img.substring(0, 50) + '...'))
    
    try {
      const url = editingCategory ? `/api/categories/${editingCategory._id}` : '/api/categories'
      const method = editingCategory ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        const result = await res.json()
        console.log('Server response:', result)
        fetchCategories()
        resetForm()
      } else {
        const errorText = await res.text()
        console.error('Server error:', errorText)
      }
    } catch (error) {
      console.error('Error saving category:', error)
    }
  }

  const handleEdit = (category) => {
    setEditingCategory(category)
    setCategoryForm({
      name: category.name,
      description: category.description,
      status: category.status,
      images: category.images || []
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this category?')) {
      try {
        await fetch(`/api/categories/${id}`, { method: 'DELETE' })
        fetchCategories()
      } catch (error) {
        console.error('Error deleting category:', error)
      }
    }
  }

  const handleViewDetails = (category) => {
    setViewingCategory(category)
    setShowDetailModal(true)
  }

  const resetForm = () => {
    setCategoryForm({
      name: "",
      description: "",
      status: "active",
      images: []
    })
    setEditingCategory(null)
    setShowModal(false)
  }

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCategories = filteredCategories.slice(startIndex, endIndex)

  const handlePageChange = (page) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Categories" subtitle="Loading...">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading categories...</p>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  return (
    <AdminAuthWrapper>
    <AdminLayout title="Categories" subtitle="Manage product categories">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Categories Management</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm w-64"
              />
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
            >
              <Plus size={16} />
              Add Category
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Category</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Description</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Images</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Created</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCategories.map((category) => (
                <tr key={category._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Tag size={16} className="text-accent" />
                      </div>
                      <p className="font-medium text-primary">{category.name}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-700">{category.description}</td>
                  <td className="py-4 px-6">
                    <div className="flex gap-1">
                      {category.images && category.images.length > 0 ? (
                        category.images.slice(0, 2).map((img, idx) => (
                          <img key={idx} src={img} alt="Category" className="w-8 h-8 object-cover rounded" />
                        ))
                      ) : (
                        <span className="text-gray-400 text-sm">No images</span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      category.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {category.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(category.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(category)}
                        className="p-1 text-gray-600 hover:text-blue-600"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(category)}
                        className="p-1 text-gray-600 hover:text-primary"
                        title="Edit Category"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="p-1 text-gray-600 hover:text-red-600"
                        title="Delete Category"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentCategories.length === 0 && searchTerm && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No categories found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-border flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCategories.length)} of {filteredCategories.length} categories
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === page
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-md mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                {editingCategory ? 'Edit Category' : 'Add New Category'}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
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
                  required
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={categoryForm.description}
                  onChange={(e) => setCategoryForm({...categoryForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-20"
                  placeholder="Enter category description"
                  required
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
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Category Images <span className="text-red-500">*</span>
                  <span className="text-xs normal-case text-gray-500 ml-2">(At least 1 image required)</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map((index) => (
                    <div key={index} className={`border-2 border-dashed rounded-sm p-4 text-center hover:border-accent smooth-transition ${
                      index === 0 ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(file, index)
                          }
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-primary file:text-white hover:file:bg-accent"
                      />
                      {index === 0 && (
                        <p className="text-xs text-red-600 mt-1">Required</p>
                      )}
                      {categoryForm.images[index] && (
                        <div className="mt-2">
                          <img src={categoryForm.images[index]} alt="Preview" className="w-16 h-16 object-cover rounded mx-auto" />
                          <p className="text-xs text-gray-500 mt-1">Image {index + 1} loaded</p>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Images uploaded: {categoryForm.images.filter(img => img && img.trim()).length}/2
                  <span className="text-red-600 ml-1">(Minimum 1 required)</span>
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 smooth-transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  {editingCategory ? 'Update Category' : 'Add Category'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {showDetailModal && viewingCategory && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-serif font-bold text-primary">
                Category Details
              </h3>
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Category Name
                  </label>
                  <p className="text-lg font-medium text-primary">{viewingCategory.name}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Status
                  </label>
                  <span className={`inline-block text-sm px-3 py-1 rounded-full ${
                    viewingCategory.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {viewingCategory.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <p className="text-gray-700 leading-relaxed">{viewingCategory.description}</p>
              </div>

              {/* Date */}
              <div className="pt-6 border-t border-gray-200">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Date
                  </label>
                  <p className="text-gray-700">
                    {new Date(viewingCategory.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Category Images ({viewingCategory.images?.length || 0})
                </label>
                {viewingCategory.images && viewingCategory.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {viewingCategory.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Category ${index + 1}`} 
                          className="w-full h-32 object-cover rounded border hover:shadow-lg transition-shadow"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors rounded flex items-center justify-center">
                          <span className="text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                            Image {index + 1}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Tag size={48} className="mx-auto mb-2 opacity-50" />
                    <p>No images available</p>
                  </div>
                )}
              </div>


            </div>
          </div>
        </div>
      )}
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
"use client"

import * as React from "react"
import { Plus, Edit, Trash2, X, Heart, Eye, Search } from "lucide-react"
import { AdminLayout } from '@/components/admin/AdminLayout'
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

export default function ProductsAdmin() {
  const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [showDetailModal, setShowDetailModal] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState(null)
  const [viewingProduct, setViewingProduct] = React.useState(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [productForm, setProductForm] = React.useState({
    name: "",
    description: "",
    price: "",
    category: "",
    stock: "",
    sku: "",
    offerTag: "",
    sizes: [],
    sizeStock: [],
    featured: false,
    images: ["", "", "", ""],
    minStock: "",
    maxStock: "",
    discount: "",
    discountType: "percentage"
  })
  
  React.useEffect(() => {
    fetchProducts()
    fetchCategories()
    
    // Auto-refresh products every 10 seconds to show updated stock
    const interval = setInterval(() => {
      fetchProducts()
    }, 10000)
    
    return () => clearInterval(interval)
  }, [])

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/categories')
      const data = await res.json()
      setCategories(data.filter(cat => cat.status === 'active'))
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products')
      const data = await res.json()
      setProducts(data)
    } catch (error) {
      console.error('Error fetching products:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    // Validate images - require at least 2 images
    const validImages = productForm.images.filter(img => img !== "")
    if (validImages.length < 2) {
      alert('Please add at least 2 product images before submitting.')
      return
    }
    
    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      // Filter out empty sizeStock entries
      const validSizeStock = (productForm.sizeStock || []).filter(item => 
        item.size && item.size.trim() !== ''
      )
      
      const productData = {
        ...productForm,
        price: Number(productForm.price),
        stock: validSizeStock.length > 0 
          ? validSizeStock.reduce((total, item) => total + Number(item.stock || 0), 0)
          : Number(productForm.stock),
        sizeStock: validSizeStock.map(item => ({
          size: item.size.trim(),
          stock: Number(item.stock || 0)
        })),
        minStock: productForm.minStock ? Number(productForm.minStock) : undefined,
        maxStock: productForm.maxStock ? Number(productForm.maxStock) : undefined,
        discount: productForm.discount ? Number(productForm.discount) : 0,
        discountType: productForm.discountType || 'percentage',
        images: productForm.images.filter(img => img !== ""),
        sku: productForm.sku && productForm.sku.trim() !== '' ? productForm.sku.trim() : undefined
      }
      
      console.log('=== ADMIN FORM SUBMIT DEBUG ===');
      console.log('Method:', method);
      console.log('URL:', url);
      console.log('Product form sizeStock:', productForm.sizeStock);
      console.log('Valid sizeStock:', validSizeStock);
      console.log('Final product data sizeStock:', productData.sizeStock);
      console.log('Complete product data:', productData);
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData)
      })

      if (res.ok) {
        const savedProduct = await res.json()
        console.log('Saved product response:', savedProduct)
        alert(editingProduct ? 'Product updated successfully!' : 'Product created successfully!')
        fetchProducts()
        resetForm()
      } else {
        const errorData = await res.json()
        console.error('API Error:', errorData)
        alert(`Error saving product: ${errorData.error || 'Unknown error'}${errorData.details ? ` - ${errorData.details}` : ''}`)
      }
    } catch (error) {
      console.error('Error saving product:', error)
      alert('Error saving product: ' + error.message)
    }
  }

  const handleEdit = (product) => {
    console.log('=== EDIT PRODUCT DEBUG ===');
    console.log('Original product:', product);
    console.log('Product sizeStock:', product.sizeStock);
    
    setEditingProduct(product)
    const productImages = product.images || []
    const paddedImages = [...productImages, "", "", "", ""].slice(0, 4)
    
    // Ensure sizeStock is properly loaded with debugging
    let sizeStock = []
    if (product.sizeStock && Array.isArray(product.sizeStock) && product.sizeStock.length > 0) {
      sizeStock = product.sizeStock.map(item => {
        console.log('Processing sizeStock item:', item);
        return {
          size: String(item.size || ''),
          stock: Number(item.stock) || 0
        }
      })
    }
    
    console.log('Processed sizeStock for form:', sizeStock);
    
    const formData = {
      name: product.name || '',
      description: product.description || '',
      price: String(product.price || ''),
      category: product.category || '',
      stock: String(product.stock || ''),
      sku: product.sku || "",
      offerTag: product.offerTag || "",
      sizes: product.sizes || [],
      sizeStock: sizeStock,
      featured: Boolean(product.featured),
      images: paddedImages,
      minStock: product.minStock ? String(product.minStock) : "",
      maxStock: product.maxStock ? String(product.maxStock) : "",
      discount: product.discount ? String(product.discount) : "",
      discountType: product.discountType || "percentage"
    }
    
    console.log('Final form data:', formData);
    console.log('Form sizeStock:', formData.sizeStock);
    
    setProductForm(formData)
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await fetch(`/api/products/${id}`, { method: 'DELETE' })
        fetchProducts()
      } catch (error) {
        console.error('Error deleting product:', error)
      }
    }
  }

  const toggleFavorite = async (productId, currentFavoriteStatus) => {
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ favorite: !currentFavoriteStatus })
      })
      if (res.ok) {
        fetchProducts()
      }
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  const handleViewDetails = (product) => {
    setViewingProduct(product)
    setShowDetailModal(true)
  }

  const resetForm = () => {
    setProductForm({
      name: "",
      description: "",
      price: "",
      category: "",
      stock: "",
      sku: "",
      offerTag: "",
      sizes: [],
      sizeStock: [],
      featured: false,
      images: ["", "", "", ""],
      minStock: "",
      maxStock: "",
      discount: "",
      discountType: "percentage"
    })
    setEditingProduct(null)
    setShowModal(false)
  }

  const addSizeStock = () => {
    setProductForm({
      ...productForm,
      sizeStock: [...(productForm.sizeStock || []), { size: '', stock: 0 }]
    })
  }

  const removeSizeStock = (index) => {
    const newSizeStock = productForm.sizeStock.filter((_, i) => i !== index)
    setProductForm({ ...productForm, sizeStock: newSizeStock })
  }

  const updateSizeStock = (index, field, value) => {
    const newSizeStock = [...(productForm.sizeStock || [])]
    if (field === 'stock') {
      newSizeStock[index] = { ...newSizeStock[index], [field]: Number(value) || 0 }
    } else {
      newSizeStock[index] = { ...newSizeStock[index], [field]: value }
    }
    setProductForm({ ...productForm, sizeStock: newSizeStock })
  }

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (product.sku && product.sku.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Products" subtitle="Loading...">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading...</p>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  return (
    <AdminAuthWrapper>
    <AdminLayout title="Products" subtitle="Manage your store products">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Products Management</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
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
              Add Product
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Product</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Image</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Price</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Discount</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Stock</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Category</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-primary">{product.name}</p>
                      <p className="text-sm text-gray-600 truncate max-w-xs">{product.description}</p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="w-12 h-12 relative rounded overflow-hidden bg-gray-100">
                      <img
                        src={product.images?.[0] || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = "/placeholder.svg"
                        }}
                      />
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-900 font-semibold">₹{product.price}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {product.discount > 0 ? (
                      <span className="text-black font-bold">
                        {product.discountType === 'percentage' ? `${product.discount}%` : `₹${product.discount}`}
                      </span>
                    ) : (
                      <span className="text-gray-400">No discount</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {product.sizeStock && product.sizeStock.length > 0 ? (
                      <div className="space-y-1">
                        {product.sizeStock.map((sizeItem, idx) => (
                          <div key={idx} className="text-sm font-medium">
                            <span className="font-bold">{sizeItem.size}:</span> {sizeItem.stock}
                          </div>
                        ))}
                        <div className="text-sm text-gray-600 border-t pt-1 font-semibold">
                          Total: {product.stock}
                        </div>
                      </div>
                    ) : (
                      <span className="text-base font-semibold">{product.stock}</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{product.category}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(product)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                        title="View details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(product)}
                        className="p-1 text-gray-600 hover:text-primary"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(product._id)}
                        className="p-1 text-gray-600 hover:text-red-600"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredProducts.length === 0 && searchTerm && (
                <tr>
                  <td colSpan="7" className="py-8 text-center text-gray-500">
                    No products found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productForm.name}
                    onChange={(e) => setProductForm({...productForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Enter product name"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Price
                  </label>
                  <input
                    type="number"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="0.00"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Category
                  </label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({...productForm, category: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    required
                  >
                    <option value="">Select Category</option>
                    {categories.map((category) => (
                      <option key={category._id} value={category.name}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={productForm.description}
                  onChange={(e) => setProductForm({...productForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-24"
                  placeholder="Enter product description"
                  required
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700">
                    Stock Management
                  </label>
                  <button
                    type="button"
                    onClick={addSizeStock}
                    className="bg-primary text-white px-3 py-1 text-xs rounded hover:bg-accent transition-colors"
                  >
                    + Add Size Stock
                  </button>
                </div>
                
                {productForm.sizeStock && productForm.sizeStock.length > 0 ? (
                  <div className="space-y-3 border border-gray-200 rounded-sm p-4 bg-gray-50">
                    <div className="text-sm font-medium text-gray-700 mb-3">
                      Size-wise Stock Configuration:
                    </div>
                    {productForm.sizeStock.map((sizeItem, index) => (
                      <div key={index} className="flex items-center gap-3 bg-white p-3 rounded border">
                        <div className="flex-1">
                          <label className="text-xs text-gray-600 mb-1 block">Size</label>
                          <input
                            type="text"
                            value={sizeItem.size || ''}
                            onChange={(e) => updateSizeStock(index, 'size', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm"
                            placeholder="e.g., S, M, L, XL"
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-600 mb-1 block">Stock Quantity</label>
                          <input
                            type="number"
                            value={sizeItem.stock || 0}
                            onChange={(e) => updateSizeStock(index, 'stock', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm"
                            placeholder="0"
                            min="0"
                          />
                        </div>
                        <button
                          type="button"
                          onClick={() => removeSizeStock(index)}
                          className="text-red-600 hover:text-red-800 p-2 hover:bg-red-50 rounded transition-colors"
                          title="Remove this size"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                    <div className="text-sm font-medium text-primary pt-2 border-t bg-white px-3 py-2 rounded">
                      Total Stock: {productForm.sizeStock.reduce((total, item) => total + (Number(item.stock) || 0), 0)} units
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 rounded-sm">
                    <p className="text-sm text-gray-500 mb-2">
                      No size-wise stock configured
                    </p>
                    <p className="text-xs text-gray-400">
                      Click "Add Size Stock" to manage inventory by sizes
                    </p>
                  </div>
                )}
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Discount Management (Optional)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Discount Value
                    </label>
                    <input
                      type="number"
                      value={productForm.discount}
                      onChange={(e) => setProductForm({...productForm, discount: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm"
                      placeholder="0"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-600 mb-1 block">
                      Discount Type
                    </label>
                    <select
                      value={productForm.discountType}
                      onChange={(e) => setProductForm({...productForm, discountType: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm"
                    >
                      <option value="percentage">Percentage (%)</option>
                      <option value="fixed">Fixed Amount ($)</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Product Images <span className="text-red-500">*</span>
                  <span className="text-xs normal-case text-gray-500 ml-2">(Minimum 2 images required)</span>
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1, 2, 3].map((index) => (
                    <div key={index} className={`border-2 border-dashed rounded-sm p-4 text-center ${
                      index < 2 ? 'border-red-300 bg-red-50' : 'border-gray-300'
                    }`}>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            const reader = new FileReader()
                            reader.onload = (event) => {
                              const base64 = event.target.result
                              const newImages = [...productForm.images]
                              newImages[index] = base64
                              setProductForm({...productForm, images: newImages})
                            }
                            reader.readAsDataURL(file)
                          }
                        }}
                        className="w-full text-sm"
                      />
                      {index < 2 && (
                        <p className="text-xs text-red-600 mt-1">Required</p>
                      )}
                      {productForm.images[index] && (
                        <div className="mt-2">
                          <img src={productForm.images[index]} alt="Preview" className="w-16 h-16 object-cover rounded mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Images uploaded: {productForm.images.filter(img => img !== "").length}/4 
                  <span className="text-red-600">(Minimum 2 required)</span>
                </div>
              </div>

              <div>
                <label className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={productForm.featured}
                    onChange={(e) => setProductForm({...productForm, featured: e.target.checked})}
                    className="w-4 h-4"
                  />
                  <span className="text-xs uppercase tracking-widest font-bold text-gray-700">
                    Featured Product
                  </span>
                </label>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent font-bold"
                >
                  {editingProduct ? 'Update Product' : 'Add Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Product Detail Modal */}
      {showDetailModal && viewingProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-5xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                Product Details - {viewingProduct.name}
              </h3>
              <button 
                onClick={() => setShowDetailModal(false)} 
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Left Column - Images, Discount, Stock */}
                <div className="space-y-6">
                  {/* Product Images */}
                  <div>
                    <h4 className="text-sm font-bold text-gray-700 mb-4 uppercase tracking-widest">Images</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {viewingProduct.images?.filter(img => img).map((img, idx) => (
                        <div key={idx} className="aspect-square bg-gray-100 rounded overflow-hidden shadow-md border hover:shadow-lg transition-shadow">
                          <img 
                            src={img || '/placeholder.svg'} 
                            alt={`${viewingProduct.name} ${idx + 1}`}
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            onError={(e) => e.currentTarget.src = '/placeholder.svg'}
                          />
                        </div>
                      ))}
                      {(!viewingProduct.images || viewingProduct.images.filter(img => img).length === 0) && (
                        <div className="col-span-2 aspect-square bg-gray-200 rounded flex items-center justify-center">
                          <p className="text-gray-500 text-sm">No images available</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Stock Information */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200">
                    <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Stock Information</h4>
                    {viewingProduct.sizeStock && viewingProduct.sizeStock.length > 0 ? (
                      <div className="space-y-3">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <span className="text-sm font-medium text-black mb-2 block">Size-wise Stock</span>
                          <div className="grid grid-cols-2 gap-2">
                            {viewingProduct.sizeStock.map((sizeItem, idx) => (
                              <div key={idx} className="p-2 rounded border border-gray-200 text-center text-sm bg-white">
                                <div className="font-bold text-black">{sizeItem.size}</div>
                                <div className="text-xs text-gray-600">{sizeItem.stock} units</div>
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="bg-black text-white rounded-lg p-3 text-center">
                          <span className="text-xs uppercase tracking-wide text-gray-300 font-medium block mb-1">Total Stock</span>
                          <p className="text-2xl font-bold">{viewingProduct.stock} Units</p>
                        </div>
                      </div>
                    ) : (
                      <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                        <div className="text-3xl font-bold text-black mb-1">{viewingProduct.stock}</div>
                        <div className="text-xs uppercase tracking-wide text-gray-600 font-medium">Total Units</div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Right Column - Basic Info, Description, Offer */}
                <div className="space-y-6">
                  {/* Basic Information */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200">
                    <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Basic Information</h4>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <span className="text-xs uppercase tracking-wide text-gray-600 font-medium block mb-1">Product Name</span>
                        <p className="text-xl font-bold text-black">{viewingProduct.name}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <span className="text-xs uppercase tracking-wide text-gray-600 font-medium block mb-1">Category</span>
                          <p className="text-base font-semibold text-black">{viewingProduct.category}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <span className="text-xs uppercase tracking-wide text-gray-600 font-medium block mb-1">Price</span>
                          <p className="text-xl font-bold text-black">₹{viewingProduct.price}</p>
                        </div>
                      </div>
                      <div className="grid grid-cols-1 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                          <span className="text-xs uppercase tracking-wide text-gray-600 font-medium block mb-1">Status</span>
                          <div className="flex gap-1 mt-1">
                            {viewingProduct.featured && (
                              <span className="bg-black text-white px-2 py-1 rounded text-xs font-medium">
                                ⭐ Featured
                              </span>
                            )}
                            {viewingProduct.favorite && (
                              <span className="bg-gray-800 text-white px-2 py-1 rounded text-xs font-medium">
                                ❤️ Favorite
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <div className="bg-white rounded-lg p-5 border border-gray-200">
                    <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Product Description</h4>
                    <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                      <p className="text-gray-700 leading-relaxed">
                        {viewingProduct.description}
                      </p>
                    </div>
                  </div>

                  {/* Discount Information */}
                  {viewingProduct.discount > 0 && (
                    <div className="bg-white rounded-lg p-5 border border-gray-200">
                      <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Discount & Pricing</h4>
                      <div className="grid grid-cols-3 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                          <span className="text-xs uppercase tracking-wide text-gray-600 font-medium block mb-1">Original</span>
                          <p className="text-lg font-bold text-gray-500 line-through">₹{viewingProduct.price}</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3 text-center border border-gray-200">
                          <span className="text-xs uppercase tracking-wide text-gray-600 font-medium block mb-1">Discount</span>
                          <p className="text-lg font-bold text-black">
                            {viewingProduct.discountType === 'percentage' ? `${viewingProduct.discount}%` : `₹${viewingProduct.discount}`}
                          </p>
                        </div>
                        <div className="bg-black text-white rounded-lg p-3 text-center">
                          <span className="text-xs uppercase tracking-wide text-gray-300 font-medium block mb-1">Final Price</span>
                          <p className="text-lg font-bold text-white">
                            ₹{
                              viewingProduct.discountType === 'percentage' 
                                ? (viewingProduct.price - (viewingProduct.price * viewingProduct.discount / 100)).toFixed(2)
                                : (viewingProduct.price - viewingProduct.discount).toFixed(2)
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Offer Tag */}
                  {viewingProduct.offerTag && (
                    <div className="bg-white rounded-lg p-5 border border-gray-200">
                      <h4 className="text-sm font-bold text-black mb-4 uppercase tracking-wide">Special Offer</h4>
                      <div className="bg-gray-50 rounded-lg p-4 text-center border border-gray-200">
                        <span className="bg-black text-white px-4 py-2 rounded text-base font-bold">
                          🏷️ {viewingProduct.offerTag}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
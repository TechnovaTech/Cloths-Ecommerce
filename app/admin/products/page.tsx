"use client"

import * as React from "react"
import { Plus, Edit, Trash2, X, Heart } from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function ProductsAdmin() {
  const [products, setProducts] = React.useState([])
  const [categories, setCategories] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [editingProduct, setEditingProduct] = React.useState(null)
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
    images: ["", "", "", "", ""],
    minStock: "",
    maxStock: "",
    discount: "",
    discountType: "percentage"
  })
  
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login')
      return
    }
    if (user && user.role === 'admin') {
      fetchProducts()
      fetchCategories()
    }
  }, [user, authLoading, router])

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
    try {
      const url = editingProduct ? `/api/products/${editingProduct._id}` : '/api/products'
      const method = editingProduct ? 'PUT' : 'POST'
      
      // Filter out empty sizeStock entries
      const validSizeStock = (productForm.sizeStock || []).filter(item => 
        item.size && item.size.trim() !== '' && Number(item.stock) >= 0
      )
      
      const productData = {
        ...productForm,
        price: Number(productForm.price),
        stock: validSizeStock.length > 0 
          ? validSizeStock.reduce((total, item) => total + Number(item.stock), 0)
          : Number(productForm.stock),
        sizeStock: validSizeStock.map(item => ({
          size: item.size.trim(),
          stock: Number(item.stock)
        })),
        minStock: productForm.minStock ? Number(productForm.minStock) : undefined,
        maxStock: productForm.maxStock ? Number(productForm.maxStock) : undefined,
        discount: productForm.discount ? Number(productForm.discount) : 0,
        discountType: productForm.discountType || 'percentage',
        images: productForm.images.filter(img => img !== "")
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
        alert('Error saving product: ' + (errorData.error || 'Unknown error'))
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
    const paddedImages = [...productImages, "", "", "", "", ""].slice(0, 5)
    
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
      images: ["", "", "", "", ""],
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

  if (authLoading || loading) {
    return (
      <AdminLayout title="Products" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Products" subtitle="Manage your store products">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Products Management</h3>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Product
          </button>
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
              {products.map((product) => (
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
                  <td className="py-4 px-6 text-gray-700">${product.price}</td>
                  <td className="py-4 px-6 text-gray-700">
                    {product.discount > 0 ? (
                      <span className="text-green-600 font-medium">
                        {product.discountType === 'percentage' ? `${product.discount}%` : `$${product.discount}`}
                      </span>
                    ) : (
                      <span className="text-gray-400">No discount</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {product.sizeStock && product.sizeStock.length > 0 ? (
                      <div className="space-y-1">
                        {product.sizeStock.map((sizeItem, idx) => (
                          <div key={idx} className="text-xs">
                            <span className="font-medium">{sizeItem.size}:</span> {sizeItem.stock}
                          </div>
                        ))}
                        <div className="text-xs text-gray-500 border-t pt-1">
                          Total: {product.stock}
                        </div>
                      </div>
                    ) : (
                      product.stock
                    )}
                  </td>
                  <td className="py-4 px-6 text-gray-700">{product.category}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => toggleFavorite(product._id, product.favorite)}
                        className={`p-1 rounded-full transition-colors ${
                          product.favorite 
                            ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                            : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                        }`}
                        title={product.favorite ? 'Remove from favorites' : 'Add to favorites'}
                      >
                        <Heart size={16} fill={product.favorite ? 'currentColor' : 'none'} />
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
                
                {productForm.sizeStock.length > 0 ? (
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
                            value={sizeItem.size}
                            onChange={(e) => updateSizeStock(index, 'size', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm"
                            placeholder="e.g., S, M, L, XL"
                            required
                          />
                        </div>
                        <div className="flex-1">
                          <label className="text-xs text-gray-600 mb-1 block">Stock Quantity</label>
                          <input
                            type="number"
                            value={sizeItem.stock}
                            onChange={(e) => updateSizeStock(index, 'stock', e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent text-sm"
                            placeholder="0"
                            min="0"
                            required
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
                      Click "Add Size Stock" to manage inventory by sizes, or use the general stock field above
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
                  Product Images
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {[0, 1, 2, 3, 4].map((index) => (
                    <div key={index} className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center">
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
                      {productForm.images[index] && (
                        <div className="mt-2">
                          <img src={productForm.images[index]} alt="Preview" className="w-16 h-16 object-cover rounded mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
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
    </AdminLayout>
  )
}
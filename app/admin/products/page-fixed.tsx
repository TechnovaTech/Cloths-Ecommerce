"use client"

import * as React from "react"
import { Plus, Eye, Edit, Trash2, X, Upload } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const products = [
  { id: 1, name: "Minimalist Wool Overcoat", price: "$590", stock: 12, category: "Outerwear", status: "Active" },
  { id: 2, name: "Silk Blend Evening Shirt", price: "$240", stock: 8, category: "Shirts", status: "Active" },
  { id: 3, name: "Structured Cotton Trousers", price: "$320", stock: 15, category: "Trousers", status: "Active" },
  { id: 4, name: "Cashmere Knit Sweater", price: "$450", stock: 5, category: "Knitwear", status: "Low Stock" },
]

export default function ProductsPage() {
  const [showAddProductModal, setShowAddProductModal] = React.useState(false)
  const [showEditProductModal, setShowEditProductModal] = React.useState(false)
  const [showViewProductModal, setShowViewProductModal] = React.useState(false)
  const [selectedProduct, setSelectedProduct] = React.useState(null)
  const [productForm, setProductForm] = React.useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    status: "Active"
  })

  const handleAddProduct = () => {
    console.log("Adding product:", productForm)
    setShowAddProductModal(false)
    setProductForm({ name: "", price: "", stock: "", category: "", description: "", status: "Active" })
  }

  const handleEditProduct = (product) => {
    setSelectedProduct(product)
    setProductForm({
      name: product.name,
      price: product.price,
      stock: product.stock.toString(),
      category: product.category,
      description: "Product description here",
      status: product.status
    })
    setShowEditProductModal(true)
  }

  const handleViewProduct = (product) => {
    setSelectedProduct(product)
    setShowViewProductModal(true)
  }

  const handleUpdateProduct = () => {
    console.log("Updating product:", productForm)
    setShowEditProductModal(false)
    setSelectedProduct(null)
  }

  return (
    <AdminLayout title="Products Management" subtitle="Manage your product catalog">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Products</h2>
          <button 
            onClick={() => setShowAddProductModal(true)}
            className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
          >
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
                        <button 
                          onClick={() => handleViewProduct(product)}
                          className="p-1 text-gray-600 hover:text-primary"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditProduct(product)}
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

      {/* Add Product Modal */}
      {showAddProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Add New Product</h3>
              <button 
                onClick={() => setShowAddProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
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
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Price
                  </label>
                  <input
                    type="text"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="$0.00"
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="0"
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
                  >
                    <option value="">Select Category</option>
                    <option value="Outerwear">Outerwear</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Knitwear">Knitwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
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
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Product Images
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center hover:border-accent smooth-transition">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                  <input type="file" className="hidden" multiple accept="image/*" />
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddProductModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 smooth-transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleAddProduct}
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  Add Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Product Modal */}
      {showEditProductModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Edit Product</h3>
              <button 
                onClick={() => setShowEditProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
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
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Price
                  </label>
                  <input
                    type="text"
                    value={productForm.price}
                    onChange={(e) => setProductForm({...productForm, price: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Stock Quantity
                  </label>
                  <input
                    type="number"
                    value={productForm.stock}
                    onChange={(e) => setProductForm({...productForm, stock: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
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
                  >
                    <option value="Outerwear">Outerwear</option>
                    <option value="Shirts">Shirts</option>
                    <option value="Trousers">Trousers</option>
                    <option value="Knitwear">Knitwear</option>
                    <option value="Accessories">Accessories</option>
                    <option value="Footwear">Footwear</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Status
                </label>
                <select
                  value={productForm.status}
                  onChange={(e) => setProductForm({...productForm, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Low Stock">Low Stock</option>
                </select>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowEditProductModal(false)}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 smooth-transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdateProduct}
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  Update Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Product Modal */}
      {showViewProductModal && selectedProduct && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Product Details</h3>
              <button 
                onClick={() => setShowViewProductModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Product Name
                  </label>
                  <p className="text-lg font-medium text-primary">{selectedProduct.name}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Price
                  </label>
                  <p className="text-lg font-bold text-primary">{selectedProduct.price}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Stock Quantity
                  </label>
                  <p className="text-lg text-gray-700">{selectedProduct.stock}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Category
                  </label>
                  <p className="text-lg text-gray-700">{selectedProduct.category}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Status
                  </label>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    selectedProduct.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {selectedProduct.status}
                  </span>
                </div>
              </div>
              
              <div className="pt-6 border-t border-border">
                <button
                  onClick={() => setShowViewProductModal(false)}
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
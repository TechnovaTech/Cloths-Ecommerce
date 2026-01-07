"use client"

import * as React from "react"
import { Plus, Edit, Trash2, X, Eye, Search } from "lucide-react"
import { AdminLayout } from '@/components/admin/AdminLayout'
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

interface Product {
  _id: string
  name: string
  price: number
  images: string[]
}

interface Collection {
  _id: string
  name: string
  description: string
  products: string[]
  images: string[]
  status: string
  createdAt: string
}

export default function CollectionsAdmin() {
  const [collections, setCollections] = React.useState<Collection[]>([])
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [showDetailModal, setShowDetailModal] = React.useState(false)
  const [editingCollection, setEditingCollection] = React.useState<Collection | null>(null)
  const [viewingCollection, setViewingCollection] = React.useState<Collection | null>(null)
  const [searchTerm, setSearchTerm] = React.useState("")
  const [collectionForm, setCollectionForm] = React.useState({
    name: "",
    description: "",
    products: [] as string[],
    images: ["", ""],
    status: "active"
  })
  
  React.useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [collectionsRes, productsRes] = await Promise.all([
        fetch('/api/collections'),
        fetch('/api/products')
      ])
      
      if (collectionsRes.ok) {
        const collectionsData = await collectionsRes.json()
        setCollections(collectionsData)
      }
      
      if (productsRes.ok) {
        const productsData = await productsRes.json()
        setProducts(productsData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    // Validate that at least 1 image is required
    const validImages = collectionForm.images.filter(img => img && img.trim() !== '')
    if (validImages.length < 1) {
      alert('Please add at least 1 collection image before submitting.')
      return
    }
    
    const formData = {
      name: collectionForm.name,
      description: collectionForm.description,
      products: collectionForm.products,
      images: validImages,
      status: collectionForm.status
    }
    
    try {
      const url = editingCollection ? `/api/collections/${editingCollection._id}` : '/api/collections'
      const method = editingCollection ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        fetchData()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving collection:', error)
    }
  }

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection)
    setCollectionForm({
      name: collection.name,
      description: collection.description,
      products: collection.products || [],
      images: [...(collection.images || []), "", ""].slice(0, 2),
      status: collection.status
    })
    setShowModal(true)
  }

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      try {
        await fetch(`/api/collections/${id}`, { method: 'DELETE' })
        fetchData()
      } catch (error) {
        console.error('Error deleting collection:', error)
      }
    }
  }

  const resetForm = () => {
    setCollectionForm({
      name: "",
      description: "",
      products: [],
      images: ["", ""],
      status: "active"
    })
    setEditingCollection(null)
    setShowModal(false)
  }

  const toggleProduct = (productId: string) => {
    const newProducts = collectionForm.products.includes(productId)
      ? collectionForm.products.filter(id => id !== productId)
      : [...collectionForm.products, productId]
    
    setCollectionForm({...collectionForm, products: newProducts})
  }

  const getProductsByIds = (productIds: string[]) => {
    return products.filter(product => productIds.includes(product._id))
  }

  const handleImageUpload = async (file: File, index: number) => {
    if (!file) return
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const data = await response.json()
        const newImages = [...collectionForm.images]
        newImages[index] = data.imageUrl
        setCollectionForm({...collectionForm, images: newImages})
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleViewDetails = (collection: Collection) => {
    setViewingCollection(collection)
    setShowDetailModal(true)
  }

  const filteredCollections = collections.filter(collection =>
    collection.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    collection.status.toLowerCase().includes(searchTerm.toLowerCase())
  )

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Collections" subtitle="Loading...">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading collections...</p>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  return (
    <AdminAuthWrapper>
    <AdminLayout title="Collections" subtitle="Manage product collections">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Collections Management</h3>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search collections..."
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
              Add Collection
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Collection</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Products</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Created</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCollections.map((collection) => (
                <tr key={collection._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-3">
                      <img 
                        src={collection.images?.[0] || "/placeholder.svg"} 
                        alt={collection.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-primary">{collection.name}</p>
                        <p className="text-sm text-gray-600 truncate max-w-xs">{collection.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex gap-1">
                      {getProductsByIds(collection.products || []).slice(0, 3).map((product) => (
                        <img 
                          key={product._id} 
                          src={product.images?.[0] || "/placeholder.svg"} 
                          alt={product.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                      ))}
                      {collection.products && collection.products.length > 3 && (
                        <span className="text-xs text-gray-500">+{collection.products.length - 3}</span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{collection.products?.length || 0} products</p>
                  </td>
                  <td className="py-4 px-6">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      collection.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {collection.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-gray-700">
                    {new Date(collection.createdAt).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleViewDetails(collection)}
                        className="p-1 text-gray-600 hover:text-blue-600"
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      <button
                        onClick={() => handleEdit(collection)}
                        className="p-1 text-gray-600 hover:text-primary"
                        title="Edit Collection"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(collection._id)}
                        className="p-1 text-gray-600 hover:text-red-600"
                        title="Delete Collection"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredCollections.length === 0 && searchTerm && (
                <tr>
                  <td colSpan="5" className="py-8 text-center text-gray-500">
                    No collections found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                {editingCollection ? 'Edit Collection' : 'Add New Collection'}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Collection Name
                  </label>
                  <input
                    type="text"
                    value={collectionForm.name}
                    onChange={(e) => setCollectionForm({...collectionForm, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Enter collection name"
                    required
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Status
                  </label>
                  <select
                    value={collectionForm.status}
                    onChange={(e) => setCollectionForm({...collectionForm, status: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={collectionForm.description}
                  onChange={(e) => setCollectionForm({...collectionForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-20"
                  placeholder="Enter collection description"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Collection Images <span className="text-red-500">*</span>
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
                      {collectionForm.images[index] && (
                        <div className="mt-2">
                          <img src={collectionForm.images[index]} alt="Preview" className="w-16 h-16 object-cover rounded mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="mt-2 text-xs text-gray-600">
                  Images uploaded: {collectionForm.images.filter(img => img && img.trim() !== '').length}/2
                  <span className="text-red-600 ml-1">(Minimum 1 required)</span>
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Select Products ({collectionForm.products.length} selected)
                </label>
                <div className="border border-gray-300 rounded-sm max-h-60 overflow-y-auto">
                  {products.map((product) => (
                    <div key={product._id} className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50">
                      <input
                        type="checkbox"
                        checked={collectionForm.products.includes(product._id)}
                        onChange={() => toggleProduct(product._id)}
                        className="w-4 h-4 mr-3"
                      />
                      <img 
                        src={product.images?.[0] || "/placeholder.svg"} 
                        alt={product.name}
                        className="w-12 h-12 object-cover rounded mr-3"
                      />
                      <div className="flex-grow">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-gray-500">${product.price}</p>
                      </div>
                    </div>
                  ))}
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
                  {editingCollection ? 'Update Collection' : 'Add Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Detail View Modal */}
      {showDetailModal && viewingCollection && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between sticky top-0 bg-white">
              <h3 className="text-lg font-serif font-bold text-primary">
                Collection Details - {viewingCollection.name}
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
                    Collection Name
                  </label>
                  <p className="text-lg font-medium text-primary">{viewingCollection.name}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Status
                  </label>
                  <span className={`inline-block text-sm px-3 py-1 rounded-full ${
                    viewingCollection.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {viewingCollection.status}
                  </span>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <p className="text-gray-700 leading-relaxed">{viewingCollection.description}</p>
              </div>

              {/* Date */}
              <div className="pt-6 border-t border-gray-200">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Date
                  </label>
                  <p className="text-gray-700">
                    {new Date(viewingCollection.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                </div>
              </div>

              {/* Collection Images */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Collection Images ({viewingCollection.images?.length || 0})
                </label>
                {viewingCollection.images && viewingCollection.images.length > 0 ? (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {viewingCollection.images.map((image, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={image} 
                          alt={`Collection ${index + 1}`} 
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
                    <p>No images available</p>
                  </div>
                )}
              </div>

              {/* Products in Collection */}
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Products in Collection ({viewingCollection.products?.length || 0})
                </label>
                {viewingCollection.products && viewingCollection.products.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {getProductsByIds(viewingCollection.products).map((product) => (
                      <div key={product._id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3">
                          <img 
                            src={product.images?.[0] || "/placeholder.svg"} 
                            alt={product.name}
                            className="w-16 h-16 object-cover rounded"
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 text-sm">{product.name}</h4>
                            <p className="text-sm text-gray-600">₹{product.price}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <p>No products in this collection</p>
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
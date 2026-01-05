"use client"

import * as React from "react"
import { Plus, Edit, Trash2, X } from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { AdminLayout } from '@/components/admin/AdminLayout'

export default function BannersAdmin() {
  const [banners, setBanners] = React.useState([])
  const [loading, setLoading] = React.useState(true)
  const [showModal, setShowModal] = React.useState(false)
  const [editingBanner, setEditingBanner] = React.useState(null)
  const [bannerForm, setBannerForm] = React.useState({
    title: "",
    subtitle: "",
    description: "",
    image: "",
    imageType: "url",
    buttonText: "Shop Now",
    buttonLink: "/shop",
    position: 0,
    status: "active"
  })
  
  const { user, loading: authLoading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!authLoading && (!user || user.role !== 'admin')) {
      router.push('/login')
      return
    }
    if (user && user.role === 'admin') {
      fetchBanners()
    }
  }, [user, authLoading, router])

  const fetchBanners = async () => {
    try {
      const res = await fetch('/api/banners')
      const data = await res.json()
      setBanners(data)
    } catch (error) {
      console.error('Error fetching banners:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const url = editingBanner ? `/api/banners/${editingBanner._id}` : '/api/banners'
      const method = editingBanner ? 'PUT' : 'POST'
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...bannerForm,
          position: Number(bannerForm.position)
        })
      })

      if (res.ok) {
        fetchBanners()
        resetForm()
      }
    } catch (error) {
      console.error('Error saving banner:', error)
    }
  }

  const handleEdit = (banner) => {
    setEditingBanner(banner)
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle || "",
      description: banner.description || "",
      image: banner.image,
      imageType: "url",
      buttonText: banner.buttonText,
      buttonLink: banner.buttonLink,
      position: banner.position,
      status: banner.status
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this banner?')) {
      try {
        await fetch(`/api/banners/${id}`, { method: 'DELETE' })
        fetchBanners()
      } catch (error) {
        console.error('Error deleting banner:', error)
      }
    }
  }

  const resetForm = () => {
    setBannerForm({
      title: "",
      subtitle: "",
      description: "",
      image: "",
      imageType: "url",
      buttonText: "Shop Now",
      buttonLink: "/shop",
      position: 0,
      status: "active"
    })
    setEditingBanner(null)
    setShowModal(false)
  }

  if (authLoading) {
    return (
      <AdminLayout title="Banners" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Checking authentication...</p>
        </div>
      </AdminLayout>
    )
  }

  if (loading) {
    return (
      <AdminLayout title="Banners" subtitle="Loading...">
        <div className="flex items-center justify-center h-64">
          <p className="text-gray-500">Loading banners...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout title="Banners" subtitle="Manage homepage banners">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h3 className="text-lg font-serif font-bold text-primary">Banners Management</h3>
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Banner
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Banner</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {banners.map((banner) => (
                <tr key={banner._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-10 relative rounded overflow-hidden bg-gray-100">
                        <img
                          src={banner.image || "/placeholder.svg"}
                          alt={banner.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-primary">{banner.title}</p>
                        <p className="text-sm text-gray-600">{banner.subtitle}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleEdit(banner)}
                        className="p-1 text-gray-600 hover:text-primary"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(banner._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                {editingBanner ? 'Edit Banner' : 'Add New Banner'}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Title
                </label>
                <input
                  type="text"
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  placeholder="Banner title"
                  required
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Subtitle
                </label>
                <input
                  type="text"
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({...bannerForm, subtitle: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  placeholder="Banner subtitle"
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Banner Image
                </label>
                <div className="space-y-3">
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="imageType"
                        value="url"
                        checked={bannerForm.imageType === 'url'}
                        onChange={(e) => setBannerForm({...bannerForm, imageType: e.target.value})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Image URL</span>
                    </label>
                    <label className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="imageType"
                        value="file"
                        checked={bannerForm.imageType === 'file'}
                        onChange={(e) => setBannerForm({...bannerForm, imageType: e.target.value})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm">Upload File</span>
                    </label>
                  </div>
                  
                  {bannerForm.imageType === 'url' ? (
                    <input
                      type="text"
                      value={bannerForm.image}
                      onChange={(e) => setBannerForm({...bannerForm, image: e.target.value})}
                      className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                      placeholder="https://example.com/banner.jpg"
                      required
                    />
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center hover:border-accent smooth-transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            setBannerForm({...bannerForm, image: file.name})
                          }
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-primary file:text-white hover:file:bg-accent"
                        required
                      />
                      <p className="text-xs text-gray-500 mt-2">Choose an image file</p>
                    </div>
                  )}
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
                  {editingBanner ? 'Update Banner' : 'Add Banner'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  )
}
"use client"

import * as React from "react"
import { Plus, Eye, Edit, Trash2, X, Upload, Image } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"

const banners = [
  { 
    id: 1, 
    title: "Summer Collection 2024", 
    subtitle: "Discover the latest trends", 
    status: "Active", 
    position: "Hero", 
    created: "2024-01-15",
    image: "/images/banner1.jpg",
    link: "/collections/summer"
  },
  { 
    id: 2, 
    title: "Winter Sale", 
    subtitle: "Up to 50% off selected items", 
    status: "Active", 
    position: "Secondary", 
    created: "2024-01-20",
    image: "/images/banner2.jpg",
    link: "/sale/winter"
  },
  { 
    id: 3, 
    title: "New Arrivals", 
    subtitle: "Fresh styles for the season", 
    status: "Inactive", 
    position: "Sidebar", 
    created: "2024-02-01",
    image: "/images/banner3.jpg",
    link: "/collections/new"
  },
]

export default function BannersPage() {
  const [showAddModal, setShowAddModal] = React.useState(false)
  const [showEditModal, setShowEditModal] = React.useState(false)
  const [showViewModal, setShowViewModal] = React.useState(false)
  const [selectedBanner, setSelectedBanner] = React.useState(null)
  const [bannerForm, setBannerForm] = React.useState({
    title: "",
    subtitle: "",
    position: "Hero",
    link: "",
    status: "Active"
  })

  const handleAddBanner = () => {
    console.log("Adding banner:", bannerForm)
    setShowAddModal(false)
    setBannerForm({ title: "", subtitle: "", position: "Hero", link: "", status: "Active" })
  }

  const handleEditBanner = (banner) => {
    setSelectedBanner(banner)
    setBannerForm({
      title: banner.title,
      subtitle: banner.subtitle,
      position: banner.position,
      link: banner.link,
      status: banner.status
    })
    setShowEditModal(true)
  }

  const handleViewBanner = (banner) => {
    setSelectedBanner(banner)
    setShowViewModal(true)
  }

  const handleUpdateBanner = () => {
    console.log("Updating banner:", bannerForm)
    setShowEditModal(false)
    setSelectedBanner(null)
  }

  return (
    <AdminLayout title="Banners Management" subtitle="Manage website banners and promotions">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Banners</h2>
          <button 
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
          >
            <Plus size={16} />
            Add Banner
          </button>
        </div>
        
        <div className="p-6">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Banner</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Position</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Created</th>
                  <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner) => (
                  <tr key={banner.id} className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-12 bg-gray-100 rounded-sm flex items-center justify-center">
                          <Image size={20} className="text-gray-400" />
                        </div>
                        <div>
                          <p className="font-medium text-primary">{banner.title}</p>
                          <p className="text-sm text-gray-600">{banner.subtitle}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-700">{banner.position}</td>
                    <td className="py-4">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        banner.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}>
                        {banner.status}
                      </span>
                    </td>
                    <td className="py-4 text-gray-700">{banner.created}</td>
                    <td className="py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleViewBanner(banner)}
                          className="p-1 text-gray-600 hover:text-primary"
                        >
                          <Eye size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditBanner(banner)}
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

      {/* Add Banner Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Add New Banner</h3>
              <button 
                onClick={() => setShowAddModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="Enter banner title"
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
                    placeholder="Enter subtitle"
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Position
                  </label>
                  <select
                    value={bannerForm.position}
                    onChange={(e) => setBannerForm({...bannerForm, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  >
                    <option value="Hero">Hero</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Sidebar">Sidebar</option>
                    <option value="Footer">Footer</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={bannerForm.link}
                    onChange={(e) => setBannerForm({...bannerForm, link: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                    placeholder="/collections/summer"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Banner Image
                </label>
                <div className="border-2 border-dashed border-gray-300 rounded-sm p-8 text-center hover:border-accent smooth-transition">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="text-gray-600 mb-2">Click to upload banner image</p>
                  <p className="text-xs text-gray-500">PNG, JPG up to 5MB (Recommended: 1920x600px)</p>
                  <input type="file" className="hidden" accept="image/*" />
                </div>
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
                  onClick={handleAddBanner}
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  Add Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Banner Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Edit Banner</h3>
              <button 
                onClick={() => setShowEditModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <form className="p-6 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Banner Title
                  </label>
                  <input
                    type="text"
                    value={bannerForm.title}
                    onChange={(e) => setBannerForm({...bannerForm, title: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
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
                  />
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Position
                  </label>
                  <select
                    value={bannerForm.position}
                    onChange={(e) => setBannerForm({...bannerForm, position: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  >
                    <option value="Hero">Hero</option>
                    <option value="Secondary">Secondary</option>
                    <option value="Sidebar">Sidebar</option>
                    <option value="Footer">Footer</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Link URL
                  </label>
                  <input
                    type="text"
                    value={bannerForm.link}
                    onChange={(e) => setBannerForm({...bannerForm, link: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  />
                </div>
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Status
                </label>
                <select
                  value={bannerForm.status}
                  onChange={(e) => setBannerForm({...bannerForm, status: e.target.value})}
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
                  onClick={handleUpdateBanner}
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  Update Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Banner Modal */}
      {showViewModal && selectedBanner && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-2xl mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Banner Details</h3>
              <button 
                onClick={() => setShowViewModal(false)}
                className="p-2 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6 space-y-6">
              <div className="w-full h-48 bg-gray-100 rounded-sm flex items-center justify-center mb-6">
                <Image size={48} className="text-gray-400" />
                <span className="ml-2 text-gray-500">Banner Preview</span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Title
                  </label>
                  <p className="text-lg font-medium text-primary">{selectedBanner.title}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Subtitle
                  </label>
                  <p className="text-lg text-gray-700">{selectedBanner.subtitle}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Position
                  </label>
                  <p className="text-lg text-gray-700">{selectedBanner.position}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Link
                  </label>
                  <p className="text-lg text-blue-600">{selectedBanner.link}</p>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Status
                  </label>
                  <span className={`text-xs px-3 py-1 rounded-full ${
                    selectedBanner.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}>
                    {selectedBanner.status}
                  </span>
                </div>
                
                <div>
                  <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                    Created
                  </label>
                  <p className="text-lg text-gray-700">{selectedBanner.created}</p>
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
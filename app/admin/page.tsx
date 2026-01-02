"use client"

import * as React from "react"
import Link from "next/link"
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Plus,
  Search,
  Bell,
  User,
  LogOut,
  Edit,
  Trash2,
  Eye,
  Filter,
  Tag,
  X,
  Upload
} from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

const sidebarItems = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Package, label: "Products", count: 156 },
  { icon: Tag, label: "Categories", count: 8 },
  { icon: ShoppingCart, label: "Orders", count: 23 },
  { icon: Users, label: "Customers", count: 1240 },
  { icon: BarChart3, label: "Analytics" },
  { icon: Settings, label: "Settings" },
]

const stats = [
  { title: "Total Revenue", value: "$45,231", change: "+12.5%" },
  { title: "Orders", value: "1,234", change: "+8.2%" },
  { title: "Customers", value: "5,678", change: "+15.3%" },
  { title: "Products", value: "156", change: "+2.1%" },
]

const recentOrders = [
  { id: "#ORD-001", customer: "John Doe", email: "john@email.com", amount: "$299", status: "Completed", date: "2024-01-15" },
  { id: "#ORD-002", customer: "Jane Smith", email: "jane@email.com", amount: "$459", status: "Processing", date: "2024-01-14" },
  { id: "#ORD-003", customer: "Mike Johnson", email: "mike@email.com", amount: "$199", status: "Shipped", date: "2024-01-13" },
  { id: "#ORD-004", customer: "Sarah Wilson", email: "sarah@email.com", amount: "$699", status: "Pending", date: "2024-01-12" },
]

const products = [
  { id: 1, name: "Minimalist Wool Overcoat", price: "$590", stock: 12, category: "Outerwear", status: "Active" },
  { id: 2, name: "Silk Blend Evening Shirt", price: "$240", stock: 8, category: "Shirts", status: "Active" },
  { id: 3, name: "Structured Cotton Trousers", price: "$320", stock: 15, category: "Trousers", status: "Active" },
  { id: 4, name: "Cashmere Knit Sweater", price: "$450", stock: 5, category: "Knitwear", status: "Low Stock" },
]

const customers = [
  { id: 1, name: "John Doe", email: "john@email.com", orders: 12, spent: "$2,340", joined: "2023-06-15" },
  { id: 2, name: "Jane Smith", email: "jane@email.com", orders: 8, spent: "$1,890", joined: "2023-08-22" },
  { id: 3, name: "Mike Johnson", email: "mike@email.com", orders: 15, spent: "$3,120", joined: "2023-04-10" },
  { id: 4, name: "Sarah Wilson", email: "sarah@email.com", orders: 6, spent: "$1,450", joined: "2023-09-05" },
]

const categories = [
  { id: 1, name: "Outerwear", products: 25, status: "Active", created: "2023-01-15" },
  { id: 2, name: "Shirts", products: 42, status: "Active", created: "2023-01-20" },
  { id: 3, name: "Trousers", products: 38, status: "Active", created: "2023-02-10" },
  { id: 4, name: "Knitwear", products: 18, status: "Active", created: "2023-02-15" },
  { id: 5, name: "Accessories", products: 15, status: "Active", created: "2023-03-01" },
  { id: 6, name: "Footwear", products: 12, status: "Active", created: "2023-03-10" },
]

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = React.useState("Dashboard")
  const [siteName, setSiteName] = React.useState("ATELIER")
  const [adminEmail, setAdminEmail] = React.useState("admin@atelier.com")
  const [showAddProductModal, setShowAddProductModal] = React.useState(false)
  const [showAddCategoryModal, setShowAddCategoryModal] = React.useState(false)
  const [productForm, setProductForm] = React.useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    status: "Active"
  })
  const [categoryForm, setCategoryForm] = React.useState({
    name: "",
    description: "",
    status: "Active"
  })
  
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  React.useEffect(() => {
    if (!loading && (!user || user.role !== 'admin')) {
      router.push('/login')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-serif font-bold text-primary mb-2">ATELIER</h1>
          <p className="text-xs uppercase tracking-widest text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== 'admin') {
    return null
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const handleAddProduct = () => {
    console.log("Adding product:", productForm)
    setShowAddProductModal(false)
    setProductForm({ name: "", price: "", stock: "", category: "", description: "", status: "Active" })
  }

  const handleAddCategory = () => {
    console.log("Adding category:", categoryForm)
    setShowAddCategoryModal(false)
    setCategoryForm({ name: "", description: "", status: "Active" })
  }
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <h1 className="text-2xl font-serif font-bold text-primary">ATELIER</h1>
          <p className="text-xs uppercase tracking-widest text-gray-600 mt-1">Admin Panel</p>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link href="/admin/products" className="w-full flex items-center justify-between p-3 rounded-sm text-left smooth-transition text-gray-700 hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Package size={18} />
              <span className="text-sm font-medium">Products</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-white">156</span>
          </Link>
          
          <Link href="/admin/categories" className="w-full flex items-center justify-between p-3 rounded-sm text-left smooth-transition text-gray-700 hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Tag size={18} />
              <span className="text-sm font-medium">Categories</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-white">8</span>
          </Link>
          
          <Link href="/admin/orders" className="w-full flex items-center justify-between p-3 rounded-sm text-left smooth-transition text-gray-700 hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <ShoppingCart size={18} />
              <span className="text-sm font-medium">Orders</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-white">23</span>
          </Link>
          
          <Link href="/admin/customers" className="w-full flex items-center justify-between p-3 rounded-sm text-left smooth-transition text-gray-700 hover:bg-gray-100">
            <div className="flex items-center gap-3">
              <Users size={18} />
              <span className="text-sm font-medium">Customers</span>
            </div>
            <span className="text-xs px-2 py-1 rounded-full bg-accent text-white">1240</span>
          </Link>
          
          <Link href="/admin/analytics" className="w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition text-gray-700 hover:bg-gray-100">
            <BarChart3 size={18} />
            <span className="text-sm font-medium">Analytics</span>
          </Link>
          
          <Link href="/admin/settings" className="w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition text-gray-700 hover:bg-gray-100">
            <Settings size={18} />
            <span className="text-sm font-medium">Settings</span>
          </Link>
        </nav>
        
        <div className="p-4 border-t border-border">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 p-3 text-red-600 hover:bg-red-50 rounded-sm smooth-transition"
          >
            <LogOut size={18} />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-border p-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-serif font-bold text-primary">{activeTab}</h2>
            <p className="text-sm text-gray-600">Welcome back, {user.name}</p>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
              />
            </div>
            <button className="p-2 text-gray-600 hover:text-primary relative">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            <button className="p-2 text-gray-600 hover:text-primary">
              <User size={20} />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="flex-1 p-6 overflow-auto">
          {activeTab === "Dashboard" && (
            <div className="space-y-6">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                  <div key={stat.title} className="bg-white p-6 border border-border rounded-sm">
                    <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
                      {stat.title}
                    </h3>
                    <div className="flex items-end justify-between">
                      <p className="text-2xl font-serif font-bold text-primary">{stat.value}</p>
                      <span className="text-sm text-green-600 font-medium">{stat.change}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Recent Orders */}
              <div className="bg-white border border-border rounded-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-primary">Recent Orders</h3>
                  <button className="text-xs uppercase tracking-widest font-bold text-accent hover:text-primary">
                    View All
                  </button>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {recentOrders.slice(0, 4).map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-primary">{order.id}</p>
                            <p className="text-sm text-gray-600">{order.customer}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-primary">{order.amount}</p>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === "Completed" ? "bg-green-100 text-green-800" :
                            order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                            order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                            "bg-yellow-100 text-yellow-800"
                          }`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Products" && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-primary">Products Management</h3>
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
            </div>
          )}

          {/* Add other tabs content here - Categories, Orders, Customers, Analytics, Settings */}
          {activeTab !== "Dashboard" && activeTab !== "Products" && (
            <div className="bg-white border border-border rounded-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-serif font-bold text-primary">{activeTab} Management</h3>
              </div>
              <div className="p-6">
                <p className="text-center text-gray-500">{activeTab} section coming soon...</p>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
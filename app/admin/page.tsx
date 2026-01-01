"use client"

import * as React from "react"
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
  const [isLoggedIn, setIsLoggedIn] = React.useState(true) // Set to false for login flow
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

  const handleLogout = () => {
    setIsLoggedIn(false)
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

  // Login Component
  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-6">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-serif font-bold text-primary mb-2">ATELIER</h1>
            <p className="text-xs uppercase tracking-widest text-gray-600">Admin Login</p>
          </div>
          
          <form className="bg-white p-8 border border-border rounded-sm space-y-6">
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                placeholder="admin@atelier.com"
              />
            </div>
            
            <div>
              <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                Password
              </label>
              <input
                type="password"
                className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                placeholder="Enter password"
              />
            </div>
            
            <button
              type="button"
              onClick={() => setIsLoggedIn(true)}
              className="w-full bg-primary text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition"
            >
              Sign In to Admin Panel
            </button>
          </form>
        </div>
      </div>
    )
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
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.label)}
              className={`w-full flex items-center justify-between p-3 rounded-sm text-left smooth-transition ${
                activeTab === item.label
                  ? "bg-primary text-white"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              <div className="flex items-center gap-3">
                <item.icon size={18} />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
              {item.count && (
                <span className={`text-xs px-2 py-1 rounded-full ${
                  activeTab === item.label ? "bg-white/20" : "bg-accent text-white"
                }`}>
                  {item.count}
                </span>
              )}
            </button>
          ))}
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
            <p className="text-sm text-gray-600">Welcome back, Admin</p>
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

          {activeTab === "Categories" && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-primary">Categories Management</h3>
                  <button 
                    onClick={() => setShowAddCategoryModal(true)}
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
                                <div>
                                  <p className="font-medium text-primary">{category.name}</p>
                                </div>
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

          {activeTab === "Orders" && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-sm">
                <div className="p-6 border-b border-border flex items-center justify-between">
                  <h3 className="text-lg font-serif font-bold text-primary">Orders Management</h3>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-sm text-sm hover:bg-gray-50">
                    <Filter size={16} />
                    Filter
                  </button>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Order ID</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Customer</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Amount</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Date</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4 font-medium text-primary">{order.id}</td>
                            <td className="py-4">
                              <div>
                                <p className="font-medium text-gray-900">{order.customer}</p>
                                <p className="text-sm text-gray-600">{order.email}</p>
                              </div>
                            </td>
                            <td className="py-4 font-bold text-primary">{order.amount}</td>
                            <td className="py-4">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                order.status === "Completed" ? "bg-green-100 text-green-800" :
                                order.status === "Processing" ? "bg-blue-100 text-blue-800" :
                                order.status === "Shipped" ? "bg-purple-100 text-purple-800" :
                                "bg-yellow-100 text-yellow-800"
                              }`}>
                                {order.status}
                              </span>
                            </td>
                            <td className="py-4 text-gray-700">{order.date}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-gray-600 hover:text-primary">
                                  <Eye size={16} />
                                </button>
                                <button className="p-1 text-gray-600 hover:text-primary">
                                  <Edit size={16} />
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

          {activeTab === "Customers" && (
            <div className="space-y-6">
              <div className="bg-white border border-border rounded-sm">
                <div className="p-6 border-b border-border">
                  <h3 className="text-lg font-serif font-bold text-primary">Customers Management</h3>
                </div>
                <div className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-gray-200">
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Customer</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Orders</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Total Spent</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Joined</th>
                          <th className="text-left py-3 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {customers.map((customer) => (
                          <tr key={customer.id} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="py-4">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                                  <User size={16} className="text-gray-600" />
                                </div>
                                <div>
                                  <p className="font-medium text-primary">{customer.name}</p>
                                  <p className="text-sm text-gray-600">{customer.email}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 text-gray-700">{customer.orders}</td>
                            <td className="py-4 font-bold text-primary">{customer.spent}</td>
                            <td className="py-4 text-gray-700">{customer.joined}</td>
                            <td className="py-4">
                              <div className="flex items-center gap-2">
                                <button className="p-1 text-gray-600 hover:text-primary">
                                  <Eye size={16} />
                                </button>
                                <button className="p-1 text-gray-600 hover:text-primary">
                                  <Edit size={16} />
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

          {activeTab === "Analytics" && (
            <div className="bg-white border border-border rounded-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-serif font-bold text-primary">Analytics Dashboard</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="h-64 bg-gray-100 rounded-sm flex items-center justify-center">
                    <p className="text-gray-600">Sales Chart</p>
                  </div>
                  <div className="h-64 bg-gray-100 rounded-sm flex items-center justify-center">
                    <p className="text-gray-600">Revenue Chart</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "Settings" && (
            <div className="bg-white border border-border rounded-sm">
              <div className="p-6 border-b border-border">
                <h3 className="text-lg font-serif font-bold text-primary">Settings</h3>
              </div>
              <div className="p-6">
                <div className="space-y-6">
                  <div>
                    <h4 className="font-bold text-primary mb-4">General Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                          Site Name
                        </label>
                        <input
                          type="text"
                          value={siteName}
                          onChange={(e) => setSiteName(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                        />
                      </div>
                      <div>
                        <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                          Admin Email
                        </label>
                        <input
                          type="email"
                          value={adminEmail}
                          onChange={(e) => setAdminEmail(e.target.value)}
                          className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-md mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">Add New Category</h3>
              <button 
                onClick={() => setShowAddCategoryModal(false)}
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-20"
                  placeholder="Enter category description"
                />
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={() => setShowAddCategoryModal(false)}
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
    </div>
  )
}
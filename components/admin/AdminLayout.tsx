"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  Package, 
  Users, 
  ShoppingCart, 
  BarChart3, 
  Settings, 
  Search,
  Bell,
  User,
  LogOut,
  Tag,
  Image
} from "lucide-react"

interface AdminLayoutProps {
  children: React.ReactNode
  title: string
  subtitle?: string
}

export function AdminLayout({ children, title, subtitle }: AdminLayoutProps) {
  const pathname = usePathname()

  const handleLogout = () => {
    window.location.href = '/login'
  }

  const isActive = (path: string) => pathname === path

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/admin">
            <h1 className="text-2xl font-serif font-bold text-primary">ATELIER</h1>
            <p className="text-xs uppercase tracking-widest text-gray-600 mt-1">Admin Panel</p>
          </Link>
        </div>
        
        <nav className="flex-1 p-4 space-y-2">
          <Link 
            href="/admin" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <LayoutDashboard size={18} />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
          
          <Link 
            href="/admin/products" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/products') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Package size={18} />
            <span className="text-sm font-medium">Products</span>
          </Link>
          
          <Link 
            href="/admin/categories" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/categories') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Tag size={18} />
            <span className="text-sm font-medium">Categories</span>
          </Link>
          
          <Link 
            href="/admin/banners" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/banners') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Image size={18} />
            <span className="text-sm font-medium">Banners</span>
          </Link>
          
          <Link 
            href="/admin/orders" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/orders') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <ShoppingCart size={18} />
            <span className="text-sm font-medium">Orders</span>
          </Link>
          
          <Link 
            href="/admin/customers" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/customers') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <Users size={18} />
            <span className="text-sm font-medium">Customers</span>
          </Link>
          
          <Link 
            href="/admin/analytics" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/analytics') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            <BarChart3 size={18} />
            <span className="text-sm font-medium">Analytics</span>
          </Link>
          
          <Link 
            href="/admin/settings" 
            className={`w-full flex items-center gap-3 p-3 rounded-sm text-left smooth-transition ${
              isActive('/admin/settings') ? 'bg-primary text-white' : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
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
            <h2 className="text-2xl font-serif font-bold text-primary">{title}</h2>
            {subtitle && <p className="text-sm text-gray-600">{subtitle}</p>}
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

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
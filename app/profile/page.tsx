"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { User, Package, Heart, Settings, MapPin, CreditCard, Bell, LogOut, Edit3, ShoppingBag, ChevronDown, ChevronUp } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"

const recentOrders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    status: "Delivered",
    total: 830,
    items: 2,
    image: "/minimal-wool-coat-front.jpg"
  },
  {
    id: "ORD-2024-002", 
    date: "2024-01-08",
    status: "In Transit",
    total: 450,
    items: 1,
    image: "/cashmere-knit-front.jpg"
  },
  {
    id: "ORD-2024-003",
    date: "2023-12-22",
    status: "Delivered", 
    total: 720,
    items: 3,
    image: "/silk-shirt-front.jpg"
  }
]

const menuItems = [
  { icon: User, label: "Profile", active: true },
  { icon: Package, label: "Orders", count: 12 },
  { icon: Heart, label: "Wishlist", count: 4 },
  { icon: MapPin, label: "Addresses" },
  { icon: CreditCard, label: "Payment Methods" },
  { icon: Bell, label: "Notifications" },
  { icon: Settings, label: "Settings" },
]

export default function ProfilePage() {
  const [activeTab, setActiveTab] = React.useState("Profile")
  const [expandedOrders, setExpandedOrders] = React.useState<Set<string>>(new Set())
  const { user, logout } = useAuth()
  const { wishlist, wishlistCount } = useWishlist()
  const { cartCount } = useCart()
  const [orders, setOrders] = React.useState([])
  const [wishlistProducts, setWishlistProducts] = React.useState([])

  const toggleOrderExpansion = (orderId: string) => {
    setExpandedOrders(prev => {
      const newSet = new Set(prev)
      if (newSet.has(orderId)) {
        newSet.delete(orderId)
      } else {
        newSet.add(orderId)
      }
      return newSet
    })
  }

  // Fetch user orders
  React.useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return
      try {
        const token = localStorage.getItem('token')
        const response = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        if (response.ok) {
          const data = await response.json()
          setOrders(data || [])
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    }
    fetchOrders()
  }, [user])

  // Fetch wishlist products
  React.useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) return
      try {
        const productIds = wishlist.map(item => item._id)
        const response = await fetch('/api/products/wishlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ productIds })
        })
        if (response.ok) {
          const data = await response.json()
          setWishlistProducts(data.products || [])
        }
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      }
    }
    fetchWishlistProducts()
  }, [wishlist])

  const menuItems = [
    { icon: User, label: "Profile", active: true },
    { icon: Package, label: "Orders", count: orders.length },
  ]

  if (!user) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-serif italic mb-4">Please log in to view your profile</h2>
          <Link href="/login" className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent">
            Login
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">My Account</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
            Manage your profile and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 space-y-8">
              {/* Profile Card */}
              <div className="bg-[#FAFAFA] p-6 rounded-sm text-center">
                <div className="relative w-20 h-20 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Profile"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="font-serif text-lg mb-1">{user.name}</h3>
                <p className="text-sm text-muted-foreground mb-4">{user.email}</p>
                <button className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-accent smooth-transition flex items-center gap-2 mx-auto">
                  <Edit3 size={12} />
                  Edit Profile
                </button>
              </div>

              {/* Navigation Menu */}
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setActiveTab(item.label)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 text-left smooth-transition rounded-sm",
                      activeTab === item.label
                        ? "bg-primary text-white"
                        : "hover:bg-[#FAFAFA] text-muted-foreground hover:text-primary"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <item.icon size={18} />
                      <span className="text-sm">{item.label}</span>
                    </div>
                    {item.count && (
                      <span className={cn(
                        "text-xs px-2 py-1 rounded-full",
                        activeTab === item.label ? "bg-white/20" : "bg-primary text-white"
                      )}>
                        {item.count}
                      </span>
                    )}
                  </button>
                ))}
                
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 p-4 text-left text-red-500 hover:bg-red-50 smooth-transition rounded-sm"
                >
                  <LogOut size={18} />
                  <span className="text-sm">Sign Out</span>
                </button>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === "Profile" && (
              <div className="space-y-8">
                {/* Personal Information */}
                <div className="bg-white border border-border rounded-sm p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif italic">Personal Information</h2>
                    <button className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-accent smooth-transition">
                      Edit
                    </button>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Full Name
                      </label>
                      <p className="text-lg">{user.name}</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Email
                      </label>
                      <p className="text-lg">{user.email}</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Member Since
                      </label>
                      <p className="text-lg">{new Date(user.createdAt || Date.now()).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Account Type
                      </label>
                      <p className="text-lg capitalize">{user.role || 'Customer'}</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white border border-border rounded-sm p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif italic">Recent Orders</h2>
                    <button 
                      onClick={() => setActiveTab("Orders")}
                      className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-accent smooth-transition"
                    >
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {orders.length > 0 ? orders.slice(0, 3).map((order) => (
                      <div key={order._id} className="border border-border rounded-sm p-4 hover:bg-[#FAFAFA] smooth-transition">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <p className="font-medium">Order #{order._id.slice(-8)}</p>
                            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleDateString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                          </span>
                        </div>
                        
                        {/* Show first few items */}
                        {order.items && order.items.length > 0 && (
                          <div className="mb-3">
                            <div className="flex items-center gap-3">
                              <div className="w-12 h-12 bg-[#F2F2F2] rounded-sm overflow-hidden flex-shrink-0">
                                {order.items[0].product?.images?.[0] ? (
                                  <Image
                                    src={order.items[0].product.images[0]}
                                    alt={order.items[0].product.name || 'Product'}
                                    width={48}
                                    height={48}
                                    className="w-full h-full object-cover"
                                  />
                                ) : (
                                  <Package size={20} className="w-full h-full p-2 text-gray-400" />
                                )}
                              </div>
                              <div className="flex-grow">
                                <p className="text-sm font-medium">{order.items[0].product?.name || 'Product'}</p>
                                {order.items.length > 1 && (
                                  <p className="text-xs text-muted-foreground">+{order.items.length - 1} more items</p>
                                )}
                              </div>
                            </div>
                          </div>
                        )}
                        
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-muted-foreground">{order.items?.length || 0} items</p>
                          <p className="font-medium">${order.totalAmount?.toFixed(2) || '0.00'}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-center py-8">
                        <Package size={48} className="mx-auto mb-4 text-gray-300" />
                        <p className="text-muted-foreground mb-4">No orders yet</p>
                        <Link href="/shop" className="px-4 py-2 bg-primary text-white rounded-sm hover:bg-accent">
                          Start Shopping
                        </Link>
                      </div>
                    )}
                  </div>
                </div>

                {/* Membership Status */}
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-sm p-8">
                  <h2 className="text-2xl font-serif italic mb-4">Premium Membership</h2>
                  <p className="mb-6 opacity-90">Enjoy exclusive benefits including free shipping, early access to collections, and personalized styling services.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">{orders.length}</p>
                      <p className="text-sm opacity-75">Total Orders</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">{wishlistCount}</p>
                      <p className="text-sm opacity-75">Wishlist Items</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">{cartCount}</p>
                      <p className="text-sm opacity-75">Cart Items</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Orders" && (
              <div className="bg-white border border-border rounded-sm p-8">
                <h2 className="text-2xl font-serif italic mb-6">Order History</h2>
                {orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => {
                      const isExpanded = expandedOrders.has(order._id)
                      return (
                        <div key={order._id} className="border border-border rounded-sm overflow-hidden">
                          {/* Order Header - Always Visible */}
                          <div 
                            className="bg-[#FAFAFA] p-4 border-b border-border cursor-pointer hover:bg-gray-50 transition-colors"
                            onClick={() => toggleOrderExpansion(order._id)}
                          >
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white rounded-sm overflow-hidden flex-shrink-0">
                                  {order.items?.[0]?.product?.images?.[0] ? (
                                    <Image
                                      src={order.items[0].product.images[0]}
                                      alt={order.items[0].product.name || 'Product'}
                                      width={48}
                                      height={48}
                                      className="w-full h-full object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                      <Package size={20} className="text-gray-400" />
                                    </div>
                                  )}
                                </div>
                                <div>
                                  <p className="font-medium">Order #{order._id.slice(-8)}</p>
                                  <p className="text-sm text-muted-foreground">
                                    {new Date(order.createdAt).toLocaleDateString('en-US', {
                                      year: 'numeric',
                                      month: 'short',
                                      day: 'numeric'
                                    })} • {order.items?.length || 0} items
                                  </p>
                                </div>
                              </div>
                              <div className="flex items-center gap-4">
                                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                  order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                  order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                  order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                  order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {order.status ? order.status.charAt(0).toUpperCase() + order.status.slice(1) : 'Pending'}
                                </span>
                                <p className="font-medium text-lg">${order.totalAmount?.toFixed(2) || '0.00'}</p>
                                {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                              </div>
                            </div>
                          </div>
                          
                          {/* Order Details - Collapsible */}
                          {isExpanded && (
                            <div className="p-6 animate-in slide-in-from-top-2 duration-200">
                              {/* Order Items */}
                              <div className="space-y-3 mb-6">
                                <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground">Items</h4>
                                {order.items?.map((item, index) => (
                                  <div key={index} className="flex items-center gap-4 p-3 bg-[#FAFAFA] rounded-sm">
                                    <div className="w-14 h-16 bg-white rounded-sm overflow-hidden flex-shrink-0">
                                      {item.product?.images?.[0] ? (
                                        <Image
                                          src={item.product.images[0]}
                                          alt={item.product.name || 'Product'}
                                          width={56}
                                          height={64}
                                          className="w-full h-full object-cover"
                                        />
                                      ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                          <Package size={20} className="text-gray-400" />
                                        </div>
                                      )}
                                    </div>
                                    <div className="flex-grow">
                                      <h5 className="font-medium mb-1">{item.product?.name || 'Product'}</h5>
                                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        {item.size && <span>Size: {item.size}</span>}
                                        {item.color && <span>Color: {item.color}</span>}
                                        <span>Qty: {item.quantity}</span>
                                      </div>
                                    </div>
                                    <div className="text-right">
                                      <p className="font-medium">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</p>
                                      <p className="text-sm text-muted-foreground">${item.price?.toFixed(2) || '0.00'} each</p>
                                    </div>
                                  </div>
                                )) || (
                                  <div className="text-center py-4 text-muted-foreground">
                                    No items found
                                  </div>
                                )}
                              </div>
                              
                              {/* Additional Details */}
                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Shipping Address */}
                                {order.shippingAddress && (
                                  <div>
                                    <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-2">Shipping Address</h4>
                                    <p className="text-sm">
                                      {order.shippingAddress.street}<br />
                                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}<br />
                                      {order.shippingAddress.country}
                                    </p>
                                  </div>
                                )}
                                
                                {/* Payment Info */}
                                <div>
                                  <h4 className="font-medium text-sm uppercase tracking-wider text-muted-foreground mb-2">Payment</h4>
                                  <p className="text-sm mb-1">{order.paymentMethod || 'N/A'}</p>
                                  <p className="text-lg font-bold">${order.totalAmount?.toFixed(2) || '0.00'}</p>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Package size={64} className="mx-auto mb-4 text-gray-300" />
                    <p className="text-muted-foreground mb-4">No orders found</p>
                    <Link href="/shop" className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent">
                      Start Shopping
                    </Link>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
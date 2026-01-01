"use client"

import * as React from "react"
import Image from "next/image"
import { User, Package, Heart, Settings, MapPin, CreditCard, Bell, LogOut, Edit3 } from "lucide-react"
import { cn } from "@/lib/utils"

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
                <h3 className="font-serif text-lg mb-1">Alexandra Chen</h3>
                <p className="text-sm text-muted-foreground mb-4">Premium Member</p>
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
                  onClick={() => window.location.href = '/login'}
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
                        First Name
                      </label>
                      <p className="text-lg">Alexandra</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Last Name
                      </label>
                      <p className="text-lg">Chen</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Email
                      </label>
                      <p className="text-lg">alexandra.chen@email.com</p>
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground mb-2 block">
                        Phone
                      </label>
                      <p className="text-lg">+1 (555) 123-4567</p>
                    </div>
                  </div>
                </div>

                {/* Recent Orders */}
                <div className="bg-white border border-border rounded-sm p-8">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-serif italic">Recent Orders</h2>
                    <button className="text-xs uppercase tracking-[0.2em] font-bold text-primary hover:text-accent smooth-transition">
                      View All
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    {recentOrders.map((order) => (
                      <div key={order.id} className="flex items-center gap-4 p-4 border border-border rounded-sm hover:bg-[#FAFAFA] smooth-transition">
                        <div className="w-16 h-20 bg-[#F2F2F2] rounded-sm overflow-hidden flex-shrink-0">
                          <Image
                            src={order.image}
                            alt="Order item"
                            width={64}
                            height={80}
                            className="object-cover w-full h-full"
                          />
                        </div>
                        <div className="flex-grow">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <p className="font-medium">{order.id}</p>
                              <p className="text-sm text-muted-foreground">{order.date}</p>
                            </div>
                            <span className={cn(
                              "text-xs px-2 py-1 rounded-full",
                              order.status === "Delivered" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"
                            )}>
                              {order.status}
                            </span>
                          </div>
                          <div className="flex justify-between items-center">
                            <p className="text-sm text-muted-foreground">{order.items} items</p>
                            <p className="font-medium">${order.total}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Membership Status */}
                <div className="bg-gradient-to-r from-primary to-accent text-white rounded-sm p-8">
                  <h2 className="text-2xl font-serif italic mb-4">Premium Membership</h2>
                  <p className="mb-6 opacity-90">Enjoy exclusive benefits including free shipping, early access to collections, and personalized styling services.</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">$2,340</p>
                      <p className="text-sm opacity-75">Total Spent</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">12</p>
                      <p className="text-sm opacity-75">Orders Placed</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold mb-1">$160</p>
                      <p className="text-sm opacity-75">Savings This Year</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "Orders" && (
              <div className="bg-white border border-border rounded-sm p-8">
                <h2 className="text-2xl font-serif italic mb-6">Order History</h2>
                <p className="text-muted-foreground">Your complete order history will be displayed here.</p>
              </div>
            )}

            {activeTab === "Wishlist" && (
              <div className="bg-white border border-border rounded-sm p-8">
                <h2 className="text-2xl font-serif italic mb-6">Saved Items</h2>
                <p className="text-muted-foreground">Your wishlist items will be displayed here.</p>
              </div>
            )}

            {/* Add other tab contents as needed */}
          </div>
        </div>
      </div>
    </div>
  )
}
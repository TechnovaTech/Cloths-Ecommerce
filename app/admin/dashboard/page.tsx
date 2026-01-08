"use client"

import * as React from "react"
import { User } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from "@/components/admin/AdminAuthWrapper"
import Link from "next/link"

export default function AdminDashboard() {
  const [stats, setStats] = React.useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalCustomers: 0,
    totalProducts: 0
  })
  const [recentOrders, setRecentOrders] = React.useState([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      // Fetch products count
      const productsRes = await fetch('/api/products')
      const products = productsRes.ok ? await productsRes.json() : []
      
      // Fetch orders
      const ordersRes = await fetch('/api/admin/orders')
      const orders = ordersRes.ok ? await ordersRes.json() : []
      
      // Fetch customers
      const customersRes = await fetch('/api/admin/customers')
      const customers = customersRes.ok ? await customersRes.json() : []
      
      // Calculate stats
      const totalRevenue = orders.reduce((sum, order) => sum + (order.totalAmount || 0), 0)
      
      setStats({
        totalRevenue,
        totalOrders: orders.length,
        totalCustomers: customers.length,
        totalProducts: products.length
      })
      
      // Set recent orders (last 4)
      setRecentOrders(orders.slice(0, 4))
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Dashboard" subtitle="Loading...">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading dashboard...</p>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }
  return (
    <AdminAuthWrapper>
      <AdminLayout title="Dashboard" subtitle="Welcome back, Admin">
        {/* Quick Actions */}
        <div className="mb-8">
          <div className="flex gap-4">
            <Link
              href="/admin/products"
              className="bg-primary text-white px-6 py-3 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition"
            >
              Manage Products
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 border border-border rounded-sm">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Total Revenue
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold text-primary">₹{stats.totalRevenue.toFixed(2)}</p>
            </div>
          </div>
          <div className="bg-white p-6 border border-border rounded-sm">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Orders
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold text-primary">{stats.totalOrders}</p>
            </div>
          </div>
          <div className="bg-white p-6 border border-border rounded-sm">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Customers
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold text-primary">{stats.totalCustomers}</p>
            </div>
          </div>
          <div className="bg-white p-6 border border-border rounded-sm">
            <h3 className="text-xs uppercase tracking-widest font-bold text-gray-600 mb-2">
              Products
            </h3>
            <div className="flex items-end justify-between">
              <p className="text-2xl font-serif font-bold text-primary">{stats.totalProducts}</p>
            </div>
          </div>
        </div>

        {/* Recent Orders */}
        <div className="bg-white border border-border rounded-sm">
          <div className="p-6 border-b border-border flex items-center justify-between">
            <h3 className="text-lg font-serif font-bold text-primary">Recent Orders</h3>
            <Link href="/admin/orders" className="text-xs uppercase tracking-widest font-bold text-accent hover:text-primary">
              View All
            </Link>
          </div>
          <div className="p-6">
            {recentOrders.length > 0 ? (
              <div className="space-y-4">
                {recentOrders.map((order) => (
                  <div key={order._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-sm hover:bg-gray-50">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                        <User size={16} className="text-gray-600" />
                      </div>
                      <div>
                        <p className="font-medium text-primary">#{order._id.slice(-8)}</p>
                        <p className="text-sm text-gray-600">{order.user?.name || 'Unknown'}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">₹{order.totalAmount?.toFixed(2) || '0.00'}</p>
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        order.status === "delivered" ? "bg-green-100 text-green-800" :
                        order.status === "processing" ? "bg-blue-100 text-blue-800" :
                        order.status === "shipped" ? "bg-purple-100 text-purple-800" :
                        "bg-yellow-100 text-yellow-800"
                      }`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-8">No orders found</p>
            )}
          </div>
        </div>
      </AdminLayout>
    </AdminAuthWrapper>
  )
}
"use client"

import * as React from "react"
import { Eye, Edit, User, Mail, Calendar, ShoppingBag, ChevronDown, ChevronUp, MapPin, Phone, CreditCard } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

interface Customer {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  orderCount?: number
  totalSpent?: number
  address?: {
    street?: string
    city?: string
    state?: string
    zipCode?: string
    country?: string
  }
  recentOrders?: any[]
}

export default function CustomersPage() {
  const [customers, setCustomers] = React.useState<Customer[]>([])
  const [loading, setLoading] = React.useState(true)
  const [expandedCustomers, setExpandedCustomers] = React.useState<Set<string>>(new Set())

  React.useEffect(() => {
    fetchCustomers()
  }, [])

  const fetchCustomers = async () => {
    try {
      const res = await fetch('/api/admin/customers')
      if (res.ok) {
        const data = await res.json()
        setCustomers(data)
      }
    } catch (error) {
      console.error('Error fetching customers:', error)
    } finally {
      setLoading(false)
    }
  }

  const toggleCustomerExpansion = (customerId: string) => {
    setExpandedCustomers(prev => {
      const newSet = new Set(prev)
      if (newSet.has(customerId)) {
        newSet.delete(customerId)
      } else {
        newSet.add(customerId)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Customers" subtitle="Loading...">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading customers...</p>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  return (
    <AdminAuthWrapper>
    <AdminLayout title="Customers Management" subtitle="Manage your customer database">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Customers ({customers.length})</h2>
          <div className="flex items-center gap-4">
            <div className="text-sm text-gray-600">
              Total: {customers.length} customers
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Role</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Orders</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Total Spent</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Joined</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Actions</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => {
                const isExpanded = expandedCustomers.has(customer._id)
                return (
                  <React.Fragment key={customer._id}>
                    <tr className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
                            <User size={16} className="text-gray-600" />
                          </div>
                          <div>
                            <p className="font-medium text-primary">{customer.name}</p>
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <Mail size={12} />
                              {customer.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          customer.role === 'admin' 
                            ? 'bg-red-100 text-red-800' 
                            : 'bg-blue-100 text-blue-800'
                        }`}>
                          {customer.role || 'customer'}
                        </span>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-700">
                          <ShoppingBag size={14} />
                          {customer.orderCount || 0}
                        </div>
                      </td>
                      <td className="py-4 px-6 font-bold text-primary">
                        ${customer.totalSpent?.toFixed(2) || '0.00'}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-1 text-gray-700">
                          <Calendar size={14} />
                          {new Date(customer.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <button 
                            onClick={() => toggleCustomerExpansion(customer._id)}
                            className="p-1 text-gray-600 hover:text-primary" 
                            title={isExpanded ? "Hide Details" : "View Details"}
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </td>
                    </tr>
                    
                    {/* Expanded Details Row */}
                    {isExpanded && (
                      <tr className="bg-gray-50">
                        <td colSpan={6} className="px-6 py-6">
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Customer Information */}
                            <div className="bg-white p-6 rounded-sm border">
                              <h4 className="font-medium text-primary mb-4 flex items-center gap-2">
                                <User size={18} />
                                Customer Profile
                              </h4>
                              <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                                    <p className="font-medium text-lg">{customer.name}</p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Customer ID</p>
                                    <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{customer._id.slice(-8)}</p>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email Address</p>
                                    <p className="font-medium flex items-center gap-2">
                                      <Mail size={14} className="text-gray-400" />
                                      {customer.email}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Type</p>
                                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                                      customer.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                    }`}>
                                      {customer.role || 'customer'}
                                    </span>
                                  </div>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Member Since</p>
                                    <p className="font-medium flex items-center gap-2">
                                      <Calendar size={14} className="text-gray-400" />
                                      {new Date(customer.createdAt).toLocaleDateString('en-US', {
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                      })}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Status</p>
                                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                      Active
                                    </span>
                                  </div>
                                </div>
                                {customer.address && (
                                  <div className="pt-4 border-t">
                                    <div className="flex items-center gap-2 mb-3">
                                      <MapPin size={16} className="text-gray-600" />
                                      <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">Shipping Address</p>
                                    </div>
                                    <div className="bg-gray-50 p-4 rounded border">
                                      {customer.address.street && <p className="font-medium">{customer.address.street}</p>}
                                      {(customer.address.city || customer.address.state || customer.address.zipCode) && (
                                        <p className="text-gray-700">
                                          {customer.address.city}{customer.address.city && customer.address.state ? ', ' : ''}
                                          {customer.address.state} {customer.address.zipCode}
                                        </p>
                                      )}
                                      {customer.address.country && <p className="text-gray-600 text-sm">{customer.address.country}</p>}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {/* Order Statistics */}
                            <div className="bg-white p-6 rounded-sm border">
                              <h4 className="font-medium text-primary mb-4 flex items-center gap-2">
                                <ShoppingBag size={18} />
                                Purchase History
                              </h4>
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center p-4 bg-blue-50 rounded border">
                                  <div className="text-3xl font-bold text-blue-600 mb-1">{customer.orderCount || 0}</div>
                                  <div className="text-xs text-blue-600 uppercase tracking-wider font-medium">Total Orders</div>
                                </div>
                                <div className="text-center p-4 bg-green-50 rounded border">
                                  <div className="text-3xl font-bold text-green-600 mb-1">${customer.totalSpent?.toFixed(2) || '0.00'}</div>
                                  <div className="text-xs text-green-600 uppercase tracking-wider font-medium">Total Spent</div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center p-3 bg-purple-50 rounded border">
                                  <div className="text-xl font-bold text-purple-600 mb-1">${customer.totalSpent && customer.orderCount ? (customer.totalSpent / customer.orderCount).toFixed(2) : '0.00'}</div>
                                  <div className="text-xs text-purple-600 uppercase tracking-wider font-medium">Avg Order</div>
                                </div>
                                <div className="text-center p-3 bg-orange-50 rounded border">
                                  <div className="text-xl font-bold text-orange-600 mb-1">{customer.totalSpent && customer.totalSpent > 500 ? 'VIP' : 'Regular'}</div>
                                  <div className="text-xs text-orange-600 uppercase tracking-wider font-medium">Status</div>
                                </div>
                              </div>
                              
                              {/* Recent Orders */}
                              {customer.recentOrders && customer.recentOrders.length > 0 && (
                                <div>
                                  <h5 className="font-medium text-sm mb-3 text-gray-700">Recent Orders</h5>
                                  <div className="space-y-2">
                                    {customer.recentOrders.slice(0, 3).map((order: any) => (
                                      <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 rounded border text-sm">
                                        <div>
                                          <span className="font-medium">#{order._id.slice(-8)}</span>
                                          <span className="text-gray-600 ml-2">{new Date(order.createdAt).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                                            order.status === 'shipped' ? 'bg-blue-100 text-blue-800' :
                                            order.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                            'bg-gray-100 text-gray-800'
                                          }`}>
                                            {order.status || 'pending'}
                                          </span>
                                          <span className="font-bold text-primary">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                )
              })}
            </tbody>
          </table>
          
          {customers.length === 0 && (
            <div className="text-center py-12">
              <User size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">No customers found</p>
              <p className="text-sm text-gray-400">Customers will appear here when they register</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
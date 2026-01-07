"use client"

import * as React from "react"
import { Filter, Eye, Edit, User, Package, Truck, CheckCircle, XCircle, ChevronDown, ChevronUp, Mail, Calendar, CreditCard, MapPin } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

interface Order {
  _id: string
  user: {
    _id: string
    name: string
    email: string
    role?: string
    createdAt?: string
  }
  items: Array<{
    product: {
      _id: string
      name: string
      images: string[]
      price?: number
      category?: string
    }
    quantity: number
    size?: string
    price: number
  }>
  totalAmount: number
  status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled'
  paymentStatus: 'pending' | 'paid' | 'failed'
  paymentMethod?: string
  shippingAddress?: {
    street: string
    city: string
    state: string
    zipCode: string
    country: string
  }
  createdAt: string
  updatedAt?: string
}

export default function OrdersPage() {
  const [orders, setOrders] = React.useState<Order[]>([])
  const [loading, setLoading] = React.useState(true)
  const [statusFilter, setStatusFilter] = React.useState('all')
  const [expandedOrder, setExpandedOrder] = React.useState<string | null>(null)

  React.useEffect(() => {
    fetchOrders()
  }, [])

  const fetchOrders = async () => {
    try {
      const res = await fetch('/api/admin/orders')
      if (res.ok) {
        const data = await res.json()
        setOrders(data)
      }
    } catch (error) {
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        fetchOrders()
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Package size={16} className="text-yellow-600" />
      case 'confirmed': return <CheckCircle size={16} className="text-blue-600" />
      case 'processing': return <Package size={16} className="text-orange-600" />
      case 'shipped': return <Truck size={16} className="text-purple-600" />
      case 'out_for_delivery': return <Truck size={16} className="text-indigo-600" />
      case 'delivered': return <CheckCircle size={16} className="text-green-600" />
      case 'cancelled': return <XCircle size={16} className="text-red-600" />
      default: return <Package size={16} className="text-gray-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800'
      case 'confirmed': return 'bg-blue-100 text-blue-800'
      case 'processing': return 'bg-orange-100 text-orange-800'
      case 'shipped': return 'bg-purple-100 text-purple-800'
      case 'out_for_delivery': return 'bg-indigo-100 text-indigo-800'
      case 'delivered': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const filteredOrders = orders.filter(order => 
    statusFilter === 'all' || order.status === statusFilter
  )

  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Orders" subtitle="Loading...">
          <div className="flex items-center justify-center h-64">
            <p className="text-gray-500">Loading orders...</p>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  return (
    <AdminAuthWrapper>
    <AdminLayout title="Orders Management" subtitle="Track and manage customer orders">
      <div className="bg-white border border-border rounded-sm">
        <div className="p-6 border-b border-border flex items-center justify-between">
          <h2 className="text-lg font-serif font-bold text-primary">All Orders ({filteredOrders.length})</h2>
          <div className="flex items-center gap-4"> 
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-sm text-sm"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="out_for_delivery">Out for Delivery</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Order</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Customer</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Items</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Amount</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Status</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Date</th>
                <th className="text-left py-4 px-6 text-xs uppercase tracking-widest font-bold text-gray-600">Details</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((order) => (
                <React.Fragment key={order._id}>
                  <tr className="border-b border-gray-100 hover:bg-gray-50">
                    <td className="py-4 px-6 font-medium text-primary">#{order._id.slice(-8)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                          <User size={14} className="text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.user?.name || 'Unknown'}</p>
                          <p className="text-sm text-gray-600">{order.user?.email || 'No email'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{order.items.length}</span>
                        <span className="text-xs text-gray-500">items</span>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-bold text-primary">${order.totalAmount?.toFixed(2) || '0.00'}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(order.status)}
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                          className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="confirmed">Confirmed</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="out_for_delivery">Out for Delivery</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {new Date(order.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-4 px-6">
                      <button 
                        onClick={() => setExpandedOrder(expandedOrder === order._id ? null : order._id)}
                        className="p-2 text-gray-600 hover:text-primary hover:bg-gray-100 rounded transition-colors"
                      >
                        {expandedOrder === order._id ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                    </td>
                  </tr>
                  
                  {/* Expanded Order Details */}
                  {expandedOrder === order._id && (
                    <tr>
                      <td colSpan={7} className="px-6 py-6 bg-gray-50">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Order Items */}
                          <div className="lg:col-span-2">
                            <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                              <Package size={18} />
                              Order Items ({order.items.length})
                            </h4>
                            <div className="space-y-3">
                              {order.items.map((item, index) => (
                                <div key={index} className="flex items-center gap-4 p-4 bg-white rounded-lg border shadow-sm">
                                  <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
                                    <img 
                                      src={item.product?.images?.[0] || '/placeholder.svg'} 
                                      alt={item.product?.name || 'Product'}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-grow">
                                    <h5 className="font-medium text-gray-900 mb-1">{item.product?.name || 'Unknown Product'}</h5>
                                    <div className="grid grid-cols-2 gap-4 text-sm text-gray-600">
                                      <div>
                                        <span className="font-medium">Quantity:</span> {item.quantity}
                                      </div>
                                      {item.size && (
                                        <div>
                                          <span className="font-medium">Size:</span> {item.size}
                                        </div>
                                      )}
                                      <div>
                                        <span className="font-medium">Unit Price:</span> ${item.price?.toFixed(2) || '0.00'}
                                      </div>
                                      <div>
                                        <span className="font-medium">Line Total:</span> <span className="font-bold text-primary">${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                          
                          {/* Customer & Order Details */}
                          <div className="space-y-6">
                            {/* Customer Information */}
                            <div className="bg-white rounded-lg border p-4">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <User size={18} />
                                Customer Details
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Full Name</p>
                                  <p className="font-medium">{order.user?.name || 'N/A'}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Email</p>
                                  <p className="font-medium flex items-center gap-2">
                                    <Mail size={14} />
                                    {order.user?.email || 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Member Since</p>
                                  <p className="font-medium flex items-center gap-2">
                                    <Calendar size={14} />
                                    {order.user?.createdAt ? new Date(order.user.createdAt).toLocaleDateString() : 'N/A'}
                                  </p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Account Type</p>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    order.user?.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'
                                  }`}>
                                    {order.user?.role || 'customer'}
                                  </span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Order Information */}
                            <div className="bg-white rounded-lg border p-4">
                              <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                <CreditCard size={18} />
                                Payment & Order Info
                              </h4>
                              <div className="space-y-3">
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order ID</p>
                                  <p className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{order._id}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Order Date</p>
                                  <p className="font-medium">{new Date(order.createdAt).toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Payment Method</p>
                                  <p className="font-medium capitalize">{order.paymentMethod || 'Card'}</p>
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500 uppercase tracking-wide mb-1">Payment Status</p>
                                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                                    order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                                    order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                  }`}>
                                    {order.paymentStatus || 'pending'}
                                  </span>
                                </div>
                                <div className="pt-2 border-t">
                                  <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Subtotal:</span>
                                      <span className="font-medium">${(order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                      <span className="text-gray-600">Tax & Fees:</span>
                                      <span className="font-medium">${(order.totalAmount - order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)).toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between pt-2 border-t">
                                      <span className="text-xs text-gray-500 uppercase tracking-wide">Order Total</span>
                                      <span className="font-bold text-xl text-primary">${order.totalAmount?.toFixed(2) || '0.00'}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            
                            {/* Shipping Address */}
                            {order.shippingAddress && (
                              <div className="bg-white rounded-lg border p-4">
                                <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                                  <MapPin size={18} />
                                  Shipping Address
                                </h4>
                                <div className="space-y-1 text-sm">
                                  <p className="font-medium">{order.shippingAddress.street}</p>
                                  <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zipCode}</p>
                                  <p className="text-gray-600">{order.shippingAddress.country}</p>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
          
          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">No orders found</p>
              <p className="text-sm text-gray-400">Orders will appear here when customers make purchases</p>
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
"use client"

import * as React from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, Package, User, Mail, CreditCard, MapPin, Truck, CheckCircle, XCircle, Clock, Calendar, Phone, ShoppingBag } from "lucide-react"
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
    color?: string
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

export default function OrderViewPage() {
  const params = useParams()
  const router = useRouter()
  const [order, setOrder] = React.useState<Order | null>(null)
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    if (params.id) {
      fetchOrder(params.id as string)
    }
  }, [params.id])

  const fetchOrder = async (orderId: string) => {
    try {
      const res = await fetch(`/api/admin/orders/${orderId}`)
      if (res.ok) {
        const data = await res.json()
        setOrder(data)
      }
    } catch (error) {
      console.error('Error fetching order:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateOrderStatus = async (newStatus: string) => {
    if (!order) return
    try {
      const res = await fetch(`/api/admin/orders/${order._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      })
      if (res.ok) {
        setOrder({ ...order, status: newStatus as any })
      }
    } catch (error) {
      console.error('Error updating order status:', error)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={18} className="text-amber-500" />
      case 'confirmed': return <CheckCircle size={18} className="text-blue-500" />
      case 'processing': return <Package size={18} className="text-orange-500" />
      case 'shipped': return <Truck size={18} className="text-purple-500" />
      case 'out_for_delivery': return <Truck size={18} className="text-indigo-500" />
      case 'delivered': return <CheckCircle size={18} className="text-emerald-500" />
      case 'cancelled': return <XCircle size={18} className="text-red-500" />
      default: return <Package size={18} className="text-gray-500" />
    }
  }



  if (loading) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Order Details" subtitle="Loading...">
          <div className="flex items-center justify-center h-40">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-black"></div>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  if (!order) {
    return (
      <AdminAuthWrapper>
        <AdminLayout title="Order Details" subtitle="Order not found">
          <div className="text-center py-12">
            <Package size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="text-gray-500 mb-4">Order not found</p>
            <button onClick={() => router.back()} className="px-6 py-2 bg-black text-white rounded">
              Go Back
            </button>
          </div>
        </AdminLayout>
      </AdminAuthWrapper>
    )
  }

  const subtotal = order.items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const taxAndFees = order.totalAmount - subtotal

  return (
    <AdminAuthWrapper>
      <AdminLayout title={`Order #${order._id.slice(-8)}`} subtitle={new Date(order.createdAt).toLocaleDateString()}>
        {/* Back Button */}
        <div className="mb-6">
          <button onClick={() => router.back()} className="flex items-center gap-2 text-gray-600 hover:text-black transition-colors">
            <ArrowLeft size={20} />
            Back to Orders
          </button>
        </div>

        {/* Single Comprehensive Order Card */}
        <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
          {/* Header Section */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-8 py-6 border-b">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center">
                    <ShoppingBag size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-gray-900">Order #{order._id.slice(-8)}</h1>
                    <p className="text-gray-600 flex items-center gap-2">
                      <Calendar size={16} />
                      {new Date(order.createdAt).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-3xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</p>
                  <p className="text-sm text-gray-500">{order.items.length} item{order.items.length !== 1 ? 's' : ''}</p>
                </div>
                <div className="flex items-center gap-3">
                  {getStatusIcon(order.status)}
                  <select
                    value={order.status}
                    onChange={(e) => updateOrderStatus(e.target.value)}
                    className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 font-medium text-sm hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-black transition-all cursor-pointer"
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
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Products & Customer */}
              <div className="lg:col-span-2 space-y-8">
                {/* Products Section */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Package size={24} className="text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Order Items</h2>
                    <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm font-medium">
                      {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-lg border">
                        <img 
                          src={item.product?.images?.[0] || '/placeholder.svg'} 
                          alt={item.product?.name || 'Product'}
                          className="w-20 h-20 object-cover rounded-lg border"
                        />
                        <div className="flex-grow">
                          <h3 className="font-semibold text-gray-900 mb-2">{item.product?.name}</h3>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Quantity:</span>
                                <span className="font-medium">{item.quantity}</span>
                              </div>
                              {item.size && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Size:</span>
                                  <span className="font-medium">{item.size}</span>
                                </div>
                              )}
                              {item.color && (
                                <div className="flex justify-between">
                                  <span className="text-gray-600">Color:</span>
                                  <span className="font-medium">{item.color}</span>
                                </div>
                              )}
                            </div>
                            <div className="space-y-1">
                              <div className="flex justify-between">
                                <span className="text-gray-600">Unit Price:</span>
                                <span className="font-medium">₹{item.price?.toFixed(2)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-600">Category:</span>
                                <span className="font-medium capitalize">{item.product?.category || 'N/A'}</span>
                              </div>
                              <div className="flex justify-between pt-2 border-t border-gray-200">
                                <span className="font-semibold text-gray-900">Subtotal:</span>
                                <span className="font-bold text-gray-900">₹{((item.price || 0) * (item.quantity || 1)).toFixed(2)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Customer Information */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <User size={24} className="text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Customer Information</h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Contact Details</h3>
                        <div className="space-y-3">
                          <div className="flex items-center gap-3">
                            <User size={18} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">{order.user?.name}</p>
                              <p className="text-sm text-gray-600">Customer Name</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Mail size={18} className="text-gray-500" />
                            <div>
                              <p className="font-medium text-gray-900">{order.user?.email}</p>
                              <p className="text-sm text-gray-600">Email Address</p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900 mb-3">Account Details</h3>
                        <div className="space-y-3">
                          <div>
                            <p className="font-medium text-gray-900 capitalize">{order.user?.role || 'Customer'}</p>
                            <p className="text-sm text-gray-600">Account Type</p>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{order.user?._id?.slice(-8)}</p>
                            <p className="text-sm text-gray-600">Customer ID</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column - Billing & Shipping */}
              <div className="space-y-8">
                {/* Order Summary & Billing */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard size={24} className="text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Billing Details</h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <div className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Subtotal:</span>
                          <span className="font-medium">₹{subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Tax & Fees:</span>
                          <span className="font-medium">₹{taxAndFees.toFixed(2)}</span>
                        </div>
                        <div className="border-t border-gray-200 pt-3">
                          <div className="flex justify-between">
                            <span className="text-lg font-semibold text-gray-900">Total Amount:</span>
                            <span className="text-2xl font-bold text-gray-900">₹{order.totalAmount?.toFixed(2)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="border-t border-gray-200 pt-4 space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment Method:</span>
                          <span className="font-medium capitalize">{order.paymentMethod || 'Card Payment'}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Payment Status:</span>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            order.paymentStatus === 'paid' ? 'bg-green-100 text-green-800' :
                            order.paymentStatus === 'failed' ? 'bg-red-100 text-red-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {order.paymentStatus || 'pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div>
                    <div className="flex items-center gap-3 mb-6">
                      <MapPin size={24} className="text-gray-700" />
                      <h2 className="text-xl font-semibold text-gray-900">Shipping Address</h2>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-6 border">
                      <div className="space-y-2">
                        <p className="font-semibold text-gray-900">{order.shippingAddress.street}</p>
                        <p className="text-gray-700">{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                        <p className="text-gray-700">{order.shippingAddress.zipCode}</p>
                        <p className="text-gray-600 font-medium">{order.shippingAddress.country}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Order Timeline */}
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <Clock size={24} className="text-gray-700" />
                    <h2 className="text-xl font-semibold text-gray-900">Order Timeline</h2>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Order Placed:</span>
                        <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                      </div>
                      {order.updatedAt && order.updatedAt !== order.createdAt && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Last Updated:</span>
                          <span className="font-medium">{new Date(order.updatedAt).toLocaleDateString()}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Current Status:</span>
                        <span className="font-medium capitalize flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          {order.status.replace('_', ' ')}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AdminLayout>
    </AdminAuthWrapper>
  )
}
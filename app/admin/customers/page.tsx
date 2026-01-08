"use client"

import * as React from "react"
import { Eye, User, Mail, Calendar, ShoppingBag, ChevronDown, ChevronUp, MapPin, Phone, CreditCard, X, Trash2, Search, Ban, CheckCircle } from "lucide-react"
import { AdminLayout } from "@/components/admin/AdminLayout"
import AdminAuthWrapper from '@/components/admin/AdminAuthWrapper'

interface Customer {
  _id: string
  name: string
  email: string
  role: string
  createdAt: string
  isBlocked?: boolean
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
  const [selectedCustomer, setSelectedCustomer] = React.useState<Customer | null>(null)
  const [showModal, setShowModal] = React.useState(false)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [showBlockModal, setShowBlockModal] = React.useState(false)
  const [showUnblockModal, setShowUnblockModal] = React.useState(false)
  const [customerToBlock, setCustomerToBlock] = React.useState<Customer | null>(null)
  const [blockReason, setBlockReason] = React.useState('')
  const [customReason, setCustomReason] = React.useState('')
  const [currentPage, setCurrentPage] = React.useState(1)
  const [itemsPerPage] = React.useState(10)

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

  const handleViewCustomer = (customer: Customer) => {
    setSelectedCustomer(customer)
    setShowModal(true)
  }

  const handleDeleteCustomer = async (customerId: string) => {
    if (confirm('Are you sure you want to delete this customer? This action cannot be undone.')) {
      try {
        const res = await fetch(`/api/admin/customers/${customerId}`, {
          method: 'DELETE'
        })
        if (res.ok) {
          fetchCustomers()
        }
      } catch (error) {
        console.error('Error deleting customer:', error)
      }
    }
  }

  const handleBlockCustomer = async (customerId: string, isBlocked: boolean) => {
    try {
      const res = await fetch('/api/admin/customers', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: customerId, isBlocked, reason: blockReason || customReason })
      })
      
      if (res.ok) {
        fetchCustomers()
        setShowBlockModal(false)
        setShowUnblockModal(false)
        setCustomerToBlock(null)
        setBlockReason('')
        setCustomReason('')
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  const openBlockModal = (customer: Customer) => {
    setCustomerToBlock(customer)
    if (customer.isBlocked) {
      setShowUnblockModal(true)
    } else {
      setShowBlockModal(true)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setSelectedCustomer(null)
  }

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    customer.email.toLowerCase().includes(searchTerm.toLowerCase())
  )

  // Pagination logic
  const totalPages = Math.ceil(filteredCustomers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentCustomers = filteredCustomers.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
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
          <h2 className="text-lg font-serif font-bold text-primary">All Customers ({filteredCustomers.length})</h2>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search customers..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-accent"
              />
            </div>
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
              {currentCustomers.map((customer) => (
                <tr key={customer._id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-4 px-6">
                    <div>
                      <p className="font-medium text-primary">{customer.name}</p>
                      <div className="text-sm text-gray-600">
                        {customer.email}
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-1">
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        customer.role === 'admin' 
                          ? 'bg-red-100 text-red-800' 
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {customer.role || 'customer'}
                      </span>
                      {customer.isBlocked && (
                        <span className="text-xs px-2 py-1 rounded-full bg-red-100 text-red-800">
                          Blocked
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700">
                      {customer.orderCount || 0}
                    </div>
                  </td>
                  <td className="py-4 px-6 font-bold text-primary">
                    ₹{customer.totalSpent?.toFixed(2) || '0.00'}
                  </td>
                  <td className="py-4 px-6">
                    <div className="text-gray-700">
                      {new Date(customer.createdAt).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => handleViewCustomer(customer)}
                        className="p-1 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-full transition-colors" 
                        title="View Details"
                      >
                        <Eye size={16} />
                      </button>
                      {customer.role !== 'admin' && (
                        <button 
                          onClick={() => openBlockModal(customer)}
                          className={`p-1 rounded-full transition-colors ${
                            customer.isBlocked 
                              ? 'text-gray-600 hover:text-green-600 hover:bg-green-50' 
                              : 'text-gray-600 hover:text-red-600 hover:bg-red-50'
                          }`}
                          title={customer.isBlocked ? 'Unblock Customer' : 'Block Customer'}
                        >
                          {customer.isBlocked ? <CheckCircle size={16} /> : <Ban size={16} />}
                        </button>
                      )}
                      <button 
                        onClick={() => handleDeleteCustomer(customer._id)}
                        className="p-1 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors" 
                        title="Delete Customer"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {currentCustomers.length === 0 && searchTerm && (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-gray-500">
                    No customers found matching "{searchTerm}"
                  </td>
                </tr>
              )}
            </tbody>
          </table>
          
          {filteredCustomers.length === 0 && !searchTerm && (
            <div className="text-center py-12">
              <User size={48} className="mx-auto mb-4 text-gray-300" />
              <p className="text-gray-500 mb-2">No customers found</p>
              <p className="text-sm text-gray-400">Customers will appear here when they register</p>
            </div>
          )}
        </div>
        
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-6 border-t border-border flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Showing {startIndex + 1} to {Math.min(endIndex, filteredCustomers.length)} of {filteredCustomers.length} customers
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Previous
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`px-3 py-1 border rounded text-sm ${
                    currentPage === page
                      ? 'bg-primary text-white border-primary'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  {page}
                </button>
              ))}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border border-gray-300 rounded text-sm disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Customer Details Modal */}
      {showModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                Customer Details - {selectedCustomer.name}
              </h3>
              <button onClick={closeModal} className="p-2 hover:bg-gray-100 rounded-sm">
                <X size={20} />
              </button>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div className="bg-white p-6 rounded-sm border border-gray-200">
                  <h4 className="font-bold text-black mb-6 flex items-center gap-2 text-lg">
                    <User size={18} className="text-black" />
                    Customer Profile
                  </h4>
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black uppercase tracking-wide mb-2 font-bold">Full Name</p>
                        <p className="font-bold text-xl text-black">{selectedCustomer.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-black uppercase tracking-wide mb-2 font-bold">Customer ID</p>
                        <p className="font-mono text-sm border-2 border-black px-3 py-2 rounded font-bold text-black">{selectedCustomer._id.slice(-8)}</p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black uppercase tracking-wide mb-2 font-bold">Email Address</p>
                        <p className="font-bold flex items-center gap-2 text-black">
                          <Mail size={14} className="text-black" />
                          {selectedCustomer.email}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-black uppercase tracking-wide mb-2 font-bold">Account Type</p>
                        <span className="inline-flex items-center px-4 py-2 rounded text-sm font-bold border-2 border-black text-black">
                          {selectedCustomer.role || 'customer'}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-black uppercase tracking-wide mb-2 font-bold">Member Since</p>
                        <p className="font-bold flex items-center gap-2 text-black">
                          <Calendar size={14} className="text-black" />
                          {new Date(selectedCustomer.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-black uppercase tracking-wide mb-2 font-bold">Account Status</p>
                        <span className={`inline-flex items-center px-4 py-2 rounded text-sm font-bold border-2 ${
                          selectedCustomer.isBlocked 
                            ? 'border-red-500 text-red-600 bg-red-50' 
                            : 'border-black text-black'
                        }`}>
                          {selectedCustomer.isBlocked ? 'Blocked' : 'Active'}
                        </span>
                      </div>
                    </div>
                    {selectedCustomer.address && (
                      <div className="pt-4 border-t border-gray-200">
                        <div className="flex items-center gap-2 mb-3">
                          <MapPin size={16} className="text-black" />
                          <p className="text-xs text-black uppercase tracking-wide font-bold">Shipping Address</p>
                        </div>
                        <div className="bg-gray-100 p-4 rounded border border-gray-200">
                          {selectedCustomer.address.street && <p className="font-bold text-black">{selectedCustomer.address.street}</p>}
                          {(selectedCustomer.address.city || selectedCustomer.address.state || selectedCustomer.address.zipCode) && (
                            <p className="text-black font-medium">
                              {selectedCustomer.address.city}{selectedCustomer.address.city && selectedCustomer.address.state ? ', ' : ''}
                              {selectedCustomer.address.state} {selectedCustomer.address.zipCode}
                            </p>
                          )}
                          {selectedCustomer.address.country && <p className="text-black text-sm font-medium">{selectedCustomer.address.country}</p>}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Order Statistics */}
                <div className="bg-white p-6 rounded-sm border border-gray-200">
                  <h4 className="font-bold text-black mb-6 flex items-center gap-2 text-lg">
                    <ShoppingBag size={18} className="text-black" />
                    Purchase History
                  </h4>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="text-center p-6 border-2 border-black rounded">
                      <div className="text-4xl font-bold text-black mb-2">{selectedCustomer.orderCount || 0}</div>
                      <div className="text-xs text-black uppercase tracking-wider font-bold">Total Orders</div>
                    </div>
                    <div className="text-center p-6 border-2 border-black rounded">
                      <div className="text-4xl font-bold text-black mb-2">₹{selectedCustomer.totalSpent?.toFixed(2) || '0.00'}</div>
                      <div className="text-xs text-black uppercase tracking-wider font-bold">Total Spent</div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-4 mb-6">
                    <div className="text-center p-4 border-2 border-black rounded">
                      <div className="text-2xl font-bold text-black mb-1">₹{selectedCustomer.totalSpent && selectedCustomer.orderCount ? (selectedCustomer.totalSpent / selectedCustomer.orderCount).toFixed(2) : '0.00'}</div>
                      <div className="text-xs text-black uppercase tracking-wider font-bold">Avg Order</div>
                    </div>
                  </div>
                  
                  {/* Recent Orders */}
                  {selectedCustomer.recentOrders && selectedCustomer.recentOrders.length > 0 && (
                    <div>
                      <h5 className="font-bold text-sm mb-4 text-black">Recent Orders</h5>
                      <div className="space-y-3">
                        {selectedCustomer.recentOrders.slice(0, 3).map((order: any) => (
                          <div key={order._id} className="flex justify-between items-center p-4 bg-gray-100 rounded border border-gray-200 text-sm">
                            <div>
                              <span className="font-bold text-black">#{order._id.slice(-8)}</span>
                              <span className="text-black ml-3 font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className={`px-3 py-1 rounded text-xs font-bold ${
                                order.status === 'delivered' ? 'bg-black text-white' :
                                order.status === 'shipped' ? 'bg-gray-800 text-white' :
                                order.status === 'processing' ? 'bg-gray-600 text-white' :
                                'bg-gray-400 text-white'
                              }`}>
                                {order.status || 'pending'}
                              </span>
                              <span className="font-bold text-black">₹{order.totalAmount?.toFixed(2) || '0.00'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Block Customer Modal */}
      {showBlockModal && customerToBlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold text-red-600 flex items-center gap-2">
                ⚠️ Block Customer
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-4">
                Shu tame aa customer ne block karva mangcho?
              </p>
              <div className="mb-4">
                <label className="block text-sm font-bold text-gray-700 mb-2">Reason (Required):</label>
                <div className="space-y-2">
                  {['Fake orders', 'Payment issue', 'Return abuse', 'Fraud activity'].map((reason) => (
                    <label key={reason} className="flex items-center">
                      <input
                        type="radio"
                        name="blockReason"
                        value={reason}
                        checked={blockReason === reason}
                        onChange={(e) => setBlockReason(e.target.value)}
                        className="mr-2"
                      />
                      <span className="text-sm">{reason}</span>
                    </label>
                  ))}
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="blockReason"
                      value="other"
                      checked={blockReason === 'other'}
                      onChange={(e) => setBlockReason(e.target.value)}
                      className="mr-2"
                    />
                    <span className="text-sm">Other</span>
                  </label>
                  {blockReason === 'other' && (
                    <input
                      type="text"
                      placeholder="Enter custom reason"
                      value={customReason}
                      onChange={(e) => setCustomReason(e.target.value)}
                      className="w-full mt-2 px-3 py-2 border border-gray-300 rounded text-sm"
                    />
                  )}
                </div>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBlockCustomer(customerToBlock._id, true)}
                  disabled={!blockReason || (blockReason === 'other' && !customReason)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded font-medium hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  🔴 Yes, Block Customer
                </button>
                <button
                  onClick={() => {
                    setShowBlockModal(false)
                    setCustomerToBlock(null)
                    setBlockReason('')
                    setCustomReason('')
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-400"
                >
                  ⚪ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Unblock Customer Modal */}
      {showUnblockModal && customerToBlock && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-sm w-full max-w-md">
            <div className="p-6 border-b border-border">
              <h3 className="text-lg font-bold text-green-600 flex items-center gap-2">
                🔓 Unblock Customer
              </h3>
            </div>
            <div className="p-6">
              <p className="text-gray-700 mb-6">
                Shu tame aa customer ne unblock karva mangcho?
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => handleBlockCustomer(customerToBlock._id, false)}
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded font-medium hover:bg-green-700"
                >
                  🟢 Unblock
                </button>
                <button
                  onClick={() => {
                    setShowUnblockModal(false)
                    setCustomerToBlock(null)
                  }}
                  className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-400"
                >
                  ⚪ Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
    </AdminAuthWrapper>
  )
}
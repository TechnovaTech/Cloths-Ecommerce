"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, CreditCard, Lock, Truck } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"

const cartItems = [
  {
    id: 1,
    name: "Minimalist Wool Overcoat",
    price: 590,
    size: "M",
    color: "Charcoal",
    quantity: 1,
    image: "/minimal-wool-coat-front.jpg",
  },
  {
    id: 2,
    name: "Silk Blend Evening Shirt",
    price: 240,
    size: "L",
    color: "White",
    quantity: 2,
    image: "/silk-shirt-front.jpg",
  },
]

export default function CheckoutPage() {
  const [step, setStep] = React.useState(1)
  const [isPlacingOrder, setIsPlacingOrder] = React.useState(false)
  const { user } = useAuth()
  const { cart, cartTotal, clearCart } = useCart()
  const [formData, setFormData] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  })

  const handlePlaceOrder = async () => {
    if (!user) {
      alert('Please log in to place an order')
      return
    }

    // Validate form data
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
      alert('Please fill in all shipping information')
      setStep(1)
      return
    }

    if (cart.length === 0) {
      alert('Your cart is empty')
      return
    }

    setIsPlacingOrder(true)
    try {
      const token = localStorage.getItem('token')
      const orderData = {
        items: cart.map(item => ({
          product: item._id,
          quantity: item.quantity,
          size: item.size,
          color: item.color,
          price: item.price
        })),
        totalAmount: total,
        shippingAddress: {
          street: formData.address,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: 'US'
        },
        paymentMethod: 'card',
        paymentStatus: 'paid'
      }

      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(orderData)
      })

      console.log('Order response status:', response.status)
      const responseData = await response.json()
      console.log('Order response data:', responseData)

      if (response.ok) {
        clearCart()
        alert('Order placed successfully!')
        window.location.href = '/profile'
      } else {
        console.error('Order failed:', responseData)
        alert(`Failed to place order: ${responseData.error || 'Unknown error'}`)
      }
    } catch (error) {
      console.error('Error placing order:', error)
      alert('Failed to place order. Please try again.')
    } finally {
      setIsPlacingOrder(false)
    }
  }

  // Auto-fill user data when component mounts
  React.useEffect(() => {
    if (user) {
      const nameParts = user.name.split(' ')
      setFormData(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user.email || ''
      }))
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const shipping = cartTotal > 300 ? 0 : 25
  const tax = Math.round(cartTotal * 0.08)
  const total = cartTotal + shipping + tax

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-[#FAFAFA] min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <Link 
            href="/cart" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition mb-8"
          >
            <ArrowLeft size={16} />
            Back to Cart
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Checkout</h1>
          
          {/* Progress Steps */}
          <div className="flex items-center gap-4 mb-8">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= num ? 'bg-primary text-white' : 'bg-white border border-border text-muted-foreground'
                }`}>
                  {num}
                </div>
                {num < 3 && <div className={`w-12 h-0.5 mx-2 ${step > num ? 'bg-primary' : 'bg-border'}`} />}
              </div>
            ))}
          </div>
          <div className="flex gap-8 text-xs uppercase tracking-[0.2em] text-muted-foreground">
            <span className={step >= 1 ? 'text-primary font-bold' : ''}>Shipping</span>
            <span className={step >= 2 ? 'text-primary font-bold' : ''}>Payment</span>
            <span className={step >= 3 ? 'text-primary font-bold' : ''}>Review</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="bg-white rounded-lg shadow-sm border border-border p-8">
                <h2 className="text-2xl font-serif italic mb-8">Shipping Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">First Name</label>
                    <input 
                      type="text" 
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">Last Name</label>
                    <input 
                      type="text" 
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" 
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">Email Address</label>
                  <input 
                    type="email" 
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" 
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">Address</label>
                  <input 
                    type="text" 
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" 
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">City</label>
                    <input 
                      type="text" 
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">State</label>
                    <select 
                      value={formData.state}
                      onChange={(e) => handleInputChange('state', e.target.value)}
                      className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none"
                    >
                      <option value="">Select State</option>
                      <option value="CA">California</option>
                      <option value="NY">New York</option>
                      <option value="TX">Texas</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">ZIP Code</label>
                    <input 
                      type="text" 
                      value={formData.zipCode}
                      onChange={(e) => handleInputChange('zipCode', e.target.value)}
                      className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" 
                    />
                  </div>
                </div>

                <button 
                  onClick={() => {
                    if (!formData.firstName || !formData.lastName || !formData.email || !formData.address || !formData.city || !formData.state || !formData.zipCode) {
                      alert('Please fill in all required fields')
                      return
                    }
                    setStep(2)
                  }}
                  className="w-full bg-primary text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition"
                >
                  Continue to Payment
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="bg-white rounded-lg shadow-sm border border-border p-8">
                <h2 className="text-2xl font-serif italic mb-8">Payment Information</h2>
                
                <div className="mb-6">
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">Card Number</label>
                  <div className="relative">
                    <input type="text" placeholder="1234 5678 9012 3456" className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none pr-12" />
                    <CreditCard size={20} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">Expiry Date</label>
                    <input type="text" placeholder="MM/YY" className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">CVV</label>
                    <input type="text" placeholder="123" className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" />
                  </div>
                </div>

                <div className="mb-8">
                  <label className="block text-xs uppercase tracking-[0.2em] font-bold mb-2">Cardholder Name</label>
                  <input type="text" className="w-full p-3 border border-border rounded-sm focus:border-primary focus:outline-none" />
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(1)}
                    className="flex-1 border border-border py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-50 smooth-transition"
                  >
                    Back
                  </button>
                  <button 
                    onClick={() => setStep(3)}
                    className="flex-1 bg-primary text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition"
                  >
                    Review Order
                  </button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="bg-white rounded-lg shadow-sm border border-border p-8">
                <h2 className="text-2xl font-serif italic mb-8">Review Your Order</h2>
                
                <div className="space-y-6 mb-8">
                  {cart.map((item) => (
                    <div key={item._id} className="flex gap-4 pb-6 border-b border-border last:border-0">
                      <div className="w-20 h-24 bg-[#F2F2F2] rounded-sm overflow-hidden">
                        <Image src={item.image} alt={item.name} width={80} height={96} className="object-cover w-full h-full" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-serif text-lg mb-1">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">
                          {item.size && `Size: ${item.size}`}
                          {item.color && ` | Color: ${item.color}`}
                        </p>
                        <div className="flex justify-between">
                          <span className="text-sm">Qty: {item.quantity}</span>
                          <span className="font-medium">${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button 
                    onClick={() => setStep(2)}
                    className="flex-1 border border-border py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-50 smooth-transition"
                  >
                    Back
                  </button>
                  <button 
                    onClick={handlePlaceOrder}
                    disabled={isPlacingOrder}
                    className="flex-1 bg-primary text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Lock size={16} />
                    {isPlacingOrder ? 'Placing Order...' : 'Place Order'}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-32 bg-white rounded-lg shadow-sm border border-border p-8">
              <h3 className="text-xl font-serif italic mb-6">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal</span>
                  <span className="text-sm">${cartTotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Shipping</span>
                  <span className="text-sm">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Tax</span>
                  <span className="text-sm">${tax}</span>
                </div>
                <div className="border-t border-border pt-4">
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 text-center">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Lock size={14} />
                  Secure 256-bit SSL encryption
                </div>
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <Truck size={14} />
                  Free shipping on orders over $300
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Minus, Plus, X, ArrowLeft } from "lucide-react"
import { cn } from "@/lib/utils"

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
  {
    id: 3,
    name: "Cashmere Turtleneck",
    price: 450,
    size: "S",
    color: "Black",
    quantity: 1,
    image: "/cashmere-knit-front.jpg",
  },
]

export default function CartPage() {
  const [items, setItems] = React.useState(cartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity === 0) {
      setItems(items.filter(item => item.id !== id))
    } else {
      setItems(items.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      ))
    }
  }

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = subtotal > 300 ? 0 : 25
  const total = subtotal + shipping

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-screen-xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <Link 
            href="/shop" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition mb-8"
          >
            <ArrowLeft size={16} />
            Continue Shopping
          </Link>
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Shopping Cart</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} in your cart
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
            <h2 className="text-2xl font-serif italic mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Discover our curated collection of premium essentials</p>
            <Link 
              href="/shop"
              className="inline-block px-8 py-3 bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition"
            >
              Shop Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-8">
              {items.map((item) => (
                <div key={item.id} className="flex gap-6 pb-8 border-b border-border">
                  <div className="relative w-32 h-40 bg-[#F2F2F2] rounded-sm overflow-hidden flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="text-xl font-serif italic mb-2">{item.name}</h3>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Size: {item.size}</p>
                          <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 hover:text-red-500 smooth-transition"
                      >
                        <X size={18} />
                      </button>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary smooth-transition"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-border flex items-center justify-center hover:border-primary smooth-transition"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="text-lg font-medium">${item.price * item.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-32 bg-[#FAFAFA] p-8 rounded-sm">
                <h2 className="text-xl font-serif italic mb-8">Order Summary</h2>
                
                <div className="space-y-4 mb-8">
                  <div className="flex justify-between">
                    <span className="text-sm">Subtotal</span>
                    <span className="text-sm">${subtotal}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Shipping</span>
                    <span className="text-sm">{shipping === 0 ? 'Free' : `$${shipping}`}</span>
                  </div>
                  {shipping === 0 && (
                    <p className="text-xs text-green-600">Free shipping on orders over $300</p>
                  )}
                  <div className="border-t border-border pt-4">
                    <div className="flex justify-between font-medium">
                      <span>Total</span>
                      <span>${total}</span>
                    </div>
                  </div>
                </div>

                <button className="w-full bg-primary text-white py-4 text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition mb-4">
                  Proceed to Checkout
                </button>
                
                <div className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">Secure checkout powered by Stripe</p>
                  <div className="flex justify-center gap-2">
                    <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">VISA</div>
                    <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">MC</div>
                    <div className="w-8 h-5 bg-gray-200 rounded text-xs flex items-center justify-center">AMEX</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
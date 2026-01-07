"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart, ArrowRight } from "lucide-react"
import { useState, useEffect } from "react"

interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  stock: number
  featured: boolean
  offerTag?: string
  discount?: number
  discountType?: string
}

export function NewArrivals() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          // Get latest products (sort by createdAt descending) and limit to 4
          const latestProducts = data
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .slice(0, 4)
          setProducts(latestProducts)
        }
      } catch (error) {
        console.error('Error fetching new arrivals:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchNewArrivals()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-white">
        <div className="px-6 md:px-12 text-center">
          <p className="text-gray-500">Loading new arrivals...</p>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-24 bg-white">
        <div className="px-6 md:px-12 text-center max-w-screen-2xl mx-auto">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold mb-4 block">Fresh</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">New Arrivals</h2>
          <p className="text-gray-700 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            The latest products added to our collection will automatically appear here.
          </p>
          <Link
            href="/admin/products"
            className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent smooth-transition font-semibold"
          >
            Add New Arrivals
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-white">
      <div className="px-6 md:px-12 max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-end mb-16">
          <div>
            <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold mb-4 block">Fresh</span>
            <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">New Arrivals</h2>
            <p className="text-gray-700 max-w-lg text-sm leading-relaxed">
              Discover the latest additions to our collection, featuring the most recently added products with contemporary designs and premium craftsmanship.
            </p>
          </div>
          <Link
            href="/shop"
            className="hidden md:flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent smooth-transition font-semibold group"
          >
            View All
            <ArrowRight size={16} className="group-hover:translate-x-1 smooth-transition" />
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, i) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="group"
            >
              <Link href={`/shop/${product._id}`}>
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg mb-4 bg-gray-50">
                  <Image
                    src={product.images?.[0] || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-all duration-500 group-hover:scale-105"
                  />
                  
                  {/* Discount badge */}
                  {product.discount && product.discount > 0 && (
                    <div className="absolute top-4 left-4">
                      <span className="bg-accent text-white text-xs px-3 py-1 rounded-full font-medium">
                        {product.discountType === 'percentage' ? `${product.discount}% OFF` : `₹${product.discount} OFF`}
                      </span>
                    </div>
                  )}

                  {/* Stock Status */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                      <span className="text-white text-sm font-medium">Out of Stock</span>
                    </div>
                  )}

                  {/* Hover Actions */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300">
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                      <button className="p-2 bg-white rounded-full shadow-lg hover:bg-gray-50 transition-colors">
                        <Heart size={16} />
                      </button>
                    </div>
                    
                    <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                      <button 
                        className="w-full bg-white text-black py-3 text-xs uppercase tracking-wider font-bold rounded-lg hover:bg-black hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50"
                        disabled={product.stock === 0}
                      >
                        <ShoppingBag size={14} />
                        {product.stock === 0 ? 'Out of Stock' : 'Quick Add'}
                      </button>
                    </div>
                  </div>
                </div>
              </Link>

              {/* Product Info */}
              <div className="space-y-2">
                <p className="text-xs uppercase tracking-wider text-black font-medium">
                  {product.category}
                </p>
                <h3 className="text-xl font-bold leading-tight group-hover:text-accent transition-colors">
                  {product.name}
                </h3>
                <div className="flex items-center justify-between">
                  {/* Price with discount */}
                  {product.discount && product.discount > 0 ? (
                    <div className="flex items-center gap-2">
                      <p className="text-lg font-bold text-black">
                        ₹{
                          product.discountType === 'percentage' 
                            ? (product.price - (product.price * product.discount / 100)).toFixed(0)
                            : (product.price - product.discount).toFixed(0)
                        }
                      </p>
                      <p className="text-sm text-gray-500 line-through font-medium">
                        ₹{product.price}
                      </p>
                    </div>
                  ) : (
                    <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
                  )}
                  
                  <div className="flex gap-1">
                    <div className="w-2 h-2 rounded-full bg-black"></div>
                    <div className="w-2 h-2 rounded-full bg-gray-300"></div>
                    <div className="w-2 h-2 rounded-full bg-accent"></div>
                  </div>
                </div>
                {product.stock <= 5 && product.stock > 0 && (
                  <p className="text-xs text-orange-600 font-medium">Only {product.stock} left</p>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile View All Button */}
        <div className="md:hidden text-center mt-12">
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-widest hover:text-accent smooth-transition font-semibold group"
          >
            View All New Arrivals
            <ArrowRight size={16} className="group-hover:translate-x-1 smooth-transition" />
          </Link>
        </div>
      </div>
    </section>
  )
}
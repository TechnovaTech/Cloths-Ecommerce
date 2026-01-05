"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { ShoppingBag, Heart } from "lucide-react"
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

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch('/api/products')
        if (res.ok) {
          const data = await res.json()
          const featuredProducts = data.filter((product: Product) => product.featured).slice(0, 3)
          setProducts(featuredProducts)
        }
      } catch (error) {
        console.error('Error fetching featured products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFeaturedProducts()
  }, [])

  if (loading) {
    return (
      <section className="py-24 bg-[#F2F2F2]">
        <div className="px-6 md:px-12 text-center">
          <p className="text-gray-500">Loading featured products...</p>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return (
      <section className="py-24 bg-[#F2F2F2]">
        <div className="px-6 md:px-12 text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold mb-4 block">Essentials</span>
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Seasonal Favorites</h2>
          <p className="text-gray-700 max-w-xl mx-auto text-sm leading-relaxed mb-8">
            Mark products as featured in the admin panel to display them here.
          </p>
          <Link
            href="/admin/products"
            className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent smooth-transition font-semibold"
          >
            Add Featured Products
          </Link>
        </div>
      </section>
    )
  }

  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="px-6 md:px-12 text-center mb-20">
        <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold mb-4 block">Essentials</span>
        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-6">Featured Collection</h2>
        <p className="text-gray-700 max-w-xl mx-auto text-sm leading-relaxed">
          Discover our most coveted pieces, crafted with meticulous attention to detail and premium fabrics for the
          modern wardrobe.
        </p>
      </div>

      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-screen-2xl mx-auto">
        {products.map((product, i) => (
          <motion.div
            key={product._id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <Link href={`/shop/${product._id}`}>
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
                <Image
                  src={product.images?.[0] || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                />
                {product.images?.[1] && (
                  <Image
                    src={product.images[1]}
                    alt={`${product.name} view 2`}
                    fill
                    className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                )}

                {/* Discount badge */}
                {product.discount && product.discount > 0 && (
                  <span className="absolute top-6 left-6 px-3 py-1 bg-accent text-white text-[9px] uppercase tracking-widest font-bold rounded-full">
                    {product.discountType === 'percentage' ? `${product.discount}% OFF` : `$${product.discount} OFF`}
                  </span>
                )}

                {product.stock === 0 && (
                  <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                    <span className="text-white text-sm font-medium">Out of Stock</span>
                  </div>
                )}

                <button className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                  <Heart size={16} strokeWidth={1.5} />
                </button>

                <div className="absolute inset-x-0 bottom-8 px-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                  <button 
                    className="w-full bg-primary text-primary-foreground py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-colors disabled:opacity-50"
                    disabled={product.stock === 0}
                  >
                    <ShoppingBag size={14} />
                    {product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </Link>

            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="text-lg font-serif mb-1">{product.name}</h3>
                
                {/* Price with discount */}
                {product.discount && product.discount > 0 ? (
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-bold text-red-600">
                      ${
                        product.discountType === 'percentage' 
                          ? (product.price - (product.price * product.discount / 100)).toFixed(0)
                          : (product.price - product.discount).toFixed(0)
                      }
                    </p>
                    <p className="text-xs text-gray-500 line-through">
                      ${product.price}
                    </p>
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground uppercase tracking-widest mb-1">${product.price}</p>
                )}
              </div>
              <div className="flex gap-1 mt-1">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <div className="w-2 h-2 rounded-full bg-accent" />
                <div className="w-2 h-2 rounded-full bg-white border border-border" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

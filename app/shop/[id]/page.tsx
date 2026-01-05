"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingBag, Heart, ChevronRight, Ruler } from "lucide-react"
import { cn } from "@/lib/utils"
import { useParams, useRouter } from "next/navigation"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"

interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  sizes?: string[]
  stock: number
  featured: boolean
  discount?: number
  discountType?: string
}

export default function ProductPage() {
  const params = useParams()
  const router = useRouter()
  const [product, setProduct] = React.useState<Product | null>(null)
  const [loading, setLoading] = React.useState(true)
  const [selectedSize, setSelectedSize] = React.useState("")
  const [activeImage, setActiveImage] = React.useState(0)
  const [showSuccessMessage, setShowSuccessMessage] = React.useState(false)
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const { addToCart } = useCart()

  const handleWishlistToggle = () => {
    if (!product) return
    
    if (isInWishlist(product._id)) {
      removeFromWishlist(product._id)
    } else {
      addToWishlist({
        _id: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0] || '/placeholder.svg'
      })
    }
  }

  const handleAddToCart = () => {
    if (!product) return
    
    const finalPrice = product.discount && product.discount > 0 
      ? product.discountType === 'percentage' 
        ? product.price - (product.price * product.discount / 100)
        : product.price - product.discount
      : product.price
    
    addToCart({
      _id: product._id,
      name: product.name,
      price: finalPrice,
      image: product.images?.[0] || '/placeholder.svg',
      size: selectedSize
    })
    
    // Show success message
    setShowSuccessMessage(true)
    setTimeout(() => setShowSuccessMessage(false), 3000)
  }

  React.useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`/api/products/${params.id}`)
        if (res.ok) {
          const data = await res.json()
          setProduct(data)
          if (data.sizes && data.sizes.length > 0) {
            setSelectedSize(data.sizes[0])
          }
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="pt-24 pb-24 bg-background min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading product...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="pt-24 pb-24 bg-background min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    )
  }

  return (
    <div className="pt-24 pb-24 bg-background min-h-screen">
      {/* Breadcrumbs */}
      <nav className="px-6 md:px-12 py-8 max-w-screen-2xl mx-auto flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground">
        <a href="/" className="hover:text-primary smooth-transition">
          Home
        </a>
        <ChevronRight size={10} />
        <a href="/shop" className="hover:text-primary smooth-transition">
          Shop
        </a>
        <ChevronRight size={10} />
        <span className="text-primary font-bold">{product.name}</span>
      </nav>

      <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row gap-16">
        {/* Image Gallery */}
        <div className="lg:w-3/5 flex flex-col md:flex-row gap-6">
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="order-2 md:order-1 flex md:flex-col gap-4 overflow-x-auto no-scrollbar">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative w-20 h-28 flex-shrink-0 rounded-sm overflow-hidden border smooth-transition",
                    activeImage === i
                      ? "border-primary opacity-100 scale-105"
                      : "border-transparent opacity-60 hover:opacity-100",
                  )}
                >
                  <Image src={img || "/placeholder.svg"} alt={`View ${i + 1}`} fill className="object-cover" />
                </button>
              ))}
            </div>
          )}

          {/* Main Image */}
          <div className="order-1 md:order-2 flex-grow relative aspect-[3/4] bg-[#F2F2F2] rounded-sm overflow-hidden group">
            <motion.div
              key={activeImage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="w-full h-full"
            >
              <Image
                src={product.images?.[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <button 
              onClick={handleWishlistToggle}
              className={cn(
                "absolute top-6 right-6 p-3 backdrop-blur-md rounded-full smooth-transition",
                isInWishlist(product._id) 
                  ? "bg-red-500 text-white" 
                  : "bg-white/80 hover:bg-white"
              )}
            >
              <Heart 
                size={20} 
                strokeWidth={1} 
                fill={isInWishlist(product._id) ? "currentColor" : "none"}
              />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="lg:w-2/5 lg:sticky lg:top-32 h-fit">
          <div className="mb-10">
            <p className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-4">{product.category}</p>
            <h1 className="text-4xl md:text-5xl font-serif italic mb-6 leading-tight">{product.name}</h1>
            <p className="text-2xl font-light tracking-widest mb-8">${product.price}.00</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{product.description}</p>
            
            {/* Price with discount */}
            <div className="mb-8">
              {product.discount && product.discount > 0 ? (
                <div className="flex items-center gap-4 mb-2">
                  <span className="text-3xl font-light tracking-widest text-red-600">
                    ${
                      product.discountType === 'percentage' 
                        ? (product.price - (product.price * product.discount / 100)).toFixed(0)
                        : (product.price - product.discount).toFixed(0)
                    }.00
                  </span>
                  <span className="text-xl text-gray-500 line-through">
                    ${product.price}.00
                  </span>
                  <span className="bg-accent text-white text-sm px-3 py-1 rounded-full font-bold">
                    {product.discountType === 'percentage' ? `${product.discount}% OFF` : `$${product.discount} OFF`}
                  </span>
                </div>
              ) : (
                <p className="text-3xl font-light tracking-widest mb-8">${product.price}.00</p>
              )}
            </div>
          </div>

          {/* Size Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold">Size</h3>
                <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] hover:text-accent smooth-transition">
                  <Ruler size={14} /> Size Guide
                </button>
              </div>
              <div className="grid grid-cols-5 gap-3">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={cn(
                      "py-3 border text-xs smooth-transition",
                      selectedSize === size
                        ? "bg-primary text-white border-primary"
                        : "border-border hover:border-primary",
                    )}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="space-y-4 mb-16">
            <button 
              onClick={handleAddToCart}
              className="w-full bg-primary text-primary-foreground py-5 text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all duration-500 transform active:scale-[0.98] disabled:opacity-50"
              disabled={product.stock === 0}
            >
              <ShoppingBag size={18} />
              {product.stock === 0 ? 'Out of Stock' : 'Add to Bag'}
            </button>
          </div>
        </div>
      </div>

      {/* Success Message Popup */}
      {showSuccessMessage && (
        <div className="fixed bottom-6 right-6 bg-white text-black px-6 py-4 rounded-sm shadow-lg border-2 border-[#c2a875] z-50 animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center gap-3">
            <ShoppingBag size={20} />
            <span className="font-medium">Product added to cart successfully!</span>
          </div>
        </div>
      )}
    </div>
  )
}

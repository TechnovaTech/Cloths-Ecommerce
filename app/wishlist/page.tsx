"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"

interface Product {
  _id: string
  name: string
  price: number
  category?: string
  images: string[]
  colors?: string[]
  stock?: number
  discount?: number
  discountType?: string
}

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchWishlistProducts = async () => {
      if (wishlist.length === 0) {
        setLoading(false)
        return
      }

      try {
        const productIds = wishlist.map(item => item._id)
        const response = await fetch('/api/products/wishlist', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ productIds }),
        })

        if (response.ok) {
          const data = await response.json()
          setProducts(data.products || [])
        }
      } catch (error) {
        console.error('Error fetching wishlist products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWishlistProducts()
  }, [wishlist])

  const handleRemoveItem = (id: string) => {
    removeFromWishlist(id)
  }

  const moveToCart = (product: Product) => {
    addToCart({
      _id: product._id,
      name: product.name,
      price: calculateDiscountedPrice(product.price, product.discount, product.discountType),
      image: product.images[0] || '/placeholder.jpg'
    })
    // Optionally remove from wishlist after adding to cart
    // removeFromWishlist(product._id)
  }

  const clearWishlist = () => {
    products.forEach(product => removeFromWishlist(product._id))
  }

  const calculateDiscountedPrice = (price: number, discount?: number, discountType?: string) => {
    if (!discount) return price
    if (discountType === 'percentage') {
      return price - (price * discount / 100)
    }
    return price - discount
  }

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading your wishlist...</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Wishlist</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
            {products.length} {products.length === 1 ? 'Item' : 'Items'} saved for later
          </p>
        </div>

        {products.length === 0 ? (
          <div className="bg-white rounded-lg shadow-sm border border-border p-12 text-center">
            <Heart size={48} className="mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-2xl font-serif italic mb-4">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-8">Save items you love to purchase later</p>
            <Link 
              href="/shop"
              className="inline-block px-8 py-3 bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition"
            >
              Discover Collection
            </Link>
          </div>
        ) : (
          <div>
            {/* Actions Bar */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-6 mb-8">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-6">
                  <button 
                    onClick={() => products.forEach(product => moveToCart(product))}
                    className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary smooth-transition"
                  >
                    Move All to Cart
                  </button>
                  <button 
                    onClick={clearWishlist}
                    className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-red-500 smooth-transition"
                  >
                    Clear Wishlist
                  </button>
                </div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                  Total Value: ${products.reduce((sum, product) => sum + calculateDiscountedPrice(product.price, product.discount, product.discountType), 0).toFixed(2)}
                </p>
              </div>
            </div>

            {/* Wishlist Grid */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => {
                const discountedPrice = calculateDiscountedPrice(product.price, product.discount, product.discountType)
                const isInStock = (product.stock || 0) > 0
                
                return (
                <div key={product._id} className="group relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => handleRemoveItem(product._id)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition hover:bg-white"
                  >
                    <X size={16} />
                  </button>

                  {/* Product Image */}
                  <Link href={`/shop/${product._id}`} className="block relative aspect-[3/4] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
                    <Image
                      src={product.images[0] || '/placeholder.jpg'}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    {product.images[1] && (
                      <Image
                        src={product.images[1]}
                        alt={product.name}
                        fill
                        className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    )}
                    
                    {/* Stock Status */}
                    {!isInStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs uppercase tracking-[0.2em] font-bold">Out of Stock</span>
                      </div>
                    )}
                    
                    {/* Discount Badge */}
                    {product.discount && (
                      <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded">
                        {product.discountType === 'percentage' ? `${product.discount}% OFF` : `$${product.discount} OFF`}
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {product.category || 'Fashion'}
                    </p>
                    <h3 className="text-xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                      {product.name}
                    </h3>
                    <div className="mb-4">
                      {product.discount ? (
                        <div className="flex items-center justify-center gap-2">
                          <span className="text-sm font-medium tracking-widest text-red-500">
                            ${discountedPrice.toFixed(2)}
                          </span>
                          <span className="text-sm text-gray-400 line-through">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <p className="text-sm font-medium tracking-widest">${product.price.toFixed(2)}</p>
                      )}
                    </div>

                    {/* Colors */}
                    {product.colors && product.colors.length > 0 && (
                      <div className="flex justify-center gap-1 mb-6">
                        {product.colors.map((color, index) => (
                          <div
                            key={index}
                            className="w-2 h-2 rounded-full border border-black/5"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>
                    )}

                    {/* Action Button */}
                    <button
                      onClick={() => moveToCart(product)}
                      disabled={!isInStock}
                      className={cn(
                        "w-full py-3 text-xs uppercase tracking-[0.2em] font-bold smooth-transition flex items-center justify-center gap-2",
                        isInStock
                          ? "bg-primary text-white hover:bg-accent"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <ShoppingBag size={14} />
                      {isInStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
                )
              })}
              </div>
            </div>

            {/* Recommendations */}
            <div className="bg-white rounded-lg shadow-sm border border-border p-8 mt-8">
              <h2 className="text-3xl font-serif italic mb-8 text-center">You might also like</h2>
              <div className="text-center">
                <Link 
                  href="/shop"
                  className="inline-block px-8 py-3 border border-primary text-primary text-xs uppercase tracking-[0.2em] font-bold hover:bg-primary hover:text-white smooth-transition"
                >
                  Explore Similar Items
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
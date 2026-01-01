"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { Heart, ShoppingBag, X } from "lucide-react"
import { cn } from "@/lib/utils"

const wishlistItems = [
  {
    id: 1,
    name: "Minimalist Wool Overcoat",
    price: 590,
    category: "Outerwear",
    image: "/minimal-wool-coat-front.jpg",
    hoverImage: "/minimal-wool-coat-back.jpg",
    colors: ["#111111", "#6B6B6B", "#C2A875"],
    inStock: true,
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    price: 450,
    category: "Knitwear",
    image: "/cashmere-knit-front.jpg",
    hoverImage: "/cashmere-knit-detail.jpg",
    colors: ["#111111", "#C2A875", "#9FB8A0"],
    inStock: true,
  },
  {
    id: 5,
    name: "Leather Chelsea Boots",
    price: 480,
    category: "Footwear",
    image: "/leather-boots-front.jpg",
    hoverImage: "/leather-boots-detail.jpg",
    colors: ["#111111", "#3D2B1F"],
    inStock: false,
  },
  {
    id: 6,
    name: "Linen Utility Jacket",
    price: 380,
    category: "Outerwear",
    image: "/linen-jacket-front.jpg",
    hoverImage: "/linen-jacket-detail.jpg",
    colors: ["#9FB8A0", "#C2A875"],
    inStock: true,
  },
]

export default function WishlistPage() {
  const [items, setItems] = React.useState(wishlistItems)

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id))
  }

  const moveToCart = (id: number) => {
    // In a real app, this would add to cart and optionally remove from wishlist
    console.log(`Moving item ${id} to cart`)
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      <div className="max-w-screen-2xl mx-auto">
        {/* Header */}
        <div className="mb-16">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Wishlist</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
            {items.length} {items.length === 1 ? 'Item' : 'Items'} saved for later
          </p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24">
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
          <>
            {/* Actions Bar */}
            <div className="flex justify-between items-center mb-12 pb-6 border-b border-border">
              <div className="flex items-center gap-6">
                <button className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-primary smooth-transition">
                  Move All to Cart
                </button>
                <button className="text-xs uppercase tracking-[0.2em] font-bold text-muted-foreground hover:text-red-500 smooth-transition">
                  Clear Wishlist
                </button>
              </div>
              <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
                Total Value: ${items.reduce((sum, item) => sum + item.price, 0)}
              </p>
            </div>

            {/* Wishlist Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {items.map((item) => (
                <div key={item.id} className="group relative">
                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="absolute top-4 right-4 z-10 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 smooth-transition hover:bg-white"
                  >
                    <X size={16} />
                  </button>

                  {/* Product Image */}
                  <Link href={`/shop/${item.id}`} className="block relative aspect-[3/4] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    <Image
                      src={item.hoverImage}
                      alt={item.name}
                      fill
                      className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                    
                    {/* Stock Status */}
                    {!item.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-xs uppercase tracking-[0.2em] font-bold">Out of Stock</span>
                      </div>
                    )}
                  </Link>

                  {/* Product Info */}
                  <div className="text-center">
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                      {item.name}
                    </h3>
                    <p className="text-sm font-medium tracking-widest mb-4">${item.price}</p>

                    {/* Colors */}
                    <div className="flex justify-center gap-1 mb-6">
                      {item.colors.map((color) => (
                        <div
                          key={color}
                          className="w-2 h-2 rounded-full border border-black/5"
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>

                    {/* Action Button */}
                    <button
                      onClick={() => moveToCart(item.id)}
                      disabled={!item.inStock}
                      className={cn(
                        "w-full py-3 text-xs uppercase tracking-[0.2em] font-bold smooth-transition flex items-center justify-center gap-2",
                        item.inStock
                          ? "bg-primary text-white hover:bg-accent"
                          : "bg-gray-200 text-gray-400 cursor-not-allowed"
                      )}
                    >
                      <ShoppingBag size={14} />
                      {item.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recommendations */}
            <div className="mt-24 pt-16 border-t border-border">
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
          </>
        )}
      </div>
    </div>
  )
}
"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingBag, Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Minimalist Wool Overcoat",
    price: "$590",
    image: "/minimal-wool-coat-front.jpg",
    hoverImage: "/minimal-wool-coat-back.jpg",
    tag: "New Arrival",
  },
  {
    id: 2,
    name: "Silk Blend Evening Shirt",
    price: "$240",
    image: "/silk-shirt-front.jpg",
    hoverImage: "/silk-shirt-detail.jpg",
    tag: "Limited",
  },
  {
    id: 3,
    name: "Structured Cotton Trousers",
    price: "$320",
    image: "/luxury-trousers-front.jpg",
    hoverImage: "/luxury-trousers-back.jpg",
    tag: "",
  },
]

export function FeaturedProducts() {
  return (
    <section className="py-24 bg-[#F2F2F2]">
      <div className="px-6 md:px-12 text-center mb-20">
        <span className="text-[10px] uppercase tracking-[0.4em] text-accent font-semibold mb-4 block">Essentials</span>
        <h2 className="text-4xl md:text-5xl font-serif italic mb-6">Seasonal Favorites</h2>
        <p className="text-muted-foreground max-w-xl mx-auto text-sm leading-relaxed">
          Discover our most coveted pieces, crafted with meticulous attention to detail and premium fabrics for the
          modern wardrobe.
        </p>
      </div>

      <div className="px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 max-w-screen-2xl mx-auto">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: i * 0.2 }}
            viewport={{ once: true }}
            className="group"
          >
            <div className="relative aspect-[3/4] overflow-hidden rounded-2xl mb-6">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-700 group-hover:opacity-0"
              />
              <Image
                src={product.hoverImage || "/placeholder.svg"}
                alt={`${product.name} view 2`}
                fill
                className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              />

              {product.tag && (
                <span className="absolute top-6 left-6 px-3 py-1 bg-white/80 backdrop-blur-sm text-[9px] uppercase tracking-widest font-bold rounded-full">
                  {product.tag}
                </span>
              )}

              <button className="absolute top-6 right-6 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <Heart size={16} strokeWidth={1.5} />
              </button>

              <div className="absolute inset-x-0 bottom-8 px-8 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                <button className="w-full bg-primary text-primary-foreground py-4 text-[10px] uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2 hover:bg-accent hover:text-white transition-colors">
                  <ShoppingBag size={14} />
                  Add to Cart
                </button>
              </div>
            </div>

            <div className="flex justify-between items-start px-2">
              <div>
                <h3 className="text-lg font-serif italic mb-1">{product.name}</h3>
                <p className="text-xs text-muted-foreground uppercase tracking-widest">{product.price}</p>
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

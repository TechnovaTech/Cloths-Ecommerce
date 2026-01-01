"use client"

import * as React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { ShoppingBag, Heart, ChevronRight, Ruler, ShieldCheck, Truck } from "lucide-react"
import { cn } from "@/lib/utils"

const product = {
  id: 1,
  name: "Minimalist Wool Overcoat",
  price: 590,
  category: "Outerwear",
  description:
    "A timeless silhouette meticulously crafted from premium virgin wool. This overcoat features a structured shoulder, clean lines, and a subtle charcoal texture that defines modern sophistication.",
  details: [
    "100% Virgin Wool",
    "Tailored classic fit",
    "Full internal silk lining",
    "Deep welt pockets",
    "Sustainable sourcing",
  ],
  images: [
    "/minimal-wool-coat-front.jpg",
    "/minimal-wool-coat-back.jpg",
    "/high-fashion-model-in-luxury-minimal-clothing-edit.jpg",
    "/luxury-minimalist-factory-sustainable-craft.jpg",
  ],
  sizes: ["XS", "S", "M", "L", "XL"],
  colors: [
    { name: "Charcoal", hex: "#111111" },
    { name: "Sand", hex: "#C2A875" },
    { name: "Sage", hex: "#9FB8A0" },
  ],
}

export default function ProductPage() {
  const [selectedSize, setSelectedSize] = React.useState("M")
  const [selectedColor, setSelectedColor] = React.useState(product.colors[0])
  const [activeImage, setActiveImage] = React.useState(0)

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
                src={product.images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </motion.div>
            <button className="absolute top-6 right-6 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-white smooth-transition">
              <Heart size={20} strokeWidth={1} />
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
          </div>

          {/* Color Selection */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold">
                Color: <span className="font-light ml-2">{selectedColor.name}</span>
              </h3>
            </div>
            <div className="flex gap-4">
              {product.colors.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setSelectedColor(color)}
                  className={cn(
                    "w-10 h-10 rounded-full p-1 border smooth-transition",
                    selectedColor.name === color.name
                      ? "border-primary scale-110"
                      : "border-transparent hover:scale-105",
                  )}
                >
                  <div
                    className="w-full h-full rounded-full border border-black/5"
                    style={{ backgroundColor: color.hex }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Size Selection */}
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

          {/* Actions */}
          <div className="space-y-4 mb-16">
            <button className="w-full bg-primary text-primary-foreground py-5 text-xs uppercase tracking-[0.3em] font-bold flex items-center justify-center gap-3 hover:bg-accent hover:text-white transition-all duration-500 transform active:scale-[0.98]">
              <ShoppingBag size={18} />
              Add to Bag
            </button>
            <button className="w-full border border-primary py-5 text-xs uppercase tracking-[0.3em] font-bold hover:bg-primary hover:text-white smooth-transition">
              Find in Store
            </button>
          </div>

          {/* Value Props */}
          <div className="grid grid-cols-1 gap-6 pt-12 border-t border-black/5">
            <div className="flex items-start gap-4">
              <Truck size={20} strokeWidth={1} className="text-accent" />
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Free Delivery</h4>
                <p className="text-xs text-muted-foreground">Complimentary global shipping on orders over $300.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <ShieldCheck size={20} strokeWidth={1} className="text-accent" />
              <div>
                <h4 className="text-[10px] uppercase tracking-[0.2em] font-bold mb-1">Lifetime Warranty</h4>
                <p className="text-xs text-muted-foreground">We guarantee the quality of our craftsmanship for life.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <section className="mt-32 pt-24 border-t border-black/5 px-6 md:px-12 max-w-screen-2xl mx-auto">
        <h2 className="text-3xl font-serif italic mb-16 text-center">Complete the Look</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#F2F2F2] mb-4">
                <Image
                  src={`/fashion-accessory-.jpg?height=600&width=450&query=fashion-accessory-${i}`}
                  alt="Recommended"
                  fill
                  className="object-cover group-hover:scale-110 smooth-transition"
                />
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-1 group-hover:text-accent smooth-transition">
                Matching Accessory {i}
              </h3>
              <p className="text-[10px] text-muted-foreground">$120</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

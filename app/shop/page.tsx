"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"

const products = [
  {
    id: 1,
    name: "Minimalist Wool Overcoat",
    price: 590,
    category: "Outerwear",
    image: "/minimal-wool-coat-front.jpg",
    hoverImage: "/minimal-wool-coat-back.jpg",
    colors: ["#111111", "#6B6B6B", "#C2A875"],
  },
  {
    id: 2,
    name: "Silk Blend Evening Shirt",
    price: 240,
    category: "Tops",
    image: "/silk-shirt-front.jpg",
    hoverImage: "/silk-shirt-detail.jpg",
    colors: ["#FAFAFA", "#111111"],
  },
  {
    id: 3,
    name: "Structured Cotton Trousers",
    price: 320,
    category: "Bottoms",
    image: "/luxury-trousers-front.jpg",
    hoverImage: "/luxury-trousers-back.jpg",
    colors: ["#6B6B6B", "#2B2B2B"],
  },
  {
    id: 4,
    name: "Cashmere Turtleneck",
    price: 450,
    category: "Knitwear",
    image: "/cashmere-knit-front.jpg",
    hoverImage: "/cashmere-knit-detail.jpg",
    colors: ["#111111", "#C2A875", "#9FB8A0"],
  },
  {
    id: 5,
    name: "Leather Chelsea Boots",
    price: 480,
    category: "Footwear",
    image: "/leather-boots-front.jpg",
    hoverImage: "/leather-boots-detail.jpg",
    colors: ["#111111", "#3D2B1F"],
  },
  {
    id: 6,
    name: "Linen Utility Jacket",
    price: 380,
    category: "Outerwear",
    image: "/linen-jacket-front.jpg",
    hoverImage: "/linen-jacket-detail.jpg",
    colors: ["#9FB8A0", "#C2A875"],
  },
]

const categories = ["All", "Outerwear", "Tops", "Bottoms", "Knitwear", "Footwear"]
const sizes = ["XS", "S", "M", "L", "XL"]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  const filteredProducts = products.filter((p) => activeCategory === "All" || p.category === activeCategory)

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      {/* Header */}
      <div className="max-w-screen-2xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Shop Collection</h1>
        <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
          Refined essentials for the modern wardrobe
        </p>
      </div>

      {/* Toolbar */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-y border-black/5 py-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "text-[10px] uppercase tracking-[0.3em] font-bold whitespace-nowrap smooth-transition",
                activeCategory === cat
                  ? "text-primary border-b border-primary pb-1"
                  : "text-muted-foreground hover:text-primary",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="flex items-center justify-between w-full md:w-auto gap-8">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold hover:text-accent smooth-transition"
          >
            <SlidersHorizontal size={14} />
            Filters
          </button>

          <div className="flex items-center gap-4 border-l border-black/5 pl-8">
            <button
              onClick={() => setViewMode("grid")}
              className={cn("smooth-transition", viewMode === "grid" ? "text-primary" : "text-muted-foreground")}
            >
              <LayoutGrid size={18} strokeWidth={1.5} />
            </button>
            <button
              onClick={() => setViewMode("list")}
              className={cn("smooth-transition", viewMode === "list" ? "text-primary" : "text-muted-foreground")}
            >
              <List size={18} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-screen-2xl mx-auto flex gap-12">
        {/* Animated Sidebar Filter */}
        <AnimatePresence>
          {isFilterOpen && (
            <motion.aside
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="hidden lg:block w-64 flex-shrink-0"
            >
              <div className="sticky top-32 space-y-10">
                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className="w-10 h-10 border border-border text-[10px] flex items-center justify-center hover:border-primary smooth-transition"
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Color</h3>
                  <div className="flex flex-wrap gap-3">
                    {["#111111", "#FAFAFA", "#C2A875", "#9FB8A0", "#6B6B6B"].map((color) => (
                      <button
                        key={color}
                        className="w-6 h-6 rounded-full border border-black/5 hover:scale-110 smooth-transition"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Price Range</h3>
                  <div className="space-y-4">
                    {["$0 - $200", "$200 - $500", "$500+"].map((range) => (
                      <label key={range} className="flex items-center gap-3 cursor-pointer group">
                        <div className="w-4 h-4 border border-border group-hover:border-accent smooth-transition" />
                        <span className="text-sm text-muted-foreground group-hover:text-primary smooth-transition">
                          {range}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Product Grid */}
        <div className="flex-grow">
          <motion.div
            layout
            className={cn(
              "grid gap-x-8 gap-y-16",
              viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
            )}
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={cn("group cursor-pointer", viewMode === "list" && "flex gap-8 items-center")}
              >
                <Link
                  href={`/shop/${product.id}`}
                  className={cn(
                    "block relative overflow-hidden bg-[#F2F2F2] rounded-sm",
                    viewMode === "list" ? "w-48 h-64" : "aspect-[3/4] mb-6",
                  )}
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <Image
                    src={product.hoverImage || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                </Link>

                <div className={cn("flex-grow", viewMode === "grid" ? "text-center" : "text-left")}>
                  <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium tracking-widest">${product.price}</p>

                  {viewMode === "list" && (
                    <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
                      Expertly crafted from premium materials, this piece embodies our commitment to timeless design and
                      exceptional quality.
                    </p>
                  )}

                  <div className={cn("mt-4 flex gap-1", viewMode === "grid" ? "justify-center" : "justify-start")}>
                    {product.colors.map((c) => (
                      <div
                        key={c}
                        className="w-2 h-2 rounded-full border border-black/5"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  )
}

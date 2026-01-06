"use client"

import * as React from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { LayoutGrid, List, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { useSearchParams } from "next/navigation"

interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  stock: number
  featured: boolean
  sizes?: string[]
  discount?: number
  discountType?: string
}

interface Category {
  _id: string
  name: string
  description: string
  status: string
}

export default function ShopPage() {
  const searchParams = useSearchParams()
  const [products, setProducts] = React.useState<Product[]>([])
  const [categories, setCategories] = React.useState<Category[]>([])
  const [loading, setLoading] = React.useState(true)
  const [activeCategory, setActiveCategory] = React.useState("All")
  const [isFilterOpen, setIsFilterOpen] = React.useState(false)
  const [viewMode, setViewMode] = React.useState<"grid" | "list">("grid")

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch products
        const productsRes = await fetch('/api/products')
        if (productsRes.ok) {
          const productsData = await productsRes.json()
          setProducts(productsData)
        }

        // Fetch categories
        const categoriesRes = await fetch('/api/categories')
        if (categoriesRes.ok) {
          const categoriesData = await categoriesRes.json()
          setCategories(categoriesData.filter((cat: Category) => cat.status === 'active'))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Set active category from URL parameter
  React.useEffect(() => {
    const categoryParam = searchParams.get('category')
    if (categoryParam) {
      setActiveCategory(categoryParam)
    }
  }, [searchParams])

  const filteredProducts = products.filter((p) => 
    activeCategory === "All" || p.category === activeCategory
  )

  const categoryNames = ["All", ...categories.map(cat => cat.name)]

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
      {/* Header */}
      <div className="max-w-screen-2xl mx-auto mb-16">
        <h1 className="text-5xl md:text-6xl font-serif italic mb-4">
          {activeCategory === "All" ? "Shop Collection" : `${activeCategory} Collection`}
        </h1>
        <p className="text-muted-foreground text-sm uppercase tracking-[0.2em]">
          {activeCategory === "All" ? "Refined essentials for the modern wardrobe" : `Explore our ${activeCategory.toLowerCase()} collection`}
        </p>
      </div>

      {/* Toolbar */}
      <div className="max-w-screen-2xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-y border-black/5 py-6">
        <div className="flex items-center gap-8 overflow-x-auto no-scrollbar w-full md:w-auto">
          {categoryNames.map((cat) => (
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
                  <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-6">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category._id}
                        onClick={() => setActiveCategory(category.name)}
                        className={cn(
                          "block w-full text-left text-sm py-2 px-3 rounded hover:bg-gray-50 smooth-transition",
                          activeCategory === category.name ? "bg-primary text-white" : "text-muted-foreground"
                        )}
                      >
                        {category.name}
                      </button>
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
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No products found</p>
              <p className="text-sm text-muted-foreground">Try selecting a different category or add products in the admin panel</p>
            </div>
          ) : (
            <motion.div
              layout
              className={cn(
                "grid gap-x-8 gap-y-16",
                viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1",
              )}
            >
              {filteredProducts.map((product, i) => (
                <motion.div
                  key={product._id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className={cn("group cursor-pointer", viewMode === "list" && "flex gap-8 items-center")}
                >
                  <Link
                    href={`/shop/${product._id}`}
                    className={cn(
                      "block relative overflow-hidden bg-[#F2F2F2] rounded-sm",
                      viewMode === "list" ? "w-48 h-64" : "aspect-[3/4] mb-6",
                    )}
                  >
                    <Image
                      src={product.images?.[0] || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    {product.images?.[1] && (
                      <Image
                        src={product.images[1]}
                        alt={product.name}
                        fill
                        className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                      />
                    )}
                    
                    {/* Stock indicator */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Out of Stock</span>
                      </div>
                    )}
                    
                    {/* Discount badge on image */}
                    {product.discount && product.discount > 0 && (
                      <div className="absolute top-4 left-4">
                        <span className="bg-accent text-white text-xs px-2 py-1 rounded-full font-bold">
                          {product.discountType === 'percentage' ? `${product.discount}% OFF` : `$${product.discount} OFF`}
                        </span>
                      </div>
                    )}
                  </Link>

                  <div className={cn("flex-grow", viewMode === "grid" ? "text-center" : "text-left")}>
                    <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-2">
                      {product.category}
                    </p>
                    <h3 className="text-xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                      {product.name}
                    </h3>
                    
                    {/* Price with discount */}
                    <div className="flex items-center gap-2 justify-center">
                      {product.discount && product.discount > 0 ? (
                        <>
                          <span className="text-lg font-bold tracking-widest text-red-600">
                            ${
                              product.discountType === 'percentage' 
                                ? (product.price - (product.price * product.discount / 100)).toFixed(0)
                                : (product.price - product.discount).toFixed(0)
                            }
                          </span>
                          <span className="text-sm text-gray-500 line-through">
                            ${product.price}
                          </span>
                        </>
                      ) : (
                        <span className="text-lg font-bold tracking-widest">${product.price}</span>
                      )}
                    </div>

                    {viewMode === "list" && (
                      <p className="mt-4 text-sm text-muted-foreground max-w-md leading-relaxed">
                        {product.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

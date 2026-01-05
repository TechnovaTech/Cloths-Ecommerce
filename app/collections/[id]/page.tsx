"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react"
import { useParams } from "next/navigation"

interface Category {
  _id: string
  name: string
  description: string
  images: string[]
  status: string
}

interface Product {
  _id: string
  name: string
  price: number
  category: string
  description: string
  images: string[]
  stock: number
  featured: boolean
}

export default function CollectionDetailPage() {
  const params = useParams()
  const [category, setCategory] = React.useState<Category | null>(null)
  const [products, setProducts] = React.useState<Product[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    const fetchCategoryAndProducts = async () => {
      try {
        // Fetch category details
        const categoryRes = await fetch(`/api/categories/${params.id}`)
        if (categoryRes.ok) {
          const categoryData = await categoryRes.json()
          setCategory(categoryData)
          
          // Fetch products in this category
          const productsRes = await fetch('/api/products')
          if (productsRes.ok) {
            const productsData = await productsRes.json()
            const categoryProducts = productsData.filter(
              (product: Product) => product.category === categoryData.name
            )
            setProducts(categoryProducts)
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCategoryAndProducts()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading collection...</p>
      </div>
    )
  }

  if (!category) {
    return (
      <div className="pt-32 pb-24 px-6 md:px-12 bg-background min-h-screen">
        <div className="max-w-screen-2xl mx-auto text-center">
          <h1 className="text-4xl font-serif italic mb-4">Collection Not Found</h1>
          <Link href="/collections" className="text-primary hover:text-accent smooth-transition">
            ← Back to Collections
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="pt-32 pb-24 bg-background">
      {/* Header */}
      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-screen-2xl mx-auto">
          <Link 
            href="/collections" 
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary smooth-transition mb-8"
          >
            <ArrowLeft size={16} />
            Back to Collections
          </Link>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] font-bold text-muted-foreground mb-4">
                Collection
              </p>
              <h1 className="text-5xl md:text-6xl font-serif italic mb-6 leading-tight">
                {category.name}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {category.description}
              </p>
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium">{products.length} pieces</span>
                {products.length > 0 && (
                  <span className="text-sm text-muted-foreground">
                    Starting from ${Math.min(...products.map(p => p.price))}
                  </span>
                )}
              </div>
            </div>
            
            <div className="relative aspect-[4/5] bg-[#F2F2F2] rounded-sm overflow-hidden">
              <Image
                src={category.images?.[0] || "/placeholder.svg"}
                alt={category.name}
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No products found in this collection</p>
              <Link href="/shop" className="text-primary hover:text-accent smooth-transition">
                Browse All Products
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
              {products.map((product) => (
                <div key={product._id} className="group">
                  <Link href={`/shop/${product._id}`} className="block relative aspect-[3/4] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
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
                    
                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 smooth-transition">
                      <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white smooth-transition">
                        <Heart size={16} />
                      </button>
                      <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white smooth-transition">
                        <ShoppingBag size={16} />
                      </button>
                    </div>
                    
                    {/* Stock indicator */}
                    {product.stock === 0 && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <span className="text-white text-sm font-medium">Out of Stock</span>
                      </div>
                    )}
                  </Link>

                  <div className="text-center">
                    <h3 className="text-xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                      {product.name}
                    </h3>
                    <p className="text-sm font-medium tracking-widest">${product.price}</p>
                    {product.featured && (
                      <span className="inline-block mt-2 text-xs px-2 py-1 bg-accent text-white rounded-full">
                        Featured
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Collection Story */}
      <div className="px-6 md:px-12 mt-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-[#FAFAFA] p-12 md:p-16 rounded-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif italic mb-6">
                The Story Behind {category.name}
              </h2>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Each piece in this collection represents our commitment to timeless design and exceptional craftsmanship. 
                We believe in creating garments that transcend seasonal trends, offering enduring style and uncompromising quality.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                From the initial sketch to the final stitch, every detail is carefully considered to ensure that each piece 
                not only looks beautiful but feels exceptional to wear. This is fashion with purpose, designed for the modern individual 
                who values both style and substance.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
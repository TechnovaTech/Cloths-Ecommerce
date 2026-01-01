"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, Heart, ShoppingBag } from "lucide-react"
import { cn } from "@/lib/utils"

const collections = {
  "1": {
    title: "Winter Essentials",
    subtitle: "Timeless pieces for the colder months",
    description: "Discover our curated selection of premium outerwear, knitwear, and accessories designed to keep you warm while maintaining effortless elegance.",
    season: "Winter 2024",
    products: [
      {
        id: 1,
        name: "Minimalist Wool Overcoat",
        price: 590,
        image: "/minimal-wool-coat-front.jpg",
        hoverImage: "/minimal-wool-coat-back.jpg",
      },
      {
        id: 4,
        name: "Cashmere Turtleneck",
        price: 450,
        image: "/cashmere-knit-front.jpg",
        hoverImage: "/cashmere-knit-detail.jpg",
      },
      {
        id: 5,
        name: "Leather Chelsea Boots",
        price: 480,
        image: "/leather-boots-front.jpg",
        hoverImage: "/leather-boots-detail.jpg",
      },
    ]
  },
  "2": {
    title: "Minimalist Wardrobe",
    subtitle: "Less is more philosophy",
    description: "Essential pieces that form the foundation of a conscious wardrobe. Clean lines, premium materials, and versatile designs.",
    season: "Capsule Collection",
    products: [
      {
        id: 2,
        name: "Silk Blend Evening Shirt",
        price: 240,
        image: "/silk-shirt-front.jpg",
        hoverImage: "/silk-shirt-detail.jpg",
      },
      {
        id: 3,
        name: "Structured Cotton Trousers",
        price: 320,
        image: "/luxury-trousers-front.jpg",
        hoverImage: "/luxury-trousers-back.jpg",
      },
    ]
  }
}

export default function CollectionDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params)
  const collection = collections[id as keyof typeof collections]

  if (!collection) {
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
                {collection.season}
              </p>
              <h1 className="text-5xl md:text-6xl font-serif italic mb-6 leading-tight">
                {collection.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                {collection.description}
              </p>
              <div className="flex items-center gap-6">
                <span className="text-sm font-medium">{collection.products.length} pieces</span>
                <span className="text-sm text-muted-foreground">Starting from ${Math.min(...collection.products.map(p => p.price))}</span>
              </div>
            </div>
            
            <div className="relative aspect-[4/5] bg-[#F2F2F2] rounded-sm overflow-hidden">
              <Image
                src={collection.products[0]?.image || "/placeholder.svg"}
                alt={collection.title}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {collection.products.map((product) => (
              <div key={product.id} className="group">
                <Link href={`/shop/${product.id}`} className="block relative aspect-[3/4] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                  />
                  <Image
                    src={product.hoverImage}
                    alt={product.name}
                    fill
                    className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                  />
                  
                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 smooth-transition">
                    <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white smooth-transition">
                      <Heart size={16} />
                    </button>
                    <button className="w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white smooth-transition">
                      <ShoppingBag size={16} />
                    </button>
                  </div>
                </Link>

                <div className="text-center">
                  <h3 className="text-xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                    {product.name}
                  </h3>
                  <p className="text-sm font-medium tracking-widest">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Collection Story */}
      <div className="px-6 md:px-12 mt-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-[#FAFAFA] p-12 md:p-16 rounded-sm">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-serif italic mb-6">
                The Story Behind {collection.title}
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
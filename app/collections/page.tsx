"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

const collections = [
  {
    id: 1,
    title: "Winter Essentials",
    subtitle: "Timeless pieces for the colder months",
    description: "Discover our curated selection of premium outerwear, knitwear, and accessories designed to keep you warm while maintaining effortless elegance.",
    image: "/minimal-wool-coat-front.jpg",
    hoverImage: "/minimal-wool-coat-back.jpg",
    season: "Winter 2024",
    itemCount: 24,
    featured: true,
  },
  {
    id: 2,
    title: "Minimalist Wardrobe",
    subtitle: "Less is more philosophy",
    description: "Essential pieces that form the foundation of a conscious wardrobe. Clean lines, premium materials, and versatile designs.",
    image: "/silk-shirt-front.jpg",
    hoverImage: "/silk-shirt-detail.jpg",
    season: "Capsule Collection",
    itemCount: 18,
    featured: false,
  },
  {
    id: 3,
    title: "Luxury Knitwear",
    subtitle: "Crafted comfort meets sophistication",
    description: "Indulge in the finest cashmere, merino wool, and silk blends. Each piece is meticulously crafted for ultimate comfort and style.",
    image: "/cashmere-knit-front.jpg",
    hoverImage: "/cashmere-knit-detail.jpg",
    season: "All Season",
    itemCount: 16,
    featured: false,
  },
  {
    id: 4,
    title: "Sustainable Luxury",
    subtitle: "Conscious fashion choices",
    description: "Our commitment to sustainability without compromising on luxury. Ethically sourced materials and responsible production methods.",
    image: "/linen-jacket-front.jpg",
    hoverImage: "/linen-jacket-detail.jpg",
    season: "Eco Collection",
    itemCount: 22,
    featured: false,
  },
  {
    id: 5,
    title: "Premium Accessories",
    subtitle: "The finishing touches",
    description: "Elevate your look with our selection of handcrafted leather goods, fine jewelry, and luxury accessories.",
    image: "/leather-boots-front.jpg",
    hoverImage: "/leather-boots-detail.jpg",
    season: "Accessories",
    itemCount: 31,
    featured: false,
  },
  {
    id: 6,
    title: "Tailored Excellence",
    subtitle: "Precision meets artistry",
    description: "Impeccably tailored pieces that celebrate the art of fine craftsmanship. From structured blazers to perfectly fitted trousers.",
    image: "/luxury-trousers-front.jpg",
    hoverImage: "/luxury-trousers-back.jpg",
    season: "Tailoring",
    itemCount: 14,
    featured: false,
  },
]

export default function CollectionsPage() {
  const featuredCollection = collections.find(c => c.featured)
  const regularCollections = collections.filter(c => !c.featured)

  return (
    <div className="pt-32 pb-24 bg-background">
      {/* Header */}
      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Collections</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] max-w-2xl">
            Curated selections that define modern luxury and timeless elegance
          </p>
        </div>
      </div>

      {/* Featured Collection */}
      {featuredCollection && (
        <section className="mb-24">
          <div className="relative h-[90vh] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={featuredCollection.image}
                alt={featuredCollection.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center px-6 md:px-12">
              <div className="max-w-screen-2xl mx-auto w-full">
                <div className="max-w-2xl text-white">
                  <p className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-90">
                    Featured Collection
                  </p>
                  <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight">
                    {featuredCollection.title}
                  </h2>
                  <p className="text-xl mb-8 opacity-90 leading-relaxed">
                    {featuredCollection.description}
                  </p>
                  <div className="flex items-center gap-8 mb-8">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">{featuredCollection.season}</span>
                    </div>
                    <div className="text-sm">
                      {featuredCollection.itemCount} pieces
                    </div>
                  </div>
                  <Link
                    href={`/collections/${featuredCollection.id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-white smooth-transition"
                  >
                    Explore Collection
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Collections Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {regularCollections.map((collection, index) => (
              <div key={collection.id} className="group cursor-pointer">
                <Link href={`/collections/${collection.id}`}>
                  {/* Collection Image */}
                  <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
                    <Image
                      src={collection.image}
                      alt={collection.title}
                      fill
                      className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                    />
                    <Image
                      src={collection.hoverImage}
                      alt={collection.title}
                      fill
                      className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 smooth-transition" />
                    
                    {/* Collection Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 smooth-transition">
                      <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2 opacity-90">
                        {collection.season}
                      </p>
                      <p className="text-sm leading-relaxed opacity-90">
                        {collection.itemCount} pieces
                      </p>
                    </div>
                  </div>

                  {/* Collection Details */}
                  <div className="text-center">
                    <h3 className="text-2xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                      {collection.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 uppercase tracking-[0.2em]">
                      {collection.subtitle}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                      {collection.description}
                    </p>
                    
                    <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:text-accent smooth-transition">
                      Explore Collection
                      <ArrowRight size={14} className="transform group-hover:translate-x-1 smooth-transition" />
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-24 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-[#FAFAFA] p-12 md:p-16 rounded-sm text-center">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-6">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new collections, exclusive pieces, and behind-the-scenes stories from our atelier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
              <button className="px-8 py-3 bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
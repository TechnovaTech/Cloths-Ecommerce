"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"

const categories = [
  { name: "Men", image: "/luxury-men-clothing.jpg", href: "/shop/men" },
  { name: "Women", image: "/minimal-women-fashion.png", href: "/shop/women" },
  { name: "Accessories", image: "/premium-leather-accessories.png", href: "/shop/accessories" },
  { name: "New Drop", image: "/high-fashion-editorial-streetwear.jpg", href: "/shop/new-drop" },
]

export function CategoryScroll() {
  return (
    <section className="py-24 overflow-hidden">
      <div className="px-6 md:px-12 mb-12 flex justify-between items-end">
        <div>
          <h2 className="text-4xl font-serif italic mb-2">Curated Categories</h2>
          <p className="text-base text-muted-foreground uppercase tracking-widest">Explore our latest selections</p>
        </div>
        <Link
          href="/shop"
          className="text-sm uppercase tracking-widest border-b border-black pb-1 hover:text-accent hover:border-accent smooth-transition"
        >
          View All
        </Link>
      </div>

      <div className="flex overflow-x-auto gap-6 px-6 md:px-12 no-scrollbar pb-8">
        {categories.map((cat, i) => (
          <motion.div
            key={cat.name}
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            viewport={{ once: true }}
            className="flex-shrink-0 group cursor-pointer"
          >
            <Link href={cat.href}>
              <div className="relative w-[300px] h-[400px] md:w-[400px] md:h-[550px] overflow-hidden rounded-sm glass-effect">
                <Image
                  src={cat.image || "/placeholder.svg"}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/20 smooth-transition" />
                <div className="absolute inset-x-0 bottom-0 p-8 text-center translate-y-4 group-hover:translate-y-0 smooth-transition">
                  <h3 className="text-white text-4xl font-serif italic mb-2">{cat.name}</h3>
                  <span className="text-white/0 group-hover:text-white/100 text-sm uppercase tracking-[0.3em] smooth-transition">
                    Explore
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  )
}

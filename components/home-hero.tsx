"use client"

import { motion } from "framer-motion"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export function HomeHero() {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/high-fashion-model-in-luxury-minimal-clothing-edit.jpg')" }}
      />
      <div className="absolute inset-0 bg-black/40" />
      
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-xs uppercase tracking-[0.4em] mb-6 font-bold drop-shadow-lg"
        >
          New Collection
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-5xl md:text-8xl font-serif font-bold tracking-tighter mb-8 max-w-4xl drop-shadow-lg"
        >
          Timeless Elegance
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-white text-lg mb-8 max-w-2xl drop-shadow-lg"
        >
          Discover our curated collection of premium fashion pieces designed for the modern individual
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href="/shop"
            className="group relative px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-semibold hover:bg-black hover:text-white smooth-transition drop-shadow-lg"
          >
            Shop Now
            <ArrowRight className="inline-block ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
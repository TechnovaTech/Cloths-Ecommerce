"use client"

import { motion } from "framer-motion"
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react"
import { useState, useEffect } from "react"
import Link from "next/link"

interface Banner {
  _id: string
  title: string
  subtitle?: string
  description?: string
  image: string
  buttonText: string
  buttonLink: string
  status: string
}

export function HomeHero() {
  const [banners, setBanners] = useState<Banner[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await fetch('/api/banners')
        const data = await res.json()
        setBanners(data.filter((banner: Banner) => banner.status === 'active'))
      } catch (error) {
        console.error('Error fetching banners:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBanners()
  }, [])

  useEffect(() => {
    if (banners.length > 1) {
      const interval = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length)
      }, 5000)
      return () => clearInterval(interval)
    }
  }, [banners.length])

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length)
  }

  if (loading) {
    return (
      <section className="relative h-screen w-full overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <p className="text-gray-500">Loading...</p>
        </div>
      </section>
    )
  }

  if (banners.length === 0) {
    return (
      <section className="relative h-screen w-full overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/placeholder.svg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h1 className="text-white text-5xl md:text-8xl font-serif font-bold mb-8">
            Welcome to Our Store
          </h1>
          <p className="text-white text-lg mb-8">Add banners in admin panel</p>
          <Link href="/shop" className="px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-semibold hover:bg-black hover:text-white smooth-transition">
            Shop Now
          </Link>
        </div>
      </section>
    )
  }

  const currentBanner = banners[currentIndex]

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Banner Slides */}
      <div className="relative w-full h-full">
        {banners.map((banner, index) => (
          <motion.div
            key={banner._id}
            className="absolute inset-0"
            initial={{ x: '100%' }}
            animate={{ 
              x: index === currentIndex ? '0%' : index < currentIndex ? '-100%' : '100%'
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          >
            <div
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url('${banner.image}')` }}
            />
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        ))}
      </div>

      {/* Content */}
      <div className="relative h-full flex flex-col items-center justify-center text-center px-6 z-10">
        <motion.span
          key={`subtitle-${currentIndex}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-white text-xs uppercase tracking-[0.4em] mb-6 font-bold drop-shadow-lg"
        >
          {currentBanner.subtitle || 'New Collection'}
        </motion.span>

        <motion.h1
          key={`title-${currentIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white text-5xl md:text-8xl font-serif font-bold tracking-tighter mb-8 max-w-4xl drop-shadow-lg"
        >
          {currentBanner.title}
        </motion.h1>

        {currentBanner.description && (
          <motion.p
            key={`desc-${currentIndex}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-white text-lg mb-8 max-w-2xl drop-shadow-lg"
          >
            {currentBanner.description}
          </motion.p>
        )}

        <motion.div
          key={`button-${currentIndex}`}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            href={currentBanner.buttonLink}
            className="group relative px-10 py-4 bg-white text-black text-xs uppercase tracking-[0.3em] font-semibold hover:bg-black hover:text-white smooth-transition drop-shadow-lg"
          >
            {currentBanner.buttonText}
            <ArrowRight className="inline-block ml-3 w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>

      {/* Navigation Arrows */}
      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-20"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-6 top-1/2 -translate-y-1/2 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors z-20"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Dots Indicator */}
      {banners.length > 1 && (
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === currentIndex ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  )
}

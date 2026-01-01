"use client"

import { HomeHero } from "@/components/home-hero"
import { CategoryScroll } from "@/components/category-scroll"
import { FeaturedProducts } from "@/components/featured-products"

export default function Home() {
  return (
    <div className="bg-background">
      <HomeHero />

      <CategoryScroll />

      {/* Parallax / Inset Banner Section */}
      <section className="relative h-[80vh] w-full overflow-hidden my-12">
        <div
          className="absolute inset-0 bg-fixed bg-center bg-cover"
          style={{ backgroundImage: "url('/luxury-minimalist-factory-sustainable-craft.jpg')" }}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-6">
          <h2 className="text-white text-4xl md:text-6xl font-serif font-bold mb-8 max-w-3xl leading-tight">
            Crafted for longevity, designed for the modern individual.
          </h2>
          <button className="px-10 py-4 bg-white text-black text-[10px] uppercase tracking-[0.3em] font-bold hover:bg-accent hover:text-white smooth-transition">
            Our Philosophy
          </button>
        </div>
      </section>

      <FeaturedProducts />

      {/* "Why Choose Us" / Features Section */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          {[
            { title: "Premium Quality", desc: "Sourced from the finest mills worldwide." },
            { title: "Sustainable", desc: "Commitment to ethical production & fabrics." },
            { title: "Fast Shipping", desc: "Complimentary global delivery on orders $300+." },
            { title: "Easy Returns", desc: "30-day seamless return & exchange policy." },
          ].map((item, i) => (
            <div key={item.title} className="text-center group">
              <div className="mb-6 mx-auto w-12 h-12 flex items-center justify-center border border-border rounded-full group-hover:bg-primary group-hover:text-white smooth-transition">
                <span className="font-serif text-lg">{i + 1}</span>
              </div>
              <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

"use client"

import * as React from "react"
import Image from "next/image"
import { Award, Heart, Leaf, Users } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24 bg-background">
      {/* Hero Section */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Our Story</h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Founded on the principles of timeless design and exceptional craftsmanship, Atelier represents 
                the intersection of modern luxury and sustainable fashion.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Since our inception, we have been committed to creating pieces that transcend seasonal trends, 
                offering enduring style and uncompromising quality for the discerning individual.
              </p>
            </div>
            <div className="relative aspect-[4/5] bg-[#F2F2F2] rounded-sm overflow-hidden">
              <Image
                src="/luxury-minimalist-factory-sustainable-craft.jpg"
                alt="Our Atelier"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-border p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Values</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Award className="text-primary" size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Excellence</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Uncompromising quality in every stitch, sourced from the world's finest mills and craftspeople.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Leaf className="text-primary" size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Sustainability</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Ethical production methods and sustainable materials that respect both people and planet.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Heart className="text-primary" size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Passion</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Every piece is created with love and attention to detail by skilled artisans who share our vision.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="text-primary" size={24} />
                </div>
                <h3 className="text-xs uppercase tracking-[0.2em] font-bold mb-4">Community</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Building lasting relationships with our customers, partners, and the communities we serve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative aspect-[4/5] bg-[#F2F2F2] rounded-sm overflow-hidden">
              <Image
                src="/high-fashion-model-in-luxury-minimal-clothing-edit.jpg"
                alt="Our Mission"
                fill
                className="object-cover"
              />
            </div>
            <div className="bg-white rounded-lg shadow-sm border border-border p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-8">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                To redefine modern luxury through conscious design choices that honor both tradition and innovation. 
                We believe that true luxury lies not in excess, but in the perfect balance of form, function, and responsibility.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-8">
                Each garment tells a story of meticulous craftsmanship, from the initial sketch to the final stitch. 
                We work exclusively with suppliers who share our commitment to ethical practices and environmental stewardship.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Carbon-neutral shipping on all orders</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Fair trade certified production partners</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-sm">Lifetime repair and alteration services</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="px-6 md:px-12 mb-24">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm border border-border p-12">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Meet Our Team</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-[#F2F2F2]">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Creative Director"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Elena Rodriguez</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Creative Director</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  With over 15 years in luxury fashion, Elena brings a unique vision that blends European craftsmanship with modern sensibilities.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-[#F2F2F2]">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Head of Sustainability"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Marcus Chen</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Head of Sustainability</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Marcus ensures every aspect of our production meets the highest environmental and ethical standards.
                </p>
              </div>
              
              <div className="text-center">
                <div className="relative w-32 h-32 mx-auto mb-6 rounded-full overflow-hidden bg-[#F2F2F2]">
                  <Image
                    src="/placeholder-user.jpg"
                    alt="Master Tailor"
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="text-lg font-bold mb-2">Sofia Andersson</h3>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Master Tailor</p>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  A third-generation tailor, Sofia oversees our atelier where each piece is crafted with precision and care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-gradient-to-r from-primary to-accent text-white rounded-lg p-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Join Our Journey</h2>
            <p className="text-lg mb-8 opacity-90 max-w-2xl mx-auto">
              Discover pieces that will become treasured parts of your wardrobe for years to come.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/shop" 
                className="px-8 py-3 bg-white text-primary text-xs uppercase tracking-[0.2em] font-bold hover:bg-gray-100 smooth-transition"
              >
                Shop Collection
              </a>
              <a 
                href="/collections" 
                className="px-8 py-3 border border-white text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-white hover:text-primary smooth-transition"
              >
                View Collections
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
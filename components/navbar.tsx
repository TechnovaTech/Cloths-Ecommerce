"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, Heart } from "lucide-react"
import { cn } from "@/lib/utils"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12 py-4",
        isScrolled ? "bg-white/80 backdrop-blur-md border-b border-black/5 py-3" : "bg-transparent",
      )}
    >
      <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* Navigation Links - Left */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/shop" className="text-xs uppercase tracking-widest hover:text-accent smooth-transition">
            Shop
          </Link>
          <Link href="/collections" className="text-xs uppercase tracking-widest hover:text-accent smooth-transition">
            Collections
          </Link>
          <Link href="/about" className="text-xs uppercase tracking-widest hover:text-accent smooth-transition">
            Our Story
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <h1 className="text-2xl font-serif tracking-widest uppercase italic">Atelier</h1>
        </Link>

        {/* Icons - Right */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="p-2 hover:text-accent smooth-transition">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link href="/wishlist" className="hidden md:block p-2 hover:text-accent smooth-transition">
            <Heart size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/profile" className="hidden md:block p-2 hover:text-accent smooth-transition">
            <User size={20} strokeWidth={1.5} />
          </Link>
          <Link href="/cart" className="p-2 hover:text-accent smooth-transition relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-40 md:hidden flex flex-col items-center justify-center gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link href="/shop" className="text-2xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/collections" className="text-2xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Collections
          </Link>
          <Link href="/about" className="text-2xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Our Story
          </Link>
          <Link href="/wishlist" className="text-2xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Wishlist
          </Link>
          <Link href="/profile" className="text-2xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Profile
          </Link>
          <Link href="/cart" className="text-2xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Cart
          </Link>
        </div>
      )}
    </nav>
  )
}

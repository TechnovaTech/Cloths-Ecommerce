"use client"

import * as React from "react"
import Link from "next/link"
import { Search, ShoppingBag, User, Menu, X, Heart, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/contexts/AuthContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { useCart } from "@/contexts/CartContext"

export function Navbar() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false)
  const [userMenuOpen, setUserMenuOpen] = React.useState(false)
  const { user, logout } = useAuth()
  const { wishlistCount } = useWishlist()
  const { cartCount } = useCart()

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
          <Link href="/shop" className="text-base uppercase tracking-widest text-black font-medium hover:text-accent smooth-transition">
            Shop
          </Link>
          <Link href="/collections" className="text-base uppercase tracking-widest text-black font-medium hover:text-accent smooth-transition">
            Collections
          </Link>
         
          <Link href="/about" className="text-base uppercase tracking-widest text-black font-medium hover:text-accent smooth-transition">
            Our Story
          </Link>
        </div>

        {/* Logo */}
        <Link href="/" className="absolute left-1/2 -translate-x-1/2 md:static md:translate-x-0">
          <h1 className="text-3xl font-serif tracking-widest uppercase font-bold">Atelier</h1>
        </Link>

        {/* Icons - Right */}
        <div className="flex items-center gap-4 md:gap-6">
          <button className="p-2 hover:text-accent smooth-transition">
            <Search size={20} strokeWidth={1.5} />
          </button>
          <Link href="/wishlist" className="hidden md:block p-2 hover:text-accent smooth-transition relative">
            <Heart size={20} strokeWidth={1.5} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#C2A875] text-white text-sm font-bold rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </Link>
          
          {/* User Menu */}
          <div className="relative">
            {user ? (
              <>
                <button 
                  onClick={() => setUserMenuOpen(!userMenuOpen)}
                  className="hidden md:block p-2 hover:text-accent smooth-transition"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>
                {userMenuOpen && (
                  <div className="absolute right-0 top-12 bg-white border shadow-lg rounded-sm w-48 py-2 z-50">
                    <div className="px-4 py-2 border-b">
                      <p className="font-medium">{user.name}</p>
                      <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                    <Link href="/profile" className="block px-4 py-2 hover:bg-gray-50">
                      Profile
                    </Link>
                    <Link href="/orders" className="block px-4 py-2 hover:bg-gray-50">
                      Orders
                    </Link>
                    {user.role === 'admin' && (
                      <Link href="/admin" className="block px-4 py-2 hover:bg-gray-50">
                        Admin Panel
                      </Link>
                    )}
                    <button 
                      onClick={logout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <LogOut size={16} />
                      Logout
                    </button>
                  </div>
                )}
              </>
            ) : (
              <Link href="/login" className="hidden md:block p-2 hover:text-accent smooth-transition">
                <User size={20} strokeWidth={1.5} />
              </Link>
            )}
          </div>
          <Link href="/cart" className="p-2 hover:text-accent smooth-transition relative">
            <ShoppingBag size={20} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-6 h-6 bg-[#C2A875] text-white text-sm font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-[60px] bg-white z-40 md:hidden flex flex-col items-center justify-center gap-8 animate-in fade-in slide-in-from-top-4 duration-300">
          <Link href="/shop" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Shop
          </Link>
          <Link href="/collections" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Collections
          </Link>
          <Link href="/rental" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Rental
          </Link>
          <Link href="/about" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Our Story
          </Link>
          <Link href="/wishlist" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Wishlist
          </Link>
          <Link href="/profile" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Profile
          </Link>
          <Link href="/cart" className="text-3xl font-serif" onClick={() => setMobileMenuOpen(false)}>
            Cart
          </Link>
        </div>
      )}
    </nav>
  )
}

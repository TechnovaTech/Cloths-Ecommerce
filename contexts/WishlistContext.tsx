"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'
import { useAuth } from './AuthContext'

interface WishlistItem {
  _id: string
  name: string
  price: number
  image: string
}

interface WishlistContextType {
  wishlist: WishlistItem[]
  addToWishlist: (item: WishlistItem) => void
  removeFromWishlist: (id: string) => void
  isInWishlist: (id: string) => boolean
  wishlistCount: number
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined)

export function WishlistProvider({ children }: { children: React.ReactNode }) {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([])
  const { user } = useAuth()

  // Load user-specific wishlist when user changes
  useEffect(() => {
    if (user) {
      const userWishlistKey = `wishlist_${user.email}`
      const savedWishlist = localStorage.getItem(userWishlistKey)
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist))
      } else {
        setWishlist([]) // New user gets empty wishlist
      }
    } else {
      setWishlist([]) // No user, empty wishlist
    }
  }, [user])

  // Save wishlist to user-specific localStorage
  useEffect(() => {
    if (user) {
      const userWishlistKey = `wishlist_${user.email}`
      localStorage.setItem(userWishlistKey, JSON.stringify(wishlist))
    }
  }, [wishlist, user])

  const addToWishlist = (item: WishlistItem) => {
    setWishlist(prev => [...prev, item])
  }

  const removeFromWishlist = (id: string) => {
    setWishlist(prev => prev.filter(item => item._id !== id))
  }

  const isInWishlist = (id: string) => {
    return wishlist.some(item => item._id === id)
  }

  const wishlistCount = wishlist.length

  return (
    <WishlistContext.Provider value={{
      wishlist,
      addToWishlist,
      removeFromWishlist,
      isInWishlist,
      wishlistCount
    }}>
      {children}
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (context === undefined) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}
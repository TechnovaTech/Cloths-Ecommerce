import type React from "react"
import type { Metadata } from "next"
import { Cormorant_Garamond, Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { LayoutWrapper } from "./layout-wrapper"
import { AuthProvider } from "@/contexts/AuthContext"
import { WishlistProvider } from "@/contexts/WishlistContext"
import { CartProvider } from "@/contexts/CartContext"

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
})

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

export const metadata: Metadata = {
  title: "ATELIER — Modern Fashion",
  description: "Redefining Modern Fashion with Premium Quality and Sustainable Design",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${cormorantGaramond.variable} font-sans antialiased min-h-screen flex flex-col`}
        suppressHydrationWarning={true}
      >
        <AuthProvider>
          <WishlistProvider>
            <CartProvider>
              <LayoutWrapper>
                {children}
              </LayoutWrapper>
            </CartProvider>
          </WishlistProvider>
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}

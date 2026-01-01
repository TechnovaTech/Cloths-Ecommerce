import Link from "next/link"
import { Instagram, Twitter, Facebook } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground pt-20 pb-10 px-6 md:px-12">
      <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
        {/* Brand Section */}
        <div className="md:col-span-1">
          <h2 className="text-3xl font-serif uppercase tracking-widest italic mb-6">Atelier</h2>
          <p className="text-primary-foreground/60 text-sm max-w-[240px] leading-loose">
            Redefining modern fashion with a focus on timeless elegance and sustainable luxury.
          </p>
        </div>

        {/* Navigation Section */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-6">Explore</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/shop" className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition">
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/new-arrivals"
                className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition"
              >
                New Arrivals
              </Link>
            </li>
            <li>
              <Link
                href="/collections"
                className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition"
              >
                Collections
              </Link>
            </li>
            <li>
              <Link href="/sale" className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition">
                Sale
              </Link>
            </li>
          </ul>
        </div>

        {/* Support Section */}
        <div>
          <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-6">Assistance</h3>
          <ul className="space-y-4">
            <li>
              <Link href="/shipping" className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition">
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/size-guide"
                className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition"
              >
                Size Guide
              </Link>
            </li>
            <li>
              <Link href="/contact" className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/faq" className="text-sm text-primary-foreground/60 hover:text-accent smooth-transition">
                FAQ
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter Section */}
        <div className="md:col-span-1">
          <h3 className="text-xs uppercase tracking-[0.2em] font-medium mb-6">Newsletter</h3>
          <p className="text-sm text-primary-foreground/60 mb-6 leading-relaxed">
            Subscribe to receive updates and exclusive offers.
          </p>
          <form className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="w-full bg-transparent border-b border-primary-foreground/20 py-2 text-sm focus:border-accent outline-none transition-colors"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 text-xs uppercase tracking-widest hover:text-accent">
              Join
            </button>
          </form>
          <div className="flex gap-4 mt-8">
            <Instagram
              size={18}
              className="text-primary-foreground/40 hover:text-accent cursor-pointer smooth-transition"
            />
            <Twitter
              size={18}
              className="text-primary-foreground/40 hover:text-accent cursor-pointer smooth-transition"
            />
            <Facebook
              size={18}
              className="text-primary-foreground/40 hover:text-accent cursor-pointer smooth-transition"
            />
          </div>
        </div>
      </div>

      <div className="max-w-screen-2xl mx-auto pt-8 border-t border-primary-foreground/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[10px] uppercase tracking-widest text-primary-foreground/40">
          © 2026 Atelier. All rights reserved.
        </p>
        <div className="flex gap-8">
          <Link
            href="/privacy"
            className="text-[10px] uppercase tracking-widest text-primary-foreground/40 hover:text-accent"
          >
            Privacy Policy
          </Link>
          <Link
            href="/terms"
            className="text-[10px] uppercase tracking-widest text-primary-foreground/40 hover:text-accent"
          >
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  )
}

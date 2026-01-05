"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Calendar } from "lucide-react"
import { cn } from "@/lib/utils"

interface Category {
  _id: string;
  name: string;
  description: string;
  status: string;
  images: string[];
  createdAt: string;
}

interface Banner {
  _id: string;
  title: string;
  subtitle?: string;
  description?: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  status: string;
  page: string;
}

export default function CollectionsPage() {
  const [categories, setCategories] = React.useState<Category[]>([]);
  const [banners, setBanners] = React.useState<Banner[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [categoriesRes, bannersRes] = await Promise.all([
        fetch('/api/categories'),
        fetch('/api/banners')
      ]);
      
      const categoriesData = await categoriesRes.json();
      const bannersData = await bannersRes.json();
      
      // Only show active categories
      const activeCategories = categoriesData.filter((cat: Category) => cat.status === 'active');
      setCategories(activeCategories);
      
      // Only show active banners for collections page
      const collectionsBanners = bannersData.filter((banner: Banner) => 
        banner.status === 'active' && banner.page === 'collections'
      );
      setBanners(collectionsBanners);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="pt-32 pb-24 bg-background">
        <div className="px-6 md:px-12 mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Collections</h1>
            <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] max-w-2xl">
              Loading collections...
            </p>
          </div>
        </div>
      </div>
    );
  }

  const featuredCategory = categories[0]; // First category as featured
  const regularCategories = categories.slice(1); // Rest as regular

  return (
    <div className="pt-32 pb-24 bg-background">
      {/* Banner Section */}
      {banners.length > 0 && (
        <section className="mb-16">
          <div className="relative h-[70vh] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={banners[0].image}
                alt={banners[0].title}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center px-6 md:px-12">
              <div className="max-w-screen-2xl mx-auto w-full">
                <div className="max-w-2xl text-white">
                  <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight">
                    {banners[0].title}
                  </h2>
                  {banners[0].subtitle && (
                    <p className="text-xl mb-4 opacity-90">
                      {banners[0].subtitle}
                    </p>
                  )}
                  {banners[0].description && (
                    <p className="text-lg mb-8 opacity-80 leading-relaxed">
                      {banners[0].description}
                    </p>
                  )}
                  <Link
                    href={banners[0].buttonLink}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-white smooth-transition"
                  >
                    {banners[0].buttonText}
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Header */}
      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-screen-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Collections</h1>
          <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] max-w-2xl">
            Curated selections that define modern luxury and timeless elegance
          </p>
        </div>
      </div>

      {/* Featured Collection */}
      {featuredCategory && (
        <section className="mb-24">
          <div className="relative h-[90vh] overflow-hidden">
            <div className="absolute inset-0">
              <Image
                src={featuredCategory.images[0] || '/placeholder.jpg'}
                alt={featuredCategory.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center px-6 md:px-12">
              <div className="max-w-screen-2xl mx-auto w-full">
                <div className="max-w-2xl text-white">
                  <p className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-90">
                    Featured Collection
                  </p>
                  <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight">
                    {featuredCategory.name}
                  </h2>
                  <p className="text-xl mb-8 opacity-90 leading-relaxed">
                    {featuredCategory.description}
                  </p>
                  <div className="flex items-center gap-8 mb-8">
                    <div className="flex items-center gap-2">
                      <Calendar size={16} />
                      <span className="text-sm">{new Date(featuredCategory.createdAt).getFullYear()}</span>
                    </div>
                  </div>
                  <Link
                    href={`/collections/${featuredCategory._id}`}
                    className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent hover:text-white smooth-transition"
                  >
                    Explore Collection
                    <ArrowRight size={16} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Collections Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {regularCategories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularCategories.map((category, index) => (
                <div key={category._id} className="group cursor-pointer">
                  <Link href={`/collections/${category._id}`}>
                    {/* Collection Image */}
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
                      <Image
                        src={category.images[0] || '/placeholder.jpg'}
                        alt={category.name}
                        fill
                        className="object-cover transition-opacity duration-700 group-hover:opacity-0"
                      />
                      {category.images[1] && (
                        <Image
                          src={category.images[1]}
                          alt={category.name}
                          fill
                          className="object-cover absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                        />
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 smooth-transition" />
                      
                      {/* Collection Info Overlay */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 smooth-transition">
                        <p className="text-xs uppercase tracking-[0.2em] font-bold mb-2 opacity-90">
                          {new Date(category.createdAt).getFullYear()}
                        </p>
                        <p className="text-sm leading-relaxed opacity-90">
                          {category.status}
                        </p>
                      </div>
                    </div>

                    {/* Collection Details */}
                    <div className="text-center">
                      <h3 className="text-2xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                        {category.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-6">
                        {category.description}
                      </p>
                      
                      <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] font-bold text-primary group-hover:text-accent smooth-transition">
                        Explore Collection
                        <ArrowRight size={14} className="transform group-hover:translate-x-1 smooth-transition" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg mb-4">No collections available</p>
              <p className="text-sm text-muted-foreground">Add categories from the admin panel to see them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="mt-24 px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          <div className="bg-[#FAFAFA] p-12 md:p-16 rounded-sm text-center">
            <h2 className="text-3xl md:text-4xl font-serif italic mb-6">
              Stay Updated
            </h2>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Be the first to discover new collections, exclusive pieces, and behind-the-scenes stories from our atelier.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 border border-border rounded-sm text-sm focus:outline-none focus:border-primary"
              />
              <button className="px-8 py-3 bg-primary text-white text-xs uppercase tracking-[0.2em] font-bold hover:bg-accent smooth-transition whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
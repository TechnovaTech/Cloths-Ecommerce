"use client"

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Plus, Edit, Trash2, X } from "lucide-react"
import { useAuth } from '@/contexts/AuthContext'

interface Collection {
  _id: string;
  name: string;
  description: string;
  status: string;
  images: string[];
  products: string[];
  createdAt: string;
}

export default function CollectionsPage() {
  const [collections, setCollections] = React.useState<Collection[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [showModal, setShowModal] = React.useState(false);
  const [editingCollection, setEditingCollection] = React.useState<Collection | null>(null);
  const [collectionForm, setCollectionForm] = React.useState({
    name: "",
    description: "",
    status: "active",
    images: ["", ""]
  });
  
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  React.useEffect(() => {
    fetchCollections();
  }, []);

  const fetchCollections = async () => {
    try {
      const res = await fetch('/api/collections');
      const data = await res.json();
      setCollections(data.filter((col: Collection) => col.status === 'active'));
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async (file: File, index: number) => {
    if (!file) return
    
    try {
      const formData = new FormData()
      formData.append('file', file)
      
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      })
      
      if (response.ok) {
        const data = await response.json()
        const newImages = [...collectionForm.images]
        newImages[index] = data.imageUrl
        setCollectionForm({...collectionForm, images: newImages})
      }
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const formData = {
      name: collectionForm.name,
      description: collectionForm.description,
      status: collectionForm.status,
      images: collectionForm.images.filter(img => img && img.trim() !== '')
    };
    
    try {
      const url = editingCollection ? `/api/collections/${editingCollection._id}` : '/api/collections';
      const method = editingCollection ? 'PUT' : 'POST';
      
      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchCollections();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving collection:', error);
    }
  };

  const handleEdit = (collection: Collection) => {
    setEditingCollection(collection);
    setCollectionForm({
      name: collection.name,
      description: collection.description,
      status: collection.status,
      images: [...collection.images, "", ""].slice(0, 2)
    });
    setShowModal(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm('Are you sure you want to delete this collection?')) {
      try {
        await fetch(`/api/collections/${id}`, { method: 'DELETE' });
        fetchCollections();
      } catch (error) {
        console.error('Error deleting collection:', error);
      }
    }
  };

  const resetForm = () => {
    setCollectionForm({
      name: "",
      description: "",
      status: "active",
      images: ["", ""]
    });
    setEditingCollection(null);
    setShowModal(false);
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

  return (
    <div className="pt-32 pb-24 bg-background">
      {/* Hero Section with Latest Collection */}
      {collections.length > 0 && (
        <section className="mb-16">
          <div className="relative h-[80vh] overflow-hidden">
            <div className="absolute inset-0">
              {collections[0].images?.[0]?.startsWith('data:') ? (
                <img
                  src={collections[0].images[0]}
                  alt={collections[0].name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <Image
                  src={collections[0].images?.[0] || '/placeholder.svg'}
                  alt={collections[0].name}
                  fill
                  className="object-cover"
                />
              )}
            </div>
            <div className="absolute inset-0 bg-black/40" />
            <div className="relative h-full flex items-center px-6 md:px-12">
              <div className="max-w-screen-2xl mx-auto w-full">
                <div className="max-w-2xl text-white">
                  <p className="text-xs uppercase tracking-[0.3em] font-bold mb-4 opacity-90">
                    Latest Collection
                  </p>
                  <h2 className="text-4xl md:text-6xl font-serif italic mb-6 leading-tight">
                    {collections[0].name}
                  </h2>
                  <p className="text-xl mb-8 opacity-90 leading-relaxed">
                    {collections[0].description}
                  </p>
                  <Link
                    href={`/collections/${collections[0]._id}`}
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

      {/* Header */}
      <div className="px-6 md:px-12 mb-16">
        <div className="max-w-screen-2xl mx-auto">
          <div className="flex justify-between items-end">
            <div>
              <h1 className="text-5xl md:text-6xl font-serif italic mb-4">Collections</h1>
              <p className="text-muted-foreground text-sm uppercase tracking-[0.2em] max-w-2xl">
                Curated selections that define modern luxury and timeless elegance
              </p>
            </div>
            {isAdmin && (
              <button
                onClick={() => setShowModal(true)}
                className="bg-primary text-white px-4 py-2 text-xs uppercase tracking-widest font-bold hover:bg-accent smooth-transition flex items-center gap-2"
              >
                <Plus size={16} />
                Add Collection
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Collections Grid */}
      <section className="px-6 md:px-12">
        <div className="max-w-screen-2xl mx-auto">
          {collections.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {collections.map((collection, index) => (
                <div key={collection._id} className="group cursor-pointer">
                  <Link href={`/collections/${collection._id}`}>
                    {/* Collection Image */}
                    <div className="relative aspect-[4/5] mb-6 overflow-hidden bg-[#F2F2F2] rounded-sm">
                      {collection.images?.[0]?.startsWith('data:') ? (
                        <img
                          src={collection.images[0]}
                          alt={collection.name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      ) : (
                        <Image
                          src={collection.images?.[0] || '/placeholder.svg'}
                          alt={collection.name}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      
                      {/* Overlay */}
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 smooth-transition" />
                      
                      {/* Admin Controls */}
                      {isAdmin && (
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex gap-2">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleEdit(collection);
                              }}
                              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                            >
                              <Edit size={14} className="text-gray-700" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                handleDelete(collection._id);
                              }}
                              className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
                            >
                              <Trash2 size={14} className="text-red-600" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Collection Details */}
                    <div className="text-center">
                      <h3 className="text-2xl font-serif italic mb-2 group-hover:text-accent smooth-transition">
                        {collection.name}
                      </h3>
                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                        {collection.description}
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
              <p className="text-sm text-muted-foreground">Add collections from the admin panel to see them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* Admin Modal */}
      {isAdmin && showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-sm w-full max-w-md mx-4">
            <div className="p-6 border-b border-border flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-primary">
                {editingCollection ? 'Edit Collection' : 'Add New Collection'}
              </h3>
              <button onClick={resetForm} className="p-2 hover:bg-gray-100 rounded-sm">
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Collection Name
                </label>
                <input
                  type="text"
                  value={collectionForm.name}
                  onChange={(e) => setCollectionForm({...collectionForm, name: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                  placeholder="Enter collection name"
                  required
                />
              </div>
              
              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Description
                </label>
                <textarea
                  value={collectionForm.description}
                  onChange={(e) => setCollectionForm({...collectionForm, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent h-20"
                  placeholder="Enter collection description"
                  required
                />
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Status
                </label>
                <select
                  value={collectionForm.status}
                  onChange={(e) => setCollectionForm({...collectionForm, status: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-sm focus:outline-none focus:border-accent"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="text-xs uppercase tracking-widest font-bold text-gray-700 mb-2 block">
                  Collection Images (2 Images)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  {[0, 1].map((index) => (
                    <div key={index} className="border-2 border-dashed border-gray-300 rounded-sm p-4 text-center hover:border-accent smooth-transition">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleImageUpload(file, index)
                          }
                        }}
                        className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-sm file:border-0 file:text-xs file:font-medium file:bg-primary file:text-white hover:file:bg-accent"
                      />
                      {collectionForm.images[index] && (
                        <div className="mt-2">
                          <img src={collectionForm.images[index]} alt="Preview" className="w-16 h-16 object-cover rounded mx-auto" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center gap-4 pt-6 border-t border-border">
                <button
                  type="button"
                  onClick={resetForm}
                  className="px-6 py-3 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 smooth-transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-primary text-white rounded-sm hover:bg-accent smooth-transition font-bold"
                >
                  {editingCollection ? 'Update Collection' : 'Add Collection'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
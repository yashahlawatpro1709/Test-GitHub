"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Heart, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

interface ProductImage {
  id: string
  url: string
  title?: string
  metadata?: {
    jewelryDetail?: string
    originalPrice?: string
    discountedPrice?: string
    tags?: string
  }
  imageKey: string
}

// Mock product data (fallback)
const defaultFeaturedProducts = [
  {
    id: "1",
    name: "Eternal Sparkle Diamond Ring",
    description: "A timeless solitaire ring featuring a brilliant-cut diamond set in 18K white gold.",
    price: 125000,
    originalPrice: 145000,
    images: [
      {
        id: "1",
        url: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center",
        alt: "Eternal Sparkle Diamond Ring",
        isPrimary: true,
        order: 1
      }
    ],
    slug: "eternal-sparkle-diamond-ring",
    category: "rings" as const,
    specifications: {
      material: "18K White Gold",
      weight: 4.5,
      occasion: ["engagement", "wedding"],
      style: "solitaire",
      gemstones: [{
        type: "diamond",
        cut: "round",
        carat: 1.2,
        color: "D",
        clarity: "VVS1",
        certification: "GIA"
      }]
    },
    inventory: {
      quantity: 5,
      lowStockThreshold: 2,
      isInStock: true,
      isLowStock: false,
      preOrder: false
    },
    isActive: true,
    isFeatured: true,
    tags: ["bestseller", "new"],
    createdAt: new Date(),
    updatedAt: new Date(),
    sku: "ASH-ETERNAL-001",
    seo: { title: "Eternal Sparkle Diamond Ring", description: "" }
  },
  {
    id: "2",
    name: "Royal Heritage Necklace",
    description: "Traditional 22K gold necklace with intricate craftsmanship inspired by royal designs.",
    price: 89000,
    originalPrice: 99000,
    images: [
      {
        id: "2",
        url: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=600&fit=crop&crop=center",
        alt: "Royal Heritage Necklace",
        isPrimary: true,
        order: 1
      }
    ],
    slug: "royal-heritage-necklace",
    category: "necklaces" as const,
    specifications: {
      material: "22K Gold",
      weight: 12.8,
      occasion: ["wedding", "festival"],
      style: "traditional"
    },
    inventory: {
      quantity: 3,
      lowStockThreshold: 2,
      isInStock: true,
      isLowStock: true,
      preOrder: false
    },
    isActive: true,
    isFeatured: true,
    tags: ["heritage", "handcrafted"],
    createdAt: new Date(),
    updatedAt: new Date(),
    sku: "ASH-ROYAL-002",
    seo: { title: "Royal Heritage Necklace", description: "" }
  },
  {
    id: "3",
    name: "Celestial Pearl Earrings",
    description: "Elegant drop earrings adorned with lustrous pearls and rose gold accents.",
    price: 45000,
    images: [
      {
        id: "3",
        url: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&crop=center",
        alt: "Celestial Pearl Earrings",
        isPrimary: true,
        order: 1
      }
    ],
    slug: "celestial-pearl-earrings",
    category: "earrings" as const,
    specifications: {
      material: "18K Rose Gold",
      weight: 6.2,
      occasion: ["party", "formal"],
      style: "drop",
      gemstones: [{
        type: "pearl",
        cut: "round",
        carat: 0.8,
        color: "white",
        clarity: "AAA",
        certification: "Tahitian"
      }]
    },
    inventory: {
      quantity: 8,
      lowStockThreshold: 2,
      isInStock: true,
      isLowStock: false,
      preOrder: false
    },
    isActive: true,
    isFeatured: true,
    tags: ["elegant", "versatile"],
    createdAt: new Date(),
    updatedAt: new Date(),
    sku: "ASH-CELESTIAL-003",
    seo: { title: "Celestial Pearl Earrings", description: "" }
  },
  {
    id: "4",
    name: "Infinity Love Bracelet",
    description: "Delicate chain bracelet symbolizing eternal love, crafted in 14K gold.",
    price: 32000,
    originalPrice: 38000,
    images: [
      {
        id: "4",
        url: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&crop=center",
        alt: "Infinity Love Bracelet",
        isPrimary: true,
        order: 1
      }
    ],
    slug: "infinity-love-bracelet",
    category: "bracelets" as const,
    specifications: {
      material: "14K Gold",
      weight: 8.5,
      occasion: ["daily", "casual"],
      style: "chain"
    },
    inventory: {
      quantity: 12,
      lowStockThreshold: 5,
      isInStock: true,
      isLowStock: false,
      preOrder: false
    },
    isActive: true,
    isFeatured: true,
    tags: ["everyday", "gift"],
    createdAt: new Date(),
    updatedAt: new Date(),
    sku: "ASH-INFINITY-004",
    seo: { title: "Infinity Love Bracelet", description: "" }
  }
]

type FeaturedProduct = typeof defaultFeaturedProducts[number]

export function ProductShowcase() {
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()
  const [featuredProducts, setFeaturedProducts] = useState<FeaturedProduct[]>(defaultFeaturedProducts)

  // Fetch uploaded products from database
  useEffect(() => {
    async function fetchProducts() {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/site-images?section=new-arrivals&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })
        const data: { images: ProductImage[] } = await response.json()
        
        if (data.images && data.images.length > 0) {
          // Sort by numeric suffix in imageKey to match dashboard order
          const sortedImages: ProductImage[] = [...data.images].sort((a: ProductImage, b: ProductImage) => {
            const ai = parseInt((a.imageKey.match(/(\d+)/)?.[1] || '0'), 10)
            const bi = parseInt((b.imageKey.match(/(\d+)/)?.[1] || '0'), 10)
            return ai - bi
          })
          // Transform uploaded images to product format
          const uploadedProducts: FeaturedProduct[] = sortedImages.map((img: ProductImage, index: number) => {
            const defaultProduct = defaultFeaturedProducts[index % defaultFeaturedProducts.length]
            const tags = img.metadata?.tags ? img.metadata.tags.split(',').map((t: string) => t.trim()) : []
            
            return {
              ...defaultProduct,
              id: img.id,
              name: img.title || defaultProduct.name,
              description: img.metadata?.jewelryDetail || defaultProduct.description,
              price: img.metadata?.discountedPrice ? parseFloat(img.metadata.discountedPrice.replace(/[^0-9.]/g, '')) : defaultProduct.price,
              originalPrice: img.metadata?.originalPrice ? parseFloat(img.metadata.originalPrice.replace(/[^0-9.]/g, '')) : (defaultProduct.originalPrice ?? defaultProduct.price),
              images: [{
                id: img.id,
                url: img.url,
                alt: img.title || 'Product',
                isPrimary: true,
                order: 1
              }],
              slug: img.imageKey,
              tags: tags.length > 0 ? tags : defaultProduct.tags,
              specifications: {
                ...defaultProduct.specifications,
                material: img.metadata?.jewelryDetail?.split('•')[0]?.trim() || defaultProduct.specifications.material,
                weight: img.metadata?.jewelryDetail?.split('•')[1] ? parseFloat(img.metadata.jewelryDetail.split('•')[1].replace(/[^0-9.]/g, '')) : defaultProduct.specifications.weight,
                occasion: tags.length > 0 ? tags : defaultProduct.specifications.occasion
              }
            } as FeaturedProduct
          })
          
          setFeaturedProducts(uploadedProducts)
        }
      } catch {
        toast.error('Failed to load new arrivals')
      }
    }

    fetchProducts()
  }, [])

  const handleAddToCart = (product: FeaturedProduct) => {
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleToggleWishlist = (product: FeaturedProduct) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          {/* Royal Crown Icon */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              <div className="w-16 h-16 bg-gradient-to-br from-champagne-gold via-yellow-400 to-champagne-gold rounded-full flex items-center justify-center shadow-2xl border-2 border-champagne-gold/30">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 16L3 6h5.5l1.5 3 1.5-3H17l-2 10H5zm2.7-2h8.6l.9-4.4h-2.7L12 12l-2.5-2.4H6.8L7.7 14z"/>
                </svg>
              </div>
              <div className="absolute -inset-2 bg-gradient-to-r from-champagne-gold/20 via-transparent to-champagne-gold/20 rounded-full blur-xl"></div>
            </div>
          </motion.div>

          {/* Premium Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 bg-gradient-to-r from-emerald-500/10 via-emerald-400/5 to-emerald-500/10 px-8 py-3 rounded-full mb-8 border border-emerald-500/30 backdrop-blur-sm shadow-lg shadow-emerald-500/10"
          >
            <motion.div 
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            ></motion.div>
            <span className="text-emerald-600 font-bold text-sm tracking-wider uppercase flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Just Arrived • Fresh Collection
            </span>
            <motion.div 
              className="w-2 h-2 bg-emerald-500 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity, delay: 1 }}
            ></motion.div>
          </motion.div>

          {/* Majestic Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-transparent bg-gradient-to-r from-deep-black via-gray-800 to-deep-black bg-clip-text mb-8 leading-tight"
          >
            New Arrivals
          </motion.h2>

          {/* Royal Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-center mb-8"
          >
            <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent w-32"></div>
            <div className="mx-4 w-3 h-3 bg-champagne-gold rounded-full"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent w-32"></div>
          </motion.div>

          {/* Elegant Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed font-light"
          >
            Discover our latest collection of exquisite jewelry pieces, freshly curated for you. 
            Each design represents the perfect blend of contemporary elegance and timeless craftsmanship, 
            bringing you the finest in luxury jewelry.
          </motion.p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="luxury-card overflow-hidden hover:shadow-gold transition-all duration-500 group-hover:-translate-y-2">
                {/* Product Image */}
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    unoptimized={product.images[0].url.startsWith('/uploads')}
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.tags.includes('bestseller') && (
                      <div className="bg-champagne-gold text-white px-2 py-1 rounded text-xs font-bold">
                        Bestseller
                      </div>
                    )}
                    {product.tags.includes('new') && (
                      <div className="bg-emerald text-white px-2 py-1 rounded text-xs font-bold">
                        New
                      </div>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleToggleWishlist(product)}
                      className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-elegant"
                    >
                      <Heart 
                        className={`h-4 w-4 ${
                          isInWishlist(product.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                    <Link href={`/products/${product.slug}`}>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="bg-white/90 backdrop-blur-sm hover:bg-white shadow-elegant"
                      >
                        <Eye className="h-4 w-4 text-gray-600" />
                      </Button>
                    </Link>
                  </div>

                  {/* Quick Add to Cart */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      onClick={() => handleAddToCart(product)}
                      className="w-full bg-champagne-gold hover:bg-champagne-gold/90 text-white"
                    >
                      <ShoppingBag className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                </div>

                {/* Product Info */}
                <div className="p-6">
                  <div className="mb-2">
                    <h3 className="font-semibold text-deep-black group-hover:text-champagne-gold transition-colors duration-300">
                      {product.name}
                    </h3>
                    <p className="text-sm text-warm-gray capitalize">
                      {product.specifications.material} • {product.specifications.weight}g
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg font-bold text-champagne-gold">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Product Tags */}
                  <div className="flex flex-wrap gap-1">
                    {product.specifications.occasion?.slice(0, 2).map((occasion) => (
                      <span
                        key={occasion}
                        className="text-xs bg-champagne-gold/10 text-champagne-gold px-2 py-1 rounded capitalize"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Products Button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/products">
            <Button variant="luxury" size="lg" className="group">
              View All Products
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

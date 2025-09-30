"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Eye, Heart, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

// Mock product data
const featuredProducts = [
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

export function ProductShowcase() {
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const handleAddToCart = (product: typeof featuredProducts[0]) => {
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleToggleWishlist = (product: typeof featuredProducts[0]) => {
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
          <div className="inline-flex items-center gap-2 bg-champagne-gold/10 px-4 py-2 rounded-full mb-6">
            <Sparkles className="h-4 w-4 text-champagne-gold" />
            <span className="text-champagne-gold font-medium text-sm">Handpicked for You</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-6">
            Featured Masterpieces
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed">
            Discover our most loved pieces, each carefully crafted to perfection. 
            These exceptional designs have captured hearts and created unforgettable moments.
          </p>
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
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.originalPrice && (
                      <div className="bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </div>
                    )}
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
                    {product.inventory.isLowStock && (
                      <div className="bg-orange-500 text-white px-2 py-1 rounded text-xs font-bold">
                        Low Stock
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

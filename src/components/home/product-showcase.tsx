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
    <section className="relative py-24 bg-gradient-to-b from-slate-50 via-white to-slate-50 overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 border border-champagne-gold/20 rotate-45"></div>
        <div className="absolute top-40 right-20 w-24 h-24 border border-champagne-gold/20 rotate-12"></div>
        <div className="absolute bottom-32 left-1/4 w-20 h-20 border border-champagne-gold/20 rotate-45"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 border border-champagne-gold/20 rotate-12"></div>
      </div>
      
      {/* Elegant Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/5 to-transparent"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Ultra-Luxury Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true }}
          className="text-center mb-20"
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
            className="inline-flex items-center gap-3 bg-gradient-to-r from-champagne-gold/10 via-champagne-gold/5 to-champagne-gold/10 px-8 py-3 rounded-full mb-8 border border-champagne-gold/20 backdrop-blur-sm"
          >
            <div className="w-2 h-2 bg-champagne-gold rounded-full animate-pulse"></div>
            <span className="text-champagne-gold font-semibold text-sm tracking-wider uppercase">Handpicked for You</span>
            <div className="w-2 h-2 bg-champagne-gold rounded-full animate-pulse"></div>
          </motion.div>

          {/* Majestic Title */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-transparent bg-gradient-to-r from-deep-black via-gray-800 to-deep-black bg-clip-text mb-8 leading-tight"
          >
            Featured Masterpieces
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
            Discover our most coveted pieces, each meticulously crafted to perfection. 
            These extraordinary designs have captured hearts and created unforgettable moments 
            for generations of discerning connoisseurs.
          </motion.p>
        </motion.div>

        {/* Ultra-Luxury Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10 mb-20">
          {featuredProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 60, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.15,
                ease: "easeOut"
              }}
              viewport={{ once: true }}
              className="group relative"
            >
              {/* Royal Card Container */}
              <div className="relative bg-white rounded-2xl overflow-hidden shadow-2xl border border-champagne-gold/10 hover:border-champagne-gold/30 transition-all duration-700 group-hover:-translate-y-3 group-hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)]">
                
                {/* Luxury Corner Decorations */}
                <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-champagne-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute top-0 right-0 w-8 h-8 border-r-2 border-t-2 border-champagne-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 left-0 w-8 h-8 border-l-2 border-b-2 border-champagne-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-champagne-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Premium Image Container */}
                <div className="relative aspect-square overflow-hidden bg-gradient-to-br from-slate-50 to-white">
                  {/* Elegant Image Frame */}
                  <div className="absolute inset-2 border border-champagne-gold/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <Image
                    src={product.images[0].url}
                    alt={product.images[0].alt}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-105 group-hover:brightness-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  
                  {/* Luxury Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Premium Badges */}
                  <div className="absolute top-4 left-4 flex flex-col gap-2">
                    {product.originalPrice && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.5 }}
                        className="bg-gradient-to-r from-red-600 to-red-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                      >
                        {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                      </motion.div>
                    )}
                    {product.tags.includes('bestseller') && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.6 }}
                        className="bg-gradient-to-r from-champagne-gold to-yellow-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                      >
                        ★ Bestseller
                      </motion.div>
                    )}
                    {product.tags.includes('new') && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.7 }}
                        className="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm"
                      >
                        ✦ New
                      </motion.div>
                    )}
                    {product.inventory.isLowStock && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: index * 0.1 + 0.8 }}
                        className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm animate-pulse"
                      >
                        ⚡ Limited
                      </motion.div>
                    )}
                  </div>

                  {/* Sophisticated Quick Actions */}
                  <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleWishlist(product)}
                        className="bg-white/95 backdrop-blur-md hover:bg-white shadow-xl border border-champagne-gold/20 hover:border-champagne-gold/40 rounded-full w-12 h-12"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors ${
                            isInWishlist(product.id) 
                              ? 'text-red-500 fill-current' 
                              : 'text-gray-600 hover:text-red-500'
                          }`} 
                        />
                      </Button>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                      <Link href={`/products/${product.slug}`}>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="bg-white/95 backdrop-blur-md hover:bg-white shadow-xl border border-champagne-gold/20 hover:border-champagne-gold/40 rounded-full w-12 h-12"
                        >
                          <Eye className="h-5 w-5 text-gray-600 hover:text-champagne-gold transition-colors" />
                        </Button>
                      </Link>
                    </motion.div>
                  </div>

                  {/* Elegant Add to Cart */}
                  <div className="absolute bottom-4 left-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="w-full bg-gradient-to-r from-champagne-gold via-yellow-500 to-champagne-gold hover:from-champagne-gold/90 hover:via-yellow-500/90 hover:to-champagne-gold/90 text-white font-semibold py-3 rounded-xl shadow-xl border border-champagne-gold/30 backdrop-blur-sm"
                      >
                        <ShoppingBag className="mr-2 h-4 w-4" />
                        Add to Collection
                      </Button>
                    </motion.div>
                  </div>
                </div>

                {/* Royal Product Information */}
                <div className="p-6 bg-gradient-to-b from-white to-slate-50/50">
                  {/* Luxury Divider */}
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent w-full"></div>
                    <div className="mx-3 w-2 h-2 bg-champagne-gold rounded-full"></div>
                    <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/30 to-transparent w-full"></div>
                  </div>

                  <div className="mb-4">
                    <h3 className="font-playfair font-bold text-lg text-deep-black group-hover:text-champagne-gold transition-colors duration-300 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-sm text-warm-gray font-medium tracking-wide">
                      {product.specifications.material} • {product.specifications.weight}g
                    </p>
                  </div>
                  
                  {/* Premium Pricing */}
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-xl font-bold text-transparent bg-gradient-to-r from-champagne-gold to-yellow-600 bg-clip-text">
                      {formatPrice(product.price)}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-400 line-through font-medium">
                        {formatPrice(product.originalPrice)}
                      </span>
                    )}
                  </div>

                  {/* Elegant Product Tags */}
                  <div className="flex flex-wrap gap-2">
                    {product.specifications.occasion?.slice(0, 2).map((occasion) => (
                      <span
                        key={occasion}
                        className="text-xs bg-gradient-to-r from-champagne-gold/10 to-champagne-gold/5 text-champagne-gold px-3 py-1.5 rounded-full capitalize font-medium border border-champagne-gold/20"
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

        {/* Royal View All Products Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          viewport={{ once: true }}
          className="text-center"
        >
          {/* Elegant Divider */}
          <div className="flex items-center justify-center mb-8">
            <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent w-24"></div>
            <div className="mx-6 w-4 h-4 bg-gradient-to-br from-champagne-gold to-yellow-500 rounded-full shadow-lg"></div>
            <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold/40 to-transparent w-24"></div>
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link href="/products">
              <Button 
                variant="luxury" 
                size="lg" 
                className="group relative bg-gradient-to-r from-champagne-gold via-yellow-500 to-champagne-gold hover:from-champagne-gold/90 hover:via-yellow-500/90 hover:to-champagne-gold/90 text-white font-bold px-12 py-4 rounded-2xl shadow-2xl border-2 border-champagne-gold/30 hover:border-champagne-gold/50 transition-all duration-500 overflow-hidden"
              >
                {/* Shimmer Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                
                <span className="relative z-10 text-lg tracking-wide">Explore Our Complete Collection</span>
                <ArrowRight className="relative z-10 ml-3 h-6 w-6 transition-transform group-hover:translate-x-2 duration-300" />
              </Button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

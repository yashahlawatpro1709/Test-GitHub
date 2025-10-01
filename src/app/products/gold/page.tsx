"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, Heart, Sparkles, ArrowRight, Filter, Grid, List, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPriceNumber } from '@/lib/utils'

const goldProducts = [
  {
    id: 1,
    name: "Royal Heritage Necklace",
    price: 89000,
    originalPrice: 99000,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
    category: "Necklaces",
    purity: "22K",
    weight: "12.8g",
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    name: "Eternal Elegance Ring",
    price: 45000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&h=400&fit=crop&crop=center",
    category: "Rings",
    purity: "18K",
    weight: "6.2g",
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Celestial Drop Earrings",
    price: 32000,
    originalPrice: 38000,
    image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center",
    category: "Earrings",
    purity: "18K",
    weight: "4.5g",
    isNew: false,
    isBestseller: false
  },
  {
    id: 4,
    name: "Infinity Love Bracelet",
    price: 28000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center",
    category: "Bracelets",
    purity: "14K",
    weight: "8.5g",
    isNew: true,
    isBestseller: false
  },
  {
    id: 5,
    name: "Majestic Crown Pendant",
    price: 65000,
    originalPrice: 72000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center",
    category: "Pendants",
    purity: "22K",
    weight: "10.2g",
    isNew: false,
    isBestseller: true
  },
  {
    id: 6,
    name: "Golden Lotus Bangles",
    price: 55000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop&crop=center",
    category: "Bangles",
    purity: "22K",
    weight: "15.8g",
    isNew: false,
    isBestseller: false
  }
]

const categories = ["All", "Necklaces", "Rings", "Earrings", "Bracelets", "Pendants", "Bangles"]
const purities = ["All", "14K", "18K", "22K"]
const priceRanges = ["All", "Under ₹30,000", "₹30,000 - ₹50,000", "₹50,000 - ₹80,000", "Above ₹80,000"]

export default function GoldPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedPurity, setSelectedPurity] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredProducts, setFilteredProducts] = useState(goldProducts)

  useEffect(() => {
    let filtered = goldProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedPurity !== "All") {
      filtered = filtered.filter(product => product.purity === selectedPurity)
    }

    if (selectedPriceRange !== "All") {
      filtered = filtered.filter(product => {
        switch (selectedPriceRange) {
          case "Under ₹30,000":
            return product.price < 30000
          case "₹30,000 - ₹50,000":
            return product.price >= 30000 && product.price <= 50000
          case "₹50,000 - ₹80,000":
            return product.price >= 50000 && product.price <= 80000
          case "Above ₹80,000":
            return product.price > 80000
          default:
            return true
        }
      })
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedPurity, selectedPriceRange])

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-yellow-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/50 to-yellow-100/50" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-amber-300/20 to-yellow-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-yellow-300/20 to-amber-400/20 rounded-full blur-xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </div>

        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex items-center justify-center mb-6"
            >
              <Crown className="h-8 w-8 text-amber-600 mr-3" />
              <span className="text-amber-700 font-medium tracking-wider uppercase text-sm">
                Premium Gold Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-playfair font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-amber-600 via-yellow-600 to-amber-700 bg-clip-text text-transparent">
                Golden
              </span>
              <br />
              Elegance
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Discover our exquisite collection of handcrafted gold jewelry, where timeless tradition meets contemporary elegance.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <Star className="h-4 w-4 text-amber-500 mr-2" />
                <span>Premium Quality</span>
              </div>
              <div className="flex items-center">
                <Heart className="h-4 w-4 text-amber-500 mr-2" />
                <span>Handcrafted</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-amber-500 mr-2" />
                <span>Certified Purity</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-amber-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-amber-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Purity Filter */}
              <div className="relative">
                <select
                  value={selectedPurity}
                  onChange={(e) => setSelectedPurity(e.target.value)}
                  className="appearance-none bg-white border border-amber-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  {purities.map(purity => (
                    <option key={purity} value={purity}>{purity}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="appearance-none bg-white border border-amber-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent"
                >
                  {priceRanges.map(range => (
                    <option key={range} value={range}>{range}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'grid' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-amber-100 text-amber-700' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredProducts.length} of {goldProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedPurity}-${selectedPriceRange}-${viewMode}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className={
                viewMode === 'grid'
                  ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                  : "space-y-6"
              }
            >
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={
                    viewMode === 'grid'
                      ? "group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                      : "group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex"
                  }
                >
                  {/* Product Badges */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                    {product.isNew && (
                      <span className="bg-gradient-to-r from-green-500 to-emerald-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        New
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                  </div>

                  {/* Product Image */}
                  <div className={viewMode === 'grid' ? "relative h-80 overflow-hidden" : "relative w-64 h-64 flex-shrink-0 overflow-hidden"}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  {/* Product Info */}
                  <div className={viewMode === 'grid' ? "p-6" : "flex-1 p-6 flex flex-col justify-between"}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-amber-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {product.purity} • {product.weight}
                        </span>
                      </div>

                      <h3 className="text-xl font-playfair font-bold text-gray-900 mb-3 group-hover:text-amber-700 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
                          ₹{formatPriceNumber(product.price)}
                        </span>
                        {product.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
                            ₹{formatPriceNumber(product.originalPrice)}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
                      >
                        View Details
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>

          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-gray-400 mb-4">
                <Filter className="h-16 w-16 mx-auto" />
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No products found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-amber-100 to-yellow-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our expert craftsmen can create custom gold jewelry pieces tailored to your unique style and preferences.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 text-white"
              >
                Custom Design
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-amber-300 text-amber-700 hover:bg-amber-50"
              >
                Contact Expert
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
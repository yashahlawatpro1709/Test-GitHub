"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Diamond, Star, Heart, Sparkles, ArrowRight, Filter, Grid, List, ChevronDown, Award, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { formatPriceNumber } from '@/lib/utils'

const diamondProducts = [
  {
    id: 1,
    name: "Eternal Solitaire Ring",
    price: 125000,
    originalPrice: 140000,
    image: "https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&h=400&fit=crop&crop=center",
    category: "Rings",
    carat: "1.2ct",
    cut: "Round Brilliant",
    clarity: "VS1",
    color: "F",
    certification: "GIA",
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    name: "Royal Diamond Necklace",
    price: 285000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center",
    category: "Necklaces",
    carat: "3.5ct",
    cut: "Mixed",
    clarity: "VVS2",
    color: "D",
    certification: "GIA",
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Brilliant Drop Earrings",
    price: 95000,
    originalPrice: 110000,
    image: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center",
    category: "Earrings",
    carat: "0.8ct",
    cut: "Pear",
    clarity: "VS2",
    color: "G",
    certification: "IGI",
    isNew: false,
    isBestseller: false
  },
  {
    id: 4,
    name: "Tennis Diamond Bracelet",
    price: 165000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center",
    category: "Bracelets",
    carat: "2.1ct",
    cut: "Round Brilliant",
    clarity: "VS1",
    color: "F",
    certification: "GIA",
    isNew: true,
    isBestseller: false
  },
  {
    id: 5,
    name: "Princess Cut Pendant",
    price: 75000,
    originalPrice: 85000,
    image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center",
    category: "Pendants",
    carat: "0.6ct",
    cut: "Princess",
    clarity: "VVS1",
    color: "E",
    certification: "GIA",
    isNew: false,
    isBestseller: true
  },
  {
    id: 6,
    name: "Halo Diamond Ring",
    price: 145000,
    originalPrice: null,
    image: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop&crop=center",
    category: "Rings",
    carat: "1.5ct",
    cut: "Cushion",
    clarity: "VS2",
    color: "G",
    certification: "IGI",
    isNew: false,
    isBestseller: false
  }
]

const categories = ["All", "Rings", "Necklaces", "Earrings", "Bracelets", "Pendants"]
const cuts = ["All", "Round Brilliant", "Princess", "Cushion", "Pear", "Mixed"]
const clarities = ["All", "FL", "IF", "VVS1", "VVS2", "VS1", "VS2"]
const colors = ["All", "D", "E", "F", "G", "H"]
const priceRanges = ["All", "Under ₹1,00,000", "₹1,00,000 - ₹2,00,000", "₹2,00,000 - ₹3,00,000", "Above ₹3,00,000"]

export default function DiamondPage() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [selectedCut, setSelectedCut] = useState("All")
  const [selectedClarity, setSelectedClarity] = useState("All")
  const [selectedColor, setSelectedColor] = useState("All")
  const [selectedPriceRange, setSelectedPriceRange] = useState("All")
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [filteredProducts, setFilteredProducts] = useState(diamondProducts)

  useEffect(() => {
    let filtered = diamondProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedCut !== "All") {
      filtered = filtered.filter(product => product.cut === selectedCut)
    }

    if (selectedClarity !== "All") {
      filtered = filtered.filter(product => product.clarity === selectedClarity)
    }

    if (selectedColor !== "All") {
      filtered = filtered.filter(product => product.color === selectedColor)
    }

    if (selectedPriceRange !== "All") {
      filtered = filtered.filter(product => {
        switch (selectedPriceRange) {
          case "Under ₹1,00,000":
            return product.price < 100000
          case "₹1,00,000 - ₹2,00,000":
            return product.price >= 100000 && product.price <= 200000
          case "₹2,00,000 - ₹3,00,000":
            return product.price >= 200000 && product.price <= 300000
          case "Above ₹3,00,000":
            return product.price > 300000
          default:
            return true
        }
      })
    }

    setFilteredProducts(filtered)
  }, [selectedCategory, selectedCut, selectedClarity, selectedColor, selectedPriceRange])

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 via-indigo-50 to-white">
      {/* Hero Section */}
      <section className="relative pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-100/50 to-indigo-100/50" />
        <div className="absolute inset-0">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-indigo-400/20 rounded-full blur-xl"
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
          <motion.div
            className="absolute bottom-20 right-10 w-24 h-24 bg-gradient-to-br from-indigo-300/20 to-purple-400/20 rounded-full blur-xl"
            animate={{
              scale: [1.3, 1, 1.3],
              opacity: [0.7, 0.3, 0.7],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 4,
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
              <Diamond className="h-8 w-8 text-blue-600 mr-3" />
              <span className="text-blue-700 font-medium tracking-wider uppercase text-sm">
                Certified Diamond Collection
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-5xl lg:text-7xl font-playfair font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
                Brilliant
              </span>
              <br />
              Diamonds
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Experience the ultimate in luxury with our collection of certified diamonds, each stone carefully selected for its exceptional brilliance and fire.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center gap-6 text-sm text-gray-500"
            >
              <div className="flex items-center">
                <Award className="h-4 w-4 text-blue-500 mr-2" />
                <span>GIA Certified</span>
              </div>
              <div className="flex items-center">
                <Gem className="h-4 w-4 text-blue-500 mr-2" />
                <span>Conflict-Free</span>
              </div>
              <div className="flex items-center">
                <Sparkles className="h-4 w-4 text-blue-500 mr-2" />
                <span>Exceptional Cut</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-8 bg-white/80 backdrop-blur-sm border-y border-blue-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Category Filter */}
              <div className="relative">
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="appearance-none bg-white border border-blue-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Cut Filter */}
              <div className="relative">
                <select
                  value={selectedCut}
                  onChange={(e) => setSelectedCut(e.target.value)}
                  className="appearance-none bg-white border border-blue-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {cuts.map(cut => (
                    <option key={cut} value={cut}>{cut}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Clarity Filter */}
              <div className="relative">
                <select
                  value={selectedClarity}
                  onChange={(e) => setSelectedClarity(e.target.value)}
                  className="appearance-none bg-white border border-blue-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {clarities.map(clarity => (
                    <option key={clarity} value={clarity}>{clarity}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Color Filter */}
              <div className="relative">
                <select
                  value={selectedColor}
                  onChange={(e) => setSelectedColor(e.target.value)}
                  className="appearance-none bg-white border border-blue-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                >
                  {colors.map(color => (
                    <option key={color} value={color}>{color}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
              </div>

              {/* Price Filter */}
              <div className="relative">
                <select
                  value={selectedPriceRange}
                  onChange={(e) => setSelectedPriceRange(e.target.value)}
                  className="appearance-none bg-white border border-blue-200 rounded-lg px-4 py-2 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
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
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <Grid className="h-4 w-4" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded-lg transition-colors ${
                  viewMode === 'list' 
                    ? 'bg-blue-100 text-blue-700' 
                    : 'text-gray-400 hover:text-gray-600'
                }`}
              >
                <List className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-4 text-sm text-gray-500">
            Showing {filteredProducts.length} of {diamondProducts.length} products
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedCategory}-${selectedCut}-${selectedClarity}-${selectedColor}-${selectedPriceRange}-${viewMode}`}
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
                      <span className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Bestseller
                      </span>
                    )}
                    {product.originalPrice && (
                      <span className="bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                        Sale
                      </span>
                    )}
                    <span className="bg-gradient-to-r from-purple-500 to-violet-600 text-white text-xs font-medium px-3 py-1 rounded-full">
                      {product.certification}
                    </span>
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
                    
                    {/* Diamond sparkle effect */}
                    <motion.div
                      className="absolute inset-0 pointer-events-none"
                      initial={{ opacity: 0 }}
                      whileHover={{ opacity: 1 }}
                      transition={{ duration: 0.3 }}
                    >
                      {[...Array(6)].map((_, i) => (
                        <motion.div
                          key={i}
                          className="absolute w-1 h-1 bg-white rounded-full"
                          style={{
                            left: `${20 + i * 15}%`,
                            top: `${30 + (i % 2) * 20}%`,
                          }}
                          animate={{
                            scale: [0, 1, 0],
                            opacity: [0, 1, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </motion.div>
                  </div>

                  {/* Product Info */}
                  <div className={viewMode === 'grid' ? "p-6" : "flex-1 p-6 flex flex-col justify-between"}>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs font-medium text-blue-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {product.carat} • {product.cut}
                        </span>
                      </div>

                      <h3 className="text-xl font-playfair font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {product.name}
                      </h3>

                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                        <span>Clarity: {product.clarity}</span>
                        <span>Color: {product.color}</span>
                      </div>

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
                        className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                      >
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist
                      </Button>
                      <Button
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
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
              <h3 className="text-xl font-semibold text-gray-600 mb-2">No diamonds found</h3>
              <p className="text-gray-500">Try adjusting your filters to see more results.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Diamond Education Section */}
      <section className="py-16 bg-gradient-to-r from-blue-100 to-indigo-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
              The 4 C's of Diamonds
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Understanding the four characteristics that determine a diamond's quality and value.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Cut", description: "Determines brilliance and fire", icon: Diamond },
              { title: "Color", description: "Graded from D (colorless) to Z", icon: Sparkles },
              { title: "Clarity", description: "Measures internal flaws", icon: Gem },
              { title: "Carat", description: "Weight and size of diamond", icon: Star }
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 bg-white rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <item.icon className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-100 to-purple-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-playfair font-bold text-gray-900 mb-4">
              Need Help Choosing the Perfect Diamond?
            </h2>
            <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
              Our certified gemologists are here to guide you through selecting the perfect diamond for your special moment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
              >
                Consult Expert
                <ArrowRight className="h-5 w-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-300 text-blue-700 hover:bg-blue-50"
              >
                Diamond Guide
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
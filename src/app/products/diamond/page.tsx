"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Diamond, Star, Heart, Sparkles, ArrowRight, Filter, Grid, List, ChevronDown, Award, Gem, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
<<<<<<< Updated upstream
=======
import { formatPriceNumber } from '@/lib/utils'
import { useCartStore, useWishlistStore } from '@/store'
>>>>>>> Stashed changes

// Fetch products from database
const fetchDiamondProducts = async () => {
  try {
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/site-images?section=diamond-jewelry&t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Failed to fetch diamond products:', error)
    return []
  }
}

const diamondProductsDummy = [
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
  const [diamondProducts, setDiamondProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  
  // Cart and Wishlist stores
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const handleAddToCart = (product: any) => {
    const productData = {
      id: product.id,
      name: product.title || product.name,
      price: parseFloat((product.metadata?.price || product.price).toString().replace(/[^0-9.]/g, '')),
      images: [product.url || product.image],
      slug: product.id,
    } as any
    addToCart(productData)
  }

  const handleToggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      const wishlistData = {
        id: product.id,
        productId: product.id,
        product: {
          name: product.title || product.name,
          images: [product.url || product.image],
          slug: product.id,
        },
        price: parseFloat((product.metadata?.price || product.price).toString().replace(/[^0-9.]/g, '')),
        addedAt: new Date()
      } as any
      addToWishlist(wishlistData)
    }
  }

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      const products = await fetchDiamondProducts()
      setDiamondProducts(products)
      setFilteredProducts(products)
      setLoading(false)
    }
    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = diamondProducts

    if (selectedCategory !== "All") {
      filtered = filtered.filter(product => product.metadata?.category === selectedCategory.toLowerCase())
    }

    if (selectedCut !== "All") {
      filtered = filtered.filter(product => product.metadata?.cut === selectedCut)
    }

    if (selectedClarity !== "All") {
      filtered = filtered.filter(product => product.metadata?.clarity === selectedClarity)
    }

    if (selectedColor !== "All") {
      filtered = filtered.filter(product => product.metadata?.color === selectedColor)
    }

    if (selectedPriceRange !== "All") {
      filtered = filtered.filter(product => {
        const priceStr = product.metadata?.price || ''
        const price = parseInt(priceStr.replace(/[^0-9]/g, ''))
        
        switch (selectedPriceRange) {
          case "Under ₹1,00,000":
            return price < 100000
          case "₹1,00,000 - ₹2,00,000":
            return price >= 100000 && price <= 200000
          case "₹2,00,000 - ₹3,00,000":
            return price >= 200000 && price <= 300000
          case "Above ₹3,00,000":
            return price > 300000
          default:
            return true
        }
      })
    }

    setFilteredProducts(filtered)
  }, [diamondProducts, selectedCategory, selectedCut, selectedClarity, selectedColor, selectedPriceRange])

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
                      src={product.url || product.image}
                      alt={product.title || product.name}
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
                          {product.metadata?.category || product.category}
                        </span>
                        <span className="text-xs font-medium text-gray-500">
                          {product.metadata?.diamondCarat || product.carat} • {product.metadata?.cut || product.cut}
                        </span>
                      </div>

                      <h3 className="text-xl font-playfair font-bold text-gray-900 mb-3 group-hover:text-blue-700 transition-colors">
                        {product.title || product.name}
                      </h3>

                      {product.description && (
                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                      )}

                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-600">
                        {product.metadata?.clarity && <span>Clarity: {product.metadata.clarity}</span>}
                        {product.metadata?.color && <span>Color: {product.metadata.color}</span>}
                      </div>

                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-2xl font-bold text-gray-900">
<<<<<<< Updated upstream
                          ₹{product.price.toLocaleString()}
=======
                          {product.metadata?.price || `₹${formatPriceNumber(product.price)}`}
>>>>>>> Stashed changes
                        </span>
                        {product.metadata?.originalPrice && (
                          <span className="text-lg text-gray-500 line-through">
<<<<<<< Updated upstream
                            ₹{product.originalPrice.toLocaleString()}
=======
                            {product.metadata.originalPrice}
>>>>>>> Stashed changes
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
                        onClick={() => {
                          setSelectedProduct(product)
                          setShowDetailsModal(true)
                        }}
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

      {/* Premium Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md" onClick={() => setShowDetailsModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-5xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
          >
            <div className="relative">
              {/* Elegant Close Button */}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-white/95 backdrop-blur-sm hover:bg-white transition-all border border-gray-200 group"
              >
                <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 overflow-y-auto max-h-[90vh]">
                {/* Left Side - Product Image */}
                <div className="relative bg-gradient-to-br from-slate-50 to-white p-12 flex items-center justify-center border-r border-gray-100">
                  <div className="relative w-full aspect-square">
                    <Image
                      src={selectedProduct.url || selectedProduct.image}
                      alt={selectedProduct.title || selectedProduct.name}
                      fill
                      className="object-contain"
                    />
                  </div>
                  {/* Decorative Corner Elements */}
                  <div className="absolute top-8 left-8 w-12 h-12 border-l border-t border-gray-200"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r border-t border-gray-200"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l border-b border-gray-200"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r border-b border-gray-200"></div>
                </div>

                {/* Right Side - Product Details */}
                <div className="p-10 bg-white">
                <h2 className="text-3xl font-playfair font-bold text-gray-900 mb-4">
                  {selectedProduct.title || selectedProduct.name}
                </h2>

                  {selectedProduct.description && (
                    <p className="text-gray-500 mb-8 leading-relaxed font-light">
                      {selectedProduct.description}
                    </p>
                  )}

                  {/* Diamond Specifications */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-200"></div>
                      <span className="text-xs tracking-[0.2em] uppercase text-gray-400 font-light">Specifications</span>
                      <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      {selectedProduct.metadata?.cut && (
                        <div className="p-4 border border-gray-100 bg-slate-50">
                          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-light">Cut</div>
                          <div className="text-sm font-medium text-gray-900">{selectedProduct.metadata.cut}</div>
                        </div>
                      )}
                      {selectedProduct.metadata?.clarity && (
                        <div className="p-4 border border-gray-100 bg-slate-50">
                          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-light">Clarity</div>
                          <div className="text-sm font-medium text-gray-900">{selectedProduct.metadata.clarity}</div>
                        </div>
                      )}
                      {selectedProduct.metadata?.color && (
                        <div className="p-4 border border-gray-100 bg-slate-50">
                          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-light">Color</div>
                          <div className="text-sm font-medium text-gray-900">{selectedProduct.metadata.color}</div>
                        </div>
                      )}
                      {selectedProduct.metadata?.diamondCarat && (
                        <div className="p-4 border border-gray-100 bg-slate-50">
                          <div className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-light">Carat</div>
                          <div className="text-sm font-medium text-gray-900">{selectedProduct.metadata.diamondCarat}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Detailed Description */}
                  {selectedProduct.metadata?.detailedDescription && (
                    <div className="mb-8">
                      <h3 className="text-sm tracking-[0.15em] uppercase text-gray-900 mb-4 font-medium">About This Piece</h3>
                      <p className="text-gray-600 leading-relaxed whitespace-pre-line font-light text-sm">
                        {selectedProduct.metadata.detailedDescription}
                      </p>
                    </div>
                  )}

                  {/* Additional Details */}
                  {(selectedProduct.metadata?.metal || selectedProduct.metadata?.diamond) && (
                    <div className="mb-8 space-y-4">
                      {selectedProduct.metadata?.metal && (
                        <div className="pb-4 border-b border-gray-100">
                          <h4 className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-light">Metal</h4>
                          <p className="text-gray-700 text-sm font-light">{selectedProduct.metadata.metal}</p>
                        </div>
                      )}
                      {selectedProduct.metadata?.diamond && (
                        <div className="pb-4 border-b border-gray-100">
                          <h4 className="text-[10px] tracking-[0.2em] uppercase text-gray-400 mb-2 font-light">Diamond Details</h4>
                          <p className="text-gray-700 text-sm font-light">{selectedProduct.metadata.diamond}</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Price */}
                  <div className="mb-8 pt-6 border-t border-gray-200">
                    <div className="flex items-baseline gap-3">
                      <span className="text-3xl font-light text-gray-900 tracking-wide">
                        {selectedProduct.metadata?.price || `₹${formatPriceNumber(selectedProduct.price)}`}
                      </span>
                      {selectedProduct.metadata?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through font-light">
                          {selectedProduct.metadata.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => {
                        handleAddToCart(selectedProduct)
                        setShowDetailsModal(false)
                      }}
                      className="flex-1 bg-black hover:bg-gray-900 text-white py-6 text-sm tracking-[0.1em] uppercase font-light"
                    >
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => handleToggleWishlist(selectedProduct)}
                      className="w-14 h-14 border-gray-200 hover:bg-gray-50"
                    >
                      <Heart 
                        className={`h-5 w-5 transition-colors ${
                          isInWishlist(selectedProduct.id) 
                            ? 'text-red-500 fill-current' 
                            : 'text-gray-600'
                        }`} 
                      />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  )
}
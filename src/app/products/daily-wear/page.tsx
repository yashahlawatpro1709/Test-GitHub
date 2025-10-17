'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Sun, Coffee, Briefcase } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPriceNumber } from '@/lib/utils'

// Fetch daily wear from database
const fetchDailyWearProducts = async () => {
  try {
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/site-images?section=daily-wear&t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Failed to fetch daily wear products:', error)
    return []
  }
}

const dailyWearProductsDummy = [
  {
    id: 'dw1',
    name: 'Minimalist Gold Stud Earrings',
    price: 2499,
    originalPrice: 2999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    category: 'earrings',
    rating: 4.8,
    reviews: 156,
    isNew: true,
    occasion: 'office',
    style: 'minimalist'
  },
  {
    id: 'dw2',
    name: 'Delicate Chain Bracelet',
    price: 3299,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center',
    category: 'bracelets',
    rating: 4.9,
    reviews: 89,
    isBestseller: true,
    occasion: 'casual',
    style: 'delicate'
  },
  {
    id: 'dw3',
    name: 'Simple Gold Band Ring',
    price: 4599,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center',
    category: 'rings',
    rating: 4.7,
    reviews: 203,
    occasion: 'everyday',
    style: 'classic'
  },
  {
    id: 'dw4',
    name: 'Layered Pendant Necklace',
    price: 5299,
    originalPrice: 5999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center',
    category: 'necklaces',
    rating: 4.8,
    reviews: 134,
    occasion: 'casual',
    style: 'trendy'
  },
  {
    id: 'dw5',
    name: 'Geometric Hoop Earrings',
    price: 2899,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center',
    category: 'earrings',
    rating: 4.6,
    reviews: 78,
    isNew: true,
    occasion: 'office',
    style: 'modern'
  },
  {
    id: 'dw6',
    name: 'Stackable Ring Set',
    price: 3799,
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&h=400&fit=crop&crop=center',
    category: 'rings',
    rating: 4.9,
    reviews: 167,
    isBestseller: true,
    occasion: 'everyday',
    style: 'trendy'
  }
]

const categories = ['all', 'office-wear', 'casual-wear', 'party-wear', 'evening-wear', 'weekend-wear', 'brunch-wear', 'everyday', 'minimalist']
const jewelryTypes = ['all', 'Earrings', 'Necklace', 'Bracelet', 'Ring', 'Pendant', 'Anklet', 'Chain']
const styles = ['all', 'Minimalist', 'Classic', 'Modern', 'Bohemian', 'Elegant', 'Trendy', 'Delicate']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹3,000', min: 0, max: 3000 },
  { label: '₹3,000 - ₹5,000', min: 3000, max: 5000 },
  { label: 'Above ₹5,000', min: 5000, max: Infinity }
]

export default function DailyWearPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedJewelryType, setSelectedJewelryType] = useState('all')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [dailyWearProducts, setDailyWearProducts] = useState<any[]>([])
  const [filteredProducts, setFilteredProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [showDetailsModal, setShowDetailsModal] = useState(false)
  
  // Cart and Wishlist stores
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  const handleAddToCart = (product: any) => {
    const priceValue = product.metadata?.price || product.price || '0'
    const productData = {
      id: product.id,
      name: product.title || product.name,
      price: parseFloat(priceValue.toString().replace(/[^0-9.]/g, '')),
      images: [product.url || product.image],
      slug: product.id,
    } as any
    addToCart(productData)
  }

  const handleToggleWishlist = (product: any) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
    } else {
      const priceValue = product.metadata?.price || product.price || '0'
      const wishlistData = {
        id: product.id,
        productId: product.id,
        product: {
          name: product.title || product.name,
          images: [product.url || product.image],
          slug: product.id,
        },
        price: parseFloat(priceValue.toString().replace(/[^0-9.]/g, '')),
        addedAt: new Date()
      } as any
      addToWishlist(wishlistData)
    }
  }

  // Fetch products on mount
  useEffect(() => {
    async function loadProducts() {
      const products = await fetchDailyWearProducts()
      console.log('Fetched daily wear products:', products)
      setDailyWearProducts(products)
      setFilteredProducts(products)
      setLoading(false)
    }
    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = dailyWearProducts.filter((product: any) => {
      // For database products, use metadata.category for filtering
      const category = product.metadata?.category || product.category || ''
      const categoryMatch = selectedCategory === 'all' || 
                           category.toLowerCase().includes(selectedCategory.toLowerCase())
      
      const jewelryType = product.metadata?.jewelryType || ''
      const jewelryTypeMatch = selectedJewelryType === 'all' || jewelryType === selectedJewelryType
      
      const style = product.metadata?.style || ''
      const styleMatch = selectedStyle === 'all' || style === selectedStyle
      
      // Get price from metadata or product
      const productPrice = product.metadata?.price 
        ? parseFloat(product.metadata.price.replace(/[^0-9.]/g, '')) 
        : (product.price || 0)
      
      const priceMatch = productPrice >= priceRanges[selectedPriceRange].min && 
                        productPrice <= priceRanges[selectedPriceRange].max
      
      return categoryMatch && jewelryTypeMatch && styleMatch && priceMatch
    })
    
    setFilteredProducts(filtered)
  }, [selectedCategory, selectedJewelryType, selectedStyle, selectedPriceRange, dailyWearProducts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Premium Hero Section */}
      <section className="relative py-2 md:py-4 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 to-orange-100/30" />
        
        {/* Elegant Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-32 h-32 border border-amber-300 rounded-full"></div>
          <div className="absolute top-40 right-32 w-24 h-24 border border-orange-300 rounded-full"></div>
          <div className="absolute bottom-32 left-1/3 w-20 h-20 border border-amber-400 rounded-full"></div>
        </div>
        
        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Premium Title Section */}
          <motion.div 
            className="mb-2"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="flex items-center justify-center gap-4 mb-3">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
              <Sun className="w-6 h-6 text-amber-600" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent"></div>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-light tracking-wide mb-3">
              <span className="text-amber-900 font-serif">
                Daily Wear
              </span>
            </h1>
            
            <div className="flex items-center justify-center gap-4 mt-3">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
              <Coffee className="w-5 h-5 text-orange-600" />
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-orange-400 to-transparent"></div>
            </div>
          </motion.div>
          
          <motion.p 
            className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-light mb-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Effortlessly elegant pieces designed for your everyday moments. From morning meetings to evening coffee dates, 
            discover jewelry that complements your daily style with comfort and sophistication.
          </motion.p>
          
          {/* Premium Floating Elements */}
          <div className="absolute top-10 left-16 animate-float">
            <Sparkles className="w-6 h-6 text-amber-400 opacity-60" />
          </div>
          <div className="absolute top-20 right-24 animate-float-delayed">
            <Briefcase className="w-8 h-8 text-orange-400 opacity-60" />
          </div>
          <div className="absolute bottom-10 left-1/4 animate-pulse">
            <div className="w-2 h-2 bg-amber-400 rounded-full"></div>
          </div>
          <div className="absolute bottom-16 right-1/3 animate-pulse">
            <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Premium Filters and Controls */}
      <section className="px-4 py-4 bg-white/90 backdrop-blur-md border-y border-amber-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* Premium Filter Toggle */}
            <motion.div className="flex items-center gap-4">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-100 to-orange-100 hover:from-amber-200 hover:to-orange-200 rounded-full transition-all duration-300 shadow-md hover:shadow-lg border border-amber-200/50"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-4 h-4 text-amber-700" />
                <span className="font-medium text-amber-800 text-sm">Filters</span>
              </motion.button>
              
              <div className="text-sm text-gray-600 font-light">
                {loading ? 'Loading...' : `${filteredProducts.length} pieces`}
              </div>
            </motion.div>

            {/* Premium View Mode Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-gray-700 font-medium text-sm">View:</span>
              <div className="flex bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-1 shadow-inner border border-gray-200/50">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-white shadow-md text-amber-700 border border-amber-200/50' 
                      : 'hover:bg-gray-200/50 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Grid className="w-4 h-4" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-white shadow-md text-amber-700 border border-amber-200/50' 
                      : 'hover:bg-gray-200/50 text-gray-600'
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <List className="w-4 h-4" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-4 p-4 bg-white rounded-xl shadow-lg border border-amber-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Jewelry Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Jewelry Type</label>
                    <select
                      value={selectedJewelryType}
                      onChange={(e) => setSelectedJewelryType(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {jewelryTypes.map(type => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Style Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                    <select
                      value={selectedStyle}
                      onChange={(e) => setSelectedStyle(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {styles.map(style => (
                        <option key={style} value={style}>
                          {style.charAt(0).toUpperCase() + style.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {priceRanges.map((range, index) => (
                        <option key={index} value={index}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Premium Products Collection */}
      <section className="px-4 pt-4 pb-8 bg-gradient-to-b from-white to-amber-50/30">
        <div className="max-w-7xl mx-auto">
          {/* Collection Header */}
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-2xl md:text-3xl font-light text-gray-800 mb-3">
              Curated for <span className="font-serif italic text-amber-800">Everyday Elegance</span>
            </h2>
            <div className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent mx-auto"></div>
          </motion.div>

          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              <p className="mt-4 text-gray-600">Loading daily wear collection...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">☀️</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No products found</h3>
              <p className="text-gray-600 mb-4">
                {dailyWearProducts.length === 0 
                  ? 'No daily wear products have been uploaded yet. Please add some from the admin dashboard.'
                  : 'Try adjusting your filters to see more results.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className={`grid gap-6 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1 max-w-4xl mx-auto'
              }`}
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -30 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-amber-100/50 hover:border-amber-200 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  whileHover={{ y: -8 }}
                >
                  {/* Premium Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80' : 'aspect-square'}`}>
                    <Image
                      src={product.url || product.image}
                      alt={product.title || product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Premium Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      {product.isNew && (
                        <span className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm">
                          ✨ New Arrival
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm">
                          👑 Bestseller
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleToggleWishlist(product)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          isInWishlist(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
                      </button>
                      <button 
                        onClick={() => {
                          setSelectedProduct(product)
                          setShowDetailsModal(true)
                        }}
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-amber-500 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                          {product.title || product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.metadata?.jewelryType || product.category} • {product.metadata?.category || product.occasion}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    {product.metadata && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.metadata.style && (
                          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded">
                            {product.metadata.style}
                          </span>
                        )}
                        {product.metadata.purity && (
                          <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                            {product.metadata.purity}
                          </span>
                        )}
                      </div>
                    )}

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-800">
                        {product.metadata?.price || `₹${formatPriceNumber(product.price || 0)}`}
                      </span>
                      {product.metadata?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          {product.metadata.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2">
                      <Button
                        onClick={() => handleAddToCart(product)}
                        className="flex-1 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button
                        onClick={() => {
                          setSelectedProduct(product)
                          setShowDetailsModal(true)
                        }}
                        variant="outline"
                        className="border-amber-200 text-amber-700 hover:bg-amber-50"
                      >
                        View Details
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-amber-100 to-orange-100">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Perfect for Every Day
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover jewelry that seamlessly transitions from work to weekend, 
            adding that perfect touch of elegance to your daily routine.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/collections">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-amber-600 text-white rounded-xl font-medium hover:bg-amber-700 transition-colors"
              >
                View All Collections
              </motion.button>
            </Link>
            <Link href="/jewelry-care">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-amber-600 text-amber-600 rounded-xl font-medium hover:bg-amber-600 hover:text-white transition-colors"
              >
                Care Guide
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Premium Details Modal */}
      {showDetailsModal && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-lg" onClick={() => setShowDetailsModal(false)}>
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl rounded-none"
          >
            <div className="relative">
              {/* Premium Close Button */}
              <button
                onClick={() => setShowDetailsModal(false)}
                className="absolute top-8 right-8 z-20 w-14 h-14 flex items-center justify-center bg-white/90 backdrop-blur-md hover:bg-white transition-all duration-300 border border-gray-100 shadow-lg group"
              >
                <svg className="w-6 h-6 text-gray-500 group-hover:text-gray-900 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="grid md:grid-cols-2 h-full">
                {/* Left Side - Product Image */}
                <div className="relative bg-gradient-to-br from-amber-50 via-white to-orange-50/30 p-12 md:p-16 flex items-center justify-center min-h-[500px] md:min-h-[600px]">
                  <div className="relative w-full max-w-lg aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-100/20 to-orange-100/20 blur-3xl"></div>
                    <Image
                      src={selectedProduct.url || selectedProduct.image}
                      alt={selectedProduct.title || selectedProduct.name}
                      fill
                      className="object-contain relative z-10 drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Elegant Corner Accents */}
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-amber-300/40"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-orange-300/40"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-amber-300/40"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-orange-300/40"></div>
                </div>

                {/* Right Side - Product Details */}
                <div className="p-8 md:p-12 bg-white flex flex-col overflow-y-auto max-h-[95vh]">
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-3">
                    {selectedProduct.title || selectedProduct.name}
                  </h2>

                  {/* Category Badge */}
                  {selectedProduct.metadata?.category && (
                    <div className="mb-6">
                      <span className="inline-block px-5 py-2 bg-gradient-to-r from-amber-50 to-orange-50 text-amber-700 text-xs font-medium tracking-wider uppercase border border-amber-100">
                        {selectedProduct.metadata.category}
                      </span>
                    </div>
                  )}

                  {selectedProduct.description && (
                    <p className="text-gray-600 mb-6 leading-relaxed text-sm">
                      {selectedProduct.description}
                    </p>
                  )}

                  {/* Divider */}
                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-200"></div>
                    </div>
                    <div className="relative flex justify-center">
                      <span className="bg-white px-4 text-[10px] tracking-[0.3em] uppercase text-gray-400">Details</span>
                    </div>
                  </div>

                  {/* Detailed Description */}
                  {selectedProduct.metadata?.detailedDescription && (
                    <div className="mb-6">
                      <p className="text-gray-700 leading-relaxed whitespace-pre-line text-sm">
                        {selectedProduct.metadata.detailedDescription}
                      </p>
                    </div>
                  )}

                  {/* Specifications */}
                  {(selectedProduct.metadata?.jewelryType || selectedProduct.metadata?.style) && (
                    <div className="mb-6 bg-gradient-to-br from-gray-50 to-amber-50/30 p-5 border border-gray-100">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3 font-medium">Specifications</h4>
                      <div className="space-y-2">
                        {selectedProduct.metadata?.jewelryType && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Type</span>
                            <span className="text-sm text-gray-900 font-medium">{selectedProduct.metadata.jewelryType}</span>
                          </div>
                        )}
                        {selectedProduct.metadata?.style && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Style</span>
                            <span className="text-sm text-gray-900 font-medium">{selectedProduct.metadata.style}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Spacer */}
                  <div className="flex-1"></div>

                  {/* Price Section */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <div className="mb-6">
                      <div className="flex items-baseline gap-3 mb-1">
                        <span className="text-3xl md:text-4xl font-light text-gray-900">
                          {selectedProduct.metadata?.price || `₹${formatPriceNumber(selectedProduct.price || 0)}`}
                        </span>
                        {selectedProduct.metadata?.originalPrice && (
                          <span className="text-lg text-gray-400 line-through font-light">
                            {selectedProduct.metadata.originalPrice}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">Inclusive of all taxes</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button 
                        onClick={() => {
                          handleAddToCart(selectedProduct)
                          setShowDetailsModal(false)
                        }}
                        className="flex-1 bg-black hover:bg-gray-900 text-white py-6 text-xs tracking-[0.15em] uppercase font-medium transition-all duration-300"
                      >
                        <ShoppingBag className="h-4 w-4 mr-2" />
                        Add to Cart
                      </Button>
                      <Button 
                        variant="outline" 
                        onClick={() => handleToggleWishlist(selectedProduct)}
                        className="w-14 h-14 border-gray-300 hover:bg-gray-50 hover:border-gray-400 transition-all duration-300"
                      >
                        <Heart 
                          className={`h-5 w-5 transition-colors ${
                            isInWishlist(selectedProduct.id) 
                              ? 'text-amber-600 fill-current' 
                              : 'text-gray-600'
                          }`} 
                        />
                      </Button>
                    </div>
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
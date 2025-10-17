'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Crown, Gem, ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPriceNumber } from '@/lib/utils'

// Fetch earrings from database
const fetchEarringsProducts = async () => {
  try {
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/site-images?section=earrings&t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Failed to fetch earrings products:', error)
    return []
  }
}

const earringsProductsDummy = [
  {
    id: 'ear1',
    name: 'Diamond Stud Earrings',
    price: 15999,
    originalPrice: 18999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    type: 'studs',
    material: 'gold',
    rating: 4.9,
    reviews: 234,
    isBestseller: true,
    gemstone: 'diamond',
    style: 'classic'
  },
  {
    id: 'ear2',
    name: 'Pearl Drop Earrings',
    price: 8999,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center',
    type: 'drops',
    material: 'silver',
    rating: 4.8,
    reviews: 156,
    isNew: true,
    gemstone: 'pearl',
    style: 'elegant'
  },
  {
    id: 'ear3',
    name: 'Gold Hoop Earrings',
    price: 12499,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=400&fit=crop&crop=center',
    type: 'hoops',
    material: 'gold',
    rating: 4.7,
    reviews: 189,
    style: 'modern'
  },
  {
    id: 'ear4',
    name: 'Emerald Chandelier Earrings',
    price: 25999,
    originalPrice: 29999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center',
    type: 'chandeliers',
    material: 'gold',
    rating: 4.9,
    reviews: 98,
    isBestseller: true,
    gemstone: 'emerald',
    style: 'luxury'
  },
  {
    id: 'ear5',
    name: 'Rose Gold Climber Earrings',
    price: 9999,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center',
    type: 'climbers',
    material: 'rose-gold',
    rating: 4.6,
    reviews: 134,
    isNew: true,
    style: 'trendy'
  },
  {
    id: 'ear6',
    name: 'Sapphire Huggie Earrings',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=400&h=400&fit=crop&crop=center',
    type: 'huggies',
    material: 'white-gold',
    rating: 4.8,
    reviews: 167,
    gemstone: 'sapphire',
    style: 'luxury'
  }
]

const types = ['all', 'studs', 'hoops', 'drops', 'chandeliers', 'climbers', 'huggies']
const materials = ['all', 'gold', 'silver', 'rose-gold', 'white-gold', 'platinum']
const gemstones = ['all', 'diamond', 'pearl', 'emerald', 'sapphire', 'ruby', 'none']
const styles = ['all', 'classic', 'modern', 'elegant', 'luxury', 'trendy']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹10,000', min: 0, max: 10000 },
  { label: '₹10,000 - ₹20,000', min: 10000, max: 20000 },
  { label: 'Above ₹20,000', min: 20000, max: Infinity }
]

export default function EarringsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedType, setSelectedType] = useState('all')
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [selectedGemstone, setSelectedGemstone] = useState('all')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [earringsProducts, setEarringsProducts] = useState<any[]>([])
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
      const products = await fetchEarringsProducts()
      console.log('Fetched earrings products:', products)
      setEarringsProducts(products)
      setFilteredProducts(products)
      setLoading(false)
    }
    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = earringsProducts.filter((product: any) => {
      // For database products, use metadata.category for filtering
      const category = product.metadata?.category || product.type || ''
      const typeMatch = selectedType === 'all' || category.toLowerCase().includes(selectedType.toLowerCase())
      
      const materialMatch = selectedMaterial === 'all' || 
                           (product.material && product.material === selectedMaterial) ||
                           (product.metadata?.purity && product.metadata.purity.toLowerCase().includes(selectedMaterial.toLowerCase()))
      
      const gemstoneMatch = selectedGemstone === 'all' || 
                           (selectedGemstone === 'none' && !product.gemstone) ||
                           (product.gemstone && product.gemstone === selectedGemstone) ||
                           (category && category.toLowerCase().includes(selectedGemstone.toLowerCase()))
      
      const styleMatch = selectedStyle === 'all' || 
                        (product.style && product.style === selectedStyle)
      
      // Get price from metadata or product
      const productPrice = product.metadata?.price 
        ? parseFloat(product.metadata.price.replace(/[^0-9.]/g, '')) 
        : (product.price || 0)
      
      const priceMatch = productPrice >= priceRanges[selectedPriceRange].min && 
                        productPrice <= priceRanges[selectedPriceRange].max
      
      return typeMatch && materialMatch && gemstoneMatch && styleMatch && priceMatch
    })
    
    setFilteredProducts(filtered)
  }, [selectedType, selectedMaterial, selectedGemstone, selectedStyle, selectedPriceRange, earringsProducts])

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-pink-100/30 to-purple-100/30" />
        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Crown className="w-8 h-8 text-pink-600" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-pink-800 to-purple-700 bg-clip-text text-transparent">
              Exquisite Earrings
            </h1>
            <Gem className="w-8 h-8 text-purple-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Frame your face with elegance. From delicate studs to statement chandeliers, 
            discover earrings that capture light and hearts with every movement.
          </p>
          
          {/* Floating Icons */}
          <div className="absolute top-10 left-10 animate-bounce">
            <Sparkles className="w-6 h-6 text-pink-400" />
          </div>
          <div className="absolute top-20 right-20 animate-pulse">
            <Gem className="w-8 h-8 text-purple-400" />
          </div>
        </motion.div>
      </section>

      {/* Filters and Controls */}
      <section className="px-4 py-8 bg-white/80 backdrop-blur-sm border-y border-pink-100">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Filter Toggle */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-pink-100 hover:bg-pink-200 rounded-full transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600">View:</span>
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'
                  }`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-gray-600">
              {loading ? 'Loading...' : `Showing ${filteredProducts.length} of ${earringsProducts.length} products`}
            </div>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mt-6 p-6 bg-white rounded-xl shadow-lg border border-pink-100"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                  {/* Type Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                    <select
                      value={selectedType}
                      onChange={(e) => setSelectedType(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {types.map(type => (
                        <option key={type} value={type}>
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Material Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {materials.map(material => (
                        <option key={material} value={material}>
                          {material.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Gemstone Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gemstone</label>
                    <select
                      value={selectedGemstone}
                      onChange={(e) => setSelectedGemstone(e.target.value)}
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    >
                      {gemstones.map(gemstone => (
                        <option key={gemstone} value={gemstone}>
                          {gemstone === 'none' ? 'No Gemstone' : gemstone.charAt(0).toUpperCase() + gemstone.slice(1)}
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
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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
                      className="w-full p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
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

      {/* Products Grid */}
      <section className="px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600"></div>
              <p className="mt-4 text-gray-600">Loading earrings...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">👂</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No earrings found</h3>
              <p className="text-gray-600 mb-4">
                {earringsProducts.length === 0 
                  ? 'No earrings have been uploaded yet. Please add some from the admin dashboard.'
                  : 'Try adjusting your filters to see more results.'}
              </p>
            </motion.div>
          ) : (
            <motion.div
              className={`grid gap-8 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                  : 'grid-cols-1'
              }`}
              layout
            >
              <AnimatePresence>
                {filteredProducts.map((product: any, index: number) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`group bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-64' : 'aspect-square'}`}>
                    <Image
                      src={product.url || product.image}
                      alt={product.title || product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-green-500 text-white text-xs font-medium rounded-full">
                          New
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="px-3 py-1 bg-pink-500 text-white text-xs font-medium rounded-full">
                          Bestseller
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
                        className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-pink-500 hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                          {product.title || product.name}
                        </h3>
                        <p className="text-sm text-gray-500">
                          {product.description || product.metadata?.category || 'Earrings'}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    {product.metadata && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.metadata.purity && (
                          <span className="text-xs bg-pink-50 text-pink-700 px-2 py-1 rounded">
                            {product.metadata.purity}
                          </span>
                        )}
                        {product.metadata.diamondCarat && (
                          <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                            {product.metadata.diamondCarat}
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
                        className="flex-1 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white"
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
                        className="border-pink-200 text-pink-700 hover:bg-pink-50"
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
      <section className="py-16 px-4 bg-gradient-to-r from-pink-100 to-purple-100">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Complete Your Look
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Discover the perfect earrings to complement your style. From everyday elegance 
            to special occasion glamour, find your signature pair.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/size-guide">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-pink-600 text-white rounded-xl font-medium hover:bg-pink-700 transition-colors"
              >
                Size Guide
              </motion.button>
            </Link>
            <Link href="/jewelry-care">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-pink-600 text-pink-600 rounded-xl font-medium hover:bg-pink-600 hover:text-white transition-colors"
              >
                Care Instructions
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
                <div className="relative bg-gradient-to-br from-slate-50 via-white to-pink-50/30 p-12 md:p-16 flex items-center justify-center min-h-[500px] md:min-h-[600px]">
                  <div className="relative w-full max-w-lg aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-100/20 to-purple-100/20 blur-3xl"></div>
                    <Image
                      src={selectedProduct.url || selectedProduct.image}
                      alt={selectedProduct.title || selectedProduct.name}
                      fill
                      className="object-contain relative z-10 drop-shadow-2xl"
                    />
                  </div>
                  
                  {/* Elegant Corner Accents */}
                  <div className="absolute top-8 left-8 w-12 h-12 border-l-2 border-t-2 border-pink-300/40"></div>
                  <div className="absolute top-8 right-8 w-12 h-12 border-r-2 border-t-2 border-purple-300/40"></div>
                  <div className="absolute bottom-8 left-8 w-12 h-12 border-l-2 border-b-2 border-pink-300/40"></div>
                  <div className="absolute bottom-8 right-8 w-12 h-12 border-r-2 border-b-2 border-purple-300/40"></div>
                </div>

                {/* Right Side - Product Details */}
                <div className="p-8 md:p-12 bg-white flex flex-col overflow-y-auto max-h-[95vh]">
                  <h2 className="text-2xl md:text-3xl font-playfair font-bold text-gray-900 mb-3">
                    {selectedProduct.title || selectedProduct.name}
                  </h2>

                  {/* Category Badge */}
                  {selectedProduct.metadata?.category && (
                    <div className="mb-6">
                      <span className="inline-block px-5 py-2 bg-gradient-to-r from-pink-50 to-purple-50 text-pink-700 text-xs font-medium tracking-wider uppercase border border-pink-100">
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
                  {(selectedProduct.metadata?.purity || selectedProduct.metadata?.diamondCarat) && (
                    <div className="mb-6 bg-gradient-to-br from-gray-50 to-pink-50/30 p-5 border border-gray-100">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3 font-medium">Specifications</h4>
                      <div className="space-y-2">
                        {selectedProduct.metadata?.purity && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Material</span>
                            <span className="text-sm text-gray-900 font-medium">{selectedProduct.metadata.purity}</span>
                          </div>
                        )}
                        {selectedProduct.metadata?.diamondCarat && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Gemstone</span>
                            <span className="text-sm text-gray-900 font-medium">{selectedProduct.metadata.diamondCarat}</span>
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
                              ? 'text-pink-600 fill-current' 
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
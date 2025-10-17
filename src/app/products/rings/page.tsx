'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Crown, Diamond, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPriceNumber } from '@/lib/utils'

// Fetch rings from database
const fetchRingsProducts = async () => {
  try {
    const timestamp = new Date().getTime()
    const response = await fetch(`/api/site-images?section=rings&t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    const data = await response.json()
    return data.images || []
  } catch (error) {
    console.error('Failed to fetch rings products:', error)
    return []
  }
}

const ringsProductsDummy = [
  {
    id: 'ring1',
    name: 'Classic Diamond Solitaire',
    price: 45999,
    originalPrice: 52999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=400&fit=crop&crop=center',
    category: 'engagement',
    material: 'platinum',
    rating: 4.9,
    reviews: 342,
    isBestseller: true,
    gemstone: 'diamond',
    size: 'adjustable',
    style: 'classic'
  },
  {
    id: 'ring2',
    name: 'Rose Gold Wedding Band',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=400&h=400&fit=crop&crop=center',
    category: 'wedding',
    material: 'rose-gold',
    rating: 4.8,
    reviews: 256,
    isNew: true,
    size: '6',
    style: 'modern'
  },
  {
    id: 'ring3',
    name: 'Emerald Cocktail Ring',
    price: 32999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop&crop=center',
    category: 'cocktail',
    material: 'gold',
    rating: 4.7,
    reviews: 189,
    gemstone: 'emerald',
    size: '7',
    style: 'luxury'
  },
  {
    id: 'ring4',
    name: 'Minimalist Gold Band',
    price: 8999,
    originalPrice: 10999,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=400&fit=crop&crop=center',
    category: 'fashion',
    material: 'gold',
    rating: 4.6,
    reviews: 423,
    isBestseller: true,
    size: 'adjustable',
    style: 'minimalist'
  },
  {
    id: 'ring5',
    name: 'Sapphire Halo Ring',
    price: 38999,
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=400&h=400&fit=crop&crop=center',
    category: 'engagement',
    material: 'white-gold',
    rating: 4.9,
    reviews: 167,
    isNew: true,
    gemstone: 'sapphire',
    size: '5.5',
    style: 'vintage'
  },
  {
    id: 'ring6',
    name: 'Stackable Ring Set',
    price: 15999,
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=400&fit=crop&crop=center',
    category: 'fashion',
    material: 'silver',
    rating: 4.8,
    reviews: 298,
    size: 'adjustable',
    style: 'trendy'
  }
]

const categories = ['all', 'engagement', 'wedding', 'fashion', 'cocktail', 'eternity']
const materials = ['all', 'gold', 'silver', 'rose-gold', 'white-gold', 'platinum']
const gemstones = ['all', 'diamond', 'sapphire', 'emerald', 'ruby', 'pearl', 'none']
const sizes = ['all', '4', '4.5', '5', '5.5', '6', '6.5', '7', '7.5', '8', '8.5', '9', 'adjustable']
const styles = ['all', 'classic', 'modern', 'vintage', 'luxury', 'minimalist', 'trendy']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹15,000', min: 0, max: 15000 },
  { label: '₹15,000 - ₹30,000', min: 15000, max: 30000 },
  { label: '₹30,000 - ₹50,000', min: 30000, max: 50000 },
  { label: 'Above ₹50,000', min: 50000, max: Infinity }
]

export default function RingsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedMaterial, setSelectedMaterial] = useState('all')
  const [selectedGemstone, setSelectedGemstone] = useState('all')
  const [selectedSize, setSelectedSize] = useState('all')
  const [selectedStyle, setSelectedStyle] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [ringsProducts, setRingsProducts] = useState<any[]>([])
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
      const products = await fetchRingsProducts()
      console.log('Fetched rings products:', products)
      setRingsProducts(products)
      setFilteredProducts(products)
      setLoading(false)
    }
    loadProducts()
  }, [])

  useEffect(() => {
    let filtered = ringsProducts.filter((product: any) => {
      // For database products, use metadata.category for filtering
      const category = product.metadata?.category || product.category || ''
      const categoryMatch = selectedCategory === 'all' || 
                           category.toLowerCase().includes(selectedCategory.toLowerCase())
      
      const materialMatch = selectedMaterial === 'all' || 
                           (product.material && product.material === selectedMaterial) ||
                           (product.metadata?.purity && product.metadata.purity.toLowerCase().includes(selectedMaterial.toLowerCase()))
      
      const gemstoneMatch = selectedGemstone === 'all' || 
                           (selectedGemstone === 'none' && !product.gemstone) ||
                           (product.gemstone && product.gemstone === selectedGemstone) ||
                           (category && category.toLowerCase().includes(selectedGemstone.toLowerCase()))
      
      const sizeMatch = selectedSize === 'all' || 
                       (product.size && product.size === selectedSize) ||
                       (product.metadata?.ringSize && product.metadata.ringSize === selectedSize)
      
      const styleMatch = selectedStyle === 'all' || 
                        (product.style && product.style === selectedStyle)
      
      // Get price from metadata or product
      const productPrice = product.metadata?.price 
        ? parseFloat(product.metadata.price.replace(/[^0-9.]/g, '')) 
        : (product.price || 0)
      
      const priceMatch = productPrice >= priceRanges[selectedPriceRange].min && 
                        productPrice <= priceRanges[selectedPriceRange].max
      
      return categoryMatch && materialMatch && gemstoneMatch && sizeMatch && styleMatch && priceMatch
    })
    
    setFilteredProducts(filtered)
  }, [selectedCategory, selectedMaterial, selectedGemstone, selectedSize, selectedStyle, selectedPriceRange, ringsProducts])

  const resetFilters = () => {
    setSelectedCategory('all')
    setSelectedMaterial('all')
    setSelectedGemstone('all')
    setSelectedSize('all')
    setSelectedStyle('all')
    setSelectedPriceRange(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100 via-orange-100 to-amber-100"></div>
        
        <motion.div
          className="relative max-w-6xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500/20 to-orange-500/20 backdrop-blur-sm border border-amber-300/30 rounded-full mb-6"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-5 h-5 text-amber-600" />
            <span className="text-amber-800 font-medium">Premium Ring Collection</span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-600 via-orange-600 to-amber-700 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            Rings
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Discover our exquisite collection of rings, from timeless classics to contemporary designs. 
            Each piece is crafted to perfection, symbolizing love, commitment, and personal style.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <button className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl">
              Shop Now
            </button>
            <button className="px-8 py-4 border-2 border-amber-500 text-amber-600 rounded-xl font-medium hover:bg-amber-500 hover:text-white transition-all duration-300">
              Ring Size Guide
            </button>
          </motion.div>
        </motion.div>

        {/* Animated decorations */}
        <motion.div
          className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, -20, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-32 h-32 bg-gradient-to-r from-orange-400 to-amber-400 rounded-full opacity-20 blur-xl"
          animate={{
            y: [0, 20, 0],
            scale: [1, 0.9, 1],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </section>

      {/* Filters and Controls */}
      <section className="py-8 px-4 bg-white/50 backdrop-blur-sm border-y border-amber-200/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Filter Button */}
            <motion.button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Filter className="w-5 h-5" />
              Filters
            </motion.button>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-medium">
                {loading ? 'Loading...' : `${filteredProducts.length} rings found`}
              </span>
              <div className="flex items-center gap-2 bg-white rounded-lg p-1 border border-amber-200">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'grid'
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 hover:bg-amber-100'
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-md transition-colors ${
                    viewMode === 'list'
                      ? 'bg-amber-500 text-white'
                      : 'text-gray-600 hover:bg-amber-100'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
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
                className="mt-6 p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
                  {/* Category Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
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
                      className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                      className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {gemstones.map(gemstone => (
                        <option key={gemstone} value={gemstone}>
                          {gemstone === 'none' ? 'No Gemstone' : gemstone.charAt(0).toUpperCase() + gemstone.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Size Filter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Size</label>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {sizes.map(size => (
                        <option key={size} value={size}>
                          {size === 'all' ? 'All Sizes' : size === 'adjustable' ? 'Adjustable' : `Size ${size}`}
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
                      className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
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
                      className="w-full p-3 border border-amber-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                    >
                      {priceRanges.map((range, index) => (
                        <option key={index} value={index}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 text-amber-600 hover:bg-amber-100 rounded-lg transition-colors"
                  >
                    Reset All Filters
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Products Collection */}
      <section className="py-12 px-4">
        <div className="max-w-6xl mx-auto">
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600"></div>
              <p className="mt-4 text-gray-600">Loading rings...</p>
            </div>
          ) : filteredProducts.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">💍</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No rings found</h3>
              <p className="text-gray-600 mb-6">
                {ringsProducts.length === 0 
                  ? 'No rings have been uploaded yet. Please add some from the admin dashboard.'
                  : 'Try adjusting your filters to see more results.'}
              </p>
              {ringsProducts.length > 0 && (
                <button
                  onClick={resetFilters}
                  className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                >
                  Reset All Filters
                </button>
              )}
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
                {filteredProducts.map((product: any) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -5 }}
                  className={`group bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 border border-amber-200/50 hover:border-amber-300 ${
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
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    {/* Badges */}
                    <div className="absolute top-4 left-4 flex flex-col gap-2">
                      {product.isNew && (
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm">
                          New
                        </span>
                      )}
                      {product.isBestseller && (
                        <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-medium rounded-full shadow-lg backdrop-blur-sm">
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
                          {product.description || product.metadata?.category || 'Rings'}
                        </p>
                      </div>
                    </div>

                    {/* Metadata */}
                    {product.metadata && (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {product.metadata.purity && (
                          <span className="text-xs bg-amber-50 text-amber-700 px-2 py-1 rounded">
                            {product.metadata.purity}
                          </span>
                        )}
                        {product.metadata.ringSize && (
                          <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                            Size: {product.metadata.ringSize}
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

      {/* Craftsmanship Link */}
      <section className="py-8 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <Link href="/craftsmanship">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-8 py-4 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Our Craftsmanship
            </motion.button>
          </Link>
        </div>
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
                  {(selectedProduct.metadata?.purity || selectedProduct.metadata?.ringSize) && (
                    <div className="mb-6 bg-gradient-to-br from-gray-50 to-amber-50/30 p-5 border border-gray-100">
                      <h4 className="text-[10px] tracking-[0.3em] uppercase text-gray-500 mb-3 font-medium">Specifications</h4>
                      <div className="space-y-2">
                        {selectedProduct.metadata?.purity && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Material</span>
                            <span className="text-sm text-gray-900 font-medium">{selectedProduct.metadata.purity}</span>
                          </div>
                        )}
                        {selectedProduct.metadata?.ringSize && (
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500 uppercase tracking-wider">Ring Size</span>
                            <span className="text-sm text-gray-900 font-medium">{selectedProduct.metadata.ringSize}</span>
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
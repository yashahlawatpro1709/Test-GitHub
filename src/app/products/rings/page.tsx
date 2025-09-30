'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Crown, Diamond, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  material: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
  gemstone?: string
  size: string
  style: string
}

const ringsProducts: Product[] = [
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
  const [filteredProducts, setFilteredProducts] = useState(ringsProducts)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    let filtered = ringsProducts.filter(product => {
      const categoryMatch = selectedCategory === 'all' || product.category === selectedCategory
      const materialMatch = selectedMaterial === 'all' || product.material === selectedMaterial
      const gemstoneMatch = selectedGemstone === 'all' || 
                           (selectedGemstone === 'none' && !product.gemstone) ||
                           product.gemstone === selectedGemstone
      const sizeMatch = selectedSize === 'all' || product.size === selectedSize
      const styleMatch = selectedStyle === 'all' || product.style === selectedStyle
      const priceMatch = product.price >= priceRanges[selectedPriceRange].min && 
                        product.price <= priceRanges[selectedPriceRange].max
      
      return categoryMatch && materialMatch && gemstoneMatch && sizeMatch && styleMatch && priceMatch
    })
    
    setFilteredProducts(filtered)
  }, [selectedCategory, selectedMaterial, selectedGemstone, selectedSize, selectedStyle, selectedPriceRange])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

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
                {filteredProducts.length} rings found
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
          <motion.div
            className={`grid gap-8 ${
              viewMode === 'grid'
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
                : 'grid-cols-1'
            }`}
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((product) => (
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
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
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
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className="w-4 h-4" fill={favorites.includes(product.id) ? 'currentColor' : 'none'} />
                      </button>
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-amber-500 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-amber-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {product.category} • {product.material.replace('-', ' ')}
                        </p>
                      </div>
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${
                              i < Math.floor(product.rating)
                                ? 'text-amber-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl font-bold text-gray-800">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">
                          ₹{product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white py-3 rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
                    >
                      <ShoppingBag className="w-5 h-5" />
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results */}
          {filteredProducts.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className="text-6xl mb-4">💍</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No rings found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your filters to see more results.</p>
              <button
                onClick={resetFilters}
                className="px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-300"
              >
                Reset All Filters
              </button>
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
    </div>
  )
}
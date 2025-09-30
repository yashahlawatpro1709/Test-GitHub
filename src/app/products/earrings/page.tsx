'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Crown, Gem } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  type: string
  material: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
  gemstone?: string
  style: string
}

const earringsProducts: Product[] = [
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
  const [filteredProducts, setFilteredProducts] = useState(earringsProducts)
  const [favorites, setFavorites] = useState<string[]>([])

  useEffect(() => {
    let filtered = earringsProducts.filter(product => {
      const typeMatch = selectedType === 'all' || product.type === selectedType
      const materialMatch = selectedMaterial === 'all' || product.material === selectedMaterial
      const gemstoneMatch = selectedGemstone === 'all' || 
                           (selectedGemstone === 'none' && !product.gemstone) ||
                           product.gemstone === selectedGemstone
      const styleMatch = selectedStyle === 'all' || product.style === selectedStyle
      const priceMatch = product.price >= priceRanges[selectedPriceRange].min && 
                        product.price <= priceRanges[selectedPriceRange].max
      
      return typeMatch && materialMatch && gemstoneMatch && styleMatch && priceMatch
    })
    
    setFilteredProducts(filtered)
  }, [selectedType, selectedMaterial, selectedGemstone, selectedStyle, selectedPriceRange])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

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
              Showing {filteredProducts.length} of {earringsProducts.length} products
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
          <motion.div
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            }`}
            layout
          >
            <AnimatePresence>
              {filteredProducts.map((product, index) => (
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
                      src={product.image}
                      alt={product.name}
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
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-2 rounded-full backdrop-blur-sm transition-colors ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/80 text-gray-600 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart className="w-4 h-4" />
                      </button>
                      <button className="p-2 bg-white/80 backdrop-blur-sm rounded-full text-gray-600 hover:bg-pink-500 hover:text-white transition-colors">
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 group-hover:text-pink-600 transition-colors">
                          {product.name}
                        </h3>
                        <p className="text-sm text-gray-500 capitalize">
                          {product.type} • {product.material.replace('-', ' ')}
                          {product.gemstone && ` • ${product.gemstone}`}
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
                                ? 'text-pink-400 fill-current'
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
                      className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-xl font-medium hover:from-pink-600 hover:to-purple-600 transition-all duration-300"
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
              <div className="text-6xl mb-4">👂</div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-2">No earrings found</h3>
              <p className="text-gray-600">Try adjusting your filters to see more results.</p>
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
    </div>
  )
}
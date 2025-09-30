'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Gift, Sparkles, Calendar, Users, Crown, Diamond, Gem, Award, Zap, ArrowRight, ChevronDown } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface GiftProduct {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  category: string
  occasion: string
  recipient: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
  isGiftWrapped?: boolean
  description: string
  giftMessage?: string
}

const giftProducts: GiftProduct[] = [
  {
    id: 'gift1',
    name: 'Elegant Pearl Necklace Gift Set',
    price: 45999,
    originalPrice: 52999,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=600&h=600&fit=crop&crop=center',
    category: 'necklace',
    occasion: 'birthday',
    recipient: 'mother',
    rating: 4.9,
    reviews: 234,
    isBestseller: true,
    isGiftWrapped: true,
    description: 'A timeless pearl necklace that speaks of elegance and grace.',
    giftMessage: 'Perfect for showing appreciation to the special women in your life.'
  },
  {
    id: 'gift2',
    name: 'Diamond Stud Earrings',
    price: 35999,
    image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&crop=center',
    category: 'earrings',
    occasion: 'anniversary',
    recipient: 'wife',
    rating: 4.8,
    reviews: 189,
    isNew: true,
    isGiftWrapped: true,
    description: 'Classic diamond studs that add sparkle to any occasion.',
    giftMessage: 'A symbol of eternal love and commitment.'
  },
  {
    id: 'gift3',
    name: 'Rose Gold Bracelet',
    price: 28999,
    originalPrice: 33999,
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&crop=center',
    category: 'bracelet',
    occasion: 'graduation',
    recipient: 'daughter',
    rating: 4.7,
    reviews: 156,
    isGiftWrapped: true,
    description: 'Delicate rose gold bracelet perfect for young women.',
    giftMessage: 'Celebrate achievements and new beginnings.'
  },
  {
    id: 'gift4',
    name: 'Luxury Watch Collection',
    price: 125999,
    image: 'https://images.unsplash.com/photo-1523170335258-f5c6c6bd6eaf?w=600&h=600&fit=crop&crop=center',
    category: 'watch',
    occasion: 'promotion',
    recipient: 'husband',
    rating: 4.9,
    reviews: 98,
    isBestseller: true,
    isGiftWrapped: true,
    description: 'Premium timepiece for the distinguished gentleman.',
    giftMessage: 'Mark success with timeless elegance.'
  },
  {
    id: 'gift5',
    name: 'Charm Bracelet Starter Set',
    price: 18999,
    image: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=600&h=600&fit=crop&crop=center',
    category: 'bracelet',
    occasion: 'sweet-16',
    recipient: 'teenager',
    rating: 4.6,
    reviews: 267,
    isNew: true,
    isGiftWrapped: true,
    description: 'Start a beautiful journey of memories with charm bracelets.',
    giftMessage: 'Perfect for creating lasting memories.'
  },
  {
    id: 'gift6',
    name: 'Vintage Brooch Collection',
    price: 22999,
    originalPrice: 26999,
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=600&h=600&fit=crop&crop=center',
    category: 'brooch',
    occasion: 'retirement',
    recipient: 'grandmother',
    rating: 4.8,
    reviews: 134,
    isGiftWrapped: true,
    description: 'Elegant vintage-inspired brooches for the classic woman.',
    giftMessage: 'Honor a lifetime of wisdom and grace.'
  },
  {
    id: 'gift7',
    name: 'Sapphire Engagement Ring',
    price: 89999,
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center',
    category: 'ring',
    occasion: 'valentine',
    recipient: 'wife',
    rating: 4.9,
    reviews: 145,
    isBestseller: true,
    isGiftWrapped: true,
    description: 'Stunning sapphire ring that captures hearts.',
    giftMessage: 'Express your deepest love and commitment.'
  },
  {
    id: 'gift8',
    name: 'Gold Chain Necklace',
    price: 42999,
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center',
    category: 'necklace',
    occasion: 'mothers-day',
    recipient: 'mother',
    rating: 4.7,
    reviews: 198,
    isGiftWrapped: true,
    description: 'Luxurious gold chain that radiates warmth.',
    giftMessage: 'Show your mother how much she means to you.'
  }
]

const occasions = ['all', 'birthday', 'anniversary', 'graduation', 'promotion', 'sweet-16', 'retirement', 'valentine', 'mothers-day', 'christmas']
const recipients = ['all', 'mother', 'wife', 'daughter', 'husband', 'son', 'grandmother', 'grandfather', 'teenager', 'friend']
const categories = ['all', 'necklace', 'earrings', 'bracelet', 'ring', 'watch', 'brooch', 'pendant', 'cufflinks']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹25,000', min: 0, max: 25000 },
  { label: '₹25,000 - ₹50,000', min: 25000, max: 50000 },
  { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
  { label: 'Above ₹100,000', min: 100000, max: Infinity }
]



export default function GiftingPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [selectedOccasion, setSelectedOccasion] = useState('all')
  const [selectedRecipient, setSelectedRecipient] = useState('all')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPriceRange, setSelectedPriceRange] = useState(0)
  const [showFilters, setShowFilters] = useState(false)
  const [favorites, setFavorites] = useState<string[]>([])
  const [filteredProducts, setFilteredProducts] = useState(giftProducts)

  useEffect(() => {
    let filtered = giftProducts

    if (selectedOccasion !== 'all') {
      filtered = filtered.filter(product => product.occasion === selectedOccasion)
    }

    if (selectedRecipient !== 'all') {
      filtered = filtered.filter(product => product.recipient === selectedRecipient)
    }

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    if (selectedPriceRange > 0) {
      const range = priceRanges[selectedPriceRange]
      filtered = filtered.filter(product => product.price >= range.min && product.price <= range.max)
    }

    setFilteredProducts(filtered)
  }, [selectedOccasion, selectedRecipient, selectedCategory, selectedPriceRange])

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30">
      {/* Luxury Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-rose-900 via-purple-900 to-indigo-900">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-purple-400/20 to-indigo-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-pink-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse delay-500"></div>
        </div>

        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-32 left-16"
            animate={{ y: [-20, 20, -20], rotate: [0, 180, 360] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          >
            <Gift className="w-8 h-8 text-rose-300/60" />
          </motion.div>
          <motion.div
            className="absolute top-48 right-32"
            animate={{ y: [20, -20, 20], rotate: [360, 180, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          >
            <Diamond className="w-10 h-10 text-purple-300/60" />
          </motion.div>
          <motion.div
            className="absolute bottom-32 left-32"
            animate={{ y: [-15, 15, -15], x: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <Sparkles className="w-6 h-6 text-pink-300/60" />
          </motion.div>
          <motion.div
            className="absolute bottom-48 right-16"
            animate={{ y: [15, -15, 15], rotate: [0, 360, 0] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          >
            <Crown className="w-12 h-12 text-rose-300/60" />
          </motion.div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 mb-6">
              <Gift className="w-5 h-5 text-rose-300" />
              <span className="text-white/90 font-medium">Luxury Gift Collection</span>
              <Sparkles className="w-5 h-5 text-purple-300" />
            </div>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            Perfect
            <span className="block bg-gradient-to-r from-rose-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
              Gifts
            </span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-white/80 max-w-4xl mx-auto leading-relaxed font-light mb-12"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            Discover extraordinary jewelry pieces that create unforgettable moments. 
            From intimate celebrations to grand occasions, find the perfect gift that speaks from the heart.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-semibold rounded-full shadow-2xl hover:shadow-rose-500/25 transition-all duration-300 flex items-center gap-3"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-5 h-5" />
            </motion.button>
            <motion.button
              className="px-8 py-4 bg-white/10 backdrop-blur-md text-white font-semibold rounded-full border border-white/20 hover:bg-white/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
            >
              Gift Guide
            </motion.button>
          </motion.div>
        </div>
      </section>



      {/* Enhanced Filters and Controls */}
      <section className="px-4 py-8 bg-white/80 backdrop-blur-md border-y border-gray-200/50 shadow-sm">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            {/* Filter Toggle and View Controls */}
            <div className="flex items-center gap-4">
              <motion.button
                onClick={() => setShowFilters(!showFilters)}
                className={`flex items-center gap-3 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  showFilters 
                    ? 'bg-gradient-to-r from-rose-500 to-purple-500 text-white shadow-lg' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Filter className="w-5 h-5" />
                <span>Filters</span>
                <motion.div
                  animate={{ rotate: showFilters ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-4 h-4" />
                </motion.div>
              </motion.button>

              <div className="flex items-center gap-2 bg-gray-100 rounded-xl p-1">
                <motion.button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'grid' 
                      ? 'bg-white text-gray-800 shadow-md' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Grid className="w-5 h-5" />
                </motion.button>
                <motion.button
                  onClick={() => setViewMode('list')}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    viewMode === 'list' 
                      ? 'bg-white text-gray-800 shadow-md' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <List className="w-5 h-5" />
                </motion.button>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-center lg:text-right">
              <span className="text-gray-600 font-medium">
                Showing <span className="text-rose-600 font-bold">{filteredProducts.length}</span> of {giftProducts.length} luxury gifts
              </span>
            </div>
          </div>

          {/* Enhanced Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="mt-8 p-8 bg-gradient-to-br from-white to-slate-50/50 rounded-3xl shadow-xl border border-gray-200/50 backdrop-blur-sm"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {/* Occasion Filter */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Occasion</label>
                    <select
                      value={selectedOccasion}
                      onChange={(e) => setSelectedOccasion(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium shadow-sm"
                    >
                      {occasions.map(occasion => (
                        <option key={occasion} value={occasion}>
                          {occasion.replace('-', ' ').split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Recipient Filter */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Recipient</label>
                    <select
                      value={selectedRecipient}
                      onChange={(e) => setSelectedRecipient(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium shadow-sm"
                    >
                      {recipients.map(recipient => (
                        <option key={recipient} value={recipient}>
                          {recipient.charAt(0).toUpperCase() + recipient.slice(1)}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Category Filter */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Category</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium shadow-sm"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </motion.div>

                  {/* Price Range Filter */}
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label className="block text-sm font-bold text-gray-700 mb-3 uppercase tracking-wide">Price Range</label>
                    <select
                      value={selectedPriceRange}
                      onChange={(e) => setSelectedPriceRange(Number(e.target.value))}
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-rose-500/20 focus:border-rose-500 transition-all duration-300 bg-white/80 backdrop-blur-sm font-medium shadow-sm"
                    >
                      {priceRanges.map((range, index) => (
                        <option key={index} value={index}>
                          {range.label}
                        </option>
                      ))}
                    </select>
                  </motion.div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Premium Products Collection */}
      <section className="px-4 py-20 bg-gradient-to-b from-white to-slate-50/30">
        <div className="max-w-7xl mx-auto">
          {/* Collection Header */}
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-800 mb-4">
              Luxury <span className="text-transparent bg-gradient-to-r from-rose-600 to-purple-600 bg-clip-text">Gift Collection</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-rose-500 to-purple-500 mx-auto rounded-full"></div>
          </motion.div>

          <motion.div
            className={`grid gap-8 ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1 max-w-5xl mx-auto'
            }`}
            layout
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product, index) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -30, scale: 0.9 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.1,
                    type: "spring",
                    stiffness: 100
                  }}
                  className={`group relative bg-white rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100/50 ${
                    viewMode === 'list' ? 'flex' : ''
                  }`}
                  whileHover={{ y: -8, scale: 1.02 }}
                >
                  {/* Premium Product Image */}
                  <div className={`relative overflow-hidden ${viewMode === 'list' ? 'w-80' : 'aspect-square'}`}>
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                    
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Premium Badges */}
                    <div className="absolute top-6 left-6 flex flex-col gap-3">
                      {product.isNew && (
                        <motion.span 
                          className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm"
                          initial={{ scale: 0, rotate: -10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.3, type: "spring" }}
                        >
                          ✨ NEW
                        </motion.span>
                      )}
                      {product.isBestseller && (
                        <motion.span 
                          className="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm"
                          initial={{ scale: 0, rotate: 10 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.4, type: "spring" }}
                        >
                          👑 BESTSELLER
                        </motion.span>
                      )}
                      {product.isGiftWrapped && (
                        <motion.span 
                          className="px-4 py-2 bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-2 shadow-lg backdrop-blur-sm"
                          initial={{ scale: 0, rotate: -5 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ delay: 0.5, type: "spring" }}
                        >
                          <Gift className="w-3 h-3" />
                          GIFT READY
                        </motion.span>
                      )}
                    </div>

                    {/* Premium Action Buttons */}
                    <div className="absolute top-6 right-6 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-x-4 group-hover:translate-x-0">
                      <motion.button
                        onClick={() => toggleFavorite(product.id)}
                        className={`p-3 rounded-full backdrop-blur-md transition-all duration-300 shadow-lg ${
                          favorites.includes(product.id)
                            ? 'bg-red-500 text-white scale-110'
                            : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white hover:scale-110'
                        }`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                      <motion.button 
                        className="p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-600 hover:bg-rose-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-110"
                        whileHover={{ scale: 1.1, rotate: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Eye className="w-5 h-5" />
                      </motion.button>
                      <motion.button 
                        className="p-3 bg-white/90 backdrop-blur-md rounded-full text-gray-600 hover:bg-purple-500 hover:text-white transition-all duration-300 shadow-lg hover:scale-110"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <ShoppingBag className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>

                  {/* Premium Product Details */}
                  <div className={`p-8 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 mb-2 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-rose-600 group-hover:to-purple-600 group-hover:bg-clip-text transition-all duration-300">
                          {product.name}
                        </h3>
                        <p className="text-gray-600 text-sm leading-relaxed mb-3">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Premium Rating */}
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
                      <span className="text-sm font-medium text-gray-600">
                        {product.rating} ({product.reviews} reviews)
                      </span>
                    </div>

                    {/* Premium Price */}
                    <div className="flex items-center gap-3 mb-6">
                      <span className="text-2xl font-bold text-gray-800">
                        ₹{product.price.toLocaleString()}
                      </span>
                      {product.originalPrice && (
                        <>
                          <span className="text-lg text-gray-500 line-through">
                            ₹{product.originalPrice.toLocaleString()}
                          </span>
                          <span className="px-3 py-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-sm font-bold rounded-full shadow-md">
                            Save ₹{(product.originalPrice - product.price).toLocaleString()}
                          </span>
                        </>
                      )}
                    </div>

                    {/* Premium Gift Message */}
                    {product.giftMessage && (
                      <div className="p-4 bg-gradient-to-r from-rose-50 to-purple-50 rounded-xl mb-6 border border-rose-200/50 shadow-sm">
                        <p className="text-sm text-rose-700 italic font-medium">
                          💝 {product.giftMessage}
                        </p>
                      </div>
                    )}

                    {/* Premium Action Button */}
                    <motion.button
                      className="w-full py-4 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:from-rose-700 hover:to-purple-700"
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Add to Cart
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {/* No Results Message */}
          {filteredProducts.length === 0 && (
            <motion.div
              className="text-center py-20"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="text-6xl mb-6">💎</div>
              <h3 className="text-2xl font-bold text-gray-700 mb-4">No gifts found</h3>
              <p className="text-gray-600 mb-8">Try adjusting your filters to discover more luxury gifts</p>
              <motion.button
                onClick={() => {
                  setSelectedOccasion('all')
                  setSelectedRecipient('all')
                  setSelectedCategory('all')
                  setSelectedPriceRange(0)
                }}
                className="px-8 py-3 bg-gradient-to-r from-rose-600 to-purple-600 text-white font-semibold rounded-full hover:shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Clear All Filters
              </motion.button>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  )
}
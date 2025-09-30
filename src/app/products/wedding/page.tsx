'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Grid, List, Filter, Star, Heart, ShoppingBag, Eye, Sparkles, Crown, 
  Heart as HeartIcon, Flower, Play, ChevronLeft, ChevronRight, Share2,
  Bookmark, Gift, Award, Shield, Truck, Clock, Phone, MessageCircle,
  Zap, Camera, Users, Calendar, MapPin, CheckCircle, ArrowRight
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  price: number
  originalPrice?: number
  images: string[]
  category: string
  material: string
  rating: number
  reviews: number
  isNew?: boolean
  isBestseller?: boolean
  isExclusive?: boolean
  gemstone?: string
  occasion: string
  style: string
  description: string
  features: string[]
  availability: 'in-stock' | 'limited' | 'pre-order'
  deliveryTime: string
  certification?: string
}

const weddingProducts: Product[] = [
  {
    id: 'wed1',
    name: 'Royal Bridal Diamond Necklace Set',
    price: 325999,
    originalPrice: 385999,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'necklace-set',
    material: '22k-gold',
    rating: 4.9,
    reviews: 189,
    isBestseller: true,
    isExclusive: true,
    gemstone: 'diamond',
    occasion: 'wedding',
    style: 'traditional',
    description: 'Exquisite handcrafted bridal necklace set featuring premium diamonds in traditional Indian design.',
    features: ['22K Gold', 'VVS Diamonds', 'Handcrafted', 'Lifetime Warranty', 'Free Resizing'],
    availability: 'in-stock',
    deliveryTime: '3-5 days',
    certification: 'GIA Certified'
  },
  {
    id: 'wed2',
    name: 'Lustrous Pearl Bridal Earrings',
    price: 85999,
    originalPrice: 95999,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1588444837495-c6cfeb53f32d?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'earrings',
    material: '18k-gold',
    rating: 4.8,
    reviews: 234,
    isNew: true,
    gemstone: 'pearl',
    occasion: 'wedding',
    style: 'classic',
    description: 'Elegant South Sea pearl earrings with intricate gold work, perfect for the modern bride.',
    features: ['18K Gold', 'South Sea Pearls', 'Lightweight Design', 'Hypoallergenic', 'Gift Box Included'],
    availability: 'in-stock',
    deliveryTime: '2-3 days'
  },
  {
    id: 'wed3',
    name: 'Heritage Kundan Maang Tikka',
    price: 48999,
    originalPrice: 58999,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'maang-tikka',
    material: '22k-gold',
    rating: 4.7,
    reviews: 156,
    gemstone: 'kundan',
    occasion: 'wedding',
    style: 'traditional',
    description: 'Traditional Kundan maang tikka with intricate meenakari work and precious stones.',
    features: ['22K Gold', 'Kundan Stones', 'Meenakari Work', 'Adjustable Chain', 'Traditional Design'],
    availability: 'limited',
    deliveryTime: '5-7 days'
  },
  {
    id: 'wed4',
    name: 'Emerald Bridal Bangle Set',
    price: 189999,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'bangles',
    material: '22k-gold',
    rating: 4.9,
    reviews: 98,
    isBestseller: true,
    isExclusive: true,
    gemstone: 'emerald',
    occasion: 'wedding',
    style: 'luxury',
    description: 'Stunning emerald bangle set with intricate gold work, symbolizing prosperity and love.',
    features: ['22K Gold', 'Natural Emeralds', 'Set of 4 Bangles', 'Custom Sizing', 'Certificate Included'],
    availability: 'in-stock',
    deliveryTime: '3-5 days',
    certification: 'Gemological Certificate'
  },
  {
    id: 'wed5',
    name: 'Solitaire Engagement Ring',
    price: 165999,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'rings',
    material: 'platinum',
    rating: 4.8,
    reviews: 267,
    isNew: true,
    isExclusive: true,
    gemstone: 'diamond',
    occasion: 'engagement',
    style: 'modern',
    description: 'Classic solitaire engagement ring featuring a brilliant cut diamond in platinum setting.',
    features: ['Platinum Setting', '1 Carat Diamond', 'Brilliant Cut', 'Free Engraving', 'Lifetime Warranty'],
    availability: 'in-stock',
    deliveryTime: '2-4 days',
    certification: 'GIA Certified'
  },
  {
    id: 'wed6',
    name: 'Complete Temple Jewelry Set',
    price: 285999,
    originalPrice: 325999,
    images: [
      'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&h=600&fit=crop&crop=center',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'complete-set',
    material: '22k-gold',
    rating: 4.9,
    reviews: 134,
    isBestseller: true,
    isExclusive: true,
    gemstone: 'ruby',
    occasion: 'wedding',
    style: 'traditional',
    description: 'Complete temple jewelry set including necklace, earrings, bangles, and maang tikka.',
    features: ['22K Gold', 'Ruby Stones', '7-Piece Set', 'Temple Design', 'Antique Finish'],
    availability: 'limited',
    deliveryTime: '7-10 days',
    certification: 'Hallmark Certified'
  },
  {
    id: 'wed7',
    name: 'Diamond Tennis Bracelet',
    price: 125999,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'bracelet',
    material: '18k-white-gold',
    rating: 4.8,
    reviews: 89,
    isNew: true,
    gemstone: 'diamond',
    occasion: 'reception',
    style: 'modern',
    description: 'Elegant diamond tennis bracelet perfect for reception and special occasions.',
    features: ['18K White Gold', 'Round Diamonds', 'Secure Clasp', 'Flexible Design', 'Sparkle Guarantee'],
    availability: 'in-stock',
    deliveryTime: '2-3 days'
  },
  {
    id: 'wed8',
    name: 'Vintage Rose Gold Ring Set',
    price: 95999,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=600&fit=crop&crop=center'
    ],
    category: 'rings',
    material: 'rose-gold',
    rating: 4.7,
    reviews: 156,
    gemstone: 'diamond',
    occasion: 'engagement',
    style: 'vintage',
    description: 'Vintage-inspired rose gold ring set with intricate detailing and diamonds.',
    features: ['Rose Gold', 'Vintage Design', 'Set of 2 Rings', 'Diamond Accents', 'Comfort Fit'],
    availability: 'in-stock',
    deliveryTime: '3-5 days'
  }
]

const categories = ['all', 'necklace-set', 'earrings', 'rings', 'bangles', 'maang-tikka', 'complete-set']
const materials = ['all', 'gold', 'silver', 'rose-gold', 'white-gold', 'platinum']
const gemstones = ['all', 'diamond', 'pearl', 'emerald', 'ruby', 'kundan', 'polki']
const occasions = ['all', 'wedding', 'engagement', 'reception', 'mehendi', 'sangeet']
const styles = ['all', 'traditional', 'modern', 'classic', 'luxury', 'vintage', 'contemporary']
const priceRanges = [
  { label: 'All Prices', min: 0, max: Infinity },
  { label: 'Under ₹50,000', min: 0, max: 50000 },
  { label: '₹50,000 - ₹100,000', min: 50000, max: 100000 },
  { label: '₹100,000 - ₹200,000', min: 100000, max: 200000 },
  { label: 'Above ₹200,000', min: 200000, max: Infinity }
]

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const heroImages = [
    {
      url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=600&fit=crop&crop=center',
      title: 'Bridal Collection',
      subtitle: 'Timeless elegance for your special day'
    },
    {
      url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=1200&h=600&fit=crop&crop=center',
      title: 'Diamond Dreams',
      subtitle: 'Sparkling moments, lasting memories'
    },
    {
      url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=1200&h=600&fit=crop&crop=center',
      title: 'Heritage Designs',
      subtitle: 'Traditional craftsmanship meets modern luxury'
    }
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroImages.length])

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl mb-8">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={heroImages[currentSlide].url}
            alt={heroImages[currentSlide].title}
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white">
              <motion.h1
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold mb-4"
              >
                {heroImages[currentSlide].title}
              </motion.h1>
              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="text-xl md:text-2xl"
              >
                {heroImages[currentSlide].subtitle}
              </motion.p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  )
}

const ProductImageGallery = ({ images, productName }: { images: string[], productName: string }) => {
  const [currentImage, setCurrentImage] = useState(0)

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-xl">
        <Image
          src={images[currentImage]}
          alt={productName}
          fill
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => setCurrentImage(index)}
              className={`relative w-16 h-16 rounded-lg overflow-hidden border-2 ${
                index === currentImage ? 'border-rose-500' : 'border-gray-200'
              }`}
            >
              <Image
                src={image}
                alt={`${productName} ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default function WeddingJewelryPage() {
  const [filteredProducts, setFilteredProducts] = useState(weddingProducts)
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showFilters, setShowFilters] = useState(false)
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null)
  
  const [filters, setFilters] = useState({
    category: 'all',
    material: 'all',
    gemstone: 'all',
    occasion: 'all',
    style: 'all',
    priceRange: 0
  })

  useEffect(() => {
    let filtered = weddingProducts.filter(product => {
      const priceRange = priceRanges[filters.priceRange]
      return (
        (filters.category === 'all' || product.category === filters.category) &&
        (filters.material === 'all' || product.material.includes(filters.material)) &&
        (filters.gemstone === 'all' || product.gemstone === filters.gemstone) &&
        (filters.occasion === 'all' || product.occasion === filters.occasion) &&
        (filters.style === 'all' || product.style === filters.style) &&
        product.price >= priceRange.min && product.price <= priceRange.max
      )
    })
    setFilteredProducts(filtered)
  }, [filters])

  const openQuickView = (product: Product) => {
    setQuickViewProduct(product)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 to-pink-50">
      {/* Hero Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <HeroCarousel />
          
          {/* Trust Indicators */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[
              { icon: <Shield className="w-8 h-8 text-rose-600" />, text: "Lifetime Warranty" },
              { icon: <Truck className="w-8 h-8 text-rose-600" />, text: "Free Shipping" },
              { icon: <Award className="w-8 h-8 text-rose-600" />, text: "Certified Jewelry" },
              { icon: <Clock className="w-8 h-8 text-rose-600" />, text: "Quick Delivery" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm"
              >
                <div className="flex justify-center mb-2">{item.icon}</div>
                <p className="text-sm font-medium text-gray-700">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Wedding Collections</h2>
            <p className="text-xl text-gray-600">Discover our exquisite bridal jewelry collections</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Bridal Sets",
                image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop&crop=center",
                description: "Complete jewelry sets for the perfect bride"
              },
              {
                title: "Engagement Rings",
                image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=300&fit=crop&crop=center",
                description: "Timeless rings to mark your special moment"
              },
              {
                title: "Heritage Collection",
                image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=400&h=300&fit=crop&crop=center",
                description: "Traditional designs with modern craftsmanship"
              }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative overflow-hidden rounded-2xl mb-4">
                  <Image
                    src={category.image}
                    alt={category.title}
                    width={400}
                    height={300}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-30 group-hover:bg-opacity-20 transition-all duration-300" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Filters and Products */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Filter Controls */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-xl border border-gray-200 hover:border-rose-300 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-rose-600 text-white' : 'bg-white text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{filteredProducts.length} products found</p>
          </div>

          {/* Filter Panel */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="bg-white rounded-2xl p-6 mb-8 shadow-sm"
              >
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => setFilters({...filters, category: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category === 'all' ? 'All Categories' : category.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Material</label>
                    <select
                      value={filters.material}
                      onChange={(e) => setFilters({...filters, material: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {materials.map(material => (
                        <option key={material} value={material}>
                          {material === 'all' ? 'All Materials' : material.replace('-', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Gemstone</label>
                    <select
                      value={filters.gemstone}
                      onChange={(e) => setFilters({...filters, gemstone: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {gemstones.map(gemstone => (
                        <option key={gemstone} value={gemstone}>
                          {gemstone === 'all' ? 'All Gemstones' : gemstone.charAt(0).toUpperCase() + gemstone.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Occasion</label>
                    <select
                      value={filters.occasion}
                      onChange={(e) => setFilters({...filters, occasion: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {occasions.map(occasion => (
                        <option key={occasion} value={occasion}>
                          {occasion === 'all' ? 'All Occasions' : occasion.charAt(0).toUpperCase() + occasion.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Style</label>
                    <select
                      value={filters.style}
                      onChange={(e) => setFilters({...filters, style: e.target.value})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {styles.map(style => (
                        <option key={style} value={style}>
                          {style === 'all' ? 'All Styles' : style.charAt(0).toUpperCase() + style.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => setFilters({...filters, priceRange: parseInt(e.target.value)})}
                      className="w-full p-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-rose-500 focus:border-transparent"
                    >
                      {priceRanges.map((range, index) => (
                        <option key={index} value={index}>{range.label}</option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group ${
                  viewMode === 'list' ? 'flex' : ''
                }`}
              >
                <div className={`relative ${viewMode === 'list' ? 'w-64 h-64' : 'aspect-square'}`}>
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isExclusive && (
                      <span className="bg-purple-600 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Exclusive
                      </span>
                    )}
                    {product.isBestseller && (
                      <span className="bg-orange-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        Bestseller
                      </span>
                    )}
                    {product.isNew && (
                      <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        New
                      </span>
                    )}
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => openQuickView(product)}
                      className="p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors"
                    >
                      <Eye className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors">
                      <Heart className="w-4 h-4 text-gray-600" />
                    </button>
                    <button className="p-2 bg-white rounded-full shadow-md hover:bg-rose-50 transition-colors">
                      <Share2 className="w-4 h-4 text-gray-600" />
                    </button>
                  </div>

                  {/* Availability Indicator */}
                  <div className="absolute bottom-3 left-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      product.availability === 'in-stock' 
                        ? 'bg-green-100 text-green-800'
                        : product.availability === 'limited'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-blue-100 text-blue-800'
                    }`}>
                      {product.availability === 'in-stock' ? 'In Stock' : 
                       product.availability === 'limited' ? 'Limited' : 'Pre-order'}
                    </span>
                  </div>
                </div>

                <div className={`p-6 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                  <div className="flex items-center gap-2 mb-2">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600">({product.reviews})</span>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {product.name}
                  </h3>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl font-bold text-gray-800">
                      ₹{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <span className="text-lg text-gray-500 line-through">
                        ₹{product.originalPrice.toLocaleString()}
                      </span>
                    )}
                  </div>

                  {product.certification && (
                    <p className="text-sm text-green-600 mb-2 flex items-center gap-1">
                      <CheckCircle className="w-4 h-4" />
                      {product.certification}
                    </p>
                  )}

                  <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.features.slice(0, 3).map((feature, index) => (
                        <span key={index} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                          {feature}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <Truck className="w-4 h-4" />
                      Delivery: {product.deliveryTime}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="flex-1 bg-rose-600 text-white py-2 px-4 rounded-xl font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border-2 border-rose-600 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="p-2 border-2 border-rose-600 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-rose-100 to-pink-100">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
            Your Perfect Wedding Awaits
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let us help you create the wedding of your dreams with jewelry that tells your love story. 
            Book a consultation with our bridal specialists.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors"
              >
                Book Consultation
              </motion.button>
            </Link>
            <Link href="/size-guide">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 border-2 border-rose-600 text-rose-600 rounded-xl font-medium hover:bg-rose-600 hover:text-white transition-colors"
              >
                Size Guide
              </motion.button>
            </Link>
          </div>
        </motion.div>
      </section>

      {/* Customer Testimonials */}
      <section className="py-20 bg-gradient-to-br from-rose-100 to-pink-100">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">What Our Brides Say</h2>
            <p className="text-xl text-gray-600">Real stories from real couples</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Priya & Arjun",
                image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
                text: "The bridal set exceeded our expectations. The craftsmanship is exceptional and the service was outstanding.",
                rating: 5,
                wedding: "Mumbai Wedding"
              },
              {
                name: "Kavya & Rohit",
                image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
                text: "Perfect jewelry for our dream wedding. The team helped us customize everything to match our vision.",
                rating: 5,
                wedding: "Delhi Wedding"
              },
              {
                name: "Ananya & Vikram",
                image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
                text: "Absolutely stunning pieces! The quality and design are unmatched. Highly recommend for any bride.",
                rating: 5,
                wedding: "Bangalore Wedding"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="bg-white rounded-2xl p-8 shadow-lg"
              >
                <div className="flex items-center mb-6">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={60}
                    height={60}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.wedding}</p>
                  </div>
                </div>
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Wedding Services */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Complete Wedding Services</h2>
            <p className="text-xl text-gray-600">Everything you need for your perfect day</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Crown className="w-12 h-12 text-rose-600" />,
                title: "Bridal Consultation",
                description: "Personal styling session with our bridal experts"
              },
              {
                icon: <Sparkles className="w-12 h-12 text-rose-600" />,
                title: "Custom Design",
                description: "Create unique pieces tailored to your vision"
              },
              {
                icon: <Gift className="w-12 h-12 text-rose-600" />,
                title: "Gift Registry",
                description: "Curated registry for your wedding guests"
              },
              {
                icon: <Shield className="w-12 h-12 text-rose-600" />,
                title: "Lifetime Care",
                description: "Cleaning, maintenance, and warranty services"
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-6 rounded-2xl hover:bg-rose-50 transition-colors"
              >
                <div className="mb-4 flex justify-center">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gradient-to-r from-rose-600 to-pink-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Stay Updated with Wedding Trends
            </h2>
            <p className="text-xl text-rose-100 mb-8">
              Get exclusive access to new collections and wedding jewelry tips
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-6 py-3 rounded-xl border-0 focus:ring-2 focus:ring-white focus:outline-none"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 bg-white text-rose-600 rounded-xl font-medium hover:bg-rose-50 transition-colors"
              >
                Subscribe
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Quick View Modal */}
      <AnimatePresence>
        {quickViewProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            onClick={() => setQuickViewProduct(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">{quickViewProduct.name}</h2>
                  <button
                    onClick={() => setQuickViewProduct(null)}
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <ProductImageGallery 
                      images={quickViewProduct.images} 
                      productName={quickViewProduct.name} 
                    />
                  </div>
                  
                  <div>
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-5 h-5 ${
                              i < Math.floor(quickViewProduct.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600">
                        ({quickViewProduct.reviews} reviews)
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-6">
                      <span className="text-3xl font-bold text-gray-800">
                        ₹{quickViewProduct.price.toLocaleString()}
                      </span>
                      {quickViewProduct.originalPrice && (
                        <span className="text-xl text-gray-500 line-through">
                          ₹{quickViewProduct.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                    
                    <p className="text-gray-600 mb-6">{quickViewProduct.description}</p>
                    
                    <div className="mb-6">
                      <h4 className="font-semibold text-gray-800 mb-3">Features:</h4>
                      <ul className="space-y-2">
                        {quickViewProduct.features.map((feature, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <CheckCircle className="w-4 h-4 text-green-500" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex gap-4">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="flex-1 bg-rose-600 text-white py-3 px-6 rounded-xl font-medium hover:bg-rose-700 transition-colors flex items-center justify-center gap-2"
                      >
                        <ShoppingBag className="w-5 h-5" />
                        Add to Cart
                      </motion.button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-3 border-2 border-rose-600 text-rose-600 rounded-xl hover:bg-rose-600 hover:text-white transition-colors"
                      >
                        <Heart className="w-5 h-5" />
                      </motion.button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Filter, SlidersHorizontal, ArrowUpDown, Diamond, Gem, Crown, Sparkles, Star, Heart, ShoppingBag, Eye } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore, useWishlistStore } from '@/store'
import { formatPrice } from '@/lib/utils'
import toast from 'react-hot-toast'

interface JewelryItem {
  id: string
  url: string
  title?: string
  description?: string
  metadata?: {
    category?: string
    purity?: string
    diamondCarat?: string
    metal?: string
    diamond?: string
    general?: string
    price?: string
    originalPrice?: string
    jewelryCategory?: string
  }
  imageKey: string
}

const CATEGORIES = [
  { id: 'all', name: 'All Collections', icon: Gem },
  { id: 'high-jewelry', name: 'High Jewelry', icon: Crown },
  { id: 'fine-jewelry', name: 'Fine Jewelry', icon: Diamond }
]

const SORT_OPTIONS = [
  { id: 'featured', name: 'Featured' },
  { id: 'price-low', name: 'Price: Low to High' },
  { id: 'price-high', name: 'Price: High to Low' },
  { id: 'newest', name: 'Newest First' },
]

const PURITY_OPTIONS = [
  { id: 'all', name: 'All Purity' },
  { id: '24k', name: '24K Gold' },
  { id: '22k', name: '22K Gold' },
  { id: '18k', name: '18K Gold' },
  { id: '14k', name: '14K Gold' },
  { id: 'platinum', name: 'Platinum' },
]

const CARAT_OPTIONS = [
  { id: 'all', name: 'All Carats' },
  { id: '0-1', name: 'Under 1 Carat' },
  { id: '1-2', name: '1 - 2 Carats' },
  { id: '2-3', name: '2 - 3 Carats' },
  { id: '3-5', name: '3 - 5 Carats' },
  { id: '5+', name: '5+ Carats' },
]

// Dummy data for initial display
const defaultJewelryItems: JewelryItem[] = [
  {
    id: '1',
    url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=800&fit=crop',
    title: 'Royal Diamond Solitaire Ring',
    description: 'Exquisite solitaire ring featuring a brilliant-cut diamond in platinum setting',
    metadata: {
      category: 'high-jewelry',
      purity: '18K White Gold',
      diamondCarat: '2.5 Carat',
      metal: 'Platinum with 18K White Gold Band',
      diamond: 'VS1 Clarity, D Color, Excellent Cut',
      general: 'GIA Certified, Handcrafted, Limited Edition',
      price: '₹4,50,000',
      originalPrice: '₹5,50,000',
      jewelryCategory: 'rings'
    },
    imageKey: 'jewelry-1'
  },
  {
    id: '2',
    url: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=800&fit=crop',
    title: 'Heritage Gold Necklace',
    description: 'Traditional 22K gold necklace with intricate filigree work and precious gemstones',
    metadata: {
      category: 'fine-jewelry',
      purity: '22K Gold',
      diamondCarat: '1.2 Carat',
      metal: '22K Yellow Gold, 45.5g',
      diamond: 'Natural Rubies and Emeralds',
      general: 'Temple Jewelry Style, Handcrafted by Master Artisans',
      price: '₹2,85,000',
      originalPrice: '₹3,25,000',
      jewelryCategory: 'necklaces'
    },
    imageKey: 'jewelry-2'
  },
  {
    id: '3',
    url: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop',
    title: 'Emerald Drop Earrings',
    description: 'Stunning emerald drop earrings surrounded by brilliant diamonds',
    metadata: {
      category: 'high-jewelry',
      purity: '18K Rose Gold',
      diamondCarat: '3.0 Carat Total',
      metal: '18K Rose Gold with Platinum Posts',
      diamond: 'Colombian Emeralds 4.5ct, VVS Diamonds',
      general: 'Certified Natural Gemstones, Luxury Gift Box',
      price: '₹6,75,000',
      originalPrice: '₹7,95,000',
      jewelryCategory: 'earrings'
    },
    imageKey: 'jewelry-3'
  },
  {
    id: '4',
    url: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=800&fit=crop',
    title: 'Pearl & Diamond Bracelet',
    description: 'Elegant bracelet featuring lustrous South Sea pearls and diamonds',
    metadata: {
      category: 'fine-jewelry',
      purity: '18K White Gold',
      diamondCarat: '1.8 Carat',
      metal: '18K White Gold, 15.2g',
      diamond: 'South Sea Pearls 10-12mm, VS Diamonds',
      general: 'Adjustable Length, Premium Clasp, Certified Pearls',
      price: '₹3,45,000',
      originalPrice: '₹4,15,000',
      jewelryCategory: 'bracelets'
    },
    imageKey: 'jewelry-4'
  },
  {
    id: '5',
    url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=800&fit=crop',
    title: 'Sapphire Halo Ring',
    description: 'Magnificent blue sapphire surrounded by a halo of brilliant diamonds',
    metadata: {
      category: 'high-jewelry',
      purity: '18K White Gold',
      diamondCarat: '4.2 Carat',
      metal: 'Platinum Setting with 18K White Gold',
      diamond: 'Ceylon Sapphire 3.5ct, VVS1 Diamond Halo',
      general: 'Royal Blue Sapphire, GRS Certified, Bespoke Design',
      price: '₹8,95,000',
      originalPrice: '₹10,50,000',
      jewelryCategory: 'rings'
    },
    imageKey: 'jewelry-5'
  },
  {
    id: '6',
    url: 'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=800&h=800&fit=crop',
    title: 'Diamond Tennis Bracelet',
    description: 'Classic tennis bracelet with perfectly matched round brilliant diamonds',
    metadata: {
      category: 'fine-jewelry',
      purity: '18K White Gold',
      diamondCarat: '5.0 Carat Total',
      metal: '18K White Gold, 12.8g',
      diamond: '50 Diamonds, F Color, VS1-VS2 Clarity',
      general: 'Secure Box Clasp, Flexible Design, Certified',
      price: '₹5,25,000',
      originalPrice: '₹6,25,000',
      jewelryCategory: 'bracelets'
    },
    imageKey: 'jewelry-6'
  },
  {
    id: '7',
    url: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop',
    title: 'Ruby & Diamond Pendant',
    description: 'Exquisite Burmese ruby pendant with diamond accents on platinum chain',
    metadata: {
      category: 'high-jewelry',
      purity: 'Platinum 950',
      diamondCarat: '2.8 Carat',
      metal: 'Platinum 950, 8.5g',
      diamond: 'Burmese Ruby 2.5ct, Pigeon Blood Red, VVS Diamonds',
      general: 'GRS Certified Ruby, Adjustable Chain, Museum Quality',
      price: '₹12,50,000',
      originalPrice: '₹14,95,000',
      jewelryCategory: 'pendants'
    },
    imageKey: 'jewelry-7'
  },
  {
    id: '8',
    url: 'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop',
    title: 'Vintage Gold Bangles',
    description: 'Set of two traditional gold bangles with antique finish and gemstone accents',
    metadata: {
      category: 'fine-jewelry',
      purity: '22K Gold',
      diamondCarat: '0.8 Carat',
      metal: '22K Yellow Gold, 65g (pair)',
      diamond: 'Natural Rubies and Emeralds, Meenakari Work',
      general: 'Traditional Design, Handcrafted, Adjustable Size',
      price: '₹4,15,000',
      originalPrice: '₹4,75,000',
      jewelryCategory: 'bangles'
    },
    imageKey: 'jewelry-8'
  }
]

interface LuxuryJewelryProps {
  section?: string
  pageTitle?: string
  customCategories?: Array<{ id: string; name: string; icon: any }>
}

export function LuxuryJewelry({ section = 'luxury-jewelry', pageTitle, customCategories }: LuxuryJewelryProps = {}) {
  const [jewelryItems, setJewelryItems] = useState<JewelryItem[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedPurity, setSelectedPurity] = useState('all')
  const [selectedCarat, setSelectedCarat] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [isSortOpen, setIsSortOpen] = useState(false)
  const [isPurityOpen, setIsPurityOpen] = useState(false)
  const [isCaratOpen, setIsCaratOpen] = useState(false)
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  // Use item-type categories for all-jewelry, else custom/default
  const categories: CategoryDef[] = section === 'all-jewelry' ? [] : (customCategories || CATEGORIES)

  // Fetch jewelry items from database
  useEffect(() => {
    async function fetchJewelry() {
      try {
        const timestamp = new Date().getTime()
        console.log(`Fetching jewelry for section: ${section}`)
        const response = await fetch(`/api/site-images?section=${section}&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })
        const data = await response.json()
        console.log(`Received data for ${section}:`, data)
        
        if (data.images && data.images.length > 0) {
          console.log(`✅ Setting ${data.images.length} items for ${section}`)
          console.log('First item:', data.images[0])
          setJewelryItems(data.images)
          console.log('State updated successfully')
        } else {
          console.log(`❌ No images found for ${section} — using dummy defaults`)
          setJewelryItems(defaultJewelryItems)
        }
      } catch (error) {
        console.error(`Failed to fetch jewelry items for ${section}:`, error)
        setJewelryItems(defaultJewelryItems)
      }
    }

    fetchJewelry()
  }, [section])

  // Filter items by category, purity, and carat
  const filteredItems = jewelryItems.filter(item => {
    // Category filter
    const itemCategory = (section === 'all-jewelry'
      ? (item.metadata?.jewelryCategory || '').toLowerCase()
      : (item.metadata?.category || '').toLowerCase())
    if (selectedCategory !== 'all' && itemCategory !== selectedCategory.toLowerCase()) {
      return false
    }

    // Purity filter
    if (selectedPurity !== 'all') {
      const purity = item.metadata?.purity?.toLowerCase() || ''
      if (selectedPurity === '24k' && !purity.includes('24k')) return false
      if (selectedPurity === '22k' && !purity.includes('22k')) return false
      if (selectedPurity === '18k' && !purity.includes('18k')) return false
      if (selectedPurity === '14k' && !purity.includes('14k')) return false
      if (selectedPurity === 'platinum' && !purity.includes('platinum')) return false
    }

    // Carat filter
    if (selectedCarat !== 'all') {
      const caratText = item.metadata?.diamondCarat?.toLowerCase() || ''
      const caratMatch = caratText.match(/(\d+\.?\d*)/);
      const caratValue = caratMatch ? parseFloat(caratMatch[0]) : 0
      
      if (selectedCarat === '0-1' && caratValue >= 1) return false
      if (selectedCarat === '1-2' && (caratValue < 1 || caratValue >= 2)) return false
      if (selectedCarat === '2-3' && (caratValue < 2 || caratValue >= 3)) return false
      if (selectedCarat === '3-5' && (caratValue < 3 || caratValue >= 5)) return false
      if (selectedCarat === '5+' && caratValue < 5) return false
    }

    return true
  })

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    if (sortBy === 'price-low') {
      const priceA = parseFloat(a.metadata?.price?.replace(/[^0-9.]/g, '') || '0')
      const priceB = parseFloat(b.metadata?.price?.replace(/[^0-9.]/g, '') || '0')
      return priceA - priceB
    }
    if (sortBy === 'price-high') {
      const priceA = parseFloat(a.metadata?.price?.replace(/[^0-9.]/g, '') || '0')
      const priceB = parseFloat(b.metadata?.price?.replace(/[^0-9.]/g, '') || '0')
      return priceB - priceA
    }
    return 0
  })

  const handleAddToCart = (item: JewelryItem) => {
    const product = {
      id: item.id,
      name: item.title || 'Luxury Jewelry',
      description: item.description || '',
      price: parseFloat(item.metadata?.price?.replace(/[^0-9.]/g, '') || '0'),
      images: [{ id: item.id, url: item.url, alt: item.title || '', isPrimary: true, order: 1 }],
      slug: item.imageKey,
      category: 'rings' as const,
      specifications: {
        material: item.metadata?.metal || '',
        weight: 0,
        occasion: [],
        style: 'luxury',
      },
      inventory: {
        quantity: 10,
        lowStockThreshold: 2,
        isInStock: true,
        isLowStock: false,
        preOrder: false
      },
      isActive: true,
      isFeatured: true,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      sku: item.imageKey,
      seo: { title: item.title || '', description: '' }
    }
    addToCart(product)
    toast.success('Added to cart!')
  }

  const handleToggleWishlist = (item: JewelryItem) => {
    const product = {
      id: item.id,
      name: item.title || 'Luxury Jewelry',
      description: item.description || '',
      price: parseFloat(item.metadata?.price?.replace(/[^0-9.]/g, '') || '0'),
      images: [{ id: item.id, url: item.url, alt: item.title || '', isPrimary: true, order: 1 }],
      slug: item.imageKey,
      category: 'rings' as const,
      specifications: {
        material: item.metadata?.metal || '',
        weight: 0,
        occasion: [],
        style: 'luxury',
      },
      inventory: {
        quantity: 10,
        lowStockThreshold: 2,
        isInStock: true,
        isLowStock: false,
        preOrder: false
      },
      isActive: true,
      isFeatured: true,
      tags: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      sku: item.imageKey,
      seo: { title: item.title || '', description: '' }
    }
    
    if (isInWishlist(item.id)) {
      removeFromWishlist(item.id)
      toast.success('Removed from wishlist')
    } else {
      addToWishlist(product)
      toast.success('Added to wishlist!')
    }
  }

  return (
    <section className="relative py-24 bg-gradient-to-b from-white via-amber-50/20 to-white overflow-hidden">
      {/* Luxury Background Elements */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(217, 119, 6, 0.15) 1px, transparent 0)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Elegant Texture Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-champagne-gold/5 to-transparent"></div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Premium Section Header - Only show if pageTitle is provided */}
        {pageTitle && (
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            {/* Royal Crown Icon */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              whileInView={{ scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
              viewport={{ once: true }}
              className="flex justify-center mb-8"
            >
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-champagne-gold via-yellow-400 to-champagne-gold rounded-full flex items-center justify-center shadow-2xl border-2 border-champagne-gold/30">
                  <Crown className="w-10 h-10 text-white" strokeWidth={1.5} />
                </div>
                <div className="absolute -inset-3 bg-gradient-to-r from-champagne-gold/20 via-transparent to-champagne-gold/20 rounded-full blur-2xl"></div>
              </div>
            </motion.div>

            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-champagne-gold/10 via-champagne-gold/5 to-champagne-gold/10 px-8 py-3 rounded-full mb-8 border border-champagne-gold/30 backdrop-blur-sm shadow-lg shadow-champagne-gold/10"
            >
              <Diamond className="w-4 h-4 text-champagne-gold" />
              <span className="text-champagne-gold font-semibold text-sm tracking-wider uppercase">Haute Joaillerie</span>
              <Diamond className="w-4 h-4 text-champagne-gold" />
            </motion.div>

            {/* Majestic Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-playfair font-bold text-transparent bg-gradient-to-r from-deep-black via-gray-800 to-deep-black bg-clip-text mb-8 leading-tight"
            >
              {pageTitle}
            </motion.h2>

            {/* Royal Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.7 }}
              viewport={{ once: true }}
              className="flex items-center justify-center mb-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent w-32"></div>
              <div className="mx-4 w-3 h-3 bg-champagne-gold rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent w-32"></div>
            </motion.div>

            {/* Elegant Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              viewport={{ once: true }}
              className="text-xl text-warm-gray max-w-3xl mx-auto leading-relaxed font-light"
            >
              Discover our exquisite collection of high jewelry and fine jewelry pieces, 
              each crafted with exceptional artistry and the finest materials.
            </motion.p>
          </motion.div>
        )}

        {/* Premium Filters Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20"
        >
          {/* Single Row - All Filters */}
          <div className="flex flex-wrap gap-3 justify-center items-center">
            {/* Category Filters */}
            {categories.map((category) => {
              const IconComponent = category.icon
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-full border-2 transition-all duration-500 shadow-md
                    ${selectedCategory === category.id
                      ? 'bg-gradient-to-r from-champagne-gold to-yellow-500 text-white border-champagne-gold shadow-lg shadow-champagne-gold/30'
                      : 'bg-white text-gray-700 border-champagne-gold/20 hover:border-champagne-gold hover:shadow-lg'
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4" />
                  <span className="text-sm font-medium tracking-wide whitespace-nowrap">{category.name}</span>
                </motion.button>
              )
            })}

            {/* Vertical Divider (only if categories shown) */}
            {categories.length > 0 && (
            <div className="hidden lg:block h-8 w-px bg-champagne-gold/20"></div>
            )}

            {/* Advanced Filters */}
            {/* Purity Filter */}
            <div className="relative">
              <motion.button
                onClick={() => setIsPurityOpen(!isPurityOpen)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 transition-all duration-300 shadow-md min-w-[140px] justify-between
                  ${selectedPurity !== 'all'
                    ? 'bg-gradient-to-r from-champagne-gold/10 to-yellow-500/10 border-champagne-gold text-champagne-gold shadow-champagne-gold/20'
                    : 'bg-white border-champagne-gold/30 text-gray-700 hover:border-champagne-gold hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Gem className="w-4 h-4 text-champagne-gold" />
                  <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                    {PURITY_OPTIONS.find(opt => opt.id === selectedPurity)?.name || 'Purity'}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isPurityOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-3.5 h-3.5 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isPurityOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsPurityOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-champagne-gold/20 overflow-hidden z-40"
                    >
                      <div className="px-6 py-4 border-b border-champagne-gold/10 bg-gradient-to-r from-champagne-gold/5 to-transparent">
                        <p className="text-xs tracking-[0.2em] uppercase text-champagne-gold font-semibold">Gold Purity</p>
                      </div>
                      <div className="py-2">
                        {PURITY_OPTIONS.map((option, index) => (
                          <motion.button
                            key={option.id}
                            onClick={() => {
                              setSelectedPurity(option.id)
                              setIsPurityOpen(false)
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: 'rgba(217, 119, 6, 0.05)', x: 4 }}
                            className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-center justify-between group ${selectedPurity === option.id ? 'bg-champagne-gold/10' : ''}`}
                          >
                            <span className={`text-sm font-medium tracking-wide transition-colors ${selectedPurity === option.id ? 'text-champagne-gold' : 'text-gray-700 group-hover:text-champagne-gold'}`}>
                              {option.name}
                            </span>
                            {selectedPurity === option.id && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-champagne-gold" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <div className="h-1 bg-gradient-to-r from-champagne-gold via-yellow-500 to-champagne-gold"></div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Carat Filter */}
            <div className="relative">
              <motion.button
                onClick={() => setIsCaratOpen(!isCaratOpen)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 transition-all duration-300 shadow-md min-w-[140px] justify-between
                  ${selectedCarat !== 'all'
                    ? 'bg-gradient-to-r from-champagne-gold/10 to-yellow-500/10 border-champagne-gold text-champagne-gold shadow-champagne-gold/20'
                    : 'bg-white border-champagne-gold/30 text-gray-700 hover:border-champagne-gold hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <Diamond className="w-4 h-4 text-champagne-gold" />
                  <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                    {CARAT_OPTIONS.find(opt => opt.id === selectedCarat)?.name || 'Carat'}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isCaratOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-3.5 h-3.5 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {isCaratOpen && (
                  <>
                    <div className="fixed inset-0 z-30" onClick={() => setIsCaratOpen(false)} />
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute left-0 mt-3 w-56 bg-white rounded-2xl shadow-2xl border border-champagne-gold/20 overflow-hidden z-40"
                    >
                      <div className="px-6 py-4 border-b border-champagne-gold/10 bg-gradient-to-r from-champagne-gold/5 to-transparent">
                        <p className="text-xs tracking-[0.2em] uppercase text-champagne-gold font-semibold">Diamond Carat</p>
                      </div>
                      <div className="py-2">
                        {CARAT_OPTIONS.map((option, index) => (
                          <motion.button
                            key={option.id}
                            onClick={() => {
                              setSelectedCarat(option.id)
                              setIsCaratOpen(false)
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: 'rgba(217, 119, 6, 0.05)', x: 4 }}
                            className={`w-full px-6 py-3 text-left transition-all duration-200 flex items-center justify-between group ${selectedCarat === option.id ? 'bg-champagne-gold/10' : ''}`}
                          >
                            <span className={`text-sm font-medium tracking-wide transition-colors ${selectedCarat === option.id ? 'text-champagne-gold' : 'text-gray-700 group-hover:text-champagne-gold'}`}>
                              {option.name}
                            </span>
                            {selectedCarat === option.id && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-champagne-gold" />
                            )}
                          </motion.button>
                        ))}
                      </div>
                      <div className="h-1 bg-gradient-to-r from-champagne-gold via-yellow-500 to-champagne-gold"></div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>

            {/* Premium Custom Sort Dropdown */}
            <div className="relative">
              <motion.button
                onClick={() => setIsSortOpen(!isSortOpen)}
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className={`
                  flex items-center gap-2.5 px-5 py-2.5 rounded-full border-2 transition-all duration-300 shadow-md min-w-[180px] justify-between
                  ${sortBy !== 'featured'
                    ? 'bg-gradient-to-r from-champagne-gold/10 to-yellow-500/10 border-champagne-gold text-champagne-gold shadow-champagne-gold/20'
                    : 'bg-white border-champagne-gold/30 text-gray-700 hover:border-champagne-gold hover:shadow-lg'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  <ArrowUpDown className="w-4 h-4 text-champagne-gold" />
                  <span className="text-sm font-medium tracking-wide whitespace-nowrap">
                    {SORT_OPTIONS.find(opt => opt.id === sortBy)?.name || 'Sort By'}
                  </span>
                </div>
                <motion.div
                  animate={{ rotate: isSortOpen ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg className="w-3.5 h-3.5 text-champagne-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </motion.div>
              </motion.button>

              {/* Premium Dropdown Menu */}
              <AnimatePresence>
                {isSortOpen && (
                  <>
                    {/* Backdrop */}
                    <div 
                      className="fixed inset-0 z-30" 
                      onClick={() => setIsSortOpen(false)}
                    />
                    
                    {/* Dropdown */}
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border border-champagne-gold/20 overflow-hidden z-40"
                    >
                      {/* Elegant Header */}
                      <div className="px-6 py-4 border-b border-champagne-gold/10 bg-gradient-to-r from-champagne-gold/5 to-transparent">
                        <p className="text-xs tracking-[0.2em] uppercase text-champagne-gold font-semibold">Sort By</p>
                      </div>

                      {/* Options */}
                      <div className="py-2">
                        {SORT_OPTIONS.map((option, index) => (
                          <motion.button
                            key={option.id}
                            onClick={() => {
                              setSortBy(option.id)
                              setIsSortOpen(false)
                            }}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ backgroundColor: 'rgba(217, 119, 6, 0.05)', x: 4 }}
                            className={`
                              w-full px-6 py-3 text-left transition-all duration-200 flex items-center justify-between group
                              ${sortBy === option.id ? 'bg-champagne-gold/10' : ''}
                            `}
                          >
                            <span className={`
                              text-sm font-medium tracking-wide transition-colors
                              ${sortBy === option.id ? 'text-champagne-gold' : 'text-gray-700 group-hover:text-champagne-gold'}
                            `}>
                              {option.name}
                            </span>
                            {sortBy === option.id && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                className="w-2 h-2 rounded-full bg-champagne-gold"
                              />
                            )}
                          </motion.button>
                        ))}
                      </div>

                      {/* Decorative Bottom Border */}
                      <div className="h-1 bg-gradient-to-r from-champagne-gold via-yellow-500 to-champagne-gold"></div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>

        {/* Jewelry Grid */}
        {section === 'all-jewelry' ? (
          <div className="space-y-12">
            {['diamond','earrings','rings','bracelets','bangles','pendants','necklaces'].map((type) => {
              const label = type.charAt(0).toUpperCase() + type.slice(1)
              const rowItems = sortedItems.filter((item) => {
                const itemType = (item.metadata?.jewelryCategory || '').toLowerCase()
                if (type === 'diamond') {
                  return (item.metadata?.diamond && item.metadata.diamond.trim().length > 0) || itemType === 'diamond'
                }
                return itemType === type
              })

              return (
                <div key={type} className="">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-medium tracking-wide" style={{ fontFamily: 'Cormorant Garamond, serif' }}>{label}</h2>
                  </div>

                  <div className="flex gap-6 overflow-x-auto pb-2 snap-x snap-mandatory">
                    {rowItems.length > 0 ? (
                      rowItems.map((item, index) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 40, scale: 0.96 }}
                          whileInView={{ opacity: 1, y: 0, scale: 1 }}
                          transition={{ duration: 0.5, delay: index * 0.05, ease: 'easeOut' }}
                          viewport={{ once: true }}
                          className="group relative min-w-[260px] sm:min-w-[280px] lg:min-w-[300px] snap-start"
                        >
                          {/* Premium Card Container */}
                          <div className="relative bg-white overflow-hidden border border-gray-100 hover:border-champagne-gold/40 transition-all duration-500 group-hover:shadow-2xl">
                            {/* Minimal Category Badge */}
                            {item.metadata?.category && (
                              <div className="absolute top-3 left-3 z-10">
                                <div className="bg-white/95 backdrop-blur-sm px-3 py-1 border border-champagne-gold/30 shadow-sm">
                                  <span className="text-[10px] tracking-[0.15em] uppercase text-champagne-gold font-medium">
                                    {item.metadata.category.replace('-', ' ')}
                                  </span>
                                </div>
                              </div>
                            )}

                            {/* Clean Image/Video Container */}
                            <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                              {item.url.match(/\.(mp4|webm|mov|avi)$/i) ? (
                                <video
                                  src={item.url}
                                  autoPlay
                                  loop
                                  muted
                                  playsInline
                                  preload="auto"
                                  className="w-full h-full object-contain bg-black transition-all duration-700 group-hover:scale-105"
                                />
                              ) : (
                                <Image
                                  src={item.url}
                                  alt={item.title || 'Luxury Jewelry'}
                                  fill
                                  className="object-cover transition-all duration-700 group-hover:scale-105"
                                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                />
                              )}

                              {/* Subtle Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                              {/* Minimal Quick Actions */}
                              <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button
                                  onClick={() => handleToggleWishlist(item)}
                                  className="bg-white/90 backdrop-blur-sm hover:bg-white w-9 h-9 flex items-center justify-center border border-gray-200 transition-all"
                                >
                                  <Heart 
                                    className={`h-4 w-4 transition-colors ${isInWishlist(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                                  />
                                </button>
                              </div>

                              {/* Clean CTA */}
                              <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                                <button
                                  onClick={() => handleAddToCart(item)}
                                  className="w-full bg-black/90 backdrop-blur-sm hover:bg-black text-white py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all flex items-center justify-center gap-2"
                                >
                                  <ShoppingBag className="h-4 w-4" />
                                  Add to Cart
                                </button>
                              </div>
                            </div>

                            {/* Clean Product Information */}
                            <div className="p-5 bg-white">
                              {/* Title */}
                              <h3 className="text-base font-light text-gray-900 mb-2 line-clamp-2 tracking-wide leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                                {item.title || 'Luxury Jewelry Piece'}
                              </h3>

                              {/* Description */}
                              {item.description && (
                                <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed font-light">
                                  {item.description}
                                </p>
                              )}

                              {/* Minimal Specifications */}
                              {item.metadata?.purity && (
                                <div className="mb-4">
                                  <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-light">
                                    {item.metadata.purity}
                                    {item.metadata.diamondCarat && ` • ${item.metadata.diamondCarat}`}
                                  </span>
                                </div>
                              )}

                              {/* Clean Pricing */}
                              {item.metadata?.price && (
                                <div className="flex items-baseline gap-2 pt-3 border-t border-gray-100">
                                  <span className="text-lg font-light text-gray-900 tracking-wide">
                                    {item.metadata.price}
                                  </span>
                                  {item.metadata.originalPrice && (
                                    <span className="text-xs text-gray-400 line-through font-light">
                                      {item.metadata.originalPrice}
                                    </span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      ))
                    ) : (
                      <div className="text-sm text-gray-500 py-12 px-2">No items in {label} yet</div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedCategory + sortBy}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-10"
            >
              {sortedItems.length > 0 ? (
                sortedItems.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 60, scale: 0.9 }}
                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.6, delay: index * 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="group relative"
                  >
                    {/* Premium Card Container */}
                    <div className="relative bg-white overflow-hidden border border-gray-100 hover:border-champagne-gold/40 transition-all duration-500 group-hover:shadow-2xl">
                      {/* Minimal Category Badge */}
                      {item.metadata?.category && (
                        <div className="absolute top-3 left-3 z-10">
                          <div className="bg-white/95 backdrop-blur-sm px-3 py-1 border border-champagne-gold/30 shadow-sm">
                            <span className="text-[10px] tracking-[0.15em] uppercase text-champagne-gold font-medium">
                              {item.metadata.category.replace('-', ' ')}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Clean Image/Video Container */}
                      <div className="relative aspect-[4/5] overflow-hidden bg-slate-50">
                        {item.url.match(/\.(mp4|webm|mov|avi)$/i) ? (
                          <video
                            src={item.url}
                            autoPlay
                            loop
                            muted
                            playsInline
                            preload="auto"
                            className="w-full h-full object-contain bg-black transition-all duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <Image
                            src={item.url}
                            alt={item.title || 'Luxury Jewelry'}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                          />
                        )}

                        {/* Subtle Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        {/* Minimal Quick Actions */}
                        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => handleToggleWishlist(item)}
                            className="bg-white/90 backdrop-blur-sm hover:bg-white w-9 h-9 flex items-center justify-center border border-gray-200 transition-all"
                          >
                            <Heart 
                              className={`h-4 w-4 transition-colors ${isInWishlist(item.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} 
                            />
                          </button>
                        </div>

                        {/* Clean CTA */}
                        <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="w-full bg-black/90 backdrop-blur-sm hover:bg-black text-white py-3 text-xs tracking-[0.15em] uppercase font-medium transition-all flex items-center justify-center gap-2"
                          >
                            <ShoppingBag className="h-4 w-4" />
                            Add to Cart
                          </button>
                        </div>
                      </div>

                      {/* Clean Product Information */}
                      <div className="p-5 bg-white">
                        {/* Title */}
                        <h3 className="text-base font-light text-gray-900 mb-2 line-clamp-2 tracking-wide leading-snug" style={{ fontFamily: 'Cormorant Garamond, serif' }}>
                          {item.title || 'Luxury Jewelry Piece'}
                        </h3>

                        {/* Description */}
                        {item.description && (
                          <p className="text-xs text-gray-500 mb-4 line-clamp-2 leading-relaxed font-light">
                            {item.description}
                          </p>
                        )}

                        {/* Minimal Specifications */}
                        {item.metadata?.purity && (
                          <div className="mb-4">
                            <span className="text-[10px] tracking-[0.15em] uppercase text-gray-400 font-light">
                              {item.metadata.purity}
                              {item.metadata.diamondCarat && ` • ${item.metadata.diamondCarat}`}
                            </span>
                          </div>
                        )}

                        {/* Clean Pricing */}
                        {item.metadata?.price && (
                          <div className="flex items-baseline gap-2 pt-3 border-t border-gray-100">
                            <span className="text-lg font-light text-gray-900 tracking-wide">
                              {item.metadata.price}
                            </span>
                            {item.metadata.originalPrice && (
                              <span className="text-xs text-gray-400 line-through font-light">
                                {item.metadata.originalPrice}
                              </span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="col-span-full text-center py-20">
                  <Diamond className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-xl text-gray-500">No jewelry items found</p>
                  <p className="text-sm text-gray-400 mt-2">Please check back later for new collections</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}

type CategoryDef = { id: string; name: string; icon: any }
const ITEM_TYPE_CATEGORIES: CategoryDef[] = [
  { id: 'all', name: 'All Types', icon: Gem },
  { id: 'rings', name: 'Rings', icon: Diamond },
  { id: 'earrings', name: 'Earrings', icon: Sparkles },
  { id: 'necklaces', name: 'Necklaces', icon: Crown },
  { id: 'bracelets', name: 'Bracelets', icon: Gem },
  { id: 'bangles', name: 'Bangles', icon: Gem },
  { id: 'pendants', name: 'Pendants', icon: Diamond }
]

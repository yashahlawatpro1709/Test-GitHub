"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Sparkles, Crown, Diamond, Gem, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const heroSlides = [
  {
    id: 1,
    title: "Exquisite Bridal Heritage",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "RIVAAH",
    description: "BRIDAL COUTURE COLLECTION",
    exclusiveOffer: "EXCLUSIVE PREVIEW",
    discount: "UP TO ₹2,50,000",
    additionalOffer: "30%",
    ctaText: "DISCOVER COLLECTION",
    ctaLink: "/collections/wedding",
    mainImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-gray-900 to-black",
    accentColor: "rose",
    theme: "romantic"
  },
  {
    id: 2,
    title: "Eternal Brilliance",
    subtitle: "AASHNI", 
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "LUMIÈRE",
    description: "DIAMOND MASTERPIECES",
    exclusiveOffer: "PRIVATE COLLECTION",
    discount: "UP TO ₹5,00,000",
    additionalOffer: "35%",
    ctaText: "EXPLORE DIAMONDS",
    ctaLink: "/collections/diamond",
    mainImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-blue-900 to-black",
    accentColor: "blue",
    theme: "sophisticated"
  },
  {
    id: 3,
    title: "Legacy of Craftsmanship",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "HÉRITAGE",
    description: "ARTISANAL GOLD CREATIONS", 
    exclusiveOffer: "MASTER COLLECTION",
    discount: "UP TO ₹3,00,000",
    additionalOffer: "25%",
    ctaText: "VIEW HERITAGE",
    ctaLink: "/collections/gold",
    mainImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-amber-900 to-black",
    accentColor: "amber",
    theme: "classic"
  },
  {
    id: 4,
    title: "Royal Emerald Collection",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "ÉMERAUDE",
    description: "PRECIOUS EMERALD TREASURES",
    exclusiveOffer: "ROYAL COLLECTION",
    discount: "UP TO ₹4,00,000",
    additionalOffer: "40%",
    ctaText: "EXPLORE EMERALDS",
    ctaLink: "/collections/emerald",
    mainImage: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-emerald-900 to-black",
    accentColor: "emerald",
    theme: "royal"
  },
  {
    id: 5,
    title: "Sapphire Elegance",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "SAPHIR",
    description: "CELESTIAL SAPPHIRE ARTISTRY",
    exclusiveOffer: "CELESTIAL COLLECTION",
    discount: "UP TO ₹3,50,000",
    additionalOffer: "32%",
    ctaText: "DISCOVER SAPPHIRES",
    ctaLink: "/collections/sapphire",
    mainImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-blue-900 to-black",
    accentColor: "blue",
    theme: "celestial"
  },
  {
    id: 6,
    title: "Ruby Passion",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "RUBIS",
    description: "FIERY RUBY MAGNIFICENCE",
    exclusiveOffer: "PASSION COLLECTION",
    discount: "UP TO ₹4,50,000",
    additionalOffer: "38%",
    ctaText: "EXPLORE RUBIES",
    ctaLink: "/collections/ruby",
    mainImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-red-900 to-black",
    accentColor: "red",
    theme: "passionate"
  },
  {
    id: 7,
    title: "Pearl Perfection",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "PERLE",
    description: "LUSTROUS PEARL ELEGANCE",
    exclusiveOffer: "OCEANIC COLLECTION",
    discount: "UP TO ₹2,00,000",
    additionalOffer: "28%",
    ctaText: "DISCOVER PEARLS",
    ctaLink: "/collections/pearl",
    mainImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-gray-800 to-black",
    accentColor: "gray",
    theme: "oceanic"
  },
  {
    id: 8,
    title: "Platinum Prestige",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "PLATINE",
    description: "PLATINUM LUXURY DESIGNS",
    exclusiveOffer: "PRESTIGE COLLECTION",
    discount: "UP TO ₹6,00,000",
    additionalOffer: "42%",
    ctaText: "EXPLORE PLATINUM",
    ctaLink: "/collections/platinum",
    mainImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-slate-700 to-black",
    accentColor: "slate",
    theme: "prestige"
  },
  {
    id: 9,
    title: "Vintage Grandeur",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "VINTAGE",
    description: "TIMELESS VINTAGE TREASURES",
    exclusiveOffer: "HERITAGE COLLECTION",
    discount: "UP TO ₹3,75,000",
    additionalOffer: "35%",
    ctaText: "EXPLORE VINTAGE",
    ctaLink: "/collections/vintage",
    mainImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-yellow-900 to-black",
    accentColor: "yellow",
    theme: "vintage"
  },
  {
    id: 10,
    title: "Contemporary Chic",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "MODERNE",
    description: "MODERN LUXURY STATEMENTS",
    exclusiveOffer: "CONTEMPORARY COLLECTION",
    discount: "UP TO ₹2,75,000",
    additionalOffer: "30%",
    ctaText: "DISCOVER MODERN",
    ctaLink: "/collections/contemporary",
    mainImage: "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-purple-900 to-black",
    accentColor: "purple",
    theme: "contemporary"
  },
  {
    id: 11,
    title: "Celestial Dreams",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "CÉLESTE",
    description: "STAR-INSPIRED MAGNIFICENCE",
    exclusiveOffer: "CELESTIAL COLLECTION",
    discount: "UP TO ₹5,25,000",
    additionalOffer: "45%",
    ctaText: "EXPLORE CELESTIAL",
    ctaLink: "/collections/celestial",
    mainImage: "https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-indigo-900 to-black",
    accentColor: "indigo",
    theme: "celestial"
  },
  {
    id: 12,
    title: "Imperial Majesty",
    subtitle: "AASHNI",
    tagline: "MAISON DE HAUTE JOAILLERIE",
    collection: "IMPÉRIAL",
    description: "IMPERIAL CROWN JEWELS",
    exclusiveOffer: "IMPERIAL COLLECTION",
    discount: "UP TO ₹7,50,000",
    additionalOffer: "50%",
    ctaText: "DISCOVER IMPERIAL",
    ctaLink: "/collections/imperial",
    mainImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center",
    backgroundGradient: "from-slate-900 via-yellow-800 to-black",
    accentColor: "yellow",
    theme: "imperial"
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 8000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 15000)
  }

  const currentSlideData = heroSlides[currentSlide]

  // Luxury floating elements - Fixed positions to prevent hydration errors
  const luxuryElements = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    left: (i * 17 + 13) % 100,
    top: (i * 23 + 7) % 100,
    duration: 12 + (i % 8),
    delay: (i % 5),
    type: ['diamond', 'star', 'sparkle', 'crown'][i % 4]
  }))

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* Ultra-Premium Background */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.backgroundGradient}`}
        />
      </AnimatePresence>

      {/* Luxury Texture Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_25%_25%,rgba(255,255,255,0.1),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_75%,rgba(255,255,255,0.05),transparent_50%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.02)_50%,transparent_51%)] bg-[length:60px_60px]" />
      </div>

      {/* Floating Luxury Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {luxuryElements.map((element) => (
          <motion.div
            key={element.id}
            className="absolute"
            style={{
              left: `${element.left}%`,
              top: `${element.top}%`,
            }}
            animate={{
              y: [0, -40, 0],
              x: [0, 20, 0],
              opacity: [0.1, 0.4, 0.1],
              scale: [0.6, 1.4, 0.6],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: element.duration,
              repeat: Infinity,
              delay: element.delay,
              ease: "easeInOut"
            }}
          >
            {element.type === 'diamond' && <Diamond className="w-4 h-4 text-white/30" />}
            {element.type === 'star' && <Star className="w-3 h-3 text-white/25" />}
            {element.type === 'sparkle' && <Sparkles className="w-3 h-3 text-white/20" />}
            {element.type === 'crown' && <Crown className="w-4 h-4 text-yellow-400/30" />}
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-8 sm:px-12 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center h-full min-h-[800px]">
            
            {/* Left Content - Ultra Premium Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -80 }}
                transition={{ duration: 1.5, ease: "easeOut" }}
                className="text-left space-y-10 max-w-2xl"
              >
                {/* Luxury Brand Tagline */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.3 }}
                >
                  <div className="flex items-center space-x-4">
                    <motion.div 
                      className="w-16 h-[1px] bg-gradient-to-r from-white/60 to-transparent"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                    <p className="text-xs font-light text-white/80 tracking-[0.4em] uppercase">
                      SINCE 1985 • MUMBAI
                    </p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Crown className="w-5 h-5 text-yellow-400" />
                    <p className="text-sm font-light text-white/90 tracking-[0.3em] uppercase">
                      {currentSlideData.tagline}
                    </p>
                  </div>
                </motion.div>

                {/* Brand Name - Refined Size */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.4, delay: 0.6 }}
                >
                  <h1 className="text-4xl lg:text-5xl xl:text-6xl font-thin text-white tracking-[0.1em] font-serif leading-none">
                    {currentSlideData.subtitle}
                  </h1>
                  <motion.div 
                    className="w-24 h-[1px] bg-gradient-to-r from-white to-white/40"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 1.8, delay: 1 }}
                  />
                </motion.div>

                {/* Collection Title - Elegant */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.9 }}
                >
                  <h2 className="text-2xl lg:text-3xl xl:text-4xl font-light text-white/95 leading-tight font-serif italic tracking-wide">
                    {currentSlideData.title}
                  </h2>
                  <div className="flex items-center space-x-3">
                    <Gem className="w-3 h-3 text-white/60" />
                    <p className="text-sm font-light text-white/80 tracking-[0.2em] uppercase">
                      {currentSlideData.collection}
                    </p>
                  </div>
                </motion.div>

                {/* Description */}
                <motion.p
                  className="text-base lg:text-lg font-light text-white/70 leading-relaxed tracking-wide max-w-md"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  {currentSlideData.description}
                </motion.p>

                {/* Exclusive Offer */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-md px-4 py-2 border border-white/20">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span className="text-xs font-medium text-white tracking-[0.15em] uppercase">
                      {currentSlideData.exclusiveOffer}
                    </span>
                  </div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-xl lg:text-2xl font-light text-white">
                      {currentSlideData.discount}
                    </span>
                    <span className="text-sm text-white/60">
                      SAVE {currentSlideData.additionalOffer}
                    </span>
                  </div>
                </motion.div>

                {/* Premium CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.6 }}
                  className="pt-3"
                >
                  <Link href={currentSlideData.ctaLink}>
                    <motion.div
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                      className="group inline-block"
                    >
                      <Button 
                        size="default" 
                        className="bg-white text-black hover:bg-white/95 font-medium px-8 py-3 text-sm tracking-[0.1em] border-0 shadow-xl hover:shadow-white/20 transition-all duration-700"
                        style={{ borderRadius: '0px' }}
                      >
                        <span className="relative">
                          {currentSlideData.ctaText}
                          <motion.div
                            className="absolute bottom-0 left-0 h-[1px] bg-black origin-left"
                            initial={{ scaleX: 0 }}
                            whileHover={{ scaleX: 1 }}
                            transition={{ duration: 0.4 }}
                          />
                        </span>
                        <motion.div
                          className="ml-4"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </Button>
                    </motion.div>
                  </Link>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Content - Premium Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 80, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 80, scale: 0.9 }}
                transition={{ duration: 1.8, ease: "easeOut" }}
                className="relative h-[400px] lg:h-[500px] xl:h-[600px]"
              >
                <div className="relative h-full w-full group">
                  {/* Main Image */}
                  <div className="relative h-full w-full overflow-hidden bg-gradient-to-br from-gray-900 to-black">
                    <Image
                      src={currentSlideData.mainImage}
                      alt={currentSlideData.title}
                      fill
                      className="object-cover transition-all duration-[3000ms] group-hover:scale-105"
                      priority
                    />
                    
                    {/* Luxury Frame Effects */}
                    <div className="absolute inset-0 border-8 border-white/20 shadow-2xl"></div>
                    <div className="absolute -inset-4 border-2 border-white/10 shadow-xl"></div>
                    <div className="absolute -inset-8 border border-white/5"></div>
                    
                    {/* Premium Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20"></div>
                  </div>
                  
                  {/* Floating Luxury Elements */}
                  <motion.div
                    className="absolute -top-8 -right-8 w-16 h-16 bg-gradient-to-br from-yellow-400 to-yellow-600 flex items-center justify-center shadow-2xl"
                    animate={{ 
                      y: [0, -20, 0],
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Crown className="w-8 h-8 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-12 -left-12 w-12 h-12 bg-gradient-to-br from-white/30 to-white/10 backdrop-blur-sm flex items-center justify-center shadow-xl"
                    animate={{ 
                      y: [0, 25, 0],
                      scale: [1, 0.9, 1],
                      opacity: [0.8, 1, 0.8]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 3
                    }}
                  >
                    <Diamond className="w-6 h-6 text-white" />
                  </motion.div>

                  {/* Premium Badge */}
                  <motion.div
                    className="absolute top-8 left-8 bg-black/80 backdrop-blur-md px-6 py-4 border border-white/20 shadow-2xl"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1.2, delay: 2 }}
                  >
                    <div className="text-sm font-medium text-white tracking-[0.2em] uppercase">
                      HANDCRAFTED
                    </div>
                    <div className="text-xs text-white/70 tracking-wider">
                      SINCE 1985
                    </div>
                  </motion.div>

                  {/* Luxury Shimmer Effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100"
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 4 }}
                  />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Ultra-Premium Navigation Controls */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-2">
          {heroSlides.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => goToSlide(index)}
              className={`transition-all duration-700 ${
                index === currentSlide
                  ? 'w-12 h-1 bg-white'
                  : 'w-8 h-1 bg-white/40 hover:bg-white/70'
              }`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </div>
      </div>

      {/* Elegant Side Navigation */}
      <motion.button
        onClick={prevSlide}
        className="absolute left-12 top-1/2 transform -translate-y-1/2 z-20 p-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-110 shadow-2xl"
        whileHover={{ x: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        className="absolute right-12 top-1/2 transform -translate-y-1/2 z-20 p-6 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 transition-all duration-500 hover:scale-110 shadow-2xl"
        whileHover={{ x: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </motion.button>

      {/* Luxury Brand Signature */}
      <motion.div
        className="absolute bottom-16 right-16 z-20 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2.5 }}
      >
        <div className="text-sm text-white/60 font-light tracking-[0.3em] uppercase">
          CRAFTED WITH PASSION
        </div>
        <div className="text-xs text-white/40 font-light mt-2 tracking-wider">
          MUMBAI • INDIA
        </div>
      </motion.div>

      {/* Luxury Corner Accents */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-white/20"></div>
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-white/20"></div>
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-white/20"></div>
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-white/20"></div>
    </section>
  )
}

export default HeroSection
"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const defaultHeroSlides = [
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
    mainImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center",
    backgroundGradient: "from-rose-50 via-pink-50 to-white",
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
    mainImage: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&h=600&fit=crop&crop=center",
    backgroundGradient: "from-blue-50 via-indigo-50 to-white",
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
    mainImage: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=600&fit=crop&center",
    backgroundGradient: "from-amber-50 via-yellow-50 to-white",
    accentColor: "amber",
    theme: "classic"
  }
]

export function HeroSection() {
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch uploaded images from database
  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const response = await fetch('/api/site-images?section=hero')
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          // Merge uploaded images with default slides
          const updatedSlides = defaultHeroSlides.map((slide, index) => {
            const uploadedImage = data.images.find((img: any) => img.imageKey === `slide-${index + 1}`)
            if (uploadedImage) {
              return {
                ...slide,
                mainImage: uploadedImage.url,
                title: uploadedImage.title || slide.title,
                description: uploadedImage.description || slide.description,
                collection: uploadedImage.metadata?.collection || slide.collection,
                tagline: uploadedImage.metadata?.tagline || slide.tagline,
                exclusiveOffer: uploadedImage.metadata?.exclusiveOffer || slide.exclusiveOffer,
                discount: uploadedImage.metadata?.discount || slide.discount,
                additionalOffer: uploadedImage.metadata?.additionalOffer || slide.additionalOffer,
                ctaText: uploadedImage.metadata?.ctaText || slide.ctaText,
                ctaLink: uploadedImage.metadata?.ctaLink || slide.ctaLink,
              }
            }
            return slide
          })
          setHeroSlides(updatedSlides)
        }
      } catch (error) {
        console.error('Failed to fetch hero images:', error)
        // Keep using default slides on error
      }
    }

    fetchHeroImages()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 6000)
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
    setTimeout(() => setIsAutoPlaying(true), 12000)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 12000)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
    setTimeout(() => setIsAutoPlaying(true), 12000)
  }

  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Luxury Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Cpath d='M30 30c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20zm0 0c0 11.046 8.954 20 20 20s20-8.954 20-20-8.954-20-20-20-20 8.954-20 20z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      {/* Premium Background Gradient */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          className={`absolute inset-0 bg-gradient-to-br ${currentSlideData.backgroundGradient}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Floating Luxury Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.1, 0.3, 0.1],
              scale: [0.8, 1.2, 0.8],
              rotate: [0, 180, 360]
            }}
            transition={{
              duration: 8 + Math.random() * 6,
              repeat: Infinity,
              delay: Math.random() * 8,
              ease: "easeInOut"
            }}
          >
            <Star className="w-3 h-3 text-gray-300" />
          </motion.div>
        ))}
      </div>

      {/* Main Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-full min-h-[700px]">
            
            {/* Left Content - Premium Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="text-left space-y-8 max-w-xl"
              >
                {/* Luxury Brand Tagline */}
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.2 }}
                >
                  <p className="text-xs font-light text-gray-500 tracking-[0.3em] uppercase">
                    SINCE 1985 • MUMBAI
                  </p>
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-px bg-gradient-to-r from-gray-300 to-transparent"></div>
                    <p className="text-sm font-medium text-gray-600 tracking-[0.2em] uppercase">
                      {currentSlideData.tagline}
                    </p>
                  </div>
                </motion.div>

                {/* Brand Name - Ultra Premium */}
                <motion.div
                  className="space-y-2"
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1.2, delay: 0.4 }}
                >
                  <h1 className="text-6xl lg:text-7xl font-thin text-gray-900 tracking-wider font-serif">
                    {currentSlideData.subtitle}
                  </h1>
                  <div className="w-24 h-px bg-gradient-to-r from-gray-800 to-gray-400"></div>
                </motion.div>

                {/* Main Title - Elegant */}
                <motion.h2
                  className="text-3xl lg:text-4xl font-light text-gray-800 leading-relaxed font-serif italic"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.6 }}
                >
                  {currentSlideData.title}
                </motion.h2>

                {/* Collection Info - Sophisticated */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.8 }}
                >
                  <div className="flex items-center space-x-4">
                    <Sparkles className="w-5 h-5 text-gray-400" />
                    <div className="space-y-1">
                      <div className="text-xl font-medium text-gray-700 tracking-wide">
                        {currentSlideData.collection}
                      </div>
                      <div className="text-sm text-gray-500 font-light tracking-wider uppercase">
                        {currentSlideData.description}
                      </div>
                    </div>
                  </div>
                  
                  <div className="inline-block">
                    <div className="bg-gray-900 text-white px-4 py-1 text-xs font-medium tracking-wider uppercase">
                      {currentSlideData.exclusiveOffer}
                    </div>
                  </div>
                </motion.div>

                {/* Premium Offers */}
                <motion.div
                  className="space-y-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <div className="flex items-center space-x-6">
                    <div className="border border-gray-300 px-6 py-3 bg-white/80 backdrop-blur-sm">
                      <div className="text-lg font-medium text-gray-800">
                        {currentSlideData.discount}
                      </div>
                      <div className="text-xs text-gray-500 tracking-wider uppercase">
                        SAVINGS
                      </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 text-white px-6 py-3">
                      <div className="text-lg font-bold">
                        {currentSlideData.additionalOffer}% OFF
                      </div>
                      <div className="text-xs opacity-90 tracking-wider uppercase">
                        ADDITIONAL
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Premium CTA */}
                <motion.div
                  className="pt-6"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.2 }}
                >
                  <Link href={currentSlideData.ctaLink}>
                    <Button
                      size="lg"
                      className="bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 text-sm font-medium tracking-[0.1em] uppercase transition-all duration-500 hover:scale-105 hover:shadow-2xl border-0 rounded-none relative overflow-hidden group"
                    >
                      <span className="relative z-10">{currentSlideData.ctaText}</span>
                      <div className="absolute inset-0 bg-gradient-to-r from-gray-700 to-gray-900 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                    </Button>
                  </Link>
                </motion.div>

                {/* Luxury Credentials */}
                <motion.div
                  className="pt-8 space-y-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1.4 }}
                >
                  <div className="flex items-center space-x-6 text-xs text-gray-400 tracking-wider uppercase">
                    <span>CERTIFIED DIAMONDS</span>
                    <span>•</span>
                    <span>LIFETIME WARRANTY</span>
                    <span>•</span>
                    <span>BESPOKE DESIGN</span>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>

            {/* Right Content - Premium Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 60, scale: 0.95 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 60, scale: 0.95 }}
                transition={{ duration: 1.4, ease: "easeOut" }}
                className="relative h-full flex items-center justify-center"
              >
                <div className="relative w-full max-w-2xl h-[500px] lg:h-[600px]">
                  {/* Main Image/Video with Luxury Frame */}
                  <div className="relative w-full h-full">
                    {currentSlideData.mainImage.match(/\.(mp4|webm|mov|avi)$/i) ? (
                      <video
                        src={currentSlideData.mainImage}
                        autoPlay
                        loop
                        muted
                        playsInline
                        preload="auto"
                        className="w-full h-full object-contain bg-black"
                      />
                    ) : (
                      <Image
                        src={currentSlideData.mainImage}
                        alt={currentSlideData.title}
                        fill
                        className="object-cover"
                        priority
                      />
                    )}
                    
                    {/* Luxury Frame Effect */}
                    <div className="absolute inset-0 border-4 border-white shadow-2xl"></div>
                    <div className="absolute -inset-2 border border-gray-200 shadow-xl"></div>
                    
                    {/* Premium Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Floating Premium Elements */}
                  <motion.div
                    className="absolute -top-6 -right-6 w-12 h-12 bg-gradient-to-br from-yellow-300 to-yellow-500 rounded-full shadow-xl flex items-center justify-center"
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, 180, 360],
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      duration: 6,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <Star className="w-6 h-6 text-white" />
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-8 -left-8 w-8 h-8 bg-gradient-to-br from-rose-300 to-rose-500 rounded-full shadow-lg"
                    animate={{ 
                      y: [0, 20, 0],
                      scale: [1, 0.9, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ 
                      duration: 5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 2
                    }}
                  />

                  {/* Premium Badge */}
                  <motion.div
                    className="absolute top-6 left-6 bg-white/95 backdrop-blur-sm px-4 py-2 shadow-lg"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 1.6 }}
                  >
                    <div className="text-xs font-medium text-gray-800 tracking-wider uppercase">
                      HANDCRAFTED
                    </div>
                    <div className="text-xs text-gray-500">
                      SINCE 1985
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Premium Navigation Controls */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center gap-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-8 transition-all duration-500 ${
                index === currentSlide
                  ? 'bg-gray-800'
                  : 'bg-gray-300 hover:bg-gray-500'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Elegant Side Navigation */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-white/90 hover:bg-white shadow-xl transition-all duration-500 hover:scale-110 border border-gray-200"
      >
        <ChevronLeft className="w-6 h-6 text-gray-800" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-20 p-4 bg-white/90 hover:bg-white shadow-xl transition-all duration-500 hover:scale-110 border border-gray-200"
      >
        <ChevronRight className="w-6 h-6 text-gray-800" />
      </button>

      {/* Luxury Brand Signature */}
      <motion.div
        className="absolute bottom-12 right-12 z-20 text-right"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2, delay: 2 }}
      >
        <div className="text-xs text-gray-400 font-light tracking-[0.2em] uppercase">
          CRAFTED WITH PASSION
        </div>
        <div className="text-xs text-gray-300 font-light mt-1">
          MUMBAI • INDIA
        </div>
      </motion.div>
    </section>
  )
}

export default HeroSection
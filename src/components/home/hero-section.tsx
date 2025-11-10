"use client"

import React, { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import Image from 'next/image'

const defaultHeroSlides: any[] = []

export function HeroSection() {
  const [heroSlides, setHeroSlides] = useState(defaultHeroSlides)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [mouseX, setMouseX] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Fetch uploaded images from database
  useEffect(() => {
    async function fetchHeroImages() {
      try {
        const response = await fetch('/api/site-images?section=hero')
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          // Find all slide-* uploads and sort numerically
          const slideImages = data.images
            .filter((img: any) => typeof img.imageKey === 'string' && img.imageKey.toLowerCase().startsWith('slide'))
            .map((img: any) => {
              const match = img.imageKey.match(/slide[-_]?\s*(\d+)/i)
              const index = match ? parseInt(match[1], 10) : NaN
              return { index, img }
            })
            .filter(({ index }: any) => Number.isFinite(index))
            .sort((a: any, b: any) => a.index - b.index)

          // Build slides directly from uploaded images with safe fallbacks
          const normalizedSlides = slideImages.map(({ index, img }: any) => ({
            id: index,
            title: img.title || '',
            subtitle: img.metadata?.subtitle || '',
            tagline: img.metadata?.tagline || '',
            collection: img.metadata?.collection || '',
            description: img.description || '',
            exclusiveOffer: img.metadata?.exclusiveOffer || '',
            discount: img.metadata?.discount || '',
            additionalOffer: img.metadata?.additionalOffer || '',
            ctaText: img.metadata?.ctaText || 'Shop Now',
            ctaLink: img.metadata?.ctaLink || '/collections',
            mainImage: img.url,
            backgroundGradient: img.metadata?.backgroundGradient || '',
            accentColor: img.metadata?.accentColor || '',
            theme: img.metadata?.theme || 'light',
          }))

          setHeroSlides(normalizedSlides)
        } else {
          setHeroSlides([])
        }
      } catch (error) {
        console.error('Failed to fetch hero images:', error)
        setHeroSlides([])
      }
    }

    fetchHeroImages()
  }, [])

  // Auto-scroll functionality
  useEffect(() => {
    if (isAutoPlaying && heroSlides.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
      }, 6000)
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isAutoPlaying, heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  if (heroSlides.length === 0) {
    return null
  }
  const currentSlideData = heroSlides[currentSlide]

  return (
    <section className="relative w-full h-[460px] md:h-[620px] overflow-hidden bg-white mt-20 md:mt-28">
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
          className={`absolute inset-0 bg-transparent`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
      </AnimatePresence>

      {/* Main Content Container (full-bleed) */}
      <div className="relative z-10 h-full flex items-center">
        <div className="w-full">
          <div className="grid grid-cols-1 items-center h-full">
            
            {/* Left Content - Premium Text */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: -60 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -60 }}
                transition={{ duration: 1.2, ease: "easeOut" }}
                className="hidden"
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

            {/* Center-focused translucent slider track */}
            <div
               className="relative w-full h-[460px] md:h-[620px]"
               onMouseEnter={() => setIsAutoPlaying(false)}
               onMouseLeave={() => setIsAutoPlaying(true)}
               onMouseMove={(e) => {
                 const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
                 const x = (e.clientX - rect.left) / rect.width // 0..1
                 setMouseX((x - 0.5) * 2) // -1..1
               }}
             >
               {/* Subtle radial glow behind center slide */}
               <div className="absolute inset-0 pointer-events-none">
                 <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(212,175,55,0.20)_0%,_rgba(212,175,55,0.06)_45%,_transparent_70%)] blur-xl"></div>
               </div>
              {heroSlides.map((slide, index) => {
                const len = heroSlides.length
                const rel = (index - currentSlide + len) % len
                const isCenter = rel === 0
                const isRight = rel === 1
                const isLeft = rel === len - 1

                const baseX = isCenter ? 0 : isLeft ? -240 : isRight ? 240 : 0
                 const parallaxX = isCenter ? mouseX * 18 : 0
                 const x = baseX + parallaxX
                 const scale = isCenter ? 1.02 : 0.9
                 const z = isCenter ? 30 : (isLeft || isRight ? 20 : 0)
                 const opacity = isCenter ? 1 : (isLeft || isRight ? 0.4 : 0)
 
                 return (
                   <motion.div
                     key={index}
                     initial={{ opacity: 0 }}
                     animate={{ opacity, x, scale, zIndex: z }}
                     transition={{ duration: 0.8, ease: 'easeOut' }}
                    className={`absolute inset-0 flex items-center justify-center ${
                      isCenter ? '' : 'pointer-events-auto'
                    }`}
                    onClick={() => {
                      if (isLeft) prevSlide()
                      else if (isRight) nextSlide()
                    }}
                    aria-hidden={!isCenter}
                  >
                    <div className="relative w-full h-full">
                      {String(slide.mainImage).match(/\.(mp4|webm|mov|avi)$/i) ? (
                        <video
                          src={slide.mainImage}
                          autoPlay
                          loop
                          muted
                          playsInline
                          preload="auto"
                          className={`w-full h-full object-contain ${isCenter ? '' : 'brightness-75'}`}
                        />
                      ) : (
                        <Image
                          src={slide.mainImage}
                          alt={slide.title || `Slide ${index + 1}`}
                          fill
                          className={`object-contain ${isCenter ? '' : 'opacity-80'} `}
                          priority={isCenter}
                          sizes="100vw"
                          style={{ objectPosition: 'center center' }}
                        />
                      )}

                      {/* subtle translucent overlay for side slides */}
                      {!isCenter && (
                        <div className="absolute inset-0 bg-white/30"></div>
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute inset-y-0 left-0 right-0 z-40 flex items-center justify-between px-4 md:px-6">
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="group rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md border border-[#D4AF37]/40 shadow-lg p-2 md:p-3 hover:scale-105 transition-all"
        >
          <ChevronLeft className="h-5 w-5 md:h-6 md:w-6 text-[#6B5A2E] group-hover:text-[#3D3118]" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="group rounded-full bg-gradient-to-br from-white/90 to-white/70 backdrop-blur-md border border-[#D4AF37]/40 shadow-lg p-2 md:p-3 hover:scale-105 transition-all"
        >
          <ChevronRight className="h-5 w-5 md:h-6 md:w-6 text-[#6B5A2E] group-hover:text-[#3D3118]" />
        </button>
      </div>

      {/* Navigation Dots */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-40 pointer-events-auto">
        <div className="flex items-center gap-2.5 px-5 py-2 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-[#D4AF37]/30">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === currentSlide}
              className={`w-2.5 h-2.5 rotate-45 transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-[#D4AF37]/60 ${
                index === currentSlide
                  ? 'bg-[#D4AF37] ring-1 ring-[#D4AF37]/70 scale-110 shadow-sm'
                  : 'bg-gray-400/70 hover:bg-gray-600'
              }`}
              style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}
            />
          ))}
        </div>
      </div>

      {/* Luxury Brand Signature */}
      <motion.div
        className="absolute bottom-12 right-12 z-20 text-right hidden"
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
"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Star, Award, Sparkles, Crown, Diamond, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'

const defaultImage = "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=600&fit=crop&crop=center"

export function BrandStory() {
  const [brandImage, setBrandImage] = useState(defaultImage)

  useEffect(() => {
    async function fetchBrandImage() {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/site-images?section=brand-story&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          const mainImage = data.images.find((img: any) => img.imageKey === 'main-image')
          if (mainImage) {
            setBrandImage(mainImage.url)
            console.log('Loaded brand story image:', mainImage.url)
          }
        }
      } catch (error) {
        console.error('Failed to fetch brand story image', error)
      }
    }

    fetchBrandImage()
  }, [])

  return (
    <section id="brand-story" className="pt-28 pb-44 bg-neutral-50 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Gems */}
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 9) % 100}%`,
              top: `${(i * 11) % 100}%`,
            }}
            animate={{
              y: [0, -10, 0],
              x: [0, 6, 0],
              rotate: [0, 120, 240],
              scale: [0.95, 1.05, 0.95],
              opacity: [0.08, 0.15, 0.08]
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut"
            }}
          >
            <Gem className="w-3 h-3 text-[#bfa06a]/40" />
          </motion.div>
        ))}

        {/* Floating Stars */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${(i * 13) % 100}%`,
              top: `${(i * 17) % 100}%`,
            }}
            animate={{
              rotate: [0, 180, 360],
              scale: [0.9, 1.05, 0.9],
              opacity: [0.05, 0.12, 0.05]
            }}
            transition={{
              duration: 9,
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut"
            }}
          >
            <Star className="w-3 h-3 text-[#bfa06a]/40" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-3 px-6 py-3 bg-white rounded-full border border-neutral-200/60"
            >
              <Heart className="w-5 h-5 text-[#bfa06a]" />
              <span className="text-sm font-semibold text-neutral-700 tracking-wider uppercase">
                Our Heritage
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
              className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-neutral-900 tracking-tight"
            >
              Crafting Dreams Into Reality
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <p className="text-lg text-slate-600 leading-relaxed">
                For over three decades, AASHNI has been synonymous with exceptional craftsmanship and timeless elegance. 
                Each piece in our collection tells a story of passion, precision, and the pursuit of perfection.
              </p>
              
              <p className="text-lg text-slate-600 leading-relaxed">
                From our humble beginnings as a family workshop to becoming a celebrated name in luxury jewelry, 
                we've remained committed to creating pieces that celebrate life's most precious moments.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="grid grid-cols-3 gap-8 py-8"
            >
              <div className="text-center">
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-[#bfa06a] mb-2"
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  30+
                </motion.div>
                <div className="text-sm text-slate-600 font-medium">Years of Excellence</div>
              </div>
              
              <div className="text-center">
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-[#bfa06a] mb-2"
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  50K+
                </motion.div>
                <div className="text-sm text-slate-600 font-medium">Happy Customers</div>
              </div>
              
              <div className="text-center">
                <motion.div
                  className="text-3xl lg:text-4xl font-bold text-[#bfa06a] mb-2"
                  whileHover={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  100+
                </motion.div>
                <div className="text-sm text-slate-600 font-medium">Master Artisans</div>
              </div>
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200/60 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
                  <Award className="w-6 h-6 text-[#bfa06a]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Premium Quality</h4>
                  <p className="text-sm text-slate-600">Only the finest materials and gemstones</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200/60 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
                  <Crown className="w-6 h-6 text-[#bfa06a]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Master Craftsmanship</h4>
                  <p className="text-sm text-slate-600">Handcrafted by skilled artisans</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-neutral-200/60 shadow-sm">
                <div className="flex-shrink-0 w-12 h-12 bg-white border border-neutral-200 rounded-full flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-[#bfa06a]" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 mb-1">Timeless Design</h4>
                  <p className="text-sm text-slate-600">Classic elegance meets modern style</p>
                </div>
              </div>
            </motion.div>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              viewport={{ once: true }}
              className="mt-10 md:mt-12">
              <motion.div
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.96 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Link 
                  href="/about"
                  className="inline-flex items-center px-8 py-4 rounded-full bg-white text-neutral-900 font-medium border border-neutral-300 tracking-wide group shadow-sm hover:shadow-md focus:outline-none focus:ring-2 focus:ring-[#bfa06a]/40 transition-all duration-300"
                >
                  <span>Discover Our Story</span>
                  <ArrowRight className="ml-2 h-5 w-5 text-[#bfa06a] transition-transform group-hover:translate-x-1" />
                </Link>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative">
              {/* Main Image Container */}
              <motion.div
                className="relative h-[600px] lg:h-[700px] rounded-3xl overflow-hidden shadow-xl bg-neutral-100"
                whileHover={{ scale: 1.02, rotate: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Image
                  src={brandImage}
                  alt="Crafting Dreams Into Reality - AASHNI Brand Story"
                  fill
                  unoptimized={brandImage.startsWith('/uploads')}
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                
                {/* Floating Elements */}
                <div className="absolute inset-0 pointer-events-none">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute"
                      style={{
                        left: `${20 + i * 15}%`,
                        top: `${15 + i * 12}%`,
                      }}
                      animate={{
                        y: [0, -15, 0],
                        opacity: [0.3, 0.8, 0.3],
                        scale: [0.8, 1.2, 0.8]
                      }}
                      transition={{
                        duration: 4 + i * 0.5,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut"
                      }}
                    >
                      <div className="w-3 h-3 bg-white/50 rounded-full blur-sm" />
                    </motion.div>
                  ))}
                </div>

                {/* Shimmer Effect */}
                <motion.div className="hidden" />
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                className="hidden"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.2, 0.4, 0.2]
                }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              
              <motion.div
                className="hidden"
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.3, 0.2]
                }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
                className="hidden"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#bfa06a] rounded-full flex items-center justify-center">
  <Diamond className="w-6 h-6 text-white" />
</div>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">Premium</div>
                    <div className="text-sm text-slate-600">Handcrafted</div>
                  </div>
                </div>
              </motion.div>

              {/* Quality Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1 }}
                viewport={{ once: true }}
                className="hidden"
              >
                <div className="text-center">
                  <div className="flex justify-center mb-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.3, delay: 1.2 + i * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <Star className="w-4 h-4 text-[#bfa06a] fill-current" />
                      </motion.div>
                    ))}
                  </div>
                  <div className="font-bold text-slate-900 text-sm">5-Star Quality</div>
                  <div className="text-xs text-slate-600">Certified Excellence</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

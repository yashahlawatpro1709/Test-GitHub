"use client"

import React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Crown, Diamond } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { collections as dataCollections } from '@/data/dummy'

export function FeaturedCollections() {
  return (
    <section id="featured-collections" className="py-24 bg-gradient-to-br from-slate-50 via-white to-rose-50/30 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Floating Sparkles */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0, 0.6, 0],
              scale: [0, 1, 0],
              rotate: [0, 360]
            }}
            transition={{
              duration: 6 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 4,
              ease: "easeInOut"
            }}
          >
            <Sparkles className="w-3 h-3 text-rose-300/40" />
          </motion.div>
        ))}

        {/* Floating Diamonds */}
        {Array.from({ length: 8 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              scale: [0.8, 1.1, 0.8]
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 6,
              ease: "easeInOut"
            }}
          >
            <Diamond className="w-4 h-4 text-rose-200/30" />
          </motion.div>
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-rose-100 to-pink-100 rounded-full border border-rose-200/50"
          >
            <Crown className="w-5 h-5 text-rose-600" />
            <span className="text-sm font-semibold text-rose-700 tracking-wider uppercase">
              Curated Collections
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-bold text-slate-900 mb-6 leading-tight"
          >
            Featured <span className="bg-gradient-to-r from-rose-600 via-pink-600 to-purple-600 bg-clip-text text-transparent">Collections</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed"
          >
            Discover our meticulously curated collections, where each piece embodies the perfect harmony of 
            traditional craftsmanship and contemporary elegance, designed to celebrate life's most treasured moments.
          </motion.p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {dataCollections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <Link href={`/collections/${collection.slug}`}>
                <div className="relative h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:shadow-3xl transition-all duration-700 group-hover:scale-[1.02]">
                  {/* Main Image */}
                  <div className="relative h-full overflow-hidden">
                    <Image
                      src={collection.banner}
                      alt={collection.title}
                      fill
                      className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    
                    {/* Gradient Overlays */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/20 via-transparent to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Shimmer Effect */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100"
                      animate={{ x: ["-100%", "100%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 3 }}
                    />
                  </div>

                  {/* Featured Badge */}
                  {index < 2 && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute top-6 right-6 z-10"
                    >
                      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-lg flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        Featured
                      </div>
                    </motion.div>
                  )}

                  {/* Floating Elements */}
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute"
                        style={{
                          left: `${20 + i * 30}%`,
                          top: `${20 + i * 20}%`,
                        }}
                        animate={{
                          y: [0, -10, 0],
                          opacity: [0, 0.6, 0],
                          scale: [0.8, 1.2, 0.8]
                        }}
                        transition={{
                          duration: 4 + i,
                          repeat: Infinity,
                          delay: i * 0.5,
                          ease: "easeInOut"
                        }}
                      >
                        <div className="w-2 h-2 bg-white/40 rounded-full blur-sm" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-8 text-white z-10">
                    <motion.h3
                      className="text-2xl lg:text-3xl font-playfair font-bold mb-3 group-hover:text-yellow-300 transition-colors duration-300"
                      whileHover={{ scale: 1.05 }}
                    >
                      {collection.title}
                    </motion.h3>
                    
                    <motion.p
                      className="text-white/90 mb-6 text-sm lg:text-base leading-relaxed"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 1 }}
                    >
                      {collection.description}
                    </motion.p>
                    
                    <motion.div
                      whileHover={{ scale: 1.05, x: 5 }}
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    >
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="group/btn bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 rounded-full px-6 py-2"
                      >
                        <span className="font-semibold">Explore Collection</span>
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </motion.div>
                  </div>

                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-rose-400/10 group-hover:via-pink-400/10 group-hover:to-purple-400/10 transition-all duration-500 pointer-events-none" />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Premium CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-24"
        >
          <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-black rounded-none p-16 lg:p-20 border-t border-b border-slate-700/30 shadow-2xl overflow-hidden">
            {/* Luxury Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]" />
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_49%,rgba(255,255,255,0.03)_50%,transparent_51%)] bg-[length:20px_20px]" />
            </div>

            {/* Floating Luxury Elements */}
            <div className="absolute inset-0 pointer-events-none">
              {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute"
                  style={{
                    left: `${15 + i * 15}%`,
                    top: `${20 + (i % 2) * 60}%`,
                  }}
                  animate={{
                    y: [0, -15, 0],
                    opacity: [0.1, 0.3, 0.1],
                    scale: [0.8, 1.1, 0.8]
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    delay: i * 1.5,
                    ease: "easeInOut"
                  }}
                >
                  <Diamond className="w-3 h-3 text-white/20" />
                </motion.div>
              ))}
            </div>

            {/* Content */}
            <div className="relative z-10">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="inline-flex items-center gap-3 mb-8 px-6 py-2 bg-gradient-to-r from-white/10 to-white/5 rounded-full border border-white/20 backdrop-blur-sm"
              >
                <Crown className="w-4 h-4 text-yellow-400" />
                <span className="text-xs font-medium text-white/90 tracking-[0.2em] uppercase">
                  Maison Aashni
                </span>
              </motion.div>

              <motion.h3
                className="text-3xl lg:text-4xl xl:text-5xl font-playfair font-light text-white mb-6 leading-tight tracking-wide"
                whileHover={{ scale: 1.01 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
              >
                Can't find what you're looking for?
              </motion.h3>
              
              <motion.p
                className="text-white/80 mb-12 max-w-3xl mx-auto text-lg lg:text-xl leading-relaxed font-light tracking-wide"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                viewport={{ once: true }}
              >
                Explore our complete collection of handcrafted jewelry, or let our experts help you create something truly unique.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="flex justify-center"
              >
                <Link href="/collections">
                  <motion.div
                    whileHover={{ scale: 1.02, y: -3 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="group"
                  >
                    <Button 
                      size="lg" 
                      className="bg-white text-slate-900 hover:bg-white/95 font-medium px-12 py-6 text-lg tracking-wide border-0 shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:shadow-white/20"
                      style={{ borderRadius: '0px' }}
                    >
                      <span className="relative">
                        View All Collections
                        <motion.div
                          className="absolute bottom-0 left-0 h-[1px] bg-slate-900 origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.3 }}
                        />
                      </span>
                      <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Luxury Accent Line */}
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8 }}
                viewport={{ once: true }}
                className="mt-12 mx-auto w-24 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

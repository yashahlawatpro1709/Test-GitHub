'use client'

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Crown, Star, Heart, Sparkles, ArrowRight, Filter, Grid, List, ChevronDown, Award, Gem, Circle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LuxuryJewelry } from '@/components/home/luxury-jewelry'

// Gold-specific categories
const GOLD_CATEGORIES = [
  { id: 'all', name: 'All Gold', icon: Gem },
  { id: 'necklaces', name: 'Necklaces', icon: Circle },
  { id: 'earrings', name: 'Earrings', icon: Circle },
  { id: 'rings', name: 'Rings', icon: Circle },
  { id: 'bangles', name: 'Bangles', icon: Circle },
  { id: 'bracelets', name: 'Bracelets', icon: Circle },
  { id: 'chains', name: 'Chains', icon: Circle },
  { id: 'pendants', name: 'Pendants', icon: Circle },
]

export default function GoldPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-amber-50/20 to-white">
      {/* Premium Gold Hero Section */}
      <section className="relative py-24 overflow-hidden">
        {/* Elegant Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-b from-amber-50/30 via-white to-transparent"></div>
          <div className="absolute inset-0 opacity-[0.02]" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, rgba(217, 119, 6, 0.15) 1px, transparent 0)`,
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-champagne-gold/10 via-yellow-400/5 to-champagne-gold/10 px-8 py-3 rounded-full mb-8 border border-champagne-gold/30 backdrop-blur-sm shadow-lg"
            >
              <Crown className="w-5 h-5 text-champagne-gold" />
              <span className="text-champagne-gold font-semibold text-sm tracking-wider uppercase">
                Pure Gold Collection
              </span>
              <Crown className="w-5 h-5 text-champagne-gold" />
            </motion.div>

            {/* Elegant Title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-7xl font-playfair font-bold mb-6 leading-tight"
            >
              <span className="text-transparent bg-gradient-to-r from-champagne-gold via-yellow-500 to-champagne-gold bg-clip-text">
                Golden
              </span>
              <br />
              <span className="text-deep-black">Elegance</span>
            </motion.h1>

            {/* Refined Divider */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.4 }}
              className="flex items-center justify-center mb-8"
            >
              <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent w-32"></div>
              <div className="mx-4 w-3 h-3 bg-champagne-gold rounded-full"></div>
              <div className="h-px bg-gradient-to-r from-transparent via-champagne-gold to-transparent w-32"></div>
            </motion.div>

            {/* Sophisticated Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-xl text-warm-gray max-w-2xl mx-auto leading-relaxed font-light mb-12"
            >
              Discover our exquisite collection of handcrafted gold jewelry, where timeless tradition meets contemporary elegance. Each piece is a testament to exceptional artistry.
            </motion.p>

            {/* Premium Features */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-8 text-sm"
            >
              <div className="flex items-center gap-2 text-gray-600">
                <Sparkles className="w-5 h-5 text-champagne-gold" />
                <span className="tracking-wide">Certified Purity</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Award className="w-5 h-5 text-champagne-gold" />
                <span className="tracking-wide">Handcrafted Excellence</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Crown className="w-5 h-5 text-champagne-gold" />
                <span className="tracking-wide">Timeless Design</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dynamic Jewelry Collection - Hide the title since we have our own hero */}
      <div className="pb-24">
        <LuxuryJewelry 
          section="gold-jewelry" 
          pageTitle="" 
          customCategories={GOLD_CATEGORIES}
        />
      </div>
    </div>
  )
}

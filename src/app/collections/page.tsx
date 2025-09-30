"use client"

import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { collections } from '@/data/dummy'
import { Button } from '@/components/ui/button'
import { Diamond, Sparkles, Crown, Star, Heart, Gem } from 'lucide-react'

const collectionIcons = [Diamond, Crown, Sparkles, Star, Heart, Gem]

export default function CollectionsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/30 via-white to-pink-50/20">
      {/* Premium Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              initial={{ 
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: 0.1,
                scale: 0.5
              }}
              animate={{
                x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
                y: Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 800),
                opacity: [0.1, 0.3, 0.1],
                scale: [0.5, 1, 0.5],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <div className="w-8 h-8 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-full flex items-center justify-center">
                <Diamond className="w-4 h-4 text-rose-400/40" />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-4xl mx-auto"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-rose-100 to-pink-100 px-6 py-3 rounded-full mb-8 border border-rose-200/50"
            >
              <Crown className="w-5 h-5 text-rose-600" />
              <span className="text-rose-700 font-medium text-sm tracking-wide">PREMIUM COLLECTIONS</span>
              <Sparkles className="w-5 h-5 text-rose-600" />
            </motion.div>

            {/* Main Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-5xl lg:text-7xl font-bold bg-gradient-to-r from-gray-900 via-rose-800 to-gray-900 bg-clip-text text-transparent mb-6 leading-tight"
            >
              Exquisite
              <br />
              <span className="text-6xl lg:text-8xl bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-transparent">
                Collections
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8 }}
              className="text-xl lg:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8"
            >
              Discover our meticulously curated collections, where each piece tells a story of 
              <span className="text-rose-600 font-semibold"> timeless elegance</span> and 
              <span className="text-pink-600 font-semibold"> exceptional craftsmanship</span>
            </motion.p>

            {/* Decorative Line */}
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ delay: 0.8, duration: 1 }}
              className="h-px bg-gradient-to-r from-transparent via-rose-300 to-transparent max-w-md mx-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Premium Collections Grid */}
      <section className="pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3"
          >
            {collections.map((collection, index) => {
              const IconComponent = collectionIcons[index % collectionIcons.length]
              return (
                <motion.div
                  key={collection.slug}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2 + index * 0.1, duration: 0.6 }}
                  whileHover={{ y: -8 }}
                  className="group"
                >
                  <Link href={`/collections/${collection.slug}`}>
                    <div className="relative overflow-hidden rounded-2xl bg-white shadow-2xl border border-gray-100 transition-all duration-500 group-hover:shadow-3xl group-hover:border-rose-200/50">
                      {/* Premium Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
                      
                      {/* Image Container */}
                      <div className="relative h-72 overflow-hidden">
                        <Image 
                          src={collection.banner} 
                          alt={collection.title} 
                          fill 
                          className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1" 
                        />
                        
                        {/* Premium Badge */}
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          whileHover={{ opacity: 1, scale: 1 }}
                          className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <IconComponent className="w-5 h-5 text-rose-600" />
                        </motion.div>

                        {/* Floating Elements */}
                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          {[...Array(3)].map((_, i) => (
                            <motion.div
                              key={i}
                              className="absolute"
                              style={{
                                left: `${20 + i * 30}%`,
                                top: `${20 + i * 20}%`
                              }}
                              animate={{
                                y: [0, -10, 0],
                                opacity: [0.3, 0.7, 0.3],
                                scale: [0.8, 1.2, 0.8]
                              }}
                              transition={{
                                duration: 2 + i * 0.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                              }}
                            >
                              <div className="w-3 h-3 bg-white/60 rounded-full" />
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="p-8 relative z-20">
                        <motion.h3
                          className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-rose-700 transition-colors duration-300"
                          whileHover={{ x: 4 }}
                        >
                          {collection.title}
                        </motion.h3>
                        
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          {collection.description}
                        </p>

                        {/* Premium Button */}
                        <motion.div
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <Button 
                            className="w-full bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 text-white font-semibold py-4 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group-hover:shadow-rose-200/50"
                          >
                            <span className="flex items-center justify-center space-x-2">
                              <span>Explore Collection</span>
                              <motion.div
                                animate={{ x: [0, 4, 0] }}
                                transition={{ duration: 1.5, repeat: Infinity }}
                              >
                                <Sparkles className="w-4 h-4" />
                              </motion.div>
                            </span>
                          </Button>
                        </motion.div>

                        {/* Premium Accent Line */}
                        <motion.div
                          className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-rose-500 to-pink-500 transition-all duration-500"
                          initial={{ width: 0 }}
                          whileHover={{ width: "100%" }}
                        />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </motion.div>
        </div>
      </section>

      {/* Premium Footer Section */}
      <section className="py-20 bg-gradient-to-r from-rose-50 to-pink-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Can't Find What You're Looking For?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Our jewelry experts are here to help you find the perfect piece for any occasion
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button className="bg-gradient-to-r from-gray-900 to-gray-800 hover:from-gray-800 hover:to-gray-700 text-white px-8 py-4 rounded-xl text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300">
                Contact Our Experts
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


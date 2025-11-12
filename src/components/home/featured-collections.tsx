"use client"

import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles, Crown, Diamond, X, Shield, BadgeCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { collections as dataCollections } from '@/data/dummy'

interface CollectionImage {
  id: string
  url: string
  title?: string
  description?: string
  imageKey: string
  metadata?: { fullDescription?: string }
}

export function FeaturedCollections() {
  const [collections, setCollections] = useState(dataCollections)
  const [loading, setLoading] = useState(true)
  const [showDetails, setShowDetails] = useState(false)
  const [activeCollection, setActiveCollection] = useState(null as any | null)
  const [introText, setIntroText] = useState(
    "Discover our meticulously curated collections, where each piece embodies the perfect harmony of traditional craftsmanship and contemporary elegance, designed to celebrate life's most treasured moments."
  )
  const [sectionTitle, setSectionTitle] = useState('Featured Collections')

  useEffect(() => {
    async function fetchCollectionImages() {
      try {
        const timestamp = new Date().getTime()
        const response = await fetch(`/api/site-images?section=featured-collections&t=${timestamp}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache'
          }
        })
        const data = await response.json()
        
        if (data.images && data.images.length > 0) {
          const uploadedCollections = data.images.map((img: CollectionImage, index: number) => {
            const defaultCollection = dataCollections[index % dataCollections.length]
            return {
              slug: img.imageKey || `collection-${index + 1}`,
              title: img.title || defaultCollection.title,
              description: img.description || defaultCollection.description,
              fullDescription: img.metadata?.fullDescription || img.description || defaultCollection.description,
              banner: img.url,
              categories: defaultCollection.categories
            }
          })
          const sectionTitleFromDb = data.images.find((img: any) => img.metadata?.sectionTitle)?.metadata?.sectionTitle
          const sectionIntroFromDb = data.images.find((img: any) => img.metadata?.sectionIntro)?.metadata?.sectionIntro
          if (sectionTitleFromDb) setSectionTitle(sectionTitleFromDb)
          if (sectionIntroFromDb) setIntroText(sectionIntroFromDb)
          setCollections(uploadedCollections)
        } else {
          // No uploaded collections, keep defaults
        }
      } catch (error) {
        console.error('Failed to fetch collection images:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchCollectionImages()
  }, [])

  const openDetails = (collection: any) => {
    setActiveCollection(collection)
    setShowDetails(true)
  }

  const closeDetails = () => {
    setShowDetails(false)
    setActiveCollection(null)
  };

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
              left: `${(i * 7 + 13) % 100}%`,
              top: `${(i * 11 + 17) % 100}%`,
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
              left: `${(i * 9 + 23) % 100}%`,
              top: `${(i * 13 + 31) % 100}%`,
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
            className="inline-flex items-center gap-3 mb-6 px-6 py-3 bg-gradient-to-r from-amber-100 to-rose-100 rounded-full border border-amber-200/60"
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
            className="text-4xl sm:text-5xl lg:text-6xl font-playfair font-extrabold text-slate-900 mb-4 leading-tight tracking-tight"
          >
            {sectionTitle}
          </motion.h2>
          <div className="mx-auto w-24 h-[2px] bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 rounded-full mb-6"></div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-slate-700 max-w-3xl mx-auto leading-relaxed"
          >
            {introText}
          </motion.p>
        </motion.div>

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.slug}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.15 }}
              viewport={{ once: true }}
              className="group relative"
            >
              <div className="relative h-96 lg:h-[450px] rounded-3xl overflow-hidden shadow-2xl bg-gradient-to-br from-slate-100 to-slate-200 group-hover:shadow-3xl transition-all duration-700 group-hover:scale-[1.02]">
                {/* Main Image */}
                <div className="relative h-full overflow-hidden">
                  <Image
                    src={collection.banner}
                    alt={collection.title}
                    fill
                    className="object-cover transition-all duration-1000 group-hover:scale-110 group-hover:rotate-1"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    unoptimized={collection.banner.startsWith('/uploads') || collection.banner.endsWith('.svg')}
                    onError={(e) => {
                      const target = e.target as HTMLImageElement
                      console.error('Image failed to load:', collection.banner)
                      target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center'
                    }}
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
                    className="text-2xl lg:text-3xl font-playfair font-bold mb-3 group-hover:text-amber-300 transition-colors duration-300"
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
                      onClick={() => openDetails(collection)}
                      className="group/btn bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-slate-900 transition-all duration-300 rounded-full px-6 py-2"
                    >
                      <span className="font-semibold">Full Details</span>
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </motion.div>
                </div>

                {/* Hover Glow Effect */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-rose-400/0 via-pink-400/0 to-purple-400/0 group-hover:from-rose-400/10 group-hover:via-pink-400/10 group-hover:to-purple-400/10 transition-all duration-500 pointer-events-none" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="rounded-3xl p-12 md:p-14 bg-gradient-to-br from-[#FFFFFB] via-white to-[#FFF4E8] backdrop-blur-md ring-1 ring-amber-200/40 shadow-2xl">
            <motion.h3
              className="text-3xl md:text-4xl font-playfair font-bold text-slate-900 mb-3 tracking-tight"
              whileHover={{ scale: 1.02 }}
            >
              Can't find what you're looking for?
            </motion.h3>
            <div className="mx-auto w-20 h-[2px] bg-gradient-to-r from-[#D4AF37] via-[#F7D794] to-[#D4AF37] rounded-full mb-4" />

            <motion.p
              className="text-slate-700 mb-10 max-w-3xl mx-auto"
              initial={{ opacity: 0.8 }}
              whileHover={{ opacity: 1 }}
            >
              Explore our complete collection of handcrafted jewelry, or let our experts help you create something truly unique.
            </motion.p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/collections">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button 
                    size="lg"
                    className="bg-black text-[#D4AF37] hover:bg-black/90 font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 ring-1 ring-amber-200/40"
                  >
                    View All Collections
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>

              <Link href="/custom">
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-[#D4AF37]/50 text-slate-900 hover:bg-black hover:text-[#D4AF37] font-semibold px-8 py-4 rounded-full transition-all duration-300"
                  >
                    Custom Design
                    <Crown className="ml-2 h-5 w-5" />
                  </Button>
                </motion.div>
              </Link>
            </div>

            {/* Luxury Platform Features */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-slate-900">
              <div className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/80 ring-1 ring-amber-200/40 shadow-sm">
                <Shield className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-sm font-medium tracking-wide">Insured Shipping</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/80 ring-1 ring-amber-200/40 shadow-sm">
                <BadgeCheck className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-sm font-medium tracking-wide">Certified Diamonds</span>
              </div>
              <div className="flex items-center justify-center space-x-2 p-4 rounded-2xl bg-white/80 ring-1 ring-amber-200/40 shadow-sm">
                <Crown className="h-5 w-5 text-[#D4AF37]" />
                <span className="text-sm font-medium tracking-wide">Lifetime Warranty</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Full Details Modal */}
        <AnimatePresence>
          {showDetails && activeCollection && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.95, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.95, y: 20 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                className="relative bg-white rounded-3xl shadow-2xl max-w-5xl w-full overflow-hidden"
              >
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b">
                  <h3 className="text-xl font-playfair font-bold text-slate-900">{activeCollection.title}</h3>
                  <button onClick={closeDetails} className="text-slate-700 hover:text-slate-900">
                    <X className="w-5 h-5" />
                  </button>
                </div>
                {/* Content */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left: Image */}
                    <div className="relative w-full h-64 md:h-[420px] rounded-2xl overflow-hidden bg-slate-50 border border-slate-200">
                      <Image
                        src={activeCollection.banner}
                        alt={activeCollection.title}
                        fill
                        className="object-cover md:object-contain"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
                        unoptimized={activeCollection.banner?.startsWith('/uploads') || activeCollection.banner?.endsWith('.svg')}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement
                          target.src = 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center'
                        }}
                      />
                    </div>
                    {/* Right: Title + Full Description */}
                    <div className="flex flex-col">
                      <h4 className="text-lg font-semibold text-slate-900 mb-3">{activeCollection.title}</h4>
                      <div className="text-slate-700 leading-relaxed whitespace-pre-line max-h-[420px] overflow-y-auto pr-2">
                        {activeCollection.fullDescription || activeCollection.description}
                      </div>
                    </div>
                  </div>
                </div>
                {/* Footer */}
                <div className="p-6 border-t flex justify-end">
                  <Button variant="outline" onClick={closeDetails} className="rounded-full">Close</Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}

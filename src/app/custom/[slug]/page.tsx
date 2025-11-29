"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Heart, ArrowRight, Sparkles } from 'lucide-react'
import { formatPriceNumber } from '@/lib/utils'

interface SiteImage {
  id: string
  section: string
  imageKey: string
  url: string
  alt?: string
  title?: string
  description?: string
  metadata?: Record<string, any>
}

function toTitleCase(slug: string) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())
}

export default function CustomSectionPage() {
  const params = useParams()
  const slug = String(params?.slug || '')
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadSection() {
      if (!slug) return
      try {
        const t = Date.now()
        const res = await fetch(`/api/site-images?section=${encodeURIComponent(slug)}&isActive=true&t=${t}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })
        const data = await res.json()
        setImages(Array.isArray(data.images) ? data.images : [])
      } catch (err) {
        console.error('Failed to load custom section images:', err)
      } finally {
        setLoading(false)
      }
    }
    loadSection()
  }, [slug])

  if (!slug) return null

  return (
    <div className="bg-gradient-to-b from-ivory to-white min-h-screen">
      {/* Section header */}
      <section className="relative pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">
            {toTitleCase(slug)}
          </h1>
          <p className="text-warm-gray max-w-2xl">
            Explore curated visuals and inspirations for {toTitleCase(slug)}.
          </p>
        </div>
      </section>

      {/* Grid styled like Diamond section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="text-center text-gray-600">Loading...</div>
          ) : images.length === 0 ? (
            <div className="text-center text-gray-600">No items yet for this section.</div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
              >
                {images.map((img, index) => {
                  const meta = img.metadata || {}
                  const priceVal = (meta.price ?? '').toString()
                  const priceNum = parseFloat(priceVal.replace(/[^0-9.]/g, ''))
                  const displayPrice = meta.price || (Number.isFinite(priceNum) ? `₹${formatPriceNumber(priceNum)}` : undefined)

                  return (
                    <motion.div
                      key={img.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.08 }}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden"
                    >
                      {/* Image */}
                      <div className="relative h-80 overflow-hidden">
                        <Image
                          src={img.url}
                          alt={img.alt || img.title || 'Collection image'}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                          unoptimized={img.url.startsWith('/uploads') || img.url.endsWith('.svg')}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      </div>

                      {/* Content */}
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <h3 className="font-playfair text-lg font-bold text-deep-black mb-1">
                              {meta.jewelryTitle || img.title || toTitleCase(img.imageKey)}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {meta.smallDescription || meta.largeDescription || img.description || ''}
                            </p>
                          </div>
                          {displayPrice && (
                            <span className="text-xl font-bold text-gray-800 ml-4 whitespace-nowrap">
                              {displayPrice}
                            </span>
                          )}
                        </div>

                        {/* Metadata chips: show a few key fields if present */}
                        {meta && (
                          <div className="flex flex-wrap gap-2 mb-4">
                            {meta.purity && (
                              <span className="text-xs bg-orange-50 text-orange-700 px-2 py-1 rounded">
                                {meta.purity}
                              </span>
                            )}
                            {meta.diamondCarat && (
                              <span className="text-xs bg-purple-50 text-purple-700 px-2 py-1 rounded">
                                {meta.diamondCarat}
                              </span>
                            )}
                            {meta.category && (
                              <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded">
                                {toTitleCase(String(meta.category))}
                              </span>
                            )}
                            {meta.typeCategory && (
                              <span className="text-xs bg-indigo-50 text-indigo-700 px-2 py-1 rounded">
                                {toTitleCase(String(meta.typeCategory))}
                              </span>
                            )}
                            {Array.isArray(meta.customFields) && meta.customFields.map((cf: any) => (
                              cf?.value ? (
                                <span key={cf.id || cf.label} className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                                  {cf.label}: {String(cf.value)}
                                </span>
                              ) : null
                            ))}
                          </div>
                        )}

                        {/* Actions styled similar to diamond cards */}
                        <div className="grid grid-cols-2 gap-3">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1 border-blue-200 text-blue-700 hover:bg-blue-50"
                          >
                            <Heart className="h-4 w-4 mr-2" />
                            Wishlist
                          </Button>
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                          >
                            View Details
                            <ArrowRight className="h-4 w-4 ml-2" />
                          </Button>
                        </div>
                      </div>

                      {/* Subtle sparkle accent */}
                      <motion.div
                        className="absolute inset-0 pointer-events-none"
                        initial={{ opacity: 0 }}
                        whileHover={{ opacity: 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {[...Array(4)].map((_, i) => (
                          <motion.div
                            key={i}
                            className="absolute w-1 h-1 bg-white rounded-full"
                            style={{ left: `${25 + i * 18}%`, top: `${35 + (i % 2) * 18}%` }}
                            animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.25 }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  )
                })}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </div>
  )
}
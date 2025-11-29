"use client"

import React, { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

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

// Known base sections we should not duplicate as "custom"
const BASE_SECTION_IDS = new Set([
  'hero',
  'featured-collections',
  'new-arrivals',
  'luxury-jewelry',
  'brand-story',
  'product-showcase',
  'gold-jewelry',
  'diamond-jewelry',
  'all-jewelry',
  'earrings',
  'rings',
  'bracelets',
  'bangles',
  'pendants',
  'daily-wear',
  'gifting',
  'wedding',
  'more-collections',
  'jewelry-data-distributor',
])

function toTitleCase(slug: string) {
  return slug
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

export function CustomCollections() {
  const [images, setImages] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function loadAllSections() {
      try {
        const t = Date.now()
        const res = await fetch(`/api/site-images?t=${t}`, {
          cache: 'no-store',
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Pragma': 'no-cache',
          },
        })
        const data = await res.json()
        setImages(Array.isArray(data.images) ? data.images : [])
      } catch (err) {
        console.error('Failed to load site images:', err)
      } finally {
        setLoading(false)
      }
    }
    loadAllSections()
  }, [])

  const groups = useMemo(() => {
    const bySection: Record<string, SiteImage[]> = {}
    for (const img of images) {
      if (!img?.section) continue
      if (BASE_SECTION_IDS.has(img.section)) continue // skip base sections
      if (!bySection[img.section]) bySection[img.section] = []
      bySection[img.section].push(img)
    }
    // Keep only sections that have at least one image
    return Object.entries(bySection)
      .map(([section, imgs]) => ({ section, images: imgs }))
      .sort((a, b) => a.section.localeCompare(b.section))
  }, [images])

  if (loading) return null
  if (groups.length === 0) return null

  return (
    <section className="py-20 bg-gradient-to-b from-white via-slate-50 to-rose-50/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {groups.map(({ section, images }) => (
          <div id={section} key={section} className="space-y-8">
            {/* Section header */}
            <div className="text-center">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl sm:text-4xl font-playfair font-bold text-slate-900"
              >
                {toTitleCase(section)}
              </motion.h2>
              <div className="mx-auto w-20 h-[2px] bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 rounded-full mt-4"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((img, i) => (
                <motion.div
                  key={img.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: i * 0.08 }}
                  viewport={{ once: true }}
                  className="group relative rounded-2xl overflow-hidden shadow-lg bg-slate-100/50"
                >
                  <div className="relative h-80">
                    <Image
                      src={img.url}
                      alt={img.alt || img.title || 'Collection image'}
                      fill
                      className="object-cover transition-all duration-700 group-hover:scale-105"
                      sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
                      unoptimized={img.url.startsWith('/uploads') || img.url.endsWith('.svg')}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <div className="text-sm/6 tracking-wide font-semibold">
                      {img.title || toTitleCase(img.imageKey)}
                    </div>
                    {img.description && (
                      <div className="text-xs/5 text-white/80 mt-1 line-clamp-2">
                        {img.description}
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { formatPriceNumber } from '@/lib/utils'

type SiteImage = {
  id: string
  title?: string | null
  description?: string | null
  url?: string | null
  imageKey?: string | null
  metadata?: Record<string, any> | null
}

const fetchBanglesProducts = async (): Promise<SiteImage[]> => {
  try {
    const timestamp = new Date().getTime()
    const res = await fetch(`/api/site-images?section=bangles&t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    const data = await res.json()
    return data.images || []
  } catch (err) {
    console.error('Failed to fetch bangles products:', err)
    return []
  }
}

export default function BanglesPage() {
  const [products, setProducts] = useState<SiteImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    fetchBanglesProducts().then((items) => {
      if (!mounted) return
      setProducts(items)
      setLoading(false)
    })
    return () => { mounted = false }
  }, [])

  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="relative pt-32 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-3">Bangles</h1>
          <p className="text-warm-gray">Traditional and modern bangles with exquisite craftsmanship.</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <p className="text-gray-500">Loading bangles…</p>
          ) : products.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 mb-4">No bangles uploaded yet.</p>
              <Link href="/admin/dashboard">
                <Button variant="elegant">Upload Bangles</Button>
              </Link>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {products.map((product) => (
                <div key={product.id} className="group rounded-xl bg-white border border-champagne-gold/20 shadow-elegant overflow-hidden">
                  <div className="relative aspect-square bg-ivory/60">
                    {product.url ? (
                      <Image
                        src={product.url}
                        alt={product.title || 'Bangle'}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover"
                        priority={false}
                      />
                    ) : (
                      <div className="flex items-center justify-center h-full text-gray-400">No image</div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="mb-2">
                      <h3 className="font-semibold text-lg text-gray-800">{product.title || 'Bangle'}</h3>
                      <p className="text-sm text-gray-500">
                        {product.description || product.metadata?.category || 'Bangles'}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-bold text-gray-800">
                        {product.metadata?.price || `₹${formatPriceNumber((product.metadata as any)?.priceNumber || 0)}`}
                      </span>
                      {product.metadata?.originalPrice && (
                        <span className="text-lg text-gray-400 line-through">{product.metadata.originalPrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
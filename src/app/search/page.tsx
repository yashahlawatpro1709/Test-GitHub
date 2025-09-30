"use client"
export const dynamic = 'force-dynamic'

import React, { Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { products } from '@/data/dummy'

function SearchInner() {
  const params = useSearchParams()
  const q = (params.get('q') || '').toLowerCase()
  const results = products.filter(p => p.name.toLowerCase().includes(q))

  return (
    <>
      <section className="pt-28 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl lg:text-4xl font-playfair font-bold text-deep-black">Search</h1>
          <p className="text-warm-gray mt-1">Results for: “{q}” ({results.length})</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {q ? (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {results.map((p) => (
                <div key={p.id} className="group overflow-hidden rounded-xl border border-champagne-gold/20 bg-white shadow-luxury">
                  <div className="relative h-64">
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-bold text-deep-black mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">₹ {p.price.toLocaleString('en-IN')}</p>
                    <Button variant="luxury" className="w-full">Add to Cart</Button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-gray-600">Enter a search query.</div>
          )}
        </div>
      </section>
    </>
  )
}

export default function SearchPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <Suspense fallback={<div className="pt-28 container mx-auto px-4 sm:px-6 lg:px-8 text-gray-600">Loading…</div>}>
        <SearchInner />
      </Suspense>
    </div>
  )
}

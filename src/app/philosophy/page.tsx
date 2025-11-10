"use client"

// import { useState } from 'react'

// Helper to proxy remote image URLs
function proxy(url: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

export default function ContentPhilosophyPage() {
  return (
    <div className="bg-white font-serif">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="mx-auto max-w-7xl px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600 tracking-wide">CONTACT US</div>
            <h1 className="text-2xl tracking-[0.3em] text-center flex-1 text-gray-700">KANTILAL CHHOTALAL</h1>
            <div className="hidden md:flex items-center gap-6 text-sm text-gray-600">
              <button className="hover:text-gray-900">SIGN IN</button>
              <button className="hover:text-gray-900">REGISTER</button>
              <button className="hover:text-gray-900" aria-label="Search">🔍</button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="border-t border-gray-200">
          <div className="mx-auto max-w-7xl px-6">
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 py-4">
              <button className="text-gray-700 hover:text-gray-900 text-sm tracking-wide">Bridal</button>
              <button className="text-gray-700 hover:text-gray-900 text-sm tracking-wide">Jewellery</button>
              <button className="text-gray-700 hover:text-gray-900 text-sm tracking-wide">Solitaire</button>
              {/* removed placeholder avatar */}
            </div>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative">
        <div className="relative h-[420px] md:h-[620px]">
          <img
            src={proxy("https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=2000&h=1300&fit=crop&crop=center")}
            alt="Editorial Hero"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/20" aria-hidden="true"></div>
        <div className="absolute bottom-12 left-0 right-0 text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-4 tracking-wide">Content Philosophy</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto px-6">
            Timeless, editorial, and sincere. We tell true stories of craft and material—never loud, always deliberate.
          </p>
        </div>
      </section>

      {/* Section 1: Editorial Honesty - Image Left, Text Right */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="bg-gray-100 aspect-[4/5] md:h-[600px]">
              <img
                src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=1066&fit=crop&crop=center")}
                alt="Bridal jewelry editorial"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-16 py-12 bg-white">
              <h3 className="text-3xl mb-6 text-gray-800">Editorial Honesty</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                We present pieces as they are—true to color, true to finish, true to how they’re worn. The goal is calm editorial realism: soft light, simple backgrounds, and natural context.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Natural light, no artificial gloss</li>
                <li>• Minimal retouching—texture stays visible</li>
                <li>• Real-world contexts and human scale</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Craft Depth - Image Right, Text Left */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="order-2 md:order-1 px-6 md:px-16 py-12 bg-gray-50">
              <h3 className="text-3xl mb-6 text-gray-800">Craft Depth</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Craft isn’t a caption—it’s visible. We show prongs, cuts, settings, and finish. Macro shots are used sparingly and with control to preserve editorial calm.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Show construction and joinery</li>
                <li>• Reveal gemstone cuts and proportions</li>
                <li>• Use macro only when it adds clarity</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gray-100 aspect-[4/5] md:h-[600px]">
              <img
                src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Precise craftsmanship details"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Responsible Luxury - Image Left, Text Right */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="bg-gray-100 aspect-[4/5] md:h-[600px]">
              <img
                src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Responsible sourcing and materials"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-16 py-12 bg-white">
              <h3 className="text-3xl mb-6 text-gray-800">Responsible Luxury</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Luxury is responsibility. We choose materials and partners with rigor, and we show that rigor clearly—never as marketing jargon, always as tangible practice.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Transparent sourcing</li>
                <li>• Recyclable materials where possible</li>
                <li>• Long-life design backed by repairability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-4xl mb-6 text-gray-800">A Philosophy You Can Feel</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore pieces that embody this philosophy—from essential daily wear to high jewelry masterpieces.
          </p>
          <div className="flex gap-4 justify-center">
            <button className="bg-gray-800 text-white px-10 py-3 text-sm tracking-wider hover:bg-gray-700 transition-colors">
              DISCOVER DIAMONDS
            </button>
            <button className="border border-gray-400 px-10 py-3 text-sm tracking-wider hover:bg-gray-50 transition-colors">
              EXPLORE GOLD
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
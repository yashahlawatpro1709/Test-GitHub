"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Diamond, Gem, Sparkles } from "lucide-react"

// Helper to proxy remote image URLs
function proxy(url: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

export default function DiamondPhilosophyPage() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-white font-serif">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[420px] md:h-[620px]">
          <img
            src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=2000&h=1300&fit=crop&crop=center&auto=format&q=80")}
            alt="Diamond Philosophy Hero"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" aria-hidden="true"></div>
        <div className="absolute bottom-12 left-0 right-0 text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-4 tracking-wide">Diamond Philosophy</h2>
          <p className="text-lg text-white/90 max-w-3xl mx-auto px-6">
            From origin to brilliance—crafted with integrity, perfected with patience.
          </p>
        </div>
      </section>

      {/* Dropdown Navigator */}
      <section className="py-12">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.button
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="diamond-topics"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full ring-1 ring-champagne-gold/30 bg-gradient-to-br from-white to-champagne-gold/10 backdrop-blur shadow-sm hover:ring-champagne-gold hover:shadow-lg transition-all"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30">
              <Diamond className="w-4 h-4 text-champagne-gold" />
            </span>
            <span className="tracking-wide text-gray-700">Explore Diamond Topics</span>
          </motion.button>

          <AnimatePresence>
            {open && (
              <motion.div
                id="diamond-topics"
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.25 }}
                className="mt-6 grid sm:grid-cols-3 gap-4"
              >
                <a
                  href="/philosophy/diamond/made"
                  className="group block rounded-2xl ring-1 ring-gray-200 hover:ring-champagne-gold transition-all p-6 text-left bg-white/80 backdrop-blur bg-gradient-to-br from-white to-champagne-gold/5 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30 text-champagne-gold">
                      <Gem className="w-4 h-4" />
                    </span>
                    <span className="font-semibold tracking-wide text-gray-900">How Diamonds Are Made</span>
                  </div>
                  <p className="text-sm text-gray-600">Origin, transformation from rough to faceted, clarity insights.</p>
                </a>
                <a
                  href="/philosophy/diamond/craft"
                  className="group block rounded-2xl ring-1 ring-gray-200 hover:ring-champagne-gold transition-all p-6 text-left bg-white/80 backdrop-blur bg-gradient-to-br from-white to-champagne-gold/5 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30 text-champagne-gold">
                      <Diamond className="w-4 h-4" />
                    </span>
                    <span className="font-semibold tracking-wide text-gray-900">Craft & Setting</span>
                  </div>
                  <p className="text-sm text-gray-600">Proportions, symmetry, prongs and joinery with editorial calm.</p>
                </a>
                <a
                  href="/philosophy/diamond/polish"
                  className="group block rounded-2xl ring-1 ring-gray-200 hover:ring-champagne-gold transition-all p-6 text-left bg-white/80 backdrop-blur bg-gradient-to-br from-white to-champagne-gold/5 shadow-sm hover:shadow-xl hover:-translate-y-0.5"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30 text-champagne-gold">
                      <Sparkles className="w-4 h-4" />
                    </span>
                    <span className="font-semibold tracking-wide text-gray-900">Polish & Finish</span>
                  </div>
                  <p className="text-sm text-gray-600">Finish quality, surface calm, and responsible gloss.</p>
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Section 1: How Diamonds Are Made - Image Left, Text Right */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="bg-gray-100 aspect-[4/5] md:h-[600px]">
              <img
                src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Natural diamond contexts"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-16 py-12 bg-white">
              <h3 className="text-3xl mb-6 text-gray-800">How Diamonds Are Made</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Formed deep within the Earth under immense heat and pressure, diamonds travel a long path—from carbon structure to radiant stone. We honor this journey with calm, truthful storytelling.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Origin: geological formation and discovery</li>
                <li>• Transformation: cutting from rough to faceted</li>
                <li>• Clarity: respecting inclusions and nature’s signatures</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 2: Cut & Brilliance - Image Right, Text Left */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="order-2 md:order-1 px-6 md:px-16 py-12 bg-gray-50">
              <h3 className="text-3xl mb-6 text-gray-800">Cut & Brilliance</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                True brilliance is disciplined. We celebrate proportions, symmetry, and how a stone handles light—never chasing excess, always balancing fire, scintillation, and calm.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Proportions and symmetry</li>
                <li>• Light handling: fire and scintillation</li>
                <li>• Editorial restraint for macro details</li>
              </ul>
            </div>
            <div className="order-1 md:order-2 bg-gray-100 aspect-[4/5] md:h-[600px]">
              <img
                src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Faceted diamond craftsmanship"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3: Responsible Sourcing - Image Left, Text Right */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid md:grid-cols-2 gap-0 items-center">
            <div className="bg-gray-100 aspect-[4/5] md:h-[600px]">
              <img
                src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Responsible diamond sourcing"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="px-6 md:px-16 py-12 bg-white">
              <h3 className="text-3xl mb-6 text-gray-800">Responsible Sourcing</h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Our standards prioritize fairness and traceability. We choose partners with rigor and make our practices visible—without jargon, always as tangible commitments.
              </p>
              <ul className="space-y-3 text-gray-700">
                <li>• Transparent provenance</li>
                <li>• Community and environmental responsibility</li>
                <li>• Long-life design with repairability</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="py-24 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h3 className="text-4xl mb-6 text-gray-800">Experience Diamond Calm</h3>
          <p className="text-gray-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Explore pieces that embody our diamond philosophy—from iconic solitaires to refined daily wear.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/products/diamond" className="inline-flex items-center justify-center rounded-full px-10 py-3 text-sm tracking-wider bg-gradient-to-br from-gray-900 to-gray-700 text-white ring-1 ring-black/10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
              DISCOVER DIAMONDS
            </a>
            <a href="/collections" className="inline-flex items-center justify-center rounded-full px-10 py-3 text-sm tracking-wider ring-1 ring-champagne-gold/40 text-gray-800 bg-white hover:bg-gradient-to-br hover:from-white hover:to-champagne-gold/10 hover:ring-champagne-gold shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
              EXPLORE COLLECTIONS
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
"use client"
import { Sparkles } from "lucide-react"

// Helper to proxy remote image URLs
function proxy(url: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

export default function DiamondCraftPage() {
  return (
    <div className="bg-white font-serif">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[360px] md:h-[520px]">
          <img
            src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=2000&h=1300&fit=crop&crop=center&auto=format&q=80")}
            alt="Diamond Craft & Setting"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" aria-hidden="true"></div>
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-3 tracking-wide">Diamond Craft & Setting</h2>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto px-6">
            Proportions, symmetry, prongs, and finishing—celebrated with discipline and clarity.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="py-20">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-8 items-start">
          <div className="prose prose-gray max-w-none bg-white/80 backdrop-blur-md rounded-3xl border border-champagne-gold/30 ring-1 ring-champagne-gold/20 shadow-xl p-8 prose-headings:font-serif prose-headings:text-gray-900 prose-p:text-gray-700 prose-li:text-gray-700">
            <div className="mb-6 flex items-center gap-2 text-champagne-gold">
              <Sparkles className="h-4 w-4" />
              <span className="uppercase tracking-[0.2em] text-xs">Luxury Standards</span>
            </div>
            <h3 className="text-3xl mb-6 text-gray-800">Proportions & Symmetry</h3>
            <p className="text-gray-600 mb-6">
              Guiding light begins with proportion. We tune table size, crown and pavilion angles, and symmetry so the diamond’s response feels calm and luminous.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Intentional proportion ranges—no chasing extremes</li>
              <li>• Symmetry alignment for predictable light behavior</li>
              <li>• Iterative inspections under neutral lighting</li>
            </ul>

            <h3 className="text-3xl mb-6 text-gray-800">Prongs & Joinery</h3>
            <p className="text-gray-600 mb-6">
              Settings are engineered for security and comfort. Micro-adjusted prong pressure holds the stone without stress; joinery is refined so the piece rests gently on skin.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Micrometer-level prong adjustments to prevent over-tightening</li>
              <li>• Controlled solder flows and cleaned joints for longevity</li>
              <li>• Soft polish on contact points to reduce friction</li>
            </ul>

            <h3 className="text-3xl mb-6 text-gray-800">Editorial Restraint</h3>
            <p className="text-gray-600 mb-6">
              We design with restraint—no visual noise, just clarity. Each line and curve is deliberate, letting materials and light speak.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Minimalist profiles shaped for everyday wear</li>
              <li>• Balanced metal-to-stone relationships</li>
              <li>• Precision that reads as quiet luxury</li>
            </ul>

            <div className="border-t border-champagne-gold/20 mt-8 pt-8">
              <h3 className="text-3xl mb-6 text-gray-800">Quality Control</h3>
              <p className="text-gray-600 mb-6">
                Every piece passes measured checkpoints—from stone seating to polish uniformity—before it leaves our workshop.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Microscope checks at prong tips and girdle contact</li>
                <li>• Tension testing for secure setting without distortion</li>
                <li>• Final inspection under diffusion lighting</li>
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-champagne-gold/30 bg-white/80 p-6">
              <p className="text-gray-800">
                Craft Promise: Thoughtful engineering, gentle comfort, and a finish that feels effortless.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="bg-gray-100 aspect-[4/5] md:h-[520px] rounded-3xl ring-1 ring-champagne-gold/20 shadow-xl overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
              <img
                src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Setting detail and symmetry"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 aspect-[4/3] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&h=800&fit=crop&crop=center&auto=format&q=80")}
                  alt="Macro diamond facets"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 aspect-[4/3] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center&auto=format&q=80")}
                  alt="Polish and finish tools"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 bg-gray-100 aspect-[16/9] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&h=900&fit=crop&crop=center&auto=format&q=80")}
                  alt="Bench detail and setting finesse"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 bg-gray-100 aspect-[16/9] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&crop=center&auto=format&q=80")}
                  alt="Studio bench and clean symmetry"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
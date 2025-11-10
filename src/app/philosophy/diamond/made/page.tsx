"use client"
import { Sparkles } from "lucide-react"

// Helper to proxy remote image URLs
function proxy(url: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

export default function DiamondMadePage() {
  return (
    <div className="bg-white font-serif">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[360px] md:h-[520px]">
          <img
            src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2000&h=1300&fit=crop&crop=center&auto=format&q=80")}
            alt="How Diamonds Are Made"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" aria-hidden="true"></div>
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-3 tracking-wide">How Diamonds Are Made</h2>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto px-6">
            Origin and transformation—from rough to faceted—told with calm editorial realism.
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
            <h3 className="text-3xl mb-6 text-gray-800">Geological Origin</h3>
            <p className="text-gray-600 mb-6">
              Diamonds form deep within the Earth under intense heat and pressure. Their journey to the surface is rare, and each discovery is a testament to nature’s patience.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Ethical discovery with minimized environmental impact</li>
              <li>• Community benefit commitments with local partners</li>
              <li>• Verified provenance via chain-of-custody records</li>
            </ul>

            <h3 className="text-3xl mb-6 text-gray-800">From Rough to Faceted</h3>
            <p className="text-gray-600 mb-6">
              Careful planning, cleaving, sawing, and polishing reveal the stone’s structure. Proportions and symmetry dictate how the diamond will handle light.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Inclusion mapping and cut planning for optimal light return</li>
              <li>• Discipline in angles and symmetry—no shortcuts</li>
              <li>• Quality gates at every transformation step</li>
            </ul>

            <h3 className="text-3xl mb-6 text-gray-800">Clarity & Character</h3>
            <p className="text-gray-600 mb-6">
              Inclusions are nature’s signature. We respect them and present the stone truthfully, avoiding exaggerated claims and maintaining editorial calm.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Honest disclosure—no over-polishing to mislead</li>
              <li>• Natural “birthmarks” highlighted with sensitivity</li>
              <li>• Focus on beauty in balance, not perfection myths</li>
            </ul>

            <div className="border-t border-champagne-gold/20 mt-8 pt-8">
              <h3 className="text-3xl mb-6 text-gray-800">Traceability & Certification</h3>
              <p className="text-gray-600 mb-6">
                Trust is earned through transparency. Every diamond carries documented origin, grading, and ownership records that we make visible.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• GIA/IGI grading with laser inscriptions</li>
                <li>• Digital ledger of each stone’s lifecycle</li>
                <li>• Annual partner audits and compliance checks</li>
              </ul>
            </div>

            <div className="border-t border-champagne-gold/20 mt-8 pt-8">
              <h3 className="text-3xl mb-6 text-gray-800">Trader Standards</h3>
              <p className="text-gray-600 mb-6">
                We work with traders who share our values—fair compensation, documented provenance, and ethical declarations.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Anti-conflict declarations and strict compliance</li>
                <li>• On-site audits and code-of-conduct training</li>
                <li>• Continuous improvement and community investment</li>
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-champagne-gold/30 bg-white/80 p-6">
              <p className="text-gray-800">
                Our Promise: Calm editorial honesty, rigorous sourcing, and diamonds that feel as good as they look.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="bg-gray-100 aspect-[4/5] md:h-[520px] rounded-3xl ring-1 ring-champagne-gold/20 shadow-xl overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
              <img
                src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Diamond transformation detail"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 aspect-[4/3] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=800&fit=crop&crop=center&auto=format&q=80")}
                  alt="Setting tools and prongs"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 aspect-[4/3] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center&auto=format&q=80")}
                  alt="Polish instruments"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 bg-gray-100 aspect-[16/9] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&crop=center&auto=format&q=80")}
                  alt="Macro facets and light behavior"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 bg-gray-100 aspect-[16/9] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&h=900&fit=crop&crop=center&auto=format&q=80")}
                  alt="Planning and transformation bench"
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
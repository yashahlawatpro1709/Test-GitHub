"use client"
import { Sparkles } from "lucide-react"

// Helper to proxy remote image URLs
function proxy(url: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

export default function DiamondPolishPage() {
  return (
    <div className="bg-white font-serif">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[360px] md:h-[520px]">
          <img
            src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=2000&h=1300&fit=crop&crop=center&auto=format&q=80")}
            alt="Polish & Finish"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" aria-hidden="true"></div>
        <div className="absolute bottom-10 left-0 right-0 text-center text-white">
          <h2 className="text-4xl md:text-5xl mb-3 tracking-wide">Polish & Finish</h2>
          <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto px-6">
            Surface calm and responsible gloss—finish that honors the stone.
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
            <h3 className="text-3xl mb-6 text-gray-800">Finish Quality</h3>
            <p className="text-gray-600 mb-6">
              Polish is the final voice of a diamond. We seek a calm, high-fidelity surface that carries light with ease.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Angular precision so facets read clearly</li>
              <li>• Edge refinement without sharpness on skin-contact areas</li>
              <li>• Consistent luster with no haze or drag</li>
            </ul>

            <h3 className="text-3xl mb-6 text-gray-800">Surface Calm</h3>
            <p className="text-gray-600 mb-6">
              Calm surfaces invite confident wear. We reduce micro-chatter and ensure polished planes are even and coherent.
            </p>
            <ul className="space-y-2 text-gray-700 mb-8">
              <li>• Graded abrasives that step down methodically</li>
              <li>• Controlled pressure for uniform polish</li>
              <li>• Final passes under clean-room conditions</li>
            </ul>

            <div className="border-t border-champagne-gold/20 mt-8 pt-8">
              <h3 className="text-3xl mb-6 text-gray-800">Responsible Gloss</h3>
              <p className="text-gray-600 mb-6">
                Our compounds and processes are selected for performance and responsibility—effective, clean, and safe for people and environment.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Verified polishing media and safe disposal protocols</li>
                <li>• Clean air extraction and filtration systems</li>
                <li>• Documented SOPs and technician training</li>
              </ul>
            </div>

            <div className="border-t border-champagne-gold/20 mt-8 pt-8">
              <h3 className="text-3xl mb-6 text-gray-800">Polish Specifications</h3>
              <p className="text-gray-600 mb-6">
                We target polish grades that balance beauty and durability, favoring Excellent and Very Good where appropriate.
              </p>
              <ul className="space-y-2 text-gray-700">
                <li>• Facet junction clarity checked under magnification</li>
                <li>• GIA polish grading methodology as reference</li>
                <li>• Objective acceptance thresholds before release</li>
              </ul>
            </div>

            <div className="mt-10 rounded-2xl border border-champagne-gold/30 bg-white/80 p-6">
              <p className="text-gray-800">
                Care Guidance: Routine gentle cleaning, avoid harsh chemicals, and enjoy lifetime service for re-polish and inspection.
              </p>
            </div>
          </div>
          <div className="grid gap-4">
            <div className="bg-gray-100 aspect-[4/5] md:h-[520px] rounded-3xl ring-1 ring-champagne-gold/20 shadow-xl overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
              <img
                src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=1066&fit=crop&crop=center&auto=format&q=80")}
                alt="Polish detail on facets"
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-gray-100 aspect-[4/3] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1200&h=800&fit=crop&crop=center&auto=format&q=80")}
                  alt="Tools for finish quality"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="bg-gray-100 aspect-[4/3] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop&crop=center&auto=format&q=80")}
                  alt="Polish compounds and accessories"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 bg-gray-100 aspect-[16/9] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1600&h=900&fit=crop&crop=center&auto=format&q=80")}
                  alt="Facet clarity and polish spec"
                  loading="lazy"
                  decoding="async"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="col-span-2 bg-gray-100 aspect-[16/9] md:h-[260px] rounded-2xl ring-1 ring-champagne-gold/20 shadow-lg overflow-hidden bg-gradient-to-br from-white to-champagne-gold/10">
                <img
                  src={proxy("https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=1600&h=900&fit=crop&crop=center&auto=format&q=80")}
                  alt="Finish uniformity under clean light"
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
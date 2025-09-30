import Link from 'next/link'
import { Button } from '@/components/ui/button'

const categories = [
  { key: 'rings', title: 'Rings', desc: 'Solitaire, eternity, bands and more.' },
  { key: 'necklaces', title: 'Necklaces', desc: 'Pendants, chains, and statement pieces.' },
  { key: 'earrings', title: 'Earrings', desc: 'Studs, hoops, drops and chandeliers.' },
  { key: 'bracelets', title: 'Bracelets', desc: 'Tennis, bangles and link styles.' },
]

export default function ExploreCategoriesPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-4">Explore Categories</h1>
          <p className="text-warm-gray max-w-2xl">Browse by category to find your perfect sparkle.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {categories.map((c) => (
            <div key={c.key} className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">{c.title}</h3>
              <p className="text-gray-600 mb-4">{c.desc}</p>
              <Link href={`/products/${c.key}`}>
                <Button variant="elegant" className="w-full">Shop {c.title}</Button>
              </Link>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


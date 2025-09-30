import Image from 'next/image'
import { notFound } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { getProductsByCategory, type Product } from '@/data/dummy'

const validCategories: Product['category'][] = ['rings', 'necklaces', 'earrings', 'bracelets']

export default function CategoryPage({ params }: { params: { category: Product['category'] } }) {
  const { category } = params
  if (!validCategories.includes(category)) return notFound()

  const items = getProductsByCategory(category)

  const titles: Record<Product['category'], string> = {
    rings: 'Rings',
    necklaces: 'Necklaces',
    earrings: 'Earrings',
    bracelets: 'Bracelets',
  }

  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="relative pt-32 pb-6">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-3">
            {titles[category]}
          </h1>
          <p className="text-warm-gray">Curated {titles[category].toLowerCase()} crafted with precision and elegance.</p>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(items.length ? items : Array.from({ length: 6 }).map((_, i) => ({
              id: `ph-${i}`,
              name: `${titles[category]} ${i + 1}`,
              price: 999 + i * 50,
              image: `https://picsum.photos/seed/${category}-${i}/800/800`,
              category,
            })) as any[]).map((p: any) => (
              <div key={p.id} className="group overflow-hidden rounded-xl border border-champagne-gold/20 bg-white shadow-luxury">
                <div className="relative h-64">
                  <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                </div>
                <div className="p-5">
                  <h3 className="font-playfair text-lg font-bold text-deep-black mb-1">{p.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">₹ {p.price.toLocaleString('en-IN')}</p>
                  <div className="flex gap-3">
                    <Button variant="luxury" className="flex-1">Add to Cart</Button>
                    <Button variant="elegant" className="flex-1">Wishlist</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

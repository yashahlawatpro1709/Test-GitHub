import Image from 'next/image'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { getCollection, getProductsByCollection } from '@/data/dummy'

export default function CollectionDetail({ params }: { params: { slug: string } }) {
  const collection = getCollection(params.slug)
  if (!collection) return notFound()

  const items = getProductsByCollection(params.slug)

  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="relative pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">{collection.title}</h1>
          <p className="text-warm-gray max-w-2xl">{collection.description}</p>
        </div>
      </section>

      <div className="relative h-64 sm:h-80 lg:h-96">
        <Image src={collection.banner} alt={collection.title} fill className="object-cover" />
      </div>

      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {items.length === 0 ? (
            <div className="text-center text-gray-600">No products yet. Check back soon.</div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((p) => (
                <div key={p.id} className="group overflow-hidden rounded-xl border border-champagne-gold/20 bg-white shadow-luxury">
                  <div className="relative h-64">
                    <Image src={p.image} alt={p.name} fill className="object-cover transition-transform duration-500 group-hover:scale-105" />
                  </div>
                  <div className="p-5">
                    <h3 className="font-playfair text-lg font-bold text-deep-black mb-1">{p.name}</h3>
                    <p className="text-sm text-gray-600 mb-4">₹ {p.price.toLocaleString('en-IN')}</p>
                    <div className="flex gap-3">
                      <Button variant="luxury" className="flex-1">Add to Cart</Button>
                      <Link href={`/products/${p.category}`} className="flex-1">
                        <Button variant="elegant" className="w-full">More Like This</Button>
                      </Link>
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


export type Product = {
  id: string
  name: string
  price: number
  image: string
  category: 'rings' | 'necklaces' | 'earrings' | 'bracelets'
  collection?: string
  description?: string
}

export type Collection = {
  slug: string
  title: string
  description: string
  banner: string
  categories: Product['category'][]
}

export const collections: Collection[] = [
  {
    slug: 'engagement-rings',
    title: 'Engagement Rings',
    description: 'Celebrate forever with our exquisite diamond engagement ring designs, crafted to symbolize eternal love.',
    banner: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=1200&auto=format&fit=crop',
    categories: ['rings']
  },
  {
    slug: 'wedding-bands',
    title: 'Wedding Bands',
    description: 'Elegant diamond-studded bands symbolizing everlasting love and commitment in precious metals.',
    banner: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?q=80&w=1200&auto=format&fit=crop',
    categories: ['rings']
  },
  {
    slug: 'necklaces',
    title: 'Diamond Necklaces',
    description: 'Graceful diamond necklaces and pendants crafted to elevate every ensemble with timeless sparkle.',
    banner: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop',
    categories: ['necklaces']
  },
  {
    slug: 'earrings',
    title: 'Diamond Earrings',
    description: 'From diamond studs to chandelier earrings—find your signature sparkle in our premium collection.',
    banner: 'https://images.unsplash.com/photo-1617038260897-9b9f3b9f0ee0?q=80&w=1200&auto=format&fit=crop',
    categories: ['earrings']
  },
  {
    slug: 'bracelets',
    title: 'Diamond Bracelets',
    description: 'Delicate diamond tennis bracelets and bangles designed for effortless luxury and elegance.',
    banner: 'https://images.unsplash.com/photo-1603575449299-5f28a0132b29?q=80&w=1200&auto=format&fit=crop',
    categories: ['bracelets']
  },
  {
    slug: 'bridal-sets',
    title: 'Bridal Collections',
    description: 'Complete bridal jewelry sets featuring matching diamonds for your perfect wedding day ensemble.',
    banner: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1200&auto=format&fit=crop',
    categories: ['rings', 'necklaces', 'earrings', 'bracelets']
  }
]

export const products: Product[] = [
  {
    id: 'r1',
    name: 'Solitaire Diamond Ring',
    price: 1299,
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?q=80&w=1200&auto=format&fit=crop',
    category: 'rings',
    collection: 'engagement-rings',
    description: 'Timeless solitaire with brilliant-cut diamond set in 18k gold.'
  },
  {
    id: 'r2',
    name: 'Eternity Band',
    price: 899,
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=1200&auto=format&fit=crop',
    category: 'rings',
    collection: 'wedding-bands'
  },
  {
    id: 'n1',
    name: 'Emerald Pendant Necklace',
    price: 1099,
    image: 'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?q=80&w=1200&auto=format&fit=crop',
    category: 'necklaces',
    collection: 'necklaces'
  },
  {
    id: 'e1',
    name: 'Classic Pearl Studs',
    price: 299,
    image: 'https://images.unsplash.com/photo-1520975916090-3105956dac38?q=80&w=1200&auto=format&fit=crop',
    category: 'earrings',
    collection: 'earrings'
  },
  {
    id: 'b1',
    name: 'Gold Link Bracelet',
    price: 649,
    image: 'https://images.unsplash.com/photo-1577087148401-1c55d1bdb3cd?q=80&w=1200&auto=format&fit=crop',
    category: 'bracelets',
    collection: 'bracelets'
  },
  {
    id: 'b2',
    name: 'Diamond Tennis Bracelet',
    price: 2199,
    image: 'https://images.unsplash.com/photo-1603575449299-5f28a0132b29?q=80&w=1200&auto=format&fit=crop',
    category: 'bracelets',
    collection: 'bridal-sets'
  }
]

export function getProductsByCategory(category: Product['category']) {
  return products.filter(p => p.category === category)
}

export function getProductsByCollection(slug: string) {
  return products.filter(p => p.collection === slug)
}

export function getCollection(slug: string) {
  return collections.find(c => c.slug === slug)
}


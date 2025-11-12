import HeroSectionServer from '@/components/home/hero-section-server'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { BrandStory } from '@/components/home/brand-story'
import { ProductShowcase } from '@/components/home/product-showcase'
import { NewsletterSection } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSectionServer />
      <FeaturedCollections />
      <ProductShowcase />
      <BrandStory />
      <NewsletterSection />
    </div>
  )
}

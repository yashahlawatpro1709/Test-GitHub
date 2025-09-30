import { HeroSection } from '@/components/home/hero-section'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { BrandStory } from '@/components/home/brand-story'
import { ProductShowcase } from '@/components/home/product-showcase'
import { NewsletterSection } from '@/components/home/newsletter'
import { TrustIndicators } from '@/components/home/trust-indicators'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <TrustIndicators />
      <FeaturedCollections />
      <ProductShowcase />
      <BrandStory />
      <NewsletterSection />
    </div>
  )
}

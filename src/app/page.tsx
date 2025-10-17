import { HeroSection } from '@/components/home/hero-section'
import { FeaturedCollections } from '@/components/home/featured-collections'
import { BrandStory } from '@/components/home/brand-story'
import { ProductShowcase } from '@/components/home/product-showcase'
import { LuxuryJewelry } from '@/components/home/luxury-jewelry'
import { NewsletterSection } from '@/components/home/newsletter'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeaturedCollections />
      <ProductShowcase />
      <LuxuryJewelry />
      <BrandStory />
      <NewsletterSection />
    </div>
  )
}

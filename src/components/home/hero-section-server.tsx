import React from 'react'
import { PrismaClient } from '@prisma/client'
import HeroSection from './hero-section'

// Force dynamic SSR so the hero reflects latest admin uploads
export const dynamic = 'force-dynamic'

const prisma = new PrismaClient()

export async function HeroSectionServer() {
  // Fetch active hero slides from DB, sorted by numeric imageKey
  const images = await prisma.siteImage.findMany({
    where: { section: 'hero', isActive: true },
    orderBy: { imageKey: 'asc' },
    select: {
      id: true,
      imageKey: true,
      url: true,
      title: true,
      description: true,
      metadata: true,
    },
  })

  const slideImages = images
    .filter((img) => typeof img.imageKey === 'string' && img.imageKey.toLowerCase().startsWith('slide'))
    .map((img) => {
      const match = img.imageKey.match(/slide[-_]?\s*(\d+)/i)
      const index = match ? parseInt(match[1]!, 10) : NaN
      return { index, img }
    })
    .filter(({ index }) => Number.isFinite(index))
    .sort((a, b) => a.index - b.index)

  const normalizedSlides = slideImages.map(({ index, img }) => {
    const meta: any = (img.metadata ?? {}) as any
    return {
      id: index,
      imageKey: img.imageKey,
      title: img.title || '',
      subtitle: meta.subtitle || '',
      tagline: meta.tagline || '',
      collection: meta.collection || '',
      description: img.description || '',
      exclusiveOffer: meta.exclusiveOffer || '',
      discount: meta.discount || '',
      additionalOffer: meta.additionalOffer || '',
      ctaText: meta.ctaText || 'Shop Now',
      ctaLink: meta.ctaLink || '/collections',
      mainImage: img.url,
      backgroundGradient: meta.backgroundGradient || '',
      accentColor: meta.accentColor || '',
      theme: meta.theme || 'light',
    }
  })

  return <HeroSection initialSlides={normalizedSlides} />
}

export default HeroSectionServer
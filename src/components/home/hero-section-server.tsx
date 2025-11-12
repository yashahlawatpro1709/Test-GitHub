import { prisma } from '@/lib/prisma'
import HeroSection from '@/components/home/hero-section'

export const revalidate = 120

// Server component: fetches hero slides on the server to avoid client-side delay
export default async function HeroSectionServer() {
  try {
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

    // Use slide-* ordering; if none present, use all hero images
    const withIndex = images.map((img) => {
      const match = img.imageKey?.match(/slide[-_]?(\d+)/i)
      const index = match ? parseInt(match[1], 10) : NaN
      return { index, img }
    })

    const slideImages = withIndex.filter((x) => Number.isFinite(x.index)).sort((a, b) => a.index - b.index)
    const base = slideImages.length ? slideImages.map((x) => x.img) : images

    const normalizedSlides = base.map((img, i) => {
      const meta: any = (img.metadata ?? {}) as any
      return {
        id: i + 1,
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
  } catch (error) {
    // On error, still render client with empty slides so it shows loader/fallback
    return <HeroSection initialSlides={[]} />
  }
}
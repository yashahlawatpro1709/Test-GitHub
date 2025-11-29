import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export const dynamic = 'force-dynamic'

// GET all images or filter by section
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const section = request.nextUrl.searchParams.get('section')

    const images = await prisma.siteImage.findMany({
      where: section ? { section } : undefined,
      orderBy: { imageKey: 'asc' },
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Get images error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// POST - Create or update image
export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { section, imageKey, url, alt, title, description, metadata } = await request.json()

    if (!section || !imageKey || !url) {
      return NextResponse.json(
        { error: 'Section, imageKey, and url are required' },
        { status: 400 }
      )
    }

    // Upsert primary image
    const image = await prisma.siteImage.upsert({
      where: {
        section_imageKey: {
          section,
          imageKey,
        },
      },
      update: {
        url,
        alt,
        title,
        description,
        metadata,
        updatedAt: new Date(),
      },
      create: {
        section,
        imageKey,
        url,
        alt,
        title,
        description,
        metadata,
      },
    })

    // Auto-duplicate logic based on jewelry type/subtype/category
    const lower = (s: any) => (typeof s === 'string' ? s.toLowerCase() : '')
    const jType = lower((metadata as any)?.jewelryType)
    const jSub = lower((metadata as any)?.jewelrySubType)
    const jCatRaw = (metadata as any)?.jewelryCategory ?? (metadata as any)?.category
    const jCat = lower(jCatRaw)

    const normalizeCategorySection = (cat: string): string | null => {
      if (!cat) return null
      if (cat.startsWith('earring')) return 'earrings'
      if (cat.startsWith('ring')) return 'rings'
      // Extend as needed: bracelets, bangles, necklaces, pendants
      if (cat.startsWith('bracelet')) return 'bracelets'
      if (cat.startsWith('bangle')) return 'bangles'
      if (cat.startsWith('necklace')) return 'necklaces'
      if (cat.startsWith('pendant')) return 'pendants'
      return null
    }

    let typeSection: string | null = null
    if (jSub === 'diamond' || section === 'diamond-jewelry') {
      typeSection = 'diamond-jewelry'
    } else if (jSub === 'gold' || section === 'gold-jewelry') {
      typeSection = 'gold-jewelry'
    } else if (jType === 'high' || jType === 'fine' || section === 'luxury-jewelry') {
      typeSection = 'luxury-jewelry'
    }

    // Fallback: earrings/rings category chosen with diamond/gold indicates type section
    if (!typeSection && section === 'earrings') {
      if (jCat === 'diamond') typeSection = 'diamond-jewelry'
      else if (jCat === 'gold') typeSection = 'gold-jewelry'
    }
    if (!typeSection && section === 'rings') {
      if (jCat === 'diamond') typeSection = 'diamond-jewelry'
      else if (jCat === 'gold') typeSection = 'gold-jewelry'
    }
    // Bracelets fallback duplication: match rings behavior
    if (!typeSection && section === 'bracelets') {
      if (jCat === 'diamond') typeSection = 'diamond-jewelry'
      else if (jCat === 'gold') typeSection = 'gold-jewelry'
    }

    const categorySection = normalizeCategorySection(jCat)

    const ensureSections = [typeSection, categorySection].filter(Boolean) as string[]

    for (const targetSection of ensureSections) {
      if (targetSection && targetSection !== section) {
        await prisma.siteImage.upsert({
          where: {
            section_imageKey: { section: targetSection, imageKey },
          },
          update: {
            url,
            alt,
            title,
            description,
            metadata: {
              ...(metadata ?? {}),
              jewelryType: jType || null,
              jewelrySubType: jSub || null,
              jewelryCategory: jCat || null,
            },
            updatedAt: new Date(),
          },
          create: {
            section: targetSection,
            imageKey,
            url,
            alt,
            title,
            description,
            metadata: {
              ...(metadata ?? {}),
              jewelryType: jType || null,
              jewelrySubType: jSub || null,
              jewelryCategory: jCat || null,
            },
          },
        })
      }
    }

    return NextResponse.json({ success: true, image })
  } catch (error) {
    console.error('Create/Update image error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

// DELETE image
export async function DELETE(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const id = request.nextUrl.searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Image ID is required' },
        { status: 400 }
      )
    }

    await prisma.siteImage.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Delete image error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

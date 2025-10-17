import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public API to get site images
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

    const images = await prisma.siteImage.findMany({
      where: section ? { section, isActive: true } : { isActive: true },
      orderBy: { imageKey: 'asc' },
      select: {
        id: true,
        section: true,
        imageKey: true,
        url: true,
        alt: true,
        title: true,
        description: true,
        metadata: true,
      },
    })

    return NextResponse.json({ images })
  } catch (error) {
    console.error('Get site images error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch images', images: [] },
      { status: 500 }
    )
  }
}

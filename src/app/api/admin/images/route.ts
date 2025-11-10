import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

// GET all images or filter by section
export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const section = searchParams.get('section')

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

    // Upsert image
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

    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

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

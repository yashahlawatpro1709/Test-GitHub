import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Public endpoint to record client-side engagement (hover + impressions)
// Stores cumulative counters inside SiteImage.metadata.engagement
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const siteImageId: string | undefined = body?.siteImageId
    const imageKey: string | undefined = body?.imageKey
    const hoverMsRaw: any = body?.hoverMs
    const impressionsIncRaw: any = body?.impressions
    const clicksIncRaw: any = body?.clicks

    if (!siteImageId && !imageKey) {
      return NextResponse.json({ error: 'Missing siteImageId or imageKey' }, { status: 400 })
    }

    // Normalize increments
    const hoverMs = Math.max(0, Math.round(Number(hoverMsRaw || 0)))
    const impressionsInc = Math.max(0, Math.round(Number(impressionsIncRaw || 0)))
    const clicksInc = Math.max(0, Math.round(Number(clicksIncRaw || 0)))

    // Resolve image by id first, else by key
    let img = siteImageId
      ? await prisma.siteImage.findUnique({ where: { id: siteImageId } })
      : null
    if (!img && imageKey) {
      img = await prisma.siteImage.findFirst({ where: { imageKey } })
    }

    if (!img) {
      return NextResponse.json({ error: 'Image not found' }, { status: 404 })
    }

    const prevMeta: any = img.metadata || {}
    const prevEng: any = prevMeta.engagement || { hoverMs: 0, impressions: 0, clicks: 0 }

    const nextEng = {
      hoverMs: (prevEng.hoverMs || 0) + hoverMs,
      impressions: (prevEng.impressions || 0) + impressionsInc,
      clicks: (prevEng.clicks || 0) + clicksInc,
      lastHoverAt: hoverMs > 0 ? new Date().toISOString() : (prevEng.lastHoverAt || null),
    }

    const nextMeta = { ...prevMeta, engagement: nextEng }

    await prisma.siteImage.update({
      where: { id: img.id },
      data: { metadata: nextMeta },
    })

    return NextResponse.json({ status: 'ok', engagement: nextEng })
  } catch (error: any) {
    console.error('[Engagement] Error:', error)
    return NextResponse.json({ error: error?.message || 'Internal error' }, { status: 500 })
  }
}
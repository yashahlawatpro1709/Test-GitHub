import { NextRequest } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

// Simple server-side image proxy to bypass preview/webview external image restrictions
// Allows only whitelisted hosts for security.
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const url = searchParams.get('url')

    if (!url) {
      return new Response('Missing url parameter', { status: 400 })
    }

    let target: URL
    try {
      target = new URL(url)
    } catch {
      return new Response('Invalid URL', { status: 400 })
    }

    const allowedHosts = new Set([
      'images.unsplash.com',
      'res.cloudinary.com',
    ])

    if (!allowedHosts.has(target.hostname)) {
      return new Response('Forbidden hostname', { status: 403 })
    }

    const upstream = await fetch(target.toString(), {
      // Avoid caching issues while developing; set cache headers on response instead
      cache: 'no-store',
      headers: {
        // Some CDNs require a UA
        'User-Agent': 'Mozilla/5.0 (proxy-image)',
        'Accept': '*/*',
      },
    })

    if (!upstream.ok) {
      return new Response('Upstream fetch failed', { status: upstream.status || 502 })
    }

    const contentType = upstream.headers.get('content-type') || 'image/jpeg'

    // Read as binary to ensure compatibility across runtimes and avoid stream quirks
    const buffer = await upstream.arrayBuffer()

    return new Response(Buffer.from(buffer), {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=3600, stale-while-revalidate=86400',
      },
    })
  } catch (err) {
    console.error('Proxy image error:', err)
    return new Response('Internal server error', { status: 500 })
  }
}
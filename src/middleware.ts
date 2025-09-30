import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  try {
    const { method } = req
    const url = req.nextUrl.toString()
    const ua = req.headers.get('user-agent') || ''
    console.log(`[MW] ${method} ${url} ua=${ua}`)
  } catch (err) {
    console.error('[MW] middleware error:', err)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}


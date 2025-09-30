import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const info = {
      ok: true,
      node: process.version,
      nextauthUrl: process.env.NEXTAUTH_URL || null,
      runtime: process.env.NEXT_RUNTIME || 'node',
    }
    console.log('[API] /api/debug ->', info)
    return NextResponse.json(info)
  } catch (err) {
    console.error('[API] /api/debug error:', err)
    return NextResponse.json({ ok: false, error: 'debug-error' }, { status: 500 })
  }
}


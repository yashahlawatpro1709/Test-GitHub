import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const payload = {
      ok: true,
      time: new Date().toISOString(),
      env: process.env.NODE_ENV,
    }
    console.log('[API] /api/health ->', payload)
    return NextResponse.json(payload)
  } catch (err) {
    console.error('[API] /api/health error:', err)
    return NextResponse.json({ ok: false, error: 'health-error' }, { status: 500 })
  }
}


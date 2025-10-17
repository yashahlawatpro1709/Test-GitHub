import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// Diagnostic endpoint to check admin setup and database connection
export async function GET() {
  try {
    const checks = {
      databaseUrl: !!process.env.DATABASE_URL,
      databaseUrlLength: process.env.DATABASE_URL?.length || 0,
      adminJwtSecret: !!process.env.ADMIN_JWT_SECRET,
      nodeEnv: process.env.NODE_ENV,
    }

    console.log('[Admin Check] Environment checks:', checks)

    // Try to connect to database
    let adminCount = 0
    let dbError = null
    try {
      adminCount = await prisma.admin.count()
      console.log('[Admin Check] Admin count:', adminCount)
    } catch (error: any) {
      dbError = error?.message
      console.error('[Admin Check] Database error:', error)
    }

    return NextResponse.json({
      status: 'ok',
      checks: {
        ...checks,
        databaseConnected: !dbError,
        adminExists: adminCount > 0,
        adminCount,
      },
      error: dbError,
    })
  } catch (error: any) {
    console.error('[Admin Check] Error:', error)
    return NextResponse.json(
      {
        status: 'error',
        error: error?.message,
        stack: process.env.NODE_ENV === 'development' ? error?.stack : undefined,
      },
      { status: 500 }
    )
  }
}

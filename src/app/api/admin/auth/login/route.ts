import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { verifyPassword, setAdminSession } from '@/lib/auth'

export async function POST(request: NextRequest) {
  try {
    // Check if database is connected
    if (!process.env.DATABASE_URL) {
      console.error('DATABASE_URL is not configured')
      return NextResponse.json(
        { error: 'Database is not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const { username, password } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    console.log('[Admin Login] Attempting login for username:', username)

    // Find admin by username
    const admin = await prisma.admin.findUnique({
      where: { username },
    })

    if (!admin) {
      console.log('[Admin Login] Admin not found:', username)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('[Admin Login] Admin found, verifying password')

    // Verify password
    const isValid = await verifyPassword(password, admin.password)

    if (!isValid) {
      console.log('[Admin Login] Invalid password for:', username)
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    console.log('[Admin Login] Password verified, creating session')

    // Create session
    await setAdminSession(admin.id, admin.username)

    console.log('[Admin Login] Login successful for:', username)

    return NextResponse.json({
      success: true,
      admin: {
        id: admin.id,
        username: admin.username,
        name: admin.name,
        email: admin.email,
      },
    })
  } catch (error: any) {
    console.error('[Admin Login] Error:', error)
    console.error('[Admin Login] Error message:', error?.message)
    console.error('[Admin Login] Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

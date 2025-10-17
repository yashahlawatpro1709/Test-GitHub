import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// This route is for initial admin setup only
export async function POST(request: NextRequest) {
  try {
    // Check if database is connected
    if (!process.env.DATABASE_URL) {
      console.error('[Admin Setup] DATABASE_URL is not configured')
      return NextResponse.json(
        { error: 'Database is not configured. Please contact support.' },
        { status: 503 }
      )
    }

    console.log('[Admin Setup] Checking for existing admin')

    // Check if any admin exists
    const existingAdmin = await prisma.admin.findFirst()

    if (existingAdmin) {
      console.log('[Admin Setup] Admin already exists')
      return NextResponse.json(
        { error: 'Admin already exists. Use login instead.' },
        { status: 400 }
      )
    }

    const { username, password, email, name } = await request.json()

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      )
    }

    console.log('[Admin Setup] Creating new admin:', username)

    // Hash password
    const hashedPassword = await hashPassword(password)

    // Create admin
    const admin = await prisma.admin.create({
      data: {
        username,
        password: hashedPassword,
        email,
        name,
      },
      select: {
        id: true,
        username: true,
        name: true,
        email: true,
      },
    })

    console.log('[Admin Setup] Admin created successfully:', admin.username)

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin,
    })
  } catch (error: any) {
    console.error('[Admin Setup] Error:', error)
    console.error('[Admin Setup] Error message:', error?.message)
    console.error('[Admin Setup] Error stack:', error?.stack)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: process.env.NODE_ENV === 'development' ? error?.message : undefined
      },
      { status: 500 }
    )
  }
}

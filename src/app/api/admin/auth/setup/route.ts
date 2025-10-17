import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { hashPassword } from '@/lib/auth'

// This route is for initial admin setup only
export async function POST(request: NextRequest) {
  try {
    // Check if any admin exists
    const existingAdmin = await prisma.admin.findFirst()

    if (existingAdmin) {
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

    return NextResponse.json({
      success: true,
      message: 'Admin created successfully',
      admin,
    })
  } catch (error) {
    console.error('Setup error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

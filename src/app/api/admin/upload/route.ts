import { NextRequest, NextResponse } from 'next/server'
import { getAdminSession } from '@/lib/auth'
import { put } from '@vercel/blob'
import { writeFile, mkdir } from 'fs/promises'
import { join } from 'path'
import { existsSync } from 'fs'

// Check if we're running in production/Vercel
function isProduction() {
  return process.env.VERCEL === '1' || process.env.NODE_ENV === 'production'
}

export async function POST(request: NextRequest) {
  try {
    const session = await getAdminSession()
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get('file') as File
    const folder = (formData.get('folder') as string) || 'aashni'

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      )
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_')
    const filename = `${timestamp}-${sanitizedName}`
    const pathname = `${folder}/${filename}`

    // Use Vercel Blob in production, local storage in development
    if (isProduction() && process.env.BLOB_READ_WRITE_TOKEN) {
      // Upload to Vercel Blob Storage
      const blob = await put(pathname, buffer, {
        access: 'public',
        contentType: file.type,
      })

      return NextResponse.json({
        success: true,
        url: blob.url,
        publicId: filename,
        width: null,
        height: null,
      })
    } else {
      // Save locally
      const uploadDir = join(process.cwd(), 'public', 'uploads', folder)
      if (!existsSync(uploadDir)) {
        await mkdir(uploadDir, { recursive: true })
      }

      const timestamp = Date.now()
      const filename = `${timestamp}-${file.name.replace(/[^a-zA-Z0-9.-]/g, '_')}`
      const filepath = join(uploadDir, filename)

      await writeFile(filepath, buffer)

      const url = `/uploads/${folder}/${filename}`

      return NextResponse.json({
        success: true,
        url,
        publicId: filename,
        width: null,
        height: null,
        storage: 'local',
      })
    }
  } catch (error: any) {
    console.error('Upload error:', error)
    
    return NextResponse.json(
      { 
        error: 'Upload failed', 
        details: error.message || 'Unknown error',
        hint: isProduction() 
          ? 'Please ensure BLOB_READ_WRITE_TOKEN is set in Vercel environment variables'
          : 'Local upload failed. Check file permissions.'
      },
      { status: 500 }
    )
  }
}

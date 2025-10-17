#!/usr/bin/env node

/**
 * Admin Setup Verification Script
 * 
 * This script verifies that the admin dashboard is properly configured
 * Run with: node scripts/verify-admin-setup.mjs
 */

import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
}

const log = {
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  warning: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  section: (msg) => console.log(`\n${colors.cyan}${msg}${colors.reset}`),
}

async function verifySetup() {
  console.log('\n' + '='.repeat(60))
  console.log('  AASHNI Admin Dashboard Setup Verification')
  console.log('='.repeat(60))

  let hasErrors = false

  // 1. Check Database Connection
  log.section('1. Database Connection')
  try {
    await prisma.$connect()
    log.success('Database connection successful')
  } catch (error) {
    log.error('Database connection failed')
    log.error(`Error: ${error.message}`)
    hasErrors = true
  }

  // 2. Check Admin Table
  log.section('2. Admin Table')
  try {
    const adminCount = await prisma.admin.count()
    if (adminCount === 0) {
      log.warning('No admin accounts found')
      log.info('Visit http://localhost:3001/admin/setup to create one')
    } else {
      log.success(`Found ${adminCount} admin account(s)`)
      const admins = await prisma.admin.findMany({
        select: { username: true, email: true, createdAt: true }
      })
      admins.forEach(admin => {
        log.info(`  - ${admin.username} (${admin.email || 'no email'})`)
      })
    }
  } catch (error) {
    log.error('Admin table check failed')
    log.error(`Error: ${error.message}`)
    log.warning('Run: npx prisma db push')
    hasErrors = true
  }

  // 3. Check SiteImage Table
  log.section('3. SiteImage Table')
  try {
    const imageCount = await prisma.siteImage.count()
    log.success(`SiteImage table accessible (${imageCount} images)`)
    
    if (imageCount > 0) {
      const sections = await prisma.siteImage.groupBy({
        by: ['section'],
        _count: true
      })
      log.info('Images by section:')
      sections.forEach(s => {
        log.info(`  - ${s.section}: ${s._count} images`)
      })
    } else {
      log.info('No images uploaded yet')
      log.info('Visit http://localhost:3001/admin/dashboard to upload')
    }
  } catch (error) {
    log.error('SiteImage table check failed')
    log.error(`Error: ${error.message}`)
    log.warning('Run: npx prisma db push')
    hasErrors = true
  }

  // 4. Check Environment Variables
  log.section('4. Environment Variables')
  const requiredEnvVars = [
    'DATABASE_URL',
    'CLOUDINARY_CLOUD_NAME',
    'CLOUDINARY_API_KEY',
    'CLOUDINARY_API_SECRET',
  ]

  const optionalEnvVars = [
    'ADMIN_JWT_SECRET',
  ]

  requiredEnvVars.forEach(varName => {
    if (process.env[varName]) {
      log.success(`${varName} is set`)
    } else {
      log.error(`${varName} is missing`)
      hasErrors = true
    }
  })

  optionalEnvVars.forEach(varName => {
    if (process.env[varName]) {
      log.success(`${varName} is set`)
    } else {
      log.warning(`${varName} not set (using default)`)
    }
  })

  // 5. Summary
  log.section('Summary')
  if (hasErrors) {
    log.error('Setup verification failed - please fix the errors above')
    console.log('\n' + '='.repeat(60) + '\n')
    process.exit(1)
  } else {
    log.success('All checks passed! Admin dashboard is ready to use')
    console.log('\n' + colors.cyan + 'Next Steps:' + colors.reset)
    
    const adminCount = await prisma.admin.count()
    if (adminCount === 0) {
      console.log('  1. Create admin account: http://localhost:3001/admin/setup')
      console.log('  2. Login: http://localhost:3001/admin/login')
      console.log('  3. Upload images: http://localhost:3001/admin/dashboard')
    } else {
      console.log('  1. Login: http://localhost:3001/admin/login')
      console.log('  2. Upload images: http://localhost:3001/admin/dashboard')
    }
    
    console.log('\n' + '='.repeat(60) + '\n')
  }

  await prisma.$disconnect()
}

// Run verification
verifySetup().catch((error) => {
  console.error('Verification script failed:', error)
  process.exit(1)
})

#!/usr/bin/env node

/**
 * Database Setup Script
 * This script creates the database tables needed for the admin dashboard
 */

import { execSync } from 'child_process'
import { config } from 'dotenv'
import { resolve } from 'path'

// Load environment variables from .env.local
config({ path: resolve(process.cwd(), '.env.local') })

console.log('🔧 Setting up database...\n')

try {
  // Check if DATABASE_URL is set
  if (!process.env.DATABASE_URL) {
    console.error('❌ ERROR: DATABASE_URL not found in .env.local')
    console.error('Please make sure .env.local exists and contains DATABASE_URL')
    process.exit(1)
  }

  console.log('✓ DATABASE_URL found')
  console.log('✓ Pushing schema to database...\n')

  // Run prisma db push
  execSync('npx prisma db push --skip-generate', {
    stdio: 'inherit',
    env: { ...process.env }
  })

  console.log('\n✅ Database setup complete!')
  console.log('\nYou can now:')
  console.log('1. Start the server: npm run dev')
  console.log('2. Create admin: http://localhost:3001/admin/setup')
  console.log('3. Login: http://localhost:3001/admin/login\n')

} catch (error) {
  console.error('\n❌ Database setup failed!')
  console.error('Error:', error.message)
  console.error('\nPlease check:')
  console.error('- Database is running')
  console.error('- DATABASE_URL in .env.local is correct')
  console.error('- You have permissions to create tables')
  process.exit(1)
}

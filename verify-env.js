#!/usr/bin/env node

/**
 * Verify environment variables are set correctly
 * Run: node verify-env.js
 */

console.log('\n🔍 Checking Environment Variables...\n');
console.log('=' .repeat(60));

const requiredVars = [
  'DATABASE_URL',
  'CLOUDINARY_CLOUD_NAME',
  'CLOUDINARY_API_KEY',
  'CLOUDINARY_API_SECRET',
  'ADMIN_JWT_SECRET',
  'NEXTAUTH_URL',
  'NEXTAUTH_SECRET'
];

let allSet = true;

requiredVars.forEach(varName => {
  const value = process.env[varName];
  const isSet = !!value;
  const status = isSet ? '✅' : '❌';
  
  if (!isSet) allSet = false;
  
  console.log(`${status} ${varName}: ${isSet ? 'SET' : 'MISSING'}`);
  
  if (isSet && varName === 'DATABASE_URL') {
    // Show partial value for security
    const masked = value.substring(0, 20) + '...' + value.substring(value.length - 10);
    console.log(`   Value: ${masked}`);
  }
});

console.log('=' .repeat(60));

if (allSet) {
  console.log('\n✅ All required environment variables are set!');
  console.log('\n💡 Next steps:');
  console.log('   1. Run: npm run dev');
  console.log('   2. Go to: http://localhost:3001/admin/login');
  console.log('   3. Login with: admin / Admin@123\n');
} else {
  console.log('\n❌ Some environment variables are missing!');
  console.log('\n💡 To fix:');
  console.log('   1. Copy .env.local.template to .env.local');
  console.log('   2. Fill in the missing values');
  console.log('   3. Run this script again\n');
  console.log('   Command: cp .env.local.template .env.local\n');
}

#!/usr/bin/env node

/**
 * Generate random secrets for environment variables
 * Run: node generate-secrets.js
 */

const crypto = require('crypto');

console.log('\n🔐 Generating Random Secrets for Environment Variables\n');
console.log('=' .repeat(60));

console.log('\n📋 Copy these to your Vercel Environment Variables:\n');

console.log('ADMIN_JWT_SECRET:');
console.log(crypto.randomBytes(32).toString('hex'));

console.log('\nNEXTAUTH_SECRET:');
console.log(crypto.randomBytes(32).toString('hex'));

console.log('\n' + '='.repeat(60));
console.log('\n✅ Secrets generated successfully!');
console.log('\n💡 Tips:');
console.log('   - Each secret should be different');
console.log('   - Never commit these to Git');
console.log('   - Add them to Vercel Environment Variables');
console.log('   - Select ALL environments when adding\n');

#!/usr/bin/env node

require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;

console.log('\n🔍 Testing Cloudinary Configuration...\n');
console.log('=' .repeat(60));

const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
const apiKey = process.env.CLOUDINARY_API_KEY;
const apiSecret = process.env.CLOUDINARY_API_SECRET;

console.log('Cloud Name:', cloudName);
console.log('API Key:', apiKey);
console.log('API Secret:', apiSecret ? apiSecret.substring(0, 10) + '...' : 'MISSING');
console.log('=' .repeat(60));

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

console.log('\n📡 Testing connection to Cloudinary...\n');

// Test by fetching account details
cloudinary.api.ping()
  .then(result => {
    console.log('✅ SUCCESS! Cloudinary connection works!');
    console.log('Response:', result);
    console.log('\n✅ Your Cloudinary credentials are correct!\n');
  })
  .catch(error => {
    console.log('❌ FAILED! Cloudinary connection error:');
    console.log('Error:', error.message);
    console.log('\n💡 Possible issues:');
    console.log('   1. Cloud name is incorrect');
    console.log('   2. API Key is incorrect');
    console.log('   3. API Secret is incorrect');
    console.log('   4. Network/firewall blocking Cloudinary');
    console.log('\n🔧 Please verify your credentials at:');
    console.log('   https://cloudinary.com/console\n');
  });

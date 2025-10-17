#!/bin/bash
# Remove Cloudinary placeholders from .env.local
sed -i '' '/^CLOUDINARY_CLOUD_NAME=/d' .env.local
sed -i '' '/^CLOUDINARY_API_KEY=/d' .env.local
sed -i '' '/^CLOUDINARY_API_SECRET=/d' .env.local

echo "✅ Removed Cloudinary placeholders from .env.local"
echo "Images will now be saved locally in /public/uploads/"

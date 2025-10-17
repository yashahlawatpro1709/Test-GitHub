#!/bin/bash
# Backup .env.local
cp .env.local .env.local.backup

# Update DATABASE_URL
if grep -q "^DATABASE_URL=" .env.local; then
  sed -i '' 's|^DATABASE_URL=.*|DATABASE_URL="postgresql://yashahlawat@localhost:5432/aashni"|' .env.local
else
  echo 'DATABASE_URL="postgresql://yashahlawat@localhost:5432/aashni"' >> .env.local
fi

echo "✅ Updated DATABASE_URL in .env.local"
echo "Backup saved to .env.local.backup"

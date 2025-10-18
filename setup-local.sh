#!/bin/bash

echo "🚀 Setting up local development environment..."
echo ""

# Check if .env.local exists
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.template .env.local
    echo "✅ .env.local created"
else
    echo "✅ .env.local already exists"
fi

echo ""
echo "🗄️  Pushing database schema to Neon..."
echo ""

# Load environment variables and push schema
export $(cat .env.local | grep -v '^#' | xargs)
npx prisma db push --skip-generate

if [ $? -eq 0 ]; then
    echo ""
    echo "✅ Database schema pushed successfully!"
    echo ""
    echo "📦 Generating Prisma Client..."
    npx prisma generate
    echo ""
    echo "✅ Setup complete!"
    echo ""
    echo "🎯 Next steps:"
    echo "   1. Run: npm run dev"
    echo "   2. Go to: http://localhost:3001/api/admin/auth/setup"
    echo "   3. Create admin user (see instructions below)"
    echo ""
    echo "📋 Create Admin User:"
    echo "   Open browser console (F12) and run:"
    echo ""
    echo "   fetch('http://localhost:3001/api/admin/auth/setup', {"
    echo "     method: 'POST',"
    echo "     headers: { 'Content-Type': 'application/json' },"
    echo "     body: JSON.stringify({"
    echo "       username: 'admin',"
    echo "       password: 'Admin@123',"
    echo "       email: 'admin@aashni.com',"
    echo "       name: 'Admin User'"
    echo "     })"
    echo "   }).then(r => r.json()).then(console.log)"
    echo ""
else
    echo ""
    echo "❌ Database schema push failed!"
    echo ""
    echo "💡 Make sure:"
    echo "   - DATABASE_URL is correct in .env.local"
    echo "   - Your Neon database is accessible"
    echo "   - You have internet connection"
    echo ""
fi

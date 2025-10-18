# 🗄️ Database Setup Guide - Fix "Database is not configured" Error

## 🚨 Current Issue

You're getting: **"Database is not configured. Please contact support."**

This means you need to add a `DATABASE_URL` environment variable pointing to a PostgreSQL database.

---

## 🎯 Quick Solution (Choose One)

### **Option 1: Neon (Recommended - Free & Easy)** ⭐

**Best for:** Production deployment on Vercel

1. **Create Free Account**: https://neon.tech
2. **Create New Project**:
   - Click "Create Project"
   - Name: `aashni-jewelry`
   - Region: Choose closest to you
   - Click "Create Project"

3. **Get Connection String**:
   - After project creation, you'll see a connection string
   - It looks like: `postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require`
   - **Copy this entire string**

4. **Add to Vercel**:
   - Go to: https://vercel.com → Your Project → Settings → Environment Variables
   - Add variable:
     - Name: `DATABASE_URL`
     - Value: `<paste your Neon connection string>`
     - Environment: **Production, Preview, Development**
   - Click Save

5. **Redeploy on Vercel**

---

### **Option 2: Supabase (Also Free)** ⭐

**Best for:** If you want additional features like auth, storage

1. **Create Account**: https://supabase.com
2. **Create New Project**:
   - Click "New Project"
   - Name: `aashni-jewelry`
   - Database Password: Create a strong password (save it!)
   - Region: Choose closest to you
   - Click "Create new project" (takes ~2 minutes)

3. **Get Connection String**:
   - Go to: Project Settings → Database
   - Scroll to "Connection string"
   - Select "URI" tab
   - Copy the connection string
   - **Replace `[YOUR-PASSWORD]` with your actual password**

4. **Add to Vercel** (same as Option 1 step 4)

---

### **Option 3: Local Development (PostgreSQL)** 💻

**Best for:** Testing locally before deploying

#### Install PostgreSQL:

**Mac (using Homebrew):**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Windows:**
- Download from: https://www.postgresql.org/download/windows/
- Run installer
- Remember the password you set!

**Linux (Ubuntu/Debian):**
```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
sudo systemctl start postgresql
```

#### Create Database:

```bash
# Access PostgreSQL
psql postgres

# Create database
CREATE DATABASE aashni_jewelry;

# Create user (optional)
CREATE USER aashni_admin WITH PASSWORD 'your_secure_password';
GRANT ALL PRIVILEGES ON DATABASE aashni_jewelry TO aashni_admin;

# Exit
\q
```

#### Create `.env.local` file:

Create a file named `.env.local` in your project root:

```env
# Database
DATABASE_URL="postgresql://aashni_admin:your_secure_password@localhost:5432/aashni_jewelry"

# Cloudinary
CLOUDINARY_CLOUD_NAME=dqnffonkq
CLOUDINARY_API_KEY=134633341723411
CLOUDINARY_API_SECRET=4a7BDn1nr7dfKpVlJv1QyHiLZBM

# Admin JWT Secret
ADMIN_JWT_SECRET="your-super-secret-random-string-here-change-this"

# NextAuth (for production)
NEXTAUTH_URL="http://localhost:3001"
NEXTAUTH_SECRET="another-random-secret-for-nextauth"
```

---

## 🔧 After Adding DATABASE_URL

### 1. Push Database Schema

Run these commands in your project directory:

```bash
# Generate Prisma Client
npx prisma generate

# Push schema to database (creates tables)
npx prisma db push
```

### 2. Create Admin User

```bash
# Run the setup endpoint (local development)
curl -X POST http://localhost:3001/api/admin/auth/setup \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "Admin@123",
    "email": "admin@aashni.com",
    "name": "Admin User"
  }'
```

**OR** visit in browser after starting dev server:
- Start server: `npm run dev`
- Go to: `http://localhost:3001/api/admin/auth/setup`
- Use a tool like Postman to POST the admin credentials

### 3. Test Login

After creating admin user:
- Go to: `http://localhost:3001/admin/login`
- Username: `admin`
- Password: `Admin@123`

---

## 🚀 For Vercel Deployment

### Required Environment Variables:

Add ALL of these to Vercel → Settings → Environment Variables:

```env
# Database (REQUIRED)
DATABASE_URL=<your-neon-or-supabase-connection-string>

# Cloudinary (REQUIRED for image uploads)
CLOUDINARY_CLOUD_NAME=dqnffonkq
CLOUDINARY_API_KEY=134633341723411
CLOUDINARY_API_SECRET=4a7BDn1nr7dfKpVlJv1QyHiLZBM

# Admin Security (REQUIRED)
ADMIN_JWT_SECRET=<generate-random-string>

# NextAuth (REQUIRED)
NEXTAUTH_URL=https://your-site.vercel.app
NEXTAUTH_SECRET=<generate-random-string>
```

### Generate Random Secrets:

```bash
# Generate random strings for secrets
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Run this twice to get two different secrets for `ADMIN_JWT_SECRET` and `NEXTAUTH_SECRET`.

---

## 🎯 Recommended: Neon + Vercel Setup (5 minutes)

**This is the fastest way to get your app working:**

1. ✅ **Neon Database** (2 min):
   - Sign up at https://neon.tech
   - Create project
   - Copy connection string

2. ✅ **Add to Vercel** (2 min):
   - Add `DATABASE_URL` with Neon connection string
   - Add Cloudinary credentials (you already have these)
   - Add `ADMIN_JWT_SECRET` (generate random string)
   - Add `NEXTAUTH_URL` (your Vercel URL)
   - Add `NEXTAUTH_SECRET` (generate random string)

3. ✅ **Redeploy** (1 min):
   - Deployments → Redeploy

4. ✅ **Create Admin User**:
   - After deployment, visit: `https://your-site.vercel.app/api/admin/auth/setup`
   - Use Postman or curl to POST admin credentials

---

## 🔍 Troubleshooting

### "Database is not configured"
- ❌ `DATABASE_URL` not added to Vercel
- ✅ Add it and redeploy

### "Connection timeout"
- ❌ Wrong connection string
- ✅ Double-check the string from Neon/Supabase

### "SSL required"
- ❌ Missing `?sslmode=require` at end of connection string
- ✅ Add it: `postgresql://...?sslmode=require`

### "Tables don't exist"
- ❌ Haven't run `prisma db push`
- ✅ Run it locally or let Vercel build do it

---

## ✅ Verification Checklist

Before testing:

- [ ] Database created (Neon/Supabase/Local)
- [ ] `DATABASE_URL` added to Vercel environment variables
- [ ] Cloudinary credentials added to Vercel
- [ ] `ADMIN_JWT_SECRET` added to Vercel
- [ ] `NEXTAUTH_URL` added to Vercel
- [ ] `NEXTAUTH_SECRET` added to Vercel
- [ ] Application redeployed
- [ ] Admin user created via `/api/admin/auth/setup`
- [ ] Can login at `/admin/login`

---

## 🆘 Quick Help

**I just want it to work NOW:**

1. Go to https://neon.tech → Sign up → Create project
2. Copy the connection string
3. Go to Vercel → Your project → Settings → Environment Variables
4. Add `DATABASE_URL` with the connection string
5. Redeploy
6. Done! ✅

**The database error will be fixed!**

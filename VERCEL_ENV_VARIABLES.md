# 🔐 Complete Vercel Environment Variables

## ✅ Copy-Paste Ready for Vercel

Add ALL of these to: **Vercel → Your Project → Settings → Environment Variables**

---

## 1️⃣ Database (REQUIRED)

```
DATABASE_URL
```
**Value:** Get from Neon.tech or Supabase (see DATABASE_SETUP_GUIDE.md)

**Example:**
```
postgresql://username:password@ep-xxx.region.aws.neon.tech/neondb?sslmode=require
```

---

## 2️⃣ Cloudinary (REQUIRED for image uploads)

### Variable 1:
```
CLOUDINARY_CLOUD_NAME
```
**Value:**
```
dqnffonkq
```

### Variable 2:
```
CLOUDINARY_API_KEY
```
**Value:**
```
134633341723411
```

### Variable 3:
```
CLOUDINARY_API_SECRET
```
**Value:**
```
4a7BDn1nr7dfKpVlJv1QyHiLZBM
```

---

## 3️⃣ Admin Security (REQUIRED)

```
ADMIN_JWT_SECRET
```
**Value:** Generate a random string

**How to generate:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Example output:**
```
a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6q7r8s9t0u1v2w3x4y5z6
```

---

## 4️⃣ NextAuth (REQUIRED)

### Variable 1:
```
NEXTAUTH_URL
```
**Value:** Your Vercel deployment URL

**Example:**
```
https://your-site.vercel.app
```

### Variable 2:
```
NEXTAUTH_SECRET
```
**Value:** Generate another random string (different from ADMIN_JWT_SECRET)

**How to generate:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 5️⃣ Optional (for future features)

### Stripe (for payments):
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
```

### Google OAuth (for social login):
```
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
```

### GROQ API (for AI chatbot):
```
GROQ_API_KEY
```

---

## 📋 Quick Checklist

**Minimum required to fix your current errors:**

- [ ] `DATABASE_URL` (from Neon/Supabase)
- [ ] `CLOUDINARY_CLOUD_NAME` = `dqnffonkq`
- [ ] `CLOUDINARY_API_KEY` = `134633341723411`
- [ ] `CLOUDINARY_API_SECRET` = `4a7BDn1nr7dfKpVlJv1QyHiLZBM`
- [ ] `ADMIN_JWT_SECRET` (generate random string)
- [ ] `NEXTAUTH_URL` (your Vercel URL)
- [ ] `NEXTAUTH_SECRET` (generate random string)

---

## 🚀 Step-by-Step

### 1. Generate Secrets

Run this command **twice** to get two different secrets:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

Save the output:
- First one → `ADMIN_JWT_SECRET`
- Second one → `NEXTAUTH_SECRET`

### 2. Get Database URL

- Go to https://neon.tech
- Create free account
- Create project named "aashni-jewelry"
- Copy the connection string

### 3. Add to Vercel

For EACH variable:
1. Click "Add New"
2. Enter the variable name (exactly as shown above)
3. Paste the value
4. Select **all environments** (Production, Preview, Development)
5. Click "Save"

### 4. Redeploy

- Go to Deployments tab
- Click ⋮ menu on latest deployment
- Click "Redeploy"

---

## ✅ After Deployment

### Create Admin User

Use Postman, curl, or any API client to POST to:

```
https://your-site.vercel.app/api/admin/auth/setup
```

**Body (JSON):**
```json
{
  "username": "admin",
  "password": "Admin@123",
  "email": "admin@aashni.com",
  "name": "Admin User"
}
```

**Then login at:**
```
https://your-site.vercel.app/admin/login
```

---

## 🎯 Summary

**You need 7 environment variables minimum:**

1. ✅ `DATABASE_URL` - from Neon
2. ✅ `CLOUDINARY_CLOUD_NAME` - you have this
3. ✅ `CLOUDINARY_API_KEY` - you have this
4. ✅ `CLOUDINARY_API_SECRET` - you have this
5. ✅ `ADMIN_JWT_SECRET` - generate it
6. ✅ `NEXTAUTH_URL` - your Vercel URL
7. ✅ `NEXTAUTH_SECRET` - generate it

**Total time: ~10 minutes** ⏱️

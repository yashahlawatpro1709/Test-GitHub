# Vercel Deployment Guide - Environment Variables Setup

## ⚠️ CRITICAL: Required Environment Variables

Your build is failing because the **GROQ_API_KEY** environment variable is missing on Vercel. Follow these steps to fix it:

---

## 🚀 Quick Fix Steps

### 1. Go to Vercel Dashboard
1. Visit [vercel.com](https://vercel.com)
2. Select your **aashni** project
3. Click on **Settings** tab
4. Click on **Environment Variables** in the left sidebar

### 2. Add All Required Environment Variables

Add each of these variables with their corresponding values from your `.env.local` file:

#### **Database**
- `DATABASE_URL` - Your PostgreSQL connection string

#### **NextAuth**
- `NEXTAUTH_URL` - Your production URL (e.g., `https://your-domain.vercel.app`)
- `NEXTAUTH_SECRET` - Your NextAuth secret key

#### **Stripe (Payment)**
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - Your Stripe publishable key
- `STRIPE_SECRET_KEY` - Your Stripe secret key
- `STRIPE_WEBHOOK_SECRET` - Your Stripe webhook secret

#### **Cloudinary (Images)**
- `CLOUDINARY_CLOUD_NAME` - Your Cloudinary cloud name
- `CLOUDINARY_API_KEY` - Your Cloudinary API key
- `CLOUDINARY_API_SECRET` - Your Cloudinary API secret

#### **🔴 GROQ API (Chatbot) - MISSING!**
- `GROQ_API_KEY` - Your Groq API key (e.g., `gsk_...`)

#### **Admin Dashboard**
- `ADMIN_JWT_SECRET` - Your admin JWT secret

#### **Optional OAuth**
- `GOOGLE_CLIENT_ID` - Google OAuth client ID (if using Google login)
- `GOOGLE_CLIENT_SECRET` - Google OAuth client secret (if using Google login)

---

## 📝 How to Add Environment Variables on Vercel

### Method 1: Via Vercel Dashboard (Recommended)

1. **Navigate to Settings**
   ```
   Project → Settings → Environment Variables
   ```

2. **For each variable:**
   - Enter the **Key** (e.g., `GROQ_API_KEY`)
   - Enter the **Value** (e.g., `gsk_your_actual_key_here`)
   - Select environments: **Production**, **Preview**, and **Development**
   - Click **Save**

3. **After adding all variables:**
   - Go to **Deployments** tab
   - Click the **three dots** on the latest deployment
   - Click **Redeploy**
   - Select **Use existing Build Cache** (optional)
   - Click **Redeploy**

### Method 2: Via Vercel CLI

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Login to Vercel
vercel login

# Link your project
vercel link

# Add environment variables
vercel env add GROQ_API_KEY production
vercel env add GROQ_API_KEY preview
vercel env add GROQ_API_KEY development

# Repeat for all other variables...

# Redeploy
vercel --prod
```

---

## 🔑 Getting Your GROQ API Key

If you don't have a GROQ API key yet:

1. Visit [console.groq.com](https://console.groq.com)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Click **Create API Key**
5. Copy the key (starts with `gsk_`)
6. Add it to Vercel as shown above

---

## ✅ Verification Checklist

After adding all environment variables:

- [ ] All environment variables are added to Vercel
- [ ] Variables are set for **Production**, **Preview**, and **Development**
- [ ] GROQ_API_KEY is correctly added (starts with `gsk_`)
- [ ] Redeployed the project on Vercel
- [ ] Build completed successfully
- [ ] Chatbot is working on the deployed site

---

## 🐛 Troubleshooting

### Build Still Failing?

1. **Check Variable Names**: Ensure they match exactly (case-sensitive)
2. **Check for Typos**: Verify all keys and values are correct
3. **Clear Build Cache**: Redeploy without using existing build cache
4. **Check Logs**: View build logs in Vercel dashboard for specific errors

### Common Issues

**Issue**: "GROQ_API_KEY is missing or empty"
- **Solution**: Make sure you added `GROQ_API_KEY` to all three environments (Production, Preview, Development)

**Issue**: "Database connection failed"
- **Solution**: Verify your `DATABASE_URL` is correct and the database is accessible from Vercel

**Issue**: "Stripe keys invalid"
- **Solution**: Make sure you're using the correct Stripe keys for your environment (test keys for development, live keys for production)

---

## 📞 Need Help?

If you're still experiencing issues:
1. Check the Vercel deployment logs for specific error messages
2. Verify all environment variables are correctly set
3. Ensure your database is accessible from Vercel's servers
4. Contact Vercel support if the issue persists

---

## 🎉 Success!

Once all environment variables are set and the deployment succeeds, your AASHNI jewelry website will be live with:
- ✅ Working chatbot (powered by Groq)
- ✅ Payment processing (Stripe)
- ✅ Image uploads (Cloudinary)
- ✅ User authentication (NextAuth)
- ✅ Admin dashboard

---

**Last Updated**: October 2024

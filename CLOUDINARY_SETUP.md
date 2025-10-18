# 🖼️ Cloudinary Setup Guide for Image Uploads

## Why Cloudinary is Required

Your application is deployed on **Vercel**, which uses a **serverless architecture** with a **read-only filesystem**. This means:

- ❌ You **cannot** save uploaded files directly to the server
- ✅ You **must** use a cloud storage service like Cloudinary
- 🔒 Cloudinary provides secure, scalable image hosting and optimization

---

## 📋 Step-by-Step Setup

### 1. Create a Free Cloudinary Account

1. Go to [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. Sign up with your email or Google account
3. Verify your email address
4. Complete the onboarding process

**Free tier includes:**
- ✅ 25 GB storage
- ✅ 25 GB monthly bandwidth
- ✅ Image transformations and optimization
- ✅ More than enough for most jewelry e-commerce sites

---

### 2. Get Your Cloudinary Credentials

After logging in to your Cloudinary dashboard:

1. Click on **Dashboard** (top navigation)
2. You'll see your credentials in the **Account Details** section:
   - **Cloud Name** (e.g., `dxyz123abc`)
   - **API Key** (e.g., `123456789012345`)
   - **API Secret** (e.g., `abcdefghijklmnopqrstuvwxyz123`)

⚠️ **Keep your API Secret private!** Never commit it to Git or share it publicly.

---

### 3. Add Credentials to Vercel

#### Option A: Via Vercel Dashboard (Recommended)

1. Go to [https://vercel.com](https://vercel.com)
2. Select your **aashni** project
3. Click **Settings** → **Environment Variables**
4. Add these three variables:

| Variable Name | Value | Environment |
|--------------|-------|-------------|
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | Production, Preview, Development |
| `CLOUDINARY_API_KEY` | Your API key | Production, Preview, Development |
| `CLOUDINARY_API_SECRET` | Your API secret | Production, Preview, Development |

5. Click **Save** for each variable

#### Option B: Via Vercel CLI

```bash
# Install Vercel CLI if you haven't
npm i -g vercel

# Add environment variables
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

---

### 4. Redeploy Your Application

After adding the environment variables:

1. Go to your Vercel project dashboard
2. Click **Deployments** tab
3. Find the latest deployment
4. Click the **⋮** menu → **Redeploy**
5. Select **Use existing Build Cache** (optional, faster)
6. Click **Redeploy**

**OR** push a new commit to trigger automatic deployment:

```bash
git commit --allow-empty -m "Trigger redeploy with Cloudinary config"
git push
```

---

### 5. Test Image Upload

1. Go to your deployed site: `https://your-site.vercel.app/admin/login`
2. Log in to the admin dashboard
3. Navigate to any section (e.g., **Home** → **Hero**)
4. Try uploading an image
5. ✅ Upload should now work successfully!

---

## 🔍 Troubleshooting

### Error: "Cloudinary configuration required"

**Cause:** Environment variables are not set in Vercel

**Solution:**
1. Verify all three Cloudinary variables are added in Vercel
2. Make sure they're set for **Production** environment
3. Redeploy your application

---

### Error: "Invalid API Key"

**Cause:** Incorrect Cloudinary credentials

**Solution:**
1. Double-check your credentials in Cloudinary dashboard
2. Make sure there are no extra spaces or characters
3. Update the environment variables in Vercel
4. Redeploy

---

### Error: "Upload failed"

**Cause:** Network issues or file size too large

**Solution:**
1. Check your internet connection
2. Ensure image is under 10MB
3. Use JPG, PNG, or WebP format (not SVG)
4. Try a different image

---

### Images Upload but Don't Display

**Cause:** Next.js image configuration issue

**Solution:**
1. Verify `next.config.mjs` includes Cloudinary in `remotePatterns`:
   ```javascript
   {
     protocol: 'https',
     hostname: 'res.cloudinary.com',
     port: '',
     pathname: '/**',
   }
   ```
2. Redeploy if you made changes

---

## 🎯 Best Practices

### Image Optimization

Cloudinary automatically optimizes images, but you can help:

- ✅ Upload high-quality images (at least 1920px wide for hero images)
- ✅ Use JPG for photos, PNG for graphics with transparency
- ✅ Keep file sizes reasonable (under 5MB when possible)
- ✅ Use descriptive filenames

### Security

- 🔒 Never commit `.env.local` to Git
- 🔒 Keep your API Secret private
- 🔒 Use environment variables for all sensitive data
- 🔒 Regularly rotate your API credentials

### Organization

Cloudinary automatically organizes your images by section:
- `aashni/hero/` - Hero section images
- `aashni/featured-collections/` - Featured collections
- `aashni/new-arrivals/` - New arrivals
- etc.

---

## 📚 Additional Resources

- [Cloudinary Documentation](https://cloudinary.com/documentation)
- [Cloudinary Next.js Integration](https://cloudinary.com/documentation/next_integration)
- [Vercel Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)

---

## ✅ Verification Checklist

Before considering setup complete:

- [ ] Cloudinary account created
- [ ] All three environment variables added to Vercel
- [ ] Application redeployed
- [ ] Test image upload successful
- [ ] Uploaded image displays correctly on site
- [ ] Admin dashboard shows uploaded images

---

## 🆘 Still Having Issues?

If you're still experiencing problems:

1. Check Vercel deployment logs for specific error messages
2. Verify Cloudinary dashboard shows recent uploads
3. Test in incognito/private browsing mode
4. Clear browser cache and cookies
5. Check browser console for JavaScript errors

**Common issue:** If login works but uploads fail, it's almost always a missing or incorrect Cloudinary environment variable.

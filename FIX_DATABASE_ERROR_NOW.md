# 🚨 FIX: "Database is not configured" Error

## ⚡ Quick Fix (10 Minutes)

### Step 1: Create Free Database (2 minutes)

1. Go to: **https://neon.tech**
2. Click **"Sign Up"** (use Google/GitHub for faster signup)
3. Click **"Create a project"**
   - Name: `aashni-jewelry`
   - Region: Choose closest to you
   - Click **"Create project"**
4. **Copy the connection string** that appears (looks like `postgresql://...`)

---

### Step 2: Add Environment Variables to Vercel (5 minutes)

Go to: **https://vercel.com** → Your Project → **Settings** → **Environment Variables**

Add these **7 variables** (click "Add New" for each):

#### 1. DATABASE_URL
- **Value:** `<paste your Neon connection string from Step 1>`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 2. CLOUDINARY_CLOUD_NAME
- **Value:** `dqnffonkq`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 3. CLOUDINARY_API_KEY
- **Value:** `134633341723411`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 4. CLOUDINARY_API_SECRET
- **Value:** `4a7BDn1nr7dfKpVlJv1QyHiLZBM`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 5. ADMIN_JWT_SECRET
- **Value:** `5f8d524939ea00898619c328fa5e2ace4ff15357fb0af9a8ee6b192e1681c013`
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 6. NEXTAUTH_URL
- **Value:** `https://your-actual-site.vercel.app` (replace with your real URL)
- **Environments:** ✅ Production ✅ Preview ✅ Development

#### 7. NEXTAUTH_SECRET
- **Value:** `32b8678e8dd20e22f9792b41c70854764a54d6490ff97a346a3a02dd4a01e3f1`
- **Environments:** ✅ Production ✅ Preview ✅ Development

---

### Step 3: Redeploy (1 minute)

1. Go to **Deployments** tab
2. Click the **⋮** (three dots) menu on your latest deployment
3. Click **"Redeploy"**
4. Wait for deployment to complete (~2 minutes)

---

### Step 4: Create Admin User (2 minutes)

After deployment completes, you need to create an admin user.

**Option A: Using Browser + Developer Tools**

1. Open your deployed site: `https://your-site.vercel.app`
2. Open browser Developer Tools (F12 or Right-click → Inspect)
3. Go to **Console** tab
4. Paste this code and press Enter:

```javascript
fetch('https://your-site.vercel.app/api/admin/auth/setup', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    username: 'admin',
    password: 'Admin@123',
    email: 'admin@aashni.com',
    name: 'Admin User'
  })
})
.then(r => r.json())
.then(data => console.log('Admin created:', data))
.catch(err => console.error('Error:', err));
```

**Option B: Using curl (Terminal/Command Prompt)**

```bash
curl -X POST https://your-site.vercel.app/api/admin/auth/setup \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"Admin@123","email":"admin@aashni.com","name":"Admin User"}'
```

**Option C: Using Postman**

- Method: POST
- URL: `https://your-site.vercel.app/api/admin/auth/setup`
- Headers: `Content-Type: application/json`
- Body (raw JSON):
```json
{
  "username": "admin",
  "password": "Admin@123",
  "email": "admin@aashni.com",
  "name": "Admin User"
}
```

---

### Step 5: Login and Test (1 minute)

1. Go to: `https://your-site.vercel.app/admin/login`
2. Username: `admin`
3. Password: `Admin@123`
4. Click **Login**
5. ✅ You should be in the admin dashboard!
6. Try uploading an image to test everything works

---

## 📋 Summary of What You Added

| Variable | Purpose | Value |
|----------|---------|-------|
| `DATABASE_URL` | PostgreSQL database | From Neon.tech |
| `CLOUDINARY_CLOUD_NAME` | Image storage | `dqnffonkq` |
| `CLOUDINARY_API_KEY` | Image storage | `134633341723411` |
| `CLOUDINARY_API_SECRET` | Image storage | `4a7BDn1nr7dfKpVlJv1QyHiLZBM` |
| `ADMIN_JWT_SECRET` | Admin security | Generated secret |
| `NEXTAUTH_URL` | Auth system | Your Vercel URL |
| `NEXTAUTH_SECRET` | Auth security | Generated secret |

---

## ✅ Verification Checklist

- [ ] Created Neon database
- [ ] Added all 7 environment variables to Vercel
- [ ] Selected ALL environments for each variable
- [ ] Redeployed application
- [ ] Created admin user via setup endpoint
- [ ] Successfully logged into admin dashboard
- [ ] Tested image upload

---

## 🆘 Troubleshooting

### Still getting "Database is not configured"?
- ✅ Check that `DATABASE_URL` is added to Vercel
- ✅ Make sure you selected "Production" environment
- ✅ Redeploy after adding variables

### Can't create admin user?
- ✅ Make sure deployment finished successfully
- ✅ Check the setup endpoint URL is correct
- ✅ Look at Vercel logs for errors

### Image upload still fails?
- ✅ Verify all 3 Cloudinary variables are added
- ✅ Check for typos in the values
- ✅ Redeploy after adding

### Login doesn't work?
- ✅ Make sure you created the admin user first
- ✅ Use exact credentials: username `admin`, password `Admin@123`
- ✅ Clear browser cache and cookies

---

## 🎉 Success!

Once all steps are complete:
- ✅ Database error will be gone
- ✅ Admin login will work
- ✅ Image uploads will work
- ✅ Your jewelry e-commerce site is ready!

**Total time: ~10 minutes** ⏱️

---

## 🔒 Security Note

**After everything works:**

1. Change the default admin password:
   - Login to admin dashboard
   - Go to settings (if available)
   - Or create a new admin with a stronger password

2. Keep your secrets secure:
   - Never commit `.env` files to Git
   - Don't share your Cloudinary or database credentials
   - Use strong, unique passwords

---

## 📞 Need Help?

If you're still stuck:
1. Check Vercel deployment logs for specific errors
2. Verify all environment variables are spelled correctly
3. Make sure Neon database is active (check Neon dashboard)
4. Try redeploying one more time

**Your app will work once all 7 variables are added!** 🚀

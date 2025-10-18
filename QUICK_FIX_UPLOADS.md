# 🚨 Quick Fix for Upload Error

## Problem
Upload failing with: "Please ensure BLOB_READ_WRITE_TOKEN is set in Vercel environment variables"

## ✅ Solution: Get the Blob Token

### Step 1: Find Your Blob Store Token

1. **Go to Vercel Dashboard**
2. **Click "Storage" tab**
3. **Click on your Blob store** (you should see it listed)
4. **Look for "Read-Write Token" or "Tokens" section**
5. **Copy the token** (it's a long string starting with `vercel_blob_rw_`)

### Step 2: Add Token to Environment Variables

1. **Go to Settings → Environment Variables**
2. **Click "Add New"**
3. **Enter:**
   - Key: `BLOB_READ_WRITE_TOKEN`
   - Value: `<paste the token you copied>`
   - Environments: ✅ Production ✅ Preview ✅ Development
4. **Click Save**

### Step 3: Redeploy

1. **Go to Deployments tab**
2. **Click ⋮ on latest deployment**
3. **Click "Redeploy"**
4. **Wait for deployment to complete**

### Step 4: Test Upload

Try uploading an image again - it should work!

---

## 🔍 Can't Find the Token?

If you can't find the Blob token, here's an alternative:

### Delete and Recreate Blob Storage:

1. **Storage tab → Click on your Blob store**
2. **Settings → Delete Store** (if option available)
3. **Create new Blob store:**
   - Storage → Create Database → Blob → Continue
4. **This time, copy the token when it's shown**
5. **Add it to Environment Variables**

---

## 📸 Where to Find the Token

The token location in Vercel:
- Storage → [Your Blob Store Name] → Settings or Tokens tab
- OR it might be shown immediately after creating the store

The token format looks like:
```
vercel_blob_rw_XXXXXXXXXXXXXXXX_YYYYYYYYYYYYYYYYYYYYYYYY
```

---

## ⚡ Alternative: Check Environment Variables

The token might already be there! Check:
1. Settings → Environment Variables
2. Look for `BLOB_READ_WRITE_TOKEN`
3. If it exists but upload still fails, try redeploying

---

## 🆘 Still Not Working?

If you still can't find the token, let me know and I'll switch to a different upload solution (UploadThing or direct S3).

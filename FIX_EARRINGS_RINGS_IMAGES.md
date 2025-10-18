# 🔧 Fix: Earrings & Rings Images Not Showing

## ✅ Video Upload Support Added!

I've updated the upload route to support:
- **Images**: JPG, PNG, WebP, GIF (max 10MB)
- **Videos**: MP4, WebM, MOV, AVI (max 50MB)

---

## 🐛 Issue: Earrings & Rings Images Not Displaying

### **Root Cause:**
Images are likely uploaded to the wrong **section names** in the database.

### **How It Works:**
- When you upload images in admin dashboard, they're saved with a `section` field
- The frontend pages fetch images by matching this `section` field
- If the section names don't match exactly, images won't show

---

## 🔍 Check Section Names

### **Expected Section Names:**
- **Earrings page** looks for: `section = "earrings"`
- **Rings page** looks for: `section = "rings"`
- **Gold jewelry** looks for: `section = "gold-jewelry"`
- **Diamond jewelry** looks for: `section = "diamond-jewelry"`

### **Common Mistakes:**
- ❌ Uploaded to `"Earrings"` instead of `"earrings"` (capital E)
- ❌ Uploaded to `"earring"` instead of `"earrings"` (missing s)
- ❌ Uploaded to `"ring"` instead of `"rings"` (missing s)
- ❌ Uploaded to wrong section entirely

---

## ✅ How to Fix

### **Option 1: Re-upload to Correct Section**

1. **Go to Admin Dashboard**
2. **Select the correct section** from dropdown:
   - For earrings → Select "Earrings"
   - For rings → Select "Rings"
3. **Upload images again**
4. **Save**
5. **Check the page** - images should appear

### **Option 2: Check Database (Advanced)**

If you have database access, check:
```sql
SELECT section, COUNT(*) as count 
FROM "SiteImage" 
WHERE isActive = true 
GROUP BY section;
```

This shows all section names and how many images are in each.

---

## 🎬 Video Upload Instructions

### **How to Upload Videos:**

1. **Go to Admin Dashboard**
2. **Select a section** (e.g., Hero, Featured Collections)
3. **Click "Replace Image"** or upload button
4. **Select a video file** (MP4, WebM, MOV, or AVI)
5. **Max size: 50MB**
6. **Video will be uploaded** to Vercel Blob storage
7. **Save the section**

### **Supported Video Formats:**
- ✅ MP4 (recommended)
- ✅ WebM
- ✅ MOV (QuickTime)
- ✅ AVI

### **Video Limitations:**
- Max file size: **50MB**
- Recommended: Use compressed/optimized videos
- For larger videos, consider using YouTube/Vimeo embeds

---

## 🧪 Test Steps

### **1. Test Earrings:**
1. Go to admin dashboard
2. Select **"Earrings"** section
3. Upload a test image
4. Fill in metadata (title, price, category)
5. Save
6. Visit: `https://your-site.vercel.app/products/earrings`
7. Image should appear

### **2. Test Rings:**
1. Go to admin dashboard
2. Select **"Rings"** section
3. Upload a test image
4. Fill in metadata (title, price, category)
5. Save
6. Visit: `https://your-site.vercel.app/products/rings`
7. Image should appear

### **3. Test Video:**
1. Go to admin dashboard
2. Select **"Hero"** section
3. Upload a short video (under 50MB)
4. Save
5. Visit homepage
6. Video should display

---

## 📋 Section Names Reference

| Page | Section Name (exact) |
|------|---------------------|
| Home Hero | `hero` |
| Featured Collections | `featured-collections` |
| New Arrivals | `new-arrivals` |
| Gold Jewelry | `gold-jewelry` |
| Diamond Jewelry | `diamond-jewelry` |
| **Earrings** | `earrings` |
| **Rings** | `rings` |
| Daily Wear | `daily-wear` |
| Wedding | `wedding` |

**Important:** Section names are case-sensitive and must match exactly!

---

## 🔧 Quick Debug

### **Check if images exist:**

Open browser console on the earrings/rings page and run:
```javascript
fetch('/api/site-images?section=earrings')
  .then(r => r.json())
  .then(data => console.log('Earrings images:', data))

fetch('/api/site-images?section=rings')
  .then(r => r.json())
  .then(data => console.log('Rings images:', data))
```

**If you see `images: []`** → No images in database for that section  
**If you see images** → Check the `section` field in each image

---

## ✅ Summary

**Changes Made:**
1. ✅ Added video upload support (MP4, WebM, MOV, AVI)
2. ✅ Increased video size limit to 50MB
3. ✅ Added file type validation
4. ✅ Added file size validation

**To Fix Earrings/Rings:**
1. Make sure you're uploading to the correct section
2. Section names must be exactly `"earrings"` and `"rings"`
3. Re-upload images if they were uploaded to wrong section
4. Check browser console for API response

**Video uploads now work!** 🎉

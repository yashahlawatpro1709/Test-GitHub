# 🧪 Local Testing Guide

## ✅ Server is Running!

Your dev server is now running at: **http://localhost:3001**

---

## 🎯 Test 1: Video Upload

### **Steps:**

1. **Go to:** http://localhost:3001/admin/login
2. **Login:** admin / Admin@123
3. **Select "Hero" section** from dropdown
4. **Click "Replace Image"** button
5. **Select a video file** from your computer:
   - Supported: MP4, WebM, MOV, AVI
   - Max size: 50MB
6. **Upload should work!**
7. **Video will be saved** to `public/uploads/hero/` folder

### **Expected Result:**
- ✅ Upload succeeds
- ✅ Video saved locally
- ✅ You see success message

### **If it fails:**
- Check file size (must be under 50MB)
- Check file format (MP4 recommended)
- Check console for error messages

---

## 🎯 Test 2: Check Earrings Images

### **Steps:**

1. **In Admin Dashboard**, select **"Earrings"** from section dropdown
2. **Check if any images are shown**
3. **If NO images:**
   - Upload a test image
   - Fill in metadata (title, price, category)
   - Click "Save Hero Text"
4. **Go to:** http://localhost:3001/products/earrings
5. **Check if image appears**

### **Debug in Browser Console:**

Open browser console (F12) and run:
```javascript
fetch('http://localhost:3001/api/site-images?section=earrings')
  .then(r => r.json())
  .then(data => console.log('Earrings images:', data))
```

**Expected:** You should see `images: [...]` with your uploaded images

**If empty:** Images were uploaded to wrong section

---

## 🎯 Test 3: Check Rings Images

### **Steps:**

1. **In Admin Dashboard**, select **"Rings"** from section dropdown
2. **Check if any images are shown**
3. **If NO images:**
   - Upload a test image
   - Fill in metadata (title, price, category)
   - Click "Save Hero Text"
4. **Go to:** http://localhost:3001/products/rings
5. **Check if image appears**

### **Debug in Browser Console:**

```javascript
fetch('http://localhost:3001/api/site-images?section=rings')
  .then(r => r.json())
  .then(data => console.log('Rings images:', data))
```

---

## 🎯 Test 4: Check All Sections

### **Run this in browser console:**

```javascript
const sections = ['hero', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear'];

sections.forEach(section => {
  fetch(`http://localhost:3001/api/site-images?section=${section}`)
    .then(r => r.json())
    .then(data => {
      console.log(`${section}: ${data.images?.length || 0} images`);
      if (data.images?.length > 0) {
        console.log(`  First image:`, data.images[0]);
      }
    });
});
```

**This will show you:**
- How many images are in each section
- The first image in each section
- Which sections have images and which don't

---

## 🔍 Common Issues & Solutions

### **Issue 1: "No images found for earrings/rings"**

**Cause:** Images uploaded to wrong section

**Solution:**
1. Check what section the images are actually in (use Test 4 above)
2. Re-upload to correct section
3. Make sure section dropdown shows "Earrings" or "Rings" exactly

### **Issue 2: "Video upload fails"**

**Cause:** File too large or wrong format

**Solution:**
1. Check file size (must be under 50MB)
2. Use MP4 format (most compatible)
3. Compress video if needed
4. Check browser console for specific error

### **Issue 3: "Images show in admin but not on page"**

**Cause:** Metadata missing or incorrect

**Solution:**
1. Make sure you filled in:
   - Title
   - Price
   - Category
2. Click "Save" button
3. Refresh the page

---

## 📁 Where Files Are Saved Locally

**Images & Videos are saved to:**
```
/public/uploads/{section}/{timestamp}-{filename}
```

**Examples:**
- Hero image: `/public/uploads/hero/1729234567890-hero-image.jpg`
- Earrings: `/public/uploads/earrings/1729234567890-earring.jpg`
- Hero video: `/public/uploads/hero/1729234567890-hero-video.mp4`

**You can check these folders** to see if files are actually being saved.

---

## ✅ Testing Checklist

- [ ] Login to admin dashboard works
- [ ] Can select different sections from dropdown
- [ ] Can upload images (JPG, PNG, WebP)
- [ ] Can upload videos (MP4, WebM, MOV)
- [ ] Images appear in admin after upload
- [ ] Images appear on frontend pages
- [ ] Earrings page shows earrings images
- [ ] Rings page shows rings images
- [ ] Gold jewelry page shows images
- [ ] Diamond jewelry page shows images

---

## 🆘 If Something Doesn't Work

1. **Check browser console** (F12 → Console tab)
2. **Check terminal** where dev server is running
3. **Check the section name** in admin dropdown
4. **Run the debug scripts** above to see what's in database
5. **Check `/public/uploads/` folder** to see if files are saved

---

## 🎉 Ready to Test!

**Your server is running at:** http://localhost:3001/admin/login

**Start with:**
1. Login
2. Try uploading a video to Hero section
3. Check if earrings/rings sections have images
4. Run the debug scripts to see what's in database

**Let me know what you find!** 🚀

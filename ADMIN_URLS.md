# Admin Dashboard URLs

## 🔗 Access Points

### Main Application
- **Homepage**: http://localhost:3001/

### Admin Dashboard

1. **Admin Setup** (First Time Only)
   - URL: http://localhost:3001/admin/setup
   - Use this to create your first admin account
   - Only works when no admin exists

2. **Admin Login**
   - URL: http://localhost:3001/admin/login
   - Login with your username and password

3. **Admin Dashboard** (Image Management)
   - URL: http://localhost:3001/admin/dashboard
   - Requires login
   - Upload and manage images for all sections

4. **Admin Index** (Auto-redirects to login)
   - URL: http://localhost:3001/admin

## 📋 Step-by-Step Guide

### First Time Setup

1. **Start the server** (if not running):
   ```bash
   npm run dev
   ```

2. **Create Admin Account**:
   - Visit: http://localhost:3001/admin/setup
   - Fill in:
     - Username: (choose any username)
     - Password: (minimum 8 characters)
     - Name: (optional)
     - Email: (optional)
   - Click "Create Admin Account"

3. **Login**:
   - Visit: http://localhost:3001/admin/login
   - Enter your username and password
   - Click "Login"

4. **Upload Images**:
   - You'll be redirected to: http://localhost:3001/admin/dashboard
   - Select a section (Hero Section, Featured Collections, etc.)
   - Click "Upload" on any image slot
   - Select an image from your computer
   - Wait for upload to complete

## 🎯 Available Sections

Once logged in, you can upload images for:

1. **Hero Section** - 12 carousel slides
2. **Featured Collections** - 3 collection images
3. **Brand Story** - 2 images
4. **Product Showcase** - 6 product images
5. **Testimonials** - 3 testimonial images

## ⚠️ Troubleshooting

### "Nothing shows on the UI"
- Make sure you're visiting the correct URL
- Check if the server is running: `lsof -ti:3001`
- Clear browser cache and reload
- Check browser console for errors (F12)

### "Admin already exists" error
- You've already created an admin
- Go directly to login: http://localhost:3001/admin/login

### "Unauthorized" error
- Your session expired
- Login again at: http://localhost:3001/admin/login

### Upload fails
- Check Cloudinary credentials in `.env.local`
- Verify file size (keep under 5MB)
- Check browser console for errors

## 🔐 Security Notes

- Admin pages are protected by authentication
- Sessions last 7 days
- Passwords are hashed with bcrypt
- Use HTTPS in production

## 📱 Browser Compatibility

Works best on:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## 🆘 Quick Commands

```bash
# Start development server
npm run dev

# Stop server
# Press Ctrl+C in terminal

# Restart server
npm run kill:ports && npm run dev

# Check if server is running
lsof -ti:3001

# View logs
# Check the terminal where you ran npm run dev
```

---

**Current Server**: http://localhost:3001  
**Admin Login**: http://localhost:3001/admin/login  
**Admin Dashboard**: http://localhost:3001/admin/dashboard

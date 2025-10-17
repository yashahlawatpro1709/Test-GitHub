# Quick Start - Admin Dashboard

## 🚀 Get Started in 3 Steps

### Step 1: Setup Database
```bash
npx prisma db push
```

### Step 2: Create Admin Account
1. Visit: `http://localhost:3001/admin/setup`
2. Create your admin credentials
3. Click "Create Admin Account"

### Step 3: Login & Upload
1. Visit: `http://localhost:3001/admin/login`
2. Login with your credentials
3. Select a section and start uploading images!

## 📸 Available Sections

| Section | Number of Images | Image Keys |
|---------|------------------|------------|
| **Hero Section** | 12 | slide-1 to slide-12 |
| **Featured Collections** | 3 | collection-1 to collection-3 |
| **Brand Story** | 2 | main-image, secondary-image |
| **Product Showcase** | 6 | product-1 to product-6 |
| **Testimonials** | 3 | testimonial-1 to testimonial-3 |

## 🔑 Required Environment Variables

Add to your `.env.local`:

```env
# Cloudinary (Required)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Optional
ADMIN_JWT_SECRET="your-secret-key"
```

## 📝 Common Commands

```bash
# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# Start development server
npm run dev
```

## 🎯 Access Points

- **Setup**: `/admin/setup` (first time only)
- **Login**: `/admin/login`
- **Dashboard**: `/admin/dashboard`

## ⚠️ Important Notes

1. **Setup page** only works once (when no admin exists)
2. **Cloudinary** credentials are required for uploads
3. **Session** lasts 7 days
4. **Images** are automatically organized by section
5. **File size** limit: 10MB (recommended: under 2MB)

## 🆘 Troubleshooting

**Can't login?**
- Check username/password
- Verify admin was created successfully

**Upload fails?**
- Verify Cloudinary credentials
- Check file size and format
- Check browser console for errors

**Type errors?**
- Run `npx prisma generate`

**Database errors?**
- Run `npx prisma db push`

---

For detailed documentation, see [ADMIN_SETUP.md](./ADMIN_SETUP.md)

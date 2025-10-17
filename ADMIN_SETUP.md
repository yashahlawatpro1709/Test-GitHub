# Admin Dashboard Setup Guide

This guide will help you set up and use the admin dashboard for managing images across your AASHNI jewelry platform.

## Features

The admin dashboard provides:

- **Secure Authentication**: Username/password login with JWT-based sessions
- **Image Management**: Upload and manage images for all sections of the website
- **Section-based Organization**: Manage images for:
  - Hero Section (12 slides)
  - Featured Collections (3 collections)
  - Brand Story (2 images)
  - Product Showcase (6 products)
  - Testimonials (3 testimonials)
- **Cloudinary Integration**: Automatic image upload to Cloudinary CDN
- **Real-time Preview**: See uploaded images immediately

## Initial Setup

### 1. Environment Variables

Make sure your `.env.local` file includes:

```env
# Database
DATABASE_URL="your-postgresql-connection-string"

# Cloudinary (Required for image uploads)
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"

# Admin JWT Secret (Optional - will use default if not set)
ADMIN_JWT_SECRET="your-secure-random-string-here"
```

### 2. Database Migration

Run the following command to update your database schema:

```bash
npx prisma db push
```

Or if you prefer migrations:

```bash
npx prisma migrate dev --name add_admin_and_site_images
```

### 3. Create Admin Account

**First Time Setup:**

1. Navigate to: `http://localhost:3001/admin/setup`
2. Fill in the form:
   - **Username**: Choose a unique username
   - **Password**: Minimum 8 characters
   - **Name**: Your full name (optional)
   - **Email**: Your email (optional)
3. Click "Create Admin Account"

**Important**: The setup page only works when no admin exists. After creating the first admin, this page will be disabled.

## Using the Admin Dashboard

### Login

1. Navigate to: `http://localhost:3001/admin/login`
2. Enter your username and password
3. Click "Login"

### Managing Images

1. **Select a Section**: Click on one of the section buttons (Hero Section, Featured Collections, etc.)
2. **Upload Images**: 
   - Click the "Upload" or "Replace" button for any image slot
   - Select an image from your computer
   - Wait for the upload to complete
3. **Delete Images**: Click the trash icon to remove an image
4. **Preview**: All uploaded images are displayed in real-time

### Image Sections

#### Hero Section
- **12 slides** for the homepage carousel
- Each slide can have a unique image
- Images are labeled as `slide-1` through `slide-12`

#### Featured Collections
- **3 collection images**
- Labeled as `collection-1`, `collection-2`, `collection-3`

#### Brand Story
- **2 images**: `main-image` and `secondary-image`
- Used in the about/brand story section

#### Product Showcase
- **6 product images**
- Labeled as `product-1` through `product-6`

#### Testimonials
- **3 testimonial images**
- Labeled as `testimonial-1` through `testimonial-3`

## Security Features

- **JWT-based Authentication**: Secure session management
- **HTTP-only Cookies**: Prevents XSS attacks
- **Password Hashing**: Uses bcrypt with 12 rounds
- **Protected Routes**: All admin APIs require authentication
- **7-day Session**: Automatic logout after 7 days

## API Endpoints

### Authentication

- `POST /api/admin/auth/setup` - Create first admin (one-time only)
- `POST /api/admin/auth/login` - Login
- `POST /api/admin/auth/logout` - Logout
- `GET /api/admin/auth/session` - Check session status

### Image Management

- `GET /api/admin/images?section=hero` - Get images for a section
- `POST /api/admin/images` - Create or update an image
- `DELETE /api/admin/images?id=xxx` - Delete an image
- `POST /api/admin/upload` - Upload file to Cloudinary

## Troubleshooting

### Cannot Access Setup Page

**Error**: "Admin already exists"
- **Solution**: An admin account has already been created. Use the login page instead.

### Upload Failed

**Error**: "Upload failed"
- **Check**: Cloudinary credentials in `.env.local`
- **Check**: File size (recommended max 5MB)
- **Check**: File format (JPG, PNG, WebP supported)

### Session Expired

**Error**: "Unauthorized"
- **Solution**: Your session has expired. Login again at `/admin/login`

### Database Errors

**Error**: "Property 'admin' does not exist"
- **Solution**: Run `npx prisma generate` to regenerate the Prisma client

## Best Practices

1. **Image Optimization**:
   - Use high-quality images (1920x1080 or higher for hero)
   - Keep file sizes under 2MB for faster loading
   - Use WebP format when possible

2. **Naming Convention**:
   - Images are automatically organized by section
   - Use descriptive alt text when possible

3. **Backup**:
   - All images are stored in Cloudinary
   - Database stores URLs and metadata
   - Regular database backups recommended

4. **Security**:
   - Use a strong password (12+ characters)
   - Change the `ADMIN_JWT_SECRET` in production
   - Keep your credentials secure
   - Don't share admin access

## Adding More Admins

To add additional admin accounts, you'll need to:

1. Remove the "existing admin" check in `/api/admin/auth/setup/route.ts`
2. Or create a new admin management page
3. Or use a database tool to insert directly

## Updating the Schema

If you need to add more sections or image slots:

1. Update the `SECTIONS` array in `/src/app/admin/dashboard/page.tsx`
2. Add new sections with their respective image keys
3. The system will automatically create upload slots

Example:
```typescript
const SECTIONS = [
  // ... existing sections
  { 
    id: 'new-section', 
    name: 'New Section', 
    keys: ['image-1', 'image-2'] 
  },
]
```

## Support

For issues or questions:
- Check the console for error messages
- Verify environment variables are set correctly
- Ensure database is accessible
- Check Cloudinary dashboard for upload status

## Production Deployment

Before deploying to production:

1. ✅ Set strong `ADMIN_JWT_SECRET`
2. ✅ Use production Cloudinary credentials
3. ✅ Enable HTTPS (required for secure cookies)
4. ✅ Set `NEXTAUTH_URL` to your production domain
5. ✅ Run database migrations
6. ✅ Create admin account via setup page
7. ✅ Test image uploads
8. ✅ Verify authentication works

## File Structure

```
src/
├── app/
│   ├── admin/
│   │   ├── dashboard/
│   │   │   └── page.tsx          # Main dashboard
│   │   ├── login/
│   │   │   └── page.tsx          # Login page
│   │   └── setup/
│   │       └── page.tsx          # Initial setup
│   └── api/
│       └── admin/
│           ├── auth/
│           │   ├── login/        # Login endpoint
│           │   ├── logout/       # Logout endpoint
│           │   ├── session/      # Session check
│           │   └── setup/        # Setup endpoint
│           ├── images/           # Image CRUD
│           └── upload/           # File upload
├── lib/
│   ├── auth.ts                   # Auth utilities
│   └── prisma.ts                 # Prisma client
└── hooks/
    └── use-toast.ts              # Toast notifications

prisma/
└── schema.prisma                 # Database schema
```

---

**Version**: 1.0.0  
**Last Updated**: 2025-10-09

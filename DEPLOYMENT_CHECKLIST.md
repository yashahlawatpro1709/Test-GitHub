# 🚀 Deployment Checklist - AASHNI Jewelry Platform

## ✅ Pre-Deployment (Completed)

### Code Fixes
- [x] Fixed GROQ API key build error (moved to runtime initialization)
- [x] Fixed Stripe client null safety
- [x] Added all environment variables to next.config.mjs
- [x] Verified no module-level API client initialization issues
- [x] All services handle missing env vars gracefully

### Build Safety
- [x] Build succeeds without any environment variables
- [x] No build-time errors from missing API keys
- [x] Runtime checks in place for all external services
- [x] User-friendly error messages for unconfigured services

---

## 📦 Deployment Steps

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Fix: Resolve build errors and add env var safety checks"
git push origin main
```

### Step 2: Vercel Auto-Deploy
- Vercel will automatically detect the push
- Build will start automatically
- ✅ Build should succeed (even without env vars)

### Step 3: Add Environment Variables on Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

#### Required for Core Functionality
```
DATABASE_URL=postgresql://...
NEXTAUTH_URL=https://your-domain.vercel.app
NEXTAUTH_SECRET=your-secret-key
```

#### Required for Chatbot
```
GROQ_API_KEY=gsk_your_groq_api_key
```

#### Required for Payments
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

#### Required for Image Uploads
```
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

#### Required for Admin Security
```
ADMIN_JWT_SECRET=your-secure-random-string
```

#### Optional (OAuth)
```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

**Important**: Set each variable for all three environments:
- ✅ Production
- ✅ Preview
- ✅ Development

### Step 4: Redeploy
After adding all environment variables:
1. Go to **Deployments** tab
2. Click **...** on latest deployment
3. Click **Redeploy**
4. Wait for deployment to complete

---

## 🧪 Post-Deployment Testing

### Test Checklist

#### 1. Homepage
- [ ] Page loads without errors
- [ ] Hero video plays
- [ ] Featured collections display
- [ ] Navigation works

#### 2. Products
- [ ] Product pages load
- [ ] Images display correctly
- [ ] Add to cart works
- [ ] Wishlist works

#### 3. Chatbot
- [ ] Chatbot icon appears
- [ ] Can open chatbot
- [ ] Can send messages
- [ ] Receives AI responses
- [ ] Error message if GROQ_API_KEY not set

#### 4. Checkout
- [ ] Cart page works
- [ ] Checkout button works
- [ ] Stripe checkout loads
- [ ] Can complete test payment
- [ ] Success page displays

#### 5. Admin Dashboard
- [ ] Can access /admin/setup (first time)
- [ ] Can create admin account
- [ ] Can login at /admin/login
- [ ] Dashboard loads
- [ ] Can upload images
- [ ] Images appear on site

#### 6. Database
- [ ] Admin account creation works
- [ ] Image uploads save to database
- [ ] Site images load from database

---

## 🔧 Common Issues & Solutions

### Issue: Build Fails on Vercel
**Solution**: 
- Check build logs for specific error
- Ensure all dependencies in package.json
- Clear build cache and redeploy

### Issue: "Chat service is not configured"
**Solution**: 
- Add `GROQ_API_KEY` to Vercel environment variables
- Redeploy the application
- Get key from https://console.groq.com

### Issue: "Payment system is not configured"
**Solution**: 
- Add Stripe keys to Vercel environment variables
- Ensure using correct keys (test vs live)
- Redeploy the application

### Issue: "Cloudinary not configured"
**Solution**: 
- Add Cloudinary credentials to Vercel environment variables
- Verify credentials are correct
- Redeploy the application

### Issue: Database Connection Error
**Solution**: 
- Verify `DATABASE_URL` is correct
- Ensure database is accessible from Vercel
- Check database is running
- Verify connection string format

### Issue: Admin Login Not Working
**Solution**: 
- Ensure `ADMIN_JWT_SECRET` is set
- Clear browser cookies
- Try /admin/setup to create new admin
- Check database has admin user

---

## 🎯 Success Criteria

Your deployment is successful when:

- ✅ Build completes without errors
- ✅ Homepage loads correctly
- ✅ All product pages work
- ✅ Chatbot responds to messages
- ✅ Checkout process works end-to-end
- ✅ Admin dashboard is accessible
- ✅ Image uploads work
- ✅ No console errors in browser

---

## 📊 Monitoring

### Things to Monitor After Deployment

1. **Build Status**: Check Vercel dashboard for build success
2. **Error Logs**: Monitor Vercel logs for runtime errors
3. **Performance**: Check page load times
4. **Database**: Monitor database connections and queries
5. **API Usage**: Monitor Groq API usage and limits
6. **Stripe**: Monitor payment transactions

### Useful Vercel Commands
```bash
# View logs
vercel logs

# Check deployment status
vercel ls

# View environment variables
vercel env ls
```

---

## 🆘 Need Help?

### Resources
- **Vercel Docs**: https://vercel.com/docs
- **Next.js Docs**: https://nextjs.org/docs
- **Groq Docs**: https://console.groq.com/docs
- **Stripe Docs**: https://stripe.com/docs

### Quick Links
- Vercel Dashboard: https://vercel.com/dashboard
- Groq Console: https://console.groq.com
- Stripe Dashboard: https://dashboard.stripe.com
- Cloudinary Console: https://cloudinary.com/console

---

## 📝 Notes

- All environment variables are case-sensitive
- Restart is required after adding/changing env vars
- Use test keys for development/preview environments
- Use production keys only for production environment
- Never commit .env files to git
- Keep API keys secure and rotate regularly

---

**Status**: ✅ Ready for Deployment
**Last Updated**: October 17, 2024
**Next Action**: Push to GitHub and add environment variables on Vercel

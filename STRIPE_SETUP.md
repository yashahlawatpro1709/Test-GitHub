# Stripe Payment Integration Setup

## ✅ What's Been Implemented

### 1. **Stripe Checkout Integration**
- Secure payment processing with Stripe
- Support for Indian Rupees (INR)
- Automatic tax calculation (18% GST)
- Free shipping above ₹5000
- Phone number and address collection

### 2. **Pages Created**
- `/checkout` - Checkout page with customer info form
- `/checkout/success` - Success page after payment
- `/checkout/cancelled` - Cancelled payment page

### 3. **API Routes**
- `/api/checkout` - Creates Stripe checkout session

### 4. **Features**
- ✅ Cart integration
- ✅ Customer email & name collection
- ✅ Shipping address collection (India)
- ✅ Billing address collection
- ✅ Phone number collection
- ✅ Automatic cart clearing after successful payment
- ✅ Order summary with images
- ✅ Real-time price calculation
- ✅ Loading states and error handling

---

## 🚀 Setup Instructions

### Step 1: Create a Stripe Account

1. Go to [https://stripe.com](https://stripe.com)
2. Sign up for a free account
3. Complete the verification process

### Step 2: Get Your API Keys

1. Go to [https://dashboard.stripe.com/test/apikeys](https://dashboard.stripe.com/test/apikeys)
2. Copy your **Publishable key** (starts with `pk_test_`)
3. Copy your **Secret key** (starts with `sk_test_`)

### Step 3: Add Environment Variables

Create or update your `.env.local` file:

```env
# Stripe Payment Integration
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_publishable_key_here
STRIPE_SECRET_KEY=sk_test_your_secret_key_here
```

⚠️ **Important**: 
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` must start with `NEXT_PUBLIC_` to be accessible in the browser
- Never commit your `.env.local` file to Git
- Use test keys for development (they start with `pk_test_` and `sk_test_`)

### Step 4: Deploy to Vercel

1. Push your code to GitHub
2. Go to [https://vercel.com](https://vercel.com)
3. Import your repository
4. Add environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Add `STRIPE_SECRET_KEY`
5. Deploy!

---

## 💳 Testing Payments

Use these test card numbers in Stripe Checkout:

### Successful Payment
- **Card Number**: `4242 4242 4242 4242`
- **Expiry**: Any future date (e.g., 12/34)
- **CVC**: Any 3 digits (e.g., 123)
- **ZIP**: Any 5 digits (e.g., 12345)

### Declined Payment
- **Card Number**: `4000 0000 0000 0002`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

### Requires Authentication (3D Secure)
- **Card Number**: `4000 0025 0000 3155`
- **Expiry**: Any future date
- **CVC**: Any 3 digits

[More test cards](https://stripe.com/docs/testing#cards)

---

## 🔄 Payment Flow

1. **User adds items to cart** → Items stored in Zustand store
2. **User clicks "Proceed to Checkout"** → Redirected to `/checkout`
3. **User enters name & email** → Required for order confirmation
4. **User clicks "Proceed to Payment"** → API creates Stripe session
5. **Redirected to Stripe Checkout** → Secure payment page
6. **User completes payment** → Stripe processes payment
7. **Success**: Redirected to `/checkout/success` → Cart cleared
8. **Cancel**: Redirected to `/checkout/cancelled` → Cart preserved

---

## 🌍 Supported Countries

Currently configured for:
- 🇮🇳 **India** (INR currency)

To add more countries, edit `/src/app/api/checkout/route.ts`:

```typescript
shipping_address_collection: {
  allowed_countries: ['IN', 'US', 'GB', 'CA'], // Add country codes
},
```

---

## 💰 Pricing Configuration

Current setup:
- **Currency**: INR (Indian Rupees)
- **Tax**: 18% GST (automatically calculated)
- **Shipping**: 
  - FREE for orders above ₹5,000
  - ₹299 for orders below ₹5,000

To modify, edit `/src/store/index.ts`:

```typescript
getTotal: () => {
  const subtotal = get().getSubtotal()
  const tax = subtotal * 0.18 // Change tax rate here
  const shipping = subtotal > 5000 ? 0 : 299 // Change shipping threshold
  return subtotal + tax + shipping
}
```

---

## 🔐 Security Features

✅ **PCI Compliance**: Stripe handles all card data
✅ **HTTPS Required**: Stripe only works on secure connections
✅ **No card data stored**: All payment info stays with Stripe
✅ **3D Secure Support**: Built-in fraud prevention
✅ **Address Verification**: Collects billing & shipping addresses

---

## 📧 Order Confirmation Emails

Stripe automatically sends:
- Payment receipt to customer
- Payment notification to you (dashboard email)

To customize emails:
1. Go to [Stripe Dashboard → Settings → Emails](https://dashboard.stripe.com/settings/emails)
2. Customize email templates
3. Add your logo and branding

---

## 🚨 Going Live (Production)

### Before Launching:

1. **Activate your Stripe account**
   - Complete business verification
   - Add bank account details
   - Submit required documents

2. **Switch to live keys**
   - Get live keys from [https://dashboard.stripe.com/apikeys](https://dashboard.stripe.com/apikeys)
   - Update Vercel environment variables
   - Use keys starting with `pk_live_` and `sk_live_`

3. **Test thoroughly**
   - Test with real card (small amount)
   - Verify emails are sent
   - Check order flow end-to-end

4. **Enable webhooks** (optional but recommended)
   - Set up webhook endpoint
   - Listen for payment events
   - Update order status automatically

---

## 📊 Monitoring Payments

View all payments in:
- [Stripe Dashboard → Payments](https://dashboard.stripe.com/payments)
- See successful, pending, and failed payments
- Export data for accounting
- View customer details

---

## 🆘 Troubleshooting

### "Stripe is not defined" error
- Check that `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` is set
- Restart your dev server after adding env variables

### "Invalid API Key" error
- Verify your secret key is correct
- Make sure you're using the right key (test vs live)
- Check for extra spaces in `.env.local`

### Payment not redirecting
- Check success/cancel URLs are correct
- Verify your domain is whitelisted in Stripe dashboard

### Vercel deployment issues
- Ensure environment variables are added in Vercel dashboard
- Redeploy after adding variables
- Check Vercel function logs for errors

---

## 📚 Additional Resources

- [Stripe Documentation](https://stripe.com/docs)
- [Stripe Checkout Guide](https://stripe.com/docs/payments/checkout)
- [Stripe Testing Guide](https://stripe.com/docs/testing)
- [Stripe Dashboard](https://dashboard.stripe.com)

---

## ✨ Next Steps (Optional Enhancements)

1. **Webhooks**: Listen for payment events
2. **Order Management**: Store orders in database
3. **Email Notifications**: Send custom order confirmations
4. **Subscriptions**: Add recurring payments
5. **Coupons**: Implement discount codes
6. **Multi-currency**: Support multiple currencies
7. **Apple Pay / Google Pay**: Enable digital wallets

---

**Need help?** Contact Stripe support or check their excellent documentation!

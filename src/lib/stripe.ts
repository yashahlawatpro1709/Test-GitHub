import Stripe from 'stripe'

// Allow build to succeed without Stripe key (will fail at runtime if used)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'

export const stripe = new Stripe(stripeKey, {
  apiVersion: '2023-10-16',
  typescript: true,
})

import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

export async function POST(req: NextRequest) {
  try {
    // Check if Stripe is configured
    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json(
        { error: 'Payment system is not configured. Please contact support.' },
        { status: 503 }
      )
    }

    const { items, customerEmail, customerName } = await req.json()

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: 'No items in cart' },
        { status: 400 }
      )
    }

    // Create line items for Stripe
    const lineItems = items.map((item: any) => ({
      price_data: {
        currency: 'inr',
        product_data: {
          name: item.product.name,
          images: item.product.images && item.product.images[0] 
            ? [typeof item.product.images[0] === 'string' ? item.product.images[0] : item.product.images[0]?.url]
            : [],
          description: item.variant ? `${item.variant.name}: ${item.variant.value}` : undefined,
        },
        unit_amount: Math.round(item.price * 100), // Convert to paise (smallest currency unit)
      },
      quantity: item.quantity,
    }))

    // Add shipping if applicable
    const subtotal = items.reduce((total: number, item: any) => total + (item.price * item.quantity), 0)
    const shipping = subtotal > 5000 ? 0 : 299

    if (shipping > 0) {
      lineItems.push({
        price_data: {
          currency: 'inr',
          product_data: {
            name: 'Shipping',
            description: 'Standard shipping',
          },
          unit_amount: shipping * 100,
        },
        quantity: 1,
      })
    }

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: `${req.headers.get('origin')}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.headers.get('origin')}/checkout/cancelled`,
      customer_email: customerEmail,
      metadata: {
        customerName: customerName || '',
      },
      shipping_address_collection: {
        allowed_countries: ['IN'], // India only, add more as needed
      },
      billing_address_collection: 'required',
      phone_number_collection: {
        enabled: true,
      },
    })

    return NextResponse.json({ sessionId: session.id, url: session.url })
  } catch (error: any) {
    console.error('Stripe checkout error:', error)
    return NextResponse.json(
      { error: error.message || 'Failed to create checkout session' },
      { status: 500 }
    )
  }
}

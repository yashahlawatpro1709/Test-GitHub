'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react'
import { useCartStore } from '@/store'
import { Button } from '@/components/ui/button'
import { formatPriceNumber } from '@/lib/utils'

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, getSubtotal, getItemCount } = useCartStore()

  const subtotal = getSubtotal()
  const tax = subtotal * 0.18 // 18% GST
  const shipping = subtotal > 5000 ? 0 : 299
  const total = subtotal + tax + shipping

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="text-xl font-light tracking-wide text-gray-900">Shopping Cart</h2>
                <p className="text-sm text-gray-500 mt-1">{getItemCount()} {getItemCount() === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={closeCart}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your cart is empty</h3>
                  <p className="text-sm text-gray-500 mb-6">Add some beautiful jewelry to get started</p>
                  <Button onClick={closeCart} className="bg-black hover:bg-gray-900 text-white">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-100">
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 border border-gray-100">
                        <Image
                          src={
                            item.product.images && item.product.images[0]
                              ? typeof item.product.images[0] === 'string' 
                                ? item.product.images[0] 
                                : item.product.images[0]?.url || '/placeholder.jpg'
                              : '/placeholder.jpg'
                          }
                          alt={item.product.name}
                          fill
                          className="object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
                          {item.product.name}
                        </h3>
                        {item.variant && (
                          <p className="text-xs text-gray-500 mb-2">
                            {item.variant.name}: {item.variant.value}
                          </p>
                        )}
                        <p className="text-sm font-medium text-gray-900">
                          ₹{formatPriceNumber(item.price)}
                        </p>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-7 h-7 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto text-xs text-gray-500 hover:text-red-600 transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer - Summary & Checkout */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                {/* Price Breakdown */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="text-gray-900">₹{formatPriceNumber(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tax (18% GST)</span>
                    <span className="text-gray-900">₹{formatPriceNumber(tax)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="text-gray-900">
                      {shipping === 0 ? 'FREE' : `₹${formatPriceNumber(shipping)}`}
                    </span>
                  </div>
                  {subtotal < 5000 && (
                    <p className="text-xs text-amber-600">
                      Add ₹{formatPriceNumber(5000 - subtotal)} more for free shipping
                    </p>
                  )}
                </div>

                {/* Total */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-200 mb-4">
                  <span className="text-base font-medium text-gray-900">Total</span>
                  <span className="text-xl font-medium text-gray-900">₹{formatPriceNumber(total)}</span>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" onClick={closeCart}>
                  <Button className="w-full bg-black hover:bg-gray-900 text-white py-6 text-sm tracking-[0.1em] uppercase font-light">
                    Proceed to Checkout
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>

                <Link href="/cart" onClick={closeCart}>
                  <Button variant="outline" className="w-full mt-2 border-gray-200 hover:bg-gray-50">
                    View Full Cart
                  </Button>
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

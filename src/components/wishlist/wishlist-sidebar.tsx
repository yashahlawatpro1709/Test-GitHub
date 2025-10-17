'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { X, Heart, ShoppingBag, Trash2 } from 'lucide-react'
import { useWishlistStore } from '@/store'
import { useCartStore } from '@/store'
import { Button } from '@/components/ui/button'
import { formatPriceNumber } from '@/lib/utils'

export function WishlistSidebar() {
  const { items, isOpen, closeWishlist, removeItem } = useWishlistStore()
  const { addItem: addToCart } = useCartStore()

  const handleAddToCart = (item: any) => {
    const productData = {
      id: item.productId,
      name: item.product.name,
      price: item.product.price || item.price,
      images: item.product.images,
      slug: item.product.slug,
    } as any
    addToCart(productData)
    removeItem(item.productId)
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeWishlist}
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
                <h2 className="text-xl font-light tracking-wide text-gray-900">Wishlist</h2>
                <p className="text-sm text-gray-500 mt-1">{items.length} {items.length === 1 ? 'item' : 'items'}</p>
              </div>
              <button
                onClick={closeWishlist}
                className="w-10 h-10 flex items-center justify-center border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Wishlist Items */}
            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <Heart className="w-16 h-16 text-gray-300 mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Your wishlist is empty</h3>
                  <p className="text-sm text-gray-500 mb-6">Save your favorite items here</p>
                  <Button onClick={closeWishlist} className="bg-black hover:bg-gray-900 text-white">
                    Continue Shopping
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 pb-4 border-b border-gray-100 group"
                    >
                      {/* Product Image */}
                      <div className="relative w-24 h-24 flex-shrink-0 bg-gray-50 border border-gray-100 overflow-hidden">
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
                        <p className="text-sm font-medium text-gray-900 mb-3">
                          ₹{formatPriceNumber(item.product.price || 0)}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleAddToCart(item)}
                            className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-black text-white text-xs hover:bg-gray-900 transition-colors"
                          >
                            <ShoppingBag className="w-3 h-3" />
                            Add to Cart
                          </button>
                          <button
                            onClick={() => removeItem(item.productId)}
                            className="p-2 border border-gray-200 text-gray-600 hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-gray-200 p-6 bg-gray-50">
                <div className="space-y-3">
                  <Button
                    onClick={() => {
                      items.forEach(item => handleAddToCart(item))
                    }}
                    className="w-full bg-black hover:bg-gray-900 text-white py-6 text-sm tracking-[0.1em] uppercase font-light"
                  >
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Add All to Cart
                  </Button>
                  
                  <Link href="/wishlist" onClick={closeWishlist}>
                    <Button variant="outline" className="w-full border-gray-200 hover:bg-gray-50">
                      View Full Wishlist
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

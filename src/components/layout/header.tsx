"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Heart, ShoppingBag, User, Menu, X, Diamond, Crown, Sparkles, Star, Gift, Gem } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCartStore, useWishlistStore, useUIStore } from '@/store'
import { cn } from '@/lib/utils'

const navigation = [
  { 
    name: 'All Jewellery', 
    href: '/collections',
    icon: Gem,
    description: 'Complete Collection'
  },
  { 
    name: 'Gold', 
    href: '/products/gold',
    icon: Crown,
    description: 'Pure Elegance'
  },
  { 
    name: 'Diamond', 
    href: '/products/diamond',
    icon: Diamond,
    description: 'Brilliant Sparkle'
  },
  { 
    name: 'Earrings', 
    href: '/products/earrings',
    icon: Sparkles,
    description: 'Graceful Beauty'
  },
  { 
    name: 'Rings', 
    href: '/products/rings',
    icon: Star,
    description: 'Eternal Bonds'
  },
  { 
    name: 'Daily Wear', 
    href: '/products/daily-wear',
    icon: Heart,
    description: 'Everyday Luxury'
  },
  { 
    name: 'Collections', 
    href: '/collections/premium',
    icon: Gift,
    description: 'Curated Sets'
  },
  { 
    name: 'Wedding', 
    href: '/products/wedding',
    icon: Crown,
    description: 'Bridal Elegance'
  },
  { 
    name: 'Gifting', 
    href: '/gifting',
    icon: Gift,
    description: 'Perfect Presents'
  },
  { 
    name: 'More', 
    href: '/more',
    icon: Menu,
    description: 'Explore All'
  },
]

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isSearchExpanded, setIsSearchExpanded] = useState(false)
  const [mounted, setMounted] = useState(false)
  
  const { items: cartItems, isOpen: isCartOpen, openCart, getItemCount } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { 
    searchQuery, 
    isSearchOpen, 
    isMobileMenuOpen, 
    setSearchQuery, 
    openSearch, 
    closeSearch,
    openMobileMenu,
    closeMobileMenu 
  } = useUIStore()

  useEffect(() => {
    setMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      // Navigate to search results
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
      closeSearch()
    }
  }

  return (
    <>
      <motion.header
        className={cn(
          "fixed top-0 z-50 w-full transition-all duration-500",
          isScrolled
            ? "bg-white/98 backdrop-blur-xl shadow-2xl border-b border-champagne-gold/20"
            : "bg-white/95 backdrop-blur-md shadow-lg"
        )}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Top Bar with Logo and Actions */}
        <div className="border-b border-gray-100/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 lg:h-18 items-center justify-between">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-champagne-gold/10 transition-colors"
                onClick={openMobileMenu}
              >
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>

              {/* Logo */}
              <Link href="/" className="flex-shrink-0">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="w-10 h-10 bg-gradient-to-br from-champagne-gold to-amber-600 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ 
                      scale: 1.1,
                      boxShadow: "0 10px 25px rgba(212, 175, 55, 0.4)"
                    }}
                    animate={{ 
                      rotate: [0, 360],
                      boxShadow: [
                        "0 4px 15px rgba(212, 175, 55, 0.2)",
                        "0 8px 25px rgba(212, 175, 55, 0.4)",
                        "0 4px 15px rgba(212, 175, 55, 0.2)"
                      ]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
                    }}
                  >
                    <Diamond className="h-5 w-5 text-white" />
                  </motion.div>
                  <div>
                    <h1 className="text-2xl lg:text-3xl font-playfair font-bold text-gradient tracking-tight">
                      AASHNI
                    </h1>
                    <p className="text-xs text-gray-500 font-medium tracking-widest uppercase">
                      Premium Jewelry
                    </p>
                  </div>
                </motion.div>
              </Link>

              {/* Center Search Bar - Desktop */}
              <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
                <motion.div 
                  className="relative w-full"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.2 }}
                >
                  <motion.div 
                    className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none"
                    animate={{ 
                      x: searchQuery ? [0, 2, 0] : 0,
                      color: searchQuery ? ["#9CA3AF", "#F43F5F", "#9CA3AF"] : "#9CA3AF"
                    }}
                    transition={{ 
                      x: { duration: 0.5, repeat: searchQuery ? Infinity : 0 },
                      color: { duration: 1, repeat: searchQuery ? Infinity : 0 }
                    }}
                  >
                    <Search className="h-5 w-5" />
                  </motion.div>
                  <Input
                    type="search"
                    placeholder="Search for Gold Jewellery, Diamond Jewellery and more..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 bg-gray-50/80 border-gray-200/60 rounded-full text-sm placeholder:text-gray-500 focus:bg-white focus:border-rose-400/50 focus:ring-2 focus:ring-rose-400/20 hover:bg-gray-50 hover:border-gray-300/80 transition-all duration-300 focus:shadow-lg"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleSearchSubmit(e as any)
                      }
                    }}
                  />
                  {searchQuery && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.8, rotate: -90 }}
                      animate={{ opacity: 1, scale: 1, rotate: 0 }}
                      exit={{ opacity: 0, scale: 0.8, rotate: 90 }}
                      whileHover={{ scale: 1.1, rotate: 90 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => setSearchQuery('')}
                      className="absolute inset-y-0 right-0 pr-4 flex items-center"
                    >
                      <X className="h-4 w-4 text-gray-400 hover:text-rose-500 transition-colors" />
                    </motion.button>
                  )}
                </motion.div>
              </div>

              {/* Right Actions */}
              <div className="flex items-center space-x-2">
                {/* Search Icon - Mobile */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    rotate: [0, 15, -15, 0],
                    transition: { duration: 0.4 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={openSearch}
                    className="lg:hidden hover:bg-champagne-gold/10 transition-colors group relative"
                  >
                    <motion.div
                      className="absolute inset-0 bg-champagne-gold/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Search className="h-5 w-5 text-gray-700 relative z-10" />
                  </Button>
                </motion.div>

                {/* Wishlist */}
                <Link href="/wishlist">
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, -5, 5, 0],
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative hover:bg-champagne-gold/10 transition-all duration-300 group"
                    >
                      <motion.div
                        className="absolute inset-0 bg-rose-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                      <Heart className="h-5 w-5 text-gray-700 group-hover:text-champagne-gold transition-colors relative z-10" />
                      {mounted && wishlistItems.length > 0 && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ 
                            scale: 1,
                            rotate: [0, 10, -10, 0]
                          }}
                          transition={{
                            scale: { duration: 0.3 },
                            rotate: { duration: 2, repeat: Infinity }
                          }}
                          className="absolute -top-1 -right-1 bg-gradient-to-r from-champagne-gold to-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg"
                        >
                          {wishlistItems.length}
                        </motion.span>
                      )}
                    </Button>
                  </motion.div>
                </Link>

                {/* Cart */}
                <motion.div
                  whileHover={{ 
                    scale: 1.1,
                    y: [0, -2, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={openCart}
                    className="relative hover:bg-champagne-gold/10 transition-all duration-300 group"
                  >
                    <motion.div
                      className="absolute inset-0 bg-rose-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1.2 }}
                      transition={{ duration: 0.3 }}
                    />
                    <ShoppingBag className="h-5 w-5 text-gray-700 group-hover:text-champagne-gold transition-colors relative z-10" />
                    {mounted && getItemCount() > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ 
                          scale: 1,
                          y: [0, -1, 0]
                        }}
                        transition={{
                          scale: { duration: 0.3 },
                          y: { duration: 1.5, repeat: Infinity }
                        }}
                        className="absolute -top-1 -right-1 bg-gradient-to-r from-champagne-gold to-amber-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium shadow-lg"
                      >
                        {getItemCount()}
                      </motion.span>
                    )}
                  </Button>
                </motion.div>

                {/* User Account */}
                <Link href="/account">
                  <motion.div
                    whileHover={{ 
                      scale: 1.1,
                      rotate: [0, 360],
                      transition: { 
                        scale: { duration: 0.2 },
                        rotate: { duration: 0.6 }
                      }
                    }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hover:bg-champagne-gold/10 transition-all duration-300 group relative"
                    >
                      <motion.div
                        className="absolute inset-0 bg-rose-100 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        initial={{ scale: 0.8 }}
                        whileHover={{ scale: 1.2 }}
                        transition={{ duration: 0.3 }}
                      />
                      <User className="h-5 w-5 text-gray-700 group-hover:text-champagne-gold transition-colors relative z-10" />
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Menu */}
        <div className="hidden lg:block bg-white/50 backdrop-blur-sm">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center justify-center space-x-1 py-3">
              {navigation.map((item, index) => {
                const IconComponent = item.icon
                return (
                  <motion.div
                    key={item.name}
                    className="group relative"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ 
                      scale: 1.05,
                      transition: { duration: 0.2 }
                    }}
                  >
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-rose-400/20 to-pink-400/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      initial={{ scale: 0.8 }}
                      whileHover={{ scale: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <Link
                      href={item.href}
                      className="relative px-4 py-2 rounded-lg transition-all duration-300 hover:bg-rose-50/50 flex items-center space-x-2"
                    >
                      <motion.div
                        whileHover={{ 
                          rotate: [0, -10, 10, 0],
                          scale: [1, 1.1, 1]
                        }}
                        transition={{ duration: 0.5 }}
                      >
                        <IconComponent className="h-4 w-4 text-gray-600 group-hover:text-rose-600 transition-colors" />
                      </motion.div>
                      <motion.span
                        className="text-sm font-medium text-gray-700 group-hover:text-rose-600 transition-colors"
                        whileHover={{ 
                          x: [0, 2, 0],
                          transition: { duration: 0.3 }
                        }}
                      >
                        {item.name}
                      </motion.span>
                      <div className="absolute inset-x-0 -bottom-1 h-0.5 bg-gradient-to-r from-rose-400 to-pink-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-center" />
                      
                      {/* Enhanced Tooltip */}
                      <motion.div
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-2 bg-gradient-to-r from-gray-900 to-gray-800 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-10 shadow-xl"
                        initial={{ opacity: 0, y: -5, scale: 0.9 }}
                        whileHover={{ 
                          opacity: 1, 
                          y: 0, 
                          scale: 1,
                          transition: { duration: 0.2 }
                        }}
                      >
                        {item.description}
                        <motion.div 
                          className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45"
                          initial={{ rotate: 45 }}
                          whileHover={{ rotate: [45, 90, 45] }}
                          transition={{ duration: 0.5 }}
                        />
                      </motion.div>
                    </Link>
                  </motion.div>
                )
              })}
            </nav>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
              onClick={closeMobileMenu}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed left-0 top-0 z-50 h-full w-80 bg-white shadow-luxury lg:hidden"
            >
              <div className="flex h-16 items-center justify-between px-6 border-b border-champagne-gold/10">
                <Link href="/" onClick={closeMobileMenu}>
                  <h1 className="text-2xl font-playfair font-bold text-gradient">
                    Aashni
                  </h1>
                </Link>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={closeMobileMenu}
                >
                  <X className="h-6 w-6" />
                </Button>
              </div>

              <nav className="px-6 py-8">
                <div className="space-y-6">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={closeMobileMenu}
                      className="block text-lg font-medium text-gray-700 hover:text-champagne-gold transition-colors duration-200"
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>

                <div className="mt-8 pt-8 border-t border-champagne-gold/10">
                  <form onSubmit={handleSearchSubmit} className="mb-6">
                    <Input
                      type="search"
                      placeholder="Search jewelry..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full"
                    />
                  </form>
                  
                  <div className="space-y-4">
                    <Link
                      href="/account"
                      onClick={closeMobileMenu}
                      className="block text-base text-gray-600 hover:text-champagne-gold transition-colors"
                    >
                      My Account
                    </Link>
                    <Link
                      href="/wishlist"
                      onClick={closeMobileMenu}
                      className="block text-base text-gray-600 hover:text-champagne-gold transition-colors"
                    >
                      Wishlist ({wishlistItems.length})
                    </Link>
                  </div>
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

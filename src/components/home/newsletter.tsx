"use client"

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Gift, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'

export function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email) {
      toast.error('Please enter your email address')
      return
    }

    setIsLoading(true)
    
    // Simulate API call
    setTimeout(() => {
      toast.success('Welcome to the Aashni family! 🎉')
      setEmail('')
      setIsLoading(false)
    }, 1000)
  }

  return (
    <section className="py-20 bg-gradient-to-br from-champagne-gold/5 to-rose-gold/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-repeat" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.4'%3E%3Ccircle cx='20' cy='20' r='4'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }} />
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <Sparkles className="absolute top-20 left-20 h-8 w-8 text-champagne-gold/20 animate-pulse" />
        <Gift className="absolute bottom-32 right-32 h-6 w-6 text-rose-gold/20 animate-bounce" />
        <Mail className="absolute top-40 right-20 h-7 w-7 text-champagne-gold/30 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center w-20 h-20 bg-champagne-gold/10 rounded-full mb-8"
          >
            <Mail className="h-10 w-10 text-champagne-gold" />
          </motion.div>

          {/* Heading */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-6"
          >
            Stay Connected with 
            <span className="text-gradient block">Exclusive Updates</span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed mb-8"
          >
            Be the first to discover new collections, receive exclusive offers, and get 
            insider access to limited-edition pieces. Join our community of jewelry lovers 
            and never miss a moment of luxury.
          </motion.p>

          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10 max-w-2xl mx-auto"
          >
            {[
              {
                icon: Sparkles,
                title: "Early Access",
                description: "Be first to shop new collections"
              },
              {
                icon: Gift,
                title: "Exclusive Offers",
                description: "Special discounts & promotions"
              },
              {
                icon: Mail,
                title: "Style Tips",
                description: "Expert jewelry care & styling advice"
              }
            ].map((benefit, index) => (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-full mb-3 shadow-elegant group-hover:shadow-gold transition-all duration-300">
                  <benefit.icon className="h-6 w-6 text-champagne-gold" />
                </div>
                <h3 className="font-semibold text-deep-black mb-1 text-sm">
                  {benefit.title}
                </h3>
                <p className="text-xs text-warm-gray">
                  {benefit.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Newsletter Form */}
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            viewport={{ once: true }}
            onSubmit={handleSubmit}
            className="max-w-md mx-auto"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full h-12 pl-12 pr-4 bg-white border-champagne-gold/20 focus:border-champagne-gold transition-colors"
                  disabled={isLoading}
                />
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-champagne-gold/50" />
              </div>
              <Button
                type="submit"
                variant="luxury"
                size="lg"
                disabled={isLoading}
                className="h-12 px-8 whitespace-nowrap"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Subscribing...
                  </div>
                ) : (
                  'Subscribe Now'
                )}
              </Button>
            </div>
          </motion.form>

          {/* Trust Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
            className="text-sm text-warm-gray mt-4"
          >
            We respect your privacy. Unsubscribe at any time.
          </motion.p>

          {/* Social Proof */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            viewport={{ once: true }}
            className="mt-12 pt-8 border-t border-champagne-gold/20"
          >
            <p className="text-sm text-warm-gray mb-4">
              Join 25,000+ jewelry enthusiasts who trust Aashni
            </p>
            <div className="flex justify-center items-center gap-8 opacity-60">
              {/* Customer Avatars */}
              <div className="flex -space-x-2">
                {[
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=customer1&backgroundColor=f8f6f0&size=40",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=customer2&backgroundColor=f8f6f0&size=40",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=customer3&backgroundColor=f8f6f0&size=40",
                  "https://api.dicebear.com/7.x/avataaars/svg?seed=customer4&backgroundColor=f8f6f0&size=40"
                ].map((avatar, index) => (
                  <img
                    key={index}
                    src={avatar}
                    alt={`Customer ${index + 1}`}
                    className="w-8 h-8 rounded-full border-2 border-white object-cover"
                  />
                ))}
                <div className="w-8 h-8 rounded-full bg-champagne-gold/20 border-2 border-white flex items-center justify-center">
                  <span className="text-xs font-bold text-champagne-gold">+</span>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

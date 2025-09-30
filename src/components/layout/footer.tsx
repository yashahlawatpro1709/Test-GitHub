"use client"

import React from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Instagram, Facebook, Twitter, Mail, Phone, MapPin } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const footerSections = [
  {
    title: 'Collections',
    links: [
      { name: 'Engagement Rings', href: '/collections/engagement-rings' },
      { name: 'Wedding Bands', href: '/collections/wedding-bands' },
      { name: 'Necklaces', href: '/collections/necklaces' },
      { name: 'Earrings', href: '/collections/earrings' },
      { name: 'Bracelets', href: '/collections/bracelets' },
      { name: 'Bridal Sets', href: '/collections/bridal-sets' },
    ]
  },
  {
    title: 'Customer Care',
    links: [
      { name: 'Size Guide', href: '/size-guide' },
      { name: 'Jewelry Care', href: '/jewelry-care' },
      { name: 'Returns & Exchange', href: '/returns' },
      { name: 'Shipping Info', href: '/shipping' },
      { name: 'Warranty', href: '/warranty' },
      { name: 'Contact Us', href: '/contact' },
    ]
  },
  {
    title: 'About Aashni',
    links: [
      { name: 'Our Story', href: '/about' },
      { name: 'Craftsmanship', href: '/craftsmanship' },
      { name: 'Sustainability', href: '/sustainability' },
      { name: 'Press', href: '/press' },
      { name: 'Careers', href: '/careers' },
      { name: 'Blog', href: '/blog' },
    ]
  }
]

const socialLinks = [
  { name: 'Instagram', href: '#', icon: Instagram },
  { name: 'Facebook', href: '#', icon: Facebook },
  { name: 'Twitter', href: '#', icon: Twitter },
]

export function Footer() {
  const handleNewsletterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Newsletter subscription')
  }

  return (
    <footer className="bg-gradient-to-b from-ivory to-white border-t border-champagne-gold/20">
      {/* Newsletter Section */}
      <div className="border-b border-champagne-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl lg:text-3xl font-playfair font-bold text-deep-black mb-4">
                Stay in Touch
              </h3>
              <p className="text-gray-600 mb-6">
                Be the first to know about new collections, exclusive events, and special offers.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1"
                  required
                />
                <Button variant="luxury" type="submit" className="sm:w-auto">
                  Subscribe
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <Link href="/" className="inline-block mb-6">
              <h2 className="text-3xl font-playfair font-bold text-gradient">
                Aashni
              </h2>
            </Link>
            <p className="text-gray-600 mb-6">
              Crafting timeless elegance with contemporary design. Each piece tells a story of luxury, heritage, and exceptional craftsmanship.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-champagne-gold" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-champagne-gold" />
                <span>hello@aashni.com</span>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-champagne-gold mt-0.5" />
                <span>123 Jewelry District<br />Mumbai, Maharashtra 400001</span>
              </div>
            </div>
          </motion.div>

          {/* Footer Links */}
          {footerSections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold text-deep-black mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-gray-600 hover:text-champagne-gold transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-champagne-gold/10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-sm text-gray-600"
            >
              © {new Date().getFullYear()} Aashni Jewelry. All rights reserved.
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <Link
                  key={social.name}
                  href={social.href}
                  className="text-gray-500 hover:text-champagne-gold transition-colors duration-200"
                >
                  <social.icon className="h-5 w-5" />
                  <span className="sr-only">{social.name}</span>
                </Link>
              ))}
            </motion.div>

            {/* Legal Links */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="flex items-center gap-6 text-sm text-gray-600"
            >
              <Link href="/privacy-policy" className="hover:text-champagne-gold transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-of-service" className="hover:text-champagne-gold transition-colors">
                Terms of Service
              </Link>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="h-1 bg-gradient-to-r from-champagne-gold via-rose-gold to-champagne-gold" />
    </footer>
  )
}

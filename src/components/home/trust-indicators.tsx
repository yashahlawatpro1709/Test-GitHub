"use client"

import React from 'react'
import { motion } from 'framer-motion'
import { Shield, Award, Truck, RotateCcw } from 'lucide-react'

const trustFeatures = [
  {
    icon: Shield,
    title: "Certified Quality",
    description: "All jewelry comes with authenticity certificates"
  },
  {
    icon: Award,
    title: "25+ Years Expertise",
    description: "Trusted by generations of jewelry lovers"
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Complimentary shipping on orders above ₹5,000"
  },
  {
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day hassle-free return policy"
  }
]

export function TrustIndicators() {
  return (
    <section className="py-16 bg-white border-b border-champagne-gold/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustFeatures.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-champagne-gold/10 rounded-full mb-4 group-hover:bg-champagne-gold/20 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-champagne-gold" />
              </div>
              <h3 className="text-lg font-semibold text-deep-black mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 text-sm">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

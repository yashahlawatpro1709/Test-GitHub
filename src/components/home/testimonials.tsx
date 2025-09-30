"use client"

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const testimonials = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The engagement ring I purchased from Aashni exceeded all my expectations. The craftsmanship is impeccable, and the customer service was outstanding. They helped me find the perfect piece that truly captured our love story.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya&backgroundColor=f8f6f0&skinColor=fdbcb4",
    product: "Diamond Solitaire Ring",
    verified: true
  },
  {
    id: 2,
    name: "Rajesh Mehta",
    location: "Delhi",
    rating: 5,
    text: "I've been a loyal customer for over 5 years. Every piece I've purchased has maintained its beauty and quality. The attention to detail and the traditional craftsmanship combined with modern designs is what sets Aashni apart.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh&backgroundColor=f8f6f0&skinColor=d08b5b",
    product: "Gold Chain Collection",
    verified: true
  },
  {
    id: 3,
    name: "Anisha Patel",
    location: "Bangalore",
    rating: 5,
    text: "The bridal jewelry set I ordered was absolutely stunning. The team at Aashni understood my vision perfectly and created pieces that made my wedding day even more special. The quality is exceptional and the design is timeless.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=anisha&backgroundColor=f8f6f0&skinColor=edb98a",
    product: "Bridal Jewelry Set",
    verified: true
  },
  {
    id: 4,
    name: "Vikram Singh",
    location: "Chennai",
    rating: 5,
    text: "Purchased a pearl necklace for my wife's anniversary. The packaging was beautiful, delivery was prompt, and the quality was outstanding. She absolutely loved it! Will definitely be shopping here again.",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram&backgroundColor=f8f6f0&skinColor=fd9841",
    product: "Pearl Necklace",
    verified: true
  },
  {
    id: 5,
    name: "Meera Iyer",
    location: "Hyderabad",
    rating: 5,
    text: "The custom earrings I ordered were exactly what I envisioned. The design process was smooth, and the artisans paid attention to every detail. The final product was worth every penny. Highly recommended!",
    image: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera&backgroundColor=f8f6f0&skinColor=f8d25c",
    product: "Custom Diamond Earrings",
    verified: true
  }
]

export function TestimonialsSection() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)

  const nextTestimonial = () => {
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const goToTestimonial = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  return (
    <section className="py-20 bg-gradient-to-b from-white to-ivory relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 opacity-5">
        <Quote className="absolute top-20 left-20 h-32 w-32 text-champagne-gold transform -rotate-12" />
        <Quote className="absolute bottom-20 right-20 h-24 w-24 text-rose-gold transform rotate-45" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-6">
            What Our Customers Say
          </h2>
          <p className="text-lg text-warm-gray max-w-2xl mx-auto leading-relaxed">
            Discover why thousands of customers trust Aashni for their most precious moments. 
            Every review reflects our commitment to excellence and customer satisfaction.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Navigation Buttons */}
            <Button
              variant="ghost"
              size="icon"
              onClick={prevTestimonial}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-elegant"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              onClick={nextTestimonial}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 backdrop-blur-sm hover:bg-white shadow-elegant"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>

            {/* Testimonial Card */}
            <div className="px-16 py-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentIndex}
                  initial={{ opacity: 0, x: direction * 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -100 }}
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                  className="luxury-card p-8 lg:p-12 text-center relative"
                >
                  {/* Quote Icon */}
                  <Quote className="h-12 w-12 text-champagne-gold/30 mx-auto mb-6" />
                  
                  {/* Rating Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 text-champagne-gold fill-current"
                      />
                    ))}
                  </div>

                  {/* Testimonial Text */}
                  <blockquote className="text-lg lg:text-xl text-gray-700 leading-relaxed mb-8 italic">
                    “{testimonials[currentIndex].text}”
                  </blockquote>

                  {/* Customer Info */}
                  <div className="flex items-center justify-center gap-4">
                    <div className="relative">
                      <Image
                        src={testimonials[currentIndex].image}
                        alt={testimonials[currentIndex].name}
                        width={60}
                        height={60}
                        className="rounded-full object-cover ring-2 ring-champagne-gold/20"
                      />
                      {testimonials[currentIndex].verified && (
                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <Star className="h-3 w-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-deep-black text-lg">
                        {testimonials[currentIndex].name}
                      </div>
                      <div className="text-warm-gray text-sm">
                        {testimonials[currentIndex].location}
                      </div>
                      <div className="text-champagne-gold text-sm font-medium">
                        {testimonials[currentIndex].product}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Testimonial Dots */}
          <div className="flex justify-center gap-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? 'bg-champagne-gold scale-125'
                    : 'bg-champagne-gold/30 hover:bg-champagne-gold/50'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Trust Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-3xl mx-auto mt-16 pt-16 border-t border-champagne-gold/20"
        >
          {[
            { metric: "10,000+", label: "Happy Customers" },
            { metric: "4.9/5", label: "Average Rating" },
            { metric: "99.8%", label: "Customer Satisfaction" }
          ].map((item, index) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center group"
            >
              <div className="text-3xl lg:text-4xl font-playfair font-bold text-champagne-gold mb-2 group-hover:scale-110 transition-transform duration-300">
                {item.metric}
              </div>
              <div className="text-warm-gray font-medium">
                {item.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  ArrowRight, 
  Shield, 
  Truck, 
  Award, 
  Users, 
  Heart, 
  Star, 
  Gift, 
  Sparkles, 
  Crown, 
  Gem, 
  Clock,
  MapPin,
  Phone,
  Mail,
  FileText,
  HelpCircle,
  Settings,
  Bookmark,
  Calendar,
  Camera,
  Scissors,
  Wrench
} from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

const categories = [
  {
    title: 'Luxury Collections',
    description: 'Exclusive high-end jewelry pieces',
    icon: Crown,
    color: 'from-yellow-400 to-orange-500',
    href: '/collections',
    items: ['Royal Collection', 'Heritage Series', 'Limited Edition', 'Designer Collaborations']
  },
  {
    title: 'Gemstone Gallery',
    description: 'Precious and semi-precious stones',
    icon: Gem,
    color: 'from-purple-400 to-pink-500',
    href: '/products/gemstones',
    items: ['Diamonds', 'Emeralds', 'Rubies', 'Sapphires', 'Pearls', 'Tanzanite']
  },
  {
    title: 'Custom Jewelry',
    description: 'Bespoke pieces made just for you',
    icon: Scissors,
    color: 'from-blue-400 to-indigo-500',
    href: '/custom-jewelry',
    items: ['Design Consultation', 'CAD Modeling', 'Handcrafted Pieces', 'Engraving Services']
  },
  {
    title: 'Vintage & Antique',
    description: 'Timeless pieces with history',
    icon: Clock,
    color: 'from-amber-400 to-orange-500',
    href: '/vintage',
    items: ['Victorian Era', 'Art Deco', 'Vintage Watches', 'Estate Jewelry']
  }
]

const services = [
  {
    title: 'Jewelry Repair',
    description: 'Expert restoration and repair services',
    icon: Wrench,
    color: 'from-green-400 to-teal-500',
    href: '/services/repair',
    features: ['Ring Resizing', 'Chain Repair', 'Stone Setting', 'Polishing & Cleaning']
  },
  {
    title: 'Appraisal Services',
    description: 'Professional jewelry valuation',
    icon: FileText,
    color: 'from-indigo-400 to-purple-500',
    href: '/services/appraisal',
    features: ['Insurance Appraisals', 'Estate Valuations', 'Certified Reports', 'Market Analysis']
  },
  {
    title: 'Photography Services',
    description: 'Professional jewelry photography',
    icon: Camera,
    color: 'from-pink-400 to-rose-500',
    href: '/services/photography',
    features: ['Product Photography', 'Lifestyle Shoots', 'Macro Details', 'Social Media Content']
  },
  {
    title: 'Personal Shopping',
    description: 'One-on-one shopping assistance',
    icon: Users,
    color: 'from-cyan-400 to-blue-500',
    href: '/services/personal-shopping',
    features: ['Style Consultation', 'Gift Selection', 'Wardrobe Planning', 'Special Occasions']
  }
]

const quickLinks = [
  { title: 'Size Guide', href: '/size-guide', icon: Settings },
  { title: 'Jewelry Care', href: '/jewelry-care', icon: Heart },
  { title: 'Warranty', href: '/warranty', icon: Shield },
  { title: 'Returns', href: '/returns', icon: ArrowRight },
  { title: 'Shipping', href: '/shipping', icon: Truck },
  { title: 'Contact Us', href: '/contact', icon: Phone },
  { title: 'About Us', href: '/about', icon: Users },
  { title: 'Our Story', href: '/our-story', icon: Bookmark },
  { title: 'Careers', href: '/careers', icon: Star },
  { title: 'Press', href: '/press', icon: FileText },
  { title: 'Blog', href: '/blog', icon: Calendar },
  { title: 'FAQ', href: '/faq', icon: HelpCircle }
]

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'Exceptional quality and service. The custom engagement ring exceeded all expectations!',
    image: '/api/placeholder/80/80'
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'Professional appraisal service helped me understand the true value of my inherited jewelry.',
    image: '/api/placeholder/80/80'
  },
  {
    name: 'Anita Patel',
    location: 'Bangalore',
    rating: 5,
    text: 'The repair service brought my grandmother\'s necklace back to its original beauty.',
    image: '/api/placeholder/80/80'
  }
]

export default function MorePage() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-100/40 to-blue-100/40" />
        <motion.div 
          className="max-w-7xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <Sparkles className="w-8 h-8 text-blue-600" />
            <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-slate-800 to-blue-700 bg-clip-text text-transparent">
              Discover More
            </h1>
            <Crown className="w-8 h-8 text-slate-600" />
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Explore our complete range of jewelry categories, premium services, and everything else 
            that makes your jewelry journey extraordinary.
          </p>
        </motion.div>
      </section>

      {/* Categories Section */}
      <section className="px-4 py-16 bg-white/60 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Explore Categories
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {categories.map((category, index) => (
              <motion.div
                key={category.title}
                className="group relative overflow-hidden rounded-2xl bg-white shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                onHoverStart={() => setActiveCategory(index)}
                onHoverEnd={() => setActiveCategory(null)}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative p-8">
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}>
                        <category.icon className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-800 group-hover:text-gray-900">
                          {category.title}
                        </h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {category.items.map((item, itemIndex) => (
                      <motion.div
                        key={item}
                        className="p-3 bg-gray-50 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ 
                          opacity: activeCategory === index ? 1 : 0.7,
                          x: activeCategory === index ? 0 : -10
                        }}
                        transition={{ delay: itemIndex * 0.1 }}
                      >
                        {item}
                      </motion.div>
                    ))}
                  </div>

                  <Link href={category.href}>
                    <motion.button
                      className="mt-6 w-full py-3 bg-gray-800 text-white rounded-xl font-medium hover:bg-gray-900 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Explore {category.title}
                    </motion.button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-slate-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Premium Services
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={feature} className="text-xs text-gray-500 flex items-center gap-2">
                      <div className="w-1 h-1 bg-gray-400 rounded-full" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <Link href={service.href}>
                  <motion.button
                    className="w-full py-2 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Learn More
                  </motion.button>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Links Section */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            Quick Links
          </motion.h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
            {quickLinks.map((link, index) => (
              <Link key={link.title} href={link.href}>
                <motion.div
                  className="p-4 bg-gray-50 rounded-xl text-center hover:bg-gray-100 transition-colors group cursor-pointer"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <link.icon className="w-6 h-6 text-gray-600 group-hover:text-gray-800 mx-auto mb-2 transition-colors" />
                  <span className="text-sm font-medium text-gray-700 group-hover:text-gray-900 transition-colors">
                    {link.title}
                  </span>
                </motion.div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="px-4 py-16 bg-gradient-to-r from-blue-50 to-slate-50">
        <div className="max-w-7xl mx-auto">
          <motion.h2 
            className="text-3xl font-bold text-center text-gray-800 mb-12"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            What Our Customers Say
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-white rounded-2xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <Image
                    src={testimonial.image}
                    alt={testimonial.name}
                    width={50}
                    height={50}
                    className="rounded-full"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600 flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                
                <p className="text-gray-700 italic">"{testimonial.text}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="px-4 py-16 bg-gray-900 text-white">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Stay Updated with Aashni
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, new collections, and jewelry care tips.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-xl text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors"
            >
              Subscribe
            </motion.button>
          </div>
        </motion.div>
      </section>

      {/* Contact Information */}
      <section className="px-4 py-12 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Phone className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Call Us</h3>
              <p className="text-gray-600">+91 98765 43210</p>
              <p className="text-gray-600">Mon-Sat 10AM-8PM</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Email Us</h3>
              <p className="text-gray-600">info@aashni.com</p>
              <p className="text-gray-600">support@aashni.com</p>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <MapPin className="w-8 h-8 text-blue-600 mx-auto mb-3" />
              <h3 className="font-semibold text-gray-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">123 Jewelry Street</p>
              <p className="text-gray-600">Mumbai, Maharashtra</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}
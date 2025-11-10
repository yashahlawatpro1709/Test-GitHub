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

// Helper to proxy remote image URLs for previews
function proxy(url: string): string {
  return `/api/proxy-image?url=${encodeURIComponent(url)}`
}

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
  const [form, setForm] = useState({ name: '', email: '', phone: '', experience: '', message: '' })
  const [contactOpen, setContactOpen] = useState(false)

  const handleApply = (e: any) => {
    e.preventDefault()
    const subject = 'Application – Sales Manager (Chennai Lounge)'
    const lines = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `Experience: ${form.experience} years`,
      '',
      'Message:',
      form.message,
    ]
    const body = encodeURIComponent(lines.join('\n'))
    window.location.href = `mailto:careers@aashni.com?subject=${encodeURIComponent(subject)}&body=${body}`
  }

  return (
    <div className="bg-white font-serif">
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[420px] md:h-[580px]">
          <img
            src={proxy("https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=2000&h=1300&fit=crop&crop=center&auto=format&q=80")}
            alt="Aashni Jewelry Lounge – Premium Interiors"
            loading="eager"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-black/35" aria-hidden="true"></div>
        <div className="absolute bottom-12 left-0 right-0 text-center text-white">
          <h1 className="text-4xl md:text-5xl tracking-wide">Careers</h1>
          {/* Removed subtitle for a cleaner, premium hero */}
          <div className="mx-auto mt-3 h-px w-24 bg-gradient-to-r from-champagne-gold/0 via-champagne-gold to-champagne-gold/0" />
        </div>
      </section>

      {/* Careers – Premium Single Column */}
      <section className="py-24">
        <div className="mx-auto max-w-5xl px-6 flex justify-center">
          {/* Application Form Card */}
          <form onSubmit={handleApply} className="relative w-full max-w-2xl rounded-2xl ring-1 ring-champagne-gold/40 bg-white shadow-xl p-8 overflow-hidden">
            {/* Ambient luxury glows */}
            <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
              <div className="absolute -top-24 -left-28 w-72 h-72 rounded-full bg-champagne-gold/10 blur-3xl" />
              <div className="absolute -bottom-24 -right-24 w-64 h-64 rounded-full bg-champagne-gold/20 blur-3xl" />
            </div>

            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30 text-champagne-gold">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-xl tracking-wide text-gray-900">Apply Now</h3>
              </div>
              <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30 text-xs text-champagne-gold">Aashni Jewelry Lounge</span>
            </div>

            {/* Form fields */}
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                placeholder="Full Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 ring-1 ring-champagne-gold/30 focus:ring-champagne-gold bg-white placeholder-gray-400"
                required
              />
              <input
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 ring-1 ring-champagne-gold/30 focus:ring-champagne-gold bg-white placeholder-gray-400"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 ring-1 ring-champagne-gold/30 focus:ring-champagne-gold bg-white placeholder-gray-400"
              />
              <input
                type="number"
                min="0"
                placeholder="Years of Experience"
                value={form.experience}
                onChange={(e) => setForm({ ...form, experience: e.target.value })}
                className="w-full rounded-2xl px-4 py-3 ring-1 ring-champagne-gold/30 focus:ring-champagne-gold bg-white placeholder-gray-400"
              />
              <textarea
                placeholder="Cover Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={5}
                className="w-full rounded-2xl px-4 py-3 ring-1 ring-champagne-gold/30 focus:ring-champagne-gold bg-white placeholder-gray-400"
              />
            </div>

            {/* Actions */}
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="submit" className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm tracking-wider bg-gradient-to-br from-gray-900 to-gray-700 text-white ring-1 ring-black/10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all">
                <Mail className="w-4 h-4 mr-2" /> Send Application
              </button>
              <a
                href="tel:+919940153000"
                onClick={(e) => { e.preventDefault(); setContactOpen(true) }}
                className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm tracking-wider ring-1 ring-champagne-gold/40 text-gray-800 bg-white hover:bg-gradient-to-br hover:from-white hover:to-champagne-gold/10 hover:ring-champagne-gold shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
              >
                <Phone className="w-4 h-4 mr-2" /> Speak to Us
              </a>
            </div>
          </form>
        </div>

        {/* Luxury Contact Modal */}
        {contactOpen && (
          <div className="fixed inset-0 z-50">
            <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setContactOpen(false)} />
            <div className="relative mx-auto mt-[15vh] max-w-md">
              <div className="relative rounded-2xl bg-white ring-1 ring-champagne-gold/40 shadow-2xl p-8 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
                  <div className="absolute -top-16 -left-24 w-56 h-56 rounded-full bg-champagne-gold/10 blur-2xl" />
                  <div className="absolute -bottom-10 -right-20 w-48 h-48 rounded-full bg-champagne-gold/20 blur-2xl" />
                </div>
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-champagne-gold/10 ring-1 ring-champagne-gold/30 text-champagne-gold">
                    <Phone className="w-5 h-5" />
                  </span>
                  <h4 className="text-lg tracking-wide text-gray-900">Speak to Us</h4>
                </div>
                <div className="text-center">
                  <p className="text-sm text-gray-600">Aashni Jewelry Lounge — Chennai</p>
                  <div className="mt-3 text-3xl font-light tracking-widest text-gray-900">9940153000</div>
                  <p className="mt-2 text-xs text-gray-500">Tap call to connect instantly</p>
                </div>
                <div className="mt-6 flex gap-3">
                  <button
                    onClick={() => { window.location.href = 'tel:+919940153000' }}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm tracking-wider bg-gradient-to-br from-gray-900 to-gray-700 text-white ring-1 ring-black/10 shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    <Phone className="w-4 h-4 mr-2" /> Call Now
                  </button>
                  <button
                    onClick={async () => { try { await navigator.clipboard.writeText('9940153000') } catch {} }}
                    className="inline-flex items-center justify-center rounded-full px-6 py-3 text-sm tracking-wider ring-1 ring-champagne-gold/40 text-gray-800 bg-white hover:bg-gradient-to-br hover:from-white hover:to-champagne-gold/10 hover:ring-champagne-gold shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all"
                  >
                    Copy Number
                  </button>
                </div>
                <button
                  onClick={() => setContactOpen(false)}
                  className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
                  aria-label="Close"
                >
                  ✕
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </div>
  )
}
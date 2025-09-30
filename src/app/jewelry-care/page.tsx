'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Sparkles, 
  Shield, 
  Droplets, 
  Sun, 
  Moon, 
  Heart, 
  Star, 
  Gem, 
  Clock, 
  CheckCircle,
  AlertTriangle,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react'
import Image from 'next/image'

interface CareGuide {
  id: string
  title: string
  description: string
  icon: any
  tips: string[]
  dosList: string[]
  dontsList: string[]
  image: string
}

const careGuides: CareGuide[] = [
  {
    id: 'daily-care',
    title: 'Daily Care Essentials',
    description: 'Essential practices to maintain your jewelry\'s brilliance every day',
    icon: Sun,
    tips: [
      'Remove jewelry before applying lotions, perfumes, or cosmetics',
      'Put jewelry on last when getting dressed',
      'Take jewelry off first when undressing',
      'Avoid contact with household chemicals and cleaning products'
    ],
    dosList: [
      'Apply perfume and lotion before wearing jewelry',
      'Remove jewelry before swimming or exercising',
      'Wipe with a soft cloth after each wear',
      'Store immediately after removing'
    ],
    dontsList: [
      'Wear jewelry while cleaning or gardening',
      'Expose to harsh chemicals or bleach',
      'Sleep with jewelry on',
      'Wear in hot tubs or saunas'
    ],
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'cleaning',
    title: 'Professional Cleaning',
    description: 'Expert techniques to restore your jewelry\'s original luster',
    icon: Droplets,
    tips: [
      'Clean jewelry regularly to prevent buildup',
      'Use appropriate cleaning methods for different metals',
      'Professional cleaning recommended annually',
      'Inspect for loose stones during cleaning'
    ],
    dosList: [
      'Use mild soap and lukewarm water',
      'Gently brush with a soft-bristled toothbrush',
      'Rinse thoroughly and dry completely',
      'Polish with a jewelry cloth'
    ],
    dontsList: [
      'Use harsh chemicals or abrasives',
      'Clean with hot water or steam',
      'Use ultrasonic cleaners on delicate pieces',
      'Scrub aggressively'
    ],
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'storage',
    title: 'Proper Storage',
    description: 'Preserve your jewelry\'s beauty with optimal storage solutions',
    icon: Shield,
    tips: [
      'Store each piece separately to prevent scratching',
      'Use anti-tarnish strips for silver jewelry',
      'Keep in a cool, dry place away from sunlight',
      'Use original boxes or soft pouches'
    ],
    dosList: [
      'Line jewelry boxes with soft fabric',
      'Use individual compartments or pouches',
      'Store in a consistent temperature environment',
      'Keep silica gel packets to absorb moisture'
    ],
    dontsList: [
      'Store different metals together',
      'Keep in humid environments like bathrooms',
      'Leave exposed to air for extended periods',
      'Store in plastic bags long-term'
    ],
    image: 'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=400&fit=crop&crop=center'
  },
  {
    id: 'maintenance',
    title: 'Regular Maintenance',
    description: 'Professional maintenance to ensure longevity and safety',
    icon: Clock,
    tips: [
      'Schedule professional inspections annually',
      'Check clasps and settings regularly',
      'Re-polish when necessary',
      'Replace worn parts promptly'
    ],
    dosList: [
      'Have prongs checked by a professional',
      'Get chains and clasps inspected',
      'Schedule professional cleaning',
      'Address issues immediately'
    ],
    dontsList: [
      'Ignore loose stones or damaged settings',
      'Attempt complex repairs yourself',
      'Delay necessary maintenance',
      'Use damaged jewelry'
    ],
    image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=400&fit=crop&crop=center'
  }
]

const metalCareGuides = [
  {
    metal: 'Gold',
    care: 'Clean with mild soap and water. Polish with a soft cloth. Store in a dry place.',
    image: 'https://images.unsplash.com/photo-1543294001-f7cd5d7fb516?w=300&h=200&fit=crop&crop=center'
  },
  {
    metal: 'Silver',
    care: 'Use anti-tarnish strips. Clean with silver polish. Store in airtight containers.',
    image: 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=300&h=200&fit=crop&crop=center'
  },
  {
    metal: 'Platinum',
    care: 'Extremely durable. Clean with mild detergent. Professional polishing recommended.',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&h=200&fit=crop&crop=center'
  },
  {
    metal: 'Diamonds',
    care: 'Clean with ammonia solution. Use soft brush for settings. Professional cleaning yearly.',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&h=200&fit=crop&crop=center'
  }
]

export default function JewelryCarePage() {
  const [activeGuide, setActiveGuide] = useState<string | null>(null)
  const [expandedSection, setExpandedSection] = useState<string>('')

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-white to-orange-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 to-orange-100/20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center justify-center gap-3 mb-6">
              <Sparkles className="w-8 h-8 text-amber-600" />
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 to-orange-700 bg-clip-text text-transparent">
                Jewelry Care Guide
              </h1>
              <Gem className="w-8 h-8 text-amber-600" />
            </div>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
              Preserve the beauty and brilliance of your precious jewelry with our comprehensive care guide. 
              Expert tips and professional techniques to ensure your treasures last a lifetime.
            </p>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Expert Approved</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-blue-500" />
                <span>Professional Standards</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-amber-500" />
                <span>Premium Care</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Care Guides */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Essential Care Practices</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Follow these professional guidelines to maintain your jewelry's pristine condition
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {careGuides.map((guide, index) => (
              <motion.div
                key={guide.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative h-64">
                  <Image
                    src={guide.image}
                    alt={guide.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <guide.icon className="w-8 h-8 mb-2" />
                    <h3 className="text-2xl font-bold">{guide.title}</h3>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-6">{guide.description}</p>

                  {/* Quick Tips */}
                  <div className="mb-6">
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <Info className="w-5 h-5 text-blue-500" />
                      Quick Tips
                    </h4>
                    <ul className="space-y-2">
                      {guide.tips.map((tip, tipIndex) => (
                        <li key={tipIndex} className="flex items-start gap-2 text-sm text-gray-600">
                          <Star className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Expandable Do's and Don'ts */}
                  <button
                    onClick={() => setExpandedSection(expandedSection === guide.id ? '' : guide.id)}
                    className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <span className="font-medium text-gray-900">Do's & Don'ts</span>
                    {expandedSection === guide.id ? (
                      <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                  </button>

                  <AnimatePresence>
                    {expandedSection === guide.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <div className="p-4 bg-green-50 rounded-lg">
                          <h5 className="font-semibold text-green-800 mb-2 flex items-center gap-2">
                            <CheckCircle className="w-4 h-4" />
                            Do's
                          </h5>
                          <ul className="space-y-1">
                            {guide.dosList.map((item, index) => (
                              <li key={index} className="text-sm text-green-700">• {item}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="p-4 bg-red-50 rounded-lg">
                          <h5 className="font-semibold text-red-800 mb-2 flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4" />
                            Don'ts
                          </h5>
                          <ul className="space-y-1">
                            {guide.dontsList.map((item, index) => (
                              <li key={index} className="text-sm text-red-700">• {item}</li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metal-Specific Care */}
      <section className="py-20 bg-gradient-to-r from-amber-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Metal-Specific Care</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Each metal requires specialized care to maintain its unique properties and appearance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metalCareGuides.map((metal, index) => (
              <motion.div
                key={metal.metal}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
              >
                <div className="relative h-48">
                  <Image
                    src={metal.image}
                    alt={metal.metal}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="text-xl font-bold text-white">{metal.metal}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-gray-600 text-sm leading-relaxed">{metal.care}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Professional Services CTA */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-amber-600 to-orange-600 rounded-2xl p-12 text-white"
          >
            <Heart className="w-12 h-12 mx-auto mb-6" />
            <h2 className="text-3xl font-bold mb-4">Professional Jewelry Care Services</h2>
            <p className="text-xl mb-8 opacity-90">
              Let our experts take care of your precious jewelry with professional cleaning, 
              inspection, and maintenance services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-white text-amber-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Schedule Service
              </button>
              <button className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-amber-600 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Emergency Care Tips */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Emergency Care Tips</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Quick solutions for common jewelry emergencies
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Tarnished Silver',
                solution: 'Use a silver polishing cloth or mild silver cleaner. For heavy tarnish, consult a professional.',
                icon: Moon
              },
              {
                title: 'Loose Stone',
                solution: 'Stop wearing immediately and visit a jeweler. Do not attempt to tighten yourself.',
                icon: AlertTriangle
              },
              {
                title: 'Broken Chain',
                solution: 'Collect all pieces and bring to a professional for repair. Avoid DIY fixes.',
                icon: Shield
              }
            ].map((tip, index) => (
              <motion.div
                key={tip.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <tip.icon className="w-8 h-8 text-red-500 mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tip.title}</h3>
                <p className="text-gray-600">{tip.solution}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}


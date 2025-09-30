'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { 
  Crown, 
  Diamond, 
  Sparkles, 
  Award, 
  Heart, 
  Star, 
  Gem, 
  Clock,
  Users,
  Globe,
  Shield,
  Palette
} from 'lucide-react'

export default function AboutPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const milestones = [
    { year: "1990", title: "Foundation", description: "Established with a vision of creating timeless luxury" },
    { year: "2005", title: "International Recognition", description: "First international award for exceptional craftsmanship" },
    { year: "2015", title: "Heritage Collection", description: "Launched our signature heritage line" },
    { year: "2024", title: "Global Presence", description: "Serving discerning clients worldwide" }
  ]

  const values = [
    {
      icon: Crown,
      title: "Uncompromising Excellence",
      description: "Every piece represents the pinnacle of jewelry artistry, crafted to perfection by master artisans with decades of experience.",
      gradient: "from-yellow-400 via-amber-500 to-orange-600"
    },
    {
      icon: Diamond,
      title: "Exceptional Materials",
      description: "We source only the finest diamonds, precious metals, and gemstones, each certified and selected for its extraordinary quality.",
      gradient: "from-blue-400 via-indigo-500 to-purple-600"
    },
    {
      icon: Heart,
      title: "Emotional Connection",
      description: "Our jewelry celebrates life's most precious moments, creating heirloom pieces that tell your unique story for generations.",
      gradient: "from-rose-400 via-pink-500 to-red-600"
    },
    {
      icon: Shield,
      title: "Ethical Commitment",
      description: "We are committed to responsible sourcing, fair trade practices, and supporting the communities where our materials originate.",
      gradient: "from-emerald-400 via-green-500 to-teal-600"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-rose-50/30 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              x: [0, 15, 0],
              rotate: [0, 180, 360],
              scale: [0.6, 1.4, 0.6],
              opacity: [0.1, 0.4, 0.1]
            }}
            transition={{
              duration: 12 + Math.random() * 8,
              repeat: Infinity,
              delay: Math.random() * 10,
              ease: "easeInOut"
            }}
          >
            <Gem className="w-3 h-3 text-rose-300/30" />
          </motion.div>
        ))}
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerContainer}
            className="text-center max-w-6xl mx-auto"
          >
            {/* Luxury Badge */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 rounded-full mb-8 shadow-2xl border border-gray-700/50"
            >
              <Crown className="w-6 h-6 text-yellow-400" />
              <span className="text-sm font-bold text-white tracking-[0.2em] uppercase">
                Maison de Haute Joaillerie
              </span>
              <Sparkles className="w-6 h-6 text-yellow-400" />
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
              className="text-5xl sm:text-6xl lg:text-8xl font-playfair font-bold mb-8 leading-tight"
            >
              <span className="bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 bg-clip-text text-transparent">
                Our
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-600 via-amber-500 to-orange-600 bg-clip-text text-transparent">
                Legacy
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
              className="text-xl lg:text-2xl text-slate-600 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            >
              For over three decades, AASHNI has been the epitome of luxury jewelry craftsmanship, 
              creating extraordinary pieces that transcend time and celebrate the art of fine jewelry making.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Link href="/collections">
                <Button 
                  size="lg" 
                  className="px-12 py-6 bg-gradient-to-r from-slate-900 to-gray-800 hover:from-slate-800 hover:to-gray-700 text-white font-semibold text-lg rounded-full shadow-2xl border border-gray-700/50 transition-all duration-300 hover:scale-105"
                >
                  Explore Collections
                </Button>
              </Link>
              <Link href="/craftsmanship">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-12 py-6 border-2 border-slate-300 text-slate-700 hover:bg-slate-50 font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Our Craftsmanship
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Heritage Story Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl">
                <Image 
                  src="https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&h=600&fit=crop&crop=center" 
                  alt="AASHNI Heritage" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              
              {/* Floating Stats */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="absolute -top-8 -right-8 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-2xl border border-gray-200/50"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-slate-900 mb-1">30+</div>
                  <div className="text-sm text-slate-600 font-medium">Years of Excellence</div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                viewport={{ once: true }}
                className="absolute -bottom-8 -left-8 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-2xl p-6 shadow-2xl text-white"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold mb-1">50K+</div>
                  <div className="text-sm font-medium">Satisfied Clients</div>
                </div>
              </motion.div>
            </motion.div>

            {/* Content */}
            <motion.div
              initial={{ opacity: 0, x: 60 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div className="space-y-6">
                <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 leading-tight">
                  A Heritage of 
                  <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent"> Excellence</span>
                </h2>
                
                <div className="space-y-6 text-lg text-slate-600 leading-relaxed">
                  <p>
                    Founded in 1990 by master jeweler Rajesh Aashni, our maison began as a small atelier 
                    in the heart of Mumbai's jewelry district. With an unwavering commitment to excellence 
                    and a deep respect for traditional Indian craftsmanship, we have evolved into one of 
                    the most respected names in luxury jewelry.
                  </p>
                  
                  <p>
                    Each piece in our collection is a testament to our dedication to perfection. From the 
                    initial sketch to the final polish, every step is executed with meticulous attention 
                    to detail by our team of master artisans, many of whom have been with us for over 
                    two decades.
                  </p>
                  
                  <p>
                    Today, AASHNI stands as a symbol of timeless elegance, combining centuries-old 
                    techniques with contemporary design sensibilities to create jewelry that transcends 
                    trends and becomes treasured heirlooms.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 lg:py-32 bg-gradient-to-br from-slate-50 to-white relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 mb-6">
              Our <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Values</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              The principles that guide every decision, every design, and every piece we create
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="group"
              >
                <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-200/50 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
                  <div className={`w-16 h-16 bg-gradient-to-r ${value.gradient} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <value.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-4">
                    {value.title}
                  </h3>
                  
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {value.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-slate-900 mb-6">
              Our <span className="bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent">Journey</span>
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Milestones that have shaped our legacy of excellence
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-yellow-400 to-amber-600 rounded-full hidden lg:block" />
            
            <div className="space-y-16 lg:space-y-24">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -60 : 60 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                  className={`flex items-center ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className="flex-1 lg:pr-12 lg:pl-12">
                    <div className={`bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-gray-200/50 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                      <div className="text-3xl font-bold text-yellow-600 mb-2">{milestone.year}</div>
                      <h3 className="text-2xl font-playfair font-bold text-slate-900 mb-3">{milestone.title}</h3>
                      <p className="text-slate-600 leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Timeline Dot */}
                  <div className="hidden lg:block w-6 h-6 bg-gradient-to-r from-yellow-400 to-amber-600 rounded-full border-4 border-white shadow-lg relative z-10" />
                  
                  <div className="flex-1" />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-24 lg:py-32 bg-gradient-to-r from-slate-900 via-gray-800 to-slate-900 relative overflow-hidden">
        <div className="absolute inset-0">
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 0.6, 0],
                rotate: [0, 180, 360]
              }}
              transition={{
                duration: 4 + Math.random() * 4,
                repeat: Infinity,
                delay: Math.random() * 8,
                ease: "easeInOut"
              }}
            >
              <Star className="w-2 h-2 text-yellow-400/40" />
            </motion.div>
          ))}
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-white mb-8 leading-tight">
              Begin Your 
              <span className="bg-gradient-to-r from-yellow-400 to-amber-500 bg-clip-text text-transparent"> Legacy</span>
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 leading-relaxed">
              Discover our exquisite collections and find the perfect piece to celebrate your most precious moments
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link href="/collections">
                <Button 
                  size="lg" 
                  className="px-12 py-6 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-bold text-lg rounded-full shadow-2xl transition-all duration-300 hover:scale-105"
                >
                  View Collections
                </Button>
              </Link>
              <Link href="/contact">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="px-12 py-6 border-2 border-gray-400 text-white hover:bg-white/10 font-semibold text-lg rounded-full transition-all duration-300 hover:scale-105"
                >
                  Schedule Consultation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}


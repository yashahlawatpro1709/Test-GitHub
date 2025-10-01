'use client'

import { motion } from 'framer-motion'

export default function ShowroomPage() {
  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 }
  }

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.div
            className="text-center mb-20"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
          >
            <div className="mb-8">
              <span className="text-sm uppercase tracking-[0.2em] text-gray-500 font-light">
                Chennai Showroom
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light text-gray-900 mb-8 tracking-tight">
              Aashni
            </h1>
            
            <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-light">
              Experience our exquisite collection in an atmosphere of refined elegance and timeless sophistication.
            </p>
          </motion.div>

          {/* Main Showroom Images */}
          <motion.div
            className="grid md:grid-cols-2 gap-8 mb-24"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
              className="relative aspect-[4/5] bg-gray-100 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Luxury jewelry showroom interior"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-light uppercase tracking-wider">Showroom Interior</p>
              </div>
            </motion.div>
            
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="relative aspect-[4/5] bg-gray-100 overflow-hidden"
            >
              <img
                src="https://images.unsplash.com/photo-1573408301185-9146fe634ad0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80"
                alt="Private jewelry consultation"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/10"></div>
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-sm font-light uppercase tracking-wider">Private Consultation</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Location & Contact Information */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid lg:grid-cols-2 gap-20 items-start"
            variants={staggerContainer}
            initial="initial"
            animate="animate"
          >
            {/* Contact Information */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 tracking-tight">
                Visit Our Showroom
              </h2>
              
              <div className="space-y-10">
                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3 font-light">Address</h3>
                  <p className="text-lg text-gray-900 leading-relaxed font-light">
                    123 Luxury Avenue<br />
                    T. Nagar, Chennai - 600017<br />
                    Tamil Nadu, India
                  </p>
                </div>

                <div className="border-b border-gray-200 pb-8">
                  <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3 font-light">Contact</h3>
                  <p className="text-lg text-gray-900 font-light">+91 98765 43210</p>
                  <p className="text-lg text-gray-900 font-light">showroom@aashni.com</p>
                </div>

                <div>
                  <h3 className="text-sm uppercase tracking-[0.2em] text-gray-500 mb-3 font-light">Hours</h3>
                  <p className="text-lg text-gray-900 font-light">Monday - Saturday: 10:00 AM - 8:00 PM</p>
                  <p className="text-lg text-gray-900 font-light">Sunday: 11:00 AM - 7:00 PM</p>
                </div>
              </div>
            </motion.div>

            {/* Services */}
            <motion.div
              variants={fadeInUp}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-3xl md:text-4xl font-light text-gray-900 mb-12 tracking-tight">Services</h3>
              
              <div className="space-y-8">
                {[
                  {
                    title: "Personal Consultation",
                    description: "One-on-one styling sessions with our expert consultants"
                  },
                  {
                    title: "Private Appointments",
                    description: "Exclusive viewing sessions in our private consultation rooms"
                  },
                  {
                    title: "Certified Authenticity",
                    description: "All pieces come with certificates of authenticity and quality"
                  },
                  {
                    title: "Lifetime Care",
                    description: "Complimentary cleaning, maintenance, and repair services"
                  }
                ].map((service, index) => (
                  <motion.div
                    key={index}
                    className="border-b border-gray-200 pb-6 last:border-b-0"
                    variants={fadeInUp}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <h4 className="text-lg text-gray-900 mb-2 font-light">{service.title}</h4>
                    <p className="text-gray-600 font-light leading-relaxed">{service.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-20"
            variants={fadeInUp}
            initial="initial"
            animate="animate"
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl md:text-4xl font-light text-gray-900 mb-8 tracking-tight">
              Gallery
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Experience the elegance of our showroom spaces designed for discerning clientele.
            </p>
          </motion.div>

          <motion.div
             className="grid md:grid-cols-3 gap-8"
             variants={staggerContainer}
             initial="initial"
             animate="animate"
           >
             {[
               { 
                 title: "Main Display", 
                 description: "Elegant jewelry displays",
                 image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
                 alt: "Luxury jewelry display cases"
               },
               { 
                 title: "Consultation Room", 
                 description: "Private viewing space",
                 image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2126&q=80",
                 alt: "Private consultation room"
               },
               { 
                 title: "VIP Lounge", 
                 description: "Exclusive client area",
                 image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2158&q=80",
                 alt: "VIP lounge area"
               },
               { 
                 title: "Bridal Collection", 
                 description: "Wedding jewelry corner",
                 image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
                 alt: "Bridal jewelry collection"
               },
               { 
                 title: "Watch Gallery", 
                 description: "Luxury timepieces",
                 image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
                 alt: "Luxury watch display"
               },
               { 
                 title: "Design Studio", 
                 description: "Custom creation space",
                 image: "https://images.unsplash.com/photo-1611652022419-a9419f74343d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80",
                 alt: "Jewelry design studio"
               }
             ].map((item, index) => (
               <motion.div
                 key={index}
                 variants={fadeInUp}
                 transition={{ duration: 0.8, delay: index * 0.1 }}
                 className="group"
               >
                 <div className="aspect-[4/5] bg-gray-100 mb-4 overflow-hidden relative">
                   <img
                     src={item.image}
                     alt={item.alt}
                     className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-300"></div>
                 </div>
                 <h3 className="text-lg text-gray-900 mb-1 font-light">{item.title}</h3>
                 <p className="text-gray-600 text-sm font-light">{item.description}</p>
               </motion.div>
             ))}
           </motion.div>
        </div>
      </section>
    </div>
  )
}
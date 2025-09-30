"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false)
  const onSubmit = (e: React.FormEvent) => { e.preventDefault(); setSubmitted(true) }
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Contact Us</h1>
          <p className="text-warm-gray max-w-2xl">We’d love to hear from you. Send a message and our team will respond shortly.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-2xl">
          <form onSubmit={onSubmit} className="space-y-4 p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input placeholder="First name" required />
              <Input placeholder="Last name" required />
            </div>
            <Input placeholder="Email address" type="email" required />
            <Input placeholder="Subject" required />
            <textarea placeholder="Message" required className="w-full h-32 rounded-md border border-champagne-gold/30 p-3 outline-none focus:ring-2 focus:ring-champagne-gold" />
            <Button variant="luxury" type="submit" className="w-full">Send Message</Button>
            {submitted && <div className="text-center text-green-700">Message sent (demo)</div>}
          </form>
        </div>
      </section>
    </div>
  )
}


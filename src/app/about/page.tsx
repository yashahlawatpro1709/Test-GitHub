import Image from 'next/image'
import { Button } from '@/components/ui/button'

export default function AboutPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="relative pt-28 pb-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl lg:text-5xl font-playfair font-bold text-deep-black mb-4">Our Story</h1>
            <p className="text-warm-gray mb-6">
              Aashni was born from a passion for crafting timeless pieces that blend heritage with modern design. Every jewel is meticulously created by master artisans using ethically sourced materials.
            </p>
            <div className="flex gap-4">
              <Button variant="luxury">Explore Collections</Button>
              <Button variant="elegant">Craftsmanship</Button>
            </div>
          </div>
          <div className="relative h-72 sm:h-96 lg:h-[28rem] rounded-xl overflow-hidden shadow-luxury border border-champagne-gold/20">
            <Image src="https://images.unsplash.com/photo-1616406432255-c7fd3e91ebcf?q=80&w=1400&auto=format&fit=crop" alt="About Aashni" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[{title:'Heritage',desc:'Inspired by centuries-old Indian artistry.'},{title:'Craft',desc:'Hand-finished details and precision setting.'},{title:'Ethics',desc:'Responsible sourcing and mindful processes.'}].map((f) => (
            <div key={f.title} className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


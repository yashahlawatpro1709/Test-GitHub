export default function ShippingPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Shipping Information</h1>
          <p className="text-warm-gray max-w-2xl">Delivery timelines, charges, and tracking details at a glance.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[{t:'Domestic',d:'2-5 business days. Free over ₹5,000.'},{t:'International',d:'5-10 business days. Duties may apply.'},{t:'Tracking',d:'Real-time tracking shared via email.'}].map(x => (
            <div key={x.t} className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">{x.t}</h3>
              <p className="text-gray-600">{x.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


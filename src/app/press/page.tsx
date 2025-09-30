export default function PressPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Press</h1>
          <p className="text-warm-gray max-w-2xl">Latest media mentions and press releases.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {[1,2,3].map(i => (
            <div key={i} className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-deep-black mb-1">Feature Title {i}</h3>
              <p className="text-gray-600">Short highlight about the feature and outlet.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


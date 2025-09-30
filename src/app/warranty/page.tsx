export default function WarrantyPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Warranty</h1>
          <p className="text-warm-gray max-w-2xl">Your jewelry is protected against manufacturing defects.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
            <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">Coverage</h3>
            <p className="text-gray-600">12-month limited warranty covering workmanship and material defects.</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
            <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">Exclusions</h3>
            <p className="text-gray-600">Normal wear, misuse, or unauthorized repairs are not covered.</p>
          </div>
        </div>
      </section>
    </div>
  )
}


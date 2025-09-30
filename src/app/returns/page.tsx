export default function ReturnsPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Returns & Exchange</h1>
          <p className="text-warm-gray max-w-2xl">Hassle-free returns and exchanges. Please review the policy below.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
            <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">Policy Overview</h3>
            <p className="text-gray-600">Returns accepted within 14 days in original condition with proof of purchase.</p>
          </div>
          <div className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
            <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">Exchange</h3>
            <p className="text-gray-600">Exchanges permitted for sizing or defects. Custom items may be excluded.</p>
          </div>
        </div>
      </section>
    </div>
  )
}


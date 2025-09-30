export default function TermsPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Terms of Service</h1>
          <p className="text-warm-gray max-w-2xl">Please review these terms carefully before using our services.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {[{t:'Use of Service',d:'By using our site, you agree to these terms.'},{t:'Purchases',d:'Orders may be subject to verification and availability.'},{t:'Liability',d:'We disclaim certain warranties to the extent permitted.'}].map(s => (
            <div key={s.t} className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">{s.t}</h3>
              <p className="text-gray-600">{s.d}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


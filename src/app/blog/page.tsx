export default function BlogIndexPage() {
  return (
    <div className="bg-gradient-to-b from-ivory to-white">
      <section className="pt-28 pb-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-playfair font-bold text-deep-black mb-3">Blog</h1>
          <p className="text-warm-gray max-w-2xl">Stories on design, craftsmanship, and styling.</p>
        </div>
      </section>
      <section className="pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid md:grid-cols-3 gap-6">
          {[1,2,3].map(i => (
            <div key={i} className="p-6 rounded-xl bg-white border border-champagne-gold/20 shadow-elegant">
              <h3 className="font-playfair text-xl font-bold text-deep-black mb-2">Elegance in Everyday {i}</h3>
              <p className="text-gray-600">Tips to style jewelry for different occasions.</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}


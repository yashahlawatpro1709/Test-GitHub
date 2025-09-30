"use client"

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('[GLOBAL ERROR]', error)
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-gradient-to-b from-ivory to-white">
        <div className="text-center px-6">
          <h2 className="text-3xl font-playfair font-bold text-deep-black mb-2">Unexpected error</h2>
          <p className="text-warm-gray mb-6">{error?.message || 'Please try again.'}</p>
          <button onClick={() => reset()} className="elegant-button px-6 py-2 rounded-md">Reload</button>
        </div>
      </body>
    </html>
  )
}

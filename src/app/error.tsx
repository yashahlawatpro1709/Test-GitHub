"use client"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  console.error('[ROUTE ERROR]', error)
  return (
    <div className="min-h-[60vh] flex items-center justify-center bg-gradient-to-b from-ivory to-white">
      <div className="text-center px-6">
        <h2 className="text-3xl font-playfair font-bold text-deep-black mb-2">Something went wrong</h2>
        <p className="text-warm-gray mb-6">{error?.message || 'An unexpected error occurred.'}</p>
        <button onClick={() => reset()} className="elegant-button px-6 py-2 rounded-md">Try again</button>
      </div>
    </div>
  )
}

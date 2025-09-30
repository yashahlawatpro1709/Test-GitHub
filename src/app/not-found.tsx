import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center bg-gradient-to-b from-ivory to-white">
      <div className="text-center px-6">
        <h1 className="text-5xl font-playfair font-bold text-deep-black mb-3">Page not found</h1>
        <p className="text-warm-gray mb-6">The page you’re looking for doesn’t exist or was moved.</p>
        <Link href="/">
          <Button variant="luxury">Back to Home</Button>
        </Link>
      </div>
    </div>
  )
}


import './tailwind.css'
import type { Metadata } from 'next'
import { ThemeProvider } from '@/components/theme-provider'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartSidebar } from '@/components/cart/cart-sidebar'
import { WishlistSidebar } from '@/components/wishlist/wishlist-sidebar'
import { Toaster } from 'react-hot-toast'
import { Toaster as ShadcnToaster } from '@/components/ui/toaster'
import { ChatbotProvider } from '@/components/ui/chatbot-provider'

export const metadata: Metadata = {
  title: {
    default: 'Aashni - Premium Jewelry Collection',
    template: '%s | Aashni'
  },
  description: 'Discover exquisite handcrafted jewelry pieces that blend traditional artistry with contemporary elegance. Premium gold, diamond, and gemstone collections.',
  keywords: [
    'jewelry',
    'premium jewelry',
    'gold jewelry',
    'diamond jewelry',
    'handcrafted jewelry',
    'luxury accessories',
    'bridal jewelry',
    'engagement rings',
    'necklaces',
    'earrings',
    'bracelets',
    'Indian jewelry'
  ],
  authors: [{ name: 'Aashni Jewelry' }],
  creator: 'Aashni Jewelry',
  metadataBase: new URL('https://aashni.com'),
  openGraph: {
    title: 'Aashni - Premium Jewelry Collection',
    description: 'Discover exquisite handcrafted jewelry pieces that blend traditional artistry with contemporary elegance.',
    url: 'https://aashni.com',
    siteName: 'Aashni Jewelry',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aashni Jewelry Collection',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aashni - Premium Jewelry Collection',
    description: 'Discover exquisite handcrafted jewelry pieces that blend traditional artistry with contemporary elegance.',
    images: ['/og-image.jpg'],
    creator: '@aashni_jewelry',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon-16x16.png',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html 
      lang="en" 
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-background font-inter antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange
        >
          <ChatbotProvider>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1 pt-16 lg:pt-20">
                {children}
              </main>
              <Footer />
            </div>
            <CartSidebar />
            <WishlistSidebar />
            <Toaster 
              position="bottom-right"
              toastOptions={{
                duration: 4000,
                style: {
                  background: '#F8F6F0',
                  color: '#0A0A0A',
                  border: '1px solid #D4AF37',
                },
              }}
            />
            <ShadcnToaster />
          </ChatbotProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

"use client"

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Crown, LogOut, Upload, Image as ImageIcon, Trash2, Save, Loader2, Diamond } from 'lucide-react'
import { toast } from '@/hooks/use-toast'
import Image from 'next/image'

interface SiteImage {
  id: string
  section: string
  imageKey: string
  url: string
  alt?: string
  title?: string
  description?: string
  metadata?: any
  createdAt?: string
  updatedAt?: string
}

interface ImageMetadata {
  [key: string]: {
    title: string
    description: string
    jewelryDetail?: string
    originalPrice?: string
    discountedPrice?: string
    tags?: string
    // Hero section specific fields
    collection?: string
    tagline?: string
    exclusiveOffer?: string
    discount?: string
    additionalOffer?: string
    ctaText?: string
    ctaLink?: string
    // Luxury jewelry specific fields
    category?: string
    purity?: string
    diamondCarat?: string
    metal?: string
    diamond?: string
    general?: string
    price?: string
  }
}

interface Admin {
  id: string
  username: string
  name?: string
  email?: string
}

// Organized page structure
const PAGE_CATEGORIES = [
  {
    id: 'main-page',
    name: 'Main Page',
    description: 'Homepage Sections',
    sections: [
      { id: 'hero', name: 'Hero Section Images', keys: Array.from({ length: 12 }, (_, i) => `slide-${i + 1}`), allowAdd: false, hasHeroText: true },
      { id: 'featured-collections', name: 'Featured Collections', keys: [], allowAdd: true, defaultCount: 6 },
      { id: 'new-arrivals', name: 'New Arrivals', keys: [], allowAdd: true, defaultCount: 6, hasProductDetails: true },
      { id: 'luxury-jewelry', name: 'Luxury Jewelry (High & Fine)', keys: [], allowAdd: true, defaultCount: 8, hasJewelryDetails: true },
      { id: 'brand-story', name: 'Brand Story', keys: ['main-image'], allowAdd: false },
      { id: 'product-showcase', name: 'Product Showcase', keys: Array.from({ length: 6 }, (_, i) => `product-${i + 1}`), allowAdd: false },
      { id: 'testimonials', name: 'Testimonials', keys: Array.from({ length: 3 }, (_, i) => `testimonial-${i + 1}`), allowAdd: false },
    ]
  },
  {
    id: 'gold-page',
    name: 'Gold Jewelry',
    description: 'Gold Collection',
    sections: [
      { id: 'gold-jewelry', name: 'Gold Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'diamond-page',
    name: 'Diamond Jewelry',
    description: 'Diamond Collection',
    sections: [
      { id: 'diamond-jewelry', name: 'Diamond Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'earrings-page',
    name: 'Earrings',
    description: 'Earrings Collection',
    sections: [
      { id: 'earrings', name: 'Earrings Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'rings-page',
    name: 'Rings',
    description: 'Rings Collection',
    sections: [
      { id: 'rings', name: 'Rings Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'daily-wear-page',
    name: 'Daily Wear',
    description: 'Everyday Jewelry',
    sections: [
      { id: 'daily-wear', name: 'Daily Wear Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'gifting-page',
    name: 'Gifting',
    description: 'Gift Collections',
    sections: [
      { id: 'gifting', name: 'Gifting Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'wedding-page',
    name: 'Wedding',
    description: 'Bridal Collections',
    sections: [
      { id: 'wedding', name: 'Wedding Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'more-page',
    name: 'More Collections',
    description: 'Additional Items',
    sections: [
      { id: 'more-collections', name: 'More Collections', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
]

// Flatten all sections for backward compatibility
const SECTIONS = PAGE_CATEGORIES.flatMap(page => page.sections)

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPage, setSelectedPage] = useState(PAGE_CATEGORIES[0].id)
  const [selectedSection, setSelectedSection] = useState(SECTIONS[0].id)
  const [images, setImages] = useState<SiteImage[]>([])
  const [uploading, setUploading] = useState<string | null>(null)
  const [imageKeys, setImageKeys] = useState<string[]>([])
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata>({})
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; imageId: string | null }>({ show: false, imageId: null })
  
  // Get current page sections
  const currentPageSections = PAGE_CATEGORIES.find(p => p.id === selectedPage)?.sections || []

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (admin) {
      loadImages()
    }
  }, [selectedSection, admin])

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/admin/auth/session')
      const data = await response.json()

      if (data.authenticated) {
        setAdmin(data.admin)
      } else {
        router.push('/admin/login')
      }
    } catch (error) {
      router.push('/admin/login')
    } finally {
      setLoading(false)
    }
  }

  const loadImages = async () => {
    try {
      const response = await fetch(`/api/admin/images?section=${selectedSection}`)
      const data = await response.json()
      setImages(data.images || [])
      
      // For dynamic sections, generate keys based on existing images
      const currentSection = SECTIONS.find(s => s.id === selectedSection)
      if (currentSection?.allowAdd) {
        const existingKeys = (data.images || []).map((img: SiteImage) => img.imageKey)
        const defaultCount = currentSection.defaultCount || 6
        const prefix = selectedSection === 'new-arrivals' ? 'product' : 'collection'
        const keysToShow = existingKeys.length > 0 
          ? existingKeys 
          : Array.from({ length: defaultCount }, (_, i) => `${prefix}-${i + 1}`)
        setImageKeys(keysToShow)
      } else {
        setImageKeys(currentSection?.keys || [])
      }
    } catch (error) {
      console.error('Failed to load images:', error)
    }
  }

  const addNewImageSlot = () => {
    const currentSection = SECTIONS.find(s => s.id === selectedSection)
    if (currentSection?.allowAdd) {
      const nextNumber = imageKeys.length + 1
      const prefix = selectedSection === 'new-arrivals' ? 'product' : 'collection'
      const newKey = `${prefix}-${nextNumber}`
      setImageKeys([...imageKeys, newKey])
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/admin/auth/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }

  const handleFileUpload = async (imageKey: string, file: File) => {
    // Validate file type
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload JPG, PNG, or WebP images only. SVG files are not recommended for collections.',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Please upload images smaller than 10MB',
        variant: 'destructive',
      })
      return
    }

    setUploading(imageKey)
    try {
      // Upload to Cloudinary
      const formData = new FormData()
      formData.append('file', file)
      formData.append('folder', `aashni/${selectedSection}`)

      const uploadResponse = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      })

      const uploadData = await uploadResponse.json()

      if (!uploadResponse.ok) {
        throw new Error(uploadData.error || 'Upload failed')
      }

      // Get title and description from metadata if available
      const metadata = imageMetadata[imageKey] || { title: '', description: '' }

      // Prepare metadata object
      const metadataToSave: any = {
        width: uploadData.width,
        height: uploadData.height,
        publicId: uploadData.publicId,
      }

      // Add product details if this is new-arrivals section
      if (selectedSection === 'new-arrivals') {
        metadataToSave.jewelryDetail = metadata.jewelryDetail || null
        metadataToSave.originalPrice = metadata.originalPrice || null
        metadataToSave.discountedPrice = metadata.discountedPrice || null
        metadataToSave.tags = metadata.tags || null
      }

      // Add hero text fields if this is hero section
      if (selectedSection === 'hero') {
        metadataToSave.collection = metadata.collection || null
        metadataToSave.tagline = metadata.tagline || null
        metadataToSave.exclusiveOffer = metadata.exclusiveOffer || null
        metadataToSave.discount = metadata.discount || null
        metadataToSave.additionalOffer = metadata.additionalOffer || null
        metadataToSave.ctaText = metadata.ctaText || null
        metadataToSave.ctaLink = metadata.ctaLink || null
      }

      // Add jewelry fields for all jewelry sections
      const jewelrySections = ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections']
      if (jewelrySections.includes(selectedSection)) {
        metadataToSave.category = metadata.category || null
        metadataToSave.purity = metadata.purity || null
        metadataToSave.diamondCarat = metadata.diamondCarat || null
        metadataToSave.metal = metadata.metal || null
        metadataToSave.diamond = metadata.diamond || null
        metadataToSave.general = metadata.general || null
        metadataToSave.price = metadata.price || null
        metadataToSave.originalPrice = metadata.originalPrice || null
        // Diamond-specific fields
        metadataToSave.cut = (metadata as any).cut || null
        metadataToSave.clarity = (metadata as any).clarity || null
        metadataToSave.color = (metadata as any).color || null
        metadataToSave.detailedDescription = (metadata as any).detailedDescription || null
      }

      // Save to database
      const saveResponse = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: selectedSection,
          imageKey,
          url: uploadData.url,
          alt: `${selectedSection} ${imageKey}`,
          title: metadata.title || null,
          description: metadata.description || null,
          metadata: metadataToSave,
        }),
      })

      const saveData = await saveResponse.json()

      if (saveResponse.ok) {
        toast({
          title: 'Success',
          description: 'Image uploaded successfully',
        })
        loadImages()
      } else {
        throw new Error(saveData.error || 'Failed to save image')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Upload failed',
        variant: 'destructive',
      })
    } finally {
      setUploading(null)
    }
  }

  const handleDeleteImage = async (imageId: string) => {
    try {
      const response = await fetch(`/api/admin/images?id=${imageId}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Image deleted successfully',
        })
        setDeleteConfirm({ show: false, imageId: null })
        loadImages()
      } else {
        throw new Error('Failed to delete image')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Delete failed',
        variant: 'destructive',
      })
      setDeleteConfirm({ show: false, imageId: null })
    }
  }

  const handleUpdateMetadata = async (imageKey: string) => {
    const existingImage = images.find(img => img.imageKey === imageKey)
    if (!existingImage) {
      toast({
        title: 'Error',
        description: 'Please upload an image first',
        variant: 'destructive',
      })
      return
    }

    const metadata = imageMetadata[imageKey]
    if (!metadata?.title && !metadata?.description) {
      toast({
        title: 'Error',
        description: 'Please enter title or description',
        variant: 'destructive',
      })
      return
    }

    try {
      // Prepare metadata
      const metadataToSave: any = { ...existingImage.metadata }
      
      // Add product details if this is new-arrivals section
      if (selectedSection === 'new-arrivals') {
        metadataToSave.jewelryDetail = metadata.jewelryDetail || null
        metadataToSave.originalPrice = metadata.originalPrice || null
        metadataToSave.discountedPrice = metadata.discountedPrice || null
        metadataToSave.tags = metadata.tags || null
      }

      // Add hero text fields if this is hero section
      if (selectedSection === 'hero') {
        metadataToSave.collection = metadata.collection || null
        metadataToSave.tagline = metadata.tagline || null
        metadataToSave.exclusiveOffer = metadata.exclusiveOffer || null
        metadataToSave.discount = metadata.discount || null
        metadataToSave.additionalOffer = metadata.additionalOffer || null
        metadataToSave.ctaText = metadata.ctaText || null
        metadataToSave.ctaLink = metadata.ctaLink || null
      }

      // Add jewelry fields for all jewelry sections
      const jewelrySections = ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections']
      if (jewelrySections.includes(selectedSection)) {
        metadataToSave.category = metadata.category || null
        metadataToSave.purity = metadata.purity || null
        metadataToSave.diamondCarat = metadata.diamondCarat || null
        metadataToSave.metal = metadata.metal || null
        metadataToSave.diamond = metadata.diamond || null
        metadataToSave.general = metadata.general || null
        metadataToSave.price = metadata.price || null
        metadataToSave.originalPrice = metadata.originalPrice || null
        // Diamond-specific fields
        metadataToSave.cut = (metadata as any).cut || null
        metadataToSave.clarity = (metadata as any).clarity || null
        metadataToSave.color = (metadata as any).color || null
        metadataToSave.detailedDescription = (metadata as any).detailedDescription || null
      }

      const response = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: selectedSection,
          imageKey,
          url: existingImage.url,
          alt: existingImage.alt,
          title: metadata.title || null,
          description: metadata.description || null,
          metadata: metadataToSave,
        }),
      })

      if (response.ok) {
        toast({
          title: 'Success',
          description: 'Title and description updated!',
        })
        loadImages()
      } else {
        throw new Error('Failed to update')
      }
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.message || 'Update failed',
        variant: 'destructive',
      })
    }
  }

  const currentSection = SECTIONS.find(s => s.id === selectedSection)

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-black">
        <Loader2 className="w-8 h-8 text-white animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-white">
      {/* Elegant Background Pattern */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, rgba(217, 119, 6, 0.15) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Luxury Header */}
      <header className="relative border-b border-amber-200/60 bg-white/95 backdrop-blur-2xl sticky top-0 z-50 shadow-lg shadow-amber-900/5">
        {/* Subtle top accent */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
        
        <div className="container mx-auto px-8 py-6">
          <div className="flex items-center justify-between">
            {/* Brand Identity */}
            <div className="flex items-center gap-5">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/30 to-yellow-600/30 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
                <div className="relative bg-gradient-to-br from-amber-400/10 to-yellow-600/10 p-3 border border-amber-400/20">
                  <Crown className="w-8 h-8 text-amber-400" strokeWidth={1.5} />
                </div>
              </div>
              <div className="border-l border-amber-300/40 pl-5">
                <h1 className="text-2xl font-light tracking-[0.3em] bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 bg-clip-text text-transparent" style={{ fontFamily: 'Playfair Display, serif' }}>
                  AASHNI
                </h1>
                <p className="text-[10px] tracking-[0.4em] text-amber-700/60 uppercase mt-1">
                  Maison Administration
                </p>
              </div>
            </div>

            {/* Admin Profile */}
            <div className="flex items-center gap-6">
              <div className="text-right border-r border-amber-300/40 pr-6">
                <p className="text-sm font-light text-slate-800 tracking-wide">{admin?.name || admin?.username}</p>
                <p className="text-[10px] text-amber-700/60 tracking-wider uppercase mt-0.5">
                  {admin?.email || 'Master Administrator'}
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="group relative px-6 py-2.5 border border-amber-300/60 bg-gradient-to-r from-amber-50 to-amber-100/50 hover:from-amber-100 hover:to-amber-200/50 transition-all duration-300 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center gap-2">
                  <LogOut className="w-3.5 h-3.5 text-amber-700/70 group-hover:text-amber-700" strokeWidth={1.5} />
                  <span className="text-xs tracking-wider uppercase text-amber-700/70 group-hover:text-amber-700">Sign Out</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-8 py-12">
        {/* Premium Page Selector */}
        <div className="relative mb-12">
          {/* Elegant Header */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-2">
              <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10"></div>
              <h2 className="text-xs tracking-[0.3em] text-amber-700/80 uppercase font-light">Page Management</h2>
              <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10"></div>
            </div>
          </div>
          
          {/* Clean Tab Navigation */}
          <div className="bg-white border border-amber-200/40 shadow-lg overflow-hidden">
            {/* Top Gold Accent */}
            <div className="h-1 bg-gradient-to-r from-amber-200 via-champagne-gold to-amber-200"></div>
            
            <div className="flex overflow-x-auto scrollbar-hide">
              {PAGE_CATEGORIES.map((page, index) => (
                <button
                  key={page.id}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setSelectedPage(page.id)
                    setSelectedSection(page.sections[0].id)
                  }}
                  type="button"
                  className={`
                    group relative flex-1 min-w-[140px] px-6 py-6 border-r border-amber-200/30 transition-all duration-300 cursor-pointer
                    ${selectedPage === page.id
                      ? 'bg-gradient-to-b from-amber-50 to-white'
                      : 'bg-white hover:bg-amber-50/50'
                    }
                    ${index === PAGE_CATEGORIES.length - 1 ? 'border-r-0' : ''}
                  `}
                >
                  {/* Active Indicator */}
                  {selectedPage === page.id && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-champagne-gold to-transparent"></div>
                  )}
                  
                  <div className="relative text-center">
                    <p className={`text-sm tracking-[0.15em] uppercase font-light mb-1 transition-colors duration-200 ${
                      selectedPage === page.id ? 'text-champagne-gold font-medium' : 'text-slate-600 group-hover:text-champagne-gold'
                    }`}>
                      {page.name}
                    </p>
                    <p className={`text-[9px] tracking-[0.2em] uppercase transition-colors duration-200 ${
                      selectedPage === page.id ? 'text-amber-600/80' : 'text-slate-400 group-hover:text-amber-600/60'
                    }`}>
                      {page.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Section Selector - Only for selected page */}
        {currentPageSections.length > 1 && (
          <div className="relative mb-12">
            <div className="mb-6">
              <div className="flex items-center gap-4 mb-3">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10"></div>
                <h2 className="text-xs tracking-[0.3em] text-amber-700/80 uppercase">Select Section</h2>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10"></div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {currentPageSections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSection(section.id)}
                  className={`
                    group relative px-5 py-7 border transition-all duration-500 overflow-hidden rounded-lg
                    ${selectedSection === section.id
                      ? 'bg-gradient-to-br from-amber-100 via-amber-50 to-amber-100 border-amber-400/60 shadow-lg shadow-amber-500/10'
                      : 'bg-white border-amber-200/40 hover:border-amber-400/50 hover:bg-amber-50/50'
                    }
                  `}
                >
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                  
                  <div className="relative text-center">
                    <p className={`text-[10px] tracking-[0.25em] uppercase font-light transition-all duration-300 ${
                      selectedSection === section.id ? 'text-amber-700 font-semibold' : 'text-slate-600 group-hover:text-amber-700'
                    }`}>
                      {section.name}
                    </p>
                  </div>
                  {selectedSection === section.id && (
                    <>
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-500 to-transparent"></div>
                      <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-amber-400/40 to-transparent"></div>
                    </>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Image Management */}
        <div className="relative bg-white border border-amber-200/60 shadow-xl shadow-amber-500/5 overflow-hidden">
          {/* Decorative corner accents */}
          <div className="absolute top-0 left-0 w-24 h-24 border-l border-t border-amber-300/20"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-r border-t border-amber-300/20"></div>
          
          <div className="relative border-b border-amber-200/60 px-8 py-7 bg-gradient-to-r from-amber-50/50 to-white">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-sm font-light tracking-[0.25em] text-slate-800 uppercase">
                  {currentSection?.name}
                </h2>
                <p className="text-[10px] text-amber-700/60 tracking-wider mt-1.5 flex items-center gap-2">
                  <Diamond className="w-3 h-3" strokeWidth={1.5} />
                  Curate your collection with precision
                </p>
              </div>
              {currentSection?.allowAdd && (
                <button
                  onClick={addNewImageSlot}
                  className="group relative px-6 py-3 border border-amber-400/60 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 transition-all duration-300 overflow-hidden shadow-md shadow-amber-500/10"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                  <div className="relative flex items-center gap-2">
                    <Upload className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.5} />
                    <span className="text-[10px] tracking-[0.25em] text-amber-700 uppercase font-light">Add New</span>
                  </div>
                </button>
              )}
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-amber-50/30 to-white">

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {imageKeys.map((imageKey) => {
              const existingImage = images.find(img => img.imageKey === imageKey)
              const isUploading = uploading === imageKey

              return (
                <div key={imageKey} className="group relative bg-white border border-amber-200/60 hover:border-amber-400/60 transition-all duration-500 shadow-md shadow-amber-500/5 hover:shadow-lg hover:shadow-amber-500/10 overflow-hidden">
                  {/* Subtle corner decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-amber-200/40 pb-4">
                      <div>
                        <h3 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light">
                          {imageKey.replace(/-/g, ' ')}
                        </h3>
                        {existingImage && (
                          <p className="text-[9px] text-amber-600/60 tracking-wider mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Active
                          </p>
                        )}
                      </div>
                      {existingImage && (
                        <button
                          onClick={() => setDeleteConfirm({ show: true, imageId: existingImage.id })}
                          className="group/del p-2 border border-red-200/60 bg-red-50 hover:bg-red-100 hover:border-red-300/60 transition-all duration-300"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-red-600/70 group-hover/del:text-red-700" strokeWidth={1.5} />
                        </button>
                      )}
                    </div>

                    {/* Title and Description for Featured Collections */}
                    {selectedSection === 'featured-collections' && (
                      <div className="space-y-3">
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Collection Title</label>
                          <Input
                            type="text"
                            placeholder="e.g., Diamond Necklaces"
                            value={imageMetadata[imageKey]?.title || existingImage?.title || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                title: e.target.value,
                                description: imageMetadata[imageKey]?.description || existingImage?.description || ''
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Collection Description</label>
                          <Input
                            type="text"
                            placeholder="e.g., Elegant diamond-studded pieces..."
                            value={imageMetadata[imageKey]?.description || existingImage?.description || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                title: imageMetadata[imageKey]?.title || existingImage?.title || '',
                                description: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                      </div>
                    )}

                    {/* Hero Text Fields */}
                    {selectedSection === 'hero' && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Slide Title</label>
                          <Input
                            type="text"
                            placeholder="e.g., Exquisite Bridal Heritage"
                            value={imageMetadata[imageKey]?.title || existingImage?.title || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                title: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Description</label>
                          <Input
                            type="text"
                            placeholder="e.g., BRIDAL COUTURE COLLECTION"
                            value={imageMetadata[imageKey]?.description || existingImage?.description || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                description: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Collection Name</label>
                          <Input
                            type="text"
                            placeholder="e.g., RIVAAH"
                            value={imageMetadata[imageKey]?.collection || existingImage?.metadata?.collection || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                collection: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Tagline</label>
                          <Input
                            type="text"
                            placeholder="e.g., MAISON DE HAUTE JOAILLERIE"
                            value={imageMetadata[imageKey]?.tagline || existingImage?.metadata?.tagline || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                tagline: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Exclusive Offer</label>
                            <Input
                              type="text"
                              placeholder="e.g., EXCLUSIVE PREVIEW"
                              value={imageMetadata[imageKey]?.exclusiveOffer || existingImage?.metadata?.exclusiveOffer || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  exclusiveOffer: e.target.value
                                }
                              })}
                              className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Discount Text</label>
                            <Input
                              type="text"
                              placeholder="e.g., UP TO ₹2,50,000"
                              value={imageMetadata[imageKey]?.discount || existingImage?.metadata?.discount || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  discount: e.target.value
                                }
                              })}
                              className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            />
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Additional Offer (e.g., percentage)</label>
                          <Input
                            type="text"
                            placeholder="e.g., 30%"
                            value={imageMetadata[imageKey]?.additionalOffer || existingImage?.metadata?.additionalOffer || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                additionalOffer: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">CTA Button Text</label>
                            <Input
                              type="text"
                              placeholder="e.g., DISCOVER COLLECTION"
                              value={imageMetadata[imageKey]?.ctaText || existingImage?.metadata?.ctaText || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  ctaText: e.target.value
                                }
                              })}
                              className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">CTA Link</label>
                            <Input
                              type="text"
                              placeholder="e.g., /collections/wedding"
                              value={imageMetadata[imageKey]?.ctaLink || existingImage?.metadata?.ctaLink || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  ctaLink: e.target.value
                                }
                              })}
                              className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Product Details for New Arrivals */}
                    {selectedSection === 'new-arrivals' && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Product Title</label>
                          <Input
                            type="text"
                            placeholder="e.g., Royal Heritage Necklace"
                            value={imageMetadata[imageKey]?.title || existingImage?.title || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                title: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Jewelry Detail</label>
                          <Input
                            type="text"
                            placeholder="e.g., 22K Gold • 12.8g"
                            value={imageMetadata[imageKey]?.jewelryDetail || existingImage?.metadata?.jewelryDetail || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                jewelryDetail: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Original Price</label>
                              <Input
                                type="text"
                                placeholder="e.g., ₹99,000.00"
                                value={imageMetadata[imageKey]?.originalPrice || existingImage?.metadata?.originalPrice || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    originalPrice: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Discounted Price</label>
                              <Input
                                type="text"
                                placeholder="e.g., ₹89,000.00"
                                value={imageMetadata[imageKey]?.discountedPrice || existingImage?.metadata?.discountedPrice || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    discountedPrice: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </div>
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Tags (comma separated)</label>
                          <Input
                            type="text"
                            placeholder="e.g., wedding, festival"
                            value={imageMetadata[imageKey]?.tags || existingImage?.metadata?.tags || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                tags: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                      </div>
                    )}

                    {/* Jewelry Details for all jewelry sections */}
                    {['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections'].includes(selectedSection) && (
                      <div className="space-y-4">
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Jewelry Title</label>
                          <Input
                            type="text"
                            placeholder="e.g., Diamond Solitaire Ring"
                            value={imageMetadata[imageKey]?.title || existingImage?.title || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                title: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Description</label>
                          <Input
                            type="text"
                            placeholder="e.g., Exquisite craftsmanship with premium materials"
                            value={imageMetadata[imageKey]?.description || existingImage?.description || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                description: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Category</label>
                          <select
                            value={imageMetadata[imageKey]?.category || existingImage?.metadata?.category || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                category: e.target.value
                              }
                            })}
                            className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          >
                            <option value="">Select Category</option>
                            {/* Show different categories based on section */}
                            {selectedSection === 'gold-jewelry' ? (
                              <>
                                <option value="necklaces">Necklaces</option>
                                <option value="earrings">Earrings</option>
                                <option value="rings">Rings</option>
                                <option value="bangles">Bangles</option>
                                <option value="bracelets">Bracelets</option>
                                <option value="chains">Chains</option>
                                <option value="pendants">Pendants</option>
                              </>
                            ) : selectedSection === 'diamond-jewelry' ? (
                              <>
                                <option value="high-jewelry">High Jewelry</option>
                                <option value="fine-jewelry">Fine Jewelry</option>
                                <option value="rings">Diamond Rings</option>
                                <option value="necklaces">Diamond Necklaces</option>
                                <option value="earrings">Diamond Earrings</option>
                                <option value="bracelets">Diamond Bracelets</option>
                                <option value="pendants">Diamond Pendants</option>
                              </>
                            ) : selectedSection === 'earrings' ? (
                              <>
                                <option value="diamond">Diamond Earrings</option>
                                <option value="gold">Gold Earrings</option>
                                <option value="ruby">Ruby Earrings</option>
                                <option value="emerald">Emerald Earrings</option>
                                <option value="pearl">Pearl Earrings</option>
                                <option value="intimate">Intimate Collection</option>
                                <option value="others">Others</option>
                              </>
                            ) : selectedSection === 'rings' ? (
                              <>
                                <option value="engagement">Engagement Rings</option>
                                <option value="wedding">Wedding Bands</option>
                                <option value="diamond">Diamond Rings</option>
                                <option value="gold">Gold Rings</option>
                                <option value="platinum">Platinum Rings</option>
                                <option value="cocktail">Cocktail Rings</option>
                                <option value="eternity">Eternity Rings</option>
                                <option value="fashion">Fashion Rings</option>
                              </>
                            ) : selectedSection === 'daily-wear' ? (
                              <>
                                <option value="office-wear">Office Wear</option>
                                <option value="casual-wear">Casual Wear</option>
                                <option value="party-wear">Party Wear</option>
                                <option value="evening-wear">Evening Wear</option>
                                <option value="weekend-wear">Weekend Wear</option>
                                <option value="brunch-wear">Brunch Wear</option>
                                <option value="everyday">Everyday Essentials</option>
                                <option value="minimalist">Minimalist Collection</option>
                              </>
                            ) : (
                              <>
                                <option value="high-jewelry">High Jewelry</option>
                                <option value="fine-jewelry">Fine Jewelry</option>
                              </>
                            )}
                          </select>
                        </div>
                        {/* Show different fields for diamond vs other jewelry */}
                        {selectedSection === 'diamond-jewelry' ? (
                          <>
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Cut</label>
                                <select
                                  value={(imageMetadata[imageKey] as any)?.cut || (existingImage?.metadata as any)?.cut || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [imageKey]: {
                                      ...imageMetadata[imageKey],
                                      cut: e.target.value
                                    } as any
                                  })}
                                  className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                >
                                  <option value="">Select Cut</option>
                                  <option value="Round Brilliant">Round Brilliant</option>
                                  <option value="Princess">Princess</option>
                                  <option value="Cushion">Cushion</option>
                                  <option value="Emerald">Emerald</option>
                                  <option value="Oval">Oval</option>
                                  <option value="Pear">Pear</option>
                                  <option value="Marquise">Marquise</option>
                                  <option value="Asscher">Asscher</option>
                                  <option value="Radiant">Radiant</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Clarity</label>
                                <select
                                  value={(imageMetadata[imageKey] as any)?.clarity || (existingImage?.metadata as any)?.clarity || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [imageKey]: {
                                      ...imageMetadata[imageKey],
                                      clarity: e.target.value
                                    } as any
                                  })}
                                  className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                >
                                  <option value="">Select Clarity</option>
                                  <option value="FL">FL (Flawless)</option>
                                  <option value="IF">IF (Internally Flawless)</option>
                                  <option value="VVS1">VVS1</option>
                                  <option value="VVS2">VVS2</option>
                                  <option value="VS1">VS1</option>
                                  <option value="VS2">VS2</option>
                                  <option value="SI1">SI1</option>
                                  <option value="SI2">SI2</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Color</label>
                                <select
                                  value={(imageMetadata[imageKey] as any)?.color || (existingImage?.metadata as any)?.color || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [imageKey]: {
                                      ...imageMetadata[imageKey],
                                      color: e.target.value
                                    } as any
                                  })}
                                  className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                >
                                  <option value="">Select Color</option>
                                  <option value="D">D (Colorless)</option>
                                  <option value="E">E (Colorless)</option>
                                  <option value="F">F (Colorless)</option>
                                  <option value="G">G (Near Colorless)</option>
                                  <option value="H">H (Near Colorless)</option>
                                  <option value="I">I (Near Colorless)</option>
                                  <option value="J">J (Near Colorless)</option>
                                </select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Diamond Carat</label>
                              <Input
                                type="text"
                                placeholder="e.g., 2.5ct"
                                value={imageMetadata[imageKey]?.diamondCarat || existingImage?.metadata?.diamondCarat || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    diamondCarat: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Detailed Description (View Details)</label>
                              <textarea
                                placeholder="Enter comprehensive details about this diamond piece - craftsmanship, certification, special features, etc."
                                value={(imageMetadata[imageKey] as any)?.detailedDescription || (existingImage?.metadata as any)?.detailedDescription || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    detailedDescription: e.target.value
                                  } as any
                                })}
                                rows={4}
                                className="w-full bg-white border border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </>
                        ) : selectedSection === 'earrings' ? (
                          <>
                            {/* Earrings - Detailed Description */}
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Detailed Description (View Details)</label>
                              <textarea
                                placeholder="Enter comprehensive details about this earring - design, materials, craftsmanship, care instructions, etc."
                                value={(imageMetadata[imageKey] as any)?.detailedDescription || (existingImage?.metadata as any)?.detailedDescription || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    detailedDescription: e.target.value
                                  } as any
                                })}
                                rows={4}
                                className="w-full bg-white border border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </>
                        ) : selectedSection === 'rings' ? (
                          <>
                            {/* Rings - Ring Size */}
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Ring Size</label>
                              <select
                                value={(imageMetadata[imageKey] as any)?.ringSize || (existingImage?.metadata as any)?.ringSize || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    ringSize: e.target.value
                                  } as any
                                })}
                                className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                              >
                                <option value="">Select Size</option>
                                <option value="Adjustable">Adjustable</option>
                                <option value="4">Size 4</option>
                                <option value="5">Size 5</option>
                                <option value="6">Size 6</option>
                                <option value="7">Size 7</option>
                                <option value="8">Size 8</option>
                                <option value="9">Size 9</option>
                                <option value="10">Size 10</option>
                                <option value="Custom">Custom Size</option>
                              </select>
                            </div>
                            {/* Rings - Detailed Description */}
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Detailed Description (View Details)</label>
                              <textarea
                                placeholder="Enter comprehensive details about this ring - design, gemstones, band details, sizing info, care instructions, etc."
                                value={(imageMetadata[imageKey] as any)?.detailedDescription || (existingImage?.metadata as any)?.detailedDescription || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    detailedDescription: e.target.value
                                  } as any
                                })}
                                rows={4}
                                className="w-full bg-white border border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </>
                        ) : selectedSection === 'daily-wear' ? (
                          <>
                            {/* Daily Wear - Jewelry Type */}
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Jewelry Type</label>
                              <select
                                value={(imageMetadata[imageKey] as any)?.jewelryType || (existingImage?.metadata as any)?.jewelryType || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    jewelryType: e.target.value
                                  } as any
                                })}
                                className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                              >
                                <option value="">Select Type</option>
                                <option value="Earrings">Earrings</option>
                                <option value="Necklace">Necklace</option>
                                <option value="Bracelet">Bracelet</option>
                                <option value="Ring">Ring</option>
                                <option value="Pendant">Pendant</option>
                                <option value="Anklet">Anklet</option>
                                <option value="Chain">Chain</option>
                              </select>
                            </div>
                            {/* Daily Wear - Style */}
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Style</label>
                              <select
                                value={(imageMetadata[imageKey] as any)?.style || (existingImage?.metadata as any)?.style || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    style: e.target.value
                                  } as any
                                })}
                                className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                              >
                                <option value="">Select Style</option>
                                <option value="Minimalist">Minimalist</option>
                                <option value="Classic">Classic</option>
                                <option value="Modern">Modern</option>
                                <option value="Bohemian">Bohemian</option>
                                <option value="Elegant">Elegant</option>
                                <option value="Trendy">Trendy</option>
                                <option value="Delicate">Delicate</option>
                              </select>
                            </div>
                            {/* Daily Wear - Detailed Description */}
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Detailed Description (View Details)</label>
                              <textarea
                                placeholder="Enter details about this daily wear piece - design, versatility, occasions, styling tips, care instructions, etc."
                                value={(imageMetadata[imageKey] as any)?.detailedDescription || (existingImage?.metadata as any)?.detailedDescription || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    detailedDescription: e.target.value
                                  } as any
                                })}
                                rows={4}
                                className="w-full bg-white border border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </>
                        ) : (
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Purity</label>
                              <Input
                                type="text"
                                placeholder="e.g., 18K Gold"
                                value={imageMetadata[imageKey]?.purity || existingImage?.metadata?.purity || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    purity: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                            <div className="space-y-2">
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Diamond Carat</label>
                              <Input
                                type="text"
                                placeholder="e.g., 2.5 Carat"
                                value={imageMetadata[imageKey]?.diamondCarat || existingImage?.metadata?.diamondCarat || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    diamondCarat: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </div>
                        )}
                        {/* Show Metal/Diamond details only for non-earring, non-ring, and non-daily-wear sections */}
                        {selectedSection !== 'earrings' && selectedSection !== 'rings' && selectedSection !== 'daily-wear' && (
                          <>
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Metal Details</label>
                              <Input
                                type="text"
                                placeholder="e.g., 18K White Gold, Platinum Setting"
                                value={imageMetadata[imageKey]?.metal || existingImage?.metadata?.metal || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    metal: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Diamond Details</label>
                          <Input
                            type="text"
                            placeholder="e.g., VS1 Clarity, D Color, Excellent Cut"
                            value={imageMetadata[imageKey]?.diamond || existingImage?.metadata?.diamond || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                diamond: e.target.value
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                            </div>
                            <div>
                              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">General Details</label>
                              <Input
                                type="text"
                                placeholder="e.g., Handcrafted, Certified, Limited Edition"
                                value={imageMetadata[imageKey]?.general || existingImage?.metadata?.general || ''}
                                onChange={(e) => setImageMetadata({
                                  ...imageMetadata,
                                  [imageKey]: {
                                    ...imageMetadata[imageKey],
                                    general: e.target.value
                                  }
                                })}
                                className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                              />
                            </div>
                          </>
                        )}
                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Price</label>
                            <Input
                              type="text"
                              placeholder="e.g., ₹2,50,000"
                              value={imageMetadata[imageKey]?.price || existingImage?.metadata?.price || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  price: e.target.value
                                }
                              })}
                              className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Original Price</label>
                            <Input
                              type="text"
                              placeholder="e.g., ₹3,00,000"
                              value={imageMetadata[imageKey]?.originalPrice || existingImage?.metadata?.originalPrice || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  originalPrice: e.target.value
                                }
                              })}
                              className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Image Preview */}
                    <div className="aspect-video bg-slate-100 border border-amber-200/60 rounded-lg overflow-hidden relative">
                      {existingImage ? (
                        <Image
                          src={existingImage.url}
                          alt={existingImage.alt || imageKey}
                          fill
                          className="object-cover"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-12 h-12 text-slate-300" />
                        </div>
                      )}
                    </div>

                    {/* Upload and Save Buttons */}
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*"
                        id={`upload-${imageKey}`}
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) {
                            handleFileUpload(imageKey, file)
                          }
                        }}
                        disabled={isUploading}
                      />
                      <label htmlFor={`upload-${imageKey}`}>
                        <Button
                          type="button"
                          className="w-full bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 text-amber-800 border border-amber-300"
                          disabled={isUploading}
                          onClick={() => document.getElementById(`upload-${imageKey}`)?.click()}
                        >
                          {isUploading ? (
                            <>
                              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                              Uploading...
                            </>
                          ) : (
                            <>
                              <Upload className="w-4 h-4 mr-2" />
                              {existingImage ? 'Replace Image' : 'Upload Image'}
                            </>
                          )}
                        </Button>
                      </label>
                      
                      {/* Save Button for sections with metadata */}
                      {(selectedSection === 'featured-collections' || selectedSection === 'new-arrivals' || selectedSection === 'hero' || ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections'].includes(selectedSection)) && existingImage && (
                        <button
                          type="button"
                          onClick={() => handleUpdateMetadata(imageKey)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white font-semibold shadow-lg border border-slate-600 transition-all duration-300 flex items-center justify-center gap-2 rounded"
                        >
                          <Save className="w-4 h-4 text-white" strokeWidth={2} />
                          <span className="text-sm text-white">
                            {selectedSection === 'new-arrivals' ? 'Save Product Details' : selectedSection === 'hero' ? 'Save Hero Text' : ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections'].includes(selectedSection) ? 'Save Jewelry Details' : 'Save Title & Description'}
                          </span>
                        </button>
                      )}
                    </div>

                    {existingImage && (
                      <div className="pt-4 border-t border-amber-200/40">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div className="w-1 h-1 rounded-full bg-amber-400/60"></div>
                            <span className="text-[9px] tracking-[0.2em] text-slate-500 uppercase">Last Updated</span>
                          </div>
                          <div className="text-right">
                            <div className="text-[10px] font-medium text-slate-700">
                              {new Date(existingImage.updatedAt || '').toLocaleDateString('en-US', { 
                                month: 'short', 
                                day: 'numeric', 
                                year: 'numeric' 
                              })}
                            </div>
                            <div className="text-[9px] text-slate-500 mt-0.5">
                              {new Date(existingImage.updatedAt || '').toLocaleTimeString('en-US', { 
                                hour: '2-digit', 
                                minute: '2-digit',
                                hour12: true
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
          </div>
        </div>
      </div>

      {/* Premium Delete Confirmation Modal */}
      {deleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full border border-amber-200/60 animate-in zoom-in-95 duration-200">
            {/* Decorative corner accents */}
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-300/30"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-300/30"></div>
            
            <div className="relative p-8">
              {/* Icon */}
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center mb-6 border border-red-200/60">
                <Trash2 className="w-8 h-8 text-red-600" strokeWidth={1.5} />
              </div>

              {/* Content */}
              <div className="text-center mb-8">
                <h3 className="text-xl font-light tracking-wide text-slate-800 mb-3">
                  Delete Image
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This action cannot be undone. The image will be permanently removed from your collection.
                </p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => setDeleteConfirm({ show: false, imageId: null })}
                  className="flex-1 px-6 py-3 border border-amber-300 bg-white hover:bg-amber-50 text-slate-700 font-medium transition-all duration-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => deleteConfirm.imageId && handleDeleteImage(deleteConfirm.imageId)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium shadow-lg transition-all duration-300 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

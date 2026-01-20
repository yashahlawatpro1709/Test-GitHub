"use client"

import { useEffect, useState, useRef, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
 import { PremiumSelect } from '@/components/ui/select'
 import { Crown, LogOut, Upload, Image as ImageIcon, Trash2, Save, Loader2, Diamond, ZoomIn, GripVertical, X } from 'lucide-react'
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
  temp?: boolean
}

interface ImageMetadata {
  [key: string]: {
    title: string
    description: string
    fullDescription?: string
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
    // Featured Collections section-level header fields
    sectionTitle?: string
    sectionIntro?: string
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

interface PageDefSection {
  id: string
  name: string
  keys: string[]
  allowAdd?: boolean
  defaultCount?: number
  hasJewelryDetails?: boolean
  hasHeroText?: boolean
  hasProductDetails?: boolean
}

interface PageDef {
  id: string
  name: string
  description: string
  sections: PageDefSection[]
}

// Custom fields builder types (only for custom sections)
interface CustomFieldDef {
  id: string
  label: string
  type: 'text' | 'dropdown'
  options?: string[]
  required?: boolean
}

// Organized page structure
const PAGE_CATEGORIES = [
  {
    id: 'main-page',
    name: 'Main Page',
    description: 'Homepage Sections',
    sections: [
      { id: 'hero', name: 'Hero Section Images', keys: [], allowAdd: true, defaultCount: 12, hasHeroText: true },
      { id: 'featured-collections', name: 'Featured Collections', keys: [], allowAdd: true, defaultCount: 6 },
      { id: 'new-arrivals', name: 'New Arrivals', keys: [], allowAdd: true, defaultCount: 6, hasProductDetails: true },
      { id: 'luxury-jewelry', name: 'Luxury Jewelry (High & Fine)', keys: [], allowAdd: true, defaultCount: 8, hasJewelryDetails: true },
      { id: 'brand-story', name: 'Brand Story', keys: ['main-image'], allowAdd: false },
      { id: 'product-showcase', name: 'Product Showcase', keys: Array.from({ length: 6 }, (_, i) => `product-${i + 1}`), allowAdd: false },
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
    id: 'all-jewelry-page',
    name: 'All Jewellery',
    description: 'Curated Collection',
    sections: [
      { id: 'all-jewelry', name: 'All Jewellery', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
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
    id: 'bracelets-page',
    name: 'Bracelets',
    description: 'Bracelets Collection',
    sections: [
      { id: 'bracelets', name: 'Bracelets Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'bangles-page',
    name: 'Bangles',
    description: 'Bangles Collection',
    sections: [
      { id: 'bangles', name: 'Bangles Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
    ]
  },
  {
    id: 'pendants-page',
    name: 'Pendants',
    description: 'Pendants Collection',
    sections: [
      { id: 'pendants', name: 'Pendants Collection', keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true },
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
  {
    id: 'distributor-page',
    name: 'Jewelry Data Distributor',
    description: 'Central upload hub',
    sections: [
      { id: 'jewelry-data-distributor', name: 'Jewelry Data Distributor', keys: [], allowAdd: false }
    ]
  },
]

// Flatten all sections for backward compatibility
const BASE_SECTIONS = PAGE_CATEGORIES.flatMap(page => page.sections)

export default function AdminDashboard() {
  const router = useRouter()
  const [admin, setAdmin] = useState<Admin | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedPage, setSelectedPage] = useState(PAGE_CATEGORIES[0].id)
  const [selectedSection, setSelectedSection] = useState(BASE_SECTIONS[0].id)
  const [images, setImages] = useState<SiteImage[]>([])
  const [uploading, setUploading] = useState<string | null>(null)
  const [uploadingSet, setUploadingSet] = useState<Set<string>>(new Set())
  const [imageKeys, setImageKeys] = useState<string[]>([])
  const [imageMetadata, setImageMetadata] = useState<ImageMetadata>({})
  const [sectionTitle, setSectionTitle] = useState<string>('Featured Collections')
  const [sectionIntro, setSectionIntro] = useState<string>(
    "Discover our meticulously curated collections, where each piece embodies the perfect harmony of traditional craftsmanship and contemporary elegance, designed to celebrate life's most treasured moments."
  )
  const [deleteConfirm, setDeleteConfirm] = useState<{ show: boolean; imageId: string | null }>({ show: false, imageId: null })
const [bulkDeleteConfirm, setBulkDeleteConfirm] = useState<{ show: boolean }>({ show: false })
// Premium confirm for custom section deletion
const [sectionDeleteConfirm, setSectionDeleteConfirm] = useState<{ show: boolean; sectionId: string | null; sectionName?: string }>({ show: false, sectionId: null })
const [zoomPreview, setZoomPreview] = useState<{ show: boolean; url: string; alt: string }>({ show: false, url: '', alt: '' })
  const [dragSourceKey, setDragSourceKey] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [deletingAll, setDeletingAll] = useState(false)
  const [showDistributor, setShowDistributor] = useState(false)
  const [showCustomBuilder, setShowCustomBuilder] = useState(false)
const distributorInputRef = useRef<HTMLInputElement>(null)
  const [distributorUploading, setDistributorUploading] = useState(false)
  const [distributorUploads, setDistributorUploads] = useState<{ id: string; url: string; section: string; imageKey: string }[]>([])
  
  // Distributor form state
  const [distributorForm, setDistributorForm] = useState({
    jewelryType: '',
    subtype: '',
    category: '',
    targetSections: [] as string[],
    diamond: { cut: '', color: '', clarity: '', carat: '' },
    gold: { purity: '', colorFinish: '', weight: '', designStyle: '' },
    polki: { goldPurity: '', polkiSize: '', polkiCount: '', typeCategory: '', designStyle: '', weight: '', finishPlating: '' }
  })

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('admin.distributorForm') : null
      if (saved) setDistributorForm(JSON.parse(saved))
    } catch {}
  }, [])
  
  // Custom sections: state + persistence
  const [customSections, setCustomSections] = useState<{ id: string; name: string; pageId?: string }[]>([])
  const customInitRef = useRef(false)

  useEffect(() => {
    try {
      const saved = typeof window !== 'undefined' ? localStorage.getItem('admin.customSections') : null
      if (saved) setCustomSections(JSON.parse(saved))
    } catch {}
    customInitRef.current = true
  }, [])

  useEffect(() => {
    // Avoid clobbering saved data on first mount before initialization
    if (!customInitRef.current) return
    try {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('admin.customSections')
        // If we have saved data and current state is empty, skip writing
        if (saved && customSections.length === 0) return
        localStorage.setItem('admin.customSections', JSON.stringify(customSections))
      }
    } catch {}
  }, [customSections])

  // Combine base sections and custom sections
  const SECTIONS = useMemo(() => {
    const customAsSections = customSections.map(s => ({
      id: s.id,
      name: s.name,
      keys: [],
      allowAdd: true,
      defaultCount: 12,
      hasJewelryDetails: true,
    }))
    return [...BASE_SECTIONS, ...customAsSections]
  }, [customSections])

  // Build custom pages from custom sections for top navbar
  const CUSTOM_PAGES = useMemo<PageDef[]>(() => customSections.map(s => ({
    id: `${s.id}-page`,
    name: s.name,
    description: 'Custom Section',
    sections: [
      { id: s.id, name: s.name, keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true }
    ]
  })), [customSections])

  // Combine predefined pages and custom pages
  const ALL_PAGES = useMemo<PageDef[]>(() => ([...(PAGE_CATEGORIES as PageDef[]), ...CUSTOM_PAGES]), [CUSTOM_PAGES])

  // Custom Fields: per-section configuration and values (only for custom sections)
  const [customFieldsConfig, setCustomFieldsConfig] = useState<Record<string, CustomFieldDef[]>>({})
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, Record<string, Record<string, string>>>>({})
  const [customFieldVisibility, setCustomFieldVisibility] = useState<Record<string, Record<string, Record<string, boolean>>>>({})
  const fieldsInitRef = useRef(false)

  useEffect(() => {
    try {
      const savedCfg = typeof window !== 'undefined' ? localStorage.getItem('admin.customFieldsConfig') : null
      const savedVals = typeof window !== 'undefined' ? localStorage.getItem('admin.customFieldsValues') : null
      const savedVis = typeof window !== 'undefined' ? localStorage.getItem('admin.customFieldsVisibility') : null
      if (savedCfg) setCustomFieldsConfig(JSON.parse(savedCfg))
      if (savedVals) setCustomFieldValues(JSON.parse(savedVals))
      if (savedVis) setCustomFieldVisibility(JSON.parse(savedVis))
    } catch {}
    fieldsInitRef.current = true
  }, [])

  useEffect(() => {
    if (!fieldsInitRef.current) return
    try {
      if (typeof window !== 'undefined') {
        const existing = localStorage.getItem('admin.customFieldsConfig')
        if (existing && Object.keys(customFieldsConfig).length === 0) return
        localStorage.setItem('admin.customFieldsConfig', JSON.stringify(customFieldsConfig))
      }
    } catch {}
  }, [customFieldsConfig])

  useEffect(() => {
    if (!fieldsInitRef.current) return
    try {
      if (typeof window !== 'undefined') {
        const existing = localStorage.getItem('admin.customFieldsValues')
        if (existing && Object.keys(customFieldValues).length === 0) return
        localStorage.setItem('admin.customFieldsValues', JSON.stringify(customFieldValues))
      }
    } catch {}
  }, [customFieldValues])

  useEffect(() => {
    if (!fieldsInitRef.current) return
    try {
      if (typeof window !== 'undefined') {
        const existing = localStorage.getItem('admin.customFieldsVisibility')
        if (existing && Object.keys(customFieldVisibility).length === 0) return
        localStorage.setItem('admin.customFieldsVisibility', JSON.stringify(customFieldVisibility))
      }
    } catch {}
  }, [customFieldVisibility])

  const isCustomSelected = useMemo(() => customSections.some(s => s.id === selectedSection), [customSections, selectedSection])

  const getFieldsForSection = (sectionId: string) => customFieldsConfig[sectionId] || []

  const addField = (sectionId: string, type: CustomFieldDef['type'] = 'text') => {
    const label = type === 'text' ? 'Text Field' : 'Dropdown Field'
    const id = slugify(`${label}-${Date.now()}`)
    const newField: CustomFieldDef = { id, label, type, options: type === 'dropdown' ? ['Option 1'] : undefined }
    const next = { ...customFieldsConfig, [sectionId]: [...getFieldsForSection(sectionId), newField] }
    setCustomFieldsConfig(next)
  }

  const updateField = (sectionId: string, fieldId: string, patch: Partial<CustomFieldDef>) => {
    const next = getFieldsForSection(sectionId).map(f => f.id === fieldId ? { ...f, ...patch } : f)
    setCustomFieldsConfig({ ...customFieldsConfig, [sectionId]: next })
  }

  const removeField = (sectionId: string, fieldId: string) => {
    const next = getFieldsForSection(sectionId).filter(f => f.id !== fieldId)
    setCustomFieldsConfig({ ...customFieldsConfig, [sectionId]: next })
  }

  const addDropdownOption = (sectionId: string, fieldId: string, option: string) => {
    const field = getFieldsForSection(sectionId).find(f => f.id === fieldId)
    if (!field) return
    const opts = [...(field.options || []), option]
    updateField(sectionId, fieldId, { options: opts })
  }

  const removeDropdownOption = (sectionId: string, fieldId: string, option: string) => {
    const field = getFieldsForSection(sectionId).find(f => f.id === fieldId)
    if (!field) return
    const opts = (field.options || []).filter(o => o !== option)
    updateField(sectionId, fieldId, { options: opts })
  }

  // Per-card value helpers
  const getValueForCard = (sectionId: string, imageKey: string, fieldId: string) => {
    const sectionVals = customFieldValues[sectionId] || {}
    const cardVals = sectionVals[imageKey] || {}
    // Fallback: support old schema where values were section-level
    const legacy = (sectionVals as any)[fieldId]
    return (cardVals[fieldId] ?? legacy ?? '')
  }

  const setValue = (sectionId: string, imageKey: string, fieldId: string, value: string) => {
    const sectionVals = customFieldValues[sectionId] || {}
    const cardVals = sectionVals[imageKey] || {}
    const next = {
      ...customFieldValues,
      [sectionId]: {
        ...sectionVals,
        [imageKey]: { ...cardVals, [fieldId]: value }
      }
    }
    setCustomFieldValues(next)
  }

  const getVisibilityForCard = (sectionId: string, imageKey: string, fieldId: string) => {
    const sectionVis = customFieldVisibility[sectionId] || {}
    const cardVis = sectionVis[imageKey] || {}
    // Default to true if value exists (legacy support), otherwise false
    if (cardVis[fieldId] !== undefined) return cardVis[fieldId]
    const val = getValueForCard(sectionId, imageKey, fieldId)
    return !!val
  }

  const setVisibility = (sectionId: string, imageKey: string, fieldId: string, visible: boolean) => {
    const sectionVis = customFieldVisibility[sectionId] || {}
    const cardVis = sectionVis[imageKey] || {}
    const next = {
      ...customFieldVisibility,
      [sectionId]: {
        ...sectionVis,
        [imageKey]: { ...cardVis, [fieldId]: visible }
      }
    }
    setCustomFieldVisibility(next)
  }

  // Drag & drop reordering for custom fields
  const [draggingFieldId, setDraggingFieldId] = useState<string | null>(null)
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null)
  const [ripple, setRipple] = useState<{ index: number; x: number; y: number; id: number } | null>(null)

  const reorderFields = (sectionId: string, fromIndex: number, toIndex: number) => {
    if (fromIndex === toIndex) return
    const list = [...getFieldsForSection(sectionId)]
    const [moved] = list.splice(fromIndex, 1)
    list.splice(toIndex, 0, moved)
    const next = { ...customFieldsConfig, [sectionId]: list }
    setCustomFieldsConfig(next)
  }

  const onFieldDragStart = (fieldId: string) => {
    setDraggingFieldId(fieldId)
    try { if (navigator?.vibrate) navigator.vibrate(10) } catch {}
  }

  const onFieldDrop = (dropIndex: number, e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault()
    if (!draggingFieldId) return
    const fromIndex = getFieldsForSection(selectedSection).findIndex(f => f.id === draggingFieldId)
    if (fromIndex < 0) { setDraggingFieldId(null); setDragOverIndex(null); return }
    reorderFields(selectedSection, fromIndex, dropIndex)

    // Water ripple effect (premium micro-interaction)
    const rect = (e.currentTarget as HTMLDivElement).getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipple({ index: dropIndex, x, y, id: Date.now() })
    setTimeout(() => setRipple(null), 700)

    setDraggingFieldId(null)
    setDragOverIndex(null)
  }

  const onFieldDragOver = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault()
    setDragOverIndex(index)
  }

  const onFieldDragLeave = () => {
    setDragOverIndex(null)
  }

  // Preview/Save controls for custom sections
  const [showPreview, setShowPreview] = useState(true)
  const [saveNotice, setSaveNotice] = useState('')
  const manualSave = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin.customFieldsConfig', JSON.stringify(customFieldsConfig))
        localStorage.setItem('admin.customFieldsValues', JSON.stringify(customFieldValues))
      }
      setSaveNotice('Saved custom fields for this section.')
      setTimeout(() => setSaveNotice(''), 2000)
    } catch {}
  }
  
  // Get current page sections (including custom)
  const currentPageSections = useMemo(() => {
    const base = PAGE_CATEGORIES.find(p => p.id === selectedPage)?.sections || []
    const customs = customSections.map(s => ({ id: s.id, name: s.name, keys: [], allowAdd: true, defaultCount: 12, hasJewelryDetails: true }))
    return [...base, ...customs]
  }, [selectedPage, customSections])
  // Custom section builder state and handler
  const [customBuilder, setCustomBuilder] = useState<{ name: string }>({ name: '' })
  const slugify = (s: string) => s.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  const handleCreateCustomSection = () => {
    const name = (customBuilder.name || '').trim()
    if (!name) {
      toast({ title: 'Enter a name', description: 'Please provide a section name.' })
      return
    }
    const id = slugify(name)
    if (!id) {
      toast({ title: 'Invalid name', description: 'Name must include letters or numbers.' })
      return
    }
    if (SECTIONS.some((s: any) => s.id === id)) {
      toast({ title: 'Section exists', description: 'Choose a different name.' })
      return
    }
    const updated = [...customSections, { id, name }]
    setCustomSections(updated)
    // Persist immediately to avoid losing on quick refresh
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin.customSections', JSON.stringify(updated))
      }
    } catch {}
    setSelectedSection(id)
    // Keep URL in sync so refresh restores the custom section selection
    try {
      router.replace(`/admin/dashboard?page=${selectedPage}&section=${id}`)
    } catch {}
    setShowCustomBuilder(false)
    setCustomBuilder({ name: '' })
    toast({ title: 'Section created', description: `Added \"${name}\" as a global section.` })
  }


  // Execute deletion without native confirm (used by premium modal)
  const performDeleteCustomSection = (id: string) => {
    try {
      const section = customSections.find(s => s.id === id)
      const label = section?.name || id
      const updated = customSections.filter(s => s.id !== id)
      setCustomSections(updated)
      try { if (typeof window !== 'undefined') localStorage.setItem('admin.customSections', JSON.stringify(updated)) } catch {}
      setCustomFieldsConfig(prev => {
        const { [id]: _removedCfg, ...rest } = prev
        try { if (typeof window !== 'undefined') localStorage.setItem('admin.customFieldsConfig', JSON.stringify(rest)) } catch {}
        return rest
      })
      setCustomFieldValues(prev => {
        const { [id]: _removedVals, ...rest } = prev
        try { if (typeof window !== 'undefined') localStorage.setItem('admin.customFieldsValues', JSON.stringify(rest)) } catch {}
        return rest
      })
      const deletedPageId = `${id}-page`
      if (selectedPage === deletedPageId) {
        const fallbackPage = PAGE_CATEGORIES[0]
        setSelectedPage(fallbackPage.id)
        setSelectedSection(fallbackPage.sections[0].id)
      } else if (selectedSection === id) {
        const currentPage = ALL_PAGES.find(p => p.id === selectedPage)
        const fallbackSection = currentPage?.sections?.[0]?.id || PAGE_CATEGORIES[0].sections[0].id
        setSelectedSection(fallbackSection)
      }
      toast({ title: 'Section deleted', description: `Removed "${label}" from admin and navigation.` })
    } catch (err) {
      console.error('Delete custom section failed:', err)
      toast({ title: 'Delete failed', description: 'Could not delete this section.' })
    }
  }

  // Empty-state for Hero section
  const isHeroEmpty = selectedSection === 'hero' && images.filter(img => img.section === 'hero').length === 0

  // Initialize selected page/section from URL or localStorage
  useEffect(() => {
    try {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : null
      const pageParam = params ? params.get('page') : null
      const sectionParam = params ? params.get('section') : null
      const validPage = !!pageParam && ALL_PAGES.some(p => p.id === pageParam)
      const validSection = !!sectionParam && SECTIONS.some(s => s.id === sectionParam)
      if (validPage) setSelectedPage(pageParam as string)
      if (validSection) setSelectedSection(sectionParam as string)
      if (!validPage || !validSection) {
        const storedPage = typeof window !== 'undefined' ? localStorage.getItem('admin.selectedPage') : null
        const storedSection = typeof window !== 'undefined' ? localStorage.getItem('admin.selectedSection') : null
        if (storedPage && ALL_PAGES.some(p => p.id === storedPage)) setSelectedPage(storedPage)
        if (storedSection && SECTIONS.some(s => s.id === storedSection)) setSelectedSection(storedSection)
      }
    } catch {}
  }, [SECTIONS, ALL_PAGES])

  // Sync selection to URL and localStorage
  useEffect(() => {
    try {
      const params = typeof window !== 'undefined' ? new URLSearchParams(window.location.search) : new URLSearchParams()
      params.set('page', selectedPage)
      params.set('section', selectedSection)
      const path = typeof window !== 'undefined' ? window.location.pathname : '/admin/dashboard'
      router.replace(`${path}?${params.toString()}`, { scroll: false })
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin.selectedPage', selectedPage)
        localStorage.setItem('admin.selectedSection', selectedSection)
      }
    } catch {}
  }, [selectedPage, selectedSection])

  useEffect(() => {
    checkAuth()
  }, [])

  useEffect(() => {
    if (admin) {
      loadImages()
    }
  }, [selectedSection, admin])

  useEffect(() => {
    if (selectedSection === 'featured-collections' && images.length > 0) {
      const titleFromDb = images.find(img => (img.metadata as any)?.sectionTitle)?.metadata?.sectionTitle
      const introFromDb = images.find(img => (img.metadata as any)?.sectionIntro)?.metadata?.sectionIntro
      if (titleFromDb) setSectionTitle(titleFromDb)
      if (introFromDb) setSectionIntro(introFromDb)
    }
  }, [selectedSection, images])

  // Hydrate custom fields from loaded images to ensure admin UI matches DB
  useEffect(() => {
    if (images.length === 0) return

    setCustomFieldValues((prev) => {
      const next = { ...prev }
      let changed = false
      const sectionVals = next[selectedSection] || {}

      images.forEach((img) => {
        if (img.metadata?.customFields && Array.isArray(img.metadata.customFields)) {
          const cardVals = { ...(sectionVals[img.imageKey] || {}) }
          let cardChanged = false
          img.metadata.customFields.forEach((cf: any) => {
            if (cf.id && cf.value !== undefined) {
              if (cardVals[cf.id] !== cf.value) {
                cardVals[cf.id] = cf.value
                cardChanged = true
              }
            }
          })
          if (cardChanged) {
            sectionVals[img.imageKey] = cardVals
            changed = true
          }
        }
      })

      if (changed) {
        next[selectedSection] = sectionVals
        return next
      }
      return prev
    })

    setCustomFieldVisibility((prev) => {
      const next = { ...prev }
      let changed = false
      const sectionVis = next[selectedSection] || {}

      images.forEach((img) => {
        if (img.metadata?.customFields && Array.isArray(img.metadata.customFields)) {
          const cardVis = { ...(sectionVis[img.imageKey] || {}) }
          let cardChanged = false
          img.metadata.customFields.forEach((cf: any) => {
            // Default to true if 'visible' property is missing (legacy data)
            const isVisible = cf.visible !== false
            if (cardVis[cf.id] !== isVisible) {
              cardVis[cf.id] = isVisible
              cardChanged = true
            }
          })
          if (cardChanged) {
            sectionVis[img.imageKey] = cardVis
            changed = true
          }
        }
      })

      if (changed) {
        next[selectedSection] = sectionVis
        return next
      }
      return prev
    })
  }, [images, selectedSection])

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
        let existingKeys = (data.images || []).map((img: SiteImage) => img.imageKey)
        const defaultCount = currentSection.defaultCount || 6
        const prefix = selectedSection === 'new-arrivals' ? 'product' : selectedSection === 'hero' ? 'slide' : 'collection'
        // Normalize numeric order for slide-*, collection-*, and product-* keys
        if (existingKeys.length > 0 && (prefix === 'slide' || prefix === 'collection' || prefix === 'product')) {
          existingKeys = existingKeys
            .map((k: string) => ({ key: k, idx: parseInt((k.match(/(\d+)/)?.[1] || '0'), 10) }))
            .sort((a: { key: string; idx: number }, b: { key: string; idx: number }) => a.idx - b.idx)
            .map((item: { key: string; idx: number }) => item.key)
        }
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

  const getSectionPrefix = (section: string) => {
    return section === 'new-arrivals' ? 'product' : section === 'hero' ? 'slide' : 'collection'
  }

  const getMaxIndexFromKeys = (keys: string[], prefix: string) => {
    const indices = keys
      .map(k => {
        const match = k.match(new RegExp(`^${prefix}-(\\d+)$`))
        return match ? parseInt(match[1], 10) : 0
      })
      .filter(n => !isNaN(n))
    return indices.length ? Math.max(...indices) : 0
  }


  const handleAddNewClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
      fileInputRef.current.click()
    }
  }

  const deleteAllHeroImages = async () => {
    if (selectedSection !== 'hero' || deletingAll) return

    try {
      setDeletingAll(true)
      const currentSection = SECTIONS.find(s => s.id === selectedSection)
      const defaultCount = currentSection?.defaultCount || 12
      const prefix = getSectionPrefix(selectedSection)
      const defaultKeys = Array.from({ length: defaultCount }, (_, i) => `${prefix}-${i + 1}`)

      // Optimistic UI: clear images and reset keys immediately
      setImages([])
      setImageKeys(defaultKeys)

      // Delete existing images in parallel (images already scoped to selectedSection)
      const toDelete = images.filter(img => !img.temp)
      await Promise.allSettled(
        toDelete.map(img => fetch(`/api/admin/images?id=${encodeURIComponent(img.id)}`, { method: 'DELETE' }))
      )

      toast({ title: 'Deleted', description: `Removed ${toDelete.length} hero images.` })
      // Refresh from server to ensure clean state
      await loadImages()
    } catch (err: any) {
      toast({ title: 'Error', description: err?.message || 'Failed to delete all images', variant: 'destructive' })
      await loadImages()
    } finally {
      setDeletingAll(false)
    }
  }

  const handleMultiUpload = async (files: FileList) => {
    const currentSection = SECTIONS.find(s => s.id === selectedSection)
    if (!currentSection?.allowAdd || files.length === 0) return

    const prefix = getSectionPrefix(selectedSection)
    const sectionImages = images.filter(img => img.section === selectedSection)
    const existingKeys = sectionImages.map(img => img.imageKey)
    const startIndex = (getMaxIndexFromKeys(existingKeys, prefix) + 1) || 1
    const fileArray = Array.from(files)
    const newKeys = fileArray.map((_, i) => `${prefix}-${startIndex + i}`)

    // Show slots and instant local previews
    if (sectionImages.length === 0) {
      setImageKeys(newKeys)
    } else {
      setImageKeys(prev => [...prev, ...newKeys])
    }
    newKeys.forEach((key, i) => {
      const file = fileArray[i]
      const previewUrl = URL.createObjectURL(file)
      setImages(prev => {
        const filtered = prev.filter(img => img.imageKey !== key)
        return [
          ...filtered,
          { id: key, section: selectedSection, imageKey: key, url: previewUrl, alt: `${selectedSection} ${key}`, title: '', description: '', temp: true },
        ]
      })
    })

    // Parallel uploads with per-slot tracking
    await Promise.all(
      fileArray.map(async (file, i) => {
        const key = newKeys[i]
        setUploadingSet(prev => new Set(prev).add(key))
        try {
          await handleFileUpload(key, file)
        } finally {
          setUploadingSet(prev => {
            const s = new Set(prev)
            s.delete(key)
            return s
          })
        }
      })
    )
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
    // Validate file type - accept images and videos
    const validTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'
    ]
    if (!validTypes.includes(file.type)) {
      toast({
        title: 'Invalid file type',
        description: 'Please upload JPG, PNG, WebP, GIF images or MP4, WebM, MOV, AVI videos.',
        variant: 'destructive',
      })
      return
    }

    // Validate file size (max 50MB for videos, 10MB for images)
    const isVideo = file.type.startsWith('video/')
    const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
    const maxSizeMB = isVideo ? 50 : 10
    
    if (file.size > maxSize) {
      toast({
        title: 'File too large',
        description: `Please upload ${isVideo ? 'videos' : 'images'} smaller than ${maxSizeMB}MB`,
        variant: 'destructive',
      })
      return
    }

    setUploading(imageKey)
    try {
      // Upload file (image or video)
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

      // Add full description for featured collections
      if (selectedSection === 'featured-collections') {
        metadataToSave.fullDescription = metadata.fullDescription || null
      }

      // Add jewelry fields for all jewelry sections
      const jewelrySections = ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'bracelets', 'bangles', 'pendants', 'daily-wear', 'gifting', 'wedding', 'more-collections', 'all-jewelry']
      if (jewelrySections.includes(selectedSection)) {
        metadataToSave.category = metadata.category || null
        metadataToSave.purity = metadata.purity || null
        metadataToSave.diamondCarat = metadata.diamondCarat || null
        metadataToSave.metal = metadata.metal || null
        metadataToSave.diamond = metadata.diamond || null
        metadataToSave.general = metadata.general || null
        metadataToSave.price = metadata.price || null
        metadataToSave.originalPrice = metadata.originalPrice || null
        // Classification fields
        metadataToSave.jewelryCategory = (metadata as any).jewelryCategory || metadata.category || null
        // Common ring fields
        metadataToSave.ringSubtype = (metadata as any).ringSubtype || null
        metadataToSave.smallDescription = (metadata as any).smallDescription || null
        metadataToSave.largeDescription = (metadata as any).largeDescription || null
        // Diamond-specific fields
        metadataToSave.cut = (metadata as any).cut || null
        metadataToSave.clarity = (metadata as any).clarity || null
        metadataToSave.color = (metadata as any).color || null
        metadataToSave.carat = (metadata as any).carat || metadata.diamondCarat || null
        metadataToSave.detailedDescription = (metadata as any).detailedDescription || null
        // Gold-specific fields
        metadataToSave.purityKarat = (metadata as any).purityKarat || metadata.purity || null
        metadataToSave.colorFinish = (metadata as any).colorFinish || null
        metadataToSave.typeCategory = (metadata as any).typeCategory || metadata.category || null
        metadataToSave.weight = (metadata as any).weight || null
        metadataToSave.designStyle = (metadata as any).designStyle || null
        // Polki-specific fields
      metadataToSave.goldPurity = (metadata as any).goldPurity || null
      metadataToSave.polkiSizeOrCount = (metadata as any).polkiSizeOrCount || null
      metadataToSave.finishPlating = (metadata as any).finishPlating || null
      }

      // Persist custom fields for custom sections
      if (isCustomSelected) {
        const sectionFields = getFieldsForSection(selectedSection)
        const valsForCard = (customFieldValues[selectedSection] || {})[imageKey] || {}
        const customFieldsPayload = sectionFields
          .map((f) => ({
            id: f.id,
            label: f.label,
            type: f.type,
            value: (valsForCard as any)[f.id] ?? '',
            visible: getVisibilityForCard(selectedSection, imageKey, f.id)
          })).filter((cf) => typeof cf.value === 'string' ? cf.value.trim() !== '' : !!cf.value)
        metadataToSave.customFields = customFieldsPayload
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
          description: `${isVideo ? 'Video' : 'Image'} uploaded successfully`,
        })
        loadImages()
      } else {
        throw new Error(saveData.error || `Failed to save ${isVideo ? 'video' : 'image'}`)
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

  const handleDistributorUpload = async (files: FileList) => {
    if (!files || files.length === 0) return
    if (distributorForm.targetSections.length === 0) {
      toast({ title: 'Select sections', description: 'Please choose target sections first.', variant: 'destructive' })
      return
    }

    const validTypes = [
      'image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif',
      'video/mp4', 'video/webm', 'video/quicktime', 'video/x-msvideo'
    ]

    setDistributorUploading(true)
    try {
      const fileArray = Array.from(files)
      for (const file of fileArray) {
        if (!validTypes.includes(file.type)) {
          toast({ title: 'Invalid file', description: 'Upload JPG/PNG/WebP/GIF or MP4/WebM/MOV/AVI.', variant: 'destructive' })
          continue
        }
        const isVideo = file.type.startsWith('video/')
        const maxSize = isVideo ? 50 * 1024 * 1024 : 10 * 1024 * 1024
        if (file.size > maxSize) {
          toast({ title: 'Too large', description: `File exceeds ${isVideo ? '50MB' : '10MB'}`, variant: 'destructive' })
          continue
        }

        for (const targetSection of distributorForm.targetSections) {
          try {
            const prefix = getSectionPrefix(targetSection)
            const existingResp = await fetch(`/api/admin/images?section=${targetSection}`)
            const existingData = await existingResp.json()
            const existingKeys = (existingData.images || []).map((img: SiteImage) => img.imageKey)
            const nextIndex = (getMaxIndexFromKeys(existingKeys, prefix) + 1) || 1
            const imageKey = `${prefix}-${nextIndex}`

            const formData = new FormData()
            formData.append('file', file)
            formData.append('folder', `aashni/${targetSection}`)
            const uploadResponse = await fetch('/api/admin/upload', { method: 'POST', body: formData })
            const uploadData = await uploadResponse.json()
            if (!uploadResponse.ok) throw new Error(uploadData.error || 'Upload failed')

            const metadataToSave: any = {
              width: uploadData.width,
              height: uploadData.height,
              publicId: uploadData.publicId,
              category: distributorForm.category || null,
              jewelryCategory: distributorForm.category || null,
              jewelryType: distributorForm.jewelryType || null,
              jewelrySubType: distributorForm.subtype || null,
            }

            const jewelrySections = ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'bracelets', 'bangles', 'pendants', 'daily-wear', 'gifting', 'wedding', 'more-collections', 'all-jewelry']
            if (jewelrySections.includes(targetSection)) {
              if (distributorForm.subtype === 'diamond') {
                metadataToSave.cut = distributorForm.diamond.cut || null
                metadataToSave.clarity = distributorForm.diamond.clarity || null
                metadataToSave.color = distributorForm.diamond.color || null
                metadataToSave.diamondCarat = distributorForm.diamond.carat || null
              }
              if (distributorForm.subtype === 'gold') {
                metadataToSave.purity = distributorForm.gold.purity || null
                metadataToSave.metal = distributorForm.gold.colorFinish || null
                metadataToSave.weight = distributorForm.gold.weight || null
                metadataToSave.designStyle = distributorForm.gold.designStyle || null
              }
              if (distributorForm.subtype === 'polki') {
                metadataToSave.purity = distributorForm.polki.goldPurity || null
                metadataToSave.polkiSize = distributorForm.polki.polkiSize || null
                metadataToSave.weight = distributorForm.polki.weight || null
                metadataToSave.finishPlating = distributorForm.polki.finishPlating || null
                metadataToSave.designStyle = distributorForm.polki.designStyle || null
              }
            }

            const saveResponse = await fetch('/api/admin/images', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                section: targetSection,
                imageKey,
                url: uploadData.url,
                alt: `${targetSection} ${imageKey}`,
                title: null,
                description: null,
                metadata: metadataToSave,
              }),
            })
            const saveData = await saveResponse.json()
            if (!saveResponse.ok) throw new Error(saveData.error || 'Failed to save image')

            toast({ title: 'Uploaded', description: `Added to ${targetSection}` })
            setDistributorUploads(prev => [...prev, { id: saveData.image?.id || '', url: uploadData.url, section: targetSection, imageKey }])

            if (targetSection === selectedSection) {
              await loadImages()
            }
          } catch (err: any) {
            toast({ title: 'Error', description: err.message || 'Upload failed', variant: 'destructive' })
          }
        }
      }
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Upload failed', variant: 'destructive' })
    } finally {
      setDistributorUploading(false)
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

    const userEdits = imageMetadata[imageKey] || {}
    const { title: editTitle, description: editDesc, ...restEdits } = userEdits
    
    // Merge existing data with edits to prevent data loss
    const metadata = {
      ...(existingImage?.metadata || {}),
      ...restEdits,
      title: editTitle !== undefined ? editTitle : (existingImage?.title || ''),
      description: editDesc !== undefined ? editDesc : (existingImage?.description || '')
    }

    // Allow saving for custom sections even without title/description
    if (!isCustomSelected && selectedSection !== 'hero' && !metadata?.title && !metadata?.description) {
      toast({
        title: 'Error',
        description: 'Please enter title or description',
        variant: 'destructive',
      })
      return
    }

    try {
      // Prepare metadata
      const metadataToSave: any = { ...(existingImage?.metadata || {}) }
      
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

      // Add full description for featured collections
      if (selectedSection === 'featured-collections') {
        metadataToSave.fullDescription = metadata.fullDescription || null
      }

      // Add jewelry fields for all jewelry sections
      const jewelrySections = ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'bracelets', 'bangles', 'pendants', 'daily-wear', 'gifting', 'wedding', 'more-collections', 'all-jewelry']
      if (jewelrySections.includes(selectedSection)) {
        // Common jewelry fields
        metadataToSave.category = metadata.category || null
        metadataToSave.purity = metadata.purity || null
        metadataToSave.diamondCarat = metadata.diamondCarat || null
        metadataToSave.metal = metadata.metal || null
        metadataToSave.diamond = metadata.diamond || null
        metadataToSave.general = metadata.general || null
        metadataToSave.price = metadata.price || null
        metadataToSave.originalPrice = metadata.originalPrice || null
        // Classification fields
        metadataToSave.jewelryCategory = (metadata as any).jewelryCategory || metadata.category || null
        // Ring-specific fields
        metadataToSave.ringSubtype = (metadata as any).ringSubtype || null
        metadataToSave.smallDescription = (metadata as any).smallDescription || null
        metadataToSave.largeDescription = (metadata as any).largeDescription || null
        metadataToSave.ringSize = (metadata as any).ringSize || null
        // Diamond-specific fields
        metadataToSave.cut = (metadata as any).cut || null
        metadataToSave.clarity = (metadata as any).clarity || null
        metadataToSave.color = (metadata as any).color || null
        metadataToSave.carat = (metadata as any).carat || metadata.diamondCarat || null
        // Gold-specific fields
        metadataToSave.purityKarat = (metadata as any).purityKarat || metadata.purity || null
        metadataToSave.colorFinish = (metadata as any).colorFinish || null
        metadataToSave.typeCategory = (metadata as any).typeCategory || metadata.category || null
        metadataToSave.weight = (metadata as any).weight || null
        metadataToSave.designStyle = (metadata as any).designStyle || null
        // Polki-specific fields
        metadataToSave.goldPurity = (metadata as any).goldPurity || null
        metadataToSave.polkiSizeOrCount = (metadata as any).polkiSizeOrCount || null
        metadataToSave.finishPlating = (metadata as any).finishPlating || null
        // Detailed description (shared)
      metadataToSave.detailedDescription = (metadata as any).detailedDescription || null
      }

      // Persist custom fields for custom sections
      if (isCustomSelected) {
        const sectionFields = getFieldsForSection(selectedSection)
        const valsForCard = (customFieldValues[selectedSection] || {})[imageKey] || {}
        const customFieldsPayload = sectionFields
          .map((f) => ({
            id: f.id,
            label: f.label,
            type: f.type,
            value: (valsForCard as any)[f.id] ?? '',
            visible: getVisibilityForCard(selectedSection, imageKey, f.id)
          })).filter((cf) => typeof cf.value === 'string' ? cf.value.trim() !== '' : !!cf.value)
        metadataToSave.customFields = customFieldsPayload
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

  const moveToAllJewelry = async (imageKey: string) => {
    const existingImage = images.find(img => img.imageKey === imageKey)
    if (!existingImage) {
      toast({ title: 'Error', description: 'Please upload an image first', variant: 'destructive' })
      return
    }
    try {
      // Fetch existing All Jewellery items to compute next key
      const res = await fetch(`/api/admin/images?section=all-jewelry`)
      const data = await res.json()
      const existingKeys: string[] = (data.images || []).map((img: SiteImage) => img.imageKey)
      let nextIndex = 1
      if (existingKeys.length > 0) {
        const indices = existingKeys
          .map(k => parseInt((k.match(/(\d+)/)?.[1] || '0'), 10))
          .filter(n => !isNaN(n))
        nextIndex = (indices.length ? Math.max(...indices) : 0) + 1
      }
      const newKey = `collection-${nextIndex}`

      const metadataToSave: any = { ...(existingImage.metadata || {}) }
      // Infer item-type category if missing, based on current section
      if (!metadataToSave.jewelryCategory) {
        const itemTypeSections = ['earrings', 'rings', 'bracelets', 'bangles', 'pendants', 'necklaces']
        if (itemTypeSections.includes(selectedSection)) {
          metadataToSave.jewelryCategory = selectedSection
        }
      }

      const saveRes = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: 'all-jewelry',
          imageKey: newKey,
          url: existingImage.url,
          alt: existingImage.alt || `all-jewelry ${newKey}`,
          title: existingImage.title || null,
          description: existingImage.description || null,
          metadata: metadataToSave,
        }),
      })

      if (!saveRes.ok) throw new Error('Failed to add to All Jewellery')
      toast({ title: 'Success', description: 'Added to All Jewellery' })
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Operation failed', variant: 'destructive' })
    }
  }

  const handleSaveFeaturedCollectionsHeader = async () => {
    try {
      const fcImages = images.filter(img => img.section === 'featured-collections')
      if (fcImages.length === 0) {
        toast({ title: 'Error', description: 'No images found in Featured Collections', variant: 'destructive' })
        return
      }
      const updates = fcImages.map((existingImage) => {
        const metadataToSave: any = { ...(existingImage.metadata || {}) }
        metadataToSave.sectionTitle = sectionTitle || null
        metadataToSave.sectionIntro = sectionIntro || null

        return fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'featured-collections',
            imageKey: existingImage.imageKey,
            url: existingImage.url,
            alt: existingImage.alt,
            title: existingImage.title || null,
            description: existingImage.description || null,
            metadata: metadataToSave,
          }),
        })
      })
      const results = await Promise.all(updates)
      if (results.some(res => !res.ok)) throw new Error('One or more updates failed')
      toast({ title: 'Success', description: 'Section title and description saved' })
      loadImages()
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Save failed', variant: 'destructive' })
    }
  }

  // Save distributor form locally (routes to be added later)
  const handleSaveDistributor = () => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.setItem('admin.distributorForm', JSON.stringify(distributorForm))
      }
      toast({ title: 'Saved', description: 'Distributor form saved locally. Routing will be added later.' })
    } catch (error: any) {
      toast({ title: 'Error', description: error?.message || 'Save failed', variant: 'destructive' })
    }
  }

  // Drag-and-drop swap persistence for hero section
  const persistHeroSwap = async (sourceKey: string, targetKey: string) => {
    if (selectedSection !== 'hero') return

    const sourceImage = images.find(img => img.imageKey === sourceKey)
    const targetImage = images.find(img => img.imageKey === targetKey)

    if (!sourceImage && !targetImage) return

    try {
      if (sourceImage && targetImage) {
        const swapA = fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'hero',
            imageKey: sourceKey,
            url: targetImage.url,
            alt: targetImage.alt,
            title: targetImage.title || null,
            description: targetImage.description || null,
            metadata: targetImage.metadata || null,
          }),
        })
        const swapB = fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'hero',
            imageKey: targetKey,
            url: sourceImage.url,
            alt: sourceImage.alt,
            title: sourceImage.title || null,
            description: sourceImage.description || null,
            metadata: sourceImage.metadata || null,
          }),
        })
        const [resA, resB] = await Promise.all([swapA, swapB])
        if (!resA.ok || !resB.ok) throw new Error('Swap failed')
      } else if (sourceImage && !targetImage) {
        const moveRes = await fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'hero',
            imageKey: targetKey,
            url: sourceImage.url,
            alt: sourceImage.alt,
            title: sourceImage.title || null,
            description: sourceImage.description || null,
            metadata: sourceImage.metadata || null,
          }),
        })
        if (!moveRes.ok) throw new Error('Move failed')
        await fetch(`/api/admin/images?id=${sourceImage.id}`, { method: 'DELETE' })
      } else if (!sourceImage && targetImage) {
        return
      }

      toast({ title: 'Reordered', description: 'Hero slides updated' })
      await loadImages()
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Reorder failed', variant: 'destructive' })
    }
  }

  // Drag-and-drop swap persistence for Featured Collections
  const persistFeaturedSwap = async (sourceKey: string, targetKey: string) => {
    if (selectedSection !== 'featured-collections') return

    const sourceImage = images.find(img => img.imageKey === sourceKey)
    const targetImage = images.find(img => img.imageKey === targetKey)

    if (!sourceImage && !targetImage) return

    try {
      if (sourceImage && targetImage) {
        const swapA = fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'featured-collections',
            imageKey: sourceKey,
            url: targetImage.url,
            alt: targetImage.alt,
            title: targetImage.title || null,
            description: targetImage.description || null,
            metadata: targetImage.metadata || null,
          }),
        })
        const swapB = fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'featured-collections',
            imageKey: targetKey,
            url: sourceImage.url,
            alt: sourceImage.alt,
            title: sourceImage.title || null,
            description: sourceImage.description || null,
            metadata: sourceImage.metadata || null,
          }),
        })
        const [resA, resB] = await Promise.all([swapA, swapB])
        if (!resA.ok || !resB.ok) throw new Error('Swap failed')
      } else if (sourceImage && !targetImage) {
        const moveRes = await fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'featured-collections',
            imageKey: targetKey,
            url: sourceImage.url,
            alt: sourceImage.alt,
            title: sourceImage.title || null,
            description: sourceImage.description || null,
            metadata: sourceImage.metadata || null,
          }),
        })
        if (!moveRes.ok) throw new Error('Move failed')
        await fetch(`/api/admin/images?id=${sourceImage.id}`, { method: 'DELETE' })
      } else if (!sourceImage && targetImage) {
        return
      }

      toast({ title: 'Reordered', description: 'Featured collections updated' })
      await loadImages()
    } catch (error: any) {
      toast({ title: 'Error', description: error.message || 'Reorder failed', variant: 'destructive' })
    }
  }

  // Drag-and-drop swap persistence for New Arrivals
  const persistArrivalsSwap = async (sourceKey: string, targetKey: string) => {
    if (selectedSection !== 'new-arrivals') return

    const sourceImage = images.find(img => img.imageKey === sourceKey)
    const targetImage = images.find(img => img.imageKey === targetKey)

    if (!sourceImage && !targetImage) return

    try {
      if (sourceImage && targetImage) {
        const swapA = fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'new-arrivals',
            imageKey: sourceKey,
            url: targetImage.url,
            alt: targetImage.alt,
            title: targetImage.title || null,
            description: targetImage.description || null,
            metadata: targetImage.metadata || null,
          }),
        })
        const swapB = fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'new-arrivals',
            imageKey: targetKey,
            url: sourceImage.url,
            alt: sourceImage.alt,
            title: sourceImage.title || null,
            description: sourceImage.description || null,
            metadata: sourceImage.metadata || null,
          }),
        })
        const [resA, resB] = await Promise.all([swapA, swapB])
        if (!resA.ok || !resB.ok) throw new Error('Swap failed')
      } else if (sourceImage && !targetImage) {
        const moveRes = await fetch('/api/admin/images', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            section: 'new-arrivals',
            imageKey: targetKey,
            url: sourceImage.url,
            alt: sourceImage.alt,
            title: sourceImage.title || null,
            description: sourceImage.description || null,
            metadata: sourceImage.metadata || null,
          }),
        })
        if (!moveRes.ok) throw new Error('Move failed')
        await fetch(`/api/admin/images?id=${sourceImage.id}`, { method: 'DELETE' })
      } else if (!sourceImage && targetImage) {
        return
      }

      toast({ title: 'Reordered', description: 'New Arrivals updated' })
      await loadImages()
    } catch (error: any) {
    toast({ title: 'Error', description: error.message || 'Reorder failed', variant: 'destructive' })
  }
}

// Generic drag-and-drop swap persistence for other addable sections
const persistGenericSwap = async (sectionId: string, sourceKey: string, targetKey: string) => {
  const sourceImage = images.find(img => img.imageKey === sourceKey)
  const targetImage = images.find(img => img.imageKey === targetKey)
  if (!sourceImage && !targetImage) return

  try {
    if (sourceImage && targetImage) {
      const swapA = fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionId,
          imageKey: sourceKey,
          url: targetImage.url,
          alt: targetImage.alt,
          title: targetImage.title || null,
          description: targetImage.description || null,
          metadata: targetImage.metadata || null,
        }),
      })
      const swapB = fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionId,
          imageKey: targetKey,
          url: sourceImage.url,
          alt: sourceImage.alt,
          title: sourceImage.title || null,
          description: sourceImage.description || null,
          metadata: sourceImage.metadata || null,
        }),
      })
      const [resA, resB] = await Promise.all([swapA, swapB])
      if (!resA.ok || !resB.ok) throw new Error('Swap failed')
    } else if (sourceImage && !targetImage) {
      const moveRes = await fetch('/api/admin/images', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          section: sectionId,
          imageKey: targetKey,
          url: sourceImage.url,
          alt: sourceImage.alt,
          title: sourceImage.title || null,
          description: sourceImage.description || null,
          metadata: sourceImage.metadata || null,
        }),
      })
      if (!moveRes.ok) throw new Error('Move failed')
      await fetch(`/api/admin/images?id=${sourceImage.id}`, { method: 'DELETE' })
    } else if (!sourceImage && targetImage) {
      return
    }

    const sectionName = SECTIONS.find(s => s.id === sectionId)?.name || 'Section'
    toast({ title: 'Reordered', description: `${sectionName} updated` })
    await loadImages()
  } catch (error: any) {
    toast({ title: 'Error', description: error.message || 'Reorder failed', variant: 'destructive' })
  }
}

  const handleDragStart = (key: string) => {
    const current = SECTIONS.find(s => s.id === selectedSection)
    if (current?.allowAdd) setDragSourceKey(key)
  }

  // Auto-scroll page while dragging near viewport edges
  const handleDragOverAutoScroll = (e: React.DragEvent) => {
    const current = SECTIONS.find(s => s.id === selectedSection)
    if (!current?.allowAdd) return
    e.preventDefault()
    const y = e.clientY
    const vh = window.innerHeight
    const threshold = 100
    const speed = 40
    if (y < threshold) {
      window.scrollBy({ top: -speed, behavior: 'auto' })
    } else if (y > vh - threshold) {
      window.scrollBy({ top: speed, behavior: 'auto' })
    }
  }

  const handleDropSwap = (targetKey: string) => {
    if (!dragSourceKey || dragSourceKey === targetKey) return
    if (selectedSection === 'hero') {
      persistHeroSwap(dragSourceKey, targetKey)
    } else if (selectedSection === 'featured-collections') {
      persistFeaturedSwap(dragSourceKey, targetKey)
    } else if (selectedSection === 'new-arrivals') {
      persistArrivalsSwap(dragSourceKey, targetKey)
    } else {
      persistGenericSwap(selectedSection, dragSourceKey, targetKey)
    }
    setDragSourceKey(null)
  }

  // Global dragover listener to support auto-scroll anywhere in viewport
  useEffect(() => {
    const onDragOver = (e: DragEvent) => {
      const current = SECTIONS.find(s => s.id === selectedSection)
      if (!current?.allowAdd) return
      const y = e.clientY
      const vh = window.innerHeight
      const threshold = 120
      const speed = 60
      if (y < threshold) {
        window.scrollBy({ top: -speed, behavior: 'auto' })
      } else if (y > vh - threshold) {
        window.scrollBy({ top: speed, behavior: 'auto' })
      }
      e.preventDefault()
    }
    window.addEventListener('dragover', onDragOver, { passive: false })
    return () => window.removeEventListener('dragover', onDragOver)
  }, [selectedSection])

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

          {/* Quick access actions */}
          <div className="mb-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowDistributor(prev => !prev)}
              className="group relative px-6 py-3 border border-amber-400/60 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 transition-all duration-300 overflow-hidden shadow-md shadow-amber-500/10 rounded-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center gap-2">
                <Upload className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.5} />
                <span className="text-[10px] tracking-[0.25em] text-amber-700 uppercase font-light">Jewelry Data Distributor</span>
              </div>
            </button>
            <button
              type="button"
              onClick={() => setShowCustomBuilder(prev => !prev)}
              className="group relative px-6 py-3 border border-amber-400/60 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 transition-all duration-300 overflow-hidden shadow-md shadow-amber-500/10 rounded-md"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
              <div className="relative flex items-center gap-2">
                <ImageIcon className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.5} />
                <span className="text-[10px] tracking-[0.25em] text-amber-700 uppercase font-light">Create Custom Section</span>
              </div>
            </button>
          </div>

          {showCustomBuilder && (
            <div className="mb-8 bg-white border border-amber-200/60 rounded-md shadow-sm p-6">
              <h3 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-4">Create Custom Section</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-[10px] tracking-[0.25em] text-slate-600 uppercase font-light mb-1">Section Name</label>
                  <Input
                    value={customBuilder.name}
                    onChange={(e) => setCustomBuilder(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="e.g. Festive Picks"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCustomBuilder(false)}
                  className="px-4 py-2 text-xs border rounded-md"
                >Cancel</button>
                <button
                  type="button"
                  onClick={handleCreateCustomSection}
                  className="px-4 py-2 text-xs border border-amber-400 bg-amber-50 rounded-md"
                >Save Section</button>
              </div>
              <p className="mt-2 text-[10px] tracking-[0.2em] text-slate-500">Saved sections appear in Destination chips and page lists.</p>
            </div>
          )}
          {showDistributor && (
          <div className="mb-8 bg-white border border-amber-200/60 rounded-md shadow-sm p-6">
            <h3 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-4">Jewelry Data Distributor</h3>

            {/* ETL Flow Animation */}
            <div className="relative mb-6 rounded-xl border border-amber-200/70 bg-gradient-to-r from-white via-amber-50/70 to-white shadow-sm">
              {/* Premium SVG flow with gradient connectors */}
              <div className="relative px-6 py-5">
                <div className="flex items-center justify-between">
                  {/* Source */}
                  <div className="flex items-center gap-3">
                    <div className="h-11 w-11 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-md">
                      <ImageIcon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-[9px] tracking-[0.25em] text-slate-600 uppercase">Source</div>
                      <div className="text-sm font-semibold text-slate-800">Jewelry Data Distributor</div>
                    </div>
                  </div>

                  {/* Transform */}
                  <div className="flex flex-col items-center">
                    <div className="h-14 w-14 rounded-full bg-amber-100/60 border border-amber-300 flex items-center justify-center shadow-md">
                      <Loader2 className="w-6 h-6 text-amber-700 animate-spin" style={{ animationDuration: distributorUploading ? '1s' : '2.6s' }} />
                    </div>
                    <div className="text-[9px] tracking-[0.25em] text-slate-600 uppercase mt-1">Transform</div>
                  </div>

                  {/* Destination */}
                  <div className="text-right">
                    <div className="text-[9px] tracking-[0.25em] text-slate-600 uppercase mb-1">Destination</div>
                    <div className="flex flex-wrap gap-2 justify-end">
                      {distributorForm.targetSections.length === 0 ? (
                        <span className="text-xs text-slate-500">Select sections</span>
                      ) : (
                        distributorForm.targetSections.map(sec => (
                          <span key={sec} className="px-3 py-1 text-[11px] rounded-full bg-white border border-amber-300 text-amber-800 shadow-sm backdrop-blur-sm animate-fade-in">
                            {sec}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </div>

                {/* SVG connectors */}
                <svg className="absolute inset-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="etlGradient" x1="0" x2="1" y1="0" y2="0">
                      <stop offset="0%" stopColor="#f59e0b" />
                      <stop offset="50%" stopColor="#0ea5e9" />
                      <stop offset="100%" stopColor="#f59e0b" />
                    </linearGradient>
                  </defs>
                  {/* Smooth premium lines aligned to selected destinations */}
                  {(distributorForm.targetSections.length ? distributorForm.targetSections.map((_, i) => Math.min(90, 30 + i * 30)) : [30, 60, 90]).map((y, i) => (
                    <path key={`line-${y}-${i}`} d={`M 140 ${y} C 420 ${y}, 780 ${y}, 1060 ${y}`} stroke="url(#etlGradient)" strokeWidth="2.5" fill="none" className="opacity-60 animate-line" />
                  ))}
                  {/* Moving particles to suggest flow */}
                  {(distributorForm.targetSections.length ? distributorForm.targetSections.map((_, i) => Math.min(90, 30 + i * 30)) : [30, 60, 90]).map((y, i) => (
                    <circle key={`p-${y}-${i}`} cx={140} cy={y} r="3" fill="#f59e0b" className={`animate-particle delay-[${i*200}ms]`} />
                  ))}
                </svg>
              </div>

              <style jsx>{`
                @keyframes linePulse {
                  0% { opacity: 0.4; }
                  50% { opacity: 0.8; }
                  100% { opacity: 0.4; }
                }
                @keyframes particleMove {
                  0% { transform: translateX(0); opacity: 0.6; }
                  50% { opacity: 1; }
                  100% { transform: translateX(920px); opacity: 0.6; }
                }
                .animate-line { animation: linePulse ${distributorUploading ? '1.2s' : '2.6s'} ease-in-out infinite; }
                .animate-particle { animation: particleMove ${distributorUploading ? '1.8s' : '3.4s'} linear infinite; }
                .animate-fade-in { animation: fadeIn 300ms ease-out both; }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(4px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>

            {/* Basic distributor form */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Jewelry Type</label>
                <select
                  className="w-full border border-amber-300 bg-white text-slate-900 text-sm px-3 py-2"
                  value={distributorForm.jewelryType || ''}
                  onChange={(e) => setDistributorForm(prev => ({ ...prev, jewelryType: e.target.value }))}
                >
                  <option value="">Select type</option>
                  <option value="gold">Gold</option>
                  <option value="diamond">Diamond</option>
                  <option value="polki">Polki</option>
                </select>
              </div>
              <div>
                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Category</label>
                <Input
                  type="text"
                  placeholder="e.g. Rings, Earrings"
                  value={distributorForm.category || ''}
                  onChange={(e) => setDistributorForm(prev => ({ ...prev, category: e.target.value }))}
                  className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm"
                />
              </div>
            </div>

            {/* Target sections */}
            <div className="mt-6">
              <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Destination</label>
              <div className="flex flex-wrap gap-2">
                {SECTIONS.map(s => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => {
                      const exists = distributorForm.targetSections?.includes(s.id)
                      const next = exists
                        ? (distributorForm.targetSections || []).filter(id => id !== s.id)
                        : [ ...(distributorForm.targetSections || []), s.id ]
                      setDistributorForm(prev => ({ ...prev, targetSections: next }))
                    }}
                    className={`px-3 py-1 text-[10px] tracking-[0.2em] uppercase rounded border ${distributorForm.targetSections?.includes(s.id) ? 'bg-amber-100 border-amber-300 text-amber-700' : 'bg-white border-slate-300 text-slate-600'}`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Upload controls */}
            <div className="mt-6 flex items-center gap-3">
              <input
                type="file"
                multiple
                ref={distributorInputRef}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    handleDistributorUpload(e.target.files)
                  }
                }}
              />
              <button
                onClick={() => distributorInputRef.current?.click()}
                className="group relative px-6 py-3 border border-amber-400/60 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 transition-all duration-300 overflow-hidden shadow-md shadow-amber-500/10"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                <div className="relative flex items-center gap-2">
                  <Upload className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.5} />
                  <span className="text-[10px] tracking-[0.25em] text-amber-700 uppercase font-light">Upload</span>
                </div>
              </button>

            </div>
          </div>
          
           )}
          {/* Custom Sections Row */}
          {CUSTOM_PAGES.length > 0 && (
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-2">
                <div className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-300/40 to-amber-300/10"></div>
                <h2 className="text-[10px] tracking-[0.3em] text-amber-700/80 uppercase font-light">Custom Sections</h2>
                <div className="flex-1 h-px bg-gradient-to-l from-transparent via-amber-300/40 to-amber-300/10"></div>
              </div>
              <div className="bg-white border border-amber-200/40 shadow-lg overflow-hidden">
                <div className="h-1 bg-gradient-to-r from-amber-200 via-champagne-gold to-amber-200"></div>
                <div className="flex overflow-x-auto scrollbar-hide">
                  {CUSTOM_PAGES.map((page) => (
                    <button
                      key={page.id}
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setSelectedPage(page.id);
                        setSelectedSection(page.sections[0].id);
                      }}
                      type="button"
                      className={`
                        group relative flex-1 min-w-[140px] px-6 py-6 border-r border-amber-200/30 transition-all duration-300 cursor-pointer
                        ${selectedPage === page.id
                          ? 'bg-gradient-to-b from-amber-50 to-white'
                          : 'bg-white hover:bg-amber-50/50'
                        }
                      `}
                    >
                      {/* Delete X button */}
                      <button
                        type="button"
                        aria-label="Delete custom section"
                        onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSectionDeleteConfirm({ show: true, sectionId: page.sections[0].id, sectionName: page.name }) }}
                        className="absolute top-2 right-2 p-1 rounded-full border border-amber-300/60 text-amber-700 hover:bg-amber-50 hover:text-amber-900 transition-colors"
                        title="Delete"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>

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
          )}

          {/* Clean Tab Navigation */}
          <div className="bg-white border border-amber-200/40 shadow-lg overflow-hidden">
            {/* Top Gold Accent */}
            <div className="h-1 bg-gradient-to-r from-amber-200 via-champagne-gold to-amber-200"></div>
            
            <div className="flex overflow-x-auto scrollbar-hide">
              {ALL_PAGES.map((page, index) => (
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
        {currentPageSections.length >= 1 && (
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

        {/* Custom Fields Builder - only for custom sections */}
        {isCustomSelected && (
          <div className="mb-12 bg-white border border-amber-200/60 rounded-md shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light">Custom Fields for this Section</h3>
              <div className="flex gap-2 items-center">
                {saveNotice && <span className="px-2 py-1 text-[10px] rounded bg-emerald-50 border border-emerald-200 text-emerald-700">{saveNotice}</span>}
                <button onClick={() => addField(selectedSection, 'text')} className="px-3 py-2 text-[10px] tracking-[0.25em] uppercase border border-amber-300 bg-amber-50 hover:bg-amber-100">Add Text</button>
                <button onClick={() => addField(selectedSection, 'dropdown')} className="px-3 py-2 text-[10px] tracking-[0.25em] uppercase border border-amber-300 bg-amber-50 hover:bg-amber-100">Add Dropdown</button>
                <button onClick={manualSave} className="px-3 py-2 text-[10px] tracking-[0.25em] uppercase border border-emerald-300 bg-emerald-50 hover:bg-emerald-100 text-emerald-800">Save</button>
                <button onClick={() => setShowPreview(p => !p)} className="px-3 py-2 text-[10px] tracking-[0.25em] uppercase border border-slate-300 bg-slate-50 hover:bg-slate-100">{showPreview ? 'Hide Preview' : 'Show Preview'}</button>
              </div>
            </div>
            
            <style jsx>{`
               @keyframes bubblePop {
                 0% { transform: scale(1); }
                 50% { transform: scale(1.03); }
                 100% { transform: scale(1.02); }
               }
               @keyframes dropRipple {
                 0% { transform: translate(-50%, -50%) scale(0.6); opacity: 0.35; }
                 60% { transform: translate(-50%, -50%) scale(6); opacity: 0.18; }
                 100% { transform: translate(-50%, -50%) scale(9); opacity: 0; }
               }
               .animate-dropRipple {
                 animation: dropRipple 620ms cubic-bezier(0.22, 1, 0.36, 1) forwards;
                 will-change: transform, opacity;
               }
             `}</style>
            
            {/* Field list */}
            <div className="space-y-4">
              {getFieldsForSection(selectedSection).length === 0 ? (
                <div className="text-[11px] text-slate-500">No custom fields yet. Add one above.</div>
              ) : (
                getFieldsForSection(selectedSection).map((f, idx) => (
                  <div
                    key={f.id}
                    className={`border border-amber-200 rounded p-4 transition-all duration-150 ease-out ${draggingFieldId === f.id ? 'ring-2 ring-amber-400/40 shadow-lg scale-[1.02] cursor-grabbing' : 'hover:shadow-sm cursor-grab'} ${dragOverIndex === idx ? 'ring-2 ring-amber-300/50' : ''}`}
                    style={{ animation: draggingFieldId === f.id ? 'bubblePop 180ms ease-out 1' : undefined }}
                    draggable
                    onDragStart={() => onFieldDragStart(f.id)}
                    onDragOver={(e) => onFieldDragOver(e, idx)}
                    onDragLeave={() => onFieldDragLeave()}
                    onDrop={(e) => onFieldDrop(idx, e)}
                    onDragEnd={() => { setDraggingFieldId(null); onFieldDragLeave(); }}
                  >
                    {/* Ripple overlay (appears on drop) */}
                    {ripple?.index === idx && (
                      <span className="pointer-events-none absolute inset-0">
                        <span
                          className="absolute rounded-full animate-dropRipple"
                          style={{
                            left: ripple.x,
                            top: ripple.y,
                            width: 8,
                            height: 8,
                            transform: 'translate(-50%, -50%)',
                            background: 'radial-gradient(circle, rgba(245, 158, 11, 0.28) 0%, rgba(245, 158, 11, 0.20) 40%, rgba(245, 158, 11, 0.10) 70%, rgba(245, 158, 11, 0.02) 85%, transparent 90%)'
                          }}
                        />
                      </span>
                    )}
                    <div className="flex items-center gap-2 text-slate-400 mb-2"><GripVertical className="w-4 h-4" /><span className="text-[10px] uppercase tracking-[0.16em]">Drag to reorder</span></div>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 items-center">
                      <div className="md:col-span-2">
                        <label className="text-[10px] tracking-[0.25em] uppercase text-slate-700">Label</label>
                        <input
                          value={f.label}
                          onChange={(e) => updateField(selectedSection, f.id, { label: e.target.value })}
                          className="mt-1 w-full border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-shadow"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] tracking-[0.25em] uppercase text-slate-700">Type</label>
                        <div className="mt-1">
                          <PremiumSelect
                            value={f.type}
                            onChange={(val) => updateField(selectedSection, f.id, { type: val as any, options: (val as 'text' | 'dropdown') === 'dropdown' ? (f.options || ['Option 1']) : undefined })}
                            options={[
                              { value: 'text', label: 'Text' },
                              { value: 'dropdown', label: 'Dropdown' },
                            ]}
                          />
                        </div>
                      </div>
                      <div className="flex items-end justify-end">
                        <button onClick={() => removeField(selectedSection, f.id)} className="px-3 py-2 text-[10px] tracking-[0.25em] uppercase border border-red-300 bg-red-50 hover:bg-red-100 text-red-700">Delete</button>
                      </div>
                    </div>
                    {f.type === 'dropdown' && (
                      <div className="mt-3">
                        <label className="text-[10px] tracking-[0.25em] uppercase text-slate-600">Options</label>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
                          {(f.options || []).map(opt => (
                            <span
                              key={opt}
                              className="group inline-flex items-center gap-2 px-3 py-1 text-[11px] rounded-full border border-amber-300 bg-amber-50 text-amber-800 hover:bg-amber-100 transition-colors"
                            >
                              <span>{opt}</span>
                              <button
                                aria-label={`Remove ${opt}`}
                                onClick={() => removeDropdownOption(selectedSection, f.id, opt)}
                                className="inline-flex items-center justify-center rounded-full p-0.5 hover:bg-amber-200/60"
                              >
                                <X className="w-3.5 h-3.5 text-amber-700 group-hover:text-amber-900" />
                              </button>
                            </span>
                          ))}
                          <input
                            placeholder="Type and press Enter or ,"
                            className="flex-1 min-w-[160px] md:min-w-[220px] border border-slate-300 rounded px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-shadow"
                            onKeyDown={(e) => {
                              const input = e.target as HTMLInputElement
                              const val = input.value.trim()
                              if ((e.key === 'Enter' || e.key === ',') && val) {
                                addDropdownOption(selectedSection, f.id, val)
                                input.value = ''
                                e.preventDefault()
                              }
                              if (e.key === 'Backspace' && !input.value && (f.options || []).length) {
                                const last = (f.options || [])[(f.options || []).length - 1]
                                removeDropdownOption(selectedSection, f.id, last)
                              }
                            }}
                            onBlur={(e) => {
                              const val = (e.target as HTMLInputElement).value.trim()
                              if (val) {
                                addDropdownOption(selectedSection, f.id, val)
                                ;(e.target as HTMLInputElement).value = ''
                              }
                            }}
                          />
                          <button
                            onClick={(e) => {
                              const input = (e.currentTarget.previousSibling as HTMLInputElement)
                              const val = input?.value.trim()
                              if (val) {
                                addDropdownOption(selectedSection, f.id, val)
                                input.value = ''
                              }
                            }}
                            className="px-4 py-2 text-[10px] tracking-[0.25em] uppercase border border-amber-400 bg-amber-100 text-amber-800 hover:bg-amber-200 hover:border-amber-500 transition-colors"
                          >
                            Add Option
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>

            {/* Per-card custom field values are edited within each image card below. */}
            {/* Preview moved into collection cards for custom sections */}
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
                <>
                   <input
                     type="file"
                     multiple
                     ref={fileInputRef}
                     className="hidden"
                     onChange={(e) => {
                       if (e.target.files) {
                         handleMultiUpload(e.target.files)
                       }
                     }}
                   />
                   <div className="flex items-center gap-3">
                     <button
                       onClick={handleAddNewClick}
                       className="group relative px-6 py-3 border border-amber-400/60 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 transition-all duration-300 overflow-hidden shadow-md shadow-amber-500/10"
                     >
                       <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/20 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                       <div className="relative flex items-center gap-2">
                         <Upload className="w-3.5 h-3.5 text-amber-700" strokeWidth={1.5} />
                         <span className="text-[10px] tracking-[0.25em] text-amber-700 uppercase font-light">Add New</span>
                       </div>
                     </button>
                     {selectedSection === 'hero' && (
                       <button
                         onClick={() => setBulkDeleteConfirm({ show: true })}
                         disabled={deletingAll}
                         className="group relative px-6 py-3 border border-red-300/60 bg-gradient-to-r from-red-100 to-red-50 hover:from-red-200 hover:to-red-100 transition-all duration-300 overflow-hidden shadow-md shadow-red-500/10 disabled:opacity-60"
                       >
                         <div className="absolute inset-0 bg-gradient-to-r from-red-400/0 via-red-400/20 to-red-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700"></div>
                         <div className="relative flex items-center gap-2">
                           <Trash2 className="w-3.5 h-3.5 text-red-700" strokeWidth={1.5} />
                           <span className="text-[10px] tracking-[0.25em] text-red-700 uppercase font-light">Delete All</span>
                         </div>
                       </button>
                     )}
                   </div>
                 </>
              )}
            </div>
          </div>

          <div className="p-8 bg-gradient-to-br from-amber-50/30 to-white">

          {false && (
            <div className="mb-8 bg-white border border-amber-200/60 rounded-md shadow-sm p-6">
              <h3 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-4">Jewelry Data Distributor</h3>

              {/* ETL Flow Animation */}
              <div className="relative mb-6 rounded-xl border border-amber-200/70 bg-gradient-to-r from-white via-amber-50/70 to-white shadow-sm">
                {/* Premium SVG flow with gradient connectors */}
                <div className="relative px-6 py-5">
                  <div className="flex items-center justify-between">
                    {/* Source */}
                    <div className="flex items-center gap-3">
                      <div className="h-11 w-11 rounded-lg bg-amber-600 text-white flex items-center justify-center shadow-md">
                        <ImageIcon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[9px] tracking-[0.25em] text-slate-600 uppercase">Source</div>
                        <div className="text-sm font-semibold text-slate-800">Jewelry Data Distributor</div>
                      </div>
                    </div>

                    {/* Transform */}
                    <div className="flex flex-col items-center">
                      <div className="h-14 w-14 rounded-full bg-amber-100/60 border border-amber-300 flex items-center justify-center shadow-md">
                        <Loader2 className={`w-6 h-6 text-amber-700 ${distributorUploading ? 'animate-spin' : ''}`} />
                      </div>
                      <div className="text-[9px] tracking-[0.25em] text-slate-600 uppercase mt-1">Transform</div>
                    </div>

                    {/* Destination */}
                    <div className="text-right">
                      <div className="text-[9px] tracking-[0.25em] text-slate-600 uppercase mb-1">Destination</div>
                      <div className="flex flex-wrap gap-2 justify-end">
                        {distributorForm.targetSections.length === 0 ? (
                          <span className="text-xs text-slate-500">Select sections</span>
                        ) : (
                          distributorForm.targetSections.map(sec => (
                            <span key={sec} className="px-3 py-1 text-[11px] rounded-full bg-white border border-amber-300 text-amber-800 shadow-sm backdrop-blur-sm animate-fade-in">
                              {sec}
                            </span>
                          ))
                        )}
                      </div>
                    </div>
                  </div>

                  {/* SVG connectors */}
                  <svg className="absolute inset-0" viewBox="0 0 1200 120" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="etlGradient" x1="0" x2="1" y1="0" y2="0">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="50%" stopColor="#0ea5e9" />
                        <stop offset="100%" stopColor="#f59e0b" />
                      </linearGradient>
                    </defs>
                    {/* Smooth premium lines aligned to selected destinations */}
                    {(distributorForm.targetSections.length ? distributorForm.targetSections.map((_, i) => Math.min(90, 30 + i * 30)) : [30, 60, 90]).map((y, i) => (
                      <path key={`line-${y}-${i}`} d={`M 140 ${y} C 420 ${y}, 780 ${y}, 1060 ${y}`} stroke="url(#etlGradient)" strokeWidth="2.5" fill="none" className="opacity-60 animate-line" />
                    ))}
                    {/* Moving particles to suggest flow */}
                    {(distributorForm.targetSections.length ? distributorForm.targetSections.map((_, i) => Math.min(90, 30 + i * 30)) : [30, 60, 90]).map((y, i) => (
                      <circle key={`p-${y}-${i}`} cx={140} cy={y} r="3" fill="#f59e0b" className={`animate-particle delay-[${i*200}ms]`} />
                    ))}
                  </svg>
                </div>

                <style jsx>{`
                  @keyframes linePulse {
                    0% { opacity: 0.4; }
                    50% { opacity: 0.8; }
                    100% { opacity: 0.4; }
                  }
                  @keyframes particleMove {
                    0% { transform: translateX(0); opacity: 0.6; }
                    50% { opacity: 1; }
                    100% { transform: translateX(920px); opacity: 0.6; }
                  }
                  .animate-line { animation: linePulse ${distributorUploading ? '1.2s' : '2.6s'} ease-in-out infinite; }
                  .animate-particle { animation: particleMove ${distributorUploading ? '1.8s' : '3.4s'} linear infinite; }
                  .animate-fade-in { animation: fadeIn 300ms ease-out both; }
                  @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(4px); }
                    to { opacity: 1; transform: translateY(0); }
                  }
                `}</style>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Jewelry Type</label>
                  <select
                    className="w-full border border-amber-300 rounded-md p-2 text-sm"
                    value={distributorForm.jewelryType}
                    onChange={(e) => setDistributorForm(prev => ({ ...prev, jewelryType: e.target.value }))}
                  >
                    <option value="">Select Type</option>
                    <option value="high">High Jewelry</option>
                    <option value="fine">Fine Jewelry</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Subtype</label>
                  <select
                    className="w-full border border-amber-300 rounded-md p-2 text-sm"
                    value={distributorForm.subtype}
                    onChange={(e) => setDistributorForm(prev => ({ ...prev, subtype: e.target.value }))}
                  >
                    <option value="">Select Subtype</option>
                    <option value="gold">Gold</option>
                    <option value="diamond">Diamond</option>
                    <option value="polki">Polki</option>
                  </select>
                </div>
                <div>
                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Category</label>
                  <select
                    className="w-full border border-amber-300 rounded-md p-2 text-sm"
                    value={distributorForm.category}
                    onChange={(e) => setDistributorForm(prev => ({ ...prev, category: e.target.value }))}
                  >
                    <option value="">Select Category</option>
                    <option value="set">Set</option>
                    <option value="necklace">Necklace</option>
                    <option value="earrings">Earrings</option>
                    <option value="bracelet">Bracelet</option>
                    <option value="bangle">Bangle</option>
                    <option value="rings">Rings</option>
                    <option value="pendants">Pendants</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-2">Target Sections</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {['earrings','rings','bracelets','bangles','pendants','necklaces','set'].map(sec => (
                    <label key={sec} className="flex items-center gap-2 text-sm">
                      <input
                        type="checkbox"
                        checked={distributorForm.targetSections.includes(sec)}
                        onChange={(e) => setDistributorForm(prev => ({
                          ...prev,
                          targetSections: e.target.checked
                            ? [...prev.targetSections, sec]
                            : prev.targetSections.filter(s => s !== sec)
                        }))}
                      />
                      <span className="capitalize">{sec}</span>
                    </label>
                  ))}
                </div>
              </div>

              {distributorForm.subtype === 'diamond' && (
                <div className="mt-6">
                  <h4 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-2">Diamond Attributes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Cut</label>
                      <select
                        className="w-full border border-amber-300 rounded-md p-2 text-sm"
                        value={distributorForm.diamond.cut}
                        onChange={(e) => setDistributorForm(prev => ({ ...prev, diamond: { ...prev.diamond, cut: e.target.value } }))}
                      >
                        <option value="">Select Cut</option>
                        <option value="round">Round</option>
                        <option value="princess">Princess</option>
                        <option value="marquise">Marquise</option>
                        <option value="cushion">Cushion</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Color</label>
                      <select
                        className="w-full border border-amber-300 rounded-md p-2 text-sm"
                        value={distributorForm.diamond.color}
                        onChange={(e) => setDistributorForm(prev => ({ ...prev, diamond: { ...prev.diamond, color: e.target.value } }))}
                      >
                        <option value="">Select Color</option>
                        <option value="D-J">D-J</option>
                        <option value="K+">K+</option>
                        <option value="Z+">Z+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Clarity</label>
                      <select
                        className="w-full border border-amber-300 rounded-md p-2 text-sm"
                        value={distributorForm.diamond.clarity}
                        onChange={(e) => setDistributorForm(prev => ({ ...prev, diamond: { ...prev.diamond, clarity: e.target.value } }))}
                      >
                        <option value="">Select Clarity</option>
                        <option value="FL">FL</option>
                        <option value="IF">IF</option>
                        <option value="VVS">VVS</option>
                        <option value="VVS1">VVS1</option>
                        <option value="VVS2">VVS2</option>
                        <option value="VS1">VS1</option>
                        <option value="VS2">VS2</option>
                        <option value="SI">SI</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Carat</label>
                      <select
                        className="w-full border border-amber-300 rounded-md p-2 text-sm"
                        value={distributorForm.diamond.carat}
                        onChange={(e) => setDistributorForm(prev => ({ ...prev, diamond: { ...prev.diamond, carat: e.target.value } }))}
                      >
                        <option value="">Select Carat</option>
                        <option value="18">18</option>
                        <option value="14">14</option>
                        <option value="22">22</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {distributorForm.subtype === 'gold' && (
                <div className="mt-6">
                  <h4 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-2">Gold Attributes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Purity/Karat</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.gold.purity} onChange={(e) => setDistributorForm(prev => ({ ...prev, gold: { ...prev.gold, purity: e.target.value } }))}>
                        <option value="">Select Purity</option>
                        <option value="24K">24K</option>
                        <option value="22K">22K</option>
                        <option value="18K">18K</option>
                        <option value="14K">14K</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Color/Finish</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.gold.colorFinish} onChange={(e) => setDistributorForm(prev => ({ ...prev, gold: { ...prev.gold, colorFinish: e.target.value } }))}>
                        <option value="">Select Finish</option>
                        <option value="Yellow Gold">Yellow Gold</option>
                        <option value="White Gold">White Gold</option>
                        <option value="Rose Gold">Rose Gold</option>
                        <option value="Two-tone">Two-tone</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Type/Category</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.gold.designStyle} onChange={(e) => setDistributorForm(prev => ({ ...prev, gold: { ...prev.gold, designStyle: e.target.value } }))}>
                        <option value="">Select Category</option>
                        <option value="Set">Set</option>
                        <option value="Necklace">Necklace</option>
                        <option value="Earrings">Earrings</option>
                        <option value="Rings">Rings</option>
                        <option value="Bracelet">Bracelet</option>
                        <option value="Bangle">Bangle</option>
                        <option value="Pendant">Pendant</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Weight</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.gold.weight} onChange={(e) => setDistributorForm(prev => ({ ...prev, gold: { ...prev.gold, weight: e.target.value } }))}>
                        <option value="">Select Range</option>
                        <option value="5-10g">5-10g</option>
                        <option value="10-20g">10-20g</option>
                        <option value="20-50g">20-50g</option>
                        <option value=">50g">50g+</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Design/Style</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value="" onChange={(e) => setDistributorForm(prev => ({ ...prev, gold: { ...prev.gold, designStyle: e.target.value } }))}>
                        <option value="">Select Style</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Contemporary">Contemporary</option>
                        <option value="Modern">Modern</option>
                        <option value="Vintage">Vintage</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              {distributorForm.subtype === 'polki' && (
                <div className="mt-6">
                  <h4 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-2">Polki Attributes</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Gold Purity</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.polki.goldPurity} onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, goldPurity: e.target.value } }))}>
                        <option value="">Select Purity</option>
                        <option value="22K">22K</option>
                        <option value="18K">18K</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Polki Size</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.polki.polkiSize} onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, polkiSize: e.target.value } }))}>
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Number of Stones</label>
                      <Input
                        type="text"
                        placeholder="e.g., 12"
                        value={distributorForm.polki.polkiCount}
                        onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, polkiCount: e.target.value } }))}
                        className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Type/Category</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.polki.typeCategory} onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, typeCategory: e.target.value } }))}>
                        <option value="">Select Category</option>
                        <option value="Set">Set</option>
                        <option value="Necklace">Necklace</option>
                        <option value="Earrings">Earrings</option>
                        <option value="Rings">Rings</option>
                        <option value="Bracelet">Bracelet</option>
                        <option value="Bangle">Bangle</option>
                        <option value="Pendant">Pendant</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Design/Style</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.polki.designStyle} onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, designStyle: e.target.value } }))}>
                        <option value="">Select Style</option>
                        <option value="Traditional">Traditional</option>
                        <option value="Bridal">Bridal</option>
                        <option value="Temple">Temple</option>
                        <option value="Antique">Antique</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Weight</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.polki.weight} onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, weight: e.target.value } }))}>
                        <option value="">Select Range</option>
                        <option value="5-10g">5-10g</option>
                        <option value="10-20g">10-20g</option>
                        <option value="20-50g">20-50g</option>
                        <option value=">50g">50g+</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    <div>
                      <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Finish/Plating</label>
                      <select className="w-full border border-amber-300 rounded-md p-2 text-sm" value={distributorForm.polki.finishPlating} onChange={(e) => setDistributorForm(prev => ({ ...prev, polki: { ...prev.polki, finishPlating: e.target.value } }))}>
                        <option value="">Select Finish</option>
                        <option value="Gold">Gold</option>
                        <option value="Rhodium">Rhodium</option>
                        <option value="Mixed">Mixed</option>
                      </select>
                    </div>
                  </div>
                </div>
              )}

              <input
                type="file"
                multiple
                ref={distributorInputRef}
                className="hidden"
                onChange={(e) => {
                  if (e.target.files) {
                    handleDistributorUpload(e.target.files)
                  }
                }}
              />

              <div className="mt-6">
                <h4 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-2">Upload Images or Videos</h4>
                <div
                  className="group relative border border-amber-300/60 bg-gradient-to-br from-amber-50 to-white rounded-md p-8 text-center cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-amber-500/10"
                  onClick={() => distributorInputRef.current?.click()}
                  onDragOver={(e) => { e.preventDefault() }}
                  onDrop={(e) => { e.preventDefault(); if (e.dataTransfer.files?.length) handleDistributorUpload(e.dataTransfer.files) }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-300/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <div className="relative flex flex-col items-center gap-2">
                    <Upload className="w-5 h-5 text-amber-700" strokeWidth={1.5} />
                    <p className="text-[10px] tracking-[0.25em] text-slate-700 uppercase">Drag & drop, or click to browse</p>
                    <p className="text-[10px] tracking-[0.2em] text-slate-500">JPG, PNG, WebP, GIF, MP4, WebM, MOV, AVI</p>
                    {distributorUploading && (
                      <div className="mt-3 flex items-center gap-2 text-amber-700">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span className="text-[10px] tracking-[0.2em] uppercase">Uploading...</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center gap-3">
                <Button onClick={handleSaveDistributor} className="bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 text-xs tracking-[0.2em] uppercase">
                  <Save className="w-3 h-3 mr-2" /> Save Distributor Draft
                </Button>
              </div>

              <div className="mt-8">
                <h4 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-2">Recent Distributor Uploads</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {distributorUploads.map((upload) => (
                    <div key={`${upload.section}-${upload.imageKey}`} className="group relative border border-amber-200/60 rounded-md overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow">
                      <Image src={upload.url} alt={upload.section} width={300} height={300} className="object-cover w-full h-36" />
                      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/50 to-transparent p-2 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          className="p-1.5 bg-white/80 rounded hover:bg-white"
                          onClick={() => setZoomPreview({ show: true, url: upload.url, alt: upload.section })}
                        >
                          <ZoomIn className="w-4 h-4 text-slate-800" />
                        </button>
                        <button
                          className="p-1.5 bg-white/80 rounded hover:bg-white"
                          onClick={async () => { await handleDeleteImage(upload.id); setDistributorUploads(prev => prev.filter(u => u.id !== upload.id)) }}
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      </div>
                      <div className="px-2 py-2">
                        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-600">{upload.section}</p>
                        <p className="text-[9px] tracking-[0.2em] uppercase text-slate-400">{upload.imageKey}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          )}
          {selectedSection === 'featured-collections' && (
            <div className="mb-8 bg-white border border-amber-200/60 rounded-md shadow-sm p-6">
              <h3 className="text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light mb-4">Section Header</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Section Title</label>
                  <Input
                    type="text"
                    placeholder="Featured Collections"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Section Description</label>
                  <textarea
                    rows={3}
                    placeholder="Intro paragraph shown above the collections on homepage"
                    value={sectionIntro}
                    onChange={(e) => setSectionIntro(e.target.value)}
                    className="w-full bg-white border border-amber-300 rounded-md text-slate-900 placeholder:text-slate-400 text-sm px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleSaveFeaturedCollectionsHeader}
                  className="px-4 py-2 border border-amber-400/60 bg-gradient-to-r from-amber-100 to-amber-50 hover:from-amber-200 hover:to-amber-100 transition-all duration-300"
                >
                  <span className="text-[10px] tracking-[0.25em] text-amber-700 uppercase font-light">Save Header</span>
                </button>
              </div>
            </div>
          )}

          {isHeroEmpty && (
            <div className="mb-6 rounded-lg border border-amber-200/60 bg-amber-50/60 p-6 text-center">
              <div className="mx-auto w-14 h-14 rounded-full bg-white border border-amber-200/60 flex items-center justify-center mb-3">
                <ImageIcon className="w-7 h-7 text-amber-600/80" />
              </div>
              <p className="text-sm text-amber-800">No image present in the Hero image section.</p>
              <p className="text-xs text-amber-700 mt-1">Click the <span className="font-medium">Add New</span> button to add images.</p>
            </div>
          )}

          <div className={`${isHeroEmpty ? 'hidden' : ''} grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6`} onDragOver={handleDragOverAutoScroll}>
            {imageKeys.map((imageKey) => {
              const existingImage = images.find(img => img.imageKey === imageKey)
              const isUploading = uploading === imageKey || uploadingSet.has(imageKey)

              return (
                <div key={imageKey} className="group relative bg-white border border-amber-200/60 hover:border-amber-400/60 transition-all duration-500 shadow-md shadow-amber-500/5 hover:shadow-lg hover:shadow-amber-500/10 overflow-hidden" draggable={Boolean(currentSection?.allowAdd)} onDragStart={() => handleDragStart(imageKey)} onDragOver={handleDragOverAutoScroll} onDrop={() => handleDropSwap(imageKey)}>
                  {/* Subtle corner decoration */}
                  <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-amber-300/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative p-6 space-y-5">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-amber-200/40 pb-4">
                      <div className="flex-1 mr-4">
                        <input
                          type="text"
                          value={imageMetadata[imageKey]?.title !== undefined ? imageMetadata[imageKey]?.title : (existingImage?.title || '')}
                          onChange={(e) => setImageMetadata({
                            ...imageMetadata,
                            [imageKey]: {
                              ...imageMetadata[imageKey],
                              title: e.target.value
                            }
                          })}
                          className="w-full bg-transparent border-b border-transparent hover:border-amber-200 focus:border-amber-400 focus:outline-none text-[10px] tracking-[0.25em] text-slate-700 uppercase font-light placeholder:text-slate-300 transition-all duration-300"
                          placeholder={imageKey.replace(/-/g, ' ')}
                        />
                        {existingImage && (
                          <p className="text-[9px] text-amber-600/60 tracking-wider mt-1 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse"></span>
                            Active
                          </p>
                        )}
                      </div>
                      {existingImage && (
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => moveToAllJewelry(imageKey)}
                            className="p-2 border border-amber-300 bg-amber-50 hover:bg-amber-100 hover:border-amber-400 transition-all duration-300"
                          >
                            <span className="text-[10px] tracking-[0.2em] text-amber-700">Add to All Jewellery</span>
                          </button>
                          <button
                            onClick={() => setDeleteConfirm({ show: true, imageId: existingImage.id })}
                            className="group/del p-2 border border-red-200/60 bg-red-50 hover:bg-red-100 hover:border-red-300/60 transition-all duration-300"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-red-600/70 group-hover/del:text-red-700" strokeWidth={1.5} />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Title, Short and Full Description for Featured Collections */}
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
                                description: imageMetadata[imageKey]?.description || existingImage?.description || '',
                                fullDescription: imageMetadata[imageKey]?.fullDescription || existingImage?.metadata?.fullDescription || ''
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
                                description: e.target.value,
                                fullDescription: imageMetadata[imageKey]?.fullDescription || existingImage?.metadata?.fullDescription || ''
                              }
                            })}
                            className="bg-white border-amber-300 text-slate-900 placeholder:text-slate-400 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                        <div>
                          <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Full Description</label>
                          <textarea
                            placeholder="Detailed description for the collection, shown in CTA modal"
                            rows={4}
                            value={imageMetadata[imageKey]?.fullDescription || existingImage?.metadata?.fullDescription || ''}
                            onChange={(e) => setImageMetadata({
                              ...imageMetadata,
                              [imageKey]: {
                                ...imageMetadata[imageKey],
                                title: imageMetadata[imageKey]?.title || existingImage?.title || '',
                                description: imageMetadata[imageKey]?.description || existingImage?.description || '',
                                fullDescription: e.target.value
                              }
                            })}
                            className="w-full bg-white border border-amber-300 rounded-md text-slate-900 placeholder:text-slate-400 text-sm px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                          />
                        </div>
                                              </div>
                    )}

                    {/* Hero Text Fields */}
                    {false && selectedSection === 'hero' && (
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

                    {/* Custom Fields inside cards for Custom Sections */}
                    {isCustomSelected && showPreview && (
                      <div className="rounded-lg border border-slate-200/70 bg-white/60 backdrop-blur-sm p-3">
                        <div className="mb-3">
                          <span className="text-[10px] tracking-[0.16em] text-slate-700 uppercase">Custom Fields</span>
                        </div>
                        {getFieldsForSection(selectedSection).length === 0 ? (
                          <div className="text-[11px] text-slate-500">No custom fields yet.</div>
                        ) : (
                          <div className="space-y-3">
                            {getFieldsForSection(selectedSection).map((f) => {
                              const val = getValueForCard(selectedSection, imageKey, f.id)
                              const isVisible = getVisibilityForCard(selectedSection, imageKey, f.id)
                              return (
                                <div key={`card-field-${f.id}`} className="space-y-3">
                                  <div className="flex items-center justify-between mb-2">
                                    <label className="text-[10px] tracking-[0.12em] text-slate-600 uppercase block">{f.label}</label>
                                    <div className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={isVisible}
                                        onChange={(e) => setVisibility(selectedSection, imageKey, f.id, e.target.checked)}
                                        className="w-3.5 h-3.5 text-amber-600 rounded border-slate-300 focus:ring-amber-500 cursor-pointer"
                                      />
                                      <span className="text-[9px] text-slate-400 uppercase tracking-wider">Show</span>
                                    </div>
                                  </div>
                                  {isVisible && (
                                    f.type === 'text' ? (
                                      <Input
                                        type="text"
                                        value={val}
                                        onChange={(e) => setValue(selectedSection, imageKey, f.id, e.target.value)}
                                        placeholder={`Enter ${f.label}`}
                                        className="h-9 rounded-md bg-white border border-slate-200 text-slate-900 placeholder:text-slate-400 text-sm px-2.5 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                      />
                                    ) : (
                                      <select
                                        value={val}
                                        onChange={(e) => setValue(selectedSection, imageKey, f.id, e.target.value)}
                                        className="h-9 w-full rounded-md bg-white border border-slate-200 text-slate-900 text-sm px-2.5 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-200"
                                      >
                                        {(f.options || []).map((opt) => (
                                          <option key={`${f.id}-${opt}`} value={opt}>{opt}</option>
                                        ))}
                                      </select>
                                    )
                                  )}
                                </div>
                              )
                            })}
                          </div>
                        )}
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
                    {['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'bracelets', 'bangles', 'pendants', 'daily-wear', 'gifting', 'wedding', 'more-collections', 'all-jewelry'].includes(selectedSection) && (
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
                        {selectedSection !== 'rings' && (
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
                                  <option value="gold">Gold</option>
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
                              ) : selectedSection === 'bracelets' ? (
                                <>
                                  <option value="diamond">Diamond Bracelets</option>
                                  <option value="gold">Gold Bracelets</option>
                                  <option value="tennis">Tennis Bracelets</option>
                                  <option value="link">Link Bracelets</option>
                                  <option value="charm">Charm Bracelets</option>
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
                        )}
 
                          {/* Rings subtype-driven inputs */}
                        {selectedSection === 'rings' && (
                          <div className="space-y-4">
                            <div className="grid grid-cols-3 gap-4">
                              <div className="space-y-2">
                                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Subtype</label>
                                <select
                                  value={(imageMetadata[imageKey] as any)?.ringSubtype || (existingImage?.metadata as any)?.ringSubtype || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [imageKey]: {
                                      ...imageMetadata[imageKey],
                                      ringSubtype: e.target.value
                                    } as any
                                  })}
                                  className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                >
                                  <option value="">Select subtype</option>
                                  <option value="diamond">Diamond</option>
                                  <option value="gold">Gold</option>
                                  <option value="polki">Polki</option>
                                </select>
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Small Description</label>
                                <Input
                                  type="text"
                                  placeholder="e.g., Elegant solitaire ring"
                                  value={(imageMetadata[imageKey] as any)?.smallDescription || (existingImage?.metadata as any)?.smallDescription || existingImage?.description || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [imageKey]: {
                                      ...imageMetadata[imageKey],
                                      smallDescription: e.target.value
                                    } as any
                                  })}
                                  className="bg-white border-amber-300 text-slate-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                />
                              </div>
                              <div className="space-y-2">
                                <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Large Description</label>
                                <Input
                                  type="text"
                                  placeholder="Detailed craftsmanship and materials"
                                  value={(imageMetadata[imageKey] as any)?.largeDescription || (existingImage?.metadata as any)?.largeDescription || ''}
                                  onChange={(e) => setImageMetadata({
                                    ...imageMetadata,
                                    [imageKey]: {
                                      ...imageMetadata[imageKey],
                                      largeDescription: e.target.value
                                    } as any
                                  })}
                                  className="bg-white border-amber-300 text-slate-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                />
                              </div>
                            </div>

                            {/* Diamond subtype fields */}
                            {(((imageMetadata[imageKey] as any)?.ringSubtype || (existingImage?.metadata as any)?.ringSubtype) === 'diamond') && (
                              <div className="grid grid-cols-4 gap-4">
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
                                    <option value="D">D</option>
                                    <option value="E">E</option>
                                    <option value="F">F</option>
                                    <option value="G">G</option>
                                    <option value="H">H</option>
                                    <option value="I">I</option>
                                    <option value="J">J</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Carat</label>
                                  <Input
                                    type="text"
                                    placeholder="e.g., 1.5ct"
                                    value={(imageMetadata[imageKey] as any)?.carat || (existingImage?.metadata as any)?.carat || (existingImage?.metadata as any)?.diamondCarat || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        carat: e.target.value
                                      } as any
                                    })}
                                    className="bg-white border-amber-300 text-slate-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  />
                                </div>
                              </div>
                            )}

                            {/* Gold subtype fields */}
                            {(((imageMetadata[imageKey] as any)?.ringSubtype || (existingImage?.metadata as any)?.ringSubtype) === 'gold') && (
                              <div className="grid grid-cols-5 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Purity / Karat</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.purityKarat || (existingImage?.metadata as any)?.purityKarat || (existingImage?.metadata as any)?.purity || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        purityKarat: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Karat</option>
                                    <option value="22K">22K</option>
                                    <option value="18K">18K</option>
                                    <option value="14K">14K</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Color / Finish</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.colorFinish || (existingImage?.metadata as any)?.colorFinish || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        colorFinish: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Finish</option>
                                    <option value="Yellow Gold">Yellow Gold</option>
                                    <option value="Rose Gold">Rose Gold</option>
                                    <option value="White Gold">White Gold</option>
                                    <option value="Two-tone">Two-tone</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Type / Category</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.typeCategory || (existingImage?.metadata as any)?.typeCategory || (existingImage?.metadata as any)?.category || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        typeCategory: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Category</option>
                                    <option value="Solitaire">Solitaire</option>
                                    <option value="Band">Band</option>
                                    <option value="Cluster">Cluster</option>
                                    <option value="Statement">Statement</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Weight</label>
                                  <Input
                                    type="text"
                                    placeholder="e.g., 8.5g"
                                    value={(imageMetadata[imageKey] as any)?.weight || (existingImage?.metadata as any)?.weight || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        weight: e.target.value
                                      } as any
                                    })}
                                    className="bg-white border-amber-300 text-slate-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Design / Style</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.designStyle || (existingImage?.metadata as any)?.designStyle || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        designStyle: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Style</option>
                                    <option value="Minimal">Minimal</option>
                                    <option value="Vintage">Vintage</option>
                                    <option value="Modern">Modern</option>
                                    <option value="Traditional">Traditional</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {/* Polki subtype fields */}
                            {(((imageMetadata[imageKey] as any)?.ringSubtype || (existingImage?.metadata as any)?.ringSubtype) === 'polki') && (
                              <div className="grid grid-cols-5 gap-4">
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Gold Purity</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.goldPurity || (existingImage?.metadata as any)?.goldPurity || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        goldPurity: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Purity</option>
                                    <option value="22K">22K</option>
                                    <option value="18K">18K</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Polki Size / Number of Stones</label>
                                  <Input
                                    type="text"
                                    placeholder="e.g., 10 stones / Medium"
                                    value={(imageMetadata[imageKey] as any)?.polkiSizeOrCount || (existingImage?.metadata as any)?.polkiSizeOrCount || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        polkiSizeOrCount: e.target.value
                                      } as any
                                    })}
                                    className="bg-white border-amber-300 text-slate-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Type / Category</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.typeCategory || (existingImage?.metadata as any)?.typeCategory || (existingImage?.metadata as any)?.category || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        typeCategory: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Category</option>
                                    <option value="Solitaire">Solitaire</option>
                                    <option value="Band">Band</option>
                                    <option value="Cluster">Cluster</option>
                                    <option value="Statement">Statement</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Design / Style</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.designStyle || (existingImage?.metadata as any)?.designStyle || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        designStyle: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Style</option>
                                    <option value="Minimal">Minimal</option>
                                    <option value="Vintage">Vintage</option>
                                    <option value="Modern">Modern</option>
                                    <option value="Traditional">Traditional</option>
                                  </select>
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Weight</label>
                                  <Input
                                    type="text"
                                    placeholder="e.g., 9.2g"
                                    value={(imageMetadata[imageKey] as any)?.weight || (existingImage?.metadata as any)?.weight || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        weight: e.target.value
                                      } as any
                                    })}
                                    className="bg-white border-amber-300 text-slate-900 text-sm focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  />
                                </div>
                                <div className="space-y-2">
                                  <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase block">Finish / Plating</label>
                                  <select
                                    value={(imageMetadata[imageKey] as any)?.finishPlating || (existingImage?.metadata as any)?.finishPlating || ''}
                                    onChange={(e) => setImageMetadata({
                                      ...imageMetadata,
                                      [imageKey]: {
                                        ...imageMetadata[imageKey],
                                        finishPlating: e.target.value
                                      } as any
                                    })}
                                    className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30"
                                  >
                                    <option value="">Select Finish</option>
                                    <option value="Gold">Gold</option>
                                    <option value="Rhodium">Rhodium</option>
                                    <option value="Mixed">Mixed</option>
                                  </select>
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Removed Jewelry Type/Subtype per request */}
                        {selectedSection === 'diamond-jewelry' && (
                          <div>
                            <label className="text-[9px] tracking-[0.2em] text-slate-600 uppercase mb-2 block">Item Type</label>
                            <select
                              value={(imageMetadata[imageKey] as any)?.jewelryCategory || (existingImage?.metadata as any)?.jewelryCategory || ''}
                              onChange={(e) => setImageMetadata({
                                ...imageMetadata,
                                [imageKey]: {
                                  ...imageMetadata[imageKey],
                                  jewelryCategory: e.target.value
                                } as any
                              })}
                              className="w-full bg-white border border-amber-300 text-slate-900 text-sm rounded px-3 py-2 focus:border-amber-500 focus:ring-2 focus:ring-amber-400/30 transition-all duration-300"
                            >
                              <option value="">Select Item Type</option>
                              <option value="necklaces">Necklaces</option>
                              <option value="earrings">Earrings</option>
                              <option value="rings">Rings</option>
                              <option value="bangles">Bangles</option>
                              <option value="bracelets">Bracelets</option>
                              <option value="chains">Chains</option>
                              <option value="pendants">Pendants</option>
                            </select>
                          </div>
                        )}
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
                            {/* Removed Daily Wear jewelry type per request */}
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

                    {/* Image/Video Preview */}
                    <div className="aspect-video bg-slate-100 border border-amber-200/60 rounded-lg overflow-hidden relative">
                      {existingImage ? (
                        existingImage.url.match(/\.(mp4|webm|mov|avi)$/i) ? (
                          <video
                            src={existingImage.url}
                            controls
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <Image
                            src={existingImage.url}
                            alt={existingImage.alt || imageKey}
                            fill
                            className="object-cover"
                          />
                        )
                      ) : (
                        <div className="flex items-center justify-center h-full">
                          <ImageIcon className="w-12 h-12 text-slate-300" />
                        </div>
                      )}
                    </div>

                    <div className="mt-2 flex justify-end">
                      {existingImage && !existingImage.url.match(/\.(mp4|webm|mov|avi)$/i) && (
                        <button
                          type="button"
                          className="flex items-center gap-1 px-3 py-1 text-[10px] tracking-[0.2em] uppercase font-light border border-amber-300 bg-white hover:bg-amber-50 text-amber-700 rounded transition-all duration-300"
                          onClick={() => setZoomPreview({ show: true, url: existingImage.url, alt: existingImage.alt || imageKey })}
                        >
                          <ZoomIn className="w-3.5 h-3.5" />
                          Zoom
                        </button>
                      )}
                    </div>

                    {/* Upload and Save Buttons */}
                    <div className="space-y-2">
                      <input
                        type="file"
                        accept="image/*,video/mp4,video/webm,video/quicktime,video/x-msvideo"
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
                              {existingImage ? 'Replace Image/Video' : 'Upload Image/Video'}
                            </>
                          )}
                        </Button>
                      </label>
                      
                      {/* Save Button for sections with metadata */}
                      {(isCustomSelected || selectedSection === 'featured-collections' || selectedSection === 'new-arrivals' || selectedSection === 'hero' || ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections', 'all-jewelry'].includes(selectedSection)) && existingImage && (
                        <button
                          type="button"
                          onClick={() => handleUpdateMetadata(imageKey)}
                          className="w-full px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 hover:from-slate-900 hover:to-slate-800 text-white font-semibold shadow-lg border border-slate-600 transition-all duration-300 flex items-center justify-center gap-2 rounded"
                        >
                          <Save className="w-4 h-4 text-white" strokeWidth={2} />
                          <span className="text-sm text-white">
                            {isCustomSelected ? 'Save Custom Fields' : selectedSection === 'new-arrivals' ? 'Save Product Details' : selectedSection === 'hero' ? 'Save Image' : ['luxury-jewelry', 'gold-jewelry', 'diamond-jewelry', 'earrings', 'rings', 'daily-wear', 'gifting', 'wedding', 'more-collections', 'all-jewelry'].includes(selectedSection) ? 'Save Jewelry Details' : 'Save Title & Description'}
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

      {/* Custom Section Delete Confirmation Modal */}
      {sectionDeleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full border border-amber-200/60 animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-300/30"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-300/30"></div>
            <div className="relative p-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center mb-6 border border-red-200/60">
                <Trash2 className="w-8 h-8 text-red-600" strokeWidth={1.5} />
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-light tracking-wide text-slate-800 mb-3">Delete Section</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  This action cannot be undone. The section {sectionDeleteConfirm.sectionName ? `"${sectionDeleteConfirm.sectionName}" ` : ''}will be permanently removed from the admin and site navigation.
                </p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setSectionDeleteConfirm({ show: false, sectionId: null })}
                  className="flex-1 px-6 py-3 border border-amber-300 bg-white hover:bg-amber-50 text-slate-700 font-medium transition-all duration-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { if (sectionDeleteConfirm.sectionId) { /* call deletion without confirm */ performDeleteCustomSection(sectionDeleteConfirm.sectionId); } setSectionDeleteConfirm({ show: false, sectionId: null }) }}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium shadow-lg transition-all duration-300 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Bulk Delete Confirmation Modal (Hero) */}
      {bulkDeleteConfirm.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-md w-full border border-amber-200/60 animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-300/30"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-300/30"></div>
            <div className="relative p-8">
              <div className="mx-auto w-16 h-16 rounded-full bg-gradient-to-br from-red-100 to-red-50 flex items-center justify-center mb-6 border border-red-200/60">
                <Trash2 className="w-8 h-8 text-red-600" strokeWidth={1.5} />
              </div>
              <div className="text-center mb-8">
                <h3 className="text-xl font-light tracking-wide text-slate-800 mb-3">Delete All Images</h3>
                <p className="text-sm text-slate-600 leading-relaxed">This action cannot be undone. All images in the hero section will be permanently removed.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setBulkDeleteConfirm({ show: false })}
                  className="flex-1 px-6 py-3 border border-amber-300 bg-white hover:bg-amber-50 text-slate-700 font-medium transition-all duration-300 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={async () => { await deleteAllHeroImages(); setBulkDeleteConfirm({ show: false }) }}
                  disabled={deletingAll}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white font-medium shadow-lg transition-all duration-300 rounded disabled:opacity-60"
                >
                  {deletingAll ? 'Deleting…' : 'Delete All'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Zoom Preview Modal */}
      {zoomPreview.show && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="relative bg-white rounded-lg shadow-2xl max-w-5xl w-full border border-amber-200/60">
            <div className="absolute top-0 left-0 w-20 h-20 border-l-2 border-t-2 border-amber-300/30"></div>
            <div className="absolute bottom-0 right-0 w-20 h-20 border-r-2 border-b-2 border-amber-300/30"></div>

            <div className="p-4 border-b border-amber-100 flex items-center justify-between">
              <h3 className="text-sm tracking-[0.25em] uppercase text-amber-800">Image Preview</h3>
              <button
                className="text-xs tracking-[0.2em] uppercase px-3 py-1 border border-amber-300 text-amber-800 bg-amber-50 hover:bg-amber-100 rounded"
                onClick={() => setZoomPreview({ show: false, url: '', alt: '' })}
              >
                Close
              </button>
            </div>

            <div className="relative p-6">
              <div className="relative w-full h-[70vh] bg-slate-100 border border-amber-200 overflow-hidden rounded">
                <img src={zoomPreview.url} alt={zoomPreview.alt || 'Zoom Preview'} className="w-full h-full object-contain" />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

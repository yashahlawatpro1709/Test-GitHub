"use client"

import { useEffect, useMemo, useState } from "react"
import Image from "next/image"
import { X, Heart, ShoppingCart, ArrowRight, Filter, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { formatPriceNumber } from "@/lib/utils"
import { useCartStore, useWishlistStore } from "@/store"

interface Product {
  id: string
  name: string
  description?: string
  price?: number
  images?: string[]
  metadata?: Record<string, any>
  category?: string
  subCategory?: string
  material?: string
}

const fetchRingsProducts = async (): Promise<Product[]> => {
  try {
    const timestamp = Date.now()
    const response = await fetch(`/api/site-images?section=rings&t=${timestamp}`, {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache'
      }
    })
    const data = await response.json()
    const images = (data?.images ?? [])

    // Map DB images into product shape expected by the UI
    const products: Product[] = images.map((img: any) => {
      const meta = img?.metadata ?? {}
      const priceStr = (meta?.price ?? '').toString()
      const priceNum = parseFloat(priceStr.replace(/[^0-9.]/g, ''))

      return {
        id: img.id,
        name: meta?.jewelryTitle || img.title || img.imageKey || 'Ring',
        description: meta?.smallDescription || meta?.largeDescription || meta?.detailedDescription || img.description || '',
        price: Number.isFinite(priceNum) ? priceNum : undefined,
        images: [img.url].filter(Boolean),
        metadata: meta,
        category: meta?.jewelryCategory || meta?.category || undefined,
        subCategory: meta?.jewelrySubType || undefined,
        material: meta?.purity || meta?.metal || undefined,
      }
    })

    return products
  } catch (error) {
    console.error('Failed to fetch rings products:', error)
    return []
  }
}

const normalize = (val?: any) => (val ?? "").toString().trim().toLowerCase()

const getRingType = (product: Product) => {
  const m = product?.metadata || {}
  const cat = normalize(product?.category)
  const sub = normalize(product?.subCategory)
  const type = normalize(m?.type)
  const ringSubtype = normalize((m as any)?.ringSubtype)

  const isDiamondLike = [
    normalize(m?.gemstone),
    normalize(m?.stone),
    normalize(m?.diamondType),
    normalize(m?.diamondClarity),
    normalize(m?.clarity),
    normalize(m?.cut),
    normalize(m?.color),
    normalize(m?.carat)
  ]
    .join("|")
    .includes("diamond")

  const isGoldLike = [normalize(m?.goldPurity), normalize(m?.metal), normalize(product?.material)]
    .join("|")
    .includes("gold")

  const isPolkiLike = [normalize(m?.polkiSize), normalize(m?.polkiCount), normalize(m?.setting), normalize(m?.polki)]
    .join("|")
    .includes("polki")

  if (ringSubtype.includes("diamond")) return "diamond"
  if (ringSubtype.includes("gold")) return "gold"
  if (ringSubtype.includes("polki")) return "polki"

  if (type.includes("diamond") || cat.includes("diamond") || sub.includes("diamond") || isDiamondLike) return "diamond"
  if (type.includes("gold") || cat.includes("gold") || sub.includes("gold") || isGoldLike) return "gold"
  if (type.includes("polki") || cat.includes("polki") || sub.includes("polki") || isPolkiLike) return "polki"
  return "other"
}

export default function RingsPage() {
  const [allProducts, setAllProducts] = useState<Product[]>([])
  const [filtered, setFiltered] = useState<Product[]>([])
  const [selectedType, setSelectedType] = useState<string>("all")
  const [showFilters, setShowFilters] = useState<boolean>(true)
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [showDetails, setShowDetails] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Premium CTAs: integrate stores
  const { addItem: addToCart } = useCartStore()
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlistStore()

  useEffect(() => {
    let alive = true
    fetchRingsProducts().then((items) => {
      if (!alive) return
      setAllProducts(items)
      setFiltered(items)
      setLoading(false)
    })
    return () => {
      alive = false
    }
  }, [])

  useEffect(() => {
    const next = allProducts.filter((p) => {
      const ringType = getRingType(p)
      if (selectedType === "all") return true
      return ringType === normalize(selectedType)
    })
    setFiltered(next)
  }, [selectedType, allProducts])

  const openDetails = (p: Product) => {
    setSelectedProduct(p)
    setShowDetails(true)
  }

  const closeDetails = () => setShowDetails(false)

  const priceFor = (p: Product) => {
    const num = typeof p?.price === "number" ? p.price : Number(p?.metadata?.price ?? 0)
    return isNaN(num) ? 0 : num
  }

  const specs = useMemo(() => {
    if (!selectedProduct) return []
    const m = selectedProduct.metadata || {}
    const entries: { label: string; value?: any }[] = [
      { label: "Cut", value: m.cut },
      { label: "Clarity", value: m.clarity ?? m.diamondClarity },
      { label: "Color", value: m.color },
      { label: "Carat", value: m.carat },
      { label: "Gold Purity", value: m.goldPurity },
      { label: "Polki Size", value: m.polkiSize },
      { label: "Polki Count", value: m.polkiCount }
    ]
    return entries.filter((e) => !!e.value)
  }, [selectedProduct])

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      {/* Premium Hero Section */}
      <section className="relative py-14 md:py-18 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-100/30 via-white to-orange-100/30" />
        {/* Elegant subtle geometry */}
        <div className="absolute inset-0 opacity-[0.06]">
          <div className="absolute top-16 left-16 w-24 h-24 border border-amber-300 rounded-full" />
          <div className="absolute top-32 right-24 w-20 h-20 border border-orange-300 rounded-full" />
          <div className="absolute bottom-28 left-1/3 w-16 h-16 border border-amber-400 rounded-full" />
        </div>
        <motion.div
          className="max-w-7xl mx-auto text-center relative z-10"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-2 flex items-center justify-center gap-4">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
            <Star className="w-6 h-6 text-amber-600" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-amber-400 to-transparent" />
          </div>
          <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-amber-900">
            Signature Rings
          </h1>
          <p className="mt-3 text-amber-800 max-w-2xl mx-auto">
            Experience the ultimate in luxury with our collection of certified rings — meticulously crafted in diamond, gold, and polki.
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3 text-[11px] uppercase tracking-[0.15em]">
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">GIA Certified</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">Conflict-Free</span>
            <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300">Exceptional Cut</span>
          </div>
        </motion.div>
      </section>

      <section className="px-4 pt-2">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-amber-900">Explore</h2>
          <Button variant="outline" onClick={() => setShowFilters((s) => !s)}>
            {showFilters ? "Hide Filters" : "Show Filters"}
          </Button>
        </div>

        {showFilters && (
          <div className="mt-6 rounded-xl border border-amber-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <div>
                <label className="text-sm text-amber-800">Type</label>
                <select
                  className="mt-1 w-full rounded-md border border-amber-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-300"
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                >
                  <option value="all">All</option>
                  <option value="diamond">Diamond</option>
                  <option value="gold">Gold</option>
                  <option value="polki">Polki</option>
                </select>
              </div>
              <div className="flex items-end">
                <Button variant="secondary" onClick={() => setSelectedType("all")}>Reset Filter</Button>
              </div>
            </div>
          </div>
        )}
      </section>

      <section className="px-4 pb-16">
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="rounded-xl border border-amber-200 bg-white shadow-sm animate-pulse">
                <div className="h-56 w-full rounded-t-xl bg-amber-100" />
                <div className="p-4">
                  <div className="h-5 w-2/3 bg-amber-100 rounded" />
                  <div className="mt-3 h-4 w-full bg-amber-100 rounded" />
                  <div className="mt-2 h-4 w-3/4 bg-amber-100 rounded" />
                  <div className="mt-4 h-10 w-full bg-amber-100 rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="py-20 text-center text-amber-800">No rings found. Try a different filter.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {filtered.map((p) => (
              <motion.div key={p.id} className="rounded-xl border border-amber-200 bg-white shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="relative h-56 w-full overflow-hidden rounded-t-xl bg-amber-50">
                  <Image
                    src={(p.images?.[0] ?? "/placeholder.png") as string}
                    alt={p.name}
                    fill
                    className="object-cover"
                  />
                  {/* Wishlist overlay */}
                  <button
                    className="absolute right-3 top-3 rounded-full bg-white/90 backdrop-blur border border-amber-200 p-2 shadow-sm hover:bg-white"
                    title={isInWishlist(p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                    onClick={() => (isInWishlist(p.id) ? removeFromWishlist(p.id) : addToWishlist(p as any))}
                  >
                    <Heart className={isInWishlist(p.id) ? "text-rose-600 fill-rose-600" : "text-amber-700"} size={18} />
                  </button>
                </div>
                <div className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-medium text-amber-900">{p.name}</h3>
                      <p className="text-xs text-amber-700 mt-1 capitalize">{getRingType(p)}</p>
                    </div>
                    <p className="text-amber-900 font-semibold">₹{formatPriceNumber(priceFor(p))}</p>
                  </div>
                  <p className="mt-2 line-clamp-2 text-sm text-amber-700">{p.description}</p>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Button
                      variant="outline"
                      className="border-amber-300 text-amber-700 hover:bg-amber-50"
                      type="button"
                      onClick={() => openDetails(p)}
                    >
                      <ArrowRight className="w-4 h-4 mr-1" /> View Details
                    </Button>
                    <Button
                      className="bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white shadow-sm"
                      type="button"
                      onClick={() => openDetails(p)}
                    >
                      Quick View
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Details Modal */}
      {showDetails && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40">
          <div className="mx-4 w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-xl">
            <div className="relative">
              <button className="absolute right-4 top-4 rounded-full bg-white p-2 shadow" onClick={closeDetails}>
                <X />
              </button>
            </div>
            {selectedProduct && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
                <div className="relative h-64 w-full overflow-hidden rounded-xl bg-amber-50">
                  <Image
                    src={(selectedProduct.images?.[0] ?? "/placeholder.png") as string}
                    alt={selectedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-amber-900">{selectedProduct.name}</h2>
                  <p className="mt-2 text-sm text-amber-800">{selectedProduct.description}</p>

                  <AnimatePresence>
                    {specs.length > 0 && (
                      <motion.div className="mt-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                        <h3 className="text-sm font-medium text-amber-900">Specifications</h3>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          {specs.map((s) => (
                            <div key={s.label} className="rounded-md border border-amber-200 bg-amber-50 px-3 py-2 text-sm">
                              <span className="text-amber-700">{s.label}:</span> <span className="text-amber-900">{s.value}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-lg font-semibold text-amber-900">₹{formatPriceNumber(priceFor(selectedProduct))}</p>
                    <div className="flex gap-2">
                      <Button
                        className="gap-2 bg-gradient-to-r from-amber-700 to-orange-700 hover:from-amber-800 hover:to-orange-800 text-white"
                        onClick={() => selectedProduct && addToCart(selectedProduct as any)}
                      >
                        <ShoppingCart size={18} /> Add to Cart
                      </Button>
                      <Button
                        variant="outline"
                        className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
                        onClick={() => selectedProduct && (isInWishlist(selectedProduct.id) ? removeFromWishlist(selectedProduct.id) : addToWishlist(selectedProduct as any))}
                      >
                        <Heart className={selectedProduct && isInWishlist(selectedProduct.id) ? "text-rose-600 fill-rose-600" : "text-amber-700"} size={18} />
                        {selectedProduct && isInWishlist(selectedProduct.id) ? "Saved" : "Wishlist"}
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  )
}
import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { CartItem, Product, WishlistItem } from '@/types'

interface CartStore {
  items: CartItem[]
  isOpen: boolean
  addItem: (product: Product, variantId?: string, quantity?: number) => void
  removeItem: (itemId: string) => void
  updateQuantity: (itemId: string, quantity: number) => void
  clearCart: () => void
  openCart: () => void
  closeCart: () => void
  getItemCount: () => number
  getSubtotal: () => number
  getTotal: () => number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product, variantId?: string, quantity = 1) => {
        const existingItem = get().items.find(
          (item) => item.productId === product.id && item.variantId === variantId
        )

        if (existingItem) {
          get().updateQuantity(existingItem.id, existingItem.quantity + quantity)
        } else {
          const variant = product.variants?.find(v => v.id === variantId)
          const newItem: CartItem = {
            id: `${product.id}-${variantId || 'default'}-${Date.now()}`,
            productId: product.id,
            variantId,
            quantity,
            price: variant?.price || product.price,
            product: {
              name: product.name,
              images: product.images,
              slug: product.slug,
            },
            variant: variant ? {
              name: variant.name,
              value: variant.value,
            } : undefined,
          }

          set((state) => ({
            items: [...state.items, newItem],
            isOpen: true,
          }))
        }
      },

      removeItem: (itemId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.id !== itemId),
        }))
      },

      updateQuantity: (itemId: string, quantity: number) => {
        if (quantity <= 0) {
          get().removeItem(itemId)
          return
        }

        set((state) => ({
          items: state.items.map((item) =>
            item.id === itemId ? { ...item, quantity } : item
          ),
        }))
      },

      clearCart: () => {
        set({ items: [] })
      },

      openCart: () => {
        set({ isOpen: true })
      },

      closeCart: () => {
        set({ isOpen: false })
      },

      getItemCount: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0)
      },

      getSubtotal: () => {
        return get().items.reduce((total, item) => total + item.price * item.quantity, 0)
      },

      getTotal: () => {
        const subtotal = get().getSubtotal()
        const tax = subtotal * 0.18 // 18% GST
        const shipping = subtotal > 5000 ? 0 : 299 // Free shipping above ₹5000
        return subtotal + tax + shipping
      },
    }),
    {
      name: 'aashni-cart',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

interface WishlistStore {
  items: WishlistItem[]
  isOpen: boolean
  addItem: (product: Product) => void
  removeItem: (productId: string) => void
  isInWishlist: (productId: string) => boolean
  clearWishlist: () => void
  openWishlist: () => void
  closeWishlist: () => void
}

export const useWishlistStore = create<WishlistStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,

      addItem: (product: Product) => {
        const isAlreadyInWishlist = get().items.some(
          (item) => item.productId === product.id
        )

        if (!isAlreadyInWishlist) {
          const newItem: WishlistItem = {
            id: `wishlist-${product.id}-${Date.now()}`,
            productId: product.id,
            userId: 'anonymous', // Will be updated when user logs in
            addedAt: new Date(),
            product: {
              name: product.name,
              price: product.price,
              images: product.images,
              slug: product.slug,
            },
          }

          set((state) => ({
            items: [...state.items, newItem],
          }))
        }
      },

      removeItem: (productId: string) => {
        set((state) => ({
          items: state.items.filter((item) => item.productId !== productId),
        }))
      },

      isInWishlist: (productId: string) => {
        return get().items.some((item) => item.productId === productId)
      },

      clearWishlist: () => {
        set({ items: [] })
      },

      openWishlist: () => {
        set({ isOpen: true })
      },

      closeWishlist: () => {
        set({ isOpen: false })
      },
    }),
    {
      name: 'aashni-wishlist',
      storage: createJSONStorage(() => localStorage),
    }
  )
)

interface UIStore {
  searchQuery: string
  isSearchOpen: boolean
  isMobileMenuOpen: boolean
  currentCategory: string | null
  setSearchQuery: (query: string) => void
  openSearch: () => void
  closeSearch: () => void
  openMobileMenu: () => void
  closeMobileMenu: () => void
  setCurrentCategory: (category: string | null) => void
}

export const useUIStore = create<UIStore>()((set) => ({
  searchQuery: '',
  isSearchOpen: false,
  isMobileMenuOpen: false,
  currentCategory: null,

  setSearchQuery: (query: string) => {
    set({ searchQuery: query })
  },

  openSearch: () => {
    set({ isSearchOpen: true })
  },

  closeSearch: () => {
    set({ isSearchOpen: false, searchQuery: '' })
  },

  openMobileMenu: () => {
    set({ isMobileMenuOpen: true })
  },

  closeMobileMenu: () => {
    set({ isMobileMenuOpen: false })
  },

  setCurrentCategory: (category: string | null) => {
    set({ currentCategory: category })
  },
}))

interface ProductStore {
  products: Product[]
  loading: boolean
  error: string | null
  filters: {
    category?: string[]
    priceRange?: { min: number; max: number }
    material?: string[]
    sortBy?: string
    sortOrder?: 'asc' | 'desc'
  }
  setProducts: (products: Product[]) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setFilters: (filters: ProductStore['filters']) => void
  resetFilters: () => void
}

export const useProductStore = create<ProductStore>()((set) => ({
  products: [],
  loading: false,
  error: null,
  filters: {},

  setProducts: (products: Product[]) => {
    set({ products })
  },

  setLoading: (loading: boolean) => {
    set({ loading })
  },

  setError: (error: string | null) => {
    set({ error })
  },

  setFilters: (filters: ProductStore['filters']) => {
    set((state) => ({ filters: { ...state.filters, ...filters } }))
  },

  resetFilters: () => {
    set({ filters: {} })
  },
}))

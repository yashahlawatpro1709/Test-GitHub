export interface Product {
  id: string
  name: string
  description: string
  price: number
  originalPrice?: number
  sku: string
  slug: string
  category: ProductCategory
  subcategory?: string
  images: ProductImage[]
  variants?: ProductVariant[]
  specifications: ProductSpecifications
  inventory: InventoryInfo
  seo: SEOInfo
  isActive: boolean
  isFeatured: boolean
  tags: string[]
  createdAt: Date
  updatedAt: Date
}

export interface ProductImage {
  id: string
  url: string
  alt: string
  isPrimary: boolean
  order: number
  width?: number
  height?: number
}

export interface ProductVariant {
  id: string
  name: string
  value: string
  price?: number
  sku?: string
  inventory?: number
  image?: string
}

export interface ProductSpecifications {
  material: string
  purity?: string
  weight: number
  dimensions?: Dimensions
  gemstones?: Gemstone[]
  certification?: Certification[]
  occasion: string[]
  style: string
  collection?: string
}

export interface Dimensions {
  length?: number
  width?: number
  height?: number
  diameter?: number
  unit: 'mm' | 'cm' | 'inch'
}

export interface Gemstone {
  type: string
  cut: string
  carat: number
  color: string
  clarity: string
  certification?: string
}

export interface Certification {
  type: 'IGI' | 'GIA' | 'AGS' | 'BIS' | 'Other'
  number: string
  document?: string
}

export interface InventoryInfo {
  quantity: number
  lowStockThreshold: number
  isInStock: boolean
  isLowStock: boolean
  preOrder: boolean
  estimatedDelivery?: Date
}

export interface SEOInfo {
  title?: string
  description?: string
  keywords?: string[]
  ogImage?: string
}

export type ProductCategory = 
  | 'rings'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'pendants'
  | 'chains'
  | 'bangles'
  | 'anklets'
  | 'brooches'
  | 'sets'
  | 'charms'
  | 'cufflinks'
  | 'watches'

export type Metal = 
  | 'gold'
  | 'silver'
  | 'platinum'
  | 'rose-gold'
  | 'white-gold'
  | 'titanium'
  | 'stainless-steel'

export type GemstoneType =
  | 'diamond'
  | 'ruby'
  | 'sapphire'
  | 'emerald'
  | 'pearl'
  | 'topaz'
  | 'amethyst'
  | 'garnet'
  | 'opal'
  | 'turquoise'
  | 'aquamarine'
  | 'tanzanite'

export interface ProductFilter {
  category?: ProductCategory[]
  priceRange?: {
    min: number
    max: number
  }
  material?: Metal[]
  gemstone?: GemstoneType[]
  occasion?: string[]
  style?: string[]
  inStock?: boolean
  sortBy?: 'name' | 'price' | 'popularity' | 'newest' | 'rating'
  sortOrder?: 'asc' | 'desc'
}

export interface SearchResult {
  products: Product[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface CartItem {
  id: string
  productId: string
  variantId?: string
  quantity: number
  price: number
  product: Pick<Product, 'name' | 'images' | 'slug'>
  variant?: Pick<ProductVariant, 'name' | 'value'>
}

export interface Cart {
  id: string
  items: CartItem[]
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
}

export interface WishlistItem {
  id: string
  productId: string
  userId: string
  addedAt: Date
  product: Pick<Product, 'name' | 'price' | 'images' | 'slug'>
}

export interface User {
  id: string
  email: string
  name?: string
  avatar?: string
  phone?: string
  addresses: Address[]
  orders: Order[]
  wishlist: WishlistItem[]
  preferences: UserPreferences
  createdAt: Date
  updatedAt: Date
}

export interface Address {
  id: string
  type: 'billing' | 'shipping'
  isDefault: boolean
  firstName: string
  lastName: string
  company?: string
  address1: string
  address2?: string
  city: string
  state: string
  postalCode: string
  country: string
  phone?: string
}

export interface UserPreferences {
  newsletter: boolean
  currency: 'INR' | 'USD' | 'EUR'
  language: 'en' | 'hi'
  notifications: {
    email: boolean
    sms: boolean
    push: boolean
  }
  sizing: {
    ring?: number
    bracelet?: string
    necklace?: string
  }
}

export interface Order {
  id: string
  orderNumber: string
  userId: string
  items: OrderItem[]
  billingAddress: Address
  shippingAddress: Address
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
  status: OrderStatus
  paymentStatus: PaymentStatus
  paymentMethod: string
  trackingNumber?: string
  estimatedDelivery?: Date
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export interface OrderItem {
  id: string
  productId: string
  variantId?: string
  quantity: number
  price: number
  product: Pick<Product, 'name' | 'images' | 'sku'>
  variant?: Pick<ProductVariant, 'name' | 'value'>
}

export type OrderStatus =
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded'

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded'
  | 'partially_refunded'

export interface Review {
  id: string
  productId: string
  userId: string
  rating: number
  title?: string
  comment?: string
  images?: string[]
  verified: boolean
  helpful: number
  reported: boolean
  createdAt: Date
  user: Pick<User, 'name' | 'avatar'>
}

export interface Collection {
  id: string
  name: string
  description: string
  slug: string
  image: string
  products: Product[]
  isActive: boolean
  sortOrder: number
  createdAt: Date
  updatedAt: Date
}

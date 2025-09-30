import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(price)
}

export function formatPriceUSD(price: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price)
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}

export function generateSKU(name: string, variant?: string): string {
  const baseSKU = name
    .toUpperCase()
    .replace(/[^\w]/g, '')
    .slice(0, 6)
  
  const variantCode = variant
    ? variant.toUpperCase().replace(/[^\w]/g, '').slice(0, 3)
    : ''
  
  const timestamp = Date.now().toString().slice(-4)
  
  return `ASH-${baseSKU}${variantCode}-${timestamp}`
}

export function calculateDiscount(originalPrice: number, salePrice: number): number {
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100)
}

export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text
  return text.slice(0, maxLength).trim() + '...'
}

export function getImageDimensions(file: File): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      resolve({ width: img.width, height: img.height })
    }
    img.onerror = reject
    img.src = URL.createObjectURL(file)
  })
}

export function generateColorVariants(baseColor: string): string[] {
  // Generate similar color variants for jewelry
  const variants = [
    baseColor,
    `${baseColor}-light`,
    `${baseColor}-dark`,
    `${baseColor}-metallic`,
  ]
  return variants
}

export function formatWeight(grams: number): string {
  if (grams < 1) {
    return `${(grams * 1000).toFixed(0)}mg`
  }
  return `${grams.toFixed(2)}g`
}

export function calculateShippingCost(
  weight: number,
  distance: number,
  isPremium: boolean = false
): number {
  const baseRate = isPremium ? 299 : 199
  const weightRate = Math.ceil(weight / 100) * 50
  const distanceRate = distance > 500 ? 100 : 0
  
  return baseRate + weightRate + distanceRate
}

export function generateProductSlug(name: string, sku: string): string {
  const nameSlug = slugify(name)
  const skuSlug = sku.toLowerCase()
  return `${nameSlug}-${skuSlug}`
}

export function parseJewelrySize(size: string): number {
  // Parse jewelry sizes like "6", "7.5", "M", "L" etc.
  const numericSize = parseFloat(size)
  if (!isNaN(numericSize)) return numericSize
  
  // Handle letter sizes
  const sizeMap: { [key: string]: number } = {
    'XS': 5,
    'S': 6,
    'M': 7,
    'L': 8,
    'XL': 9,
    'XXL': 10,
  }
  
  return sizeMap[size.toUpperCase()] || 7 // Default to size 7
}

export function getMetalPurity(metal: string, karat?: number): string {
  if (metal.toLowerCase().includes('gold') && karat) {
    return `${karat}K ${metal}`
  }
  if (metal.toLowerCase().includes('silver')) {
    return '925 Sterling Silver'
  }
  if (metal.toLowerCase().includes('platinum')) {
    return '950 Platinum'
  }
  return metal
}

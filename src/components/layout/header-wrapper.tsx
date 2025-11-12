"use client"

import React, { useEffect, useState } from 'react'
import { Header } from '@/components/layout/header'

export function HeaderWrapper() {
  const [pathname, setPathname] = useState<string>('')
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPathname(window.location.pathname || '')
    }
  }, [])

  // Avoid SSR context issues; decide after mount
  if (!pathname) return null
  const isAdmin = pathname.startsWith('/admin')
  if (isAdmin) return null
  return <Header />
}

export default HeaderWrapper
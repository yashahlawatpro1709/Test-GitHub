"use client"

import React from 'react'
import { LuxuryJewelry } from '@/components/home/luxury-jewelry'

export default function AllJewelryPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-amber-50/30 to-white">
      <LuxuryJewelry section="all-jewelry" pageTitle="All Jewellery" />
    </div>
  )
}
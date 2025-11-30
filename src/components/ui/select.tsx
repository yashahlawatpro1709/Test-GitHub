"use client"

import { useEffect, useRef, useState } from 'react'
import { ChevronDown, Check } from 'lucide-react'

interface Option {
  value: string
  label: string
}

interface PremiumSelectProps {
  value: string
  onChange: (value: string) => void
  options: Option[]
  placeholder?: string
  className?: string
}

export function PremiumSelect({ value, onChange, options, placeholder = "Select", className = "" }: PremiumSelectProps) {
  const [open, setOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(() => Math.max(0, options.findIndex(o => o.value === value)))
  const containerRef = useRef<HTMLDivElement | null>(null)
  const buttonRef = useRef<HTMLButtonElement | null>(null)

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  useEffect(() => {
    setActiveIndex(Math.max(0, options.findIndex(o => o.value === value)))
  }, [value, options])

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!open && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
      setOpen(true)
      e.preventDefault()
      return
    }
    if (open) {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      } else if (e.key === 'ArrowDown') {
        setActiveIndex(i => Math.min(options.length - 1, i + 1))
        e.preventDefault()
      } else if (e.key === 'ArrowUp') {
        setActiveIndex(i => Math.max(0, i - 1))
        e.preventDefault()
      } else if (e.key === 'Enter') {
        const opt = options[activeIndex]
        if (opt) onChange(opt.value)
        setOpen(false)
        buttonRef.current?.focus()
        e.preventDefault()
      }
    }
  }

  const selectedLabel = options.find(o => o.value === value)?.label ?? placeholder

  return (
    <div ref={containerRef} className={`relative ${className}`} onKeyDown={onKeyDown}>
      <button
        ref={buttonRef}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        className="w-full bg-white border border-slate-300 rounded px-3 py-2 pr-9 text-sm text-slate-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-amber-300 focus:border-amber-300 transition-shadow"
        onClick={() => setOpen(o => !o)}
      >
        {selectedLabel}
        <span className="pointer-events-none absolute inset-y-0 right-2 flex items-center">
          <ChevronDown className="w-4 h-4 text-slate-500" />
        </span>
      </button>

      {open && (
        <ul
          role="listbox"
          className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-md shadow-lg overflow-hidden"
        >
          {options.map((opt, idx) => {
            const selected = opt.value === value
            const active = idx === activeIndex
            return (
              <li
                key={opt.value}
                role="option"
                aria-selected={selected}
                className={`${active ? 'bg-amber-50' : ''} ${selected ? 'text-slate-900' : 'text-slate-700'} flex items-center justify-between px-3 py-2 text-sm hover:bg-amber-100 cursor-pointer`}
                onMouseEnter={() => setActiveIndex(idx)}
                onClick={() => { onChange(opt.value); setOpen(false); buttonRef.current?.focus() }}
              >
                <span>{opt.label}</span>
                {selected && <Check className="w-4 h-4 text-amber-600" />}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
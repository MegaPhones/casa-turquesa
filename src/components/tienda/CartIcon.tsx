'use client'

import { useEffect, useState } from 'react'
import { useCart, useCartTotals } from '@/lib/tienda/cart-store'

interface Props {
  className?: string
  variant?: 'desktop' | 'mobile'
}

export default function CartIcon({ className = '' }: Props) {
  const openCart = useCart((s) => s.openCart)
  const { totalItems } = useCartTotals()
  const [mounted, setMounted] = useState(false)
  const [pulse, setPulse] = useState(false)
  const lastAddedAt = useCart((s) => s.lastAddedAt)

  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!mounted || !lastAddedAt) return
    setPulse(true)
    const t = setTimeout(() => setPulse(false), 600)
    return () => clearTimeout(t)
  }, [lastAddedAt, mounted])

  const showBadge = mounted && totalItems > 0

  return (
    <button
      onClick={openCart}
      aria-label={`Abrir carrito (${totalItems} ${totalItems === 1 ? 'artículo' : 'artículos'})`}
      className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full text-[#2C5F5D] hover:bg-[#2C5F5D]/10 transition-all ${pulse ? 'animate-bounce' : ''} ${className}`}
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
      {showBadge && (
        <span
          className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 bg-[#2C5F5D] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white"
          aria-hidden="true"
        >
          {totalItems > 99 ? '99+' : totalItems}
        </span>
      )}
    </button>
  )
}

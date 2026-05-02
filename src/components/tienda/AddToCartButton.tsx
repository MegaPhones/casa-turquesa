'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/lib/tienda/cart-store'
import type { CartItem } from '@/lib/tienda/cart-store'

interface Props {
  item: Omit<CartItem, 'cantidad'>
  cantidad: number
  disabled: boolean
  disabledLabel?: string
}

export default function AddToCartButton({ item, cantidad, disabled, disabledLabel = 'Sin stock' }: Props) {
  const addItem = useCart((s) => s.addItem)
  const openCart = useCart((s) => s.openCart)
  const [justAdded, setJustAdded] = useState(false)

  useEffect(() => {
    if (!justAdded) return
    const t = setTimeout(() => setJustAdded(false), 1500)
    return () => clearTimeout(t)
  }, [justAdded])

  const handleClick = () => {
    if (disabled) return
    addItem(item, cantidad)
    setJustAdded(true)
    setTimeout(() => openCart(), 300)
  }

  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className={`flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-sm uppercase tracking-[0.15em] font-medium transition-all ${
        disabled
          ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed'
          : justAdded
          ? 'bg-emerald-600 text-white'
          : 'bg-[#2C5F5D] text-white hover:bg-[#1f4644]'
      }`}
    >
      {disabled ? (
        disabledLabel
      ) : justAdded ? (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
          Agregado
        </>
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          Agregar al carrito
        </>
      )}
    </button>
  )
}

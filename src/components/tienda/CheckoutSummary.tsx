'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'
import { useCart, useCartTotals } from '@/lib/tienda/cart-store'

const TURQUESA = '#2C5F5D'

function formatearPrecio(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

function PlaceholderMini({ marca, nombre }: { marca: string | null; nombre: string }) {
  const inicial = (marca ?? nombre).charAt(0).toUpperCase()
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{ background: `linear-gradient(135deg, ${TURQUESA} 0%, #3D7E7C 100%)` }}
    >
      <span className="font-serif text-xl font-light text-white opacity-90">{inicial}</span>
    </div>
  )
}

export default function CheckoutSummary() {
  const items = useCart((s) => s.items)
  const { totalItems, subtotal } = useCartTotals()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return <div className="animate-pulse h-96 bg-neutral-100 rounded-2xl" />
  }

  if (items.length === 0) return null

  return (
    <aside className="bg-white rounded-2xl border border-neutral-200 overflow-hidden">
      <div className="p-6 border-b border-neutral-100">
        <h2 className="font-serif text-xl text-neutral-900">Tu pedido</h2>
        <p className="text-xs text-neutral-500 mt-0.5">
          {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
        </p>
      </div>

      <ul className="divide-y divide-neutral-100 max-h-96 overflow-y-auto">
        {items.map((item) => (
          <li key={item.varianteId} className="flex gap-3 p-5">
            <Link
              href={`/tienda/${item.slug}`}
              className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0"
            >
              {item.imagenUrl ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={item.imagenUrl} alt={item.nombre} className="absolute inset-0 w-full h-full object-cover" />
              ) : (
                <PlaceholderMini marca={item.marca} nombre={item.nombre} />
              )}
              <span className="absolute -top-1.5 -right-1.5 min-w-[20px] h-5 px-1.5 bg-[#2C5F5D] text-white text-[10px] font-bold rounded-full flex items-center justify-center ring-2 ring-white">
                {item.cantidad}
              </span>
            </Link>

            <div className="flex-1 min-w-0">
              {item.marca && (
                <p className="text-[10px] uppercase tracking-[0.15em] text-neutral-500 mb-0.5">{item.marca}</p>
              )}
              <p className="text-sm text-neutral-900 line-clamp-2 leading-snug">{item.nombre}</p>
              {item.varianteLabel && (
                <p className="text-xs text-neutral-500 mt-0.5">{item.varianteLabel}</p>
              )}
            </div>

            <p className="text-sm font-medium text-neutral-900 flex-shrink-0">
              {formatearPrecio(item.precioUnitario * item.cantidad)}
            </p>
          </li>
        ))}
      </ul>

      <div className="p-6 bg-[#FAF8F4] space-y-3">
        <div className="flex items-center justify-between text-sm text-neutral-600">
          <span>Subtotal</span>
          <span>{formatearPrecio(subtotal)}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-neutral-500">
          <span>Despacho</span>
          <span className="italic">Se coordina por WhatsApp</span>
        </div>
        <div className="border-t border-neutral-200 pt-3 flex items-baseline justify-between">
          <span className="text-sm font-medium text-neutral-900">Total estimado</span>
          <span className="font-serif text-2xl font-medium text-[#2C5F5D]">
            {formatearPrecio(subtotal)}
          </span>
        </div>
        <Link
          href="/tienda"
          className="block text-center text-xs text-neutral-600 hover:text-[#2C5F5D] mt-2"
        >
          ← Seguir comprando
        </Link>
      </div>
    </aside>
  )
}

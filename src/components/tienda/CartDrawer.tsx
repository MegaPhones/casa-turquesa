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
      style={{
        background: `linear-gradient(135deg, ${TURQUESA} 0%, #3D7E7C 100%)`,
      }}
    >
      <span className="font-serif text-2xl font-light text-white opacity-90">{inicial}</span>
    </div>
  )
}

export default function CartDrawer() {
  const items = useCart((s) => s.items)
  const isOpen = useCart((s) => s.isOpen)
  const closeCart = useCart((s) => s.closeCart)
  const updateCantidad = useCart((s) => s.updateCantidad)
  const removeItem = useCart((s) => s.removeItem)
  const { totalItems, subtotal } = useCartTotals()

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeCart()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, closeCart])

  useEffect(() => {
    if (!mounted) return
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen, mounted])

  if (!mounted) return null

  return (
    <>
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-[80] transition-opacity ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden={!isOpen}
      />

      <aside
        className={`fixed top-0 right-0 bottom-0 w-full sm:w-[440px] bg-white z-[81] shadow-2xl transition-transform duration-300 flex flex-col ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        role="dialog"
        aria-label="Carrito de compras"
        aria-hidden={!isOpen}
      >
        <div className="flex items-center justify-between px-6 py-5 border-b border-neutral-200">
          <div>
            <h2 className="font-serif text-xl text-neutral-900">Tu carrito</h2>
            {totalItems > 0 && (
              <p className="text-xs text-neutral-500 mt-0.5">
                {totalItems} {totalItems === 1 ? 'artículo' : 'artículos'}
              </p>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Cerrar carrito"
            className="w-9 h-9 rounded-full flex items-center justify-center text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full px-6 text-center">
              <div className="w-20 h-20 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center mb-5">
                <svg className="w-10 h-10 text-[#2C5F5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl text-neutral-900 mb-2">Tu carrito está vacío</h3>
              <p className="text-sm text-neutral-600 mb-6 max-w-xs">
                Explorá nuestra selección de cafés, conservas y productos artesanales.
              </p>
              <Link
                href="/tienda"
                onClick={closeCart}
                className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
              >
                Explorar tienda
              </Link>
            </div>
          ) : (
            <ul className="divide-y divide-neutral-100">
              {items.map((item) => (
                <li key={item.varianteId} className="flex gap-4 p-5">
                  <Link
                    href={`/tienda/${item.slug}`}
                    onClick={closeCart}
                    className="relative w-20 h-20 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0"
                  >
                    {item.imagenUrl ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.imagenUrl}
                        alt={item.nombre}
                        className="absolute inset-0 w-full h-full object-cover"
                      />
                    ) : (
                      <PlaceholderMini marca={item.marca} nombre={item.nombre} />
                    )}
                  </Link>

                  <div className="flex-1 min-w-0">
                    {item.marca && (
                      <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-0.5">
                        {item.marca}
                      </p>
                    )}
                    <Link
                      href={`/tienda/${item.slug}`}
                      onClick={closeCart}
                      className="text-sm font-medium text-neutral-900 hover:text-[#2C5F5D] line-clamp-2"
                    >
                      {item.nombre}
                    </Link>
                    {item.varianteLabel && (
                      <p className="text-xs text-neutral-500 mt-0.5">{item.varianteLabel}</p>
                    )}

                    <div className="flex items-end justify-between mt-3 gap-2">
                      <div className="flex items-center border border-neutral-200 rounded-full overflow-hidden bg-white">
                        <button
                          onClick={() => updateCantidad(item.varianteId, item.cantidad - 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
                          aria-label="Disminuir"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M20 12H4" /></svg>
                        </button>
                        <span className="w-8 text-center text-sm font-medium">{item.cantidad}</span>
                        <button
                          onClick={() => updateCantidad(item.varianteId, item.cantidad + 1)}
                          className="w-8 h-8 flex items-center justify-center text-neutral-600 hover:bg-neutral-50"
                          aria-label="Aumentar"
                        >
                          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                        </button>
                      </div>

                      <p className="font-serif text-base font-medium text-[#2C5F5D]">
                        {formatearPrecio(item.precioUnitario * item.cantidad)}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => removeItem(item.varianteId)}
                    className="self-start text-neutral-400 hover:text-rose-600 transition-colors p-1"
                    aria-label="Eliminar del carrito"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-neutral-200 p-6 space-y-4 bg-[#FAF8F4]">
            <div className="flex items-center justify-between">
              <span className="text-sm text-neutral-700">Subtotal</span>
              <span className="font-serif text-2xl font-medium text-[#2C5F5D]">
                {formatearPrecio(subtotal)}
              </span>
            </div>
            <p className="text-xs text-neutral-500 leading-relaxed">
              El despacho se coordina por WhatsApp después de confirmar el pedido.
            </p>
            <Link
              href="/tienda/checkout"
              onClick={closeCart}
              className="block w-full text-center px-6 py-4 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
            >
              Confirmar pedido
            </Link>
            <Link
              href="/tienda"
              onClick={closeCart}
              className="block text-center text-xs text-neutral-600 hover:text-[#2C5F5D] transition-colors"
            >
              Seguir comprando
            </Link>
          </div>
        )}
      </aside>
    </>
  )
}

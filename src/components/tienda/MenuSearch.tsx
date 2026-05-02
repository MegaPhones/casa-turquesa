'use client'

import { useEffect, useState } from 'react'
import type { SeccionCarta } from '@/lib/tienda/queries'
import MenuSection from './MenuSection'

interface Props {
  secciones: SeccionCarta[]
}

export default function MenuSearch({ secciones }: Props) {
  const [busqueda, setBusqueda] = useState('')
  const [debouncedBusqueda, setDebouncedBusqueda] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setDebouncedBusqueda(busqueda.toLowerCase().trim()), 200)
    return () => clearTimeout(t)
  }, [busqueda])

  const seccionesFiltradas = debouncedBusqueda
    ? secciones
        .map((s) => ({
          ...s,
          items: s.items.filter((item) => {
            const haystack = [
              item.nombre,
              item.descripcion_corta ?? '',
              item.descripcion_larga ?? '',
              item.marca ?? '',
            ]
              .join(' ')
              .toLowerCase()
            return haystack.includes(debouncedBusqueda)
          }),
        }))
        .filter((s) => s.items.length > 0)
    : secciones

  const totalResultados = seccionesFiltradas.reduce((acc, s) => acc + s.items.length, 0)

  return (
    <>
      <div className="max-w-md mx-auto mb-8">
        <div className="relative">
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400 pointer-events-none"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="search"
            placeholder="Buscar en la carta..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            className="w-full pl-11 pr-4 py-3 rounded-full bg-white border border-neutral-300 text-sm placeholder:text-neutral-400 focus:outline-none focus:border-[#2C5F5D] focus:ring-2 focus:ring-[#2C5F5D]/20 transition-all"
          />
          {busqueda && (
            <button
              onClick={() => setBusqueda('')}
              aria-label="Limpiar búsqueda"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
        {debouncedBusqueda && (
          <p className="text-center text-xs text-neutral-500 mt-3">
            {totalResultados === 0
              ? 'No encontramos nada con ese término.'
              : `${totalResultados} ${totalResultados === 1 ? 'resultado' : 'resultados'} para "${debouncedBusqueda}"`}
          </p>
        )}
      </div>

      <div className="space-y-12 max-w-3xl mx-auto">
        {seccionesFiltradas.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-neutral-100 flex items-center justify-center">
              <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <p className="text-neutral-600">Probá con otro término o explorá la carta completa.</p>
            <button
              onClick={() => setBusqueda('')}
              className="mt-4 text-sm text-[#2C5F5D] hover:underline"
            >
              Ver toda la carta
            </button>
          </div>
        ) : (
          seccionesFiltradas.map((seccion) => (
            <MenuSection key={seccion.categoriaId} seccion={seccion} />
          ))
        )}
      </div>
    </>
  )
}

'use client'

import { useEffect, useMemo, useState } from 'react'
import type { MenuCategoria, MenuItem } from '@/lib/sheets/menu'
import { categoriaSlug } from '@/lib/sheets/menu'
import MenuSection from './MenuSection'

interface Props {
  categorias: MenuCategoria[]
}

function matchItem(item: MenuItem, q: string): boolean {
  return (item.nombre + ' ' + item.descripcion).toLowerCase().includes(q)
}

function filtrarCategoria(cat: MenuCategoria, q: string): MenuCategoria {
  return {
    nombre: cat.nombre,
    subcategorias: cat.subcategorias
      .map((s) => ({ ...s, items: s.items.filter((i) => matchItem(i, q)) }))
      .filter((s) => s.items.length > 0),
    itemsSinSubcategoria: cat.itemsSinSubcategoria.filter((i) => matchItem(i, q)),
  }
}

function totalItems(cat: MenuCategoria): number {
  return (
    cat.subcategorias.reduce((acc, s) => acc + s.items.length, 0) +
    cat.itemsSinSubcategoria.length
  )
}

export default function MenuSearch({ categorias }: Props) {
  const [busqueda, setBusqueda] = useState('')
  const [debounced, setDebounced] = useState('')

  useEffect(() => {
    const t = setTimeout(() => setDebounced(busqueda.toLowerCase().trim()), 200)
    return () => clearTimeout(t)
  }, [busqueda])

  const categoriasFiltradas = useMemo(() => {
    if (!debounced) return categorias.filter((c) => totalItems(c) > 0)
    return categorias.map((c) => filtrarCategoria(c, debounced)).filter((c) => totalItems(c) > 0)
  }, [categorias, debounced])

  const totalResultados = categoriasFiltradas.reduce((acc, c) => acc + totalItems(c), 0)

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
        {debounced && (
          <p className="text-center text-xs text-neutral-500 mt-3">
            {totalResultados === 0
              ? 'No encontramos nada con ese término.'
              : `${totalResultados} ${totalResultados === 1 ? 'resultado' : 'resultados'} para "${debounced}"`}
          </p>
        )}
      </div>

      <div className="space-y-12 max-w-3xl mx-auto">
        {categoriasFiltradas.length === 0 ? (
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
          categoriasFiltradas.map((cat) => (
            <MenuSection key={cat.nombre} categoria={cat} slug={categoriaSlug(cat.nombre)} />
          ))
        )}
      </div>
    </>
  )
}

'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import FiltersPanel from './FiltersPanel'
import type { Categoria } from '@/lib/tienda/types'

interface Props {
  categorias: Categoria[]
  marcas: { marca: string; count: number }[]
}

export default function FiltersDrawer({ categorias, marcas }: Props) {
  const [open, setOpen] = useState(false)
  const searchParams = useSearchParams()

  const filtrosActivos = ['categoria', 'marca', 'sg', 'vg', 'vt']
    .filter(k => searchParams.get(k))
    .length

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="lg:hidden inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white border border-neutral-300 text-sm text-neutral-700 hover:border-[#2C5F5D] transition-colors"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        Filtros
        {filtrosActivos > 0 && (
          <span className="bg-[#2C5F5D] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {filtrosActivos}
          </span>
        )}
      </button>

      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-black/40 z-[60] transition-opacity lg:hidden ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      />

      <aside
        className={`fixed top-0 left-0 bottom-0 w-[85%] max-w-sm bg-[#FAF8F4] z-[61] shadow-2xl transition-transform duration-300 lg:hidden overflow-y-auto ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          <FiltersPanel categorias={categorias} marcas={marcas} onClose={() => setOpen(false)} />
        </div>
      </aside>
    </>
  )
}

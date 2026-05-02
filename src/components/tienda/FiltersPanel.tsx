'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import type { Categoria } from '@/lib/tienda/types'

interface Props {
  categorias: Categoria[]
  marcas: { marca: string; count: number }[]
  onClose?: () => void
}

export default function FiltersPanel({ categorias, marcas, onClose }: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [isPending, startTransition] = useTransition()

  const currentCategoria = searchParams.get('categoria') ?? ''
  const currentMarca = searchParams.get('marca') ?? ''
  const sinGluten = searchParams.get('sg') === '1'
  const vegano = searchParams.get('vg') === '1'
  const vegetariano = searchParams.get('vt') === '1'

  const setParam = useCallback((key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === '') {
      params.delete(key)
    } else {
      params.set(key, value)
    }
    startTransition(() => {
      const qs = params.toString()
      router.push(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    })
  }, [searchParams, router, pathname])

  const hayFiltros = currentCategoria || currentMarca || sinGluten || vegano || vegetariano

  const categoriasRaiz = categorias.filter(c => !c.parent_id)
  const subCategorias = (parentId: string) => categorias.filter(c => c.parent_id === parentId)

  return (
    <div className="flex flex-col gap-7 text-sm">
      <div className="flex items-center justify-between">
        <h2 className="font-serif text-lg text-neutral-900">Filtros</h2>
        <div className="flex items-center gap-3">
          {hayFiltros && (
            <button
              onClick={() => startTransition(() => router.push(pathname, { scroll: false }))}
              className="text-xs text-[#2C5F5D] hover:underline"
            >
              Limpiar
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="lg:hidden text-neutral-500 hover:text-neutral-900">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div>
        <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Preferencias</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { key: 'sg', label: 'Sin gluten', active: sinGluten },
            { key: 'vg', label: 'Vegano', active: vegano },
            { key: 'vt', label: 'Vegetariano', active: vegetariano },
          ].map(t => (
            <button
              key={t.key}
              onClick={() => setParam(t.key, t.active ? null : '1')}
              className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                t.active
                  ? 'bg-[#2C5F5D] text-white border-[#2C5F5D]'
                  : 'bg-white text-neutral-700 border-neutral-300 hover:border-[#2C5F5D]'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {categoriasRaiz.length > 0 && (
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Categorías</h3>
          <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1">
            <button
              onClick={() => setParam('categoria', null)}
              className={`text-left px-2 py-1.5 rounded transition-colors ${
                !currentCategoria ? 'text-[#2C5F5D] font-semibold' : 'text-neutral-700 hover:text-[#2C5F5D]'
              }`}
            >
              Todas
            </button>
            {categoriasRaiz.map(cat => {
              const subs = subCategorias(cat.id)
              const isActive = currentCategoria === cat.slug
              return (
                <div key={cat.id}>
                  <button
                    onClick={() => setParam('categoria', isActive ? null : cat.slug)}
                    className={`text-left w-full px-2 py-1.5 rounded transition-colors ${
                      isActive ? 'text-[#2C5F5D] font-semibold' : 'text-neutral-700 hover:text-[#2C5F5D]'
                    }`}
                  >
                    {cat.nombre}
                  </button>
                  {subs.length > 0 && (
                    <div className="ml-3 flex flex-col">
                      {subs.map(sub => (
                        <button
                          key={sub.id}
                          onClick={() => setParam('categoria', currentCategoria === sub.slug ? null : sub.slug)}
                          className={`text-left text-xs px-2 py-1 rounded transition-colors ${
                            currentCategoria === sub.slug
                              ? 'text-[#2C5F5D] font-semibold'
                              : 'text-neutral-500 hover:text-[#2C5F5D]'
                          }`}
                        >
                          · {sub.nombre}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {marcas.length > 0 && (
        <div>
          <h3 className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-3">Marcas</h3>
          <div className="flex flex-col gap-1 max-h-72 overflow-y-auto pr-1">
            <button
              onClick={() => setParam('marca', null)}
              className={`text-left px-2 py-1.5 rounded transition-colors ${
                !currentMarca ? 'text-[#2C5F5D] font-semibold' : 'text-neutral-700 hover:text-[#2C5F5D]'
              }`}
            >
              Todas las marcas
            </button>
            {marcas.slice(0, 30).map(m => {
              const isActive = currentMarca === m.marca
              return (
                <button
                  key={m.marca}
                  onClick={() => setParam('marca', isActive ? null : m.marca)}
                  className={`text-left flex items-center justify-between gap-2 px-2 py-1.5 rounded transition-colors ${
                    isActive ? 'text-[#2C5F5D] font-semibold' : 'text-neutral-700 hover:text-[#2C5F5D]'
                  }`}
                >
                  <span className="truncate">{m.marca}</span>
                  <span className="text-[10px] text-neutral-400">{m.count}</span>
                </button>
              )
            })}
          </div>
        </div>
      )}

      {isPending && (
        <div className="text-xs text-neutral-400 italic">Actualizando…</div>
      )}
    </div>
  )
}

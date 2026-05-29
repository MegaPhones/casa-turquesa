'use client'

import { useEffect, useState } from 'react'
import type { MenuCategoria } from '@/lib/sheets/menu'
import { categoriaSlug } from '@/lib/sheets/menu'

interface Props {
  categorias: MenuCategoria[]
}

function totalItems(cat: MenuCategoria): number {
  return (
    cat.subcategorias.reduce((acc, s) => acc + s.items.length, 0) +
    cat.itemsSinSubcategoria.length
  )
}

export default function MenuNav({ categorias }: Props) {
  const [activeSlug, setActiveSlug] = useState<string>('')

  const visibles = categorias.filter((c) => totalItems(c) > 0)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '')
            setActiveSlug(id)
          }
        })
      },
      { rootMargin: '-30% 0px -60% 0px', threshold: 0 },
    )

    visibles.forEach((c) => {
      const el = document.getElementById(`cat-${categoriaSlug(c.nombre)}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [visibles])

  const handleClick = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(`cat-${slug}`)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (visibles.length === 0) return null

  return (
    <nav className="sticky top-20 z-30 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-neutral-200/60 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-5xl mx-auto overflow-x-auto py-3">
        <ul className="flex gap-1 sm:gap-2 whitespace-nowrap min-w-max">
          {visibles.map((c) => {
            const slug = categoriaSlug(c.nombre)
            const isActive = activeSlug === slug
            return (
              <li key={slug}>
                <a
                  href={`#cat-${slug}`}
                  onClick={handleClick(slug)}
                  className={`inline-block px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all ${
                    isActive
                      ? 'bg-[#2C5F5D] text-white'
                      : 'text-neutral-600 hover:bg-[#2C5F5D]/10 hover:text-[#2C5F5D]'
                  }`}
                >
                  {c.nombre}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

'use client'

import { useEffect, useState } from 'react'
import type { SeccionCarta } from '@/lib/tienda/queries'

interface Props {
  secciones: SeccionCarta[]
}

export default function MenuNav({ secciones }: Props) {
  const [activeSection, setActiveSection] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id.replace('cat-', '')
            setActiveSection(id)
          }
        })
      },
      {
        rootMargin: '-30% 0px -60% 0px',
        threshold: 0,
      }
    )

    secciones.forEach((s) => {
      const el = document.getElementById(`cat-${s.slug}`)
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [secciones])

  const handleClick = (slug: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    const el = document.getElementById(`cat-${slug}`)
    if (el) {
      const yOffset = -100
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset
      window.scrollTo({ top: y, behavior: 'smooth' })
    }
  }

  if (secciones.length === 0) return null

  return (
    <nav className="sticky top-20 z-30 bg-[#FAF8F4]/95 backdrop-blur-sm border-b border-neutral-200/60 -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8 mb-8">
      <div className="max-w-5xl mx-auto overflow-x-auto py-3">
        <ul className="flex gap-1 sm:gap-2 whitespace-nowrap min-w-max">
          {secciones.map((s) => {
            const isActive = activeSection === s.slug
            return (
              <li key={s.slug}>
                <a
                  href={`#cat-${s.slug}`}
                  onClick={handleClick(s.slug)}
                  className={`inline-block px-4 py-2 rounded-full text-xs uppercase tracking-[0.15em] transition-all ${
                    isActive
                      ? 'bg-[#2C5F5D] text-white'
                      : 'text-neutral-600 hover:bg-[#2C5F5D]/10 hover:text-[#2C5F5D]'
                  }`}
                >
                  {s.nombre}
                </a>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}

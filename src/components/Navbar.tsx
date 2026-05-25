'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import CartIcon from './tienda/CartIcon'

const TURQUESA = '#2C5F5D'

type NavItem = { label: string; href: string }

const NAV_ITEMS: NavItem[] = [
  { label: 'Menú', href: '/menu' },
  { label: 'Tienda', href: '/tienda' },
  { label: 'Talleres', href: '/#espacios' },
  { label: 'Galería', href: '/#galeria' },
  { label: 'Nosotros', href: '/#intro' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  function getLink(href: string): string {
    if (!href.includes('#')) return href
    if (pathname === '/' && href.startsWith('/#')) return href.substring(1)
    return href
  }

  function isActive(href: string): boolean {
    if (href.includes('#')) return false
    if (href === '/' && pathname === '/') return true
    if (href !== '/' && pathname.startsWith(href)) return true
    return false
  }

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled || pathname !== '/' || mobileOpen
            ? 'bg-white/95 backdrop-blur-md shadow-sm'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-base sm:text-lg tracking-[0.25em] uppercase"
            style={{ color: TURQUESA }}
          >
            Casa Turquesa
          </Link>

          <nav className="hidden lg:flex items-center gap-8">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={getLink(item.href)}
                  className={`text-xs uppercase tracking-[0.2em] transition-colors ${
                    active
                      ? 'text-[#2C5F5D] font-semibold'
                      : 'text-neutral-700 hover:text-[#2C5F5D]'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          <div className="hidden lg:flex items-center gap-3">
            <CartIcon variant="desktop" />
            <Link
              href="/menu"
              className="px-5 py-2 rounded-full border border-[#2C5F5D] text-xs uppercase tracking-[0.2em] text-[#2C5F5D] hover:bg-[#2C5F5D] hover:text-white transition-all"
            >
              Ver menú
            </Link>
            <a
              href="https://wa.me/56935227488?text=Hola%20Casa%20Turquesa%2C%20quisiera%20hacer%20una%20reserva"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2 rounded-full bg-[#2C5F5D] text-white text-xs uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
            >
              Reservar
            </a>
          </div>

          <div className="lg:hidden flex items-center gap-1">
            <CartIcon variant="mobile" />
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Abrir menú"
              className="flex flex-col gap-1.5 p-2"
            >
              <span className={`w-6 h-0.5 bg-[#2C5F5D] transition-transform ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#2C5F5D] transition-opacity ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`w-6 h-0.5 bg-[#2C5F5D] transition-transform ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>

        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            mobileOpen ? 'max-h-[500px] border-t border-neutral-200' : 'max-h-0'
          }`}
        >
          <nav className="flex flex-col px-4 py-4 gap-1 bg-white">
            {NAV_ITEMS.map(item => {
              const active = isActive(item.href)
              return (
                <Link
                  key={item.href}
                  href={getLink(item.href)}
                  onClick={() => setMobileOpen(false)}
                  className={`px-3 py-3 text-sm uppercase tracking-[0.2em] rounded-lg transition-colors ${
                    active
                      ? 'bg-[#2C5F5D]/10 text-[#2C5F5D] font-semibold'
                      : 'text-neutral-700 hover:bg-neutral-50'
                  }`}
                >
                  {item.label}
                </Link>
              )
            })}
            <a
              href="https://wa.me/56935227488?text=Hola%20Casa%20Turquesa%2C%20quisiera%20hacer%20una%20reserva"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-3 px-3 py-3 text-sm uppercase tracking-[0.2em] rounded-lg bg-[#2C5F5D] text-white text-center"
            >
              Reservar por WhatsApp
            </a>
          </nav>
        </div>
      </header>

      <div className="h-20" />
    </>
  )
}

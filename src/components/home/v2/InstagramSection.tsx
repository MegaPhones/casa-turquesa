'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

interface IGPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  permalink: string
}

interface IGProfile {
  followers_count?: number
}

const RESENAS = [
  {
    cita: 'El mejor café de Ñuñoa. El ambiente, la atención y los pasteles sin gluten son una maravilla.',
    autor: 'María José R.',
    fecha: 'Hace 2 días',
  },
  {
    cita: 'Una joya en Ñuñoa. Café excelente, repostería de otro nivel y un espacio acogedor.',
    autor: 'Carlos M.',
    fecha: 'Hace 1 semana',
  },
  {
    cita: 'Mi cafetería favorita. Las opciones veganas y sin gluten son increíbles, todo riquísimo.',
    autor: 'Camila P.',
    fecha: 'Hace 3 días',
  },
] as const

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const

// Slot layout: 4 cols desktop / 2 cols mobile, auto-rows 180px
// Slot 1 y 4 ocupan 2 filas (alto), el resto 1 fila
const SLOT_CLASSES = [
  'row-span-2',
  'row-span-1',
  'row-span-1',
  'row-span-2',
  'row-span-1',
  'row-span-1',
]

function proxyImage(url: string): string {
  return `/api/instagram/image?url=${encodeURIComponent(url)}`
}

function formatFollowers(n?: number): string {
  if (typeof n !== 'number') return '11.300'
  return new Intl.NumberFormat('es-CL').format(n)
}

function truncate(s: string | undefined, max = 80): string {
  if (!s) return ''
  if (s.length <= max) return s
  return s.slice(0, max - 1) + '…'
}

export default function InstagramSection() {
  const [posts, setPosts] = useState<IGPost[]>([])
  const [profile, setProfile] = useState<IGProfile | null>(null)
  const reduceMotion = useReducedMotion()
  const gridRef = useRef<HTMLDivElement>(null)
  const gridInView = useInView(gridRef, { amount: 0.2, once: true })

  useEffect(() => {
    let cancelled = false
    fetch('/api/instagram')
      .then((r) => r.json())
      .then((data: { posts?: IGPost[]; profile?: IGProfile }) => {
        if (cancelled) return
        if (Array.isArray(data.posts)) setPosts(data.posts.slice(0, 6))
        if (data.profile) setProfile(data.profile)
      })
      .catch(() => {
        /* placeholders se mantienen */
      })
    return () => {
      cancelled = true
    }
  }, [])

  const [resenaIdx, setResenaIdx] = useState(0)
  const [resenaVisible, setResenaVisible] = useState(true)
  useEffect(() => {
    if (reduceMotion) return
    const id = setInterval(() => {
      setResenaVisible(false)
      const swap = setTimeout(() => {
        setResenaIdx((i) => (i + 1) % RESENAS.length)
        setResenaVisible(true)
      }, 300)
      return () => clearTimeout(swap)
    }, 8000)
    return () => clearInterval(id)
  }, [reduceMotion])

  const reseña = RESENAS[resenaIdx]

  const slotVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, delay: i * 0.1, ease: EASE_OUT_QUART },
    }),
  }

  const slots = Array.from({ length: 6 }, (_, i) => posts[i])

  return (
    <section
      style={{ backgroundColor: '#FAF8F4' }}
      className="pt-20 md:pt-[120px] pb-[160px] md:pb-[200px] px-5 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
          <div>
            <p
              className="text-[11px] uppercase font-medium mb-3"
              style={{ color: '#2C5F5D', letterSpacing: '4px' }}
            >
              @casaturquesa.cl
            </p>
            <h2
              className="font-serif m-0 text-[36px] md:text-[56px]"
              style={{ lineHeight: 1.05, letterSpacing: '-1.5px', color: '#1a1a1a' }}
            >
              <span className="block">Lo último desde</span>
              <span className="block italic" style={{ color: '#2C5F5D' }}>
                nuestra cocina.
              </span>
            </h2>
          </div>
          <div className="flex items-center gap-5">
            <div className="text-right">
              <div
                className="font-serif"
                style={{ fontSize: 36, color: '#2C5F5D', lineHeight: 1 }}
              >
                {formatFollowers(profile?.followers_count)}
              </div>
              <div
                className="text-[11px] uppercase mt-1"
                style={{ letterSpacing: '2px', color: '#888' }}
              >
                Seguidores en Instagram
              </div>
            </div>
            <a
              href="https://www.instagram.com/casaturquesa.cl/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-white text-[11px] uppercase font-medium whitespace-nowrap no-underline"
              style={{ backgroundColor: '#2C5F5D', letterSpacing: '2px' }}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Seguir
            </a>
          </div>
        </div>

        {/* Masonry grid */}
        <div
          ref={gridRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
          style={{ gridAutoRows: '180px' }}
        >
          {slots.map((post, i) => {
            const url =
              post && (post.media_type === 'VIDEO' ? post.thumbnail_url ?? post.media_url : post.media_url)
            return (
              <motion.a
                key={post?.id ?? `slot-${i}`}
                href={post?.permalink ?? 'https://www.instagram.com/casaturquesa.cl/'}
                target="_blank"
                rel="noopener noreferrer"
                custom={i}
                initial={reduceMotion ? false : 'hidden'}
                animate={gridInView ? 'show' : 'hidden'}
                variants={slotVariants}
                className={`group relative overflow-hidden block ${SLOT_CLASSES[i]}`}
                style={{ borderRadius: 4 }}
              >
                {url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={proxyImage(url)}
                    alt={truncate(post?.caption, 80) || 'Instagram post'}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="absolute inset-0"
                    style={{ background: 'linear-gradient(135deg, #2C5F5D 0%, #1a4544 100%)' }}
                    aria-hidden
                  />
                )}
                {post?.caption && (
                  <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <p className="text-white text-xs leading-snug">{truncate(post.caption, 80)}</p>
                  </div>
                )}
              </motion.a>
            )
          })}
        </div>

        {/* Reseña destacada */}
        <div
          className="mt-20 bg-white"
          style={{ borderLeft: '4px solid #2C5F5D', padding: 'clamp(32px, 5vw, 48px)' }}
        >
          <p
            className="text-[11px] uppercase font-medium mb-6"
            style={{ letterSpacing: '2px', color: '#888' }}
          >
            Lo que dicen en Google · 4.6 ★ de 550 reseñas
          </p>
          <div
            style={{
              transition: 'opacity 300ms ease-in-out',
              opacity: resenaVisible ? 1 : 0,
            }}
          >
            <blockquote
              className="font-serif italic m-0 text-[22px] md:text-[28px] text-[#1a1a1a]"
              style={{ lineHeight: 1.4 }}
            >
              “{reseña.cita}”
            </blockquote>
            <p className="mt-5 text-[13px] font-medium text-[#2C5F5D]">
              — {reseña.autor} · {reseña.fecha}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

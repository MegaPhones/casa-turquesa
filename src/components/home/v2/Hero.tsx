'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import type { Variants } from 'framer-motion'

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const

const TOSTANDO_HOY = {
  producto: 'Tostando Bourbon Rosado',
  origen: 'de Caldas, Colombia',
}

export default function Hero() {
  const reduceMotion = useReducedMotion()
  const photoWrapperRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: photoWrapperRef,
    offset: ['start end', 'end start'],
  })
  const photoY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [0, -40])

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
  }
  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE_OUT_QUART } },
  }

  return (
    <section
      style={{ backgroundColor: '#FAF8F4' }}
      className="px-5 py-12 md:px-12 md:py-20"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate="show"
          variants={containerVariants}
        >
          {/* Eyebrow */}
          <motion.p
            variants={lineVariants}
            className="text-[11px] uppercase font-medium mb-6 md:mb-8"
            style={{ color: '#2C5F5D', letterSpacing: '4px' }}
          >
            Ñuñoa · Santiago · Desde 2019
          </motion.p>

          {/* Headline 2 líneas (semánticamente un solo h1) */}
          <h1 className="font-serif text-[56px] md:text-[96px] leading-[1.02] tracking-tight m-0">
            <motion.span
              variants={lineVariants}
              className="block"
              style={{ color: '#1a1a1a' }}
            >
              Cada taza,
            </motion.span>
            <motion.span
              variants={lineVariants}
              className="block italic md:ml-[120px]"
              style={{ color: '#2C5F5D' }}
            >
              una historia.
            </motion.span>
          </h1>

          {/* Grid 2 columnas */}
          <div className="mt-12 md:mt-16 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
            {/* Izquierda: copy + botones */}
            <motion.div variants={lineVariants}>
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-8 max-w-md">
                Café de especialidad, repostería de autor y opciones veganas, sin gluten y keto en el corazón de Ñuñoa. Hecho con cariño desde 2019.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/menu"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-white text-xs uppercase tracking-[0.18em] font-medium transition-all hover:scale-[1.02] hover:bg-[#1f4644]"
                  style={{ backgroundColor: '#2C5F5D' }}
                >
                  Ver la carta →
                </Link>
                <a
                  href="https://wa.me/56934990617?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20una%20mesa"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs uppercase tracking-[0.18em] font-medium border transition-all hover:scale-[1.02] hover:bg-[#2C5F5D]/5"
                  style={{ borderColor: '#2C5F5D', color: '#2C5F5D' }}
                >
                  Reservar mesa
                </a>
              </div>
            </motion.div>

            {/* Derecha: foto + tag flotante */}
            <motion.div
              variants={lineVariants}
              className="relative"
            >
              <motion.div
                ref={photoWrapperRef}
                style={{ y: photoY }}
                className="relative aspect-[4/5] overflow-hidden rounded"
              >
                {/* TODO: reemplazar gradient con <Image src="/images/hero-local.jpg" alt="Interior de Casa Turquesa" fill className="object-cover" /> cuando Mauricio suba foto real */}
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #2C5F5D 0%, #1a4544 100%)' }}
                  role="img"
                  aria-label="Foto de Casa Turquesa (placeholder)"
                >
                  <svg
                    width="64"
                    height="64"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="rgba(255,255,255,0.32)"
                    strokeWidth="1.3"
                  >
                    <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
                    <circle cx="12" cy="13" r="4" />
                  </svg>
                </div>
              </motion.div>

              {/* Tag flotante "EN ESTE MOMENTO" */}
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.8, ease: 'easeOut' }}
                className="absolute bottom-6 left-2 md:-left-6 max-w-[260px] bg-white rounded-md border border-neutral-200/60 px-5 py-4"
                style={{ boxShadow: '0 6px 24px rgba(0,0,0,0.08)' }}
              >
                <p
                  className="text-[10px] uppercase font-medium mb-2"
                  style={{ color: '#2C5F5D', letterSpacing: '2.5px' }}
                >
                  En este momento
                </p>
                <p className="font-serif text-lg leading-snug text-neutral-900">
                  {TOSTANDO_HOY.producto}
                </p>
                <p className="text-sm text-neutral-500 mt-0.5">
                  {TOSTANDO_HOY.origen}
                </p>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

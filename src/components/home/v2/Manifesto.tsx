'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import type { Variants } from 'framer-motion'

const VERBOS = [
  { texto: 'Tostamos.', italic: false },
  { texto: 'Horneamos.', italic: true },
  { texto: 'Servimos.', italic: false },
  { texto: 'Compartimos.', italic: true },
]

const EASE_OUT_QUART = [0.22, 1, 0.36, 1] as const

interface CountUpProps {
  end: number
  suffix?: string
  decimals?: number
  inView: boolean
}

function CountUp({ end, suffix = '', decimals = 0, inView }: CountUpProps) {
  const reduceMotion = useReducedMotion()
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduceMotion) {
      setValue(end)
      return
    }
    const duration = 1200
    const start = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const progress = Math.min(1, (t - start) / duration)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(end * eased)
      if (progress < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [inView, end, reduceMotion])

  const display = decimals > 0 ? value.toFixed(decimals) : Math.round(value).toString()
  return (
    <>
      {display}
      {suffix}
    </>
  )
}

export default function Manifesto() {
  const reduceMotion = useReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const inView = useInView(sectionRef, { amount: 0.3, once: true })

  const containerVariants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  }
  const verbVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE_OUT_QUART } },
  }

  return (
    <section
      ref={sectionRef}
      style={{ backgroundColor: '#FAF8F4', borderTop: '1px solid rgba(44,95,93,0.1)' }}
      className="py-20 md:py-[120px] px-5 md:px-12"
    >
      <div className="max-w-3xl mx-auto text-center">
        <p
          className="text-[11px] uppercase font-medium mb-10 md:mb-12"
          style={{ color: '#2C5F5D', letterSpacing: '4px' }}
        >
          Nuestro manifiesto
        </p>

        <motion.div
          initial={reduceMotion ? false : 'hidden'}
          animate={inView ? 'show' : 'hidden'}
          variants={containerVariants}
          className="flex flex-col gap-1 md:gap-4"
        >
          {VERBOS.map((v) => (
            <motion.span
              key={v.texto}
              variants={verbVariants}
              className={`block font-serif text-[48px] md:text-[88px] ${v.italic ? 'italic' : ''}`}
              style={{
                lineHeight: 1,
                letterSpacing: '-2px',
                fontWeight: 400,
                color: v.italic ? '#2C5F5D' : '#1a1a1a',
              }}
            >
              {v.texto}
            </motion.span>
          ))}
        </motion.div>

        <p
          className="mt-16 mx-auto text-base leading-[1.7]"
          style={{ color: '#888', maxWidth: 480 }}
        >
          En cada paso, un compromiso con el origen, el oficio y la comunidad de Ñuñoa.
        </p>

        <div
          className="mt-20 pt-12 mx-auto grid grid-cols-1 md:grid-cols-3 gap-12"
          style={{ maxWidth: 640, borderTop: '0.5px solid rgba(44,95,93,0.15)' }}
        >
          {[
            { end: 550, suffix: '', decimals: 0, label: 'Reseñas Google' },
            { end: 4.6, suffix: '★', decimals: 1, label: 'Valoración' },
            { end: 170, suffix: '+', decimals: 0, label: 'Productos' },
          ].map((stat) => (
            <div key={stat.label}>
              <div className="font-serif" style={{ fontSize: 48, color: '#2C5F5D', lineHeight: 1 }}>
                <CountUp end={stat.end} suffix={stat.suffix} decimals={stat.decimals} inView={inView} />
              </div>
              <div
                className="mt-2 text-[11px] uppercase font-medium"
                style={{ letterSpacing: '2px', color: '#888' }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

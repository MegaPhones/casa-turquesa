'use client'

import type { MenuItem } from '@/lib/sheets/menu'

function formatPrecio(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

interface RowProps {
  items: MenuItem[]
  italic: boolean
  textSize: string
  priceSize: string
  color: string
  duration: number
  direction: 'left' | 'right'
}

function Row({ items, italic, textSize, priceSize, color, duration, direction }: RowProps) {
  if (items.length === 0) return null
  const doubled = [...items, ...items]
  const animationName = direction === 'left' ? 'ct-marquee-left' : 'ct-marquee-right'
  return (
    <div className="overflow-hidden w-full">
      <div
        className={`ct-marquee-row inline-flex items-center whitespace-nowrap ${italic ? 'italic' : ''}`}
        style={{
          animation: `${animationName} ${duration}s linear infinite`,
        }}
      >
        {doubled.map((item, idx) => (
          <span
            key={`${item.id || item.nombre}-${idx}`}
            className="inline-flex items-baseline font-serif"
            style={{ color, paddingRight: '2.5rem' }}
          >
            <span style={{ fontSize: textSize, lineHeight: 1 }}>{item.nombre}</span>
            <span
              style={{
                marginLeft: '1rem',
                fontSize: priceSize,
                color: '#5DCAA5',
                lineHeight: 1,
              }}
            >
              {formatPrecio(item.precio)}
            </span>
            <span
              style={{
                marginLeft: '2.5rem',
                opacity: 0.2,
                fontSize: textSize,
                lineHeight: 1,
              }}
              aria-hidden
            >
              ·
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}

export default function CartaVivaMarquee({
  fila1,
  fila2,
}: {
  fila1: MenuItem[]
  fila2: MenuItem[]
}) {
  return (
    <div>
      <style>{`
        @keyframes ct-marquee-left {
          0% { transform: translateX(0) }
          100% { transform: translateX(-50%) }
        }
        @keyframes ct-marquee-right {
          0% { transform: translateX(-50%) }
          100% { transform: translateX(0) }
        }
        @media (prefers-reduced-motion: reduce) {
          .ct-marquee-row { animation: none !important; transform: translateX(0) !important; }
        }
      `}</style>
      <Row
        items={fila1}
        italic={false}
        textSize="clamp(36px, 6vw, 64px)"
        priceSize="clamp(24px, 3vw, 32px)"
        color="rgba(255,255,255,0.7)"
        duration={30}
        direction="left"
      />
      <div style={{ marginTop: 16 }}>
        <Row
          items={fila2}
          italic
          textSize="clamp(24px, 4.5vw, 48px)"
          priceSize="clamp(18px, 2.2vw, 24px)"
          color="rgba(255,255,255,0.5)"
          duration={40}
          direction="right"
        />
      </div>
    </div>
  )
}

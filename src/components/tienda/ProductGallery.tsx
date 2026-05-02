'use client'

import { useState } from 'react'
import type { ProductoImagen } from '@/lib/tienda/types'

const TURQUESA = '#2C5F5D'

interface Props {
  imagenes: ProductoImagen[]
  nombre: string
  marca: string | null
}

function PlaceholderGrande({ marca, nombre }: { marca: string | null; nombre: string }) {
  const inicial = (marca ?? nombre).charAt(0).toUpperCase()
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${TURQUESA} 0%, #3D7E7C 50%, ${TURQUESA} 100%)`,
      }}
    >
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)',
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-white">
        <span className="font-serif text-[10rem] leading-none font-light mb-4 opacity-90">{inicial}</span>
        {marca && (
          <span className="text-sm uppercase tracking-[0.4em] opacity-70">{marca}</span>
        )}
      </div>
    </div>
  )
}

export default function ProductGallery({ imagenes, nombre, marca }: Props) {
  const [idx, setIdx] = useState(0)
  const actual = imagenes[idx]

  if (imagenes.length === 0) {
    return (
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100">
        <PlaceholderGrande marca={marca} nombre={nombre} />
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="relative aspect-square rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/70">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={actual.url}
          alt={actual.alt_text ?? nombre}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </div>

      {imagenes.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {imagenes.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setIdx(i)}
              className={`relative aspect-square rounded-xl overflow-hidden border-2 transition-all ${
                i === idx
                  ? 'border-[#2C5F5D] ring-2 ring-[#2C5F5D]/20'
                  : 'border-neutral-200 hover:border-neutral-400'
              }`}
              aria-label={`Ver imagen ${i + 1}`}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt={img.alt_text ?? `${nombre} - ${i + 1}`}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

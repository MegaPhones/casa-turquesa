'use client'

import { useState } from 'react'
import AddToCartButton from './AddToCartButton'
import type { ProductoVariante, ProductoImagen } from '@/lib/tienda/types'

interface Props {
  variantes: ProductoVariante[]
  productoId: string
  productoNombre: string
  productoMarca: string | null
  productoSlug: string
  imagenes: ProductoImagen[]
}

function formatearPrecio(n: number): string {
  if (n === 0) return 'Consultar'
  return '$' + Math.round(n).toLocaleString('es-CL')
}

function obtenerLabelVariante(v: ProductoVariante): string {
  if (v.nombre_variante) return v.nombre_variante
  if (v.atributos && typeof v.atributos === 'object') {
    const valores = Object.values(v.atributos as Record<string, unknown>)
      .filter(x => typeof x === 'string' || typeof x === 'number')
      .map(x => String(x))
    if (valores.length > 0) return valores.join(' · ')
  }
  return v.sku
}

export default function VariantSelector({
  variantes,
  productoId,
  productoNombre,
  productoMarca,
  productoSlug,
  imagenes,
}: Props) {
  const variantesValidas = variantes.filter(v => v.precio > 0)
  const [varianteId, setVarianteId] = useState<string>(
    variantesValidas.find(v => v.es_default)?.id ?? variantesValidas[0]?.id ?? ''
  )
  const [cantidad, setCantidad] = useState(1)

  const variante = variantesValidas.find(v => v.id === varianteId) ?? variantesValidas[0]

  if (!variante) {
    return (
      <div className="space-y-4">
        <div className="text-2xl text-neutral-400">Producto sin precio configurado</div>
        <a
          href={`https://wa.me/56935227488?text=${encodeURIComponent(`Hola Casa Turquesa, me interesa el producto "${productoNombre}"${productoMarca ? ` de ${productoMarca}` : ''} y quería consultar disponibilidad.`)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
        >
          Consultar por WhatsApp
        </a>
      </div>
    )
  }

  const precio = variante.precio_descuento ?? variante.precio
  const tieneDescuento = variante.precio_descuento !== null && variante.precio_descuento < variante.precio
  const stock = variante.stock ?? 0
  const sinStock = !variante.disponible || stock === 0
  const stockBajo = stock > 0 && stock <= 5

  const imagenPrincipal =
    imagenes.find(i => i.es_principal) ??
    imagenes.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))[0] ??
    null

  return (
    <div className="space-y-6">
      <div className="flex items-baseline gap-3 flex-wrap">
        <span className="font-serif text-4xl md:text-5xl font-medium text-[#2C5F5D]">
          {formatearPrecio(precio)}
        </span>
        {tieneDescuento && (
          <span className="text-xl text-neutral-400 line-through font-light">
            {formatearPrecio(variante.precio)}
          </span>
        )}
        {tieneDescuento && (
          <span className="bg-rose-100 text-rose-700 text-xs font-semibold px-2 py-1 rounded">
            -{Math.round(((variante.precio - precio) / variante.precio) * 100)}%
          </span>
        )}
      </div>

      {variantesValidas.length > 1 && (
        <div>
          <h3 className="text-[11px] uppercase tracking-[0.2em] text-neutral-500 mb-3">
            Presentación
          </h3>
          <div className="flex flex-wrap gap-2">
            {variantesValidas.map(v => {
              const isActive = v.id === variante.id
              const vSinStock = !v.disponible || (v.stock ?? 0) === 0
              return (
                <button
                  key={v.id}
                  onClick={() => setVarianteId(v.id)}
                  disabled={vSinStock}
                  className={`px-4 py-2.5 rounded-xl border text-sm transition-all ${
                    isActive
                      ? 'bg-[#2C5F5D] text-white border-[#2C5F5D]'
                      : vSinStock
                      ? 'bg-neutral-100 text-neutral-400 border-neutral-200 cursor-not-allowed line-through'
                      : 'bg-white text-neutral-800 border-neutral-300 hover:border-[#2C5F5D]'
                  }`}
                >
                  {obtenerLabelVariante(v)}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {sinStock ? (
        <div className="inline-flex items-center gap-2 text-sm text-rose-600">
          <span className="w-2 h-2 rounded-full bg-rose-500" />
          Sin stock
        </div>
      ) : stockBajo ? (
        <div className="inline-flex items-center gap-2 text-sm text-amber-700">
          <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
          Quedan solo {stock} disponibles
        </div>
      ) : (
        <div className="inline-flex items-center gap-2 text-sm text-emerald-700">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          En stock
        </div>
      )}

      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <div className="flex items-center border border-neutral-300 rounded-full overflow-hidden bg-white">
          <button
            onClick={() => setCantidad(Math.max(1, cantidad - 1))}
            className="w-11 h-11 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-30"
            disabled={cantidad <= 1 || sinStock}
            aria-label="Disminuir cantidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" /></svg>
          </button>
          <span className="w-12 text-center font-medium text-neutral-900">{cantidad}</span>
          <button
            onClick={() => setCantidad(Math.min(stock || 99, cantidad + 1))}
            className="w-11 h-11 flex items-center justify-center text-neutral-700 hover:bg-neutral-50 disabled:opacity-30"
            disabled={sinStock || (stock > 0 && cantidad >= stock)}
            aria-label="Aumentar cantidad"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
          </button>
        </div>

        <AddToCartButton
          item={{
            productoId,
            varianteId: variante.id,
            nombre: productoNombre,
            marca: productoMarca,
            slug: productoSlug,
            varianteLabel: variantesValidas.length > 1 ? obtenerLabelVariante(variante) : '',
            imagenUrl: imagenPrincipal?.url ?? null,
            precioUnitario: precio,
          }}
          cantidad={cantidad}
          disabled={sinStock}
        />
      </div>

      {!sinStock && (
        <p className="text-xs text-neutral-500 italic">
          ¿Preferís coordinar por WhatsApp?{' '}
          <a
            href={`https://wa.me/56935227488?text=${encodeURIComponent(`Hola Casa Turquesa, me interesa el producto "${productoNombre}"${productoMarca ? ` de ${productoMarca}` : ''}.`)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[#2C5F5D] underline hover:no-underline"
          >
            Escribinos
          </a>.
        </p>
      )}
    </div>
  )
}

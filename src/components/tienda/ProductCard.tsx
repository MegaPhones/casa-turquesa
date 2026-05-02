import Link from 'next/link'
import type { ProductoCompleto } from '@/lib/tienda/types'

const TURQUESA = '#2C5F5D'

function formatearPrecio(min: number, max: number): string {
  if (min === 0 && max === 0) return 'Consultar'
  const fmt = (n: number) => '$' + Math.round(n).toLocaleString('es-CL')
  if (min === max) return fmt(min)
  return `Desde ${fmt(min)}`
}

function PlaceholderImagen({ marca, nombre }: { marca: string | null; nombre: string }) {
  const inicial = (marca ?? nombre).charAt(0).toUpperCase()
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background: `linear-gradient(135deg, ${TURQUESA} 0%, #3D7E7C 50%, ${TURQUESA} 100%)`,
      }}
    >
      <div className="absolute inset-0 opacity-10" style={{
        backgroundImage: 'radial-gradient(circle at 20% 30%, rgba(255,255,255,0.3) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.2) 0%, transparent 50%)',
      }} />
      <div className="relative z-10 flex flex-col items-center justify-center text-white">
        <span className="font-serif text-7xl font-light mb-2 opacity-90">{inicial}</span>
        {marca && <span className="text-xs uppercase tracking-[0.3em] opacity-70">{marca}</span>}
      </div>
    </div>
  )
}

export default function ProductCard({ producto }: { producto: ProductoCompleto }) {
  const img = producto.imagen_principal
  const precio = formatearPrecio(producto.precio_min, producto.precio_max)
  const esBorrador = producto.estado === 'borrador'

  return (
    <Link
      href={`/tienda/${producto.slug}`}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-neutral-200/70 hover:border-[#2C5F5D]/40 hover:shadow-xl transition-all duration-300"
    >
      <div className="relative aspect-square overflow-hidden bg-neutral-100">
        {img ? (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={img.url}
            alt={img.alt_text ?? producto.nombre}
            className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        ) : (
          <PlaceholderImagen marca={producto.marca} nombre={producto.nombre} />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {producto.destacado && (
            <span className="bg-amber-400 text-neutral-900 text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
              Destacado
            </span>
          )}
          {esBorrador && (
            <span className="bg-neutral-900/80 text-white text-[10px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
              Borrador
            </span>
          )}
        </div>

        {/* Tags dietéticos */}
        <div className="absolute top-3 right-3 flex flex-col gap-1 z-10">
          {producto.sin_gluten && (
            <span title="Sin gluten" className="bg-white/95 text-[9px] font-bold text-neutral-700 px-1.5 py-0.5 rounded backdrop-blur-sm">SG</span>
          )}
          {producto.vegano && (
            <span title="Vegano" className="bg-emerald-500/95 text-[9px] font-bold text-white px-1.5 py-0.5 rounded backdrop-blur-sm">V</span>
          )}
        </div>
      </div>

      <div className="flex flex-col flex-1 p-4 sm:p-5">
        {producto.marca && (
          <span className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1.5">{producto.marca}</span>
        )}
        <h3 className="font-serif text-base sm:text-lg leading-tight text-neutral-900 mb-2 line-clamp-2 group-hover:text-[#2C5F5D] transition-colors">
          {producto.nombre}
        </h3>
        {producto.descripcion_corta && (
          <p className="text-xs sm:text-sm text-neutral-600 line-clamp-2 mb-3 flex-1">{producto.descripcion_corta}</p>
        )}
        <div className="mt-auto flex items-end justify-between gap-2">
          <span className="font-serif text-lg sm:text-xl font-medium text-[#2C5F5D]">{precio}</span>
          {producto.peso_neto_gramos && (
            <span className="text-[11px] text-neutral-500">{producto.peso_neto_gramos}g</span>
          )}
        </div>
      </div>
    </Link>
  )
}

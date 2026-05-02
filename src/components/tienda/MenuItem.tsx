import type { ItemCarta } from '@/lib/tienda/queries'

const TURQUESA = '#2C5F5D'

function formatearPrecio(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

interface Props {
  item: ItemCarta
}

export default function MenuItem({ item }: Props) {
  const precio = item.precio_descuento ?? item.precio
  const tieneDescuento = item.precio_descuento !== null && item.precio_descuento < item.precio
  const esBorrador = item.estado === 'borrador'
  const tieneTagsDieteticos = item.sin_gluten || item.vegano || item.vegetariano

  return (
    <article className="group flex gap-4 sm:gap-5 py-5 border-b border-neutral-200/60 last:border-0">
      {item.imagen_url && (
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-xl overflow-hidden bg-neutral-100 flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.imagen_url}
            alt={item.nombre}
            className="absolute inset-0 w-full h-full object-cover"
            loading="lazy"
          />
        </div>
      )}

      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1.5">
          <h3 className="font-serif text-base sm:text-lg text-neutral-900 leading-tight">
            {item.nombre}
            {item.destacado && (
              <span className="ml-2 inline-block text-[10px] uppercase tracking-[0.2em] text-amber-600 font-semibold align-middle">
                ★ Favorito
              </span>
            )}
            {esBorrador && (
              <span className="ml-2 inline-block text-[9px] uppercase tracking-[0.2em] bg-neutral-200 text-neutral-600 px-2 py-0.5 rounded align-middle">
                Borrador
              </span>
            )}
          </h3>

          <span
            className="flex-1 border-b border-dotted border-neutral-300 mb-1 hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex items-baseline gap-2 flex-shrink-0">
            {tieneDescuento && (
              <span className="text-xs text-neutral-400 line-through font-light">
                {formatearPrecio(item.precio)}
              </span>
            )}
            <span className="font-serif text-base sm:text-lg font-medium text-[#2C5F5D] whitespace-nowrap">
              {formatearPrecio(precio)}
            </span>
          </div>
        </div>

        {item.descripcion_corta && (
          <p className="text-sm text-neutral-600 leading-relaxed mb-2 line-clamp-2">
            {item.descripcion_corta}
          </p>
        )}

        {tieneTagsDieteticos && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.sin_gluten && (
              <span
                title="Sin gluten"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full"
              >
                <span className="w-1 h-1 rounded-full bg-amber-500" />
                Sin gluten
              </span>
            )}
            {item.vegano && (
              <span
                title="Vegano"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full"
              >
                <span className="w-1 h-1 rounded-full bg-emerald-500" />
                Vegano
              </span>
            )}
            {item.vegetariano && !item.vegano && (
              <span
                title="Vegetariano"
                className="inline-flex items-center gap-1 text-[10px] font-medium text-lime-700 bg-lime-50 border border-lime-200 px-2 py-0.5 rounded-full"
              >
                <span className="w-1 h-1 rounded-full bg-lime-500" />
                Vegetariano
              </span>
            )}
          </div>
        )}
      </div>
    </article>
  )
}

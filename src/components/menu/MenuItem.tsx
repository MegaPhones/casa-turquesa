import type { MenuItem as MenuItemType } from '@/lib/sheets/menu'

function formatearPrecio(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

interface Props {
  item: MenuItemType
}

export default function MenuItem({ item }: Props) {
  const tieneTagsDieteticos = item.sinGluten || item.vegano || item.vegetariano

  return (
    <article className="group flex gap-4 sm:gap-5 py-5 border-b border-neutral-200/60 last:border-0">
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-3 mb-1.5">
          <h3 className="font-serif text-base sm:text-lg text-neutral-900 leading-tight">
            {item.nombre}
          </h3>

          <span
            className="flex-1 border-b border-dotted border-neutral-300 mb-1 hidden sm:block"
            aria-hidden="true"
          />

          <div className="flex items-baseline gap-2 flex-shrink-0">
            <span className="font-serif text-base sm:text-lg font-medium text-[#2C5F5D] whitespace-nowrap">
              {formatearPrecio(item.precio)}
            </span>
          </div>
        </div>

        {item.descripcion && (
          <p className="text-sm text-neutral-600 leading-relaxed mb-2 line-clamp-2">
            {item.descripcion}
          </p>
        )}

        {tieneTagsDieteticos && (
          <div className="flex items-center gap-1.5 flex-wrap">
            {item.sinGluten && (
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

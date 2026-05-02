import type { ProductoCompleto } from '@/lib/tienda/types'

export default function ProductInfo({ producto }: { producto: ProductoCompleto }) {
  const items: { label: string; value: string | null }[] = [
    { label: 'Marca', value: producto.marca },
    { label: 'Productor', value: producto.productor },
    { label: 'Origen', value: producto.origen },
    { label: 'Material', value: producto.material },
    { label: 'Peso neto', value: producto.peso_neto_gramos ? `${producto.peso_neto_gramos} g` : null },
    { label: 'Dimensiones', value: producto.dimensiones },
    {
      label: 'Vida útil',
      value: producto.vida_util_dias ? `${producto.vida_util_dias} días` : null,
    },
    { label: 'Almacenamiento', value: producto.condiciones_almacenamiento },
    { label: 'SKU', value: producto.sku_base },
  ].filter(i => i.value)

  if (items.length === 0 && !producto.ingredientes && (!producto.alergenos || producto.alergenos.length === 0)) {
    return null
  }

  return (
    <div className="border-t border-neutral-200 pt-8 mt-8 space-y-8">
      {items.length > 0 && (
        <div>
          <h2 className="font-serif text-xl text-neutral-900 mb-4">Detalles</h2>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3 text-sm">
            {items.map(item => (
              <div key={item.label} className="flex justify-between gap-4 border-b border-neutral-100 pb-2">
                <dt className="text-neutral-500">{item.label}</dt>
                <dd className="text-neutral-900 text-right">{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}

      {producto.ingredientes && (
        <div>
          <h2 className="font-serif text-xl text-neutral-900 mb-3">Ingredientes</h2>
          <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
            {producto.ingredientes}
          </p>
        </div>
      )}

      {producto.alergenos && producto.alergenos.length > 0 && (
        <div>
          <h2 className="font-serif text-xl text-neutral-900 mb-3">Alérgenos</h2>
          <div className="flex flex-wrap gap-2">
            {producto.alergenos.map(a => (
              <span
                key={a}
                className="px-3 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs"
              >
                {a}
              </span>
            ))}
          </div>
        </div>
      )}

      {producto.tags && producto.tags.length > 0 && (
        <div>
          <h2 className="font-serif text-xl text-neutral-900 mb-3">Etiquetas</h2>
          <div className="flex flex-wrap gap-2">
            {producto.tags.map(t => (
              <span
                key={t}
                className="px-3 py-1 rounded-full bg-neutral-100 text-neutral-700 text-xs"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

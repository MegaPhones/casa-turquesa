import type { ProductoCompleto } from '@/lib/tienda/types'
import ProductCard from './ProductCard'

export default function ProductGrid({ productos }: { productos: ProductoCompleto[] }) {
  if (productos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mb-4">
          <svg className="w-8 h-8 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0v10l-8 4m8-14L12 11m0 0L4 7m8 4v10" />
          </svg>
        </div>
        <h3 className="font-serif text-xl text-neutral-800 mb-2">No hay productos disponibles</h3>
        <p className="text-sm text-neutral-500 max-w-sm">
          Pronto vamos a estar agregando productos a la tienda.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
      {productos.map(p => (
        <ProductCard key={p.id} producto={p} />
      ))}
    </div>
  )
}

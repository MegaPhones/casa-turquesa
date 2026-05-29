import type { MenuCategoria } from '@/lib/sheets/menu'
import MenuItem from './MenuItem'

interface Props {
  categoria: MenuCategoria
  slug: string
}

function contarItems(categoria: MenuCategoria): number {
  const enSubcats = categoria.subcategorias.reduce((acc, s) => acc + s.items.length, 0)
  return enSubcats + categoria.itemsSinSubcategoria.length
}

export default function MenuSection({ categoria, slug }: Props) {
  const total = contarItems(categoria)

  return (
    <section id={`cat-${slug}`} className="scroll-mt-32 pt-10 first:pt-0">
      <header className="mb-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-2">
          {categoria.nombre}
        </h2>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-8 h-px bg-[#2C5F5D]/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#2C5F5D]">
            {total} {total === 1 ? 'opción' : 'opciones'}
          </span>
          <span className="w-8 h-px bg-[#2C5F5D]/40" />
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/60 px-5 sm:px-8 py-2">
        {categoria.subcategorias.map((sub) => (
          <div key={sub.nombreOriginal} className="pt-4 first:pt-0">
            <h3 className="font-serif text-lg md:text-xl text-[#2C5F5D] tracking-wide pt-2 pb-1 border-b border-[#2C5F5D]/15">
              {sub.nombre}
            </h3>
            {sub.items.map((item) => (
              <MenuItem key={item.id || item.nombre} item={item} />
            ))}
          </div>
        ))}

        {categoria.itemsSinSubcategoria.length > 0 && (
          <div className={categoria.subcategorias.length > 0 ? 'pt-4' : ''}>
            {categoria.itemsSinSubcategoria.map((item) => (
              <MenuItem key={item.id || item.nombre} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

import type { SeccionCarta } from '@/lib/tienda/queries'
import MenuItem from './MenuItem'

interface Props {
  seccion: SeccionCarta
}

export default function MenuSection({ seccion }: Props) {
  return (
    <section
      id={`cat-${seccion.slug}`}
      className="scroll-mt-32 pt-10 first:pt-0"
    >
      <header className="mb-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-2">
          {seccion.nombre}
        </h2>
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="w-8 h-px bg-[#2C5F5D]/40" />
          <span className="text-[10px] uppercase tracking-[0.3em] text-[#2C5F5D]">
            {seccion.items.length} {seccion.items.length === 1 ? 'opción' : 'opciones'}
          </span>
          <span className="w-8 h-px bg-[#2C5F5D]/40" />
        </div>
      </header>

      <div className="bg-white rounded-2xl shadow-sm border border-neutral-200/60 px-5 sm:px-8 py-2">
        {seccion.items.map((item) => (
          <MenuItem key={item.id} item={item} />
        ))}
      </div>
    </section>
  )
}

import { getMenuFromSheet } from '@/lib/sheets/menu'
import type { MenuItem } from '@/lib/sheets/menu'
import CartaVivaMarquee from './CartaVivaMarquee'

const DESTACADOS_FILA_1 = [
  'Brunch Turquesa',
  'Veggie Turquesa',
  'Bombom Turquesa',
  'Tostada Turquesa',
  'Pizza Margarita',
]

const DESTACADOS_FILA_2 = [
  'Matcha Latte',
  'Café Helado',
  'Mocktail Mojito',
  'Waffles Frutos del Bosque',
  'Tiramisú',
]

function findDestacados(items: MenuItem[], destacados: string[]): MenuItem[] {
  return destacados
    .map((d) => {
      const needle = d.toLowerCase()
      const match = items.find((i) => i.nombre.toLowerCase().includes(needle))
      if (!match && process.env.NODE_ENV !== 'production') {
        console.warn(`[CartaViva] Destacado no encontrado en el Sheet: "${d}"`)
      }
      return match
    })
    .filter((i): i is MenuItem => Boolean(i))
}

function ensureMin(items: MenuItem[], pool: MenuItem[], min: number): MenuItem[] {
  if (items.length >= min) return items
  const usedKeys = new Set(items.map((i) => i.id || i.nombre))
  const candidates = pool.filter((i) => !usedKeys.has(i.id || i.nombre))
  const needed = min - items.length
  return [...items, ...candidates.slice(0, needed)]
}

export default async function CartaViva() {
  let categorias: Awaited<ReturnType<typeof getMenuFromSheet>> = []
  try {
    categorias = await getMenuFromSheet()
  } catch {
    /* fallback silencioso: si el Sheet falla la sección no se renderiza */
  }

  const allItems: MenuItem[] = []
  for (const cat of categorias) {
    for (const sub of cat.subcategorias) allItems.push(...sub.items)
    allItems.push(...cat.itemsSinSubcategoria)
  }

  let fila1 = findDestacados(allItems, DESTACADOS_FILA_1)
  let fila2 = findDestacados(allItems, DESTACADOS_FILA_2)

  const usedKeys = new Set([...fila1, ...fila2].map((i) => i.id || i.nombre))
  if (fila1.length < 3) {
    fila1 = ensureMin(fila1, allItems.filter((i) => !usedKeys.has(i.id || i.nombre)), 3)
  }
  if (fila2.length < 3) {
    const fila1Keys = new Set(fila1.map((i) => i.id || i.nombre))
    fila2 = ensureMin(fila2, allItems.filter((i) => !fila1Keys.has(i.id || i.nombre)), 3)
  }

  if (fila1.length === 0 && fila2.length === 0) {
    return null
  }

  return (
    <section
      style={{ backgroundColor: '#1a1a1a' }}
      className="text-white py-20 md:py-[120px] overflow-hidden"
    >
      <div className="px-5 md:px-12 mb-12 md:mb-16 max-w-7xl mx-auto">
        <p
          className="text-[11px] uppercase font-medium mb-4"
          style={{ color: '#5DCAA5', letterSpacing: '4px' }}
        >
          Nuestra carta
        </p>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 md:gap-8">
          <h2
            className="font-serif text-white m-0 text-[36px] md:text-[56px]"
            style={{ lineHeight: 1, letterSpacing: '-2px' }}
          >
            Lo que se está sirviendo hoy.
          </h2>
          <a
            href="/menu"
            className="inline-block text-[12px] uppercase font-medium whitespace-nowrap pb-1"
            style={{
              color: '#5DCAA5',
              letterSpacing: '2px',
              borderBottom: '1px solid #5DCAA5',
            }}
          >
            Ver carta completa →
          </a>
        </div>
      </div>

      <CartaVivaMarquee fila1={fila1} fila2={fila2} />
    </section>
  )
}

import Papa from 'papaparse'
import { unstable_cache } from 'next/cache'

export type MenuItem = {
  id: string
  nombre: string
  descripcion: string
  precio: number
  sinGluten: boolean
  vegano: boolean
  vegetariano: boolean
}

export type MenuSubcategoria = {
  nombre: string
  nombreOriginal: string
  items: MenuItem[]
}

export type MenuCategoria = {
  nombre: string
  subcategorias: MenuSubcategoria[]
  itemsSinSubcategoria: MenuItem[]
}

const SHEET_CSV_URL =
  'https://docs.google.com/spreadsheets/d/1K-h5cq0tRCVb6rxkHSpux9V98B5CiDwpW6Cjz-sSNB4/export?format=csv&gid=527627643'

const CATEGORIAS_PERMITIDAS = [
  'Almuerzo (12:00 a 16:00hrs).',
  'Promociones',
  'Salado',
  'Dulce',
  'Líquidos Fríos',
  'Líquidos Calientes',
  'Snacks dulces',
  'Helados',
] as const

type CategoriaPermitida = (typeof CATEGORIAS_PERMITIDAS)[number]

async function fetchMenuFromSheet(): Promise<MenuCategoria[]> {
  const res = await fetch(SHEET_CSV_URL, { next: { revalidate: 300 } })
  if (!res.ok) throw new Error(`Sheet fetch failed: ${res.status}`)
  const csv = await res.text()

  const parsed = Papa.parse<Record<string, string>>(csv, {
    header: true,
    skipEmptyLines: true,
  })

  const items = parsed.data
    .filter((row) => {
      const categoria = row['Categoría']?.trim()
      const activo = row['Activo']?.trim()
      const precioRaw = row['Precio']?.trim().replace(/[^\d]/g, '')
      const precio = parseInt(precioRaw || '0', 10)
      const nombre = row['Nombre']?.trim()
      return (
        CATEGORIAS_PERMITIDAS.includes(categoria as CategoriaPermitida) &&
        activo === 'SI' &&
        precio > 0 &&
        !!nombre
      )
    })
    .map((row) => ({
      id: row['ID']?.trim() || '',
      categoria: row['Categoría']?.trim() || '',
      subcategoria: row['Subcategoría']?.trim() || '',
      nombre: row['Nombre']?.trim() || '',
      descripcion: row['Descripción']?.trim() || '',
      precio: parseInt(row['Precio']?.trim().replace(/[^\d]/g, '') || '0', 10),
      sinGluten: row['sin_gluten']?.trim().toLowerCase() === 'si',
      vegano: row['vegano']?.trim().toLowerCase() === 'si',
      vegetariano: row['vegetariano']?.trim().toLowerCase() === 'si',
    }))

  return CATEGORIAS_PERMITIDAS.map((catNombre) => {
    const itemsCat = items.filter((i) => i.categoria === catNombre)
    const subcatsMap = new Map<string, MenuItem[]>()
    const itemsSinSubcat: MenuItem[] = []

    for (const item of itemsCat) {
      const menuItem: MenuItem = {
        id: item.id,
        nombre: item.nombre,
        descripcion: item.descripcion,
        precio: item.precio,
        sinGluten: item.sinGluten,
        vegano: item.vegano,
        vegetariano: item.vegetariano,
      }
      if (item.subcategoria) {
        if (!subcatsMap.has(item.subcategoria)) subcatsMap.set(item.subcategoria, [])
        subcatsMap.get(item.subcategoria)!.push(menuItem)
      } else {
        itemsSinSubcat.push(menuItem)
      }
    }

    const subcategorias: MenuSubcategoria[] = Array.from(subcatsMap.entries())
      .sort(([a], [b]) => a.localeCompare(b, 'es', { numeric: true }))
      .map(([nombreOriginal, items]) => ({
        nombreOriginal,
        nombre: nombreOriginal.replace(/^\d+\.\s+/, ''),
        items: items.sort((x, y) => x.nombre.localeCompare(y.nombre, 'es')),
      }))

    return {
      nombre: catNombre,
      subcategorias,
      itemsSinSubcategoria: itemsSinSubcat.sort((x, y) =>
        x.nombre.localeCompare(y.nombre, 'es'),
      ),
    }
  })
}

export const getMenuFromSheet = unstable_cache(
  fetchMenuFromSheet,
  ['casa-turquesa-menu-sheet'],
  { revalidate: 300, tags: ['menu-sheet'] },
)

export function categoriaSlug(nombre: string): string {
  return nombre
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}

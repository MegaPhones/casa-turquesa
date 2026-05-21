import { supabasePublic, supabaseAdmin } from '@/lib/supabase-server'
import type { Producto, ProductoCompleto, Categoria, ProductoVariante, ProductoImagen, EstadoProducto } from './types'

const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

function getClient() {
  return SHOW_DRAFTS ? supabaseAdmin : supabasePublic
}

function calcularDerivados(p: Producto, variantes: ProductoVariante[], imagenes: ProductoImagen[]) {
  const precios = variantes.map(v => v.precio_descuento ?? v.precio).filter(n => n > 0)
  const precio_min = precios.length ? Math.min(...precios) : 0
  const precio_max = precios.length ? Math.max(...precios) : 0
  const imagen_principal =
    imagenes.find(i => i.es_principal) ??
    imagenes.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))[0] ??
    null
  const marcas = new Set<string>()
  if (p.marca) marcas.add(p.marca)
  return {
    precio_min,
    precio_max,
    imagen_principal,
    tiene_imagen: imagenes.length > 0,
    marcas_detectadas: Array.from(marcas),
  }
}

export interface FiltrosTienda {
  tipo?: 'tienda' | 'carta'
  categoriaSlug?: string
  marca?: string
  busqueda?: string
  sinGluten?: boolean
  vegano?: boolean
  vegetariano?: boolean
  destacadosPrimero?: boolean
  limit?: number
  offset?: number
}

export async function getCategorias(tipo?: 'tienda' | 'carta'): Promise<Categoria[]> {
  let query = getClient()
    .from('categorias')
    .select('*')
    .eq('activa', true)

  // Filtrar por tipo: incluye también las marcadas como 'ambos'
  if (tipo) {
    query = query.in('tipo', [tipo, 'ambos'])
  }

  const { data, error } = await query
    .order('orden', { ascending: true, nullsFirst: false })
    .order('nombre', { ascending: true })

  if (error) {
    console.error('[getCategorias] error:', error)
    return []
  }
  return (data ?? []) as Categoria[]
}

export async function getMarcas(tipo: 'tienda' | 'carta' = 'tienda'): Promise<{ marca: string; count: number }[]> {
  const client = getClient()
  let query = client.from('productos').select('marca').eq('tipo_producto', tipo).not('marca', 'is', null)
  if (!SHOW_DRAFTS) query = query.eq('estado', 'publicado')

  const { data } = await query
  if (!data) return []
  const counts = new Map<string, number>()
  data.forEach((r: { marca: string | null }) => {
    if (r.marca && r.marca.trim()) {
      const m = r.marca.trim()
      counts.set(m, (counts.get(m) ?? 0) + 1)
    }
  })
  return Array.from(counts.entries())
    .map(([marca, count]) => ({ marca, count }))
    .sort((a, b) => b.count - a.count)
}

export async function getProductos(opts: FiltrosTienda = {}): Promise<{ productos: ProductoCompleto[]; total: number }> {
  const client = getClient()
  const tipo = opts.tipo ?? 'tienda'
  const limit = opts.limit ?? 60
  const offset = opts.offset ?? 0

  let query = client
    .from('productos')
    .select('*, categoria:categoria_id(id, nombre, slug)', { count: 'exact' })
    .eq('tipo_producto', tipo)

  if (!SHOW_DRAFTS) {
    query = query.eq('estado', 'publicado')
  }

  if (opts.categoriaSlug) {
    const { data: cat } = await client
      .from('categorias')
      .select('id')
      .eq('slug', opts.categoriaSlug)
      .single()
    if (cat) {
      query = query.eq('categoria_id', cat.id)
    }
  }

  if (opts.marca) {
    query = query.eq('marca', opts.marca)
  }

  if (opts.sinGluten) query = query.eq('sin_gluten', true)
  if (opts.vegano) query = query.eq('vegano', true)
  if (opts.vegetariano) query = query.eq('vegetariano', true)

  if (opts.busqueda && opts.busqueda.trim()) {
    const term = opts.busqueda.trim().replace(/[%_]/g, '\\$&')
    query = query.or(`nombre.ilike.%${term}%,descripcion_corta.ilike.%${term}%,marca.ilike.%${term}%`)
  }

  query = query
    .order('destacado', { ascending: false })
    .order('nombre', { ascending: true })
    .range(offset, offset + limit - 1)

  const { data: productos, error, count } = await query
  if (error || !productos) {
    console.error('[getProductos] error:', error)
    return { productos: [], total: 0 }
  }
  if (productos.length === 0) {
    return { productos: [], total: count ?? 0 }
  }

  const ids = productos.map((p: Producto) => p.id)

  const [{ data: variantes }, { data: imagenes }] = await Promise.all([
    client.from('producto_variantes').select('*').in('producto_id', ids).order('es_default', { ascending: false }),
    client.from('producto_imagenes').select('*').in('producto_id', ids).order('orden', { ascending: true }),
  ])

  const variantesPorProducto = new Map<string, ProductoVariante[]>()
  ;(variantes ?? []).forEach((v: ProductoVariante) => {
    const arr = variantesPorProducto.get(v.producto_id) ?? []
    arr.push(v)
    variantesPorProducto.set(v.producto_id, arr)
  })

  const imagenesPorProducto = new Map<string, ProductoImagen[]>()
  ;(imagenes ?? []).forEach((i: ProductoImagen) => {
    const arr = imagenesPorProducto.get(i.producto_id) ?? []
    arr.push(i)
    imagenesPorProducto.set(i.producto_id, arr)
  })

  const completos: ProductoCompleto[] = productos.map((p: Producto & { categoria: ProductoCompleto['categoria'] }) => {
    const vs = variantesPorProducto.get(p.id) ?? []
    const ims = imagenesPorProducto.get(p.id) ?? []
    const derivados = calcularDerivados(p, vs, ims)
    return {
      ...p,
      categoria: p.categoria,
      variantes: vs,
      imagenes: ims,
      ...derivados,
    }
  })

  completos.sort((a, b) => {
    if (a.destacado !== b.destacado) return a.destacado ? -1 : 1
    if (a.tiene_imagen !== b.tiene_imagen) return a.tiene_imagen ? -1 : 1
    return a.nombre.localeCompare(b.nombre, 'es')
  })

  return { productos: completos, total: count ?? 0 }
}

// ────────────────────────────────────────────────────────────
// Funciones para detalle de producto (Fase 3)
// ────────────────────────────────────────────────────────────

export async function getProductoBySlug(slug: string): Promise<ProductoCompleto | null> {
  const client = getClient()

  let query = client
    .from('productos')
    .select('*, categoria:categoria_id(id, nombre, slug)')
    .eq('slug', slug)

  if (!SHOW_DRAFTS) {
    query = query.eq('estado', 'publicado')
  }

  const { data: producto, error } = await query.maybeSingle()

  if (error || !producto) {
    if (error) console.error('[getProductoBySlug] error:', error)
    return null
  }

  const [{ data: variantes }, { data: imagenes }] = await Promise.all([
    client
      .from('producto_variantes')
      .select('*')
      .eq('producto_id', producto.id)
      .order('es_default', { ascending: false })
      .order('orden', { ascending: true, nullsFirst: false }),
    client
      .from('producto_imagenes')
      .select('*')
      .eq('producto_id', producto.id)
      .order('es_principal', { ascending: false })
      .order('orden', { ascending: true, nullsFirst: false }),
  ])

  const vs = (variantes ?? []) as ProductoVariante[]
  const ims = (imagenes ?? []) as ProductoImagen[]
  const derivados = calcularDerivados(producto as Producto, vs, ims)

  return {
    ...(producto as Producto),
    categoria: (producto as Producto & { categoria: ProductoCompleto['categoria'] }).categoria,
    variantes: vs,
    imagenes: ims,
    ...derivados,
  }
}

export async function getRelacionados(opts: {
  categoriaId: string | null
  excluirId: string
  limit?: number
}): Promise<ProductoCompleto[]> {
  if (!opts.categoriaId) return []
  const { productos } = await getProductos({
    tipo: 'tienda',
    limit: (opts.limit ?? 4) + 1,
  })
  const filtrados = productos.filter(
    p => p.categoria_id === opts.categoriaId && p.id !== opts.excluirId
  )
  return filtrados.slice(0, opts.limit ?? 4)
}

// ────────────────────────────────────────────────────────────
// Funciones para la carta /menu (Fase 6)
// ────────────────────────────────────────────────────────────

export interface ItemCarta {
  id: string
  nombre: string
  slug: string
  descripcion_corta: string | null
  descripcion_larga: string | null
  precio: number
  precio_descuento: number | null
  imagen_url: string | null
  destacado: boolean
  sin_gluten: boolean | null
  vegano: boolean | null
  vegetariano: boolean | null
  marca: string | null
  categoria_id: string | null
  categoria_nombre: string | null
  categoria_slug: string | null
  categoria_orden: number | null
  estado: EstadoProducto
}

export interface SeccionCarta {
  categoriaId: string
  nombre: string
  slug: string
  orden: number
  items: ItemCarta[]
}

export async function getCarta(): Promise<SeccionCarta[]> {
  const client = getClient()

  let query = client
    .from('productos')
    .select(
      `id, nombre, slug, descripcion_corta, descripcion_larga, destacado,
       sin_gluten, vegano, vegetariano, marca, categoria_id, estado,
       categoria:categoria_id(id, nombre, slug, orden, activa),
       variantes:producto_variantes(precio, precio_descuento, es_default, orden, disponible),
       imagenes:producto_imagenes(url, es_principal, orden)`
    )
    .eq('tipo_producto', 'carta')

  if (!SHOW_DRAFTS) {
    query = query.eq('estado', 'publicado')
  }

  query = query.order('destacado', { ascending: false }).order('nombre', { ascending: true })

  const { data, error } = await query

  if (error || !data) {
    console.error('[getCarta] error:', error)
    return []
  }

  const seccionesMap = new Map<string, SeccionCarta>()
  const SIN_CATEGORIA_ID = '__sin_categoria__'

  type CartaCategoriaRow = { id: string; nombre: string; slug: string; orden: number | null; activa: boolean } | null
  type CartaVarianteRow = { precio: number; precio_descuento: number | null; es_default: boolean; orden: number | null; disponible: boolean }
  type CartaImagenRow = { url: string; es_principal: boolean; orden: number | null }
  type CartaRow = {
    id: string
    nombre: string
    slug: string
    descripcion_corta: string | null
    descripcion_larga: string | null
    destacado: boolean
    sin_gluten: boolean | null
    vegano: boolean | null
    vegetariano: boolean | null
    marca: string | null
    categoria_id: string | null
    estado: EstadoProducto
    categoria: CartaCategoriaRow
    variantes: CartaVarianteRow[] | null
    imagenes: CartaImagenRow[] | null
  }

  ;(data as unknown as CartaRow[]).forEach((row) => {
    const cat = row.categoria
    if (cat && cat.activa === false) return

    const variantes: CartaVarianteRow[] = Array.isArray(row.variantes) ? row.variantes : []
    const variante =
      variantes.find((v) => v.es_default && v.precio > 0) ??
      variantes.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))[0]

    if (!variante || variante.precio <= 0) return

    const imagenes: CartaImagenRow[] = Array.isArray(row.imagenes) ? row.imagenes : []
    const imagen =
      imagenes.find((i) => i.es_principal) ??
      imagenes.sort((a, b) => (a.orden ?? 999) - (b.orden ?? 999))[0]

    const item: ItemCarta = {
      id: row.id,
      nombre: row.nombre,
      slug: row.slug,
      descripcion_corta: row.descripcion_corta,
      descripcion_larga: row.descripcion_larga,
      precio: variante.precio,
      precio_descuento: variante.precio_descuento ?? null,
      imagen_url: imagen?.url ?? null,
      destacado: row.destacado,
      sin_gluten: row.sin_gluten,
      vegano: row.vegano,
      vegetariano: row.vegetariano,
      marca: row.marca,
      categoria_id: cat?.id ?? null,
      categoria_nombre: cat?.nombre ?? null,
      categoria_slug: cat?.slug ?? null,
      categoria_orden: cat?.orden ?? null,
      estado: row.estado,
    }

    const key = cat?.id ?? SIN_CATEGORIA_ID
    let seccion = seccionesMap.get(key)
    if (!seccion) {
      seccion = {
        categoriaId: key,
        nombre: cat?.nombre ?? 'Otros',
        slug: cat?.slug ?? 'otros',
        orden: cat?.orden ?? 9999,
        items: [],
      }
      seccionesMap.set(key, seccion)
    }
    seccion.items.push(item)
  })

  return Array.from(seccionesMap.values()).sort((a, b) => {
    if (a.orden !== b.orden) return a.orden - b.orden
    return a.nombre.localeCompare(b.nombre, 'es')
  })
}

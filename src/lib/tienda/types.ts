// Tipos TypeScript que reflejan el schema real de Supabase
// Tablas: productos, producto_variantes, producto_imagenes, categorias

export type EstadoProducto = 'borrador' | 'publicado'
export type TipoProducto = 'tienda' | 'carta'

export interface Categoria {
  id: string
  nombre: string
  slug: string
  descripcion: string | null
  parent_id: string | null
  imagen_url: string | null
  orden: number | null
  activa: boolean
  created_at: string
  updated_at: string
}

export interface ProductoImagen {
  id: string
  producto_id: string
  variante_id: string | null
  url: string
  alt_text: string | null
  orden: number | null
  es_principal: boolean
  created_at: string
}

export interface ProductoVariante {
  id: string
  producto_id: string
  sku: string
  nombre_variante: string | null
  atributos: Record<string, unknown> | null
  precio: number
  precio_descuento: number | null
  stock: number
  stock_minimo: number | null
  disponible: boolean
  es_default: boolean
  orden: number | null
  created_at: string
  updated_at: string
}

export interface Producto {
  id: string
  sku_base: string
  nombre: string
  slug: string
  descripcion_corta: string | null
  descripcion_larga: string | null
  categoria_id: string | null
  tags: string[] | null
  marca: string | null
  productor: string | null
  origen: string | null
  material: string | null
  es_alimento: boolean | null
  ingredientes: string | null
  alergenos: string[] | null
  info_nutricional: Record<string, unknown> | null
  vida_util_dias: number | null
  condiciones_almacenamiento: string | null
  dimensiones: string | null
  peso_gramos: number | null
  peso_neto_gramos: number | null
  meta_titulo: string | null
  meta_descripcion: string | null
  destacado: boolean
  estado: EstadoProducto
  tipo_producto: TipoProducto
  sin_gluten: boolean | null
  vegano: boolean | null
  vegetariano: boolean | null
  id_fudo: string | null
  codigo_barra: string | null
  created_at: string
  updated_at: string
}

// Tipo combinado: producto con sus relaciones (lo que necesitamos para mostrar en grid)
export interface ProductoCompleto extends Producto {
  categoria: Pick<Categoria, 'id' | 'nombre' | 'slug'> | null
  variantes: ProductoVariante[]
  imagenes: ProductoImagen[]
  // Helpers calculados
  precio_min: number
  precio_max: number
  imagen_principal: ProductoImagen | null
  tiene_imagen: boolean
  marcas_detectadas: string[]
}

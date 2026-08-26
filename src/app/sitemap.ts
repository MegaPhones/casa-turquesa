import type { MetadataRoute } from 'next'
import { supabasePublic, supabaseAdmin } from '@/lib/supabase-server'
import { SITE_URL } from '@/lib/business-info'

const SHOW_DRAFTS = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

function client() {
  return SHOW_DRAFTS ? supabaseAdmin : supabasePublic
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}`, lastModified: now, changeFrequency: 'daily', priority: 1.0 },
    { url: `${SITE_URL}/tienda`, lastModified: now, changeFrequency: 'daily', priority: 0.9 },
    { url: `${SITE_URL}/menu`, lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/politica-privacidad`, lastModified: now, changeFrequency: 'yearly', priority: 0.3 },
  ]

  // Productos publicados (filtramos por estado='publicado' para producción)
  let productosQ = client()
    .from('productos')
    .select('slug, updated_at, tipo_producto')
    .limit(2000)
  if (!SHOW_DRAFTS) productosQ = productosQ.eq('estado', 'publicado')

  const { data: productos } = await productosQ

  const productPages: MetadataRoute.Sitemap = (productos ?? [])
    .filter((p: { slug: string; tipo_producto?: string }) => p.slug && p.tipo_producto === 'tienda')
    .map((p: { slug: string; updated_at: string }) => ({
      url: `${SITE_URL}/tienda/${p.slug}`,
      lastModified: p.updated_at ? new Date(p.updated_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))

  // Categorías de tienda — URLs con query param (no creamos ruta /tienda/categoria/[slug] nueva)
  const { data: categorias } = await client()
    .from('categorias')
    .select('slug, updated_at, tipo, activa')
    .eq('activa', true)

  const categoryPages: MetadataRoute.Sitemap = (categorias ?? [])
    .filter((c: { tipo: string | null; slug: string }) => c.slug && (c.tipo === 'tienda' || c.tipo === 'ambos'))
    .map((c: { slug: string; updated_at: string }) => ({
      url: `${SITE_URL}/tienda?categoria=${c.slug}`,
      lastModified: c.updated_at ? new Date(c.updated_at) : now,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

  return [...staticPages, ...categoryPages, ...productPages]
}

import { createClient } from '@supabase/supabase-js'

// Defaults seguros para que `next build` no rompa cuando las server-only vars
// no están presentes (Docker build sólo pasa las NEXT_PUBLIC_*). En runtime
// Easypanel inyecta las reales y los clients quedan correctamente configurados.
const url = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-anon-key'
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || 'placeholder-service-key'

export const supabaseAdmin = createClient(url, serviceKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

export const supabasePublic = createClient(url, anonKey, {
  auth: { persistSession: false, autoRefreshToken: false },
})

export type CTConfigKey = 'general' | 'instagram' | 'products' | 'workshops'

export interface GeneralConfig {
  hero_title?: string
  hero_subtitle?: string
  hours_weekday?: string
  hours_saturday?: string
  hours_sunday?: string
  address?: string
  phone?: string
  email?: string
}

export interface InstagramConfig {
  followers?: string
  posts?: string
  following?: string
}

export interface Product {
  id: string
  name: string
  price: string
  category: 'Bebidas' | 'Tostadas' | 'Bowls' | 'Tienda'
  description?: string
  badge?: 'Favorito' | 'Nuevo' | 'Exclusivo' | ''
  image?: string
}

export interface Workshop {
  id: string
  name: string
  description?: string
  price: string
  duration: string
  capacity: number
  image?: string
}

export async function getPublicConfig() {
  const { data, error } = await supabasePublic
    .from('ct_config')
    .select('key, value')
  if (error || !data) return {}
  return Object.fromEntries(data.map(r => [r.key, r.value])) as {
    general?: GeneralConfig
    instagram?: InstagramConfig
    products?: Product[]
    workshops?: Workshop[]
  }
}

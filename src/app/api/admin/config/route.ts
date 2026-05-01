import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { ADMIN_COOKIE, verifyToken } from '@/lib/admin-session'
import { supabaseAdmin } from '@/lib/supabase-server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

function requireAuth() {
  const token = cookies().get(ADMIN_COOKIE)?.value
  return verifyToken(token)
}

export async function GET() {
  if (!requireAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const { data, error } = await supabaseAdmin
    .from('ct_config')
    .select('key, value, updated_at')
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  const out = Object.fromEntries((data ?? []).map(r => [r.key, r.value]))
  return NextResponse.json({ data: out })
}

export async function PUT(req: NextRequest) {
  if (!requireAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  }
  const body = await req.json().catch(() => null) as { key?: string; value?: unknown } | null
  if (!body || !body.key || typeof body.value === 'undefined') {
    return NextResponse.json({ error: 'Body inválido' }, { status: 400 })
  }
  const allowed = new Set(['general', 'instagram', 'products', 'workshops'])
  if (!allowed.has(body.key)) {
    return NextResponse.json({ error: 'Key no permitida' }, { status: 400 })
  }
  const { error } = await supabaseAdmin
    .from('ct_config')
    .upsert({ key: body.key, value: body.value }, { onConflict: 'key' })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
  return NextResponse.json({ ok: true })
}

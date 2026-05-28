import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const FALLBACK_REPLY =
  'Estoy teniendo problemas técnicos. Por favor escríbenos al WhatsApp +56 9 3499 0617.'

const RATE_LIMIT_MAX = 20
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000
const N8N_TIMEOUT_MS = 30_000

const rateLimitStore = new Map<string, number[]>()

function checkRateLimit(sessionId: string): boolean {
  const now = Date.now()
  const cutoff = now - RATE_LIMIT_WINDOW_MS
  const timestamps = (rateLimitStore.get(sessionId) ?? []).filter(t => t > cutoff)
  if (timestamps.length >= RATE_LIMIT_MAX) {
    rateLimitStore.set(sessionId, timestamps)
    return false
  }
  timestamps.push(now)
  rateLimitStore.set(sessionId, timestamps)
  return true
}

export async function POST(req: NextRequest) {
  const webhookUrl = process.env.N8N_CHAT_WEBHOOK_URL
  if (!webhookUrl) {
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 500 })
  }

  let body: { message?: unknown; sessionId?: unknown }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 400 })
  }

  const message = typeof body.message === 'string' ? body.message.trim() : ''
  if (!message) {
    return NextResponse.json({ reply: FALLBACK_REPLY }, { status: 400 })
  }

  const sessionId =
    typeof body.sessionId === 'string' && body.sessionId.trim()
      ? body.sessionId.trim()
      : crypto.randomUUID()

  if (!checkRateLimit(sessionId)) {
    return NextResponse.json(
      {
        sessionId,
        reply:
          'Has enviado muchos mensajes seguidos. Esperá unos minutos o escribinos al WhatsApp +56 9 3499 0617.',
      },
      { status: 429 },
    )
  }

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), N8N_TIMEOUT_MS)

  try {
    const res = await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message, sessionId }),
      signal: controller.signal,
      cache: 'no-store',
    })
    clearTimeout(timeout)

    if (!res.ok) {
      return NextResponse.json({ sessionId, reply: FALLBACK_REPLY }, { status: 200 })
    }

    const data = (await res.json()) as {
      success?: boolean
      reply?: string
      sessionId?: string
    }

    if (data.success !== true || !data.reply) {
      return NextResponse.json({ sessionId, reply: FALLBACK_REPLY }, { status: 200 })
    }

    return NextResponse.json({ sessionId, reply: data.reply }, { status: 200 })
  } catch {
    clearTimeout(timeout)
    return NextResponse.json({ sessionId, reply: FALLBACK_REPLY }, { status: 200 })
  }
}

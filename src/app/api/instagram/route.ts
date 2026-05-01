import { NextResponse } from 'next/server'

export const revalidate = 3600

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID

  if (!token || !accountId) {
    return NextResponse.json({ error: 'Missing Instagram credentials' }, { status: 500 })
  }

  const res = await fetch(
    `https://graph.facebook.com/v25.0/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&limit=24&access_token=${token}`,
    { next: { revalidate: 3600 } }
  )

  if (!res.ok) {
    const err = await res.text()
    return NextResponse.json({ error: 'Instagram API error', detail: err }, { status: res.status })
  }

  const data = await res.json()
  return NextResponse.json(data)
}

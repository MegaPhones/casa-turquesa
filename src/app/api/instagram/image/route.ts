import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get('url')

  if (!url) {
    return NextResponse.json({ error: 'Missing url parameter' }, { status: 400 })
  }

  let target: URL
  try {
    target = new URL(url)
  } catch {
    return NextResponse.json({ error: 'Invalid url' }, { status: 400 })
  }

  const host = target.hostname
  const allowed =
    host.endsWith('cdninstagram.com') ||
    host.endsWith('fbcdn.net') ||
    host.endsWith('instagram.com')

  if (!allowed) {
    return NextResponse.json({ error: 'Host not allowed' }, { status: 400 })
  }

  const upstream = await fetch(target.toString(), {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36',
      Accept: 'image/avif,image/webp,image/*,*/*;q=0.8',
      Referer: 'https://www.instagram.com/',
    },
    cache: 'no-store',
  })

  if (!upstream.ok || !upstream.body) {
    return NextResponse.json(
      { error: 'Upstream fetch failed', status: upstream.status },
      { status: 502 },
    )
  }

  const contentType = upstream.headers.get('content-type') ?? 'image/jpeg'
  const buffer = Buffer.from(await upstream.arrayBuffer())

  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}

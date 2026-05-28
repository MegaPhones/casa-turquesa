import { NextResponse } from 'next/server'

export const revalidate = 3600

interface IGProfile {
  profile_picture_url?: string
  followers_count?: number
  media_count?: number
  follows_count?: number
}

export async function GET() {
  const token = process.env.INSTAGRAM_TOKEN
  const accountId = process.env.INSTAGRAM_ACCOUNT_ID

  if (!token || !accountId) {
    return NextResponse.json({ error: 'Missing Instagram credentials' }, { status: 500 })
  }

  const mediaUrl = `https://graph.facebook.com/v25.0/${accountId}/media?fields=id,caption,media_type,media_url,thumbnail_url,timestamp,permalink&limit=24&access_token=${token}`
  const profileUrl = `https://graph.facebook.com/v25.0/${accountId}?fields=profile_picture_url,followers_count,media_count,follows_count&access_token=${token}`

  const [mediaRes, profileRes] = await Promise.all([
    fetch(mediaUrl, { next: { revalidate: 3600 } }),
    fetch(profileUrl, { next: { revalidate: 3600 } }),
  ])

  if (!mediaRes.ok) {
    const err = await mediaRes.text()
    return NextResponse.json({ error: 'Instagram API error', detail: err }, { status: mediaRes.status })
  }

  const mediaData = await mediaRes.json()
  let profile: IGProfile | null = null
  if (profileRes.ok) {
    profile = (await profileRes.json()) as IGProfile
  }

  return NextResponse.json({ posts: mediaData.data ?? [], profile })
}

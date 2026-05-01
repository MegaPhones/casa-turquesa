'use client'

import { useEffect, useState } from 'react'

interface IGPost {
  id: string
  caption?: string
  media_type: 'IMAGE' | 'VIDEO' | 'CAROUSEL_ALBUM'
  media_url: string
  thumbnail_url?: string
  timestamp?: string
  permalink: string
}

const manualPosts: IGPost[] = [
  {
    id: 'manual1',
    media_url: '/images/collab1.jpg',
    permalink: 'https://www.instagram.com/p/DWg6D9Mjr1J/',
    media_type: 'IMAGE',
    caption: 'Taller de IA Asistida con Ignacio David – Rubika. Presencial en Casa Turquesa.',
  },
  {
    id: 'manual2',
    media_url: '/images/collab2.jpg',
    permalink: 'https://www.instagram.com/reel/DWH-LvtkfSD/',
    media_type: 'IMAGE',
    caption: 'Matcha en Santiago ☕ Cafeterías que lo tienen en la carta - Parte 2',
  },
  {
    id: 'manual3',
    media_url: '/images/collab3.jpg',
    permalink: 'https://www.instagram.com/reel/DV4anBZiRcd/',
    media_type: 'IMAGE',
    caption: 'Aprende a maquillarte en Casa Turquesa',
  },
  {
    id: 'manual4',
    media_url: '/images/collab4.jpg',
    permalink: 'https://www.instagram.com/reel/DVtONWUjYU3/',
    media_type: 'IMAGE',
    caption: 'Café de especialidad en Casa Turquesa, Av. Ortúzar 250 Ñuñoa',
  },
]

interface InstagramStats {
  followers?: string
  posts?: string
  following?: string
}

export default function InstagramGallery({ stats }: { stats?: InstagramStats } = {}) {
  const [apiPosts, setApiPosts] = useState<IGPost[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    fetch('/api/instagram')
      .then(r => r.json())
      .then(data => {
        if (data.data) setApiPosts(data.data)
        else setError(true)
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false))
  }, [])

  const allPosts: IGPost[] = [
    apiPosts[0],
    manualPosts[0],
    apiPosts[1],
    manualPosts[1],
    apiPosts[3],
    manualPosts[2],
    apiPosts[4],
    manualPosts[3],
    apiPosts[5],
    apiPosts[6],
    apiPosts[7],
    apiPosts[2],
    ...apiPosts.slice(8),
  ].filter(Boolean) as IGPost[]

  return (
    <section style={{ backgroundColor: '#fff', padding: '5rem 3%' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>

        {/* Etiqueta */}
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 10,
          textAlign: 'center',
        }}>
          Redes Sociales
        </p>
        <h2 style={{
          fontFamily: 'Georgia, serif', fontSize: 'clamp(1.6rem, 3vw, 2.4rem)',
          fontWeight: 700, color: '#1a1a1a', marginBottom: '2.5rem', lineHeight: 1.2,
          textAlign: 'center',
        }}>
          Síguenos en Instagram
        </h2>

        {/* ── Perfil ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: '2.5rem',
          marginBottom: '2.5rem', flexWrap: 'wrap',
          padding: '1.5rem', borderRadius: 12,
          backgroundColor: '#fafaf7', border: '1px solid #eee',
        }}>
          {/* Avatar */}
          <div style={{
            width: 120, height: 120, borderRadius: '50%', overflow: 'hidden',
            border: '3px solid #1ABFAA', flexShrink: 0, position: 'relative',
            background: '#fff',
          }}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/CasaTurqueza_Logos__1__page-0001.jpg"
              alt="Casa Turquesa"
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 8, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#1a1a1a' }}>
                Casa Turquesa
              </span>
              <a
                href="https://instagram.com/casaturquesa.cl"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: 14, color: '#1ABFAA', textDecoration: 'none', fontWeight: 600 }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                @casaturquesa.cl
              </a>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '1.75rem', marginBottom: 12, flexWrap: 'wrap' }}>
              {[
                [stats?.posts ?? '388', 'publicaciones'],
                [stats?.followers ?? '10.8K', 'seguidores'],
                [stats?.following ?? '1.526', 'siguiendo'],
              ].map(([n, l]) => (
                <div key={l} style={{ fontSize: 14, color: '#1a1a1a' }}>
                  <strong>{n}</strong> <span style={{ color: '#888' }}>{l}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p style={{ fontSize: 14, color: '#444', lineHeight: 1.6, marginBottom: 14, maxWidth: 460 }}>
              Tostaduria, Cafetería &amp; Tienda de alimentos 🌿 Av Ortúzar 250, Ñuñoa · Lunes a viernes 7:30 a 21:00hrs
            </p>

            {/* Botón seguir */}
            <a
              href="https://instagram.com/casaturquesa.cl"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', fontSize: 12, fontWeight: 700,
                padding: '10px 24px', borderRadius: 100,
                backgroundColor: '#1ABFAA', color: '#fff', textDecoration: 'none',
                letterSpacing: '0.5px', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Seguir en Instagram
            </a>
          </div>
        </div>

        {/* Estados */}
        {loading && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#aaa', fontSize: 14 }}>
            Cargando publicaciones...
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: '#aaa', fontSize: 14 }}>
            No se pudieron cargar las publicaciones.
          </div>
        )}

        {/* Grid */}
        {!loading && !error && allPosts.length > 0 && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 6,
          }} className="ig-real-grid">
            {allPosts.map(post => {
              const raw = post.media_type === 'VIDEO' ? (post.thumbnail_url ?? '') : post.media_url
              const isLocal = raw.startsWith('/')
              const imgSrc = raw ? (isLocal ? raw : `/api/instagram/image?url=${encodeURIComponent(raw)}`) : ''
              return (
                <a
                  key={post.id}
                  href={post.permalink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ig-post"
                  style={{
                    display: 'block',
                    aspectRatio: '1 / 1',
                    borderRadius: 4,
                    overflow: 'hidden',
                    backgroundColor: '#e8e0d8',
                    position: 'relative',
                    textDecoration: 'none',
                  }}
                >
                  {imgSrc && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={imgSrc}
                      alt={post.caption?.slice(0, 80) ?? 'Instagram post'}
                      style={{
                        width: '100%', height: '100%',
                        objectFit: 'cover', display: 'block',
                      }}
                      loading="lazy"
                    />
                  )}

                  {/* Ícono play para VIDEO */}
                  {post.media_type === 'VIDEO' && (
                    <div style={{
                      position: 'absolute', top: 8, right: 8, zIndex: 2,
                      width: 28, height: 28, borderRadius: '50%',
                      backgroundColor: 'rgba(0,0,0,0.55)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                      <svg width="10" height="12" viewBox="0 0 10 12" fill="white">
                        <path d="M0 0L10 6L0 12V0Z" />
                      </svg>
                    </div>
                  )}

                  {/* Ícono carousel */}
                  {post.media_type === 'CAROUSEL_ALBUM' && (
                    <div style={{
                      position: 'absolute', top: 8, right: 8, zIndex: 2,
                      backgroundColor: 'rgba(0,0,0,0.55)', borderRadius: 4,
                      padding: '2px 6px',
                    }}>
                      <svg width="12" height="10" viewBox="0 0 12 10" fill="white">
                        <rect x="0" y="0" width="9" height="9" rx="1.5" fill="none" stroke="white" strokeWidth="1.5" />
                        <rect x="3" y="2.5" width="9" height="9" rx="1.5" fill="none" stroke="white" strokeWidth="1.5" />
                      </svg>
                    </div>
                  )}

                  {/* Hover overlay con caption */}
                  <div className="ig-overlay" style={{ flexDirection: 'column', padding: '0 1rem', textAlign: 'center' }}>
                    {post.caption && (
                      <p style={{
                        color: '#fff', fontSize: 12, lineHeight: 1.5,
                        display: '-webkit-box', WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical', overflow: 'hidden',
                        margin: 0,
                      }}>
                        {post.caption}
                      </p>
                    )}
                  </div>
                </a>
              )
            })}
          </div>
        )}

        {/* CTA */}
        {!loading && !error && allPosts.length > 0 && (
          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <a
              href="https://www.instagram.com/casaturquesa.cl/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', fontSize: 12, fontWeight: 700,
                letterSpacing: '1.5px', textTransform: 'uppercase',
                color: '#1ABFAA', textDecoration: 'none',
                borderBottom: '1.5px solid #1ABFAA', paddingBottom: 2,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
            >
              Ver más en Instagram →
            </a>
          </div>
        )}

      </div>
    </section>
  )
}

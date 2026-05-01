'use client'

import Image from 'next/image'

/* ── Trust Bar ─────────────────────────────────────────────────────────── */
export function TrustBar() {
  const stats = [
    { value: '10.8K', label: 'Seguidores' },
    { value: '388',   label: 'Publicaciones' },
    { value: '2019',  label: 'Desde' },
    { value: '4.9★',  label: 'Valoración' },
  ]
  return (
    <div style={{
      backgroundColor: '#1ABFAA',
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      flexWrap: 'wrap', gap: '0 4rem', padding: '1.25rem 3%',
    }}>
      {stats.map(({ value, label }) => (
        <div key={label} style={{ textAlign: 'center', padding: '0.4rem 0' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, fontWeight: 700, color: '#fff', lineHeight: 1.1 }}>
            {value}
          </div>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.8)', marginTop: 3 }}>
            {label}
          </div>
        </div>
      ))}
    </div>
  )
}

/* ── Data ──────────────────────────────────────────────────────────────── */
const highlights = [
  { label: 'Clientes',   src: '/images/bebidas/latte-rosado.jpg' },
  { label: 'Postula',    src: '/images/postres/torta-merengue.jpg' },
  { label: 'Talleres',   src: '/images/espacios/interior-2.jpg' },
  { label: 'Horarios',   src: '/images/bebidas/flat-white.jpg' },
  { label: 'Ubicación',  src: '/images/espacios/mostrador.jpg' },
  { label: 'Contacto',   src: '/images/bebidas/matcha-verde.jpg' },
]

const photos = [
  { src: '/images/bebidas/latte-rosado.jpg',    alt: 'Latte rosado',    likes: 324, comments: 18,  reel: false },
  { src: '/images/postres/torta-merengue.jpg',  alt: 'Torta merengue',  likes: 198, comments: 12,  reel: true  },
  { src: '/images/tostadas/tostada-palta.jpg',  alt: 'Tostada de palta',likes: 412, comments: 31,  reel: false },
  { src: '/images/postres/torta-citrico.jpg',   alt: 'Torta cítrico',   likes: 287, comments: 9,   reel: true  },
  { src: '/images/espacios/mostrador.jpg',      alt: 'Mostrador',       likes: 156, comments: 7,   reel: false },
  { src: '/images/platos/waffles-banana.jpg',   alt: 'Waffles banana',  likes: 203, comments: 14,  reel: false },
  { src: '/images/bebidas/matcha-verde.jpg',    alt: 'Matcha verde',    likes: 341, comments: 22,  reel: true  },
  { src: '/images/postres/torta-berries.jpg',   alt: 'Torta berries',   likes: 178, comments: 8,   reel: false },
]

/* ── Instagram Section ─────────────────────────────────────────────────── */
export default function InstagramSection() {
  return (
    <section id="galeria" style={{ backgroundColor: '#FAF7F2', padding: '3rem 3%' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>

        {/* Label */}
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 8,
        }}>
          Instagram
        </p>

        {/* ── Perfil ─────────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', alignItems: 'flex-start', gap: '2rem',
          marginBottom: '2rem', flexWrap: 'wrap',
        }}>
          {/* Avatar */}
          <div style={{
            width: 88, height: 88, borderRadius: '50%', overflow: 'hidden',
            border: '3px solid #1ABFAA', flexShrink: 0, position: 'relative',
          }}>
            <Image src="/images/bebidas/latte-rosado.jpg" alt="Casa Turquesa" fill style={{ objectFit: 'cover' }} />
          </div>

          {/* Info */}
          <div style={{ flex: 1, minWidth: 220 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 6, flexWrap: 'wrap' }}>
              <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#1a1a1a' }}>Casa Turquesa</span>
              <span style={{ fontSize: 13, color: '#888' }}>@casaturquesa.cl</span>
            </div>

            {/* Stats */}
            <div style={{ display: 'flex', gap: '1.5rem', marginBottom: 10, flexWrap: 'wrap' }}>
              {[['387', 'publicaciones'], ['10.7K', 'seguidores'], ['1.524', 'siguiendo']].map(([n, l]) => (
                <div key={l} style={{ fontSize: 13, color: '#1a1a1a' }}>
                  <strong>{n}</strong> <span style={{ color: '#888' }}>{l}</span>
                </div>
              ))}
            </div>

            {/* Bio */}
            <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6, marginBottom: 12, maxWidth: 420 }}>
              Tostaduria, Cafetería &amp; Tienda de alimentos 🌱 Opciones veganas y sin gluten
            </p>

            {/* Botón seguir */}
            <a
              href="https://www.instagram.com/casaturquesa.cl/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-block', fontSize: 12, fontWeight: 700,
                padding: '8px 22px', borderRadius: 100,
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

        {/* ── Highlights ─────────────────────────────────────────────── */}
        <div style={{
          display: 'flex', gap: '1.25rem', overflowX: 'auto',
          marginBottom: '2rem', paddingBottom: 4,
        }}>
          {highlights.map(h => (
            <div key={h.label} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0 }}>
              <div style={{
                width: 64, height: 64, borderRadius: '50%', overflow: 'hidden',
                border: '2.5px solid #1ABFAA', position: 'relative', cursor: 'pointer',
              }}>
                <Image src={h.src} alt={h.label} fill style={{ objectFit: 'cover' }} />
              </div>
              <span style={{ fontSize: 10, color: '#555', textAlign: 'center', letterSpacing: '0.3px' }}>{h.label}</span>
            </div>
          ))}
        </div>

        {/* Indicador en vivo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.25rem' }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: '#22c55e', display: 'inline-block',
            animation: 'pulse 2s infinite', flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, color: '#888' }}>
            Conectado a @casaturquesa.cl — actualización automática
          </span>
        </div>

        {/* ── Grid fotos ──────────────────────────────────────────────── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 4,
        }} className="gallery-grid">
          {photos.map((photo, i) => (
            <div key={i} className="ig-post" style={{
              aspectRatio: '1 / 1',
              borderRadius: 6,
              backgroundColor: '#e8e0d8',
              position: 'relative',
            }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="eager"
                style={{ objectFit: 'cover', objectPosition: 'center top' }}
              />
              {/* Reel badge */}
              {photo.reel && (
                <span style={{
                  position: 'absolute', top: 8, right: 8, zIndex: 2,
                  backgroundColor: 'rgba(0,0,0,0.55)', color: '#fff',
                  fontSize: 9, fontWeight: 700, padding: '2px 7px', borderRadius: 4,
                  letterSpacing: '0.5px',
                }}>REEL</span>
              )}
              {/* Hover overlay */}
              <div className="ig-overlay">
                <span className="ig-stat">❤ {photo.likes}</span>
                <span className="ig-stat">💬 {photo.comments}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Link Instagram */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a
            href="https://www.instagram.com/casaturquesa.cl/"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12, fontWeight: 700, letterSpacing: '1.5px',
              textTransform: 'uppercase', color: '#1ABFAA',
              textDecoration: 'none',
              borderBottom: '1.5px solid #1ABFAA',
              paddingBottom: 2,
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Ver más en Instagram →
          </a>
        </div>

      </div>
    </section>
  )
}

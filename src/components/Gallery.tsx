'use client'

import Image from 'next/image'

const photos = [
  { src: '/images/bebidas/latte-rosado.jpg', alt: 'Latte rosado' },
  { src: '/images/postres/torta-merengue.jpg', alt: 'Torta merengue' },
  { src: '/images/tostadas/tostada-palta.jpg', alt: 'Tostada de palta' },
  { src: '/images/postres/torta-citrico.jpg', alt: 'Torta cítrico' },
  { src: '/images/espacios/mostrador.jpg', alt: 'Mostrador' },
  { src: '/images/platos/waffles-banana.jpg', alt: 'Waffles banana' },
  { src: '/images/bebidas/matcha-verde.jpg', alt: 'Matcha verde' },
  { src: '/images/postres/torta-berries.jpg', alt: 'Torta berries' },
]

export default function Gallery() {
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

        {/* Título */}
        <h2 style={{
          fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 400,
          color: '#1a1a1a', marginBottom: 14,
        }}>
          Nuestra galería en vivo
        </h2>

        {/* Indicador en vivo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <span style={{
            width: 8, height: 8, borderRadius: '50%',
            backgroundColor: '#22c55e', display: 'inline-block',
            animation: 'pulse 2s infinite',
            flexShrink: 0,
          }} />
          <span style={{ fontSize: 12, color: '#888' }}>
            Conectado a @casaturquesa.cl — actualización automática
          </span>
        </div>

        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 4,
        }} className="gallery-grid">
          {photos.map((photo, i) => (
            <div key={i} style={{
              aspectRatio: '1 / 1',
              borderRadius: 6,
              overflow: 'hidden',
              backgroundColor: '#e8e0d8',
              position: 'relative',
              cursor: 'pointer',
            }}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                loading="eager"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center top',
                  transition: 'transform 0.4s ease',
                }}
                onMouseEnter={e => ((e.target as HTMLImageElement).style.transform = 'scale(1.05)')}
                onMouseLeave={e => ((e.target as HTMLImageElement).style.transform = 'scale(1)')}
              />
            </div>
          ))}
        </div>

        {/* Link Instagram */}
        <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
          <a
            href="https://instagram.com"
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

'use client'

import Image from 'next/image'

const photos = [
  { src: '/images/galeria/foto-1.jpg', alt: 'Casa Turquesa' },
  { src: '/images/galeria/foto-2.jpg', alt: 'Nuestros cafés' },
  { src: '/images/galeria/foto-3.jpg', alt: 'Platos' },
  { src: '/images/galeria/foto-4.jpg', alt: 'Ambiente' },
  { src: '/images/bebidas/latte-rosado.jpg', alt: 'Latte rosado' },
  { src: '/images/galeria/foto-5.jpg', alt: 'Espacio' },
  { src: '/images/postres/torta-merengue.jpg', alt: 'Torta merengue' },
  { src: '/images/platos/waffles-crema.jpg', alt: 'Waffles' },
]

export default function Gallery() {
  return (
    <section id="galeria" style={{ backgroundColor: '#FAF7F2', padding: '4rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 12 }}>
            Instagram
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 400, color: '#1a1a1a', marginBottom: 16 }}>
            Galería
          </h2>
          {/* Live indicator */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 13, color: '#555' }}>
            <span style={{
              width: 8, height: 8, borderRadius: '50%', backgroundColor: '#22c55e',
              display: 'inline-block',
              boxShadow: '0 0 0 3px rgba(34,197,94,0.2)',
              animation: 'pulse 2s infinite',
            }} />
            Conectado a @casaturquesa.cl
          </div>
        </div>

        {/* Grid 4 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12 }} className="gallery-grid">
          {photos.map((photo, i) => (
            <div key={i} style={{ position: 'relative', aspectRatio: '1 / 1', overflow: 'hidden', borderRadius: 12, backgroundColor: '#e8e0d8', cursor: 'pointer' }}
              onMouseEnter={e => { const img = e.currentTarget.querySelector('img'); if (img) (img as HTMLImageElement).style.transform = 'scale(1.06)' }}
              onMouseLeave={e => { const img = e.currentTarget.querySelector('img'); if (img) (img as HTMLImageElement).style.transform = 'scale(1)' }}
            >
              <Image src={photo.src} alt={photo.alt} fill loading="eager" style={{ objectFit: 'cover', objectPosition: 'top', transition: 'transform 0.5s ease' }} />
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 13, fontWeight: 600, color: '#1ABFAA',
            border: '1.5px solid #1ABFAA', padding: '10px 24px',
            borderRadius: 100, textDecoration: 'none', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1ABFAA'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1ABFAA' }}
          >
            Ver en Instagram
          </a>
        </div>
      </div>
    </section>
  )
}

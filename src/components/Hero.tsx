'use client'

import Image from 'next/image'

export default function Hero() {
  return (
    <section style={{ position: 'relative', height: 500, marginTop: 64, overflow: 'hidden' }}>
      {/* Imagen con filtro oscuro */}
      <div style={{ position: 'absolute', inset: 0 }}>
        <Image
          src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1400&q=80"
          alt="Casa Turquesa"
          fill
          loading="eager"
          style={{ objectFit: 'cover', objectPosition: 'center', filter: 'brightness(0.55)' }}
          priority
        />
      </div>

      {/* Contenido centrado */}
      <div style={{
        position: 'relative', zIndex: 10,
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        textAlign: 'center', padding: '0 1.5rem',
        color: '#fff',
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '3px', textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 16 }}>
          Ñuñoa · Santiago de Chile
        </p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(36px, 5vw, 56px)', fontWeight: 400, lineHeight: 1.15, margin: '0 0 20px', maxWidth: 700 }}>
          Un lugar donde el café<br />es ritual
        </h1>
        <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.82)', maxWidth: 480, lineHeight: 1.7, margin: '0 0 36px' }}>
          Cafetería artesanal, tostaduria de especialidad<br />y tienda curada en Ñuñoa.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          <a href="#productos" style={{
            padding: '12px 32px', borderRadius: 100, fontWeight: 600, fontSize: 13,
            backgroundColor: '#fff', color: '#0F8A7A', textDecoration: 'none',
            letterSpacing: '0.5px', transition: 'opacity 0.2s',
          }}>Explorar menú</a>
          <a href="#intro" style={{
            padding: '12px 32px', borderRadius: 100, fontWeight: 600, fontSize: 13,
            backgroundColor: 'transparent', color: '#fff',
            border: '1.5px solid rgba(255,255,255,0.7)', textDecoration: 'none',
            letterSpacing: '0.5px', transition: 'background 0.2s',
          }}>Conoce el espacio</a>
        </div>
      </div>
    </section>
  )
}

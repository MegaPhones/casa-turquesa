'use client'

import Image from 'next/image'

export default function Intro() {
  return (
    <section id="intro" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', minHeight: 520 }} className="intro-grid">
      {/* Imagen izquierda */}
      <div style={{ position: 'relative', minHeight: 400 }}>
        <Image
          src="/images/espacios/mostrador.jpg"
          alt="Interior Casa Turquesa"
          fill
          loading="eager"
          style={{ objectFit: 'cover', objectPosition: 'center top' }}
        />
      </div>

      {/* Texto derecha — fondo turquesa */}
      <div style={{
        backgroundColor: '#1ABFAA', color: '#fff',
        padding: '3rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', opacity: 0.75, marginBottom: 20 }}>
          Nuestro espacio
        </p>
        <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, lineHeight: 1.25, marginBottom: 20, margin: '0 0 20px' }}>
          Más que un café,<br />un punto de encuentro
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, opacity: 0.9, marginBottom: 16 }}>
          Casa Turquesa nació del deseo de crear un espacio donde la calidad del café
          de especialidad convive con la calidez de un hogar. Somos tostadores,
          cocineros y curadores de objetos con alma.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, opacity: 0.85, marginBottom: 32 }}>
          Ubicados en el corazón de Ñuñoa, cada taza cuenta la historia de su origen.
        </p>

        {/* Stats */}
        <div style={{ display: 'flex', gap: '2rem', marginBottom: 32 }}>
          {[['2019', 'Desde'], ['12+', 'Orígenes'], ['4.9★', 'Google']].map(([n, l]) => (
            <div key={l}>
              <div style={{ fontFamily: 'Georgia, serif', fontSize: 28, fontWeight: 700 }}>{n}</div>
              <div style={{ fontSize: 12, opacity: 0.75, marginTop: 2 }}>{l}</div>
            </div>
          ))}
        </div>

        <a href="#productos" style={{
          fontSize: 13, fontWeight: 600, color: '#fff', textDecoration: 'none',
          borderBottom: '1.5px solid rgba(255,255,255,0.6)', paddingBottom: 2,
          display: 'inline-flex', alignItems: 'center', gap: 8, width: 'fit-content',
          transition: 'opacity 0.2s',
        }}>
          Ver nuestro menú →
        </a>
      </div>
    </section>
  )
}

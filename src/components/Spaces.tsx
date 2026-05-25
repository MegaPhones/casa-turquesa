'use client'

import Image from 'next/image'

const spaces = [
  {
    id: 1, title: 'Taller de Cata de Café',
    description: 'Aprende a identificar perfiles de sabor, técnicas de extracción y el proceso del café de especialidad.',
    image: '/images/espacios/interior-real.jpg',
    duration: '2 horas', capacity: 'Hasta 10 personas', price: '$24.000 / persona', tag: 'Más popular',
  },
  {
    id: 2, title: 'Espacio para Eventos',
    description: 'Salón privado disponible para reuniones, lanzamientos o cualquier evento que merezca un ambiente especial.',
    image: '/images/espacios/interior-2.jpg',
    duration: 'Flexible', capacity: 'Hasta 30 personas', price: 'Desde $80.000', tag: null,
  },
  {
    id: 3, title: 'Taller de Latte Art',
    description: 'Experiencia práctica para aprender a crear diseños en espuma de leche. Perfecto para principiantes.',
    image: '/images/espacios/interior-3.jpg',
    duration: '1.5 horas', capacity: 'Hasta 8 personas', price: '$19.000 / persona', tag: 'Nuevo',
  },
]

export default function Spaces() {
  return (
    <section id="espacios" style={{ backgroundColor: '#0F1A18', padding: '4rem 3%' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 12 }}>
            Experiencias
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 400, color: '#fff', margin: 0 }}>
            Espacios & Talleres
          </h2>
        </div>

        {/* Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }} className="spaces-grid">
          {spaces.map(space => (
            <div key={space.id} style={{
              borderRadius: 16, overflow: 'hidden',
              border: '1px solid #f0ebe4', backgroundColor: '#fff',
              transition: 'box-shadow 0.25s, transform 0.25s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 12px 32px rgba(0,0,0,0.1)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-4px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
            >
              {/* Imagen */}
              <div style={{ position: 'relative', height: 160, overflow: 'hidden', backgroundColor: '#e8e0d8' }}>
                <Image src={space.image} alt={space.title} fill loading="eager" style={{ objectFit: 'cover', objectPosition: 'center top' }} />
                {space.tag && (
                  <span style={{
                    position: 'absolute', top: 12, left: 12,
                    backgroundColor: '#1ABFAA', color: '#fff', fontSize: 10,
                    fontWeight: 700, padding: '4px 12px', borderRadius: 100,
                  }}>{space.tag}</span>
                )}
              </div>

              {/* Contenido */}
              <div style={{ padding: '1.5rem' }}>
                <h3 style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 600, color: '#1a1a1a', marginBottom: 10 }}>
                  {space.title}
                </h3>
                <p style={{ fontSize: 14, color: '#666', lineHeight: 1.65, marginBottom: 16 }}>
                  {space.description}
                </p>
                <div style={{ display: 'flex', gap: 8, marginBottom: 20, flexWrap: 'wrap' }}>
                  <span style={{ fontSize: 12, color: '#888', backgroundColor: '#f5f0ea', padding: '4px 12px', borderRadius: 100 }}>⏱ {space.duration}</span>
                  <span style={{ fontSize: 12, color: '#888', backgroundColor: '#f5f0ea', padding: '4px 12px', borderRadius: 100 }}>👥 {space.capacity}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#1ABFAA' }}>{space.price}</span>
                  <a
                    href="https://wa.me/56935227488?text=Hola%20Casa%20Turquesa%2C%20quisiera%20hacer%20una%20reserva"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      fontSize: 13, fontWeight: 600, padding: '8px 20px',
                      borderRadius: 100, backgroundColor: '#1ABFAA', color: '#fff',
                      textDecoration: 'none', transition: 'opacity 0.2s',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >Reservar</a>
                </div>
                <p style={{ fontSize: 11, color: '#1ABFAA', marginTop: 10, cursor: 'pointer' }}>
                  Consulta disponibilidad por WhatsApp
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

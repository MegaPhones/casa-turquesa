export default function MapSection() {
  return (
    <section id="mapa" style={{ backgroundColor: '#fff', padding: 0 }}>
      {/* Header */}
      <div style={{ padding: '2rem 2rem 1.5rem' }}>
        <p style={{
          fontSize: 10, fontWeight: 700, letterSpacing: '3px',
          textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 8,
        }}>
          Cómo llegar
        </p>
        <h2 style={{
          fontFamily: 'Georgia, serif', fontSize: 'clamp(24px, 3vw, 32px)',
          fontWeight: 400, color: '#1a1a1a', marginBottom: 10,
        }}>
          Encuéntranos en Ñuñoa
        </h2>
        <p style={{ fontSize: 14, color: '#666', marginBottom: 12 }}>
          Av. Ortúzar 250, Ñuñoa, Santiago
        </p>
        <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', fontSize: 13, color: '#888' }}>
          <span>Lun–Vie: 8:00–22:00</span>
          <span style={{ color: '#ccc' }}>|</span>
          <span>Sáb: 9:00–21:00</span>
          <span style={{ color: '#ccc' }}>|</span>
          <span>Dom: 10:00–20:00</span>
        </div>
      </div>

      {/* Mapa */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.8976!2d-70.6114!3d-33.4571!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf5b72df0001%3A0xa22a5b11d7609f!2sAv.+Ort%C3%BAzar+250%2C+%C3%91u%C3%B1oa%2C+Regi%C3%B3n+Metropolitana!5e0!3m2!1ses-419!2scl!4v1712000000000"
        width="100%"
        height="420"
        style={{ border: 0, display: 'block' }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />

      {/* Barra oscura */}
      <div style={{
        backgroundColor: '#0d1f1d',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 0,
      }} className="map-info-grid">
        {[
          { icon: '📍', label: 'Dirección', value: 'Av. Ortúzar 250, Ñuñoa' },
          { icon: '🚇', label: 'Metro', value: 'Línea 3, estación Villa Frei' },
          { icon: '🚌', label: 'Micro', value: 'Líneas 210, 306, 407' },
        ].map(({ icon, label, value }, i) => (
          <div key={label} style={{
            padding: '1.25rem 1.5rem',
            borderRight: i < 2 ? '1px solid rgba(255,255,255,0.08)' : 'none',
          }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)', fontWeight: 700, letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: 4 }}>
              {icon} {label}
            </p>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.75)', margin: 0 }}>
              {value}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}

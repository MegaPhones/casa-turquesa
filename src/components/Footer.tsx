'use client'

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0d1f1d', color: '#fff', padding: '4rem 2rem 2rem' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Grid 3 columnas */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '3rem', paddingBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)' }} className="footer-grid">
          {/* Col 1: Logo + descripción */}
          <div>
            <div style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#1ABFAA', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 16 }}>
              Casa Turquesa
            </div>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, marginBottom: 24 }}>
              Cafetería de especialidad, tostaduria y tienda en el corazón de Ñuñoa, Santiago.
            </p>
            <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.8 }}>
              <p style={{ margin: '0 0 4px', fontWeight: 600, color: 'rgba(255,255,255,0.7)' }}>Horarios</p>
              <p style={{ margin: 0 }}>Lun–Vie: 8:00 – 20:00</p>
              <p style={{ margin: 0 }}>Sábado: 9:00 – 21:00</p>
              <p style={{ margin: 0 }}>Domingo: 10:00 – 18:00</p>
            </div>
          </div>

          {/* Col 2: Navegación */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Navegación</p>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {[['Menú', '#productos'], ['Tienda', '#productos'], ['Talleres', '#espacios'], ['Galería', '#galeria'], ['Nosotros', '#intro'], ['Reservar', '#espacios']].map(([label, href]) => (
                <a key={label} href={href} style={{
                  fontSize: 14, color: 'rgba(255,255,255,0.6)', textDecoration: 'none', transition: 'color 0.2s', width: 'fit-content',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#1ABFAA')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                >{label}</a>
              ))}
            </nav>
          </div>

          {/* Col 3: Contacto */}
          <div>
            <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', marginBottom: 20 }}>Contacto</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 14, color: 'rgba(255,255,255,0.6)' }}>
              <p style={{ margin: 0 }}>📍 Av. Irarrázaval 1234, Ñuñoa<br /><span style={{ fontSize: 13 }}>Santiago, Chile</span></p>
              <p style={{ margin: 0 }}>✉️ hola@casaturquesa.cl</p>
              <p style={{ margin: 0 }}>📞 +56 9 1234 5678</p>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {['Instagram', 'TikTok'].map(red => (
                <a key={red} href="#" style={{
                  fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px',
                  borderRadius: 100, textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#1ABFAA'; e.currentTarget.style.borderColor = '#1ABFAA' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                >{red}</a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div style={{ paddingTop: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', margin: 0 }}>
            © {new Date().getFullYear()} Casa Turquesa. Todos los derechos reservados.
          </p>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.25)', margin: 0 }}>
            Diseñado con ♥ en Ñuñoa
          </p>
        </div>
      </div>
    </footer>
  )
}

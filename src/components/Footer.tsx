'use client'

interface FooterProps {
  hoursWeekday?: string
  hoursSaturday?: string
  address?: string
  phone?: string
  email?: string
}

export default function Footer({
  hoursWeekday, hoursSaturday, address, phone, email,
}: FooterProps = {}) {
  return (
    <footer style={{ backgroundColor: '#0d1f1d', color: '#fff', padding: '4rem 3% 2rem' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
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
              <p style={{ margin: 0 }}>{hoursWeekday ?? 'Lunes a viernes: 7:30 a 21:00 hrs'}</p>
              <p style={{ margin: 0 }}>{hoursSaturday ?? 'Sábado, domingo y festivos: 9:00 a 21:00 hrs'}</p>
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
              <p style={{ margin: 0 }}>📍 {address ?? 'Av. Ortúzar 250, Ñuñoa'}<br /><span style={{ fontSize: 13 }}>Santiago, Chile</span></p>
              <p style={{ margin: 0 }}>✉️ {email || 'contacto@casaturquesa.cl'}</p>
              <p style={{ margin: 0 }}>📞 {phone || '+56 9 2825 4899'}</p>
            </div>
            <div style={{ display: 'flex', gap: 12, marginTop: 24 }}>
              {[
                { label: 'Instagram', href: 'https://www.instagram.com/casaturquesa.cl/' },
                { label: 'TikTok', href: 'https://www.tiktok.com/@casaturquesa' },
              ].map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 12, fontWeight: 600, color: 'rgba(255,255,255,0.5)',
                  border: '1px solid rgba(255,255,255,0.15)', padding: '6px 14px',
                  borderRadius: 100, textDecoration: 'none', transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.color = '#1ABFAA'; e.currentTarget.style.borderColor = '#1ABFAA' }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)' }}
                >{label}</a>
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

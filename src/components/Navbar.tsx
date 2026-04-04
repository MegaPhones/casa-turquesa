'use client'

import { useState } from 'react'

const links = [
  { label: 'MENÚ', href: '#productos' },
  { label: 'TIENDA', href: '#productos' },
  { label: 'TALLERES', href: '#espacios' },
  { label: 'GALERÍA', href: '#galeria' },
  { label: 'NOSOTROS', href: '#intro' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
      backgroundColor: '#fff',
      borderBottom: '1px solid #e8e0d8',
      height: 64,
      display: 'flex', alignItems: 'center',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 2rem', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <a href="#" style={{ textDecoration: 'none' }}>
          <span style={{ fontFamily: 'Georgia, serif', fontSize: 18, fontWeight: 700, color: '#0F8A7A', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
            Casa Turquesa
          </span>
        </a>

        {/* Nav links — desktop */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '2rem' }} className="hide-mobile">
          {links.map(l => (
            <a key={l.label} href={l.href} style={{
              fontFamily: 'system-ui, sans-serif', fontSize: 11, fontWeight: 600,
              color: '#555', letterSpacing: '1px', textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => (e.currentTarget.style.color = '#0F8A7A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#555')}
            >
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA buttons — desktop */}
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }} className="hide-mobile">
          <a href="#productos" style={{
            fontSize: 12, fontWeight: 600, padding: '8px 20px',
            borderRadius: 100, border: '1.5px solid #1ABFAA', color: '#1ABFAA',
            textDecoration: 'none', letterSpacing: '0.5px', transition: 'all 0.2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#1ABFAA'; e.currentTarget.style.color = '#fff' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#1ABFAA' }}
          >Ver menú</a>
          <a href="#espacios" style={{
            fontSize: 12, fontWeight: 600, padding: '8px 20px',
            borderRadius: 100, backgroundColor: '#1ABFAA', color: '#fff',
            textDecoration: 'none', letterSpacing: '0.5px', transition: 'opacity 0.2s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >Reservar</a>
        </div>

        {/* Hamburger — mobile */}
        <button onClick={() => setOpen(!open)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4 }} className="show-mobile">
          <div style={{ width: 22, height: 2, backgroundColor: '#333', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, backgroundColor: '#333', marginBottom: 5, borderRadius: 2 }} />
          <div style={{ width: 22, height: 2, backgroundColor: '#333', borderRadius: 2 }} />
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute', top: 64, left: 0, right: 0,
          backgroundColor: '#fff', borderBottom: '1px solid #e8e0d8',
          padding: '1rem 2rem', display: 'flex', flexDirection: 'column', gap: '1rem',
        }}>
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)} style={{
              fontSize: 13, fontWeight: 600, color: '#333', textDecoration: 'none', letterSpacing: '1px',
            }}>{l.label}</a>
          ))}
          <div style={{ display: 'flex', gap: '0.75rem', paddingTop: 8 }}>
            <a href="#productos" style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: 100, border: '1.5px solid #1ABFAA', color: '#1ABFAA', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>Ver menú</a>
            <a href="#espacios" style={{ flex: 1, textAlign: 'center', padding: '10px', borderRadius: 100, backgroundColor: '#1ABFAA', color: '#fff', textDecoration: 'none', fontSize: 12, fontWeight: 600 }}>Reservar</a>
          </div>
        </div>
      )}
    </header>
  )
}

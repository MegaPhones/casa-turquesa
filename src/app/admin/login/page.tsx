'use client'

import { useState } from 'react'

export default function AdminLoginPage() {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        setError(data.error || 'Error al iniciar sesión')
        setLoading(false)
        return
      }
      window.location.href = '/admin'
    } catch {
      setError('Error de red')
      setLoading(false)
    }
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
      <form onSubmit={onSubmit} style={{
        width: '100%', maxWidth: 380, background: '#1a1a1f', padding: '2.5rem 2rem',
        borderRadius: 16, border: '1px solid #2a2a30',
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ fontFamily: 'Georgia, serif', fontSize: 22, color: '#00b4b4', letterSpacing: '0.1em', marginBottom: 4 }}>
            CASA TURQUESA
          </div>
          <div style={{ fontSize: 12, color: '#888', letterSpacing: '2px', textTransform: 'uppercase' }}>
            Panel de administración
          </div>
        </div>

        <label style={{ display: 'block', fontSize: 12, color: '#aaa', marginBottom: 6, letterSpacing: '0.5px' }}>
          Contraseña
        </label>
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          autoFocus
          required
          style={{
            width: '100%', padding: '12px 14px', background: '#0e0e10',
            border: '1px solid #333', borderRadius: 8, color: '#fff',
            fontSize: 14, outline: 'none', marginBottom: 16,
          }}
          onFocus={e => (e.currentTarget.style.borderColor = '#00b4b4')}
          onBlur={e => (e.currentTarget.style.borderColor = '#333')}
        />

        {error && (
          <div style={{ fontSize: 13, color: '#ff6b6b', marginBottom: 16 }}>{error}</div>
        )}

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '12px', background: '#00b4b4', color: '#0e0e10',
            fontWeight: 700, fontSize: 14, border: 'none', borderRadius: 8,
            cursor: loading ? 'wait' : 'pointer', letterSpacing: '0.5px',
            opacity: loading ? 0.7 : 1, transition: 'opacity 0.2s',
          }}
        >
          {loading ? 'Ingresando…' : 'Entrar'}
        </button>
      </form>
    </div>
  )
}

'use client'

import { useState } from 'react'

const SUGGESTED = [
  '¿Qué café recomiendan?',
  '¿Tienen opciones sin gluten?',
  'Quiero reservar para el sábado',
  '¿Cuál es el horario?',
  '¿Cómo llegar?',
]

const MOCK_REPLY = 'Hola 👋 Soy Turquesa, el asistente de Casa Turquesa. Pronto responderé en tiempo real. Por ahora escríbenos por WhatsApp o visítanos en Ñuñoa.'

const INITIAL_MESSAGES: { role: 'user' | 'ai'; text: string }[] = [
  { role: 'ai', text: '¡Hola! Soy Turquesa, tu asistente. Puedo ayudarte con el menú, horarios, talleres y reservas. ¿En qué te ayudo?' },
  { role: 'user', text: '¿Tienen opciones veganas?' },
  { role: 'ai', text: '¡Sí! Tenemos muchas opciones veganas: smoothie bowls, tostadas de palta, granola artesanal y más. ¿Quieres que te cuente sobre alguno en particular?' },
]

export default function AIAgent() {
  const [messages, setMessages] = useState<{ role: 'user' | 'ai'; text: string }[]>(INITIAL_MESSAGES)
  const [input, setInput] = useState('')

  const send = (text: string) => {
    if (!text.trim()) return
    setMessages(m => [...m, { role: 'user', text }, { role: 'ai', text: MOCK_REPLY }])
    setInput('')
  }

  return (
    <section id="agente" style={{ backgroundColor: '#FAF7F2', padding: '4rem 3%' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }} className="agent-grid">
        {/* Izquierda: texto */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 16 }}>
            Asistente IA
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 40px)', fontWeight: 400, color: '#1a1a1a', marginBottom: 20, lineHeight: 1.2 }}>
            Turquesa,<br />tu guía personal
          </h2>
          <p style={{ fontSize: 15, color: '#555', lineHeight: 1.75, marginBottom: 32 }}>
            Próximamente podrás chatear directamente con Turquesa IA para consultar el menú, precios, disponibilidad de talleres y hacer reservas. Por ahora contáctanos por WhatsApp.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 32 }}>
            {[
              ['🍃', 'Recomendaciones personalizadas del menú'],
              ['📅', 'Reservas de talleres y eventos'],
              ['☕', 'Info sobre cafés de origen'],
            ].map(([icon, text]) => (
              <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#444' }}>
                <span style={{ fontSize: 18 }}>{icon}</span>
                <span>{text}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => window.open('https://wa.me/56935227488', '_blank')}
            style={{
              backgroundColor: '#25D366', color: '#fff', border: 'none',
              borderRadius: 4, padding: '12px 24px', fontSize: 14,
              fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Chatear por WhatsApp →
          </button>
        </div>

        {/* Derecha: chat */}
        <div style={{ backgroundColor: '#fff', borderRadius: 20, overflow: 'hidden', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', minHeight: 480 }}>
          {/* Header */}
          <div style={{ backgroundColor: '#1ABFAA', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 12 }}>
            <div style={{ width: 36, height: 36, borderRadius: '50%', backgroundColor: '#0F8A7A', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>T</div>
            <div>
              <p style={{ color: '#fff', fontWeight: 600, fontSize: 14, margin: 0 }}>Turquesa AI</p>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: 12, margin: 0 }}>● En línea</p>
            </div>
          </div>

          {/* Mensajes */}
          <div style={{ minHeight: 280, overflowY: 'auto', padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start' }}>
                <div style={{
                  maxWidth: '80%', padding: '10px 14px', borderRadius: 14,
                  borderTopRightRadius: msg.role === 'user' ? 4 : 14,
                  borderTopLeftRadius: msg.role === 'ai' ? 4 : 14,
                  backgroundColor: msg.role === 'user' ? '#1ABFAA' : '#f5f0ea',
                  color: msg.role === 'user' ? '#fff' : '#333',
                  fontSize: 13, lineHeight: 1.55,
                }}>{msg.text}</div>
              </div>
            ))}
          </div>

          {/* Sugerencias */}
          <div style={{ padding: '0 16px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {SUGGESTED.map(s => (
              <button key={s} onClick={() => send(s)} style={{
                fontSize: 11, padding: '5px 12px', borderRadius: 100,
                border: '1px solid #e0d8d0', backgroundColor: '#fff',
                color: '#666', cursor: 'pointer', transition: 'all 0.2s',
              }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = '#1ABFAA'; e.currentTarget.style.color = '#1ABFAA' }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = '#e0d8d0'; e.currentTarget.style.color = '#666' }}
              >{s}</button>
            ))}
          </div>

          {/* Input */}
          <div style={{ padding: '12px 16px', borderTop: '1px solid #f0e8e0', display: 'flex', gap: 8 }}>
            <input
              type="text" value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && send(input)}
              placeholder="Escribe tu pregunta..."
              style={{ flex: 1, fontSize: 13, padding: '10px 16px', borderRadius: 100, border: '1px solid #e8e0d8', outline: 'none', backgroundColor: '#faf7f2' }}
            />
            <button onClick={() => send(input)} style={{
              width: 40, height: 40, borderRadius: '50%', border: 'none',
              backgroundColor: '#1ABFAA', color: '#fff', cursor: 'pointer', fontSize: 16,
            }}>→</button>
          </div>
        </div>
      </div>
    </section>
  )
}

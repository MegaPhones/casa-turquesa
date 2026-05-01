'use client'

import { useState } from 'react'
import Image from 'next/image'

const TABS = ['Todo', 'Bebidas', 'Tostadas', 'Bowls', 'Tienda'] as const
type Tab = typeof TABS[number]

const products = [
  { id: 1, name: 'Latte Rosado', category: 'Bebidas' as Tab, price: 4200, image: '/images/bebidas/latte-rosado.jpg', tag: 'Favorito' },
  { id: 2, name: 'Cappuccino', category: 'Bebidas' as Tab, price: 3900, image: '/images/bebidas/cappuccino-flor.jpg' },
  { id: 3, name: 'Matcha Verde', category: 'Bebidas' as Tab, price: 4800, image: '/images/bebidas/matcha-verde.jpg', tag: 'Nuevo' },
  { id: 4, name: 'Flat White', category: 'Bebidas' as Tab, price: 3900, image: '/images/bebidas/flat-white-2.jpg' },
  { id: 5, name: 'Tostada de Palta', category: 'Tostadas' as Tab, price: 6900, image: '/images/tostadas/tostada-palta.jpg', tag: 'Top' },
  { id: 6, name: 'Sándwich', category: 'Tostadas' as Tab, price: 6500, image: '/images/tostadas/sandwich-azul.jpg' },
  { id: 7, name: 'Bowl de Frutas', category: 'Bowls' as Tab, price: 7900, image: '/images/platos/bowl-frutas.jpg', tag: 'Favorito' },
  { id: 8, name: 'Waffles', category: 'Bowls' as Tab, price: 8500, image: '/images/platos/waffles-banana.jpg' },
  { id: 9, name: 'Torta Berries', category: 'Tienda' as Tab, price: 5900, image: '/images/postres/torta-berries.jpg', tag: 'Exclusivo' },
  { id: 10, name: 'Torta Blanca', category: 'Tienda' as Tab, price: 5900, image: '/images/postres/torta-blanca.jpg' },
]

export default function Products() {
  const [activeTab, setActiveTab] = useState<Tab>('Todo')
  const [added, setAdded] = useState<number | null>(null)

  const filtered = activeTab === 'Todo' ? products : products.filter(p => p.category === activeTab)

  const handleAdd = (id: number) => {
    setAdded(id)
    setTimeout(() => setAdded(null), 1400)
  }

  return (
    <section id="productos" style={{ backgroundColor: '#FAF7F2', padding: '3rem 3%' }}>
      <div style={{ maxWidth: 1600, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: '2.5px', textTransform: 'uppercase', color: '#1ABFAA', marginBottom: 12 }}>
            Lo que ofrecemos
          </p>
          <h2 style={{ fontFamily: 'Georgia, serif', fontSize: 'clamp(28px, 3vw, 38px)', fontWeight: 400, color: '#1a1a1a', margin: 0 }}>
            Menú & Tienda
          </h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 8, marginBottom: '2.5rem' }}>
          {TABS.map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} style={{
              padding: '7px 20px', borderRadius: 100, fontSize: 13, fontWeight: 500, cursor: 'pointer',
              border: activeTab === tab ? '1.5px solid #1ABFAA' : '1.5px solid #e0e0e0',
              backgroundColor: activeTab === tab ? '#1ABFAA' : '#fff',
              color: activeTab === tab ? '#fff' : '#666',
              transition: 'all 0.2s',
            }}>{tab}</button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1.5rem' }} className="products-grid">
          {filtered.map(product => (
            <div key={product.id} style={{
              backgroundColor: '#fff', borderRadius: 16,
              border: '1px solid #f0ebe4', overflow: 'hidden',
              transition: 'box-shadow 0.2s, transform 0.2s',
              cursor: 'pointer',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = '0 8px 24px rgba(0,0,0,0.09)'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(-3px)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.boxShadow = 'none'; (e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)' }}
            >
              {/* Imagen */}
              <div style={{ position: 'relative', height: 150, overflow: 'hidden', backgroundColor: '#f5f0ea' }}>
                <Image src={product.image} alt={product.name} fill loading="eager" style={{ objectFit: 'cover', objectPosition: 'top' }} />
                {'tag' in product && product.tag && (
                  <span style={{
                    position: 'absolute', top: 8, left: 8,
                    backgroundColor: '#1ABFAA', color: '#fff', fontSize: 10,
                    fontWeight: 700, padding: '3px 10px', borderRadius: 100, letterSpacing: '0.5px',
                  }}>{product.tag}</span>
                )}
              </div>
              {/* Info */}
              <div style={{ padding: '14px 16px' }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: '#1ABFAA', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: 4 }}>
                  {product.category}
                </p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1a1a1a', marginBottom: 12, lineHeight: 1.3 }}>
                  {product.name}
                </p>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Georgia, serif', fontSize: 16, fontWeight: 700, color: '#1a1a1a' }}>
                    ${product.price.toLocaleString('es-CL')}
                  </span>
                  <button onClick={() => handleAdd(product.id)} style={{
                    fontSize: 12, fontWeight: 600, padding: '6px 14px',
                    borderRadius: 100, border: 'none', cursor: 'pointer',
                    backgroundColor: added === product.id ? '#0F8A7A' : '#1ABFAA',
                    color: '#fff', transition: 'background 0.2s',
                  }}>
                    {added === product.id ? '✓' : 'Agregar'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

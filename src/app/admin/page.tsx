'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

type SaveState = 'idle' | 'saving' | 'ok' | 'error'

interface GeneralCfg {
  hero_title?: string
  hero_subtitle?: string
  hours_weekday?: string
  hours_saturday?: string
  hours_sunday?: string
  address?: string
  phone?: string
  email?: string
}
interface InstagramCfg { followers?: string; posts?: string; following?: string }
interface Product {
  id: string; name: string; price: string
  category: 'Bebidas' | 'Tostadas' | 'Bowls' | 'Tienda'
  description?: string
  badge?: 'Favorito' | 'Nuevo' | 'Exclusivo' | ''
  image?: string
}
interface Workshop {
  id: string; name: string; description?: string
  price: string; duration: string; capacity: number; image?: string
}

const TABS = ['General', 'Instagram', 'Productos', 'Talleres'] as const
type Tab = typeof TABS[number]

const GENERAL_FIELDS: Array<{ k: keyof GeneralCfg; label: string; textarea?: boolean }> = [
  { k: 'hero_title',     label: 'Título del hero' },
  { k: 'hero_subtitle',  label: 'Subtítulo del hero', textarea: true },
  { k: 'hours_weekday',  label: 'Horario Lun-Vie' },
  { k: 'hours_saturday', label: 'Horario Sábado' },
  { k: 'hours_sunday',   label: 'Horario Domingo' },
  { k: 'address',        label: 'Dirección' },
  { k: 'phone',          label: 'Teléfono' },
  { k: 'email',          label: 'Email' },
]

const IG_FIELDS: Array<{ k: keyof InstagramCfg; label: string }> = [
  { k: 'followers', label: 'Seguidores' },
  { k: 'posts',     label: 'Publicaciones' },
  { k: 'following', label: 'Siguiendo' },
]

export default function AdminPage() {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('General')
  const [loading, setLoading] = useState(true)
  const [loadError, setLoadError] = useState('')

  const [general, setGeneral] = useState<GeneralCfg>({})
  const [instagram, setInstagram] = useState<InstagramCfg>({})
  const [products, setProducts] = useState<Product[]>([])
  const [workshops, setWorkshops] = useState<Workshop[]>([])

  useEffect(() => {
    fetch('/api/admin/config')
      .then(async r => {
        if (r.status === 401) { router.replace('/admin/login'); return null }
        return r.json()
      })
      .then(data => {
        if (!data) return
        if (data.error) { setLoadError(data.error); return }
        setGeneral(data.data.general ?? {})
        setInstagram(data.data.instagram ?? {})
        setProducts(Array.isArray(data.data.products) ? data.data.products : [])
        setWorkshops(Array.isArray(data.data.workshops) ? data.data.workshops : [])
      })
      .finally(() => setLoading(false))
  }, [router])

  async function saveKey(key: string, value: unknown): Promise<boolean> {
    const res = await fetch('/api/admin/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key, value }),
    })
    return res.ok
  }

  async function onLogout() {
    await fetch('/api/admin/logout', { method: 'POST' })
    router.replace('/admin/login')
    router.refresh()
  }

  return (
    <div>
      {/* Header */}
      <header style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '1rem 1.5rem', borderBottom: '1px solid #222',
        background: '#0a0a0c', position: 'sticky', top: 0, zIndex: 10,
        flexWrap: 'wrap', gap: 12,
      }}>
        <div style={{ fontFamily: 'Georgia, serif', fontSize: 16, letterSpacing: '0.08em' }}>
          <span style={{ color: '#00b4b4' }}>CASA TURQUESA</span>
          <span style={{ color: '#666', margin: '0 10px' }}>·</span>
          <span style={{ color: '#aaa', fontSize: 13 }}>Admin</span>
        </div>
        <button onClick={onLogout} style={{
          background: 'transparent', color: '#aaa', border: '1px solid #333',
          padding: '6px 14px', borderRadius: 6, cursor: 'pointer', fontSize: 13,
        }}>Cerrar sesión</button>
      </header>

      {/* Tabs */}
      <div style={{
        display: 'flex', gap: 4, padding: '0 1.5rem', borderBottom: '1px solid #222',
        overflowX: 'auto',
      }}>
        {TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              background: 'transparent', border: 'none',
              padding: '14px 16px', cursor: 'pointer',
              color: tab === t ? '#00b4b4' : '#888',
              fontSize: 14, fontWeight: 600, letterSpacing: '0.3px',
              borderBottom: tab === t ? '2px solid #00b4b4' : '2px solid transparent',
              marginBottom: -1, whiteSpace: 'nowrap',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Body */}
      <main style={{ padding: '2rem 1.5rem', maxWidth: 960, margin: '0 auto' }}>
        {loading && <div style={{ color: '#888' }}>Cargando…</div>}
        {loadError && <div style={{ color: '#ff6b6b' }}>{loadError}</div>}

        {!loading && !loadError && tab === 'General' && (
          <GeneralTab
            value={general}
            onChange={setGeneral}
            save={() => saveKey('general', general)}
          />
        )}

        {!loading && !loadError && tab === 'Instagram' && (
          <InstagramTab
            value={instagram}
            onChange={setInstagram}
            save={() => saveKey('instagram', instagram)}
          />
        )}

        {!loading && !loadError && tab === 'Productos' && (
          <ProductsTab
            items={products}
            setItems={setProducts}
            save={items => saveKey('products', items)}
          />
        )}

        {!loading && !loadError && tab === 'Talleres' && (
          <WorkshopsTab
            items={workshops}
            setItems={setWorkshops}
            save={items => saveKey('workshops', items)}
          />
        )}
      </main>
    </div>
  )
}

/* ──────────────── Componentes reutilizables ──────────────── */

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      style={{
        width: '100%', padding: '10px 12px', background: '#1a1a1f',
        border: '1px solid #333', borderRadius: 6, color: '#fff',
        fontSize: 14, outline: 'none', ...(props.style || {}),
      }}
      onFocus={e => (e.currentTarget.style.borderColor = '#00b4b4')}
      onBlur={e => (e.currentTarget.style.borderColor = '#333')}
    />
  )
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      style={{
        width: '100%', padding: '10px 12px', background: '#1a1a1f',
        border: '1px solid #333', borderRadius: 6, color: '#fff',
        fontSize: 14, outline: 'none', minHeight: 70, fontFamily: 'inherit', ...(props.style || {}),
      }}
      onFocus={e => (e.currentTarget.style.borderColor = '#00b4b4')}
      onBlur={e => (e.currentTarget.style.borderColor = '#333')}
    />
  )
}

function Select(props: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      style={{
        width: '100%', padding: '10px 12px', background: '#1a1a1f',
        border: '1px solid #333', borderRadius: 6, color: '#fff',
        fontSize: 14, outline: 'none', ...(props.style || {}),
      }}
    />
  )
}

function SaveButton({ state, onClick, label = 'Guardar' }: { state: SaveState; onClick: () => void; label?: string }) {
  const text =
    state === 'saving' ? 'Guardando…' :
    state === 'ok'     ? '✓ Guardado'  :
    state === 'error'  ? '✗ Error'     :
    label
  const bg =
    state === 'ok'    ? '#1e6b5a' :
    state === 'error' ? '#6b1e1e' :
    '#00b4b4'
  return (
    <button
      onClick={onClick}
      disabled={state === 'saving'}
      style={{
        background: bg, color: state === 'ok' || state === 'error' ? '#fff' : '#0e0e10',
        border: 'none', padding: '10px 18px', borderRadius: 6, fontWeight: 700,
        fontSize: 13, cursor: state === 'saving' ? 'wait' : 'pointer',
        letterSpacing: '0.3px', transition: 'background 0.2s',
      }}
    >
      {text}
    </button>
  )
}

/* ──────────────── Tab: General ──────────────── */

function GeneralTab({
  value, onChange, save,
}: { value: GeneralCfg; onChange: (v: GeneralCfg) => void; save: () => Promise<boolean> }) {
  const [states, setStates] = useState<Record<string, SaveState>>({})

  async function saveField(k: keyof GeneralCfg) {
    setStates(s => ({ ...s, [k]: 'saving' }))
    const ok = await save()
    setStates(s => ({ ...s, [k]: ok ? 'ok' : 'error' }))
    setTimeout(() => setStates(s => ({ ...s, [k]: 'idle' })), 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {GENERAL_FIELDS.map(f => (
        <div key={f.k}>
          <label style={{ display: 'block', fontSize: 12, color: '#aaa', marginBottom: 6, letterSpacing: '0.5px' }}>
            {f.label}
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              {f.textarea ? (
                <Textarea
                  value={value[f.k] ?? ''}
                  onChange={e => onChange({ ...value, [f.k]: e.target.value })}
                />
              ) : (
                <Input
                  value={value[f.k] ?? ''}
                  onChange={e => onChange({ ...value, [f.k]: e.target.value })}
                />
              )}
            </div>
            <SaveButton state={states[f.k] ?? 'idle'} onClick={() => saveField(f.k)} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ──────────────── Tab: Instagram ──────────────── */

function InstagramTab({
  value, onChange, save,
}: { value: InstagramCfg; onChange: (v: InstagramCfg) => void; save: () => Promise<boolean> }) {
  const [states, setStates] = useState<Record<string, SaveState>>({})

  async function saveField(k: keyof InstagramCfg) {
    setStates(s => ({ ...s, [k]: 'saving' }))
    const ok = await save()
    setStates(s => ({ ...s, [k]: ok ? 'ok' : 'error' }))
    setTimeout(() => setStates(s => ({ ...s, [k]: 'idle' })), 1800)
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
      {IG_FIELDS.map(f => (
        <div key={f.k}>
          <label style={{ display: 'block', fontSize: 12, color: '#aaa', marginBottom: 6, letterSpacing: '0.5px' }}>
            {f.label}
          </label>
          <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
            <div style={{ flex: 1, minWidth: 220 }}>
              <Input
                value={value[f.k] ?? ''}
                onChange={e => onChange({ ...value, [f.k]: e.target.value })}
              />
            </div>
            <SaveButton state={states[f.k] ?? 'idle'} onClick={() => saveField(f.k)} />
          </div>
        </div>
      ))}
    </div>
  )
}

/* ──────────────── Tab: Productos ──────────────── */

function ProductsTab({
  items, setItems, save,
}: {
  items: Product[]
  setItems: (p: Product[]) => void
  save: (items: Product[]) => Promise<boolean>
}) {
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [draft, setDraft] = useState<Product>({
    id: '', name: '', price: '', category: 'Bebidas', description: '', badge: '', image: '',
  })

  async function persist(next: Product[]) {
    setSaveState('saving')
    const ok = await save(next)
    setSaveState(ok ? 'ok' : 'error')
    if (ok) setItems(next)
    setTimeout(() => setSaveState('idle'), 1800)
  }

  function addProduct() {
    if (!draft.name.trim() || !draft.price.trim()) return
    const p: Product = { ...draft, id: draft.id || `p_${Date.now()}` }
    const next = [...items, p]
    setDraft({ id: '', name: '', price: '', category: 'Bebidas', description: '', badge: '', image: '' })
    persist(next)
  }

  function removeProduct(id: string) {
    persist(items.filter(p => p.id !== id))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h3 style={{ fontSize: 14, color: '#ccc', margin: '0 0 12px', letterSpacing: '0.5px' }}>
          Productos ({items.length})
        </h3>
        {items.length === 0 && <div style={{ color: '#666', fontSize: 13 }}>Sin productos aún.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(p => (
            <div key={p.id} style={{
              background: '#1a1a1f', border: '1px solid #2a2a30', borderRadius: 8,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{p.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                  {p.category} · {p.price}{p.badge ? ` · ${p.badge}` : ''}
                </div>
              </div>
              <button onClick={() => removeProduct(p.id)} style={{
                background: 'transparent', color: '#ff6b6b', border: '1px solid #3a2525',
                padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
              }}>Eliminar</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#111114', border: '1px solid #222', borderRadius: 10, padding: 18 }}>
        <h3 style={{ fontSize: 14, color: '#ccc', margin: '0 0 14px', letterSpacing: '0.5px' }}>
          Agregar producto
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div>
            <Label>Nombre</Label>
            <Input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <div>
            <Label>Precio</Label>
            <Input value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} placeholder="$3.500" />
          </div>
          <div>
            <Label>Categoría</Label>
            <Select value={draft.category} onChange={e => setDraft({ ...draft, category: e.target.value as Product['category'] })}>
              <option value="Bebidas">Bebidas</option>
              <option value="Tostadas">Tostadas</option>
              <option value="Bowls">Bowls</option>
              <option value="Tienda">Tienda</option>
            </Select>
          </div>
          <div>
            <Label>Badge</Label>
            <Select value={draft.badge ?? ''} onChange={e => setDraft({ ...draft, badge: e.target.value as Product['badge'] })}>
              <option value="">Ninguno</option>
              <option value="Favorito">Favorito</option>
              <option value="Nuevo">Nuevo</option>
              <option value="Exclusivo">Exclusivo</option>
            </Select>
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Descripción</Label>
            <Textarea value={draft.description ?? ''} onChange={e => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Imagen URL</Label>
            <Input value={draft.image ?? ''} onChange={e => setDraft({ ...draft, image: e.target.value })} placeholder="/images/… o https://…" />
          </div>
        </div>
        <div style={{ marginTop: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
          <SaveButton state={saveState} onClick={addProduct} label="Agregar producto" />
        </div>
      </section>
    </div>
  )
}

/* ──────────────── Tab: Talleres ──────────────── */

function WorkshopsTab({
  items, setItems, save,
}: {
  items: Workshop[]
  setItems: (w: Workshop[]) => void
  save: (items: Workshop[]) => Promise<boolean>
}) {
  const [saveState, setSaveState] = useState<SaveState>('idle')
  const [draft, setDraft] = useState<Workshop>({
    id: '', name: '', description: '', price: '', duration: '', capacity: 10, image: '',
  })

  async function persist(next: Workshop[]) {
    setSaveState('saving')
    const ok = await save(next)
    setSaveState(ok ? 'ok' : 'error')
    if (ok) setItems(next)
    setTimeout(() => setSaveState('idle'), 1800)
  }

  function add() {
    if (!draft.name.trim() || !draft.price.trim()) return
    const w: Workshop = {
      ...draft,
      id: draft.id || `w_${Date.now()}`,
      capacity: Number(draft.capacity) || 0,
    }
    const next = [...items, w]
    setDraft({ id: '', name: '', description: '', price: '', duration: '', capacity: 10, image: '' })
    persist(next)
  }

  function remove(id: string) {
    persist(items.filter(w => w.id !== id))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
      <section>
        <h3 style={{ fontSize: 14, color: '#ccc', margin: '0 0 12px', letterSpacing: '0.5px' }}>
          Talleres ({items.length})
        </h3>
        {items.length === 0 && <div style={{ color: '#666', fontSize: 13 }}>Sin talleres aún.</div>}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {items.map(w => (
            <div key={w.id} style={{
              background: '#1a1a1f', border: '1px solid #2a2a30', borderRadius: 8,
              padding: '12px 14px', display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap',
            }}>
              <div style={{ flex: 1, minWidth: 220 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{w.name}</div>
                <div style={{ fontSize: 12, color: '#888', marginTop: 2 }}>
                  {w.price} · {w.duration} · {w.capacity} cupos
                </div>
              </div>
              <button onClick={() => remove(w.id)} style={{
                background: 'transparent', color: '#ff6b6b', border: '1px solid #3a2525',
                padding: '6px 12px', borderRadius: 6, cursor: 'pointer', fontSize: 12,
              }}>Eliminar</button>
            </div>
          ))}
        </div>
      </section>

      <section style={{ background: '#111114', border: '1px solid #222', borderRadius: 10, padding: 18 }}>
        <h3 style={{ fontSize: 14, color: '#ccc', margin: '0 0 14px', letterSpacing: '0.5px' }}>
          Agregar taller
        </h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 12 }}>
          <div>
            <Label>Nombre</Label>
            <Input value={draft.name} onChange={e => setDraft({ ...draft, name: e.target.value })} />
          </div>
          <div>
            <Label>Precio</Label>
            <Input value={draft.price} onChange={e => setDraft({ ...draft, price: e.target.value })} placeholder="$25.000" />
          </div>
          <div>
            <Label>Duración</Label>
            <Input value={draft.duration} onChange={e => setDraft({ ...draft, duration: e.target.value })} placeholder="1.5 horas" />
          </div>
          <div>
            <Label>Capacidad</Label>
            <Input
              type="number"
              value={String(draft.capacity)}
              onChange={e => setDraft({ ...draft, capacity: Number(e.target.value) })}
            />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Descripción</Label>
            <Textarea value={draft.description ?? ''} onChange={e => setDraft({ ...draft, description: e.target.value })} />
          </div>
          <div style={{ gridColumn: '1 / -1' }}>
            <Label>Imagen URL</Label>
            <Input value={draft.image ?? ''} onChange={e => setDraft({ ...draft, image: e.target.value })} />
          </div>
        </div>
        <div style={{ marginTop: 14 }}>
          <SaveButton state={saveState} onClick={add} label="Agregar taller" />
        </div>
      </section>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label style={{ display: 'block', fontSize: 12, color: '#aaa', marginBottom: 6, letterSpacing: '0.5px' }}>
      {children}
    </label>
  )
}

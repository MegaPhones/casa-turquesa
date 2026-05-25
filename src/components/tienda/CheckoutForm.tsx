'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useCart } from '@/lib/tienda/cart-store'
import { construirMensajeWhatsApp, construirUrlWhatsApp, type DatosCliente } from '@/lib/tienda/whatsapp'

const COMUNAS_RM = [
  'Cerrillos', 'Cerro Navia', 'Conchalí', 'El Bosque', 'Estación Central',
  'Huechuraba', 'Independencia', 'La Cisterna', 'La Florida', 'La Granja',
  'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo',
  'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Pedro Aguirre Cerda',
  'Peñalolén', 'Providencia', 'Pudahuel', 'Quilicura', 'Quinta Normal',
  'Recoleta', 'Renca', 'San Joaquín', 'San Miguel', 'San Ramón',
  'Santiago', 'Vitacura',
].sort()

const NUMERO_WA = process.env.NEXT_PUBLIC_WHATSAPP_NUMERO ?? '56935227488'

interface FormErrors {
  nombre?: string
  telefono?: string
  email?: string
  direccion?: string
  comuna?: string
}

function validar(datos: DatosCliente): FormErrors {
  const errors: FormErrors = {}

  if (!datos.nombre.trim() || datos.nombre.trim().length < 2) {
    errors.nombre = 'Ingresá tu nombre completo'
  }

  const telLimpio = datos.telefono.replace(/\D/g, '')
  if (telLimpio.length < 8) {
    errors.telefono = 'Ingresá un teléfono válido'
  }

  if (!datos.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(datos.email.trim())) {
    errors.email = 'Ingresá un email válido'
  }

  if (!datos.direccion.trim() || datos.direccion.trim().length < 5) {
    errors.direccion = 'Ingresá la dirección de despacho'
  }

  if (!datos.comuna.trim()) {
    errors.comuna = 'Seleccioná una comuna'
  }

  return errors
}

export default function CheckoutForm() {
  const router = useRouter()
  const items = useCart((s) => s.items)
  const clearCart = useCart((s) => s.clearCart)

  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const [datos, setDatos] = useState<DatosCliente>({
    nombre: '',
    telefono: '',
    email: '',
    direccion: '',
    comuna: '',
    notas: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [enviando, setEnviando] = useState(false)

  useEffect(() => {
    if (!mounted) return
    const saved = localStorage.getItem('casa-turquesa-checkout-draft')
    if (saved) {
      try {
        setDatos((prev) => ({ ...prev, ...JSON.parse(saved) }))
      } catch {}
    }
  }, [mounted])

  useEffect(() => {
    if (!mounted) return
    localStorage.setItem('casa-turquesa-checkout-draft', JSON.stringify(datos))
  }, [datos, mounted])

  const handleChange = (field: keyof DatosCliente) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setDatos((prev) => ({ ...prev, [field]: e.target.value }))
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const newErrors = validar(datos)
    setErrors(newErrors)

    if (Object.keys(newErrors).length > 0) {
      const firstError = Object.keys(newErrors)[0]
      document.getElementById(`field-${firstError}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }

    if (items.length === 0) return

    setEnviando(true)

    const mensaje = construirMensajeWhatsApp(datos, items)
    const url = construirUrlWhatsApp(NUMERO_WA, mensaje)

    localStorage.removeItem('casa-turquesa-checkout-draft')

    window.open(url, '_blank', 'noopener,noreferrer')

    setTimeout(() => {
      clearCart()
      router.push('/tienda/checkout/success')
    }, 600)
  }

  if (!mounted) {
    return <div className="animate-pulse h-96 bg-neutral-100 rounded-2xl" />
  }

  if (items.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 border border-neutral-200 text-center">
        <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center">
          <svg className="w-8 h-8 text-[#2C5F5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h2 className="font-serif text-2xl text-neutral-900 mb-3">Tu carrito está vacío</h2>
        <p className="text-neutral-600 mb-6">
          Agregá productos a tu carrito antes de confirmar el pedido.
        </p>
        <Link
          href="/tienda"
          className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
        >
          Ir a la tienda
        </Link>
      </div>
    )
  }

  const inputClass = (hasError: boolean) =>
    `w-full px-4 py-3 rounded-xl bg-white border text-sm placeholder:text-neutral-400 focus:outline-none focus:ring-2 transition-all ${
      hasError
        ? 'border-rose-300 focus:border-rose-500 focus:ring-rose-100'
        : 'border-neutral-300 focus:border-[#2C5F5D] focus:ring-[#2C5F5D]/20'
    }`

  const labelClass = 'block text-xs uppercase tracking-[0.15em] text-neutral-700 font-medium mb-2'

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 space-y-5">
        <h2 className="font-serif text-2xl text-neutral-900 mb-2">Tus datos</h2>
        <p className="text-sm text-neutral-600 mb-6">
          Necesitamos estos datos para coordinar el despacho de tu pedido por WhatsApp.
        </p>

        <div id="field-nombre">
          <label htmlFor="nombre" className={labelClass}>
            Nombre completo *
          </label>
          <input
            id="nombre"
            type="text"
            value={datos.nombre}
            onChange={handleChange('nombre')}
            placeholder="Juan Pérez"
            autoComplete="name"
            className={inputClass(!!errors.nombre)}
          />
          {errors.nombre && <p className="text-xs text-rose-600 mt-1.5">{errors.nombre}</p>}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div id="field-telefono">
            <label htmlFor="telefono" className={labelClass}>
              Teléfono *
            </label>
            <input
              id="telefono"
              type="tel"
              value={datos.telefono}
              onChange={handleChange('telefono')}
              placeholder="+56 9 1234 5678"
              autoComplete="tel"
              className={inputClass(!!errors.telefono)}
            />
            {errors.telefono && <p className="text-xs text-rose-600 mt-1.5">{errors.telefono}</p>}
          </div>

          <div id="field-email">
            <label htmlFor="email" className={labelClass}>
              Email *
            </label>
            <input
              id="email"
              type="email"
              value={datos.email}
              onChange={handleChange('email')}
              placeholder="juan@email.com"
              autoComplete="email"
              className={inputClass(!!errors.email)}
            />
            {errors.email && <p className="text-xs text-rose-600 mt-1.5">{errors.email}</p>}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-6 md:p-8 border border-neutral-200 space-y-5">
        <h2 className="font-serif text-2xl text-neutral-900 mb-2">Despacho</h2>
        <p className="text-sm text-neutral-600 mb-6">
          La coordinación final del envío se hace por WhatsApp. Te confirmamos tiempos y costo de despacho.
        </p>

        <div id="field-direccion">
          <label htmlFor="direccion" className={labelClass}>
            Dirección *
          </label>
          <input
            id="direccion"
            type="text"
            value={datos.direccion}
            onChange={handleChange('direccion')}
            placeholder="Av. Providencia 1234, Depto 4B"
            autoComplete="street-address"
            className={inputClass(!!errors.direccion)}
          />
          {errors.direccion && <p className="text-xs text-rose-600 mt-1.5">{errors.direccion}</p>}
        </div>

        <div id="field-comuna">
          <label htmlFor="comuna" className={labelClass}>
            Comuna *
          </label>
          <select
            id="comuna"
            value={datos.comuna}
            onChange={handleChange('comuna')}
            className={inputClass(!!errors.comuna) + ' appearance-none bg-no-repeat'}
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.75rem center',
              backgroundSize: '1.25rem',
              paddingRight: '2.5rem',
            }}
          >
            <option value="">Seleccioná una comuna...</option>
            {COMUNAS_RM.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.comuna && <p className="text-xs text-rose-600 mt-1.5">{errors.comuna}</p>}
        </div>

        <div>
          <label htmlFor="notas" className={labelClass}>
            Notas para el envío <span className="text-neutral-400 normal-case tracking-normal">(opcional)</span>
          </label>
          <textarea
            id="notas"
            value={datos.notas}
            onChange={handleChange('notas')}
            placeholder="Ej: tocar timbre 2, dejar con conserje, etc."
            rows={3}
            className={inputClass(false) + ' resize-none'}
          />
        </div>
      </div>

      <div className="bg-[#2C5F5D]/5 border border-[#2C5F5D]/20 rounded-xl p-4 flex gap-3 items-start text-sm text-neutral-700">
        <svg className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#2C5F5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="leading-relaxed">
          Al enviar, vamos a abrir WhatsApp con tu pedido pre-armado. Casa Turquesa te va a confirmar la disponibilidad, costo de despacho y forma de pago.
        </p>
      </div>

      <button
        type="submit"
        disabled={enviando}
        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#25D366] text-white text-sm uppercase tracking-[0.2em] font-medium hover:bg-[#1ebe5b] transition-all disabled:opacity-60"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        {enviando ? 'Abriendo WhatsApp...' : 'Enviar pedido por WhatsApp'}
      </button>

      {submitted && Object.keys(errors).length > 0 && (
        <p className="text-xs text-rose-600 text-center">
          Revisá los campos marcados arriba.
        </p>
      )}
    </form>
  )
}

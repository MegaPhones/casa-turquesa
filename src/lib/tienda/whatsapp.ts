import type { CartItem } from './cart-store'

export interface DatosCliente {
  nombre: string
  telefono: string
  email: string
  direccion: string
  comuna: string
  notas: string
}

function formatearPrecio(n: number): string {
  return '$' + Math.round(n).toLocaleString('es-CL')
}

export function construirMensajeWhatsApp(
  cliente: DatosCliente,
  items: CartItem[]
): string {
  const subtotal = items.reduce((acc, i) => acc + i.precioUnitario * i.cantidad, 0)
  const fecha = new Date().toLocaleDateString('es-CL', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const lineas: string[] = []

  lineas.push('🛒 *Nuevo pedido — Casa Turquesa*')
  lineas.push(`_${fecha}_`)
  lineas.push('')

  lineas.push('*👤 Cliente*')
  lineas.push(cliente.nombre)
  lineas.push(cliente.telefono)
  lineas.push(cliente.email)
  lineas.push('')

  lineas.push('*📍 Despacho*')
  lineas.push(`${cliente.direccion}, ${cliente.comuna}`)

  if (cliente.notas.trim()) {
    lineas.push('')
    lineas.push('*📝 Notas*')
    lineas.push(cliente.notas.trim())
  }

  lineas.push('')
  lineas.push('*🛍️ Productos*')
  items.forEach(item => {
    const detalle = item.varianteLabel ? ` (${item.varianteLabel})` : ''
    const marca = item.marca ? ` — ${item.marca}` : ''
    const total = item.precioUnitario * item.cantidad
    lineas.push(`• ${item.nombre}${detalle}${marca}`)
    lineas.push(`   ${item.cantidad} × ${formatearPrecio(item.precioUnitario)} = *${formatearPrecio(total)}*`)
  })

  lineas.push('')
  lineas.push(`*💰 Total: ${formatearPrecio(subtotal)}*`)
  lineas.push('')
  lineas.push('_Pedido enviado desde casaturquesa.cl_')

  return lineas.join('\n')
}

export function construirUrlWhatsApp(numero: string, mensaje: string): string {
  const numeroLimpio = numero.replace(/\D/g, '')
  return `https://wa.me/${numeroLimpio}?text=${encodeURIComponent(mensaje)}`
}

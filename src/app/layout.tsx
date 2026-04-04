import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'

export const metadata: Metadata = {
  title: 'Casa Turquesa — Cafetería, Tostaduria & Tienda | Ñuñoa',
  description: 'Cafetería artesanal, tostaduria y tienda en Ñuñoa, Santiago. Café de especialidad, tostadas, bowls y productos seleccionados.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="antialiased">
        <LenisProvider>
          {children}
        </LenisProvider>
      </body>
    </html>
  )
}

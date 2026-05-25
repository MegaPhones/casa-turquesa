import type { Metadata } from 'next'
import './globals.css'
import LenisProvider from '@/components/LenisProvider'
import CartDrawer from '@/components/tienda/CartDrawer'
import { SITE_URL, BUSINESS_INFO } from '@/lib/business-info'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'Casa Turquesa | Cafetería y Tienda de Alimentos en Ñuñoa',
    template: '%s | Casa Turquesa',
  },
  description:
    'Cafetería, tostaduría y tienda de alimentos saludables en Av. Ortúzar 250, Ñuñoa. Opciones veganas, sin gluten, keto y tradicionales. Café de especialidad ☕',
  applicationName: 'Casa Turquesa',
  keywords: [
    'Casa Turquesa',
    'cafetería Ñuñoa',
    'café Ñuñoa',
    'cafetería Av Ortúzar',
    'tostaduría Ñuñoa',
    'café de especialidad Santiago',
    'comida saludable Ñuñoa',
    'vegano Ñuñoa',
    'sin gluten Ñuñoa',
    'keto Santiago',
    'brunch Ñuñoa',
    'desayunos Ñuñoa',
    'tienda alimentos saludables',
  ],
  authors: [{ name: 'Casa Turquesa', url: SITE_URL }],
  creator: 'Casa Turquesa',
  publisher: 'Casa Turquesa',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
    languages: { 'es-CL': '/' },
  },
  openGraph: {
    type: 'website',
    locale: 'es_CL',
    url: SITE_URL,
    siteName: 'Casa Turquesa',
    title: 'Casa Turquesa | Cafetería y Tienda de Alimentos en Ñuñoa',
    description:
      'Cafetería, tostaduría y tienda de alimentos saludables en Av. Ortúzar 250, Ñuñoa. Opciones veganas, sin gluten, keto y tradicionales.',
    images: [
      {
        url: BUSINESS_INFO.ogImage,
        width: 1200,
        height: 630,
        alt: 'Casa Turquesa — Cafetería y Tienda en Ñuñoa',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Casa Turquesa | Cafetería y Tienda en Ñuñoa',
    description:
      'Cafetería, tostaduría y tienda de alimentos saludables en Av. Ortúzar 250, Ñuñoa.',
    images: [BUSINESS_INFO.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es-CL">
      <body className="antialiased">
        <LenisProvider>
          {children}
          <CartDrawer />
        </LenisProvider>
      </body>
    </html>
  )
}

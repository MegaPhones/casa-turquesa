import type { Metadata } from 'next'
import dynamic from 'next/dynamic'
import Navbar from '@/components/Navbar'
import StatusBar from '@/components/home/v2/StatusBar'
import Hero from '@/components/home/v2/Hero'
import Manifesto from '@/components/home/v2/Manifesto'
import CartaViva from '@/components/home/v2/CartaViva'
import Ubicacion from '@/components/home/v2/Ubicacion'
import Spaces from '@/components/Spaces'
import AIAgent from '@/components/AIAgent'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import JsonLd from '@/components/seo/JsonLd'
import { getPublicConfig } from '@/lib/supabase-server'
import { BUSINESS_INFO, SITE_URL } from '@/lib/business-info'

const InstagramSection = dynamic(() => import('@/components/home/v2/InstagramSection'))

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Casa Turquesa | Cafetería y Tienda de Alimentos en Ñuñoa',
  description:
    'Cafetería, tostaduría y tienda de alimentos saludables en Av. Ortúzar 250, Ñuñoa. Café de especialidad, bowls, brunch. Opciones veganas, sin gluten y keto.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Casa Turquesa | Cafetería y Tienda de Alimentos en Ñuñoa',
    description:
      'Cafetería, tostaduría y tienda de alimentos saludables en Av. Ortúzar 250, Ñuñoa.',
    url: SITE_URL,
    images: [{ url: BUSINESS_INFO.ogImage, width: 1200, height: 630 }],
  },
}

export default async function Home() {
  const config = await getPublicConfig().catch(() => ({} as Awaited<ReturnType<typeof getPublicConfig>>))
  const g = config.general ?? {}

  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': 'CafeOrCoffeeShop',
    '@id': `${SITE_URL}/#business`,
    name: BUSINESS_INFO.legalName,
    alternateName: BUSINESS_INFO.shortName,
    image: `${SITE_URL}${BUSINESS_INFO.ogImage}`,
    logo: `${SITE_URL}${BUSINESS_INFO.ogImage}`,
    url: SITE_URL,
    telephone: BUSINESS_INFO.phone,
    email: BUSINESS_INFO.email,
    priceRange: BUSINESS_INFO.priceRange,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
    foundingDate: BUSINESS_INFO.foundingDate,
    servesCuisine: BUSINESS_INFO.cuisine,
    address: {
      '@type': 'PostalAddress',
      ...BUSINESS_INFO.address,
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: BUSINESS_INFO.geo.latitude,
      longitude: BUSINESS_INFO.geo.longitude,
    },
    openingHoursSpecification: BUSINESS_INFO.openingHoursSpecification.map((spec) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: spec.dayOfWeek,
      opens: spec.opens,
      closes: spec.closes,
    })),
    hasMenu: BUSINESS_INFO.hasMenu,
    sameAs: [
      BUSINESS_INFO.social.instagram,
      BUSINESS_INFO.social.tiktok,
      BUSINESS_INFO.social.facebook,
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: String(BUSINESS_INFO.rating.value),
      reviewCount: String(BUSINESS_INFO.rating.count),
    },
    acceptsReservations: 'True',
    potentialAction: {
      '@type': 'ReserveAction',
      target: BUSINESS_INFO.whatsappUrl,
    },
  }

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${SITE_URL}/#website`,
    url: SITE_URL,
    name: 'Casa Turquesa',
    publisher: { '@id': `${SITE_URL}/#business` },
    inLanguage: 'es-CL',
  }

  return (
    <main>
      <JsonLd data={[businessSchema, websiteSchema]} />
      <Navbar />
      <StatusBar />
      <Hero />
      <Manifesto />
      <CartaViva />
      <InstagramSection />
      <Ubicacion />
      <Spaces />
      <AIAgent />
      <Footer
        hoursWeekday={g.hours_weekday}
        hoursSaturday={g.hours_saturday}
        address={g.address}
        phone={g.phone}
        email={g.email}
      />
      <WhatsAppButton />
    </main>
  )
}

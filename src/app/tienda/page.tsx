import type { Metadata } from 'next'
import { Suspense } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ProductGrid from '@/components/tienda/ProductGrid'
import FiltersPanel from '@/components/tienda/FiltersPanel'
import FiltersDrawer from '@/components/tienda/FiltersDrawer'
import SearchBar from '@/components/tienda/SearchBar'
import JsonLd from '@/components/seo/JsonLd'
import { getProductos, getCategorias, getMarcas } from '@/lib/tienda/queries'
import { SITE_URL, BUSINESS_INFO } from '@/lib/business-info'

export const revalidate = 60

export const metadata: Metadata = {
  title: 'Tienda online | Café de especialidad y alimentos saludables',
  description:
    'Tienda online Casa Turquesa: café de especialidad, té, frutos secos, conservas, productos veganos y sin gluten. Despacho a Santiago vía WhatsApp.',
  alternates: { canonical: '/tienda' },
  openGraph: {
    title: 'Tienda online | Casa Turquesa',
    description:
      'Café de especialidad, té, frutos secos y productos seleccionados. Despacho a Santiago.',
    url: `${SITE_URL}/tienda`,
    images: [{ url: BUSINESS_INFO.ogImage, width: 1200, height: 630 }],
  },
}

interface SearchParams {
  categoria?: string
  marca?: string
  q?: string
  sg?: string
  vg?: string
  vt?: string
}

export default async function TiendaPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams> | SearchParams
}) {
  const sp = await Promise.resolve(searchParams)
  const showDrafts = process.env.NEXT_PUBLIC_SHOW_DRAFTS === 'true'

  const [{ productos, total }, categorias, marcas] = await Promise.all([
    getProductos({
      tipo: 'tienda',
      categoriaSlug: sp.categoria,
      marca: sp.marca,
      busqueda: sp.q,
      sinGluten: sp.sg === '1',
      vegano: sp.vg === '1',
      vegetariano: sp.vt === '1',
      limit: 60,
    }),
    getCategorias('tienda'),
    getMarcas('tienda'),
  ])

  const hayFiltros = !!(sp.categoria || sp.marca || sp.q || sp.sg === '1' || sp.vg === '1' || sp.vt === '1')

  const storeSchema = {
    '@context': 'https://schema.org',
    '@type': 'Store',
    '@id': `${SITE_URL}/tienda#store`,
    name: 'Tienda Casa Turquesa',
    description:
      'Tienda online de Casa Turquesa: café de especialidad, té, frutos secos, conservas y productos seleccionados.',
    url: `${SITE_URL}/tienda`,
    image: `${SITE_URL}${BUSINESS_INFO.ogImage}`,
    parentOrganization: { '@id': `${SITE_URL}/#business` },
    address: { '@type': 'PostalAddress', ...BUSINESS_INFO.address },
    telephone: BUSINESS_INFO.phone,
    currenciesAccepted: BUSINESS_INFO.currenciesAccepted,
    paymentAccepted: BUSINESS_INFO.paymentAccepted,
  }

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <JsonLd data={storeSchema} />
      <Navbar />

      <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center max-w-3xl">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#2C5F5D] font-medium mb-4">
            Tienda
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4 leading-tight">
            Productos seleccionados
          </h1>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed max-w-2xl mx-auto">
            Café de especialidad, conservas artesanales y curaduría de marcas
            locales que respetamos. Despacho a Santiago vía coordinación por WhatsApp.
          </p>
        </div>
      </section>

      {showDrafts && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900 flex items-start gap-3">
            <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <div>
              <strong className="font-semibold">Modo desarrollo:</strong> mostrando productos en borrador. En producción solo se verán publicados.
            </div>
          </div>
        </div>
      )}

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-center justify-between gap-3 mb-6 flex-wrap">
          <Suspense fallback={<div className="h-10 w-full max-w-md bg-neutral-100 rounded-full" />}>
            <SearchBar />
          </Suspense>
          <Suspense fallback={null}>
            <FiltersDrawer categorias={categorias} marcas={marcas} />
          </Suspense>
        </div>

        <div className="flex gap-8">
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <Suspense fallback={null}>
                <FiltersPanel categorias={categorias} marcas={marcas} />
              </Suspense>
            </div>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline justify-between mb-5">
              <p className="text-sm text-neutral-600">
                {total > 0 ? (
                  <>
                    <span className="font-semibold text-neutral-900">{total}</span>{' '}
                    {total === 1 ? 'producto' : 'productos'}
                    {hayFiltros && <span className="text-neutral-500"> con los filtros aplicados</span>}
                  </>
                ) : (
                  'Sin resultados'
                )}
              </p>
              {productos.length < total && (
                <p className="text-xs text-neutral-400 hidden sm:block">
                  Mostrando {productos.length} de {total}
                </p>
              )}
            </div>

            <ProductGrid productos={productos} />
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

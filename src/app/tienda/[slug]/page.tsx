import { notFound } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import ProductGallery from '@/components/tienda/ProductGallery'
import VariantSelector from '@/components/tienda/VariantSelector'
import ProductInfo from '@/components/tienda/ProductInfo'
import Breadcrumbs from '@/components/tienda/Breadcrumbs'
import ProductCard from '@/components/tienda/ProductCard'
import { getProductoBySlug, getRelacionados } from '@/lib/tienda/queries'

export const revalidate = 60

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const { slug } = await Promise.resolve(params)
  const producto = await getProductoBySlug(slug)
  if (!producto) {
    return { title: 'Producto no encontrado — Casa Turquesa' }
  }
  return {
    title: producto.meta_titulo ?? `${producto.nombre} — Casa Turquesa`,
    description:
      producto.meta_descripcion ??
      producto.descripcion_corta ??
      `${producto.nombre} en Casa Turquesa, Ñuñoa.`,
  }
}

export default async function ProductoDetalle({
  params,
}: {
  params: Promise<{ slug: string }> | { slug: string }
}) {
  const { slug } = await Promise.resolve(params)
  const producto = await getProductoBySlug(slug)

  if (!producto) {
    notFound()
  }

  const relacionados = await getRelacionados({
    categoriaId: producto.categoria_id,
    excluirId: producto.id,
    limit: 4,
  })

  const esBorrador = producto.estado === 'borrador'

  const breadcrumbs = [
    { label: 'Tienda', href: '/tienda' },
    ...(producto.categoria
      ? [{ label: producto.categoria.nombre, href: `/tienda?categoria=${producto.categoria.slug}` }]
      : []),
    { label: producto.nombre },
  ]

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-20">
        <Breadcrumbs items={breadcrumbs} />

        {esBorrador && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 text-sm text-amber-900 flex items-center gap-3 mb-6">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>
              <strong className="font-semibold">Borrador:</strong> este producto aún no está publicado.
            </span>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <ProductGallery
              imagenes={producto.imagenes}
              nombre={producto.nombre}
              marca={producto.marca}
            />
          </div>

          <div>
            {producto.marca && (
              <span className="text-[11px] uppercase tracking-[0.3em] text-neutral-500 mb-3 block">
                {producto.marca}
              </span>
            )}

            <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-4">
              {producto.nombre}
            </h1>

            <div className="flex flex-wrap gap-2 mb-5">
              {producto.sin_gluten && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 border border-amber-200 text-amber-900 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                  Sin gluten
                </span>
              )}
              {producto.vegano && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  Vegano
                </span>
              )}
              {producto.vegetariano && !producto.vegano && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-lime-50 border border-lime-200 text-lime-900 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-lime-500" />
                  Vegetariano
                </span>
              )}
              {producto.destacado && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-amber-900 text-xs font-medium">
                  ★ Destacado
                </span>
              )}
            </div>

            {producto.descripcion_corta && (
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed mb-6">
                {producto.descripcion_corta}
              </p>
            )}

            <div className="bg-white rounded-2xl p-6 border border-neutral-200 mb-6">
              <VariantSelector
                variantes={producto.variantes}
                productoId={producto.id}
                productoNombre={producto.nombre}
                productoMarca={producto.marca}
                productoSlug={producto.slug}
                imagenes={producto.imagenes}
              />
            </div>

            {producto.descripcion_larga && (
              <div className="prose prose-neutral max-w-none mb-8">
                <h2 className="font-serif text-xl text-neutral-900 mb-3">Sobre este producto</h2>
                <p className="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                  {producto.descripcion_larga}
                </p>
              </div>
            )}

            <ProductInfo producto={producto} />
          </div>
        </div>

        {relacionados.length > 0 && (
          <section className="mt-20 pt-12 border-t border-neutral-200">
            <div className="flex items-baseline justify-between mb-6">
              <h2 className="font-serif text-2xl md:text-3xl text-neutral-900">
                Productos relacionados
              </h2>
              {producto.categoria && (
                <a
                  href={`/tienda?categoria=${producto.categoria.slug}`}
                  className="text-sm text-[#2C5F5D] hover:underline"
                >
                  Ver toda la categoría →
                </a>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
              {relacionados.map(p => (
                <ProductCard key={p.id} producto={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

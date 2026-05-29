import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import MenuNav from '@/components/menu/MenuNav'
import MenuSearch from '@/components/menu/MenuSearch'
import { getMenuFromSheet } from '@/lib/sheets/menu'
import type { MenuCategoria } from '@/lib/sheets/menu'
import { SITE_URL, BUSINESS_INFO } from '@/lib/business-info'

export const revalidate = 300

export const metadata: Metadata = {
  title: 'Menú | Cafetería y brunch en Ñuñoa',
  description:
    'Carta de Casa Turquesa: café de especialidad, bowls, tostadas, sándwiches, postres y opciones veganas, sin gluten y keto en Av. Ortúzar 250, Ñuñoa.',
  alternates: { canonical: '/menu' },
  openGraph: {
    title: 'Menú | Casa Turquesa',
    description:
      'Café de especialidad, brunch, bowls y opciones veganas, sin gluten y keto en Ñuñoa.',
    url: `${SITE_URL}/menu`,
    images: [{ url: BUSINESS_INFO.ogImage, width: 1200, height: 630 }],
  },
}

function totalItems(cat: MenuCategoria): number {
  return (
    cat.subcategorias.reduce((acc, s) => acc + s.items.length, 0) +
    cat.itemsSinSubcategoria.length
  )
}

export default async function MenuPage() {
  let categorias: MenuCategoria[] = []
  try {
    categorias = await getMenuFromSheet()
  } catch {
    categorias = []
  }
  const total = categorias.reduce((acc, c) => acc + totalItems(c), 0)

  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />

      <section className="relative pt-12 pb-10 md:pt-16 md:pb-14 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#2C5F5D] font-medium mb-4">
            Carta
          </span>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-4 leading-tight">
            Nuestro menú
          </h1>
          <p className="text-base md:text-lg text-neutral-600 leading-relaxed">
            Café de especialidad, bowls, tostadas y opciones para todos los gustos.
            Hecho con ingredientes frescos y mucho cariño.
          </p>

          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-xl mx-auto text-sm">
            <div className="bg-white/60 rounded-xl px-4 py-3 border border-neutral-200/60">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#2C5F5D] mb-1">Horario</div>
              <div className="text-neutral-700 text-xs leading-snug space-y-0.5">
                <div>Lun-Vie: 7:30 a 21:00 hrs</div>
                <div>Sáb-Dom-Festivos: 9:00 a 21:00 hrs</div>
              </div>
            </div>
            <div className="bg-white/60 rounded-xl px-4 py-3 border border-neutral-200/60">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#2C5F5D] mb-1">Dirección</div>
              <div className="text-neutral-700 text-xs">Av. Ortúzar 250, Ñuñoa</div>
            </div>
            <div className="bg-white/60 rounded-xl px-4 py-3 border border-neutral-200/60">
              <div className="text-[10px] uppercase tracking-[0.2em] text-[#2C5F5D] mb-1">Reservas</div>
              <div className="text-neutral-700 text-xs">Por WhatsApp</div>
            </div>
          </div>
        </div>
      </section>

      {total === 0 ? (
        <section className="px-4 py-20 text-center max-w-xl mx-auto">
          <div className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center">
            <svg className="w-8 h-8 text-[#2C5F5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-neutral-900 mb-3">Estamos actualizando el menú</h2>
          <p className="text-neutral-600 mb-6">
            Por favor consulta por WhatsApp +56 9 3499 0617.
          </p>
          <a
            href="https://wa.me/56934990617?text=Hola%20Casa%20Turquesa%2C%20me%20gustar%C3%ADa%20conocer%20la%20carta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
          >
            Consultar por WhatsApp
          </a>
        </section>
      ) : (
        <section className="px-4 sm:px-6 lg:px-8 pb-20">
          <div className="max-w-5xl mx-auto">
            <MenuNav categorias={categorias} />
            <MenuSearch categorias={categorias} />

            <div className="mt-16 pt-10 border-t border-neutral-200 text-center max-w-2xl mx-auto">
              <p className="text-xs text-neutral-500 italic mb-4">
                Los precios y disponibilidad pueden variar. Si tenés alergias o preferencias especiales,
                consultanos al pedir.
              </p>
              <a
                href="https://wa.me/56934990617?text=Hola%20Casa%20Turquesa%2C%20quisiera%20hacer%20una%20reserva"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                Hacer una reserva
              </a>
            </div>
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

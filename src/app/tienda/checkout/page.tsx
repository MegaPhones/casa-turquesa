import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'
import CheckoutForm from '@/components/tienda/CheckoutForm'
import CheckoutSummary from '@/components/tienda/CheckoutSummary'

export const metadata = {
  title: 'Confirmar pedido — Casa Turquesa',
  description: 'Completá tus datos para coordinar tu pedido por WhatsApp.',
}

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-14">
        <div className="mb-10">
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-xs text-neutral-600 hover:text-[#2C5F5D] mb-4 uppercase tracking-[0.2em]"
          >
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Volver a la tienda
          </Link>
          <h1 className="font-serif text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight">
            Confirmar pedido
          </h1>
          <p className="text-neutral-600 mt-3 max-w-2xl">
            Completá tus datos y enviá el pedido por WhatsApp. Casa Turquesa te confirmará disponibilidad y coordinará el envío.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-8 lg:gap-12">
          <div className="order-2 lg:order-1">
            <CheckoutForm />
          </div>

          <div className="order-1 lg:order-2">
            <div className="lg:sticky lg:top-24">
              <CheckoutSummary />
            </div>
          </div>
        </div>
      </div>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

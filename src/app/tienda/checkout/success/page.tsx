import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export const metadata = {
  title: 'Pedido enviado — Casa Turquesa',
  description: 'Tu pedido fue enviado por WhatsApp.',
}

export default function CheckoutSuccessPage() {
  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />

      <section className="px-4 py-20 lg:py-28">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-24 h-24 mx-auto mb-8 rounded-full bg-emerald-100 flex items-center justify-center relative">
            <div className="absolute inset-0 rounded-full bg-emerald-100 animate-ping opacity-40" />
            <svg className="w-12 h-12 text-emerald-600 relative z-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
            </svg>
          </div>

          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#2C5F5D] font-medium mb-3">
            Pedido enviado
          </span>
          <h1 className="font-serif text-4xl md:text-5xl text-neutral-900 mb-5 leading-tight">
            ¡Gracias por tu pedido!
          </h1>
          <p className="text-base md:text-lg text-neutral-600 mb-10 leading-relaxed">
            Tu pedido fue enviado por WhatsApp a Casa Turquesa. Vamos a confirmarte la disponibilidad,
            el costo de despacho y la forma de pago lo antes posible.
          </p>

          <div className="bg-white rounded-2xl border border-neutral-200 p-6 md:p-8 mb-10 text-left">
            <h2 className="font-serif text-lg text-neutral-900 mb-4">¿Qué sigue?</h2>
            <ol className="space-y-4">
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2C5F5D] text-white text-xs font-bold flex items-center justify-center">1</span>
                <div>
                  <p className="text-sm text-neutral-900 font-medium">Revisá tu WhatsApp</p>
                  <p className="text-xs text-neutral-600 mt-0.5">El mensaje quedó listo en tu WhatsApp para que lo envíes a Casa Turquesa.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2C5F5D] text-white text-xs font-bold flex items-center justify-center">2</span>
                <div>
                  <p className="text-sm text-neutral-900 font-medium">Esperá nuestra respuesta</p>
                  <p className="text-xs text-neutral-600 mt-0.5">Te confirmaremos disponibilidad, tiempos y costo de despacho.</p>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-[#2C5F5D] text-white text-xs font-bold flex items-center justify-center">3</span>
                <div>
                  <p className="text-sm text-neutral-900 font-medium">Coordinamos el pago y envío</p>
                  <p className="text-xs text-neutral-600 mt-0.5">Por transferencia o el método que prefieras, todo por el mismo chat.</p>
                </div>
              </li>
            </ol>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
            >
              Seguir comprando
            </Link>
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#2C5F5D] text-[#2C5F5D] text-sm uppercase tracking-[0.2em] hover:bg-[#2C5F5D] hover:text-white transition-all"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />
    </main>
  )
}

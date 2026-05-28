import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import WhatsAppButton from '@/components/WhatsAppButton'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#FAF8F4]">
      <Navbar />
      <section className="px-4 py-24 lg:py-32">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-[#2C5F5D]/10 flex items-center justify-center">
            <svg className="w-10 h-10 text-[#2C5F5D]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <span className="inline-block text-[11px] uppercase tracking-[0.3em] text-[#2C5F5D] font-medium mb-3">
            Producto no encontrado
          </span>
          <h1 className="font-serif text-4xl text-neutral-900 mb-4 leading-tight">
            Este producto no existe o ya no está disponible
          </h1>
          <p className="text-neutral-600 mb-8">
            Quizás cambió de nombre o lo dimos de baja. Te invitamos a explorar el resto de nuestra tienda.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tienda"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full bg-[#2C5F5D] text-white text-sm uppercase tracking-[0.2em] hover:bg-[#1f4644] transition-all"
            >
              Volver a la tienda
            </Link>
            <a
              href="https://wa.me/56934990617?text=Hola%20Casa%20Turquesa%2C%20busco%20un%20producto%20que%20no%20encuentro%20en%20la%20web."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-6 py-3 rounded-full border border-[#2C5F5D] text-[#2C5F5D] text-sm uppercase tracking-[0.2em] hover:bg-[#2C5F5D] hover:text-white transition-all"
            >
              Consultar por WhatsApp
            </a>
          </div>
        </div>
      </section>
      <Footer />
      <WhatsAppButton />
    </main>
  )
}

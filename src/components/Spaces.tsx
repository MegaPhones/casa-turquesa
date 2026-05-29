import Image from 'next/image'

const WHATSAPP_TALLERISTAS =
  'https://wa.me/56935227488?text=Hola%20Casa%20Turquesa%2C%20hago%20talleres%20y%20me%20interesa%20usar%20el%20espacio'

const CAPACIDADES = [
  { titulo: 'Rincones íntimos', descripcion: 'Grupos cómodos de 8 a 10 personas.' },
  {
    titulo: 'Zona principal y terraza',
    descripcion: 'Hasta 40 personas, con enchufes en cada pilar (ideal para computadores o aros de luz).',
  },
  { titulo: 'Local completo', descripcion: 'Para eventos masivos de más de 100 personas.' },
]

const VENTAJAS = [
  'Vitrina gratis frente a nuestros clientes habituales',
  'Ambiente cálido y acogedor, con estufas para el frío',
  'Enchufes en todos los pilares',
  'Días y horarios totalmente conversables',
  'Pet friendly',
  'Estacionamiento frente al local',
]

const PACKS = [
  { titulo: 'Pack dulce', detalle: 'Bebestible + pastel de la casa', precio: '$5.500' },
  { titulo: 'Pack salado', detalle: 'Bebestible + sándwich', precio: '$8.000' },
]

const TALLERES_PASADOS = ['Cosmética natural', 'Automaquillaje', 'Networking', 'Y muchos más']

export default function Spaces() {
  return (
    <section
      id="espacios"
      style={{ backgroundColor: '#FAF8F4', borderTop: '1px solid rgba(44,95,93,0.15)' }}
      className="py-20 md:py-[120px] px-5 md:px-12"
    >
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="max-w-3xl text-center mx-auto mb-16 md:mb-20">
          <p
            className="text-[11px] uppercase font-medium mb-4"
            style={{ color: '#2C5F5D', letterSpacing: '4px' }}
          >
            Para talleristas
          </p>
          <h2
            className="font-serif m-0 text-[32px] md:text-[52px]"
            style={{ lineHeight: 1.1, letterSpacing: '-1.5px', color: '#1a1a1a' }}
          >
            ¿Haces talleres o clases y buscas un{' '}
            <span className="italic" style={{ color: '#2C5F5D' }}>
              lugar estable
            </span>{' '}
            para realizarlas?
          </h2>
          <p
            className="mt-6 text-base md:text-lg leading-relaxed"
            style={{ color: '#555' }}
          >
            Tenemos el lugar perfecto para ti, en pleno Ñuñoa. Hablemos.
          </p>
          <a
            href={WHATSAPP_TALLERISTAS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full text-white text-xs uppercase tracking-[0.18em] font-medium transition-all hover:scale-[1.02] hover:bg-[#1f4644] no-underline"
            style={{ backgroundColor: '#2C5F5D' }}
          >
            Quiero armar mi taller acá →
          </a>
        </div>

        {/* DESTACADO: foto + arriendo $0 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center mb-16 md:mb-24">
          <div className="relative aspect-[4/5] rounded overflow-hidden">
            <Image
              src="/images/espacios/interior-2.jpg"
              alt="Zona principal de Casa Turquesa, mesas y vitrina"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
          <div
            className="bg-white p-8 md:p-12"
            style={{ borderLeft: '4px solid #2C5F5D', borderRadius: 4 }}
          >
            <p
              className="text-[11px] uppercase font-medium mb-3"
              style={{ color: '#888', letterSpacing: '2.5px' }}
            >
              Arriendo del espacio
            </p>
            <p
              className="font-serif m-0 mb-4"
              style={{
                fontSize: 'clamp(64px, 9vw, 96px)',
                lineHeight: 1,
                color: '#2C5F5D',
                letterSpacing: '-2px',
              }}
            >
              $0
            </p>
            <p
              className="text-base md:text-lg leading-relaxed m-0"
              style={{ color: '#1a1a1a' }}
            >
              Única condición: que tus asistentes hagan algún consumo durante el taller. Lo co-creamos contigo, a la carta o con un pack cerrado.
            </p>
          </div>
        </div>

        {/* CAPACIDAD */}
        <div className="mb-16 md:mb-24">
          <p
            className="text-[11px] uppercase font-medium mb-6 text-center"
            style={{ color: '#2C5F5D', letterSpacing: '3px' }}
          >
            Espacios que se acomodan a tu grupo
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {CAPACIDADES.map((c) => (
              <div
                key={c.titulo}
                className="bg-white p-6"
                style={{ borderRadius: 4, border: '0.5px solid rgba(44,95,93,0.15)' }}
              >
                <h3
                  className="font-serif m-0"
                  style={{ fontSize: 22, color: '#1a1a1a', lineHeight: 1.2 }}
                >
                  {c.titulo}
                </h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: '#555' }}>
                  {c.descripcion}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* POR QUÉ */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-8 md:gap-12 mb-16 md:mb-24 items-start">
          <div>
            <p
              className="text-[11px] uppercase font-medium mb-3"
              style={{ color: '#2C5F5D', letterSpacing: '4px' }}
            >
              Por qué hacer tu taller
            </p>
            <h3
              className="font-serif m-0"
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                lineHeight: 1.1,
                color: '#1a1a1a',
                letterSpacing: '-1px',
              }}
            >
              En{' '}
              <span className="italic" style={{ color: '#2C5F5D' }}>
                Casa Turquesa
              </span>
            </h3>
          </div>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-6 list-none p-0 m-0">
            {VENTAJAS.map((v) => (
              <li
                key={v}
                className="flex items-start gap-3 text-sm md:text-base"
                style={{ color: '#1a1a1a' }}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#2C5F5D"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ flexShrink: 0, marginTop: 2 }}
                  aria-hidden
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span>{v}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* COFFEE BREAK */}
        <div className="mb-16 md:mb-24">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p
              className="text-[11px] uppercase font-medium mb-3"
              style={{ color: '#2C5F5D', letterSpacing: '4px' }}
            >
              Coffee break
            </p>
            <h3
              className="font-serif m-0"
              style={{
                fontSize: 'clamp(28px, 3vw, 40px)',
                lineHeight: 1.1,
                color: '#1a1a1a',
                letterSpacing: '-1px',
              }}
            >
              Suma un coffee break para{' '}
              <span className="italic" style={{ color: '#2C5F5D' }}>
                tus asistentes
              </span>
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 max-w-3xl mx-auto">
            {PACKS.map((p) => (
              <div
                key={p.titulo}
                className="bg-white p-6 flex items-start justify-between gap-4"
                style={{ borderRadius: 4, border: '0.5px solid rgba(44,95,93,0.15)' }}
              >
                <div>
                  <p
                    className="text-[11px] uppercase font-medium mb-2"
                    style={{ color: '#888', letterSpacing: '2px' }}
                  >
                    {p.titulo}
                  </p>
                  <p
                    className="font-serif m-0"
                    style={{ fontSize: 18, color: '#1a1a1a', lineHeight: 1.3 }}
                  >
                    {p.detalle}
                  </p>
                </div>
                <p
                  className="font-serif m-0 whitespace-nowrap"
                  style={{ fontSize: 24, color: '#2C5F5D', fontWeight: 500 }}
                >
                  {p.precio}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* PRUEBA SOCIAL */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[11px] uppercase font-medium mb-5"
            style={{ color: '#2C5F5D', letterSpacing: '4px' }}
          >
            Talleres que ya han pasado por acá
          </p>
          <div className="flex flex-wrap justify-center gap-2 max-w-xl mx-auto">
            {TALLERES_PASADOS.map((t) => (
              <span
                key={t}
                className="inline-block px-4 py-2 rounded-full text-xs uppercase font-medium"
                style={{
                  border: '1px solid rgba(44,95,93,0.25)',
                  color: '#2C5F5D',
                  letterSpacing: '1.5px',
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* CTA FINAL */}
        <div className="text-center">
          <a
            href={WHATSAPP_TALLERISTAS}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-white text-sm uppercase tracking-[0.18em] font-medium transition-all hover:scale-[1.02] hover:bg-[#1f4644] no-underline"
            style={{ backgroundColor: '#2C5F5D' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Escríbenos por WhatsApp
          </a>
        </div>
      </div>
    </section>
  )
}

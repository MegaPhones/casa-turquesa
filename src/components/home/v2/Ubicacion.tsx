export default function Ubicacion() {
  return (
    <section
      style={{ backgroundColor: '#FAF8F4', borderTop: '1px solid rgba(44,95,93,0.1)' }}
      className="py-20 md:py-[120px] px-5 md:px-12"
    >
      <style>{`
        @keyframes ct-pin-ping {
          0% { transform: scale(1); opacity: 0.5 }
          70% { transform: scale(2.4); opacity: 0 }
          100% { transform: scale(2.4); opacity: 0 }
        }
        .ct-pin-ping { animation: ct-pin-ping 2s ease-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .ct-pin-ping { animation: none; opacity: 0; }
        }
      `}</style>
      <div className="max-w-7xl mx-auto">
        {/* Header centrado */}
        <div className="text-center mb-12 md:mb-16">
          <p
            className="text-[11px] uppercase font-medium mb-4"
            style={{ color: '#2C5F5D', letterSpacing: '4px' }}
          >
            Visitanos
          </p>
          <h2
            className="font-serif m-0 text-[36px] md:text-[56px]"
            style={{ lineHeight: 1.05, letterSpacing: '-1.5px', color: '#1a1a1a' }}
          >
            Te esperamos en{' '}
            <span className="italic" style={{ color: '#2C5F5D' }}>
              Ñuñoa.
            </span>
          </h2>
        </div>

        {/* Grid 2 cols (1.4fr 1fr) desktop / 1 col mobile */}
        <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-12">
          {/* IZQUIERDA: Mapa placeholder */}
          <div className="relative" style={{ aspectRatio: '16 / 10' }}>
            {/* TODO: reemplazar div placeholder con <iframe src={GOOGLE_MAPS_EMBED_URL} className="w-full h-full border-0 rounded" /> cuando Mauricio pegue el link */}
            <div
              className="absolute inset-0 overflow-hidden"
              style={{
                backgroundColor: '#E8E4DA',
                backgroundImage:
                  'linear-gradient(rgba(44,95,93,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(44,95,93,0.08) 1px, transparent 1px)',
                backgroundSize: '32px 32px',
                borderRadius: 4,
              }}
              role="img"
              aria-label="Mapa de Casa Turquesa en Av. Ortúzar 250, Ñuñoa (placeholder)"
            >
              {/* Calles simuladas */}
              <div
                className="absolute"
                style={{
                  top: '42%',
                  left: 0,
                  right: 0,
                  height: 8,
                  background: 'rgba(255,255,255,0.75)',
                }}
              />
              <div
                className="absolute"
                style={{
                  top: 0,
                  bottom: 0,
                  left: '55%',
                  width: 6,
                  background: 'rgba(255,255,255,0.75)',
                }}
              />
              <div
                className="absolute"
                style={{
                  top: '70%',
                  left: 0,
                  right: '40%',
                  height: 4,
                  background: 'rgba(255,255,255,0.55)',
                }}
              />

              {/* Pin central con pulse */}
              <div
                className="absolute"
                style={{ left: '50%', top: '50%', transform: 'translate(-50%,-50%)' }}
              >
                <div className="relative" style={{ width: 60, height: 60 }}>
                  <div
                    className="ct-pin-ping absolute inset-0 rounded-full"
                    style={{ backgroundColor: '#2C5F5D' }}
                    aria-hidden
                  />
                  <div
                    className="relative flex items-center justify-center rounded-full"
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#2C5F5D',
                      boxShadow: '0 4px 16px rgba(44,95,93,0.4)',
                      color: '#fff',
                    }}
                  >
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.6"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M17 8h1a4 4 0 0 1 0 8h-1" />
                      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4z" />
                      <line x1="6" y1="1" x2="6" y2="4" />
                      <line x1="10" y1="1" x2="10" y2="4" />
                      <line x1="14" y1="1" x2="14" y2="4" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Tag bottom-left */}
              <div
                className="absolute bg-white"
                style={{
                  bottom: 16,
                  left: 16,
                  padding: '8px 14px',
                  borderRadius: 999,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  fontSize: 12,
                  color: '#1a1a1a',
                }}
              >
                📍 Av. Ortúzar 250, Ñuñoa
              </div>
            </div>
          </div>

          {/* DERECHA: 3 cards apiladas */}
          <div className="flex flex-col gap-6">
            {/* Dirección */}
            <div
              className="bg-white p-5"
              style={{ borderRadius: 4, border: '0.5px solid rgba(44,95,93,0.15)' }}
            >
              <p
                className="text-[11px] uppercase font-medium mb-2"
                style={{ letterSpacing: '2px', color: '#888' }}
              >
                Dirección
              </p>
              <p
                className="font-serif m-0"
                style={{ fontSize: 22, color: '#1a1a1a', lineHeight: 1.2 }}
              >
                Av. Ortúzar 250
              </p>
              <p className="mt-1 text-sm" style={{ color: '#555' }}>
                Ñuñoa, Santiago de Chile
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=Casa+Turquesa+Ortuzar+250+Nunoa"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-xs uppercase pb-0.5 no-underline"
                style={{
                  color: '#2C5F5D',
                  letterSpacing: '1.5px',
                  borderBottom: '1px solid #2C5F5D',
                }}
              >
                Cómo llegar →
              </a>
            </div>

            {/* Horarios */}
            <div
              className="bg-white p-5"
              style={{ borderRadius: 4, border: '0.5px solid rgba(44,95,93,0.15)' }}
            >
              <p
                className="text-[11px] uppercase font-medium mb-3"
                style={{ letterSpacing: '2px', color: '#888' }}
              >
                Horarios
              </p>
              <p
                className="text-sm m-0"
                style={{ color: '#1a1a1a', lineHeight: 1.6 }}
              >
                <span style={{ color: '#2C5F5D', fontWeight: 500 }}>
                  Lunes a viernes:
                </span>{' '}
                7:30 a 21:00
              </p>
              <p
                className="text-sm mt-1.5 m-0"
                style={{ color: '#1a1a1a', lineHeight: 1.6 }}
              >
                <span style={{ color: '#2C5F5D', fontWeight: 500 }}>
                  Sáb, Dom y festivos:
                </span>{' '}
                9:00 a 21:00
              </p>
            </div>

            {/* CTA WhatsApp */}
            <a
              href="https://wa.me/56934990617"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-5 text-white transition-all hover:scale-[1.01] bg-[#2C5F5D] hover:bg-[#1f4644] no-underline"
              style={{ borderRadius: 4 }}
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="currentColor"
                style={{ flexShrink: 0 }}
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              <div className="flex-1">
                <p
                  className="text-[11px] uppercase m-0"
                  style={{ letterSpacing: '2px', opacity: 0.85 }}
                >
                  ¿Consultas?
                </p>
                <p className="font-serif m-0" style={{ fontSize: 20, lineHeight: 1.2 }}>
                  Escríbenos por WhatsApp
                </p>
              </div>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{ flexShrink: 0 }}
              >
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

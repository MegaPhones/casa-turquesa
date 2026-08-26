import type { Metadata } from 'next'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Política de Privacidad',
  description:
    'Política de privacidad de Casa Turquesa. Conoce cómo recopilamos, usamos y protegemos tus datos personales.',
  robots: { index: true, follow: true },
}

export default function PoliticaPrivacidad() {
  return (
    <>
      <Navbar />
      <main style={{
        maxWidth: 720,
        margin: '0 auto',
        padding: '120px 24px 80px',
        color: '#1a1a1a',
        lineHeight: 1.8,
        fontSize: 15,
      }}>
        <h1 style={{
          fontFamily: "'Fraunces', Georgia, serif",
          fontSize: 32,
          fontWeight: 600,
          color: '#2C5F5D',
          marginBottom: 8,
        }}>
          Política de Privacidad
        </h1>
        <p style={{ fontSize: 13, color: '#888', marginBottom: 40 }}>
          Última actualización: 26 de agosto de 2026
        </p>

        <Section title="Quiénes somos">
          <p>
            <strong>Casa Turquesa</strong> es una cafetería, tostaduría y espacio de talleres
            ubicada en Av. Ortúzar 250, Ñuñoa, Santiago de Chile. Puedes conocernos en{' '}
            <A href="https://casaturquesa.cl">casaturquesa.cl</A> y en Instagram como{' '}
            <A href="https://www.instagram.com/casaturquesa.cl/">@casaturquesa.cl</A>.
          </p>
        </Section>

        <Section title="Qué datos recopilamos">
          <p>
            Podemos recopilar tu nombre, número de teléfono y correo electrónico cuando:
          </p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>Te comunicas con nosotros por WhatsApp o Instagram Direct.</li>
            <li>Te inscribes a un taller o evento a través de nuestro sitio web.</li>
            <li>Postulas como tallerista mediante nuestros formularios.</li>
            <li>Interactúas con nuestros anuncios en Facebook o Instagram.</li>
          </ul>
        </Section>

        <Section title="Para qué usamos tus datos">
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li>Responder tus consultas y confirmar reservas o inscripciones.</li>
            <li>Agendar y coordinar talleres y eventos.</li>
            <li>Enviarte información sobre próximos talleres y novedades, solo si nos has contactado previamente.</li>
            <li>Medir la efectividad de nuestras publicaciones y anuncios para mejorar el servicio.</li>
          </ul>
        </Section>

        <Section title="Con quién compartimos tus datos">
          <p>
            No vendemos ni cedemos tus datos a terceros con fines comerciales. Compartimos información
            únicamente con los siguientes proveedores de servicio, en la medida necesaria para operar:
          </p>
          <ul style={{ paddingLeft: 20, margin: '8px 0' }}>
            <li><strong>Meta (Facebook/Instagram)</strong>: para la gestión de mensajes y publicidad.</li>
            <li><strong>Supabase</strong>: como proveedor de base de datos e infraestructura.</li>
            <li>Herramientas internas de gestión y automatización.</li>
          </ul>
        </Section>

        <Section title="Cookies y tecnologías de seguimiento">
          <p>
            Nuestro sitio web puede usar cookies técnicas necesarias para su funcionamiento
            y cookies de análisis para entender cómo se usa el sitio. Los anuncios de Meta
            pueden utilizar píxeles y tecnologías similares sujetas a las{' '}
            <A href="https://www.facebook.com/privacy/policy/">políticas de privacidad de Meta</A>.
          </p>
        </Section>

        <Section title="Tus derechos">
          <p>
            Puedes solicitar acceso, corrección o eliminación de tus datos personales en cualquier
            momento escribiéndonos a{' '}
            <A href="mailto:casaturquesa.cl@gmail.com">casaturquesa.cl@gmail.com</A>.
            Responderemos tu solicitud en un plazo razonable.
          </p>
        </Section>

        <Section title="Retención de datos">
          <p>
            Conservamos tus datos mientras sean necesarios para el propósito por el cual
            fueron recopilados, o mientras no solicites su eliminación.
          </p>
        </Section>

        <Section title="Cambios a esta política">
          <p>
            Podemos actualizar esta política de privacidad periódicamente. La fecha de última
            actualización se indica al inicio de esta página. Te recomendamos revisarla
            de vez en cuando.
          </p>
        </Section>

        <div style={{ marginTop: 48, paddingTop: 24, borderTop: '1px solid #e5e5e5', fontSize: 13, color: '#888' }}>
          <p>
            Si tienes dudas sobre esta política, escríbenos a{' '}
            <A href="mailto:casaturquesa.cl@gmail.com">casaturquesa.cl@gmail.com</A>.
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={{
        fontFamily: "'Fraunces', Georgia, serif",
        fontSize: 20,
        fontWeight: 500,
        color: '#2C5F5D',
        marginBottom: 8,
      }}>
        {title}
      </h2>
      {children}
    </section>
  )
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto:') ? undefined : '_blank'}
      rel={href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
      style={{ color: '#1ABFAA', textDecoration: 'underline', textUnderlineOffset: 2 }}
    >
      {children}
    </a>
  )
}

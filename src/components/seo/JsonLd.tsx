// Helper para inyectar JSON-LD structured data en cualquier página/componente.
// Se renderiza en el HTML SSR para que los crawlers lo lean.

export default function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  return (
    <script
      type="application/ld+json"
      // Usamos dangerouslySetInnerHTML porque es la forma canónica de inyectar
      // structured data — Next/React no escapa los `<` y `>` adentro del JSON.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

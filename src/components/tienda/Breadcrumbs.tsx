import Link from 'next/link'
import JsonLd from '@/components/seo/JsonLd'
import { SITE_URL } from '@/lib/business-info'

interface Crumb {
  label: string
  href?: string
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  // BreadcrumbList JSON-LD: incluye "Inicio" como primer ítem aunque no esté visualmente
  const allCrumbs: Crumb[] = [{ label: 'Inicio', href: '/' }, ...items]
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: allCrumbs.map((c, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: c.label,
      ...(c.href ? { item: c.href.startsWith('http') ? c.href : `${SITE_URL}${c.href}` } : {}),
    })),
  }

  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <nav aria-label="Breadcrumb" className="text-xs text-neutral-500 mb-6 overflow-x-auto whitespace-nowrap">
        <ol className="flex items-center gap-2">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-2">
              {i > 0 && (
                <svg className="w-3 h-3 text-neutral-300 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              )}
              {item.href ? (
                <Link href={item.href} className="hover:text-[#2C5F5D] transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-neutral-900 truncate max-w-[200px]">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  )
}

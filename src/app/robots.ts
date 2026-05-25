import type { MetadataRoute } from 'next'
import { SITE_URL } from '@/lib/business-info'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin', '/admin/*', '/api', '/api/*', '/_next/*', '/tienda/checkout', '/tienda/checkout/*'],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  }
}

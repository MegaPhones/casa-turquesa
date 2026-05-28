// Datos canónicos del negocio — fuente única de verdad para SEO, JSON-LD y UI.
// Cambios acá se propagan a sitemap, robots, metadata y schema.org.

export const SITE_URL = 'https://casaturquesa.cl'

export const BUSINESS_INFO = {
  legalName: 'Cafetería y Tienda de Alimentos Casa Turquesa',
  shortName: 'Casa Turquesa',
  url: SITE_URL,
  phone: '+56934990617',
  whatsappNumber: '56934990617',
  whatsappUrl: 'https://wa.me/56934990617',
  email: 'casaturquesa.cl@gmail.com',
  foundingDate: '2021-09-18',
  priceRange: '$$',
  currenciesAccepted: 'CLP',
  paymentAccepted: 'Cash, Credit Card, Debit Card, NFC Mobile Payment',
  address: {
    streetAddress: 'Av. Ortúzar 250',
    addressLocality: 'Ñuñoa',
    addressRegion: 'Región Metropolitana',
    postalCode: '7790771',
    addressCountry: 'CL',
  },
  geo: {
    latitude: -33.4519042,
    longitude: -70.5866452,
  },
  rating: {
    value: 4.6,
    count: 550,
  },
  social: {
    instagram: 'https://www.instagram.com/casaturquesa.cl/',
    tiktok: 'https://www.tiktok.com/@casaturquesa.cl',
    facebook: 'https://www.facebook.com/casaturquesacl',
  },
  openingHoursSpecification: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '07:30', closes: '21:00' },
    { dayOfWeek: ['Saturday', 'Sunday'], opens: '09:00', closes: '21:00' },
  ],
  cuisine: ['Café', 'Comida saludable', 'Brunch', 'Vegano', 'Sin gluten', 'Keto'],
  // RUTA DEL OG-IMAGE PROVISORIO (cambiar acá cuando subas la foto real del local 1200x630):
  ogImage: '/og-image.jpg',
  // hasMenu: la propia /menu del sitio (la URL externa de fu.do va sólo en Google Business Profile)
  hasMenu: `${SITE_URL}/menu`,
} as const

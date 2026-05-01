import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import { TrustBar } from '@/components/InstagramSection'
import Intro from '@/components/Intro'
import Products from '@/components/Products'
import Spaces from '@/components/Spaces'
import AIAgent from '@/components/AIAgent'
import InstagramGallery from '@/components/InstagramGallery'
import Footer from '@/components/Footer'
import MapSection from '@/components/MapSection'
import WhatsAppButton from '@/components/WhatsAppButton'
import { getPublicConfig } from '@/lib/supabase-server'

export const revalidate = 60

export default async function Home() {
  const config = await getPublicConfig().catch(() => ({} as Awaited<ReturnType<typeof getPublicConfig>>))
  const g = config.general ?? {}
  const ig = config.instagram ?? {}

  return (
    <main>
      <Navbar />
      <Hero title={g.hero_title} subtitle={g.hero_subtitle} />
      <TrustBar />
      <Intro />
      <Products />
      <InstagramGallery stats={ig} />
      <Spaces />
      <AIAgent />
      <MapSection />
      <Footer
        hoursWeekday={g.hours_weekday}
        hoursSaturday={g.hours_saturday}
        hoursSunday={g.hours_sunday}
        address={g.address}
        phone={g.phone}
        email={g.email}
      />
      <WhatsAppButton />
    </main>
  )
}

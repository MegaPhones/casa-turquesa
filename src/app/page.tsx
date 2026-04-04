import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Intro from '@/components/Intro'
import Products from '@/components/Products'
import Gallery from '@/components/Gallery'
import Spaces from '@/components/Spaces'
import AIAgent from '@/components/AIAgent'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Intro />
      <Products />
      <Gallery />
      <Spaces />
      <AIAgent />
      <Footer />
    </main>
  )
}

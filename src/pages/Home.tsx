import Navbar from '../components/Navbar'
import HeaderBanner from '../components/HeaderBanner'
import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import About from '../components/About'
import Services from '../components/Services'
import WhyUs from '../components/WhyUs'
import GlobalReach from '../components/GlobalReach'
import Offices from '../components/Offices'
import TradeDelegation from '../components/TradeDelegation'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import ScrollProgress from '../components/ui/ScrollProgress'

export default function Home() {
  return (
    <div className="bg-white">
      <ScrollProgress />
      <Navbar />
      <main>
        <HeaderBanner />
        <Hero />
        <Marquee />
        <About />
        <Services />
        <WhyUs />
        <GlobalReach />
        <Offices />
        <TradeDelegation />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

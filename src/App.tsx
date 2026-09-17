import AnnouncementBar from './components/AnnouncementBar'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Schedule from './components/Schedule'
import Faq from './components/Faq'
import Sponsors from './components/Sponsors'
import Apply from './components/Apply'
import Footer from './components/Footer'
import SectionDivider from './components/ui/SectionDivider'

export default function App() {
  return (
    <div id="top">
      <AnnouncementBar />
      <Navbar />

      <main>
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider alt />
        <Tracks />
        <SectionDivider />
        <Schedule />
        <SectionDivider alt />
        <Faq />
        <SectionDivider />
        <Sponsors />
        <SectionDivider alt />
        <Apply />
      </main>

      <Footer />
    </div>
  )
}

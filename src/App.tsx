import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Schedule from './components/Schedule'
import Footer from './components/Footer'

// Page structure: Nav -> Hero -> About -> Tracks -> Schedule -> Footer (Sponsors/FAQ/
// Contact live inside Footer, per SPEC.md section 5 - not separate
// top-level sections). Timeline was removed from the page.
export default function App() {
  return (
    <div id="top">
      <Navbar />

      <main>
        <Hero />
        <About />
        <Tracks />
        <Schedule />
      </main>

      <Footer />
    </div>
  )
}

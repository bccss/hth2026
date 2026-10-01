import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Tracks from './components/Tracks'
import Schedule from './components/Schedule'
import Footer from './components/Footer'

// Page structure: Nav -> Hero -> About -> Tracks -> Schedule -> Footer (Sponsors/FAQ/
// Contact live inside Footer, per SPEC.md section 5 - not separate
// top-level sections). Timeline was removed from the page.
// Scroll reveal: mark [data-reveal] elements [data-shown] the first time they
// enter view (CSS in index.css does the animation). A MutationObserver picks
// up elements mounted later, e.g. Schedule cards when switching day tabs.
// Without IntersectionObserver nothing is hidden (no js-reveal class).
function useScrollReveal() {
  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (!e.isIntersecting) return
          e.target.setAttribute('data-shown', '')
          io.unobserve(e.target)
        }),
      { threshold: 0.15 },
    )
    const watch = () => document.querySelectorAll('[data-reveal]:not([data-shown])').forEach((el) => io.observe(el))
    document.documentElement.classList.add('js-reveal')
    watch()
    const mo = new MutationObserver(watch)
    mo.observe(document.body, { childList: true, subtree: true })
    return () => {
      io.disconnect()
      mo.disconnect()
    }
  }, [])
}

export default function App() {
  useScrollReveal()
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

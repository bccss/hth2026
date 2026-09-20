import Reveal from './ui/Reveal'
import SectionHeader from './ui/SectionHeader'
import { tracks } from '../data/content'
import { steelBeamStructure } from '../assets/about'

/**
 * Tracks cards are drafted as blueprint panels — the same dark-ink,
 * cyan-grid, dashed-border, crop-marked language as the Hero countdown
 * card — instead of a decorative material texture. Keeps the section tied
 * to the site's one "blueprint" motif rather than inventing a new one.
 */
export default function Tracks() {
  return (
    <section id="tracks" className="relative overflow-hidden bg-bg-alt px-6 py-20">
      {/* Blueprint grid backdrop — pushed to the very back, faint */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      {/* Steel beam structure — clearly in front of the grid, behind the blueprint cards */}
      <img
        src={steelBeamStructure}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute left-1/2 top-1/2 z-[5] w-[60%] -translate-x-1/2 -translate-y-1/2 opacity-[0.18]"
      />

      <div className="relative z-10 mx-auto max-w-[1140px]">
        <SectionHeader title="Tracks" />

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tracks.map((track, i) => (
            <Reveal key={track.title} index={i}>
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-ink-border bg-ink text-left text-ink-text transition-[border-color,box-shadow] duration-300 hover:border-neon-blue/40 hover:shadow-[0_0_24px_rgba(79,216,255,0.25)]">
                {/* Blueprint grid fill, scaled to the card like the Hero card's */}
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 opacity-20"
                  style={{
                    backgroundImage:
                      'linear-gradient(var(--color-blueprint-line) 1px, transparent 1px), linear-gradient(90deg, var(--color-blueprint-line) 1px, transparent 1px)',
                    backgroundSize: '8% 8%',
                  }}
                />
                {/* Drafting crop marks at each corner */}
                <span aria-hidden="true" className="pointer-events-none absolute left-3 top-3 h-3 w-3 border-l-2 border-t-2 border-blueprint-line/70" />
                <span aria-hidden="true" className="pointer-events-none absolute right-3 top-3 h-3 w-3 border-r-2 border-t-2 border-blueprint-line/70" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-3 left-3 h-3 w-3 border-b-2 border-l-2 border-blueprint-line/70" />
                <span aria-hidden="true" className="pointer-events-none absolute bottom-3 right-3 h-3 w-3 border-b-2 border-r-2 border-blueprint-line/70" />

                <div className="relative p-8">
                  <span className="mb-1 block font-heading text-xs font-bold uppercase tracking-widest text-caution">
                    Track {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="mb-3 block text-xl font-bold text-white">{track.title}</span>
                  <p className="text-ink-text-muted">{track.description}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

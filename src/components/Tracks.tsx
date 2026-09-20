import Reveal from './ui/Reveal'
import { tracks } from '../data/content'

/**
 * Tracks cards are drafted as blueprint panels — the same dark-ink,
 * cyan-grid, dashed-border, crop-marked language as the Hero countdown
 * card — instead of a decorative material texture. Keeps the section tied
 * to the site's one "blueprint" motif rather than inventing a new one.
 */
export default function Tracks() {
  return (
    <section id="tracks" className="relative overflow-hidden bg-bg-alt px-6 py-20">
      {/* Blueprint grid backdrop, the same texture as the Hero countdown card */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            'linear-gradient(var(--color-ink) 1px, transparent 1px), linear-gradient(90deg, var(--color-ink) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-[1140px]">
        <div className="mb-12 text-center">
          <h2 className="text-5xl font-bold uppercase tracking-wide sm:text-6xl">Tracks</h2>
          <div
            aria-hidden="true"
            className="mx-auto mt-4 h-1.5 w-20 bg-[repeating-linear-gradient(45deg,var(--color-caution),var(--color-caution)_8px,var(--color-ink)_8px,var(--color-ink)_16px)]"
          />
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {tracks.map((track, i) => (
            <Reveal key={track.title} index={i}>
              <div className="relative overflow-hidden rounded-lg border-2 border-dashed border-ink-border bg-ink p-8 text-left text-ink-text">
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

                <span className="relative mb-3 block font-heading text-xs font-bold uppercase tracking-widest text-caution">
                  Track {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="relative mb-2 text-xl font-bold text-white">{track.title}</h3>
                <p className="relative text-ink-text-muted">{track.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

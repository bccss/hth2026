import { useMemo } from 'react'
import Button from './ui/Button'
import { useCountdown } from '../hooks/useCountdown'

const heroStats = [
  { num: '500+', label: 'Hackers' },
  { num: '24', label: 'Hours' },
  { num: '$15K+', label: 'Prizes' },
  { num: '11', label: 'Years Running' },
]

function pad(n: number) {
  return String(Math.max(n, 0)).padStart(2, '0')
}

export default function Hero() {
  // Placeholder target date — update once the real 2026 date is set.
  const target = useMemo(() => new Date('2026-10-24T09:00:00'), [])
  const { days, hours, minutes, seconds } = useCountdown(target)

  return (
    <section id="hero" className="relative overflow-hidden bg-bg-alt px-6 py-16 text-center sm:py-20">
      {/* [SVG PLACEHOLDER] pattern-blueprint.svg tiled low-opacity background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            'linear-gradient(#1a1a1a 1px, transparent 1px), linear-gradient(90deg, #1a1a1a 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
      />

      <div className="relative mx-auto max-w-[1140px]">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-dashed border-accent bg-white px-4 py-2 text-sm font-bold text-accent-dark">
          <span>🦺</span>
          Placeholder — dates &amp; theme not final
        </div>

        {/* [SVG PLACEHOLDER] mascot-hardhat.svg — BC eagle mascot in a hard hat, holding a laptop */}
        <div
          role="img"
          aria-label="Mascot placeholder"
          className="mx-auto mb-6 flex h-40 w-40 items-center justify-center rounded-md border-2 border-dashed border-border bg-white text-center text-xs font-bold text-text-muted"
        >
          MASCOT
          <br />
          PLACEHOLDER
        </div>

        <h1 className="mb-2 text-5xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Hack the <span className="text-accent">Heights</span>
        </h1>
        <p className="mb-2 font-heading text-xl font-semibold text-accent-dark">
          Boston College's Premier Student Hackathon
        </p>
        <p className="mb-6 text-text-muted">
          📅 October 24–25, 2026 (placeholder) &nbsp;·&nbsp; 📍 Boston College, Chestnut Hill, MA
        </p>

        <p className="mx-auto mb-8 max-w-xl text-text-muted">
          Where innovation meets community. Join 500+ fellow hackers for 24 hours of building
          something amazing — from complete beginners to seasoned developers, everyone is welcome.
        </p>

        <div className="mb-8 flex flex-wrap justify-center gap-4" aria-label="Countdown to event">
          {[
            { label: 'Days', value: days },
            { label: 'Hours', value: hours },
            { label: 'Minutes', value: minutes },
            { label: 'Seconds', value: seconds },
          ].map((unit) => (
            <div key={unit.label} className="min-w-20 rounded-md border border-border bg-white p-3">
              <span className="block font-heading text-3xl font-bold">{pad(unit.value)}</span>
              <span className="block text-xs uppercase tracking-wide text-text-muted">{unit.label}</span>
            </div>
          ))}
        </div>

        <div className="mb-12 flex flex-wrap justify-center gap-4">
          <Button href="#apply" size="lg">
            Apply Now
          </Button>
          <Button href="#about" size="lg" variant="secondary">
            Learn More
          </Button>
        </div>

        <div className="flex flex-wrap justify-center gap-10">
          {heroStats.map((stat) => (
            <div key={stat.label} className="text-center">
              <span className="block font-heading text-2xl font-bold text-accent">{stat.num}</span>
              <span className="block text-sm text-text-muted">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

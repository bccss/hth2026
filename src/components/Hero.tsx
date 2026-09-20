import { useMemo } from 'react'
import { motion, useReducedMotion } from 'motion/react'
import { MapPin } from '@phosphor-icons/react'
import Button from './ui/Button'
import { useCountdown } from '../hooks/useCountdown'
import { crane, cloud1, cloud2, cloud4 } from '../assets/about'

const countdownUnits = ['Days', 'Hours', 'Minutes', 'Seconds'] as const

function pad(n: number) {
  return String(Math.max(n, 0)).padStart(2, '0')
}

export default function Hero() {
  // Placeholder target date, update once the real 2026 date is set.
  const target = useMemo(() => new Date('2026-10-24T09:00:00'), [])
  const { days, hours, minutes, seconds } = useCountdown(target)
  const reduce = useReducedMotion()

  const values = [days, hours, minutes, seconds]

  const fadeUp = (i: number) => ({
    initial: reduce ? false : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay: reduce ? 0 : 0.1 + i * 0.08, ease: [0.16, 1, 0.3, 1] as const },
  })

  return (
    <section id="hero" className="relative overflow-hidden bg-bg-alt px-6 pb-16 pt-16 sm:pb-20 sm:pt-20 lg:pb-16">
      {/*
        Sky backdrop — the landing page opens on clear sky; the full
        construction site (buildings, ground clutter) only appears once you
        scroll into About. Fades into the section's own bg-alt by mid-height.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{ background: 'linear-gradient(to bottom, var(--color-sky), transparent 60%)' }}
      />

      {/* Clouds, low opacity. Sized in percent (not px) so they scale
          fluidly with the viewport, and drifting continuously all the way
          off one edge of the screen and back on from the other — some
          rightward, some leftward (see @keyframes cloud-drift-right/-left
          in index.css). Each still has a base left-[%] position: the
          animation overrides it while running, but under
          prefers-reduced-motion (where the global rule in index.css
          collapses the animation to a near-instant single pass) the clouds
          fall back to this visible on-screen spot instead of vanishing. */}
      <img
        src={cloud2}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -top-3 left-[6%] w-[12%] opacity-65 animate-[cloud-drift-right_42s_linear_infinite]"
      />
      <img
        src={cloud1}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute top-10 left-[38%] hidden w-[10%] opacity-55 animate-[cloud-drift-left_34s_linear_infinite] sm:block"
      />
      <img
        src={cloud4}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute top-2 left-[65%] hidden w-[13%] opacity-60 animate-[cloud-drift-right_54s_linear_infinite] lg:block"
      />

      {/* Crane, holding the countdown card — only at lg+, where there's room
          beside it. Sized as a percent of the viewport, not a fixed px
          height, so it scales fluidly instead of jumping at breakpoints.
          The wrapper clips to the crane's own aspect ratio halved, so only
          the top half (cab, jib, hook) shows in the Hero — the mast/base
          would only reappear if you scroll it into About's skyline. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-[15%] top-0 hidden w-[34%] overflow-hidden lg:block"
        style={{ aspectRatio: '124 / 225.5' }}
      >
        <img src={crane} alt="" className="block w-full opacity-95" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-[1140px] items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
        {/* Left: message */}
        <div className="text-center lg:text-left">
          <motion.p
            {...fadeUp(0)}
            className="mb-4 flex items-center justify-center gap-2 font-heading text-sm font-bold uppercase tracking-widest text-accent lg:justify-start"
          >
            <MapPin weight="bold" className="h-4 w-4" />
            Boston College · Oct 24-25, 2026 (TBC)
          </motion.p>

          <motion.h1 {...fadeUp(1)} className="mb-4 text-5xl font-bold tracking-tighter sm:text-6xl lg:text-7xl">
            Hack the <span className="text-accent">Heights</span>
          </motion.h1>

          <motion.p {...fadeUp(2)} className="mx-auto mb-8 max-w-md text-text-muted lg:mx-0">
            24 hours, one campus, and everything you need to build something real. Beginners and
            veterans build side by side.
          </motion.p>

          <motion.div {...fadeUp(3)} className="flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button href="#apply" size="lg">
              Apply Now
            </Button>
            <Button href="#about" size="lg" variant="secondary">
              Learn More
            </Button>
          </motion.div>
        </div>

        {/* Right: the "build permit" countdown card, drafted as a blueprint */}
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 20, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: reduce ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative mx-auto w-full max-w-sm overflow-hidden rounded-lg border-2 border-dashed border-ink-border bg-ink p-8 text-ink-text shadow-card lg:ml-[38%] lg:mt-[40%]"
        >
          {/* Blueprint grid, drawn in cyan lines on the ink (blueprint navy)
              fill. backgroundSize is a percent of the card's own box (not a
              fixed px), so the grid scales with the card instead of staying
              a fixed cell size. */}
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

          {/* Cable cue linking the card up to the illustrated crane's hook above */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-9 right-[50%] hidden h-9 w-px border-l-2 border-dashed border-ink-border/70 lg:block"
          />
          <div className="relative mb-6 flex items-center justify-between border-b border-dashed border-blueprint-line/50 pb-4">
            <span className="font-heading text-xs font-bold uppercase tracking-widest text-caution">
              Countdown
            </span>
            <span className="rounded-full bg-caution px-3 py-1 text-xs font-bold text-caution-ink">
              No. 2026
            </span>
          </div>


          <div className="relative grid grid-cols-4 gap-2">
            {countdownUnits.map((label, i) => (
              <div key={label} className="rounded-md border border-dashed border-blueprint-line/50 bg-white/[0.03] p-2 text-center">
                <span className="block font-heading text-2xl font-bold text-white sm:text-3xl">
                  {pad(values[i])}
                </span>
                <span className="block text-xs uppercase tracking-wide text-ink-text-muted">{label}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

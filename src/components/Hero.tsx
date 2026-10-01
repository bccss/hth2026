import { useEffect, useState } from 'react'
import Button from './ui/Button'
import HeroArt, { LiftingExcavator } from './ui/heroArt'

// Placeholder event date — swap once the real 2026 date is locked in.
const EVENT_DATE = new Date('2026-10-24T09:00:00')
const EVENT_DATE_LABEL = 'October 24, 2026'

// Live countdown to EVENT_DATE, ticking every second; clamps at zero.
function Countdown() {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000)
    return () => clearInterval(id)
  }, [])

  const total = Math.max(0, Math.floor((EVENT_DATE.getTime() - now) / 1000))
  const parts = [
    ['Days', Math.floor(total / 86400)],
    ['Hrs', Math.floor(total / 3600) % 24],
    ['Min', Math.floor(total / 60) % 60],
    ['Sec', total % 60],
  ] as const

  return (
    <div role="timer" aria-label="Time until Hack the Heights" className="mt-4 grid grid-cols-4 gap-2">
      {parts.map(([label, value]) => (
        <div key={label} className="rounded-md border-2 border-asphalt bg-asphalt py-2 text-center text-white">
          <div className="font-mono text-2xl font-extrabold tabular-nums">{String(value).padStart(2, '0')}</div>
          <div className="text-[10px] font-bold uppercase tracking-widest text-steel-lt">{label}</div>
        </div>
      ))}
    </div>
  )
}

// Steel-beam sign — wide steel plate, thick ink border, faint diagonal
// sheen, big white caps centered. Three of these make up the h1.
function Beam({ rotate = 0, className = '', children }: { rotate?: number; className?: string; children: string }) {
  return (
    <span
      aria-hidden="true"
      style={{
        transform: `rotate(${rotate}deg)`,
        backgroundImage: 'repeating-linear-gradient(135deg, transparent 0 60px, rgba(255,255,255,.07) 60px 62px)',
      }}
      className={`block border-[5px] border-asphalt bg-steel py-2 text-center font-display text-6xl uppercase tracking-widest text-white shadow-[0_8px_0_rgba(22,24,28,.25)] tall:py-3 tall:text-7xl [@media(min-width:1280px)_and_(min-height:820px)]:text-8xl ${className}`}
    >
      {children}
    </span>
  )
}

function CalendarIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0">
      <rect x={3} y={5} width={18} height={16} rx={2} />
      <line x1={3} y1={9} x2={21} y2={9} />
      <line x1={8} y1={3} x2={8} y2={7} />
      <line x1={16} y1={3} x2={16} y2={7} />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-5 w-5 shrink-0">
      <path d="M12 21s7-7.1 7-12a7 7 0 1 0-14 0c0 4.9 7 12 7 12z" />
      <circle cx={12} cy={9} r={2.5} />
    </svg>
  )
}

function InfoPanel() {
  return (
    <div className="relative z-10 w-full max-w-sm shrink-0 rounded-lg border-2 border-asphalt bg-white p-5 text-stone-text shadow-hard tall:p-6">
      <p className="flex items-center gap-2 text-base font-semibold">
        <CalendarIcon /> {EVENT_DATE_LABEL}
      </p>
      <p className="mt-2 flex items-center gap-2 text-base font-semibold">
        <PinIcon /> Boston College, Chestnut Hill, MA
      </p>

      <Button href="#register" size="lg" className="mt-5 w-full">
        Register
      </Button>

      <Countdown />
    </div>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] md:min-h-0 flex-col overflow-hidden bg-sky-lt"
    >
      <HeroArt className="absolute inset-0 h-full w-full" />

      <div className="relative z-[2] mx-auto flex w-full max-w-[1400px] flex-1 flex-col items-center justify-center gap-8 px-6 pt-6 pb-[14vh] md:hero-above-vehicles md:hero-below-jib md:flex-row md:items-center md:justify-between md:overflow-hidden">
        <h1 aria-label="Hack the Heights" className="relative flex w-full max-w-3xl flex-col gap-4 lg:max-w-4xl lg:gap-7">
          {/* Crane cables: run up behind the beams to the jib (the wrapper
              above is clipped at the jib's underside on md+). */}
          <span aria-hidden="true" className="absolute bottom-[10%] left-[20%] top-0 w-[3px] bg-asphalt md:-top-[100vh]" />
          <span aria-hidden="true" className="absolute bottom-[10%] left-[72%] top-0 w-[3px] bg-asphalt md:-top-[100vh]" />
          <Beam className="w-[92%]">Hack</Beam>
          <Beam rotate={-3} className="ml-[12%] w-[80%]">
            The
          </Beam>
          <Beam>Heights</Beam>
        </h1>

        {/* Panel held up by the excavator; column bottom sits on the grass on md+. */}
        <div className="flex w-full max-w-sm shrink-0 flex-col items-center md:hero-on-ground md:self-end">
          <InfoPanel />
          <LiftingExcavator className="-mt-0.5 hidden h-[18vh] w-auto tall:h-[min(24vh,220px)] md:block" />
        </div>
      </div>
    </section>
  )
}

import Button from './ui/Button'
import { trackLanes } from '../data/content'
import FossilArt from './ui/fossilArt'
import DirtArt from './ui/dirtArt'

// Shovel prop (foreground, pit depth layer) — self-contained, no shared
// symbol defs needed since it's only used here.
function Shovel({ className }: { className: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 64 230" className={className}>
      <rect x="28" y="24" width="8" height="112" rx="3" fill="#A9754A" stroke="#16181C" strokeWidth="3" />
      <path
        d="M14 30V14a8 8 0 018-8h20a8 8 0 018 8v16"
        fill="none"
        stroke="#16181C"
        strokeWidth="8"
        strokeLinecap="round"
      />
      <path
        d="M14 30V14a8 8 0 018-8h20a8 8 0 018 8v16"
        fill="none"
        stroke="#A9754A"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
      <rect x="24" y="130" width="16" height="16" rx="2" fill="#8A96A1" stroke="#16181C" strokeWidth="3" />
      <path
        d="M10 146h44l-4 46q-18 16-36 0z"
        fill="#8A96A1"
        stroke="#16181C"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <path d="M18 152l-2 32" stroke="#fff" strokeWidth="3" opacity={0.5} strokeLinecap="round" />
      <path d="M0 200q6-16 20-12t24-4q14-4 20 16q2 22-32 22T0 200z" fill="#4C331F" />
      <path d="M8 198q8-8 16-4M40 194q10-4 16 6" stroke="#6B4A2F" strokeWidth="4" fill="none" strokeLinecap="round" />
    </svg>
  )
}

// Excavation marker: a stake with a little pennant flag (site number).
function MarkerFlag({ n, colors }: { n: number; colors: [string, string] }) {
  return (
    <span className="inline-flex items-end gap-0" aria-hidden="true">
      <svg viewBox="0 0 60 40" className="h-8 w-12 tall:h-10 tall:w-14">
        <rect x={4} y={2} width={4} height={38} rx={1} fill="#A9754A" stroke="#16181C" strokeWidth={2} />
        <path d="M8 4h40l-8 9 8 9H8z" fill={colors[0]} stroke="#16181C" strokeWidth={2} strokeLinejoin="round" />
        <path d="M8 13h36" stroke={colors[1]} strokeWidth={3} />
      </svg>
      <span className="font-mono text-xs font-extrabold uppercase tracking-widest text-cream/80 tall:text-sm">Site {String(n).padStart(2, '0')}</span>
    </span>
  )
}

// Prize as a gold nugget embedded in the dirt.
const NUGGET = 'polygon(6% 14%, 38% 0, 78% 6%, 100% 38%, 94% 88%, 56% 100%, 12% 92%, 0 50%)'

// One dig site: marker flag, fossil pit, then the track info painted
// straight onto the dirt (no card) — SPEC.md section 3: both lanes share
// this component so they carry identical weight.
function DigSite({ lane, index }: { lane: (typeof trackLanes)[number]; index: number }) {
  return (
    <div data-reveal style={{ ['--d' as string]: `${index * 150}ms` }} className="flex flex-col items-center text-center">
      <MarkerFlag n={index + 1} colors={lane.fossil === 'eagle' ? ['#8A1538', '#BC9B6A'] : ['#FFC20E', '#16181C']} />
      <FossilArt kind={lane.fossil} className="mt-1 h-32 w-full max-w-[420px] drop-shadow-[0_6px_0_rgba(0,0,0,.25)] sm:h-40 tall:h-60" />

      <h3 className="mt-3 font-display text-3xl uppercase tracking-wide text-cream [text-shadow:2px_2px_0_#2b1b0e] tall:text-5xl">{lane.title}</h3>
      <p className="font-mono text-xs font-bold uppercase tracking-widest text-caution tall:text-sm">{lane.sublabel}</p>
      <p className="mt-2 hidden max-w-sm text-cream/80 sm:block tall:text-lg">{lane.description}</p>

      <div className="mt-3 flex flex-wrap justify-center gap-2 tall:mt-4">
        {lane.prizes.map((p) => (
          <span
            key={p.place}
            style={{ clipPath: NUGGET }}
            className="bg-gradient-to-br from-[#FFE27A] via-caution to-[#C98A00] px-4 py-1.5 text-sm font-extrabold text-asphalt tall:px-5 tall:py-2 tall:text-base"
          >
            {p.place} · {p.amount}
          </span>
        ))}
      </div>

      <div className="mt-4 tall:mt-6">
        <Button href="#register" size="md">
          Register
        </Button>
      </div>
    </div>
  )
}

export default function Tracks() {
  return (
    <section
      id="tracks"
      className="relative flex min-h-[calc(100vh-56px)] md:h-[calc(100vh-64px)] md:min-h-0 flex-col overflow-hidden px-6 py-6 sm:py-10"
      style={{ backgroundColor: '#5F432A' }}
    >
      {/* strata, rocks, ore pockets — plus an edge shadow for depth */}
      <DirtArt className="absolute inset-0 h-full w-full" />
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_50%_45%,transparent_45%,rgba(0,0,0,.45))]" />
      <div className="relative z-[2] mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-4 sm:gap-6 md:overflow-hidden tall:gap-10">
        <h2 data-reveal className="text-center font-display text-4xl uppercase tracking-wide text-caution [text-shadow:3px_3px_0_#2b1b0e] sm:text-5xl tall:text-6xl">
          Pick Your Dig Site
        </h2>

        <div className="relative grid w-full grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-8 tall:gap-12">
          {trackLanes.map((lane, i) => (
            <DigSite key={lane.title} lane={lane} index={i} />
          ))}
        </div>
      </div>

      {/* Shovels stuck in the dirt, centered in the gutters beside the dig sites —
          only on screens wide enough that the gutters can hold them. */}
      <Shovel className="pointer-events-none absolute bottom-8 left-[calc((100%-1200px)/4)] z-[1] hidden w-16 -translate-x-1/2 -rotate-[10deg] min-[1400px]:block" />
      <Shovel className="pointer-events-none absolute bottom-8 right-[calc((100%-1200px)/4)] z-[1] hidden w-16 translate-x-1/2 rotate-[12deg] min-[1400px]:block" />
    </section>
  )
}

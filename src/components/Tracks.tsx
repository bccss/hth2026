import Button from './ui/Button'
import { trackLanes } from '../data/content'

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

// Stone slab — STYLE_GUIDE.md section 3/4: stone skin, 10px radius,
// chiselled inner border. Single component fed by content.ts so both
// lanes carry identical weight (SPEC.md section 3) - no per-track styling.
function TrackSlab({ lane, index, raised }: { lane: (typeof trackLanes)[number]; index: number; raised?: boolean }) {
  return (
    <div
      className={`relative rounded-stone border-4 border-stone-border bg-stone p-3 text-left shadow-[6px_6px_0_rgba(0,0,0,.35)] ring-4 ring-inset ring-[#B8B2A7] sm:p-5 tall:p-8 ${raised ? 'sm:-translate-y-2' : ''}`}
    >
      <p className="font-mono text-xs font-extrabold uppercase tracking-widest text-rust tall:text-sm">
        Track {String(index + 1).padStart(2, '0')}
      </p>
      <h3 className="text-lg font-bold text-stone-text sm:text-2xl tall:text-4xl">{lane.title}</h3>
      <p className="text-sm text-stone-text-muted tall:text-lg">{lane.sublabel}</p>

      <div className="my-2 hidden h-16 items-center justify-center border-2 border-dashed border-stone-border bg-stone-border/10 text-center font-mono text-xs text-stone-text-muted sm:flex sm:h-24 tall:h-40 tall:text-sm">
        {lane.fossilEmoji} {lane.fossilLabel} (SVG, 320×200)
      </div>

      <p className="hidden text-stone-text-muted sm:block tall:text-lg">{lane.description}</p>

      <p className="mt-2 font-bold text-stone-text sm:mt-4 tall:text-lg">Prizes</p>
      <div className="mt-1 flex flex-wrap gap-1 tall:mt-2 tall:gap-2">
        {lane.prizes.map((p) => (
          <span key={p.place} className="border-2 border-asphalt bg-caution px-2.5 py-1 text-sm font-extrabold text-asphalt tall:px-3.5 tall:py-1.5 tall:text-base">
            {p.place} · {p.amount}
          </span>
        ))}
      </div>

      <div className="mt-3 sm:mt-5 tall:mt-7">
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
      style={{
        backgroundImage:
          'repeating-linear-gradient(0deg,transparent 0 90px,rgba(0,0,0,.14) 90px 96px), radial-gradient(circle, rgba(255,255,255,.1) 0 4px, transparent 5px), linear-gradient(#7A5A3A, var(--color-soil) 30%, #4C331F)',
        backgroundSize: 'auto, 70px 70px, auto',
      }}
    >
      <div className="relative z-[2] mx-auto flex w-full max-w-[1200px] flex-1 flex-col items-center justify-center gap-4 sm:gap-6 md:overflow-hidden tall:gap-10">
        <div className="mx-auto max-w-lg rounded-stone border-[3px] border-stone-border bg-stone px-6 py-4 tall:px-10 tall:py-5 text-center shadow-hard">
          <h2 className="font-heading text-xl font-bold text-stone-text sm:text-2xl tall:text-4xl">Pick Your Dig Site</h2>
        </div>

        <div className="relative grid w-full grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8 tall:gap-12">
          {trackLanes.map((lane, i) => (
            <TrackSlab key={lane.title} lane={lane} index={i} raised={i === 0} />
          ))}

        </div>
      </div>

      {/* Shovels stuck in the dirt, centered in the gutters beside the slabs —
          only on screens wide enough that the gutters can hold them. */}
      <Shovel className="pointer-events-none absolute bottom-8 left-[calc((100%-1200px)/4)] z-[1] hidden w-16 -translate-x-1/2 -rotate-[10deg] min-[1400px]:block" />
      <Shovel className="pointer-events-none absolute bottom-8 right-[calc((100%-1200px)/4)] z-[1] hidden w-16 translate-x-1/2 rotate-[12deg] min-[1400px]:block" />
    </section>
  )
}

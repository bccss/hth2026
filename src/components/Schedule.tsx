import { useLayoutEffect, useRef, useState, type CSSProperties, type RefObject } from 'react'
import { scheduleDays, type ScheduleEvent } from '../data/content'

// "The Pipeline" — weekend schedule as a sewer pipe on a brick wall. On md+
// the pipe drops out of a lit manhole (top right), runs left (row 1), U-bends
// down, runs right (row 2), then turns down into the sewer water. The pipe is
// one SVG path computed from the section's measured size, so it fills the
// space at any viewport without stretching. Event cards are HTML positioned
// on the same coordinates. Below xl (too narrow for 4 cards a row) it falls
// back to a single vertical pipe.

const INK = '#16181C'
const STEEL = '#8A96A1'
const STEEL_DK = '#6B7782'
const STEEL_HI = '#C3CCD3'
const PIPE_W = 34 // body width; outline adds 8
const R = 56 // corner radius

const brick = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='96' height='48'><rect width='96' height='48' fill='#2F3230'/><rect x='50' y='2' width='44' height='20' fill='#353836'/><rect x='2' y='26' width='44' height='20' fill='#2B2E2C'/><path d='M0 1.5H96M0 25.5H96M48 0V24M24 24V48M72 24V48' stroke='#1C1E1D' stroke-width='3'/></svg>",
)}")`

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof ResizeObserver === 'undefined') return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

// Whether the element is in the viewport (used to pause the water flow).
function useOnScreen(ref: RefObject<HTMLElement | null>) {
  const [on, setOn] = useState(false)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const io = new IntersectionObserver(([e]) => setOn(e.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [ref])
  return on
}

// All pipe/valve/card coordinates for a W x H section.
function layout(w: number, h: number, count: number) {
  const c1 = Math.ceil(count / 2)
  const c2 = count - c1
  const xL = 110
  const ladderX = w - 56
  const xR = w - 230 // pipe drops in and out on this line
  const mx = xR // manhole sits right above the outfall
  const waterTop = h - 64
  const y1 = Math.max(230, h * 0.3)
  const y2 = Math.max(y1 + 190, waterTop - 175)

  const d = [
    `M${mx} -30`,
    `V${y1 - R}`,
    `A${R} ${R} 0 0 1 ${mx - R} ${y1}`,
    `H${xL + R}`,
    `A${R} ${R} 0 0 0 ${xL} ${y1 + R}`,
    `V${y2 - R}`,
    `A${R} ${R} 0 0 0 ${xL + R} ${y2}`,
    `H${xR - R}`,
    `A${R} ${R} 0 0 1 ${xR} ${y2 + R}`,
    `V${waterTop - 36}`, // open end, just above the water
  ].join(' ')

  // row 1 flows right->left from the drop; row 2 left->right to the outfall
  const a1 = mx - R - 20
  const b1 = xL + R + 20
  const slot1 = (a1 - b1) / c1
  const a2 = xL + R + 20
  const b2 = xR - R - 20
  const slot2 = (b2 - a2) / Math.max(c2, 1)
  const stops = [
    ...Array.from({ length: c1 }, (_, i) => ({
      x: a1 - slot1 * (i + 0.5),
      y: y1,
      dir: -1,
      slot: slot1,
    })),
    ...Array.from({ length: c2 }, (_, i) => ({
      x: a2 + slot2 * (i + 0.5),
      y: y2,
      dir: 1,
      slot: slot2,
    })),
  ]
  return { d, mx, xL, xR, y1, y2, waterTop, ladderX, stops }
}

function Chevron({ x, y, dir }: { x: number; y: number; dir: 'l' | 'r' | 'd' }) {
  const p =
    dir === 'l'
      ? `M${x + 5} ${y - 8}L${x - 4} ${y}L${x + 5} ${y + 8}`
      : dir === 'r'
        ? `M${x - 5} ${y - 8}L${x + 4} ${y}L${x - 5} ${y + 8}`
        : `M${x - 8} ${y - 5}L${x} ${y + 4}L${x + 8} ${y - 5}`
  return <path d={p} fill="none" stroke="#fff" strokeOpacity={0.85} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
}

function Valve({ x, y, n }: { x: number; y: number; n: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r={25} fill="#FFC20E" stroke={INK} strokeWidth={4} />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4
        return <line key={i} x1={Math.cos(a) * 10} y1={Math.sin(a) * 10} x2={Math.cos(a) * 22} y2={Math.sin(a) * 22} stroke={INK} strokeWidth={3.5} />
      })}
      <circle r={11} fill="#FFC20E" stroke={INK} strokeWidth={3} />
      <text y={5} textAnchor="middle" fontSize={14} fontWeight={800} fill={INK}>
        {n}
      </text>
    </g>
  )
}

function Flange({ x, y, vertical = false }: { x: number; y: number; vertical?: boolean }) {
  return vertical ? (
    <rect x={x - 27} y={y - 6} width={54} height={12} rx={3} fill={STEEL_DK} stroke={INK} strokeWidth={3} />
  ) : (
    <rect x={x - 6} y={y - 27} width={12} height={54} rx={3} fill={STEEL_DK} stroke={INK} strokeWidth={3} />
  )
}

function PipeScene({ w, h, count }: { w: number; h: number; count: number }) {
  const L = layout(w, h, count)
  return (
    <>
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox={`0 0 ${w} ${h}`}>
        <defs>
          <linearGradient id="pipeline-cone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#FFEFB0" stopOpacity={0.42} />
            <stop offset="1" stopColor="#FFEFB0" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="pipeline-water" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#465A4E" />
            <stop offset="1" stopColor="#1E2622" />
          </linearGradient>
        </defs>

        {/* light shaft from the open manhole */}
        <polygon
          points={`${L.mx - 70},0 ${L.mx + 70},0 ${L.mx + 260},${h * 0.92} ${L.mx - 340},${h * 0.92}`}
          fill="url(#pipeline-cone)"
          className="hth-flicker"
        />

        {/* ladder down the right wall into the sewer */}
        {[L.ladderX - 22, L.ladderX + 22].map((x) => (
          <g key={x}>
            <line x1={x} y1={0} x2={x} y2={L.waterTop + 6} stroke={INK} strokeWidth={10} />
            <line x1={x} y1={0} x2={x} y2={L.waterTop + 6} stroke={STEEL} strokeWidth={5} />
          </g>
        ))}
        {Array.from({ length: Math.floor(L.waterTop / 40) }).map((_, i) => (
          <g key={i}>
            <line x1={L.ladderX - 22} y1={24 + i * 40} x2={L.ladderX + 22} y2={24 + i * 40} stroke={INK} strokeWidth={9} />
            <line x1={L.ladderX - 22} y1={24 + i * 40} x2={L.ladderX + 22} y2={24 + i * 40} stroke={STEEL_HI} strokeWidth={4} />
          </g>
        ))}

        {/* manhole opening the pipe drops out of */}
        <ellipse cx={L.mx} cy={0} rx={96} ry={30} fill="#0E0F10" stroke="#3A3F42" strokeWidth={6} />
        <text x={L.mx - 110} y={52} textAnchor="end" fontFamily="Anton, Impact, sans-serif" fontSize={36} fill="#FFC20E">
          START ↓
        </text>

        {/* the pipe: outline, body, shadow side, highlight, dashed sheen */}
        <g fill="none" strokeLinejoin="round">
          <path d={L.d} stroke={INK} strokeWidth={PIPE_W + 8} />
          <path d={L.d} stroke={STEEL} strokeWidth={PIPE_W} />
          <path d={L.d} stroke={STEEL_DK} strokeWidth={10} transform="translate(5 7)" />
          <path d={L.d} stroke={STEEL_HI} strokeWidth={9} transform="translate(-4 -7)" />
          <path d={L.d} stroke="#fff" strokeOpacity={0.6} strokeWidth={3.5} strokeDasharray="26 16" strokeLinecap="round" transform="translate(-4 -8)" />
        </g>
      </svg>

      {/* water flowing through the pipe and pouring out of the end. Its own
        promoted layer, so only this thin path repaints each frame; paused
        while the section is off-screen (see Schedule's [data-paused]). */}
      <svg aria-hidden="true" className="absolute inset-0 h-full w-full will-change-transform" viewBox={`0 0 ${w} ${h}`}>
        <g fill="none" strokeLinecap="round" className="hth-flow">
          <path d={L.d} stroke="#8FD8E6" strokeOpacity={0.55} strokeWidth={9} strokeDasharray="14 26" />
          <path d={`M${L.xR} ${L.waterTop - 36}V${L.waterTop + 4}`} stroke="#8FD8E6" strokeOpacity={0.8} strokeWidth={22} strokeDasharray="10 10" />
        </g>
      </svg>

      <svg aria-hidden="true" className="absolute inset-0 h-full w-full" viewBox={`0 0 ${w} ${h}`}>
        {/* couplings, flow chevrons, valves */}
        <Flange x={L.mx} y={(L.y1 - R) * 0.55} vertical />
        <Chevron x={L.mx} y={(L.y1 - R) * 0.8} dir="d" />
        <Flange x={L.xL} y={(L.y1 + L.y2) / 2} vertical />
        <Chevron x={L.xL} y={(L.y1 + L.y2) / 2 - 34} dir="d" />
        <Chevron x={L.xL} y={(L.y1 + L.y2) / 2 + 34} dir="d" />
        <Chevron x={L.xR} y={L.y2 + R + 26} dir="d" />
        {L.stops.map((s, i) => {
          const next = L.stops[i + 1]
          const dir = s.dir < 0 ? 'l' : 'r'
          return (
            <g key={i}>
              {next && next.y === s.y && <Flange x={(s.x + next.x) / 2} y={s.y} />}
              <Chevron x={s.x - s.dir * s.slot * 0.28} y={s.y} dir={dir} />
              <Chevron x={s.x + s.dir * s.slot * 0.28} y={s.y} dir={dir} />
              <line x1={s.x} y1={s.y + 22} x2={s.x} y2={s.y + 44} stroke={INK} strokeWidth={5} />
              <Valve x={s.x} y={s.y} n={i + 1} />
            </g>
          )
        })}

        {/* drips */}
        {[
          [L.xL + 6, L.y1 + R + 30],
          [(L.xL + L.mx) / 2, L.y1 + 40],
          [L.xR - 120, L.y2 + 40],
        ].map(([x, y], i) => (
          <path key={x} d={`M${x} ${y - 9}q6 9 0 13q-6-4 0-13z`} fill="#9ED3D6" className="hth-drip" style={{ ['--d' as string]: `${i * 0.9}s` }} />
        ))}

        {/* sewer water + outfall splash */}
        <path
          d={`M0 ${L.waterTop} q${w / 16} -8 ${w / 8} 0 t${w / 8} 0 t${w / 8} 0 t${w / 8} 0 t${w / 8} 0 t${w / 8} 0 t${w / 8} 0 t${w / 8} 0 V${h} H0z`}
          fill="url(#pipeline-water)"
          stroke={INK}
          strokeWidth={3}
        />
        {Array.from({ length: Math.floor(w / 140) }).map((_, i) => (
          <path
            key={i}
            d={`M${60 + i * 140} ${L.waterTop + 22 + (i % 2) * 16}q14-7 28 0`}
            fill="none"
            stroke="#B9D3C8"
            strokeOpacity={0.45}
            strokeWidth={3}
            strokeLinecap="round"
            className="hth-ripple"
            style={{ animationDelay: `${i * -0.7}s` }}
          />
        ))}
        {/* pipe mouth lip + splash where the outfall hits the water */}
        <rect x={L.xR - 25} y={L.waterTop - 44} width={50} height={12} rx={3} fill={STEEL_DK} stroke={INK} strokeWidth={3} />
        <path
          d={`M${L.xR - 36} ${L.waterTop + 8}q10-12 20-4M${L.xR + 16} ${L.waterTop + 4}q10-8 20 4`}
          fill="none"
          stroke="#D6EAE2"
          strokeWidth={3}
          strokeLinecap="round"
          className="hth-ripple"
        />
        <text x={L.xR + 34} y={L.waterTop - 14} fontFamily="Anton, Impact, sans-serif" fontSize={30} fill="#FFC20E">
          ← FINISH
        </text>
      </svg>
    </>
  )
}

function EventCard({ event, index = 0, className = '', style }: { event: ScheduleEvent; index?: number; className?: string; style?: CSSProperties }) {
  return (
    <div
      data-reveal
      style={{ ...style, ['--d' as string]: `${index * 80}ms` }}
      className={`rounded-md border-2 border-asphalt bg-pipe px-4 pb-3 pt-5 text-left shadow-[4px_4px_0_rgba(0,0,0,.45)] tall:px-5 tall:pb-4 tall:pt-6 ${className}`}
    >
      <span className="absolute -top-3 left-3 border-2 border-asphalt bg-caution px-2 py-0.5 font-display text-sm tracking-wide text-asphalt tall:text-base">
        {event.time}
      </span>
      <p className="font-heading text-lg font-bold leading-tight text-water tall:text-xl">{event.title}</p>
      {event.note && <p className="mt-0.5 text-sm text-pipe-text/80 tall:text-base">{event.note}</p>}
    </div>
  )
}

export default function Schedule() {
  const [active, setActive] = useState(scheduleDays[0].key)
  const day = scheduleDays.find((d) => d.key === active)!
  const [sceneRef, { w, h }] = useSize<HTMLDivElement>()
  const onScreen = useOnScreen(sceneRef)
  const L = layout(w, h, day.events.length)

  return (
    <section
      id="schedule"
      className="relative flex min-h-[calc(100vh-56px)] flex-col overflow-hidden text-pipe-text md:min-h-[calc(100vh-64px)] xl:h-[calc(100vh-64px)] xl:min-h-0"
      style={{
        backgroundImage: `radial-gradient(ellipse at 50% 50%, transparent 40%, rgba(0,0,0,.5)), ${brick}`,
      }}
    >
      {/* header sign + day tabs */}
      <div className="relative z-20 flex flex-wrap items-end gap-4 px-6 pt-6 xl:absolute xl:left-0 xl:top-0">
        <div className="-rotate-1 rounded-md border-2 border-asphalt bg-pipe px-6 py-4 shadow-[6px_6px_0_rgba(0,0,0,.45)]">
          <h2 className="font-display text-4xl uppercase tracking-wide text-caution md:text-5xl">The Pipeline</h2>
          <p className="mt-1 text-pipe-text">How the weekend flows — follow the pipe.</p>
          <p className="mt-2 hidden font-mono text-xs leading-relaxed text-pipe-text/70 xl:block">◉ valve = event · ‹ › = flow of time · yellow tab = time</p>
        </div>

        <div
          role="tablist"
          aria-label="Schedule day"
          className="flex gap-2 rounded-md border-2 border-asphalt bg-pipe p-1.5 shadow-[4px_4px_0_rgba(0,0,0,.45)]"
        >
          {scheduleDays.map((d) => {
            const selected = d.key === active
            return (
              <button
                key={d.key}
                role="tab"
                id={`tab-${d.key}`}
                aria-selected={selected}
                aria-controls="schedule-panel"
                onClick={() => setActive(d.key)}
                className={`rounded px-5 py-2 font-heading font-bold uppercase tracking-wide transition-colors ${
                  selected ? 'bg-caution text-asphalt' : 'text-pipe-text hover:bg-white/10'
                }`}
              >
                {d.label} <span className="font-normal normal-case opacity-80">· {d.day}</span>
              </button>
            )
          })}
        </div>
      </div>

      <div id="schedule-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="relative flex-1">
        {/* md+: the full pipe scene, sized to the section */}
        <div ref={sceneRef} data-paused={onScreen ? undefined : ''} className="absolute inset-0 hidden xl:block">
          {w > 0 && <PipeScene w={w} h={h} count={day.events.length} />}
          <ol>
            {day.events.map((event, i) => {
              const s = L.stops[i]
              const cw = Math.max(0, Math.min(250, s.slot - 24))
              return (
                <li key={event.time + event.title}>
                  <EventCard event={event} index={i} className="absolute z-10" style={{ left: s.x - cw / 2, top: s.y + 48, width: cw }} />
                </li>
              )
            })}
          </ol>
        </div>

        {/* phones: one vertical pipe */}
        <ol className="relative mx-6 my-8 flex flex-col gap-6 pl-16 md:mx-auto md:w-full md:max-w-2xl xl:hidden">
          <span aria-hidden="true" className="absolute bottom-0 left-4 top-0 w-8 border-x-4 border-asphalt" style={{ background: STEEL }} />
          {day.events.map((event, i) => (
            <li key={event.time + event.title} className="relative">
              <svg aria-hidden="true" viewBox="-27 -27 54 54" className="absolute -left-[62px] top-1 h-12 w-12">
                <Valve x={0} y={0} n={i + 1} />
              </svg>
              <EventCard event={event} index={i} className="relative" />
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

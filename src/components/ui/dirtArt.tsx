// Tracks backdrop: wavy soil strata getting darker with depth, roots from the
// surface, buried rocks, and ore pockets (gold, iron). Ores sit in
// the side margins and the centre gap so they never land behind text.
// 1600x900 viewBox with "slice" so it always fills the section.
import type { ReactNode } from 'react'

const INK = '#2B1B0E'

const STRATA = [
  { y: 0, fill: '#7A5A3A' },
  { y: 190, fill: '#6E4F32' },
  { y: 380, fill: '#5F432A' },
  { y: 560, fill: '#513822' },
  { y: 740, fill: '#432E1C' },
]

const wave = (y: number, amp: number, seed: number) =>
  `M0 ${y}` +
  Array.from({ length: 8 }, (_, i) => `Q${i * 200 + 100} ${y + (i % 2 ? amp : -amp) * (1 + ((i + seed) % 3) * 0.3)} ${(i + 1) * 200} ${y}`).join('') +
  `V900H0Z`

function Rock({ x, y, s = 1, fill = '#8C7A66' }: { x: number; y: number; s?: number; fill?: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M-22 6L-16-12 4-18 22-8 24 10 6 18-14 16Z" fill={fill} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M-12-8L2-13" stroke="#fff" strokeOpacity={0.25} strokeWidth={3} strokeLinecap="round" />
    </g>
  )
}

function Gold({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s * 1.9})`}>
      <path d="M-10 2L-6-8 4-10 11-2 8 8-4 10Z" fill="#FFC20E" stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M-4-5l5-1" stroke="#FFF3B0" strokeWidth={2.5} strokeLinecap="round" />
    </g>
  )
}

function Iron({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(1.7)`} fill="#A0522D" stroke={INK} strokeWidth={2}>
      <circle r={5} />
      <circle cx={10} cy={4} r={3.5} />
      <circle cx={4} cy={-8} r={3} />
    </g>
  )
}

// a pocket of ore sitting in a darker hollow
function Pocket({ x, y, children }: { x: number; y: number; children: ReactNode }) {
  return (
    <g>
      <ellipse cx={x} cy={y} rx={92} ry={56} fill="#000" opacity={0.22} />
      {children}
    </g>
  )
}

export default function DirtArt({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" className={className}>
      {STRATA.map((b, i) => (
        <path key={b.y} d={i === 0 ? 'M0 0H1600V900H0Z' : wave(b.y, 14, i)} fill={b.fill} />
      ))}
      {/* thin darker seams along each strata boundary */}
      {STRATA.slice(1).map((b, i) => (
        <path key={b.y} d={wave(b.y, 14, i + 1).replace(/V900H0Z$/, '')} fill="none" stroke="#000" strokeOpacity={0.18} strokeWidth={5} />
      ))}

      {/* roots from the surface */}
      <g fill="none" stroke="#3E2A1A" strokeLinecap="round" opacity={0.7}>
        <path d="M90 0q10 40-8 70t6 70" strokeWidth={5} />
        <path d="M82 70q-20 10-26 32" strokeWidth={3} />
        <path d="M1480 0q-12 50 10 90t-4 60" strokeWidth={5} />
        <path d="M1490 90q22 6 30 30" strokeWidth={3} />
        <path d="M760 0q6 26-6 44" strokeWidth={3} />
      </g>

      {/* buried rocks */}
      <Rock x={60} y={300} s={1.4} />
      <Rock x={1540} y={420} s={1.2} fill="#7D6C5A" />
      <Rock x={300} y={820} s={1.1} fill="#6F5F4E" />
      <Rock x={1270} y={840} s={1.5} fill="#6F5F4E" />
      <Rock x={800} y={620} s={0.9} />
      <Rock x={1430} y={160} s={0.8} />

      {/* ore pockets */}
      <Pocket x={130} y={520}>
        <Gold x={100} y={510} />
        <Gold x={140} y={540} s={0.8} />
        <Gold x={166} y={500} s={1.1} />
      </Pocket>
      <Pocket x={800} y={800}>
        <Gold x={784} y={798} />
      </Pocket>
      <Pocket x={1500} y={250}>
        <Iron x={1490} y={250} />
        <Gold x={1516} y={258} s={0.7} />
      </Pocket>
      <Pocket x={90} y={130}>
        <Gold x={70} y={130} s={0.9} />
        <Iron x={110} y={126} />
      </Pocket>
      <Pocket x={1540} y={820}>
        <Gold x={1520} y={824} />
        <Gold x={1560} y={810} s={0.7} />
      </Pocket>
      <Iron x={230} y={160} />
      <Iron x={1370} y={560} />
      <Gold x={800} y={330} s={0.7} />
      <Gold x={40} y={880} s={0.9} />

      {/* specks of grit */}
      {Array.from({ length: 40 }, (_, i) => (
        <circle key={i} cx={(i * 397) % 1600} cy={(i * 211) % 900} r={(i % 3) + 1.5} fill="#fff" opacity={0.07} />
      ))}
    </svg>
  )
}

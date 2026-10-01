// Hero background illustration — flat-vector construction scene. Split into
// small named pieces instead of one giant raw-SVG blob. Every "sits on the
// ground" shape is anchored to GROUND_Y so nothing floats above the grass.
//
// viewBox is 16:9 (1600x900) and the outer <svg> uses
// preserveAspectRatio="xMidYMax slice": on typical desktop screens nothing
// is cropped, wider screens lose a little sky, narrower ones lose the sides —
// the ground always stays pinned to the bottom.
//
// Vehicle/crane shapes use a small literal-hex palette (not Tailwind color
// tokens) — matching the richer tonal range (highlights, shadows, glass,
// chrome) a hand-illustrated vehicle needs, which a handful of theme tokens
// can't capture; same approach as campusArt.tsx before it. Chrome/UI-level
// colors (sky, grass, soil, sun) still use the real design tokens.
const GROUND_Y = 780
const VEHICLE_SCALE = 1.1

const INK = '#16181C'
const STEEL = '#3A434C'
const STEEL_LT = '#8A96A1'
const CAUTION = '#FFC20E'
const CAUTION_DK = '#D99A00'
const GLASS = '#8FCFF5'
const ORANGE = '#FF7A1A'
const WOOD = '#6B4A2F'
const WOOD_LT = '#8A6240'

// Faint sun — pale disc inside two soft halo rings, no outline or rays, so it
// sits back in the sky instead of competing with the title.
function Sun() {
  return (
    <g aria-hidden="true">
      <circle cx={150} cy={120} r={125} fill="#FFF3B0" className="hth-pulse" />
      <circle cx={150} cy={120} r={100} fill="#FFF0A8" opacity={0.5} />
      <circle cx={150} cy={120} r={78} fill="#FCE79A" />
    </g>
  )
}

function Birds() {
  const birds = [
    [560, 210, 1],
    [600, 190, 0.8],
    [640, 220, 0.9],
    [1020, 260, 1],
    [1065, 240, 0.75],
    [330, 330, 0.7],
  ]
  return (
    <g aria-hidden="true" fill="none" stroke={INK} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="hth-drift" style={{ ['--dur' as string]: '14s' }}>
      {birds.map(([x, y, k], i) => (
        <g key={x} transform={`translate(${x} ${y}) scale(${k})`}>
          <path d="M-14 0q7-8 14 0q7-8 14 0" className="hth-flap" style={{ animationDelay: `${i * -0.23}s` }} />
        </g>
      ))}
    </g>
  )
}

function Cloud({ x, y, scale = 1 }: { x: number; y: number; scale?: number }) {
  return (
    // outer <g> drifts (CSS translate), inner keeps its placement transform
    <g aria-hidden="true" className="hth-drift" style={{ ['--dur' as string]: `${18 + (x % 7) * 3}s` }}>
      <g transform={`translate(${x} ${y}) scale(${scale})`} className="fill-white">
      <ellipse cx={0} cy={0} rx={55} ry={26} />
      <ellipse cx={40} cy={-10} rx={38} ry={22} />
      <ellipse cx={-40} cy={-6} rx={34} ry={20} />
      </g>
    </g>
  )
}

// Two-layer skyline: a pale, faded far row (tall, simple silhouettes) and a
// darker near row with window grids and rooftop details. Bottoms sit on
// GROUND_Y.
type Top = 'flat' | 'step' | 'antenna' | 'spire' | 'slant'
type Building = { x: number; w: number; h: number; top?: Top }

const FAR: Building[] = [
  { x: 0, w: 110, h: 380, top: 'antenna' },
  { x: 120, w: 80, h: 300, top: 'step' },
  { x: 215, w: 120, h: 460, top: 'spire' },
  { x: 350, w: 90, h: 340 },
  { x: 455, w: 100, h: 420, top: 'slant' },
  { x: 700, w: 90, h: 360, top: 'step' },
  { x: 800, w: 130, h: 500, top: 'antenna' },
  { x: 945, w: 85, h: 320 },
  { x: 1045, w: 110, h: 440, top: 'spire' },
  { x: 1170, w: 90, h: 350, top: 'slant' },
  { x: 1275, w: 120, h: 410, top: 'step' },
  { x: 1410, w: 100, h: 330, top: 'antenna' },
  { x: 1525, w: 90, h: 390 },
]

const NEAR: Building[] = [
  { x: 20, w: 120, h: 260, top: 'step' },
  { x: 150, w: 90, h: 190 },
  { x: 330, w: 140, h: 300, top: 'antenna' },
  { x: 480, w: 80, h: 210, top: 'slant' },
  { x: 860, w: 110, h: 240, top: 'step' },
  { x: 980, w: 140, h: 320, top: 'antenna' },
  { x: 1130, w: 90, h: 200 },
  { x: 1300, w: 120, h: 270, top: 'slant' },
]

function Roof({ b, fill }: { b: Building; fill: string }) {
  const y = GROUND_Y - b.h
  const cx = b.x + b.w / 2
  switch (b.top) {
    case 'step':
      return <rect x={b.x + b.w * 0.2} y={y - 30} width={b.w * 0.6} height={30} fill={fill} />
    case 'antenna':
      return <rect x={cx - 3} y={y - 60} width={6} height={60} fill={fill} />
    case 'spire':
      return <path d={`M${b.x + b.w * 0.25} ${y}L${cx} ${y - 90}L${b.x + b.w * 0.75} ${y}z`} fill={fill} />
    case 'slant':
      return <path d={`M${b.x} ${y}L${b.x + b.w} ${y - 40}V${y}z`} fill={fill} />
    default:
      return null
  }
}

function CityscapeBackdrop() {
  return (
    <g aria-hidden="true">
      {/* far row — faded into the sky */}
      <g opacity={0.45}>
        {FAR.map((b) => (
          <g key={b.x}>
            <Roof b={b} fill="#A9BCCB" />
            <rect x={b.x} y={GROUND_Y - b.h} width={b.w} height={b.h} fill="#A9BCCB" />
          </g>
        ))}
      </g>

      {/* near row — solid, windows + roof ledge */}
      {NEAR.map((b, i) => {
        const fill = i % 2 ? '#6E7A86' : '#56616C'
        const cols = Math.floor((b.w - 16) / 22)
        const rows = Math.floor((b.h - 30) / 30)
        return (
          <g key={b.x}>
            <Roof b={b} fill={fill} />
            <rect x={b.x} y={GROUND_Y - b.h} width={b.w} height={b.h} fill={fill} />
            <rect x={b.x - 4} y={GROUND_Y - b.h} width={b.w + 8} height={8} fill={INK} opacity={0.35} />
            {Array.from({ length: rows * cols }).map((_, k) => (
              <rect
                key={k}
                x={b.x + 12 + (k % cols) * 22}
                y={GROUND_Y - b.h + 22 + Math.floor(k / cols) * 30}
                width={10}
                height={14}
                fill={k % 7 === 3 ? '#FCE79A' : '#DDF1FC'}
                opacity={0.75}
              />
            ))}
          </g>
        )
      })}
    </g>
  )
}

// Lattice tower crane — real cross-braced truss (not a flat striped bar),
// cab + counterweight on the jib. The title beams' cables (Hero.tsx) hang
// from its underside.
function MainCrane() {
  const towerX = 1500
  const towerTop = 40
  const towerBottom = GROUND_Y
  const jibLeft = -40
  const jibY = 110
  return (
    <g aria-hidden="true">
      {/* tower: two rails + cross-brace lattice */}
      <line x1={towerX} y1={towerTop} x2={towerX} y2={towerBottom} stroke={STEEL} strokeWidth={6} />
      <line x1={towerX + 46} y1={towerTop} x2={towerX + 46} y2={towerBottom} stroke={STEEL} strokeWidth={6} />
      {Array.from({ length: Math.ceil((towerBottom - towerTop) / 48) }).map((_, i) => {
        const y1 = towerTop + i * 48
        const y2 = Math.min(y1 + 48, towerBottom)
        const leftFirst = i % 2 === 0
        return (
          <line
            key={i}
            x1={leftFirst ? towerX : towerX + 46}
            y1={y1}
            x2={leftFirst ? towerX + 46 : towerX}
            y2={y2}
            stroke={STEEL}
            strokeWidth={4}
          />
        )
      })}
      <rect x={towerX - 14} y={towerBottom - 10} width={74} height={14} fill={STEEL} />

      {/* jib: two rails + cross-brace lattice, hangs off the tower top */}
      <line x1={jibLeft} y1={jibY} x2={towerX + 46} y2={jibY} stroke={CAUTION} strokeWidth={6} />
      <line x1={jibLeft} y1={jibY + 30} x2={towerX + 46} y2={jibY + 30} stroke={CAUTION} strokeWidth={6} />
      {Array.from({ length: Math.ceil((towerX + 46 - jibLeft) / 60) }).map((_, i) => {
        const x1 = jibLeft + i * 60
        const x2 = x1 + 60
        const topFirst = i % 2 === 0
        return (
          <line
            key={i}
            x1={x1}
            y1={topFirst ? jibY : jibY + 30}
            x2={Math.min(x2, towerX + 46)}
            y2={topFirst ? jibY + 30 : jibY}
            stroke={CAUTION_DK}
            strokeWidth={3.5}
          />
        )
      })}
      {/* apex + back-stay to tower top */}
      <path d={`M${towerX + 23} ${jibY - 60} L${jibLeft + 40} ${jibY} M${towerX + 23} ${jibY - 60} L${towerX + 90} ${jibY}`} stroke={STEEL} strokeWidth={4} fill="none" />
      <line x1={towerX + 23} y1={jibY - 60} x2={towerX + 23} y2={jibY} stroke={STEEL} strokeWidth={5} />

      {/* operator cab + counterweight at the tower end of the jib */}
      <rect x={towerX - 60} y={jibY + 2} width={56} height={36} fill={INK} stroke={STEEL} strokeWidth={3} />
      <rect x={towerX + 50} y={jibY + 8} width={70} height={30} rx={4} fill={CAUTION} stroke={INK} strokeWidth={3} />
      <rect x={towerX + 96} y={jibY + 14} width={22} height={18} fill={GLASS} stroke={INK} strokeWidth={2} />

    </g>
  )
}

// Grass with a darker underside + tufts, soil with darker strata and a few
// pebbles — cheap layering for depth.
function Ground() {
  return (
    <g aria-hidden="true">
      <rect x={0} y={GROUND_Y} width={1600} height={30} className="fill-grass" />
      <rect x={0} y={GROUND_Y} width={1600} height={5} fill="#7BAA52" />
      <rect x={0} y={GROUND_Y + 22} width={1600} height={8} fill="#4A7230" />
      {Array.from({ length: 40 }).map((_, i) => (
        <path key={i} d={`M${i * 40 + 12} ${GROUND_Y + 1}l4 -9l4 9`} fill="#4A7230" />
      ))}
      <rect x={0} y={GROUND_Y + 30} width={1600} height={90} className="fill-soil" />
      <rect x={0} y={GROUND_Y + 30} width={1600} height={6} fill="#4C331F" />
      <path d={`M0 ${GROUND_Y + 62}q400 -10 800 0t800 0v10q-400 -10 -800 0t-800 0z`} fill="#5C3F27" />
      <path d={`M0 ${GROUND_Y + 92}q400 10 800 0t800 0v28H0z`} fill="#4C331F" />
      {[60, 230, 410, 590, 760, 950, 1130, 1310, 1490].map((x, i) => (
        <ellipse key={x} cx={x} cy={GROUND_Y + (i % 2 ? 50 : 82)} rx={7} ry={4} fill="#8A6240" />
      ))}
    </g>
  )
}

// Each vehicle below is drawn in its own small local coordinate space (same
// shape data proven to read well at hero scale) and placed via translate+
// scale so its own wheel-bottom lands exactly on GROUND_Y.

function DumpTruck({ x }: { x: number }) {
  const scale = VEHICLE_SCALE
  const localGroundY = 132 // wheel bottom in local coords
  return (
    <g aria-hidden="true" transform={`translate(${x} ${GROUND_Y - localGroundY * scale}) scale(${scale})`}>
      <rect x={12} y={88} width={226} height={14} rx={3} fill={STEEL} stroke={INK} strokeWidth={3} />
      <path d="M12 34h140l-18 54H12z" fill={CAUTION} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M14 72h118l-4 16H14z" fill={CAUTION_DK} />
      <path d="M40 34v54M74 34v54M108 34v54" stroke={CAUTION_DK} strokeWidth={3} />
      <path d="M14 34q24-24 56-16t60-2l22 18z" fill={WOOD} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M40 28q10-8 20-4M96 26q10-6 22-2" stroke={WOOD_LT} strokeWidth={4} fill="none" strokeLinecap="round" />
      <path d="M156 50h36l28 30v22h-64z" fill={CAUTION} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M164 58h24l18 22h-42z" fill={GLASS} stroke={INK} strokeWidth={2} />
      <path d="M168 62l10-1-8 14z" fill="#fff" opacity={0.6} />
      <rect x={222} y={82} width={12} height={10} rx={2} fill={ORANGE} stroke={INK} strokeWidth={2} />
      <rect x={220} y={96} width={20} height={8} fill={INK} />
      <circle cx={56} cy={108} r={24} fill={INK} />
      <circle cx={56} cy={108} r={12} fill={STEEL_LT} />
      <circle cx={56} cy={108} r={4} fill={INK} />
      <circle cx={100} cy={108} r={24} fill={INK} />
      <circle cx={100} cy={108} r={12} fill={STEEL_LT} />
      <circle cx={100} cy={108} r={4} fill={INK} />
      <circle cx={192} cy={108} r={24} fill={INK} />
      <circle cx={192} cy={108} r={12} fill={STEEL_LT} />
      <circle cx={192} cy={108} r={4} fill={INK} />
    </g>
  )
}

function CementMixer({ x }: { x: number }) {
  const scale = VEHICLE_SCALE
  const localGroundY = 130
  return (
    <g aria-hidden="true" transform={`translate(${x} ${GROUND_Y - localGroundY * scale}) scale(${scale})`}>
      <rect x={10} y={84} width={200} height={12} rx={3} fill={STEEL} stroke={INK} strokeWidth={3} />
      <path d="M24 26l100-10 18 60-118 6z" fill={ORANGE} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M44 26q12 26 4 60M70 22q14 28 6 62M98 20q14 30 8 60" stroke="#fff" strokeWidth={6} fill="none" strokeLinecap="round" />
      <path d="M24 26l-8 10 14 48" fill="none" stroke={INK} strokeWidth={3} />
      <path d="M124 16l22 2 4 18-8 4z" fill={STEEL} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M18 74l-14 20h30z" fill={STEEL_LT} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M142 52h36l28 28v18h-64z" fill={CAUTION} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M150 60h22l16 20h-38z" fill={GLASS} stroke={INK} strokeWidth={2} />
      <circle cx={52} cy={108} r={22} fill={INK} />
      <circle cx={52} cy={108} r={11} fill={STEEL_LT} />
      <circle cx={52} cy={108} r={4} fill={INK} />
      <circle cx={96} cy={108} r={22} fill={INK} />
      <circle cx={96} cy={108} r={11} fill={STEEL_LT} />
      <circle cx={96} cy={108} r={4} fill={INK} />
      <circle cx={178} cy={108} r={22} fill={INK} />
      <circle cx={178} cy={108} r={11} fill={STEEL_LT} />
      <circle cx={178} cy={108} r={4} fill={INK} />
    </g>
  )
}

// Excavator holding the hero's info panel up in its bucket. Rendered in the
// HTML layer (Hero.tsx), not the background scene, so the bucket stays under
// the panel at every viewport. Bucket top is centered at x=150, y=0.
export function LiftingExcavator({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 300 262">
      {/* tracks */}
      <rect x={10} y={222} width={170} height={38} rx={19} fill={INK} />
      <circle cx={31} cy={241} r={12} fill={STEEL_LT} />
      <circle cx={95} cy={241} r={9} fill={STEEL_LT} />
      <circle cx={159} cy={241} r={12} fill={STEEL_LT} />
      <circle cx={31} cy={241} r={4} fill={INK} />
      <circle cx={95} cy={241} r={3} fill={INK} />
      <circle cx={159} cy={241} r={4} fill={INK} />
      <rect x={26} y={204} width={138} height={20} rx={3} fill={STEEL} stroke={INK} strokeWidth={3} />
      {/* body + cab */}
      <rect x={14} y={166} width={30} height={40} rx={4} fill={STEEL} stroke={INK} strokeWidth={3} />
      <rect x={30} y={168} width={130} height={38} rx={4} fill={CAUTION} stroke={INK} strokeWidth={3} />
      <rect x={32} y={192} width={126} height={12} fill={CAUTION_DK} />
      <path d="M92 168V138q0-4 4-4h34l16 34z" fill={CAUTION} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M100 164V142h28l12 22z" fill={GLASS} stroke={INK} strokeWidth={2} />
      <path d="M104 160V148l8-2z" fill="#fff" opacity={0.6} />
      <rect x={54} y={148} width={6} height={20} fill={STEEL} stroke={INK} strokeWidth={2} />
      {/* boom (up and out) + stick (back in, to the bucket) */}
      <path d="M150 182L238 84 160 28" fill="none" stroke={INK} strokeWidth={22} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M150 182L238 84 160 28" fill="none" stroke={CAUTION} strokeWidth={14} strokeLinecap="round" strokeLinejoin="round" />
      <path d="M160 166L228 92" stroke={CAUTION_DK} strokeWidth={3} />
      {/* hydraulic ram */}
      <path d="M140 160L206 98" stroke={INK} strokeWidth={10} strokeLinecap="round" />
      <path d="M140 160L206 98" stroke={STEEL_LT} strokeWidth={5} strokeLinecap="round" />
      <circle cx={238} cy={84} r={6} fill={STEEL_LT} stroke={INK} strokeWidth={2} />
      <circle cx={150} cy={182} r={6} fill={STEEL_LT} stroke={INK} strokeWidth={2} />
      {/* bucket, flat side up, cradling the panel */}
      <path d="M104 2h92l-12 26h-68z" fill={STEEL} stroke={INK} strokeWidth={3} strokeLinejoin="round" />
      <path d="M112 8h76" stroke={STEEL_LT} strokeWidth={3} strokeLinecap="round" />
      <circle cx={160} cy={28} r={6} fill={STEEL_LT} stroke={INK} strokeWidth={2} />
    </svg>
  )
}

export default function HeroArt({ className = '' }: { className?: string }) {
  return (
    <svg aria-hidden="true" className={className} viewBox="0 0 1600 900" preserveAspectRatio="xMidYMax slice">
      {/* sky: deeper blue overhead fading to a pale haze at the horizon */}
      <defs>
        <linearGradient id="hero-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9FD3F3" />
          <stop offset="0.6" stopColor="#DDF1FC" />
          <stop offset="1" stopColor="#F3FAFE" />
        </linearGradient>
      </defs>
      <rect x={0} y={0} width={1600} height={GROUND_Y} fill="url(#hero-sky)" />
      <Sun />
      {/* faint distant clouds behind the main ones */}
      <g opacity={0.45}>
        <Cloud x={250} y={260} scale={0.6} />
        <Cloud x={980} y={200} scale={0.55} />
        <Cloud x={1420} y={300} scale={0.5} />
        <Cloud x={600} y={330} scale={0.45} />
      </g>
      <Cloud x={420} y={100} />
      <Cloud x={720} y={70} scale={0.8} />
      <Cloud x={1250} y={150} scale={0.9} />
      <Birds />

      {/* background + foreground construction props are dropped on mobile
          to keep the scene legible at narrow widths; sun/crane/ground stay */}
      <g className="hidden md:block">
        <CityscapeBackdrop />
      </g>

      <MainCrane />
      <Ground />

      <g className="hidden md:block">
        <DumpTruck x={60} />
        <CementMixer x={620} />
      </g>
    </svg>
  )
}

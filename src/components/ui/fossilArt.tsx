// Fossil dig pits for the Tracks section: a swooping eagle (BC Track) and a
// T-rex (Main Track), each exposed in an excavation pit cut into
// the dirt. Same flat-vector language as
// the hero art. Original drawings — not BC's logo.
const INK = '#3A342C'
const BONE = '#F2EAD8'
const PIT = '#3B2716'
const RIM = '#8A6240'
const AMBER = '#E8B54A'

type Pt = readonly [number, number]

// A bone: thick ink stroke with a bone-coloured stroke on top.
function Bone({ d, w = 6 }: { d: string; w?: number }) {
  return (
    <g fill="none" strokeLinecap="round" strokeLinejoin="round">
      <path d={d} stroke={INK} strokeWidth={w + 4} />
      <path d={d} stroke={BONE} strokeWidth={w} />
    </g>
  )
}

const line = (pts: readonly Pt[]) => 'M' + pts.map(([x, y]) => `${x} ${y}`).join('L')

function Joint({ x, y, r = 4 }: { x: number; y: number; r?: number }) {
  return <circle cx={x} cy={y} r={r} fill={BONE} stroke={INK} strokeWidth={2.5} />
}

const PIT_PATH = 'M30 60Q40 20 110 18Q200 10 262 24Q306 38 300 100Q306 160 250 182Q160 196 80 184Q20 170 22 120Q18 90 30 60Z'

function Pit() {
  return (
    <>
      <path d={PIT_PATH} fill={PIT} stroke={RIM} strokeWidth={5} strokeLinejoin="round" />
      {/* lit lower lip of the pit + loose pebbles */}
      <path d="M40 172Q160 200 262 176" fill="none" stroke="#A9805A" strokeWidth={3} strokeLinecap="round" />
      {[
        [56, 150, 5],
        [272, 64, 4],
        [244, 160, 6],
        [70, 46, 3],
      ].map(([x, y, r]) => (
        <ellipse key={x} cx={x} cy={y} rx={r} ry={r * 0.7} fill="#6B4A2F" />
      ))}
    </>
  )
}

// BC eagle fossil: the swooping-eagle mark (wings flung up with flame-edged
// feathers, diving body, fierce head, hooked golden beak, talons out) as a
// fossilised bone relief. Drawn in a ~460x460 space, scaled into the pit.
const BONE_DK = '#CDBF9F' // inner wing / feather grooves (the mark's maroon)

function Eagle() {
  const ink = { stroke: INK, strokeWidth: 7, strokeLinejoin: 'round' as const }
  return (
    <g>
      {/* tail, behind the body */}
      <path d="M215 352Q150 372 80 425Q135 424 170 410Q138 440 118 466Q190 440 232 392Z" fill={BONE} {...ink} />

      {/* left wing: broad crescent — inner edge bows up to the tip, outer edge
          comes back down in flame-shaped feather points */}
      <path
        d="M250 330Q215 160 75 28Q62 80 16 112Q52 138 70 150Q34 186 20 216Q68 220 96 228Q58 268 50 302Q106 292 140 300Q146 330 118 348Q186 342 250 330Z"
        fill={BONE}
        {...ink}
      />
      <path d="M240 322Q206 172 92 62Q118 168 168 228Q128 248 98 250Q150 298 230 318Z" fill={BONE_DK} />

      {/* right wing */}
      <path
        d="M290 326Q322 172 440 58Q450 100 460 140Q432 150 418 160Q456 190 458 224Q420 228 400 236Q432 270 430 302Q382 300 360 300Q362 328 382 346Q330 338 290 326Z"
        fill={BONE}
        {...ink}
      />
      <path d="M300 318Q330 182 424 86Q402 170 362 222Q396 240 410 252Q350 300 306 320Z" fill={BONE_DK} />

      {/* diving body with rib grooves */}
      <path d="M210 310Q265 285 315 320Q345 360 330 405Q295 430 250 410Q205 375 210 310Z" fill={BONE} {...ink} />
      {[336, 356, 376].map((y, i) => (
        <path key={y} d={`M${234 + i * 6} ${y}q24-10 48 4`} fill="none" stroke={BONE_DK} strokeWidth={7} strokeLinecap="round" />
      ))}

      {/* talons */}
      {[
        [258, 404, 252, 436],
        [300, 412, 302, 442],
      ].map(([hx, hy, fx, fy]) => (
        <g key={hx}>
          <Bone d={`M${hx} ${hy}L${fx} ${fy}`} w={16} />
          <Bone d={`M${fx} ${fy}q-16 2-20 18M${fx} ${fy}q-2 16-12 22M${fx} ${fy}q12 6 14 22`} w={8} />
        </g>
      ))}

      {/* fierce head: heavy brow, dark eye */}
      <path d="M290 320Q335 300 362 326Q378 352 360 374Q328 386 298 362Z" fill="#FFF8EA" {...ink} />
      <path d="M312 330l34 8" stroke={INK} strokeWidth={11} strokeLinecap="round" />
      <ellipse cx={338} cy={348} rx={7} ry={6} fill={INK} />
      {/* hooked golden beak */}
      <path d="M352 348Q382 344 386 374Q378 402 352 404Q360 386 344 376Z" fill={AMBER} {...ink} />
    </g>
  )
}

function TRex() {
  const spine: Pt[] = [
    [212, 90],
    [196, 83],
    [180, 79],
    [165, 77],
    [150, 78],
    [135, 80],
    [120, 84],
    [105, 89],
    [90, 95],
    [75, 102],
    [60, 110],
    [45, 118],
    [32, 126],
    [20, 134],
  ]
  return (
    <g>
      {/* back leg (behind), then ribs */}
      <Bone d="M118 96L128 138 114 168 134 182M134 182l8-2" w={6} />
      {spine.slice(1, 6).map(([x, y]) => (
        <Bone key={x} d={`M${x} ${y + 2}q-4 22-12 34`} w={3} />
      ))}

      {/* spine with vertebra spikes, tapering into the tail */}
      <Bone d={line(spine)} w={6} />
      {spine.map(([x, y], i) => (
        <g key={x}>
          <path d={`M${x} ${y - 3}l-2 -${i < 8 ? 9 : 6}`} stroke={INK} strokeWidth={3} strokeLinecap="round" />
          <Joint x={x} y={y} r={i < 8 ? 4 : 3} />
        </g>
      ))}

      {/* pelvis + front leg */}
      <path d="M108 84Q126 68 146 84L138 102 116 102Z" fill={BONE} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <Bone d="M130 98L150 136 138 166 160 180M160 180l10-2M160 180l6 6" w={7} />
      <Joint x={150} y={136} r={5} />

      {/* tiny arm */}
      <Bone d="M200 100L208 116 218 118M218 118l5 4M218 118l6-2" w={3} />

      {/* neck + skull with jaw and teeth */}
      <Bone d="M210 90Q222 80 238 74" w={6} />
      <path d="M244 82L288 84Q294 94 282 98L250 94Z" fill={BONE} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      <path d="M232 54L282 46Q302 50 298 68L290 82 262 86 240 80Z" fill={BONE} stroke={INK} strokeWidth={2.5} strokeLinejoin="round" />
      {[252, 260, 268, 276, 284].map((x) => (
        <path key={x} d={`M${x} 83l3 7 3-7`} fill="#fff" stroke={INK} strokeWidth={1.5} strokeLinejoin="round" />
      ))}
      <circle cx={260} cy={62} r={7} fill={INK} />
      <ellipse cx={286} cy={58} rx={4} ry={3} fill={INK} />
      <path d="M244 70l12-4M272 72l10 2" stroke={INK} strokeWidth={2} strokeLinecap="round" />
    </g>
  )
}

export default function FossilArt({ kind, className = '' }: { kind: 'eagle' | 'trex'; className?: string }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 320 200" className={className}>
      <Pit />
      {/* each skeleton scaled/centred into the pit */}
      {kind === 'eagle' ? (
        <g transform="translate(160 103) scale(0.375) translate(-238 -247)">
          <Eagle />
        </g>
      ) : (
        <g transform="translate(160 104) scale(0.86) translate(-160 -115)">
          <TRex />
        </g>
      )}
    </svg>
  )
}

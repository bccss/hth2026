// Construction tools hanging on the About section's pegboard. Each tool is
// drawn hanging from a metal pegboard hook at the top of its own viewBox and
// swings gently from that point (hth-swing in index.css).
import type { ReactNode } from 'react'

const INK = '#16181C'
const STEEL = '#8A96A1'
const STEEL_HI = '#C3CCD3'
const WOOD = '#A9754A'
const YELLOW = '#FFC20E'
const RED = '#C8402A'
const ink = { stroke: INK, strokeWidth: 3, strokeLinejoin: 'round' as const }

function Hook({ x }: { x: number }) {
  return (
    <g>
      <circle cx={x} cy={6} r={4} fill="#2B1B0E" />
      <path d={`M${x} 6v10q0 8 8 8`} fill="none" stroke={INK} strokeWidth={6} strokeLinecap="round" />
      <path d={`M${x} 6v10q0 8 8 8`} fill="none" stroke={STEEL_HI} strokeWidth={2.5} strokeLinecap="round" />
    </g>
  )
}

function Hammer() {
  return (
    <svg viewBox="0 0 70 150">
      <Hook x={30} />
      <path d="M12 26h40q6 0 6 6v8H12z" fill={STEEL} {...ink} />
      <path d="M12 26q-10 0-10 10q6-4 10-2z" fill={STEEL} {...ink} />
      <path d="M16 30h30" stroke={STEEL_HI} strokeWidth={3} strokeLinecap="round" />
      <rect x={30} y={40} width={10} height={104} rx={4} fill={WOOD} {...ink} />
      <rect x={30} y={112} width={10} height={32} rx={4} fill={INK} />
    </svg>
  )
}

function Wrench() {
  return (
    <svg viewBox="0 0 60 150">
      <Hook x={30} />
      <path d="M18 26a14 14 0 1 0 24 0l-4 12h-16z" fill={STEEL} {...ink} />
      <rect x={24} y={44} width={12} height={84} rx={5} fill={STEEL} {...ink} />
      <circle cx={30} cy={136} r={11} fill={STEEL} {...ink} />
      <circle cx={30} cy={136} r={5} fill="#3B2716" stroke={INK} strokeWidth={2} />
      <path d="M28 52v66" stroke={STEEL_HI} strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}

function Saw() {
  return (
    <svg viewBox="0 0 80 160">
      <Hook x={40} />
      <path d="M22 24h36q6 0 6 8v24q0 8-8 8H24q-8 0-8-8V32q0-8 6-8z" fill={WOOD} {...ink} />
      <rect x={30} y={34} width={20} height={18} rx={8} fill="#3B2716" stroke={INK} strokeWidth={2} />
      <path d="M22 64h36l-6 92h-24z" fill={STEEL} {...ink} />
      <path d="M30 72l-2 74" stroke={STEEL_HI} strokeWidth={3} strokeLinecap="round" />
      {Array.from({ length: 10 }, (_, i) => (
        <path key={i} d={`M${58 - i * 0.6} ${70 + i * 8.5}l6 4-6 4`} fill={STEEL} stroke={INK} strokeWidth={2} strokeLinejoin="round" />
      ))}
    </svg>
  )
}

function Level() {
  return (
    <svg viewBox="0 0 44 170">
      <Hook x={22} />
      <rect x={10} y={24} width={24} height={140} rx={4} fill={YELLOW} {...ink} />
      <rect x={14} y={30} width={4} height={128} fill="#fff" opacity={0.45} />
      {[44, 144].map((y) => (
        <rect key={y} x={15} y={y} width={14} height={8} rx={4} fill="#9BE07A" stroke={INK} strokeWidth={2} />
      ))}
      <rect x={13} y={86} width={18} height={22} rx={3} fill="#3B2716" stroke={INK} strokeWidth={2} />
      <rect x={17} y={90} width={10} height={14} rx={5} fill="#9BE07A" stroke={INK} strokeWidth={2} />
    </svg>
  )
}

function TapeMeasure() {
  return (
    <svg viewBox="0 0 90 110">
      <Hook x={40} />
      <rect x={14} y={26} width={60} height={56} rx={12} fill={YELLOW} {...ink} />
      <circle cx={44} cy={54} r={14} fill={INK} />
      <circle cx={44} cy={54} r={6} fill={STEEL} />
      <path d="M74 70h6v34h-8" fill={YELLOW} {...ink} />
      {[78, 86, 94].map((y) => (
        <path key={y} d={`M74 ${y}h4`} stroke={INK} strokeWidth={2} />
      ))}
      <rect x={18} y={74} width={20} height={6} rx={2} fill={INK} />
    </svg>
  )
}

function Screwdriver() {
  return (
    <svg viewBox="0 0 40 150">
      <Hook x={20} />
      <rect x={10} y={26} width={20} height={50} rx={8} fill={YELLOW} {...ink} />
      {[36, 48, 60].map((y) => (
        <path key={y} d={`M14 ${y}h12`} stroke={INK} strokeWidth={3} strokeLinecap="round" />
      ))}
      <rect x={17} y={76} width={6} height={60} fill={STEEL} {...ink} />
      <path d="M17 136h6l-1 10h-4z" fill={STEEL} {...ink} />
    </svg>
  )
}

function Pliers() {
  return (
    <svg viewBox="0 0 70 150">
      <Hook x={35} />
      <path d="M26 26l8 50M44 26l-8 50" stroke={INK} strokeWidth={12} strokeLinecap="round" />
      <path d="M26 26l8 50M44 26l-8 50" stroke={STEEL} strokeWidth={6} strokeLinecap="round" />
      <circle cx={35} cy={80} r={7} fill={STEEL} {...ink} />
      <path d="M33 84l-14 60M37 84l14 60" stroke={INK} strokeWidth={14} strokeLinecap="round" />
      <path d="M33 86l-13 56M37 86l13 56" stroke={RED} strokeWidth={8} strokeLinecap="round" />
    </svg>
  )
}

function Drill() {
  return (
    <svg viewBox="0 0 100 130">
      <Hook x={44} />
      <path d="M16 26h56q8 0 8 10v12q0 8-8 8H34v10H16z" fill={YELLOW} {...ink} />
      <rect x={80} y={34} width={10} height={14} fill={INK} />
      <path d="M90 38h8l-2 6h-6" fill={STEEL} {...ink} />
      <path d="M20 56h20l-4 44H16z" fill={INK} />
      <rect x={12} y={98} width={30} height={22} rx={4} fill={YELLOW} {...ink} />
      <path d="M22 34h44" stroke="#fff" strokeOpacity={0.5} strokeWidth={3} strokeLinecap="round" />
    </svg>
  )
}

export const TOOLS = { Hammer, Wrench, Saw, Level, TapeMeasure, Screwdriver, Pliers, Drill }

// A tool on its hook, swinging gently. `delay` (s) desyncs neighbours.
export function HangingTool({ tool, className = '', delay = 0 }: { tool: keyof typeof TOOLS; className?: string; delay?: number }): ReactNode {
  const Tool = TOOLS[tool]
  return (
    <span aria-hidden="true" className={`hth-swing block drop-shadow-[3px_4px_0_rgba(0,0,0,.35)] [&>svg]:h-full [&>svg]:w-full ${className}`} style={{ animationDelay: `${delay}s` }}>
      <Tool />
    </span>
  )
}

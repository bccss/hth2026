import { useState } from 'react'
import SectionHeader from './ui/SectionHeader'
import Reveal from './ui/Reveal'
import { faqs } from '../data/content'
import { building2, building4 } from '../assets/about'

/** Hex bolt head — hexagon + inner socket circle, used as the FAQ toggle instead of a plus/minus. */
function HexBolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className}>
      <path
        d="M12 2.5L20 7.25V16.75L12 21.5L4 16.75V7.25L12 2.5Z"
        fill="currentColor"
        fillOpacity="0.15"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default function Faq() {
  // Each card toggles independently (not a single shared index) — with a
  // shared index, opening one card also closes whichever other card was
  // open, and if that other card sits above it, the collapse pulls
  // everything below it upward at the same instant the clicked card grows
  // downward, reading as the card "expanding upward."
  const [openSet, setOpenSet] = useState<Set<number>>(new Set())

  const toggle = (i: number) => {
    setOpenSet((prev) => {
      const next = new Set(prev)
      if (next.has(i)) next.delete(i)
      else next.add(i)
      return next
    })
  }

  return (
    <section id="faq" className="relative overflow-hidden px-6 py-20">
      {/* Skyline buildings, big and faint, anchored to the bottom like the
          About backdrop — gives the section depth without competing with
          the steel plates in front. */}
      <img
        src={building2}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -left-16 bottom-0 z-0 w-[50%] opacity-[0.06]"
      />
      <img
        src={building4}
        aria-hidden="true"
        alt=""
        className="pointer-events-none absolute -right-16 bottom-0 z-0 w-[55%] opacity-[0.06]"
      />

      <div className="relative z-10 mx-auto max-w-[1140px]">
        <SectionHeader title="FAQ" />

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-4 md:grid-cols-2">
          {faqs.map((faq, i) => {
            const open = openSet.has(i)
            return (
              <Reveal key={faq.question} index={i % 4} y={10} className="self-start">
                {/* Brushed-steel plate — same gradient + corner rivets as the
                    "By the Numbers" stat tiles, so the FAQ reads as another
                    fastened panel rather than a plain card. */}
                <div
                  className="relative overflow-hidden rounded-md border border-steel-dark/50 text-white shadow-card"
                  style={{
                    background:
                      'linear-gradient(155deg, var(--color-steel-dark) 0%, var(--color-steel) 45%, var(--color-steel-dark) 100%)',
                  }}
                >
                  <span aria-hidden="true" className="pointer-events-none absolute left-2 top-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                  <span aria-hidden="true" className="pointer-events-none absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-2 left-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />
                  <span aria-hidden="true" className="pointer-events-none absolute bottom-2 right-2 h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]" />

                  <button
                    onClick={() => toggle(i)}
                    aria-expanded={open}
                    className="group relative flex w-full items-start justify-between gap-4 px-6 py-5 text-left font-heading font-bold"
                  >
                    <span>{faq.question}</span>
                    {/* Bolt "tightens" (flush, dim) when closed, "loosens" (rotates,
                        turns yellow) when opened — active:scale gives a small tactile
                        squeeze on click, echoing a wrench turning it. Slower, gentler
                        ease-out curve (matching the site's other reveal motion) so the
                        turn reads as smooth rather than a snap. */}
                    <HexBolt
                      className={`h-6 w-6 flex-shrink-0 transition-[transform,color] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] active:scale-90 ${
                        open ? 'rotate-45 text-caution' : 'text-white/40 group-hover:text-caution'
                      }`}
                    />
                  </button>
                  {/* Grid-rows expand instead of a fixed max-height — animates to the
                      answer's actual height, so short answers don't leave a slow,
                      empty trailing stretch when opening. */}
                  <div
                    className="grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ gridTemplateRows: open ? '1fr' : '0fr' }}
                  >
                    <div className="overflow-hidden">
                      <p className="border-t border-white/10 px-6 pb-5 pt-4 text-sm text-white/70">{faq.answer}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}

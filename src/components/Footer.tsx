import type { ReactNode } from 'react'
import { faqCategories, faqs } from '../data/content'

// Bedrock (deepest) section: FAQ grouped by category (left, 2x2) + Contact
// card (right) -> copyright. FAQ lives here rather than as its own top-level
// page section.
const groups = faqCategories.filter((c) => c.key !== 'all')

// Bedrock skin: fractured dark rock tile + tilted strata bands, and every
// panel is a chiselled stone slab (top-lit bevel, hard drop shadow).
const rock = `url("data:image/svg+xml,${encodeURIComponent(
  "<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'><rect width='220' height='220' fill='#1F2228'/><path d='M0 0L70 0 52 46 0 60z' fill='#23262D'/><path d='M70 0L150 0 132 58 52 46z' fill='#1C1F24'/><path d='M150 0L220 0 220 70 132 58z' fill='#25282F'/><path d='M0 60L52 46 132 58 110 130 30 140 0 130z' fill='#202329'/><path d='M132 58L220 70 220 150 160 150 110 130z' fill='#1B1E23'/><path d='M0 130L30 140 110 130 160 150 140 220 0 220z' fill='#24272E'/><path d='M160 150L220 150 220 220 140 220z' fill='#1D2025'/><path d='M52 46L70 0M52 46L0 60M52 46L132 58L150 0M132 58L220 70M132 58L110 130L30 140L0 130M110 130L160 150L220 150M160 150L140 220' stroke='#14161A' stroke-width='2' fill='none'/><path d='M84 84l10 14-6 12M186 104l-8 10 4 10' stroke='#14161A' stroke-width='1.5' fill='none'/></svg>",
)}")`
const strata =
  'repeating-linear-gradient(176deg, transparent 0 120px, rgba(0,0,0,.18) 120px 128px, transparent 128px 210px, rgba(255,255,255,.025) 210px 216px)'
const slab =
  'rounded-stone border-2 border-[#121417] bg-gradient-to-b from-[#353942] to-[#2A2D34] shadow-[inset_0_2px_0_rgba(255,255,255,.08),inset_0_-3px_0_rgba(0,0,0,.35),5px_5px_0_rgba(0,0,0,.55)]'
const carved = '[text-shadow:2px_2px_0_#000,-1px_-1px_0_rgba(255,255,255,.12)]'

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6 shrink-0 text-caution">
      {children}
    </svg>
  )
}

const contacts = [
  {
    label: 'Email',
    value: 'hackheights@bc.edu',
    href: 'mailto:hackheights@bc.edu',
    icon: (
      <Icon>
        <rect x={3} y={5} width={18} height={14} rx={2} />
        <path d="M3 7l9 6 9-6" />
      </Icon>
    ),
  },
  {
    label: 'Instagram',
    value: '@hackthehightsbc',
    href: '#',
    icon: (
      <Icon>
        <rect x={3} y={3} width={18} height={18} rx={5} />
        <circle cx={12} cy={12} r={4} />
        <circle cx={17.5} cy={6.5} r={1} fill="currentColor" />
      </Icon>
    ),
  },
  {
    label: 'Website',
    value: 'bccss.co',
    href: '#',
    icon: (
      <Icon>
        <circle cx={12} cy={12} r={9} />
        <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" />
      </Icon>
    ),
  },
]

export default function Footer() {
  return (
    <footer
      id="faq"
      className="relative flex min-h-[calc(100vh-56px)] flex-col justify-center bg-bedrock px-6 pb-8 pt-16 text-bedrock-text md:min-h-[calc(100vh-64px)]"
      style={{ backgroundImage: `radial-gradient(ellipse at 50% 40%, transparent 45%, rgba(0,0,0,.55)), ${strata}, ${rock}` }}
    >
      {/* jagged rock seam where the sewer gives way to bedrock */}
      <svg aria-hidden="true" viewBox="0 0 1200 24" preserveAspectRatio="none" className="absolute inset-x-0 top-0 h-6 w-full">
        <path d="M0 0H1200V10L1150 18 1090 8 1020 20 960 6 900 16 830 9 760 22 700 7 640 17 570 8 500 21 440 9 380 18 310 6 250 19 190 8 120 20 60 9 0 16Z" fill="#121417" />
      </svg>
      <div className="mx-auto my-auto grid w-full max-w-[1400px] grid-cols-1 gap-12 lg:grid-cols-[2fr_1fr]">
        <div>
          <h2 className={`mb-8 font-display text-5xl uppercase tracking-wide text-caution md:text-6xl ${carved}`}>FAQ</h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {groups.map((g, i) => (
              <div key={g.key} data-reveal style={{ ['--d' as string]: `${i * 100}ms` }} className={`${slab} p-6`}>
                <h3 className="mb-3 inline-block rounded-sm border border-black/60 bg-black/30 px-2 py-1 font-mono text-sm font-extrabold uppercase tracking-widest text-bedrock-text-muted shadow-[inset_0_1px_2px_rgba(0,0,0,.6)]">{g.label}</h3>
                {faqs
                  .filter((f) => f.category === g.key)
                  .map((faq) => (
                    <details key={faq.question} className="group border-b border-black/50 py-3 shadow-[0_1px_0_rgba(255,255,255,.05)] last:border-b-0 last:shadow-none">
                      <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-white [&::-webkit-details-marker]:hidden">
                        {faq.question}
                        <span aria-hidden="true" className="mt-0.5 text-xl leading-none text-caution transition-transform group-open:rotate-45">
                          +
                        </span>
                      </summary>
                      <p className="hth-answer pt-2 text-base leading-relaxed text-bedrock-text-muted">{faq.answer}</p>
                    </details>
                  ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className={`mb-8 font-display text-5xl uppercase tracking-wide text-caution md:text-6xl ${carved}`}>Contact</h2>
          <div data-reveal style={{ ['--d' as string]: '200ms' }} className="flex flex-col gap-4">
            {contacts.map((c) => (
              <a
                key={c.label}
                href={c.href}
                className={`${slab} flex items-center gap-4 p-5 transition-colors hover:border-caution`}
              >
                {c.icon}
                <span>
                  <span className="block font-mono text-xs font-bold uppercase tracking-widest text-steel-lt">{c.label}</span>
                  <span className="block text-lg font-semibold text-white">{c.value}</span>
                </span>
              </a>
            ))}
          </div>
          <p className="mt-4 text-sm text-bedrock-text-muted">Contact details are placeholders.</p>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-[1400px] border-t-2 border-black/60 pt-6 text-center shadow-[0_-1px_0_rgba(255,255,255,.05)] text-sm text-bedrock-text-muted">
        <p>&copy; 2026 Hack the Heights · Boston College.</p>
      </div>
    </footer>
  )
}

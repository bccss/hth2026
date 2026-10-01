import { useState } from 'react'
import Button from './ui/Button'
import { useActiveSection } from '../hooks/useActiveSection'

// Links + anchors locked to docs/design/SPEC.md Nav section:
// About/Tracks/Sponsors/FAQ, with Register as the sole yellow-filled item
// (Sponsors/FAQ/Register anchor into Footer). Timeline was removed.
const links = [
  { href: '#about', label: 'About' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#faq', label: 'FAQ' },
]

const sectionIds = links.map((l) => l.href.slice(1))

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-50 bg-asphalt">
      {/* Skip link — SPEC.md Nav: first focusable element, before the nav itself */}
      <a
        href="#top"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:bg-caution focus:px-4 focus:py-2 focus:font-heading focus:font-bold focus:text-asphalt"
      >
        Skip to content
      </a>

      <div className="mx-auto flex h-14 max-w-[1140px] items-center justify-between px-6 md:h-16">
        <a href="#top" className="flex items-center gap-2 font-heading text-xl font-black tracking-tight text-white">
          {/* [SVG PLACEHOLDER] logo mark — two offset blocks, per wireframes.html */}
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-caution" fill="currentColor">
            <rect x="2" y="10" width="9" height="9" />
            <rect x="13" y="2" width="9" height="9" />
          </svg>
          <span>
            HTH<span className="hidden sm:inline"> 2026</span>
          </span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => {
            const current = active === link.href.slice(1)
            return (
              <a
                key={link.href}
                href={link.href}
                aria-current={current ? 'location' : undefined}
                className={`flex min-h-12 items-center border-b-[3px] font-heading text-sm font-bold uppercase tracking-wide transition-colors ${
                  current ? 'border-caution text-white' : 'border-transparent text-steel-lt hover:text-white'
                }`}
              >
                {link.label}
              </a>
            )
          })}
        </nav>

        <div className="flex items-center gap-4">
          {/* Register stays visible outside the menu on every breakpoint — SPEC.md Nav */}
          <Button href="#register" size="sm">
            Register
          </Button>
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-11 w-11 items-center justify-center md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6 text-white">
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              </svg>
            ) : (
              <span className="flex flex-col items-center gap-1.5">
                <span className="block h-0.5 w-6 rounded bg-white" />
                <span className="block h-0.5 w-6 rounded bg-white" />
                <span className="block h-0.5 w-6 rounded bg-white" />
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Caution-tape stripe — the nav's bottom border (SPEC.md Nav) */}
      <div
        aria-hidden="true"
        className="h-3 bg-[repeating-linear-gradient(-45deg,var(--color-caution)_0_14px,var(--color-asphalt)_14px_28px)]"
      />

      {open && (
        <nav id="mobile-nav" className="absolute inset-x-0 top-full flex flex-col bg-asphalt md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="flex min-h-12 items-center border-t border-steel px-6 font-heading font-bold uppercase tracking-wide text-steel-lt"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}

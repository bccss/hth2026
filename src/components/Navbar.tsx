import { useState } from 'react'
import Button from './ui/Button'
import { useActiveSection } from '../hooks/useActiveSection'
import { scrollToHash } from '../utils/scrollToHash'
import { APPLY_FORM_URL } from '../data/content'

const links = [
  { href: '#about', label: 'About' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#faq', label: 'FAQ' },
  { href: '#sponsors', label: 'Sponsors' },
]

const sectionIds = links.map((l) => l.href.slice(1))

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const active = useActiveSection(sectionIds)

  return (
    <header className="sticky top-0 z-50">
      {/* Hazard-tape strip, the site's recurring construction motif, framing the nav */}
      <div
        aria-hidden="true"
        className="h-2 bg-[repeating-linear-gradient(45deg,var(--color-caution),var(--color-caution)_10px,var(--color-ink)_10px,var(--color-ink)_20px)]"
      />

      <div className="flex h-16 items-center justify-between bg-ink px-6">
        <div className="mx-auto flex w-full max-w-[1140px] items-center justify-between">
          <a
            href="#top"
            onClick={(e) => scrollToHash(e, '#top')}
            className="flex items-center gap-2 font-heading text-xl font-black tracking-tight text-caution"
          >
            <img src="/bccss_transparent.png" alt="BCCSS" className="h-7 w-auto" />
            <span>HTH26</span>
          </a>

          <nav className="hidden gap-8 md:flex">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => scrollToHash(e, link.href)}
                className={`border-b-2 pb-2 pt-2 font-semibold text-sm transition-colors ${
                  active === link.href.slice(1)
                    ? 'border-caution text-caution'
                    : 'border-transparent text-caution/60 hover:text-caution'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <Button
              href={APPLY_FORM_URL}
              target="_blank"
              rel="noopener noreferrer"
              size="sm"
              variant="bright"
              className="hidden sm:inline-block"
            >
              Apply
            </Button>
            <button
              aria-label="Toggle navigation"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
            >
              <span className="block h-0.5 w-full rounded bg-caution" />
              <span className="block h-0.5 w-full rounded bg-caution" />
              <span className="block h-0.5 w-full rounded bg-caution" />
            </button>
          </div>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="h-2 bg-[repeating-linear-gradient(45deg,var(--color-caution),var(--color-caution)_10px,var(--color-ink)_10px,var(--color-ink)_20px)]"
      />

      {open && (
        <nav className="absolute inset-x-0 top-20 flex flex-col gap-4 border-b border-ink-border bg-ink px-6 py-4 md:hidden">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                scrollToHash(e, link.href)
                setOpen(false)
              }}
              className="font-semibold text-caution/70 hover:text-caution"
            >
              {link.label}
            </a>
          ))}
          <Button
            href={APPLY_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            size="sm"
            variant="bright"
            onClick={() => setOpen(false)}
          >
            Apply
          </Button>
        </nav>
      )}
    </header>
  )
}

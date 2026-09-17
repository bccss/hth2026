import { useState } from 'react'
import Button from './ui/Button'
import { useActiveSection } from '../hooks/useActiveSection'

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
    <header className="sticky top-0 z-50 h-16 border-b border-border bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-heading text-xl font-black tracking-tight">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
            <path d="M4 21V9l8-6 8 6v12" strokeLinejoin="round" />
            <path d="M9 21v-6h6v6" />
          </svg>
          <span>
            HTH<span className="text-accent">26</span>
          </span>
        </a>

        <nav className="hidden gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`border-b-2 pb-2 pt-2 font-semibold text-sm transition-colors ${
                active === link.href.slice(1)
                  ? 'border-accent text-text'
                  : 'border-transparent text-text-muted hover:text-text'
              }`}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Button href="#apply" size="sm" className="hidden sm:inline-block">
            Apply
          </Button>
          <button
            aria-label="Toggle navigation"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <span className="block h-0.5 w-full rounded bg-text" />
            <span className="block h-0.5 w-full rounded bg-text" />
            <span className="block h-0.5 w-full rounded bg-text" />
          </button>
        </div>
      </div>

      {open && (
        <nav className="absolute inset-x-0 top-16 flex flex-col gap-4 border-b border-border bg-white px-6 py-4 md:hidden">
          {links.map((link) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)} className="font-semibold text-text-muted">
              {link.label}
            </a>
          ))}
          <Button href="#apply" size="sm" onClick={() => setOpen(false)}>
            Apply
          </Button>
        </nav>
      )}
    </header>
  )
}

const siteLinks = [
  { href: '#about', label: 'About' },
  { href: '#tracks', label: 'Tracks' },
  { href: '#schedule', label: 'Schedule' },
  { href: '#faq', label: 'FAQ' },
  { href: '#sponsors', label: 'Sponsors' },
  { href: '#apply', label: 'Apply' },
]

export default function Footer() {
  return (
    <footer className="bg-ink pb-6 pt-16 text-ink-text">
      <div className="mx-auto mb-8 grid max-w-[1140px] grid-cols-1 gap-8 px-6 sm:grid-cols-[2fr_1fr_1fr]">
        <div className="flex flex-col gap-2">
          <a href="#top" className="mb-2 flex items-center gap-2 font-heading text-xl font-black text-white">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="h-6 w-6">
              <path d="M4 21V9l8-6 8 6v12" strokeLinejoin="round" />
              <path d="M9 21v-6h6v6" />
            </svg>
            <span>
              HTH<span className="text-accent">26</span>
            </span>
          </a>
          <p className="text-sm">Powered by the Boston College Computer Science Society (placeholder).</p>
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">Site</h4>
          {siteLinks.map((link) => (
            <a key={link.href} href={link.href} className="text-sm hover:text-accent">
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          <h4 className="mb-1 text-sm font-bold uppercase tracking-wide text-white">Contact</h4>
          <a href="mailto:hackheights@bc.edu" className="text-sm hover:text-accent">
            hackheights@bc.edu (placeholder)
          </a>
          <a href="#" className="text-sm hover:text-accent">
            Instagram @hackthehightsbc (placeholder)
          </a>
          <a href="#" className="text-sm hover:text-accent">
            bccss.co (placeholder)
          </a>
        </div>
      </div>
      <div className="border-t border-ink-border pt-6 text-center text-xs text-ink-text-muted">
        <p>&copy; 2026 Hack the Heights · Boston College.</p>
      </div>
    </footer>
  )
}

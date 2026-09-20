import { Globe, InstagramLogo } from '@phosphor-icons/react'

export default function Footer() {
  return (
    <footer className="bg-ink px-6 py-6 text-ink-text">
      <div className="mx-auto flex max-w-[1140px] flex-wrap items-center justify-between gap-4 text-sm">
        <a
          href="https://bccss.dev"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-accent"
        >
          <Globe weight="fill" className="h-4 w-4 flex-shrink-0" />
          bccss.dev
        </a>
        <p className="text-xs text-ink-text-muted">&copy; 2026 Hack the Heights · Boston College.</p>
        <a
          href="https://www.instagram.com/bccssociety/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 hover:text-accent"
        >
          <InstagramLogo weight="fill" className="h-4 w-4 flex-shrink-0" />
          @bccssociety
        </a>
      </div>
    </footer>
  )
}

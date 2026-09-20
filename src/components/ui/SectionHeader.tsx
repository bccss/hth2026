import type { ReactNode } from 'react'

interface SectionHeaderProps {
  /** Omit on most sections — see the eyebrow-restraint rule in DESIGN.md (max ~1 per 3 sections). */
  eyebrow?: string
  title: ReactNode
  lead?: ReactNode
  align?: 'center' | 'left'
  /** 'inverted' for dark/photo backgrounds (e.g. Tracks' dirt texture) — lightens the title/lead text. */
  tone?: 'default' | 'inverted'
  className?: string
}

export default function SectionHeader({
  eyebrow,
  title,
  lead,
  align = 'center',
  tone = 'default',
  className = '',
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'mx-auto text-center' : 'text-left'
  const titleClasses = tone === 'inverted' ? 'text-white' : ''
  const leadClasses = tone === 'inverted' ? 'text-white/75' : 'text-text-muted'
  return (
    <div className={`mb-12 max-w-2xl ${alignClasses} ${className}`}>
      {eyebrow && (
        <p className="mb-2 font-heading text-sm font-bold uppercase tracking-widest text-accent">
          {eyebrow}
        </p>
      )}
      <h2 className={`mb-4 text-3xl font-bold tracking-tight sm:text-4xl ${titleClasses}`}>{title}</h2>
      {lead && <p className={`${align === 'center' ? 'mx-auto ' : ''}${leadClasses}`}>{lead}</p>}
    </div>
  )
}

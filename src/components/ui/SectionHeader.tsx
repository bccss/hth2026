import type { ReactNode } from 'react'

interface SectionHeaderProps {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
}

export default function SectionHeader({ eyebrow, title, lead }: SectionHeaderProps) {
  return (
    <div className="mb-12 text-center">
      <p className="mb-2 font-heading text-sm font-bold uppercase tracking-widest text-accent">
        {eyebrow}
      </p>
      <h2 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {lead && (
        <p className="mx-auto max-w-2xl text-text-muted">{lead}</p>
      )}
    </div>
  )
}

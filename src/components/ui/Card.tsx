import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Dashed border, alt background — for callouts like the mission statement */
  highlight?: boolean
  /** Only for cards that represent a real choice (a sponsor tier, a plan) — adds a single subtle lift. Purely informational cards stay static; hover with nothing to click reads as decoration, not feedback. */
  interactive?: boolean
}

export default function Card({ children, className = '', highlight = false, interactive = false }: CardProps) {
  const stateClasses = highlight
    ? 'border-dashed bg-bg-alt text-center'
    : interactive
      ? 'hover:-translate-y-0.5 hover:border-accent'
      : ''

  return (
    <div
      className={`rounded-md border border-border bg-surface p-7 transition-[transform,border-color] duration-200 ease-out ${stateClasses} ${className}`}
    >
      {children}
    </div>
  )
}

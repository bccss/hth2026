import type { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  /** Dashed border, alt background — for callouts like the mission statement */
  highlight?: boolean
}

export default function Card({ children, className = '', highlight = false }: CardProps) {
  const highlightClasses = highlight
    ? 'border-dashed bg-bg-alt text-center'
    : 'hover:-translate-y-1 hover:border-accent hover:shadow-card'

  return (
    <div
      className={`rounded-md border border-border bg-surface p-7 transition-all duration-200 ease-out ${highlightClasses} ${className}`}
    >
      {children}
    </div>
  )
}

import type { ReactNode } from 'react'

type Variant = 'accent' | 'neutral' | 'danger'

const variantClasses: Record<Variant, string> = {
  accent: 'bg-accent-soft text-accent-dark',
  neutral: 'bg-bg-alt text-text-muted',
  danger: 'bg-danger-soft text-danger',
}

interface PillProps {
  children: ReactNode
  variant?: Variant
  className?: string
}

export default function Pill({ children, variant = 'accent', className = '' }: PillProps) {
  return (
    <span
      className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${variantClasses[variant]} ${className}`}
    >
      {children}
    </span>
  )
}

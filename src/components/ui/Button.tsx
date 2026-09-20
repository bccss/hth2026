import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent border-accent text-caution-ink hover:bg-accent-dark hover:border-accent-dark',
  secondary: 'bg-surface border-border text-text hover:border-text',
  outline: 'bg-transparent border-text text-text hover:bg-bg-alt',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-lg',
}

const base =
  'inline-block whitespace-nowrap font-heading font-bold rounded-full border-2 text-center transition-[transform,background-color,border-color] duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
  /** Renders a non-interactive, visually muted button (e.g. "opens later") instead of a dead link. */
  disabled?: boolean
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonProps = ButtonAsLink | ButtonAsButton

const disabledClasses = 'pointer-events-none opacity-50 grayscale-[0.3] hover:translate-y-0'

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  disabled = false,
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${disabled ? disabledClasses : ''} ${className}`

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    if (disabled) {
      return (
        <span className={classes} aria-disabled="true">
          {children}
        </span>
      )
    }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} disabled={disabled} {...buttonRest}>
      {children}
    </button>
  )
}

import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'primary' | 'secondary' | 'outline'
type Size = 'sm' | 'md' | 'lg'

const variantClasses: Record<Variant, string> = {
  // The one filled-yellow control per STYLE_GUIDE.md — construction theme's
  // primary CTA everywhere (Register/Apply), hard offset shadow, no blur.
  primary:
    'rounded-none border-asphalt bg-caution text-asphalt shadow-hard hover:bg-caution-hi hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-hard-hover active:translate-x-0.5 active:translate-y-0.5 active:shadow-hard-active',
  secondary: 'rounded-full border-transparent bg-bg-alt text-text hover:bg-border',
  outline: 'rounded-full border-2 border-text bg-transparent text-text hover:bg-bg-alt',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-lg',
}

const base =
  'inline-block font-heading font-bold uppercase tracking-wide border-2 text-center transition-transform duration-150 ease-out'

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: ReactNode
}

type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }

type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined }

type ButtonProps = ButtonAsLink | ButtonAsButton

export default function Button({
  variant = 'primary',
  size = 'md',
  className = '',
  children,
  ...rest
}: ButtonProps) {
  const classes = `${base} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`

  if ('href' in rest && rest.href !== undefined) {
    const { href, ...anchorRest } = rest as AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }
    return (
      <a href={href} className={classes} {...anchorRest}>
        {children}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} {...buttonRest}>
      {children}
    </button>
  )
}

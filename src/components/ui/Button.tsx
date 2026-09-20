import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from 'react'
import { scrollToHash } from '../../utils/scrollToHash'

type Variant = 'primary' | 'secondary' | 'outline' | 'bright'
type Size = 'sm' | 'md' | 'lg'

/* Steel-plate gradients — same diagonal dark/mid/dark ramp as the stat
   tiles, FAQ plates, and schedule clip, so buttons read as another
   fastened metal part instead of a flat color swatch. Written as literal
   arbitrary-value classes (not interpolated from a shared constant) so
   Tailwind's static scanner can see the full class text. */
const variantClasses: Record<Variant, string> = {
  primary:
    'bg-[image:linear-gradient(155deg,var(--color-steel-dark)_0%,var(--color-steel)_45%,var(--color-steel-dark)_100%)] border-steel-dark/60 text-white hover:brightness-110',
  secondary: 'bg-steel-light border-steel/60 text-text hover:brightness-95',
  outline: 'bg-transparent border-steel-dark text-steel-dark hover:bg-steel-dark/10',
  /** Caution-yellow, for spots that want to pop more than the steel tone (e.g. the navbar Apply button). */
  bright: 'bg-caution border-caution text-caution-ink hover:bg-caution/90 hover:border-caution/90',
}

const sizeClasses: Record<Size, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-lg',
}

/* Slightly rounded rectangle, no gloss/bevel highlight — a flat plate
   edge instead of a shined metal one. */
const base =
  'relative inline-block whitespace-nowrap font-heading font-bold rounded border-2 text-center transition-[transform,background-color,border-color] duration-150 ease-out hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.97]'

/* Corner bolts — the same rivet dots as the steel plates elsewhere (FAQ,
   stat tiles, schedule clip), so the button reads as a fastened plate. */
const cornerBoltClasses =
  'pointer-events-none absolute h-1.5 w-1.5 rounded-full bg-steel-light/80 shadow-[inset_0_1px_1px_rgba(0,0,0,0.5)]'

function CornerBolts() {
  return (
    <>
      <span aria-hidden="true" className={`${cornerBoltClasses} left-1 top-1`} />
      <span aria-hidden="true" className={`${cornerBoltClasses} right-1 top-1`} />
      <span aria-hidden="true" className={`${cornerBoltClasses} bottom-1 left-1`} />
      <span aria-hidden="true" className={`${cornerBoltClasses} bottom-1 right-1`} />
    </>
  )
}

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
          <CornerBolts />
          {children}
        </span>
      )
    }
    return (
      <a
        href={href}
        className={classes}
        {...anchorRest}
        onClick={(e) => {
          scrollToHash(e, href)
          anchorRest.onClick?.(e)
        }}
      >
        <CornerBolts />
        {children}
      </a>
    )
  }

  const buttonRest = rest as ButtonHTMLAttributes<HTMLButtonElement>
  return (
    <button className={classes} disabled={disabled} {...buttonRest}>
      <CornerBolts />
      {children}
    </button>
  )
}

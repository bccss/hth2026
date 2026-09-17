interface SectionDividerProps {
  /** Faded variant for alternating rhythm between sections */
  alt?: boolean
}

/**
 * [SVG PLACEHOLDER] pattern-tape.svg — real caution-tape art can replace
 * this CSS repeating-gradient once construction theme assets land.
 */
export default function SectionDivider({ alt = false }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`h-3.5 bg-[repeating-linear-gradient(45deg,var(--color-accent),var(--color-accent)_14px,var(--color-ink)_14px,var(--color-ink)_28px)] ${
        alt ? 'opacity-35' : 'opacity-85'
      }`}
    />
  )
}

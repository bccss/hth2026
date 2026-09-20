interface SectionDividerProps {
  /** Faded variant for alternating rhythm between sections */
  alt?: boolean
}

/** Hazard-tape strip between sections — the recurring construction-theme motif. */
export default function SectionDivider({ alt = false }: SectionDividerProps) {
  return (
    <div
      aria-hidden="true"
      className={`h-3 bg-[repeating-linear-gradient(45deg,var(--color-caution),var(--color-caution)_16px,var(--color-ink)_16px,var(--color-ink)_32px)] ${
        alt ? 'opacity-40' : 'opacity-90'
      }`}
    />
  )
}

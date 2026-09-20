export interface ToggleOption<T extends string> {
  key: T
  label: string
  caption?: string
}

interface ToggleGroupProps<T extends string> {
  options: ToggleOption<T>[]
  active: T
  onChange: (key: T) => void
}

/** Shared pill-toggle control — schedule day switcher, FAQ category filter. */
export default function ToggleGroup<T extends string>({ options, active, onChange }: ToggleGroupProps<T>) {
  return (
    <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist">
      {options.map((opt) => {
        const isActive = active === opt.key
        return (
          <button
            key={opt.key}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(opt.key)}
            className={`flex flex-col items-center rounded-full px-5 py-2.5 font-heading text-sm font-semibold transition-colors ${
              isActive ? 'bg-accent text-caution-ink' : 'bg-bg-alt text-text-muted hover:text-text'
            }`}
          >
            <span>{opt.label}</span>
            {opt.caption && <span className="text-xs opacity-70">{opt.caption}</span>}
          </button>
        )
      })}
    </div>
  )
}

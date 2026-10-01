# Code Style — HTH 2026

Practical conventions for this specific codebase (Vite + React 19 + TypeScript +
Tailwind v4). Not generic advice — see `DESIGN.md` for the token system this
all builds on.

## Components

- **Function components only**, one per file, default-exported, named to
  match the file (`Hero.tsx` → `export default function Hero()`).
- Page sections live in `src/components/` (one per `<section>` in
  `src/App.tsx`); shared primitives live in `src/components/ui/`.
- A section component renders its own `<section id="...">` — don't wrap
  sections in extra layout components. Layout inside a section is plain
  Tailwind (`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`), not a
  custom `<Grid>`/`<Row>` wrapper.

## Props

- Type props with a local `interface` (see `Card.tsx`, `CardProps`) or a
  small union of types for variant-style components (see `Button.tsx`'s
  `ButtonAsLink | ButtonAsButton`).
- Constrain variant/size props to string literal unions (`type Variant =
  'primary' | 'secondary' | 'outline'`) with a `Record<Variant, string>`
  class lookup, not free-form strings or booleans-per-variant.
- Default values via destructuring defaults (`variant = 'primary'`), not
  `defaultProps`.

## Where content and styling live

- **Copy and data go in `src/data/content.ts`** — stats, FAQ entries,
  schedule/timeline items, tracks, sponsor tiers. A component should import
  and map over this data, not contain literal strings for anything that
  could plausibly change (dates, numbers, names, prize amounts).
- **Colors, fonts, radius, and shadows come from the `@theme` block in
  `src/index.css`**, consumed as Tailwind utility classes (`bg-accent`,
  `font-heading`, `rounded-md`). Never hardcode a hex value, `font-family`,
  or arbitrary Tailwind value (`p-[18px]`, `text-[#e07a1f]`) in a component —
  if the value doesn't exist yet, add it to the `@theme` block first (see
  `DESIGN.md`'s rule on this).
- Spacing uses Tailwind's default numeric scale as-is (`p-6`, `gap-8`,
  `py-20`) — no custom spacing tokens.

## Avoiding one-off styles

If you're about to write a Tailwind class string that only exists to style
one specific element in a way no other section does, check
`src/components/ui/` first — it likely maps to `Card`, `Pill`,
`SectionHeader`, `SectionDivider`, or a `Button` variant. Reuse over
recreate.

## Avoiding premature abstraction

The inverse also matters: don't add a new file to `ui/` for a pattern used
in exactly one place. Extract a primitive only once the same markup/styling
shows up a second time (see `Card`'s `highlight` prop, added for the About
mission-statement callout because it needed the same card shell with one
visual variant — not a new component). Until then, write the one-off markup
directly in the section component.

## Accessibility

Baseline a11y is enforced by structure, not an afterthought: semantic
landmarks (`header`/`nav`/`main`/`footer`), meaningful `alt` text (empty
`alt=""` for decorative art), and visible focus states on every interactive
element. Full checklist and testing steps: `docs/design/SPEC.md` →
"Accessibility & testing checklist" — check that before opening a PR rather
than re-deriving it here.

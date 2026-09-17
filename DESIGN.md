# Hack the Heights 2026 — Design Foundation

This is the single source of truth for the site's shared foundation: color, type,
spacing, and page structure. If you're building a section, start here.

**The rule:** no one invents their own colors, fonts, or spacing values mid-section.
If a value you need doesn't exist yet, add it to `src/index.css` first (and flag it
to the team) — don't hardcode a one-off in your component.

**Stack:** Vite + React + TypeScript + Tailwind CSS v4. If you're new to any of
these, `npm run dev` and start reading `src/App.tsx` — it's a short file that
just assembles every section in order.

## The files that enforce this

| File | What it is |
|---|---|
| `src/index.css` | The actual design tokens, defined in a Tailwind `@theme` block — colors, fonts, radius, shadow. This is what generates the Tailwind utility classes (`bg-accent`, `font-heading`, `rounded-md`, etc.) — not this doc. |
| `src/components/ui/` | Shared primitives: `Button`, `Card`, `Pill`, `SectionHeader`, `SectionDivider`. Reuse these instead of styling a one-off element. |
| `src/components/` | One file per page section (`Hero.tsx`, `About.tsx`, `Tracks.tsx`, ...). This is where you build. |
| `src/data/content.ts` | All placeholder copy — stats, FAQ, schedule, tracks, sponsor tiers, testimonials. Add/edit content here, not inline in a component. |
| `src/App.tsx` | Assembles every section in the locked page order. Don't reorder without checking with the team — nav highlighting and in-page anchors depend on it. |

## Status: this is a *starting point*, not the final construction theme

Colors and fonts below are locked as the **system everyone builds against right
now** — consistent placeholder values, not yet the final construction branding
(safety orange / caution yellow / blueprint navy / concrete gray). When the real
theme is decided, only the `@theme` block in `src/index.css` changes — because
every component reads from it via Tailwind utilities, the whole site updates in
one place. Don't wait on that decision to start building sections.

---

## Color

All color tokens are defined once, in `src/index.css`:

```css
@theme {
  --color-bg: #ffffff;
  --color-bg-alt: #f4f4f5;
  --color-surface: #ffffff;
  --color-border: #e2e2e5;
  --color-text: #1a1a1a;
  --color-text-muted: #55555a;

  --color-ink: #17171a;
  --color-ink-border: #2c2c31;
  --color-ink-text: #d4d4d8;
  --color-ink-text-muted: #8a8a90;

  --color-accent: #e07a1f;
  --color-accent-dark: #b8630f;
  --color-accent-soft: #fdf1e4;

  --color-danger: #b42323;
  --color-danger-soft: #fdeaea;
}
```

Each `--color-X` token generates Tailwind utilities for that name: `bg-X`,
`text-X`, `border-X`. For example `--color-accent` gives you `bg-accent`,
`text-accent`, `border-accent`, `hover:bg-accent-dark`, etc.

| Token → utility prefix | Usage |
|---|---|
| `bg` / `bg-alt` / `surface` / `border` | Page background, alt section background, card surfaces, borders |
| `text` / `text-muted` | Primary text, secondary/body copy |
| `ink` / `ink-border` / `ink-text` / `ink-text-muted` | Dark surfaces only — footer, announcement bar |
| `accent` / `accent-dark` / `accent-soft` | Buttons, links, active states, pill backgrounds — **placeholder, swap when theme is final** |
| `danger` / `danger-soft` | "Required" pill only |

Pure white/black text (e.g. on the accent button, on the dark footer heading)
uses Tailwind's built-in `white` / `black` — no custom token needed for those.

---

## Typography

```css
--font-heading: 'Space Grotesk', ui-sans-serif, system-ui, sans-serif;
--font-body: 'Inter', ui-sans-serif, system-ui, sans-serif;
```

Loaded via Google Fonts in `index.html`. Use the `font-heading` / `font-body`
utility classes — `body` already defaults to `font-body` and all `h1`–`h6` default
to `font-heading font-bold` (see the `@layer base` block in `src/index.css`), so
you mostly only need `font-heading` explicitly on things like buttons, nav links,
and tab labels that aren't literal headings.

Both fonts are a **starting point** — easy to swap for something more
construction-themed later without touching a single component.

For sizing, use Tailwind's default type scale (`text-sm`, `text-lg`, `text-2xl`,
etc.) directly — no custom scale needed, the defaults already cover everything
used across the site.

---

## Spacing

**Use Tailwind's default numeric spacing scale as-is** (`p-4`, `gap-6`, `mb-8`,
`py-20`, ...). No custom spacing config — Tailwind's default `4px` base unit
already matches the scale from the original design doc exactly:

| Old token | Tailwind class suffix | px |
|---|---|---|
| `--space-1` | `1` | 4px |
| `--space-2` | `2` | 8px |
| `--space-4` | `4` | 16px |
| `--space-6` | `6` | 24px |
| `--space-8` | `8` | 32px |
| `--space-10` | `10` | 40px |
| `--space-12` | `12` | 48px |
| `--space-16` | `16` | 64px |
| `--space-20` | `20` | 80px |

If a spacing need doesn't map cleanly to a Tailwind step, that's a signal to
rethink the layout rather than reach for an arbitrary value (e.g. `p-[18px]`).

---

## Other tokens

```css
--radius-sm: 8px;   /* rounded-sm  — badges, dividers */
--radius-md: 12px;  /* rounded-md  — cards, buttons, inputs */
--radius-lg: 16px;  /* rounded-lg  — reserved */
/* rounded-full is Tailwind's default (pills, avatars, nav toggle) */

--shadow-card: 0 12px 24px rgba(0, 0, 0, 0.08); /* shadow-card — card hover */
```

**Breakpoints:** use Tailwind's standard `sm:` / `md:` / `lg:` — no custom
breakpoints. (This is a deliberate change from the original static build, which
used custom `700px`/`900px` breakpoints; the React rebuild leans on Tailwind's
defaults instead since that's far more idiomatic for a team working in Tailwind.)

---

## Page structure

`src/App.tsx` is the enforced page skeleton. Section order is fixed:

```
<AnnouncementBar />
<Navbar />
<main>
  <Hero />        id="hero"
  <About />       id="about"
  <Tracks />      id="tracks"
  <Schedule />    id="schedule"
  <Faq />         id="faq"
  <Sponsors />    id="sponsors"
  <Apply />       id="apply"
</main>
<Footer />
```

Each section is its own component file in `src/components/`. Don't rename a
section's `id` (the navbar and footer already link to them via anchor hrefs)
and don't reorder sections without raising it with the team first — nav
highlighting (`useActiveSection`) and in-page anchors depend on this order.

### Adding a new section

1. Create `src/components/YourSection.tsx`, export a component that renders a
   `<section id="your-id">`.
2. Pull any copy/data into `src/data/content.ts` rather than hardcoding it in
   the component.
3. Build the inside using `src/components/ui/` primitives first; only write new
   one-off markup for things that are genuinely unique to that section.
4. Wire it into `src/App.tsx` in the right position, and add a nav link in
   `Navbar.tsx` / `Footer.tsx` if it should be reachable from the nav.

---

## Component conventions

Reuse these instead of writing new ones for the same job — all in `src/components/ui/`:

- **`SectionHeader`** — the `eyebrow` → `title` (h2) → `lead` pattern used at the
  top of every section.
- **`Card`** — base card (`hover` lift/border/shadow by default); pass
  `highlight` for a dashed-border callout variant (see the About mission
  statement).
- **`Button`** — `variant`: `primary` / `secondary` / `outline`; `size`: `sm` /
  `md` / `lg`. Renders an `<a>` when given `href`, otherwise a `<button>`.
- **`Pill`** — small badge/tag; `variant`: `accent` / `neutral` / `danger`. Used
  for schedule time/type pills, track prize tags, the "Required" tag.
- **`SectionDivider`** — the caution-tape strip between sections; pass `alt` for
  the faded variant.

For layout, reach for Tailwind's `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-6` pattern directly (used throughout for card grids) rather than inventing a
new grid wrapper.

---

## SVG / icon placeholders

Not part of this design lock — icons are still emoji stand-ins pending the
construction theme. The full asset list (logo, mascot, section icons, dividers)
is documented as a comment in `index.html` and inline near each placeholder
(search for `[SVG PLACEHOLDER]` across `src/`). Don't design new one-off icon
styles; wait for that asset pass.

---

## Local dev

```
npm install
npm run dev        # start the dev server
npm run typecheck  # tsc --noEmit
npm run build       # production build
```

---

## Contribution rules (tl;dr)

1. Colors, fonts, radius, shadow → always a Tailwind utility backed by a token
   in `src/index.css`, never an arbitrary value (`bg-[#123456]`, `p-[13px]`).
2. Need a new color/font/radius token? Add it to the `@theme` block in
   `src/index.css`, don't inline it.
3. Spacing → Tailwind's default numeric scale, no arbitrary values.
4. Content → `src/data/content.ts`, not hardcoded strings in a component.
5. Building a new section? Follow "Adding a new section" above.
6. Don't rename section ids or reorder sections without checking with the team.
7. Reuse an existing `ui/` primitive before inventing a new styled element.

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

## Status: construction theme is locked

Colors and fonts below are the **real theme**, not a placeholder: safety
orange, caution yellow, blueprint navy, and concrete gray. Every component
reads them via Tailwind utilities, so any further tuning still only touches
the `@theme` block in `src/index.css`.

---

## Color

All color tokens are defined once, in `src/index.css`:

```css
@theme {
  --color-bg: #f5f5f3;
  --color-bg-alt: #eaeae6;
  --color-surface: #ffffff;
  --color-border: #d9d9d3;
  --color-text: #14181d;
  --color-text-muted: #5c6169;

  --color-ink: #0d1a2b;
  --color-ink-border: #223349;
  --color-ink-text: #cfd8e3;
  --color-ink-text-muted: #8996a9;

  --color-accent: #ff5a1f;
  --color-accent-dark: #d6420e;
  --color-accent-soft: #ffece2;

  --color-caution: #ffc93c;
  --color-caution-ink: #3a2c04;

  --color-danger: #c22e2e;
  --color-danger-soft: #fbe9e9;
}
```

Each `--color-X` token generates Tailwind utilities for that name: `bg-X`,
`text-X`, `border-X`. For example `--color-accent` gives you `bg-accent`,
`text-accent`, `border-accent`, `hover:bg-accent-dark`, etc.

| Token → utility prefix | Usage |
|---|---|
| `bg` / `bg-alt` / `surface` / `border` | Page background (concrete gray), alt section background, card surfaces, borders |
| `text` / `text-muted` | Primary text, secondary/body copy |
| `ink` / `ink-border` / `ink-text` / `ink-text-muted` | Dark surfaces only — footer, announcement bar, dark bento tiles |
| `accent` / `accent-dark` / `accent-soft` | The ONE interactive color (safety orange) — buttons, links, active states, icon badges. Never mix in a second interactive color. |
| `caution` / `caution-ink` | Caution yellow — the hazard-tape divider and rare structural highlights only. Never used for interactive elements. |
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

Space Grotesk's technical, blueprint-adjacent letterforms already fit the
construction theme, so both fonts are locked, not placeholders.

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
- **`Card`** — base card, static by default (no hover). Pass `interactive`
  only when the card represents a real choice (a sponsor tier), for a single
  subtle lift + border-color hover — never add hover motion to a card with
  nothing to click. Pass `highlight` for a dashed-border callout variant.
- **`Button`** — `variant`: `primary` / `secondary` / `outline`; `size`: `sm` /
  `md` / `lg`. Renders an `<a>` when given `href`, otherwise a `<button>`. Pass
  `disabled` for a CTA that has nothing to link to yet (e.g. a form that
  isn't live) — renders a muted, non-interactive state instead of a dead
  link. Never ship an `href="#"` or a placeholder URL as if it were live.
- **`Pill`** — small badge/tag; `variant`: `accent` / `neutral` / `danger`. Used
  for schedule time/type pills, track prize tags, the "Required" tag.
- **`SectionDivider`** — the caution-tape strip between sections; pass `alt` for
  the faded variant.
- **`ToggleGroup`** — the pill-toggle control used for the schedule day switcher
  and FAQ category filter; generic over any string union of keys.
- **`Reveal`** — wraps a block in a fade/rise-on-scroll entrance (Motion,
  `whileInView`, respects `prefers-reduced-motion`). Use for grid/list items;
  pass `index` so siblings stagger.

For layout, reach for Tailwind's `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
gap-6` pattern directly (used throughout for card grids) rather than inventing a
new grid wrapper.

---

## Icons

All icons come from `@phosphor-icons/react` (`duotone` weight by default),
never emoji or hand-drawn SVG paths. Content-driven icons (stats, features,
tracks, schedule) are referenced by key from `src/data/content.ts` and
resolved through `src/components/ui/icons.tsx` (`ContentIcon`, `iconMap`,
`IconKey`) — add a new entry there before referencing a new key in content
data. One-off icons used directly in a component (nav logo mark, CTA icons)
import straight from `@phosphor-icons/react`.

The hero's "build permit" mascot placeholder was replaced with a graphic
device (the permit card + countdown) rather than a fake illustration. A real
BC-eagle-in-a-hard-hat mascot illustration is a good follow-up asset once
someone can produce or generate one; it wasn't fabricated here.

## Illustrations

`src/assets/illustrations/` holds real, MIT-licensed SVG illustrations from
[unDraw](https://undraw.co) (via the [cuuupid/undraw-illustrations](https://github.com/cuuupid/undraw-illustrations)
mirror — MIT licensed, no attribution required), recolored from unDraw's
default purple to the site's accent/caution tokens. `building_blocks.svg` (two
people building a wall) is used in the About mission block; `building.svg` (a
building under a sun) is used in Apply. If you add another, recolor its `#6c63ff`
fills to `#ff5a1f` (and any secondary accent colors to `#ffc93c`) before
committing it — never ship unDraw's default purple.

## Metadata

`index.html` carries the favicon (`public/favicon.svg`), meta description,
theme-color, and OpenGraph/Twitter tags. There's deliberately no `og:image`
yet — that needs a real 1200x630 designed asset, not a placeholder. Add one
and wire up `og:image` / `twitter:image` before the site is actually shared
publicly.

## Where a real asset would upgrade a placeholder

Everywhere the site is still standing in for an asset that doesn't exist
yet, it's marked `[SVG PLACEHOLDER]` in a comment at the spot — grep for
that string across `src/` to find all of them. Current list:

| Spot | File | What it needs |
|---|---|---|
| Hero corner watermark | `Hero.tsx` (the `Crane` icon) | BC-eagle-in-a-hard-hat mascot mark, same low-opacity corner treatment |
| Nav + footer logo | `Navbar.tsx`, `Footer.tsx` | Real HTH wordmark/logo (currently a hand-drawn roof glyph stand-in) |
| Sponsor logo wall | `Sponsors.tsx` | Each sponsor's real brand SVG/PNG, one per empty dashed tile |
| Social share card | `index.html` (`og:image`) | A real 1200×630 designed card, not a screenshot or a solid color |
| Student testimonial photos | `About.tsx` (Student Stories) | Real headshots only, with permission — never a generic avatar icon; see the comment there for the exact layout to add |
| Speaker cards | `About.tsx` (currently a one-line teaser) | Once names are confirmed: real headshots, swap the teaser for a 3-col card grid using the existing `speakers` array in `content.ts` |

Two illustrations are already real and in place (see **Illustrations**
above) — this list is what's still outstanding, not what's missing overall.

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

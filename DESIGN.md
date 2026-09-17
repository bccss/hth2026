# Hack the Heights 2026 — Design Foundation

This is the single source of truth for the site's shared foundation: color, type,
spacing, and page structure. If you're building a section, start here.

**The rule:** no one invents their own colors, fonts, or spacing values mid-section.
If a value you need doesn't exist yet, add it to `css/tokens.css` first (and flag it
to the team) — don't hardcode a one-off in your section's CSS.

## The three files that enforce this

| File               | What it is                                                                 |
|---------------------|-----------------------------------------------------------------------------|
| `css/tokens.css`    | The actual CSS variables — colors, fonts, type scale, spacing scale. This is what your CSS should `var()` into, not this doc. |
| `skeleton.html`     | The bare page structure: locked navbar + footer, and one empty `<section>` per part (hero, about, tracks, schedule, faq, sponsors, apply). Build your section's markup inside the matching `<section>`. |
| `index.html` / `css/style.css` | The live, filled-in build. Treat it as the reference implementation — if you're unsure how a pattern (card, tab, pill, button) should look, find it there first. |

Load order in `<head>` matters: Google Fonts → `tokens.css` → `style.css`. Both
`index.html` and `skeleton.html` already do this — copy that block if you spin up
a new page.

## Status: this is a *starting point*, not the final construction theme

Colors and fonts below are locked as the **system everyone builds against right
now** — consistent placeholder values, not yet the final construction branding
(safety orange / caution yellow / blueprint navy / concrete gray). When the real
theme is decided, only `css/tokens.css` changes — because everything reads from
it, the whole site updates in one place. Don't wait on that decision to start
building sections.

---

## Color

All color tokens live in `css/tokens.css` under `:root`. Never write a hex value
directly in a section's CSS — use the variable.

### Neutral (light surfaces — most of the page)

| Token | Value | Usage |
|---|---|---|
| `--color-bg` | `#ffffff` | Page background |
| `--color-bg-alt` | `#f4f4f5` | Alternating section background, stat boxes, tab rail |
| `--color-surface` | `#ffffff` | Cards, timeline items, FAQ items — anything "on top of" the page |
| `--color-border` | `#e2e2e5` | Card borders, dividers |
| `--color-text` | `#1a1a1a` | Primary text, headings |
| `--color-text-muted` | `#55555a` | Body copy, secondary labels |

### Ink (dark surfaces — footer, announcement bar)

| Token | Value | Usage |
|---|---|---|
| `--color-ink` | `#17171a` | Footer / announcement bar background |
| `--color-ink-border` | `#2c2c31` | Dividers on dark background |
| `--color-ink-text` | `#d4d4d8` | Body text on dark background |
| `--color-ink-text-muted` | `#8a8a90` | Muted text on dark background (copyright line) |

### Brand accent (placeholder — swap when theme is final)

| Token | Value | Usage |
|---|---|---|
| `--color-accent` | `#e07a1f` | Links, buttons, active states, stat numbers, timeline dots |
| `--color-accent-dark` | `#b8630f` | Hover states, text-on-soft-accent |
| `--color-accent-soft` | `#fdf1e4` | Pill/badge backgrounds (time pill, track prize tag) |

### Semantic

| Token | Value | Usage |
|---|---|---|
| `--color-danger` | `#b42323` | "Required" pill text |
| `--color-danger-soft` | `#fdeaea` | "Required" pill background |

---

## Typography

| Token | Font | Why |
|---|---|---|
| `--font-heading` | Space Grotesk → system-ui fallback | Bold/geometric, holds up at large display sizes. Applied to all `h1`–`h6`, buttons, nav links, tab labels, eyebrows. |
| `--font-body` | Inter → system-ui fallback | Neutral and highly readable at body-copy sizes. Applied to `body` and inherited everywhere else. |

Both are loaded via Google Fonts in `<head>` (see load order above) and are a
**starting point** — easy to swap for something more construction-themed later
without touching a single component file.

### Type scale

| Token | Size | Typical use |
|---|---|---|
| `--text-xs` | 12px | Pills, footnotes, badge text |
| `--text-sm` | 14px | Nav links, muted labels, card body copy |
| `--text-base` | 16px | Default body text |
| `--text-lg` | 18px | Card headings, FAQ questions |
| `--text-xl` | 20px | Hero subtitle, hero badge |
| `--text-2xl` | 24px | Subsection titles, stat numbers |
| `--text-3xl` | 30px | Countdown numbers, tier price |
| `--text-4xl` | 36px | Section titles (top of clamp) |
| `--text-5xl` | 48px | Hero title (bottom of clamp) |
| `--text-6xl` | 60px | Reserved for oversized display moments |

### Weights

`--weight-regular` (400) · `--weight-medium` (500) · `--weight-semibold` (600) ·
`--weight-bold` (700) · `--weight-black` (800)

---

## Spacing scale

4px base unit. Use these for **every** margin, padding, and gap — if nothing
fits cleanly, that's a signal to rethink the layout rather than write a raw
value.

| Token | rem | px |
|---|---|---|
| `--space-1` | 0.25rem | 4px |
| `--space-2` | 0.5rem | 8px |
| `--space-3` | 0.75rem | 12px |
| `--space-4` | 1rem | 16px |
| `--space-5` | 1.25rem | 20px |
| `--space-6` | 1.5rem | 24px |
| `--space-7` | 1.75rem | 28px |
| `--space-8` | 2rem | 32px |
| `--space-10` | 2.5rem | 40px |
| `--space-12` | 3rem | 48px |
| `--space-16` | 4rem | 64px |
| `--space-20` | 5rem | 80px |
| `--space-24` | 6rem | 96px |

## Other tokens

| Group | Tokens |
|---|---|
| Radius | `--radius-sm` (8px, badges/dividers) · `--radius-md` (12px, cards/buttons) · `--radius-lg` (16px, reserved) · `--radius-full` (pills, avatars) |
| Shadow | `--shadow-sm`, `--shadow-md` (card hover) |
| Motion | `--transition-fast` (0.15s, hover states) · `--transition-base` (0.25s, accordions/tabs) |
| Layout | `--max-width` (1140px content width) · `--nav-height` (64px sticky navbar) |
| Breakpoints | Documented as a comment in `tokens.css` (`700px`, `900px`) — CSS vars can't live inside `@media`, so these are enforced by convention, not code. Keep new breakpoints to these two unless there's a real reason. |

---

## Page structure

`skeleton.html` is the enforced page skeleton. Section order is fixed:

```
navbar (locked)
  └─ #hero
  └─ #about
  └─ #tracks
  └─ #schedule
  └─ #faq
  └─ #sponsors
  └─ #apply
footer (locked)
```

Each `<section id="...">` in `skeleton.html` is intentionally empty — that's
where your markup goes. Don't rename ids (the navbar and footer already link to
them) and don't reorder sections without raising it with the team first, since
nav highlighting and in-page anchors depend on this order.

Full current markup for reference: `skeleton.html`.

---

## Component conventions

These patterns already exist in `css/style.css` — reuse them instead of writing
new ones for the same job:

- **Section anatomy**: `.eyebrow` (small caps label) → `.section-title` (h2) →
  `.section-lead` (one-line description). See any section in `index.html`.
- **Cards**: `.card` is the base; `.card-icon` for the emoji/icon slot,
  `.card-highlight` for a callout variant, `.track-card` / `.tier-card` /
  `.quote-card` / `.speaker-card` for section-specific extensions.
- **Buttons**: `.btn` + one of `.btn-primary` / `.btn-secondary` / `.btn-outline`,
  sized with `.btn-small` / (default) / `.btn-large`.
- **Pills/badges**: `.placeholder-tag`, `.time-pill` / `.type-pill` / `.req-pill`,
  `.track-prize` — all built the same way (soft background + accent text).
- **Tabs**: `.tabs` + `.tab-btn` (`.active` toggled via JS) — used by both the
  schedule day switcher and the FAQ category filter.
- **Grids**: `.grid` + `.grid-3` / `.grid-4` / `.grid-6` for card layouts.

---

## SVG / icon placeholders

Not part of this design lock — icons are still emoji stand-ins pending the
construction theme. The full asset list (logo, mascot, section icons, dividers)
is documented as an HTML comment at the top of `index.html`. Don't design new
one-off icon styles; wait for that asset pass.

---

## Contribution rules (tl;dr)

1. Colors, fonts, spacing → always `var(--token)`, never a literal.
2. Need a new token? Add it to `css/tokens.css`, don't inline it.
3. Building a new section? Copy structure from `skeleton.html`, styling
   patterns from `index.html` / `style.css`.
4. Don't rename section ids or reorder sections without checking with the team.
5. Reuse an existing component class before inventing a new one.

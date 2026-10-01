# Component Hierarchy

Current component tree as assembled in [`src/App.tsx`](../src/App.tsx). For
the shared design tokens, page-structure rules, and contribution rules this
doc cross-references, see [`DESIGN.md`](../DESIGN.md) — not duplicated here.

```
App                                 src/App.tsx
├── AnnouncementBar                 src/components/AnnouncementBar.tsx
├── Navbar                          src/components/Navbar.tsx
├── main
│   ├── Hero                        src/components/Hero.tsx          id="hero"
│   ├── SectionDivider
│   ├── About                       src/components/About.tsx         id="about"
│   ├── SectionDivider (alt)
│   ├── Tracks                      src/components/Tracks.tsx        id="tracks"
│   ├── SectionDivider
│   ├── Schedule                    src/components/Schedule.tsx      id="schedule"
│   ├── SectionDivider (alt)
│   ├── Faq                         src/components/Faq.tsx           id="faq"
│   ├── SectionDivider
│   ├── Sponsors                    src/components/Sponsors.tsx      id="sponsors"
│   ├── SectionDivider (alt)
│   └── Apply                       src/components/Apply.tsx         id="apply"
└── Footer                          src/components/Footer.tsx
```

## Sections

- **AnnouncementBar** — dark top strip with a fixed placeholder "site is a
  work in progress" message. No props, no `ui/` primitives.
- **Navbar** — sticky header: logo/home anchor, desktop nav links (About,
  Tracks, Schedule, FAQ, Sponsors) highlighted via `useActiveSection`
  (`src/hooks/useActiveSection.ts`), an Apply `Button`, and a burger menu with
  local `open` state for the mobile panel. Uses `Button`.
- **Hero** — landing section: placeholder mascot box, `h1`, date/location
  line, live countdown to a hardcoded placeholder target date via
  `useCountdown` (`src/hooks/useCountdown.ts`), two `Button`s (Apply Now /
  Learn More), and a static hero-stats row (`heroStats`, defined locally, not
  in `content.ts`). Uses `Button`.
- **About** — mission statement plus five content grids all sourced from
  `src/data/content.ts`: `aboutFeatures`, `stats`, `specialFeatures`,
  `testimonials`, `speakers`. Uses `Card` (including a `highlight` mission
  card) and `SectionHeader`.
- **Tracks** — grid of track cards from `content.ts`'s `tracks` array
  (`ghost: true` renders a dashed/faded "reserved" card). Uses `Card`,
  `Pill`, `SectionHeader`.
- **Schedule** — day-1/day-2 toggle (local `active` state) over
  `scheduleDay1`/`scheduleDay2` from `content.ts`, each event rendered with
  time/type/required `Pill`s on a vertical timeline rail. Uses `Pill`,
  `SectionHeader`.
- **Faq** — category filter (local `category`/`openIndex` state) over `faqs`
  and `faqCategories` from `content.ts`, rendered as an accordion grid. Uses
  `SectionHeader` only (accordion rows are custom markup, not `Card`).
- **Sponsors** — placeholder sponsor-logo grid, `sponsorTiers` cards (one
  `featured` tier gets an accent border + "Popular" badge and a `mailto:`
  `Button`), `whySponsor` feature grid, and a closing CTA block with two
  `Button`s. All data from `content.ts`. Uses `Button`, `Card`,
  `SectionHeader`.
- **Apply** — final CTA section: a benefits list and one `Button` linking to
  an external (placeholder) Google Form. Uses `Button`, `SectionHeader`.
- **Footer** — dark bedrock-colored footer: logo, `siteLinks` (defined
  locally, not in `content.ts`), contact links, copyright line. No `ui/`
  primitives.

## `src/components/ui/` primitives

- **[Button.tsx](../src/components/ui/Button.tsx)** — renders `<a>` when given
  `href`, otherwise `<button>`. Props: `variant?: 'primary' | 'secondary' |
  'outline'` (default `'primary'`), `size?: 'sm' | 'md' | 'lg'` (default
  `'md'`), `className?: string`, plus all native anchor/button attributes
  spread through.
- **[Card.tsx](../src/components/ui/Card.tsx)** — base surface container.
  Props: `children`, `className?: string`, `highlight?: boolean` (default
  `false`) — `true` gives a dashed border, alt background, centered text
  (used for callouts like the About mission statement); `false` gives the
  default hover lift/border/shadow treatment.
- **[Pill.tsx](../src/components/ui/Pill.tsx)** — small badge/tag. Props:
  `children`, `variant?: 'accent' | 'neutral' | 'danger'` (default
  `'accent'`), `className?: string`.
- **[SectionHeader.tsx](../src/components/ui/SectionHeader.tsx)** — the
  eyebrow → title → lead pattern at the top of a section. Props: `eyebrow:
  string`, `title: ReactNode`, `lead?: ReactNode`.
- **[SectionDivider.tsx](../src/components/ui/SectionDivider.tsx)** —
  decorative `aria-hidden` caution-tape strip between sections (currently a
  CSS `repeating-linear-gradient` placeholder for future SVG art per its own
  inline comment). Props: `alt?: boolean` (default `false`) — faded opacity
  variant for alternating rhythm.

## Rules

These mirror and extend `DESIGN.md`'s existing contribution rules — see that
file for the full page-structure and token rationale, not repeated here:

- One file per section, in `src/components/`, matching the section names
  above.
- Pull copy/data from [`src/data/content.ts`](../src/data/content.ts) —
  don't hardcode strings or arrays inline in a component (two current
  exceptions worth knowing about: `Hero`'s `heroStats` and `Footer`'s
  `siteLinks` are still defined locally, not in `content.ts`).
- Reuse a `ui/` primitive (`Button`, `Card`, `Pill`, `SectionHeader`,
  `SectionDivider`) before writing new one-off markup; only build custom
  markup for what's genuinely unique to a section (e.g. `Faq`'s accordion
  rows, `Schedule`'s timeline rail).
- Don't reorder sections in `App.tsx` or rename a section's `id` without team
  sign-off — `useActiveSection` nav highlighting and anchor links
  (`Navbar.tsx`, `Footer.tsx`) depend on the current order and ids.

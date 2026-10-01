# Decision Log

Append-only log of architectural decisions actually made in this repo (ADR-lite).
Add a new entry here when the team makes a real architectural call — a stack
choice, a theming/data mechanism, a locked structural constraint. Don't log
routine feature work (adding a section's content, a new FAQ entry, a copy
tweak); those belong in normal commits, not here. Newest entries go at the
bottom.

## 2026-09-17 — Vite + React + TypeScript + Tailwind CSS v4 stack

**Decision:** Rebuild the site on Vite + React 19 + TypeScript + Tailwind v4,
replacing the earlier plain HTML/CSS MVP.

**Context:** Commit `c44cf63` ("change stack to react, typescript, and
tailwind") switched the project off the initial MVP UI (`26816ef`) onto this
stack.

**Consequences:** All new UI work is componentized React/TSX under `src/`.
Styling goes through Tailwind utility classes generated from tokens (see next
entry), not hand-written CSS files.

## 2026-09-17 — Token-driven theming via a single Tailwind `@theme` block

**Decision:** Define all design tokens (color, font, radius, shadow) once, in
a Tailwind v4 `@theme` block in [`src/index.css`](../src/index.css), and have
every component consume them only via generated Tailwind utilities
(`bg-accent`, `font-heading`, `rounded-md`, etc.) — never hardcode a raw color
or one-off spacing value in a component.

**Context:** [`DESIGN.md`](../DESIGN.md) establishes this as the enforcement
mechanism for a "swap-in-one-place" philosophy: the current palette/fonts are
explicitly a placeholder starting point, not the final construction branding
(safety orange / caution yellow / blueprint navy / concrete gray per
[`docs/design/SPEC.md`](design/SPEC.md)). The team wanted to unblock section
building without waiting on the final visual theme decision.

**Consequences:** When the real construction theme lands, only the `@theme`
block in `src/index.css` needs to change for the whole site to update.
Components must not invent their own colors/fonts/spacing; new tokens get
added to `@theme` first and flagged to the team.

## 2026-09-17 — Tailwind default spacing scale and breakpoints, no custom scale

**Decision:** Use Tailwind's default numeric spacing scale (`p-4`, `gap-6`,
`py-20`, ...) and default breakpoints (`sm:` / `md:` / `lg:`) as-is, instead of
defining a custom spacing scale or the original static build's custom
`700px`/`900px` breakpoints.

**Context:** Per `DESIGN.md`, Tailwind's default 4px base unit already maps
cleanly onto the original design doc's spacing tokens (`--space-1` through
`--space-20`), so a parallel custom scale would be redundant. Using Tailwind's
own breakpoints is called out as "far more idiomatic for a team working in
Tailwind" than porting the old static breakpoints.

**Consequences:** No `spacing`/`screens` overrides live in the Tailwind config.
A layout need that doesn't map to a default step (e.g. wanting `p-[18px]`) is
treated as a signal to rethink the layout, not a reason to add an arbitrary
value.

## 2026-09-17 — Shared `ui/` primitives, reused instead of one-off markup

**Decision:** Build every section on top of a small shared primitive set in
[`src/components/ui/`](../src/components/ui/) — `Button`, `Card`, `Pill`,
`SectionHeader`, `SectionDivider` — rather than writing new styled elements
per section for the same job.

**Context:** `DESIGN.md`'s "Component conventions" section calls these out by
name with their variant APIs, and instructs new sections to build with these
first, writing new one-off markup only for what's genuinely unique to that
section.

**Consequences:** Visual consistency (button styles, card hover states, pill
badges, section headers/dividers) is centralized in five files. A new visual
variant should be added as a prop on the existing primitive, not a new
bespoke component.

## 2026-09-17 — Locked section order in `App.tsx`

**Decision:** `src/App.tsx` assembles all page sections in a fixed order
(`AnnouncementBar → Navbar → Hero → About → Tracks → Schedule → Faq →
Sponsors → Apply → Footer`), and this order is not to be changed without
team sign-off.

**Context:** `DESIGN.md` states the navbar's scroll-spy (`useActiveSection`)
and in-page anchor links depend on this order, and section `id`s must not be
renamed since the navbar/footer link to them directly via anchor hrefs.

**Consequences:** Adding a new section means picking a position and wiring a
nav link, not silently reordering existing sections. Renaming a section's
`id` requires checking every anchor href in `Navbar.tsx` and `Footer.tsx`
first.

## 2026-09-18 — Construction/excavation visual theme, `wireframes.html` as source of truth

**Decision:** Commit to a construction/excavation visual theme for the 2026
site — an underground "dig down to build up" metaphor spanning Hero (sky) →
About (site office) → Tracks (excavation pit) → Schedule/Timeline (sewer
pipeline) → Footer (bedrock) — with
[`docs/design/wireframes.html`](design/wireframes.html) as the canonical
visual reference and [`docs/design/SPEC.md`](design/SPEC.md) /
[`docs/design/STYLE_GUIDE.md`](design/STYLE_GUIDE.md) as the written spec and
token/contrast reference.

**Context:** Added in commit `ded0df0` ("Add HTH 2026 construction-theme
wireframes, style guide, and spec"), this is the first concrete design
direction after the placeholder palette/fonts called out in `DESIGN.md`.

**Consequences:** Future visual implementation work (section backgrounds,
edge transitions, hand-drawn SVG art, the skinning mechanism below) should
match `wireframes.html` and `SPEC.md` rather than improvising new visual
language. The actual `@theme` tokens in `src/index.css` have not yet been
updated to the final construction palette as of this entry — that migration
is still pending implementation.

## 2026-09-18 — `data-skin` attribute-based skinning mechanism for section surfaces

**Decision:** Skin each section's surface via a `data-skin` attribute on its
container (e.g. `[data-skin="wood"]`) that redefines a small set of CSS custom
properties (`--surface`, `--surface-text`, `--edge`, `--radius`), which shared
components (`Button`, `Card`, etc.) read — rather than giving each section its
own bespoke styling or per-component style props.

**Context:** Specified in `docs/design/SPEC.md`'s "Component specs" section:
"Structure, spacing, and type never change per skin" — only the surface
tokens vary, keeping the excavation-strata sections (site office / stone /
sewer / bedrock) visually distinct while reusing the same component
structure.

**Consequences:** Implementing the construction theme should extend
`ui/` primitives to read `--surface`/`--edge`/`--radius`/`--shadow` custom
properties (falling back to the current `@theme` tokens), rather than
branching component logic per section. This mechanism is specified but not
yet implemented in the current `src/components/ui/` code.

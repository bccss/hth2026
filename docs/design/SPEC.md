# HTH 2026 — Site Spec & Wireframe Notes

Visual wireframes: `wireframes.html` (open in a browser). Tokens/contrast: `STYLE_GUIDE.md`. Placeholders throughout: `[DATE]`, `[LOCATION]`, `[$]`. Content lives in `src/data/content.ts`; sections in `src/components/` (existing files: `Hero`, `About`, `Tracks`, `Schedule`→Timeline, `Footer`/`Sponsors`/`Faq`).

## Page structure

Single scroll, order locked: Nav (sticky) → Hero → About → Tracks → Timeline → Footer. Anchors: `#about #tracks #timeline #sponsors #faq #register`. Depth is a metaphor of *building up by digging down*: each section is one stratum.

### Transitions (no abrupt background changes)

| Boundary | Edge treatment | Implementation |
|---|---|---|
| Hero → About | Grass ground line, jagged | 40px `clip-path` polygon, grass fill over soil strip, then bench colour |
| About → Tracks | Soil lip (torn edge) | 48px `clip-path` polygon in soil colour over the bench bg |
| Tracks → Timeline | Concrete slab with manhole ring; drips fall from lip | 56px slab, 10px black bottom rule; drip = 3 small SVGs |
| Timeline → Footer | Rock strata, jagged | 52px `clip-path`, bedrock fill |

Rule: each edge is rendered as the *next* section's colour, overlaps by 1px (`margin-top:-1px`) to avoid hairline seams, and is decorative (`aria-hidden`).

## Nav (persistent)

- Sticky, solid `asphalt`, 64px desktop / 56px mobile; caution-tape 12px stripe is the **bottom border** (`repeating-linear-gradient(-45deg, yellow 0 14px, asphalt 14px 28px)`). Text never overlaps the stripe.
- Desktop: logo left; links About/Tracks/Timeline/Sponsors/FAQ; Register right (only yellow-filled item).
- Mobile/tablet: logo, Register, burger. Burger toggles a full-width solid panel (48px rows). `aria-expanded`, `aria-controls`, focus trap, Esc closes, closes on link click. Scroll-spy sets `aria-current` (existing `useActiveSection`).
- Skip link "Skip to content" before nav.

## 1 · Hero (sky)

- Layout: 100svh max 720px min 560px. Sky gradient; clouds (slow drift); crane top-right; machinery silhouette (excavator/mixer) on ground line right/left.
- Three beams stack top→bottom, each a solid steel bar with white display letters: **HACK** horizontal (hangs from crane hook), **THE** diagonal (−7°, mid-swing), **HEIGHTS** flat on the ground line. Beams *are* the `<h1>` (visually split; one `<h1 aria-label="Hack the Heights">` with `aria-hidden` spans).
- Info panel (solid white, border, offset shadow): date, location, countdown (existing `useCountdown`), primary **Register**, secondary text link.
- Desktop: panel right-of-beams, overlapping the sky only. Tablet: panel below beams. Mobile: beams stack full width at ~40% size, panel below, full-width button.
- **Hand-drawn:** same technique as the Timeline. Props and beams run through an SVG turbulence/displacement filter (scale 3.5–4) so edges wobble; the info panel gets an irregular border radius and a 1° tilt. Marker font (Permanent Marker) only for the panel date.
- Motion: beam drop-in (once), crane sway ±1.5°, cloud drift.

## 2 · About (site office, wood)

- Background: workbench — pegboard, hanging tools, blueprint corner (one layered WebP + optional SVG tools). Decorative only.
- Blocks, each on a **plank**: description (centered, max 780px), 3 stat planks (dark plank), speakers heading plank, speaker cards (photo, name, title; 3-up → 1-up).
- Planks share padding 16/20, 3px border, nail dots (CSS pseudo-elements). No text on the bench.
- Speakers may be "TBA" placeholders; keep card count fixed to avoid layout shift.

## 3 · Tracks (excavation, stone)

- Dirt background with strata bands and scattered pebble texture; fossil illustrations sit **inside** slabs (not on the dirt).
- Two identical stone slabs, 50/50 grid at ≥768px, stacked below. Same height, illustration frame (320×200), copy length (±10%), prize rows.
  - **BC Track** — BC = **Boston College**; eagle fossil; sub-label "Boston College students".
  - **Main Track** — dinosaur fossil; sub-label "Open to all hackers".
- Each slab: eyebrow (TRACK 01/02), title, sub-label, fossil, 2-line description, prizes as chips (1st/2nd/3rd + [$]), Register link.
- Equal weight enforced by a single `<TrackCard>` component fed by `content.ts`; no per-track styling props except illustration and copy.

## 4 · Timeline (underground, "The Pipeline" — hand-drawn)

- **Look:** a sketched sewer, not a diagram. One wobbly pipe **snakes** down a hand-inked brick tunnel wall (irregular bricks, moss, damp streaks, edge hatching), starting at a manhole shaft with a light beam and ladder and ending at an outfall into a murky pool (a rat sits on the edge). Grey/charcoal palette, no blue.
- **Hand-drawn technique:** all art is one inline SVG background per breakpoint. Lines run through an `feTurbulence` + `feDisplacementMap` filter (scale 5–9) and are double-stroked (ink outline, body, offset shade, dashed highlight), so nothing is ruler-straight. Bricks are a 360×180 seeded-random tile pattern. Regenerate with the script logic in the wireframe if the shape changes.
- **Reading order:** painted **START ↓** at the manhole → chevrons on the pipe show flow direction → five **numbered valve wheels** (milestones; finished = grey, current = "● NOW") → painted **FINISH** at the outfall.
- **Labels:** riveted tin plates (HTML, not SVG) placed beside each valve by percentage of the SVG box (`left/top = x/W, y/H`), alternating sides, tilted ±1°, each with a hand-lettered yellow date tab. Plates and the title plaque are the only places text appears; they are opaque `#2B3031` (12.1:1 body, 7.9:1 accent).
- **Fonts:** Permanent Marker for date tabs, plaque title and painted START/FINISH only; Inter for everything else. Label text scales with `cqw` but never below 12px (mobile 14px).
- **Responsive:** desktop = 1200×1400 snaking pipe with alternating labels (≥820px); mobile = 375×1450 straight left pipe, labels to the right of each valve.
- **Motion:** pipe highlight dashes drift (7s linear). `prefers-reduced-motion`: static.
- **A11y:** the SVG is `aria-hidden`; the real content is an ordered list of the plates (`<ol>`, `<time datetime>`, `aria-current="step"` on the NOW item).

## Depth system (all sections)

Each section carries a **level tag** (0 m, −3 m, −10 m, −25 m) and 3–4 layers: back (texture), mid (props/strata), content (solid surfaces), foreground (overlapping props, `pointer-events:none`, never over text) plus an inset vignette. Hero adds sun, clouds, far skyline of finished high-rises, mid-ground buildings (glass tower in progress, framed house, brick block with scaffold, site-office cabin), second faded crane, scaffolds, and ground props (excavator, dump truck, mixer, cones, barriers, signs, hard hat). About adds lamp glow, shelf, tilted planks with long shadows, foreground tools. Tracks becomes a pit: side walls, strata bands, shovels stuck in the dirt (foreground, replacing rocks), one slab offset 8px. Footer adds strata + ore glints.

## 5 · Footer (bedrock)

- Order: Sponsors (tiered logo grid; tiers named Foundation / Steel / Concrete), FAQ (accordion, `<details>`), Contact, closing CTA "Lay your foundation." + **Register**, copyright.
- Desktop 3-column (2fr 2fr 1.2fr); mobile single column, CTA full width. Logos sit on light tiles for contrast (SVG monochrome or on white).

## Component specs

| Component | API | Notes |
|---|---|---|
| `Button` | `variant: primary\|secondary`, `size`, `href/onClick` | Skin via ancestor `data-skin`; 48px min; states per Style Guide |
| `Card` | `children`, `tone?` | Skin-driven surface; opaque; 20px pad |
| `TimelineNode` | `date, title, body, side` | Renders valve + arm + label; `<li>` |
| `NavItem` | `href, current` | 48px row; underline when current |
| `Section` | `id, skin, edge` | Sets `data-skin`, background layers, bottom edge |

Skinning mechanism: `[data-skin="wood"]{--surface:var(--color-pine);--surface-text:#2B1B0E;--edge:var(--color-walnut);--radius:0}` etc., and shared components read `--surface / --edge / --radius / --shadow`. Structure, spacing, and type never change per skin.

## Responsive behavior

| | Mobile <640 | Tablet 640–1023 | Desktop ≥1024 |
|---|---|---|---|
| Nav | Logo, Register, burger | Same | Full links |
| Hero | Beams stacked ~40% scale; panel below | Beams 70% width; panel below | Beams left, panel right |
| About | Single column planks | Planks; speakers 2-up | Description + stats 3-up + speakers 3-up |
| Tracks | Stacked slabs | Stacked or 2-up (≥768) | 2-up |
| Timeline | Left rail, labels right | Left rail | Centered spine, alternating |
| Footer | 1 col | 2 col | 3 col |

Touch targets ≥ 44px; no horizontal scroll at 320px; illustration density reduces (drop secondary machinery / pegboard tools) below 640px.

## Motion & `prefers-reduced-motion`

| Animation | Default | Reduced motion |
|---|---|---|
| Beam drop-in, crane sway, cloud drift | Once / slow loop | Static final pose, no drift |
| Water flow, drips | Looping gradient | Static water gradient, drips hidden |
| Valve rotate, scroll reveals | Once on enter | Shown in final state |
| Smooth scroll | `scroll-behavior:smooth` | `auto` |
| Hover lift | Translate 1px | Colour change only |

```css
@media (prefers-reduced-motion: reduce){
  *,*::before,*::after{animation:none!important;transition:none!important;scroll-behavior:auto!important}
}
```
Animations never convey required information (dates, links, status), and none flash (>3/s). A pause control is not needed because no loop exceeds 5s of *noticeable* motion, and reduced motion removes them.

## Asset list & performance

| Asset | Format | Budget | Notes |
|---|---|---|---|
| Hero props — `assets/*.svg`: crane, excav, truck, mixer, tower, house, brick, highrise, cabin, scaffold, frame, cone, barrier, sign, hardhat, barrow, pallet, cloud, bird | Standalone **SVG** (flat style, 3px ink outline, shared palette) | ≤ 4KB each (SVGO) | Same art is inlined as `<symbol>`s in `wireframes.html`; separate layers → parallax without repaint |
| Shovel (Tracks foreground) | `assets/shovel.svg` | ≤ 2KB | Reused 3–4× at different angles |
| Bench bg (About) | WebP/AVIF 1600w + 800w `srcset` | ≤ 120KB | Tools as separate SVG overlays |
| Dirt + strata | Tileable WebP 512² + CSS gradient | ≤ 40KB | Pebbles = repeated bg |
| Eagle, dinosaur fossils | SVG, single-colour + `currentColor` | ≤ 15KB each | Same style, same frame size |
| Sewer scene (Timeline) | One inline SVG per breakpoint (bricks tile + pipe + props, roughened via SVG filter) | ≤ 45KB desktop, ≤ 35KB mobile (gzip much less) | No raster, no video; pipe animation = dash offset only |
| Bedrock texture | CSS gradient + tiny noise PNG | ≤ 10KB | |
| Section edges | CSS `clip-path` | 0KB | |
| Speaker / sponsor images | WebP, fixed aspect, `loading="lazy"`, width/height set | ≤ 40KB | |
| Fonts | Space Grotesk, Inter, JetBrains Mono (WOFF2 subset), `font-display:swap` | ≤ 120KB total | Display face: Anton subset |

Guidance: layer backgrounds (sky/props/ground as separate elements) instead of one giant image; hero art is the LCP (preload the sky-bearing layer, inline critical SVG); below-fold art is `loading="lazy"` / `content-visibility:auto`; animate only `transform`/`opacity`/`background-position`; page budget ≤ 500KB first load, ≤ 1.5MB total; `aria-hidden="true"` and empty `alt` for decorative art.

## Accessibility & testing checklist

- Landmarks (`header nav main footer`), one `<h1>`, ordered headings, skip link.
- Contrast: verify tokens with a WCAG ratio script/axe after any colour change; text only on solid surfaces.
- Keyboard: nav, burger, accordion, CTAs all reachable, visible focus ring.
- Test with reduced motion on, 200% zoom, and 320px width.

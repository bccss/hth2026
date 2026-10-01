# Wireframe Style Extraction

Literal technical extraction from `docs/design/wireframes.html`'s inline
`<style>` and SVG `<defs>` — actual values as implemented in the mockup, not
design rationale (see `STYLE_GUIDE.md` for that) or the token doc
(`DESIGN.md`). Each value is cross-checked against `src/index.css`'s
`@theme` block as of this writing.

## Status

**None of the construction-theme values below are in `src/index.css` yet.**
`src/index.css` currently only defines the placeholder theme (`--color-accent:
#e07a1f` etc. — orange/neutral). `STYLE_GUIDE.md` already states the intent
("when adopted, the tokens ... replace the placeholder `@theme` block"); this
doc is the literal value list for that port, pulled directly from the
wireframe source rather than re-typed from prose.

## CSS custom properties (`:root`, wireframes.html lines 8–16)

| Wireframe var | Hex | In `src/index.css`? | Notes |
|---|---|---|---|
| `--ink` | `#16181C` | No | STYLE_GUIDE calls this `--color-asphalt` |
| `--steel` | `#3A434C` | No | |
| `--steel-l` | `#C9D0D6` | No | STYLE_GUIDE: `--color-steel-lt` |
| `--yellow` | `#FFC20E` | No | STYLE_GUIDE: `--color-caution` |
| `--yellow-hi` | `#FFD54A` | No | STYLE_GUIDE: `--color-caution-hi` |
| `--sky` | `#8FCFF5` | No | |
| `--sky-d` | `#1F6FB2` | No | STYLE_GUIDE: `--color-sky-deep` |
| `--grass` | `#5E8C3A` | No | |
| `--soil` | `#6B4A2F` | No | |
| `--soil-l` | `#C49A6C` | No | STYLE_GUIDE: `--color-sand` |
| `--wood` | `#E9C99A` | No | STYLE_GUIDE: `--color-pine` |
| `--wood-d` | `#5A3A22` | No | STYLE_GUIDE: `--color-walnut` |
| `--wood-t` | `#2B1B0E` | No | text-on-plank color, not in STYLE_GUIDE's token table (it's a text-color pairing, listed only in the contrast table) |
| `--stone` | `#D9D4CA` | No | |
| `--stone-t` | `#1B1A17` | No | text-on-stone, same as above (contrast table only) |
| `--rust` | `#8A3A16` | No | |
| `--pipe-bg` | `#1E2223` | No | |
| `--pipe` | `#2B3031` | No | |
| `--water` | `#A9CFC6` | No | |
| `--pipe-t` | `#F2F4F4` | No | text-on-pipe |
| `--rock` | `#1F2228` | No | STYLE_GUIDE: `--color-bedrock` |
| `--rock-t` | `#E8EAED` | No | text-on-bedrock |
| `--bg` | `#F4F5F6` | No (index.css `--color-bg` is `#ffffff`, a different value/role) | wireframe page canvas, not the site background |

Sewer-scene-only literal colors not lifted into `:root` (appear directly in
`feTurbulence`/`fill`/`stroke` attributes): `#9aa3a3` (finished valve grey),
`#0b0d0d` / `#000` (manhole shaft), `#8fb1a8` / `#a9b8b0` (drip/moss detail
strokes) — these are one-off illustration shades, not proposed tokens.

## Font declarations found in wireframes.html

| Family | Where used | Loaded in `src/index.html`? |
|---|---|---|
| `Impact, system-ui` (`.beam`) | Hero beam letters (`font:900 5rem/1 Impact,system-ui`) | No — STYLE_GUIDE specifies **Anton** as the real display face with Impact as fallback; wireframe uses the fallback directly |
| `"Permanent Marker", Impact, cursive` | Timeline date tabs / plaques / hero marker labels (`.plq h3`, `.lab3 .dt`, `.nb`, `.mk`, `.hero .panel b`) | **No** — not present in `index.html`'s Google Fonts link (only Space Grotesk + Inter loaded); wireframe pulls it via its own inline `@import url("https://fonts.googleapis.com/css2?family=Permanent+Marker&display=swap")` (line 181) |
| `monospace` | SVG label text (`SITE OFFICE`), `.cap`, `.lbl`, `.ph` | System monospace — STYLE_GUIDE assigns eyebrow/label role to **JetBrains Mono**, also not yet loaded in `index.html` |
| `Space Grotesk` / `Inter` | Not referenced directly inside wireframes.html's own `<style>` (wireframe uses system font stack for body text) | Yes — already in `index.html` and `src/index.css` (`--font-heading` / `--font-body`) |

**Gap to port:** Anton (display), Permanent Marker (hand-lettering), and
JetBrains Mono (eyebrows/labels) all need adding to `index.html`'s font
link and to `--font-*` tokens in `src/index.css`; currently only
`--font-heading` (Space Grotesk) and `--font-body` (Inter) exist.

## Key class patterns (structural, not visual-only)

| Class | Pattern | Purpose |
|---|---|---|
| `.tape` | `repeating-linear-gradient(-45deg, var(--yellow) 0 14px, var(--ink) 14px 28px)`, 12px height | Caution-tape strip, nav bottom border |
| `.btn` | `background:var(--yellow); border:3px solid var(--ink); box-shadow:4px 4px 0 var(--ink)` | Hard-offset button shadow (matches STYLE_GUIDE §3 "Shadow: hard offset only") |
| `.plank` / `.plank.dk` | `border:3px solid var(--wood-d); box-shadow:0 5px 0 var(--wood-d), inset 0 0 0 5px rgba(90,58,34,.18)`; `::before/::after` 8px circles = nail dots | About section wood-skin surface |
| `.stone` | `border:4px solid #57524A; border-radius:10px; box-shadow:inset 0 0 0 3px #B8B2A7, 6px 6px 0 rgba(0,0,0,.35)` | Tracks slab surface, matches STYLE_GUIDE stone skin (10px radius) |
| `.prize` | `background:var(--yellow); border:2px solid var(--ink)` | Prize chip, "yellow is fill/accent only" rule in practice |
| `.ms2 .valve` / `.lab3` | Circular yellow valve (44/40px) + riveted tin-plate label (`border-radius:8px 13px 7px 12px/12px 7px 13px 8px`, double radial-gradient dot corners simulating rivets) | Timeline milestone components |
| `.plq` | Same irregular-radius + rivet-dot technique as `.lab3`, `rotate(-1.5deg)` | Timeline title plaque |

## Hand-drawn effect: SVG filters

Two filter pairs, tuned per breakpoint (desktop/mobile use separate ids but
identical parameters):

| Filter id | `feTurbulence` | `feDisplacementMap` scale | Applied to |
|---|---|---|---|
| `hd` (hero) | `type="fractalNoise" baseFrequency=".035" numOctaves="2" seed="5"` | `4` | Hero prop SVGs (`.hero svg.p:not(.trail)`) |
| `hd2` (hero beams) | `type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="8"` | `3.5` | `.hero .beam` |
| `rough1200` / `rough375` (timeline pipe/brick, desktop/mobile) | `baseFrequency=".025" numOctaves="2" seed="4"` | `9` | Pipe body, pool outline |
| `rough21200` / `rough2375` (timeline valve arms) | `baseFrequency=".06" numOctaves="2" seed="9"` | `5` | Valve connector arms |

This matches SPEC.md's stated range ("scale 3.5–9" / "5–9" depending on
section) — confirmed exact per-element values above. No equivalent filter
exists yet in the React codebase (no SVG filters are currently defined in
`src/`).

## Not yet ported (summary for the frontend team)

1. All construction-theme color tokens (full list above) — `src/index.css`
   still has the placeholder orange/neutral `@theme` block.
2. Three font families: Anton (or Impact fallback), Permanent Marker,
   JetBrains Mono — only Space Grotesk + Inter are loaded.
3. Hard-offset shadow convention (`Npx Npx 0 color`, no blur) — current
   `--shadow-card` in `src/index.css` (`0 12px 24px rgba(0,0,0,.08)`) is a
   soft blurred shadow, the opposite of the wireframe's construction-shadow
   style.
4. The `feTurbulence`/`feDisplacementMap` hand-drawn filter technique and
   its four tuned parameter sets (table above) — nothing in `src/` uses SVG
   filters yet.
5. Skin-specific radii (wood `0`, stone `10px`, pipe `999px`/`0`) — current
   `src/index.css` radius tokens (`--radius-sm/md/lg`: 8/12/16px) are a
   single flat scale, not per-skin.

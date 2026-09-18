# HTH 2026 Style Guide — "Construction Team"

Theme: *construction team — fixing your school by building.* Narrative: **build high by digging deep.**
This extends `/DESIGN.md`; when adopted, the tokens below replace the placeholder `@theme` block in `src/index.css` (component code reads tokens by name, so nothing else changes).

## 1. Color

| Group | Token | Hex | Use |
|---|---|---|---|
| Caution | `--color-caution` | `#FFC20E` | Primary CTA fill, active underline, tape, prize chips |
| | `--color-caution-hi` | `#FFD54A` | Hover fill |
| Asphalt / Steel | `--color-asphalt` | `#16181C` | Nav, text on yellow, borders, shadows |
| | `--color-steel` | `#3A434C` | Beams, muted text on white (`#3F4852` for body-muted) |
| | `--color-steel-lt` | `#C9D0D6` | Dividers, disabled |
| Sky | `--color-sky` / `--color-sky-lt` | `#8FCFF5` / `#DDF1FC` | Hero gradient |
| | `--color-sky-deep` | `#1F6FB2` | Links on light surfaces |
| Earth | `--color-grass` | `#5E8C3A` | Ground line only |
| | `--color-soil` / `--color-sand` | `#6B4A2F` / `#C49A6C` | Excavation bg / soil-lip edge |
| | `--color-rust` | `#8A3A16` | Eyebrows on stone |
| Wood | `--color-pine` / `--color-walnut` | `#E9C99A` / `#5A3A22` | Plank fill / dark plank + borders |
| Stone | `--color-stone` | `#D9D4CA` | Slab fill (border `#57524A`) |
| Sewer | `--color-pipe-bg` / `--color-pipe` | `#1E2223` / `#2B3031` | Section bg / label + pipe body |
| | `--color-water` | `#A9CFC6` | Muted water, accent text on pipe |
| Bedrock | `--color-bedrock` | `#1F2228` | Footer |
| Semantic | `--color-danger` | `#B42323` | Errors, "Required" |

Rules: yellow is **fill or accent, never body text on light**. Only one filled-yellow control per viewport region (Register). Text never sits directly on illustration — only on a solid surface (nav, plank, slab, label, panel, footer).

## 2. Typography

| Role | Font | Size / line-height | Weight |
|---|---|---|---|
| Display (beam letters) | Anton or Impact fallback, caps, +0.08em | `clamp(2.5rem, 9vw, 6rem)` / 1 | 400 (font is heavy) |
| H2 (section) | Space Grotesk | 2rem → 2.75rem / 1.15 | 700 |
| H3 (card) | Space Grotesk | 1.25rem / 1.3 | 700 |
| Body | Inter | 1rem (16px min) / 1.6 | 400 |
| Small / meta | Inter | 0.875rem / 1.5 | 500 |
| Eyebrow / label | JetBrains Mono, caps, +0.1em | 0.75rem | 700 |
| Button / nav | Space Grotesk, caps, +0.04em | 1rem | 700 |

Body text never below 16px on mobile; eyebrows (≥ 12px) are decorative labels only, never sole carriers of information.

## 3. Spacing, shape, elevation

- **Scale (4px base):** 4 · 8 · 12 · 16 · 24 · 32 · 48 · 64 · 96. Section padding: 64 mobile / 96 desktop. Content max-width 1120px, gutter 16 (mobile) / 24 (tablet+).
- **Borders:** 3px solid (skin colour). **Radius:** wood 0, stone 10px, pipe 999px (buttons/nodes) / 0 (labels).
- **Shadow:** hard offset only — `4px 4px 0 asphalt` (no blur). Keeps illustrated backgrounds crisp.
- **Section edges:** 40–56px tall drawn transitions (see SPEC §Transitions).

## 4. Components & states

Base sizes: button/nav-item min-height 48px; timeline node hit area 44px.

| State | Treatment (all skins) |
|---|---|
| Default | Skin surface + 3px border + offset shadow |
| Hover | Fill → hover colour; translate(-1px,-1px), shadow 5px |
| Active/pressed | translate(3px,3px), shadow 1px |
| Focus-visible | 3px `#FFC20E` outline **plus** 2px `#16181C` offset ring (visible on any bg, ≥3:1) |
| Disabled | `steel-lt` fill, steel text, no shadow, `aria-disabled` |
| Current (nav) | 3px yellow underline + `aria-current="location"` |

Skins (`data-skin`): **wood** — pine/walnut, nail dots, 0 radius; **stone** — stone fill, chiselled inner border, 10px radius; **pipe** — asphalt-outlined, flange ring (`0 0 0 4px pipe`), round nodes/pill buttons. Same padding, type, and state rules across all three.

## 5. Contrast (WCAG 2.2 AA)

Requirements: normal text ≥ 4.5:1, large text (≥24px, or ≥18.66px bold) and UI/focus/graphics ≥ 3:1. **All text sits on solid fills**, so illustrated backgrounds never enter the calculation. Measured ratios:

| Pair | Ratio | |
|---|---|---|
| Yellow `#FFC20E` on asphalt `#16181C` (nav links) | 10.98 | AAA |
| Asphalt on yellow (buttons, prize chips) | 10.98 | AAA |
| White on steel `#3A434C` (beam letters) | 10.06 | AAA |
| Asphalt on white / steel-muted `#3F4852` on white (hero panel) | 17.77 / 9.29 | AAA |
| Plank text `#2B1B0E` / muted `#4A3320` on pine | 10.50 / 7.44 | AAA |
| Cream `#FFF4E0` on walnut | 9.34 | AAA |
| Stone text `#1B1A17` / muted `#443F37` on stone | 11.78 / 7.07 | AAA |
| Rust eyebrow `#8A3A16` on stone | 5.27 | AA |
| Pipe label `#F2F4F4` / water `#A9CFC6` on `#2B3031` | 12.12 / 7.92 | AAA |
| Footer `#E8EAED` / muted `#A9B0B8` / yellow on `#1F2228` | 13.22 / 7.28 / 9.85 | AAA |
| Sky-deep `#1F6FB2` link on white | 5.28 | AA |
| Danger `#B42323` on white | 6.55 | AA |

Non-text: beam vs sky 5.95:1; slab/plank borders (3px dark) ≥ 3:1 against their backgrounds. Re-run the check whenever a token changes (script in SPEC §Testing).
Never rely on colour alone: active nav has an underline; track identity has heading + icon + label; valves have date text.

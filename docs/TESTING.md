# Testing

## Running tests

```
npm test          # run once
npm run test:watch  # watch mode
```

Stack: Vitest + React Testing Library + jsdom, configured in `vitest.config.ts`
(kept separate from `vite.config.ts` because the Tailwind v4 Vite plugin pulls
in an ESM-only CSS color dependency that breaks the Vitest worker). Global
setup (`@testing-library/jest-dom` matchers, an `IntersectionObserver` stub for
`useActiveSection`) lives in `src/test/setup.ts`.

## Philosophy

The visual design (colors, spacing, copy) is actively being reworked against
`wireframes.html` / `docs/design/SPEC.md`. Tests here deliberately assert on
**structure and behavior**, not styling or exact copy:

- Does the section render with its expected `id` (nav anchors and
  `useActiveSection` depend on these)?
- Do interactive elements (links, buttons, the FAQ accordion) exist and have
  accessible names?
- Does `App.tsx` render sections in the locked order from `DESIGN.md`?
- Does the FAQ accordion toggle `aria-expanded`?
- Does `useCountdown` compute and tick down correctly?

Tests avoid asserting on Tailwind class names, exact placeholder copy, or
pixel/visual details, so they keep passing while the styling agent iterates.

## What's covered vs. not

Covered by this suite: landmark/section presence, heading presence, locked
page order, accessible names on interactive elements, FAQ accordion
open/close, countdown math.

Not covered (see the "Accessibility & testing checklist" in
`docs/design/SPEC.md` for the full list) — these need manual or axe-based
checks, not unit tests:

- Real color contrast ratios
- Behavior under 200%/400% browser zoom
- `prefers-reduced-motion` handling
- Actual keyboard-only navigation flow and focus ring visibility
- Rendering at 320px width
- `useActiveSection`'s real scroll-driven highlighting (its `IntersectionObserver`
  is stubbed as a no-op here, not exercised end-to-end)

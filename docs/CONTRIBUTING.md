# Contributing — Git & Commit Conventions

This is a small team building against a shared, evolving design system
(`DESIGN.md`, `docs/design/`). These conventions exist to keep history
readable as more people touch the same files, not to add process for its
own sake.

**Note on history:** the existing commits (`initial mvp ui`, `change stack
to react, typescript, and tailwind`, `Add HTH 2026 construction-theme
wireframes, style guide, and spec`) predate this doc and are informal —
that's fine, they were early scaffolding commits. This convention applies
going forward, not retroactively.

## Commit messages

Format, based on [Conventional Commits](https://www.conventionalcommits.org/):

```
<type>(<scope>): <short summary>
```

**Types:**

| Type | When |
|---|---|
| `feat` | New section, component, or user-facing behavior |
| `fix` | Bug fix (broken layout, wrong link, a11y issue) |
| `docs` | Changes to `DESIGN.md`, `docs/`, or code comments only |
| `style` | Formatting/whitespace only — no logic or token changes |
| `refactor` | Restructuring code with no behavior change (e.g. extracting a `ui/` primitive) |
| `chore` | Tooling, deps, config (`vite.config.ts`, `tsconfig.json`, etc.) |
| `test` | Adding or updating tests |

**Scope** is whatever part of the site the change touches — usually a
component name (lowercased) or design area. Examples from this codebase:

```
feat(hero): add countdown timer and mascot placeholder
fix(navbar): correct aria-expanded state on burger menu
docs(style): extract wireframe tokens into style.md
refactor(ui): extract Pill from Tracks prize chips
chore(tailwind): bump to v4
style(footer): fix indentation in Sponsors grid
```

If a change spans multiple sections, use the most relevant one or omit the
scope (`feat: ...`) rather than inventing a compound scope.

## Branch naming

This repo currently uses simple per-person branches (`dylan-edits`). As the
team grows, prefer one of these two patterns — pick whichever fits the work:

- **`<name>-<topic>`** — for a branch primarily driven by one person across
  several small changes (matches the existing `dylan-edits` style):
  `dylan-hero-rework`, `arnav-timeline-svg`
- **`<type>/<topic>`** — for a branch scoped to one feature or fix, especially
  if someone else might pick it up: `feat/timeline-pipeline`, `fix/nav-focus-ring`

Either is fine; don't mix scopes into one branch (one section/feature per branch)
so PRs stay reviewable.

## Pull request checklist

Before opening a PR, confirm:

- [ ] `npx tsc --noEmit` (or `npm run build`) passes with no type errors
- [ ] No hardcoded colors, fonts, or spacing — every value comes from a
  Tailwind utility backed by `src/index.css`'s `@theme` block (see `DESIGN.md`)
- [ ] No hardcoded copy in components — placeholder/real content lives in
  `src/data/content.ts`
- [ ] New section markup reuses `src/components/ui/` primitives where a
  pattern already exists (`Button`, `Card`, `Pill`, `SectionHeader`, `SectionDivider`)
- [ ] Section `id`s and `src/App.tsx` order are unchanged, unless the PR is
  specifically about reordering (and the team has agreed)
- [ ] Basic accessibility checked per `docs/design/SPEC.md`'s checklist
  (landmarks, focus states, alt text, keyboard reachability)

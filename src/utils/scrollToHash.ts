import type { MouseEvent } from 'react'

/**
 * Intercepts a click on an in-page `#section` anchor and scrolls to it
 * manually instead of letting the browser follow the href — this keeps the
 * URL constant (no `#section` ever gets appended/changed) while still
 * respecting each section's `scroll-margin-top` (see index.css) so it lands
 * below the sticky navbar. Non-hash hrefs (mailto:, external links) are
 * left alone.
 */
export function scrollToHash(event: MouseEvent<HTMLAnchorElement>, href: string) {
  if (!href.startsWith('#')) return
  const target = document.getElementById(href.slice(1))
  if (!target) return
  event.preventDefault()
  target.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

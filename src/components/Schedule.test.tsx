import { fireEvent, render, screen, within } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Schedule from './Schedule'

describe('Schedule', () => {
  it('shows Day 1 by default and switches to Day 2 via the tabs', () => {
    render(<Schedule />)
    const panel = screen.getByRole('tabpanel')
    expect(screen.getByRole('tab', { name: /day 1/i })).toHaveAttribute('aria-selected', 'true')
    expect(within(panel).getAllByText('Kickoff & intro').length).toBeGreaterThan(0)

    fireEvent.click(screen.getByRole('tab', { name: /day 2/i }))
    expect(screen.getByRole('tab', { name: /day 2/i })).toHaveAttribute('aria-selected', 'true')
    expect(within(panel).getAllByText('Submit projects').length).toBeGreaterThan(0)
    expect(within(panel).queryByText('Kickoff & intro')).toBeNull()
  })
})

import { act, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import Hero from './Hero'

describe('Hero', () => {
  it('renders the hero section with id="hero"', () => {
    const { container } = render(<Hero />)
    expect(container.querySelector('section#hero')).toBeInTheDocument()
  })

  it('renders a labeled h1', () => {
    render(<Hero />)
    expect(screen.getByRole('heading', { level: 1, name: 'Hack the Heights' })).toBeInTheDocument()
  })

  it('renders a Register link to #register', () => {
    render(<Hero />)
    expect(screen.getByRole('link', { name: /register/i })).toHaveAttribute('href', '#register')
  })

  afterEach(() => vi.useRealTimers())

  it('counts down days/hours/minutes/seconds to the event and ticks', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-10-22T07:58:30')) // 2d 1h 1m 30s before 09:00 on the 24th
    render(<Hero />)
    expect(screen.getByRole('timer')).toHaveTextContent('02Days01Hrs01Min30Sec')
    act(() => vi.advanceTimersByTime(1000))
    expect(screen.getByRole('timer')).toHaveTextContent('02Days01Hrs01Min29Sec')
  })
})

import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import About from './About'

describe('About', () => {
  it('renders the about section with id="about"', () => {
    const { container } = render(<About />)
    expect(container.querySelector('section#about')).toBeInTheDocument()
  })

  it('renders a section heading', () => {
    render(<About />)
    expect(screen.getAllByRole('heading').length).toBeGreaterThan(0)
  })
})

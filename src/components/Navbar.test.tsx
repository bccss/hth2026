import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Navbar from './Navbar'

describe('Navbar', () => {
  it('renders a banner/header landmark', () => {
    render(<Navbar />)
    expect(screen.getByRole('banner')).toBeInTheDocument()
  })

  it('renders nav links with accessible names', () => {
    render(<Navbar />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThan(0)
    links.forEach((link) => expect(link).toHaveAccessibleName())
  })

  it('renders a mobile nav toggle button that is accessible', () => {
    render(<Navbar />)
    const toggle = screen.getByRole('button', { name: /toggle navigation/i })
    expect(toggle).toHaveAttribute('aria-expanded', 'false')
  })
})

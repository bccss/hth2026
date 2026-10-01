import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Tracks from './Tracks'

describe('Tracks', () => {
  it('renders the tracks section with id="tracks"', () => {
    const { container } = render(<Tracks />)
    expect(container.querySelector('section#tracks')).toBeInTheDocument()
  })

  it('renders at least one track card heading', () => {
    const { container } = render(<Tracks />)
    expect(container.querySelectorAll('h3').length).toBeGreaterThan(0)
  })
})

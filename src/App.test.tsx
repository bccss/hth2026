import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import App from './App'

describe('App', () => {
  it('renders all sections in the locked order defined by docs/design/wireframes.html', () => {
    const { container } = render(<App />)

    const main = container.querySelector('main')
    expect(main).toBeInTheDocument()

    const sectionIds = Array.from(main!.querySelectorAll(':scope > section')).map((el) => el.id)

    expect(sectionIds).toEqual(['hero', 'about', 'tracks', 'schedule'])
  })

  it('renders the header, main, and footer landmarks', () => {
    const { container } = render(<App />)
    expect(container.querySelector('header')).toBeInTheDocument()
    expect(container.querySelector('main')).toBeInTheDocument()
    expect(container.querySelector('footer')).toBeInTheDocument()
  })
})

import '@testing-library/jest-dom'

// jsdom has no IntersectionObserver; useActiveSection (Navbar) needs a stub to render.
class IntersectionObserverStub {
  observe() {}
  unobserve() {}
  disconnect() {}
}
// @ts-expect-error jsdom lacks this global
globalThis.IntersectionObserver = IntersectionObserverStub

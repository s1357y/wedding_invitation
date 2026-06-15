import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { useScrollAnimation } from './useScrollAnimation'
import React from 'react'

describe('useScrollAnimation', () => {
  let observeMock: ReturnType<typeof vi.fn>
  let disconnectMock: ReturnType<typeof vi.fn>
  let unobserveMock: ReturnType<typeof vi.fn>

  beforeEach(() => {
    observeMock = vi.fn()
    disconnectMock = vi.fn()
    unobserveMock = vi.fn()
    vi.stubGlobal(
      'IntersectionObserver',
      vi.fn((_cb: IntersectionObserverCallback) => {
        return { observe: observeMock, disconnect: disconnectMock, unobserve: unobserveMock }
      })
    )
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  function TestComponent() {
    const ref = useScrollAnimation(0)
    return React.createElement('div', { ref, 'data-testid': 'target' })
  }

  it('returns a ref that attaches to the DOM element', () => {
    render(React.createElement(TestComponent))
    expect(screen.getByTestId('target')).toBeTruthy()
  })

  it('calls observe on mount', () => {
    render(React.createElement(TestComponent))
    expect(observeMock).toHaveBeenCalled()
  })

  it('calls disconnect on unmount', () => {
    const { unmount } = render(React.createElement(TestComponent))
    unmount()
    expect(disconnectMock).toHaveBeenCalled()
  })

  it('falls back gracefully when IntersectionObserver is unavailable', () => {
    vi.stubGlobal('IntersectionObserver', undefined)
    expect(() => render(React.createElement(TestComponent))).not.toThrow()
  })
})

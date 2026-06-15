import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import AudioPlayer from './AudioPlayer'

const mockPlay = vi.fn().mockResolvedValue(undefined)
const mockPause = vi.fn()

beforeEach(() => {
  vi.clearAllMocks()
  Object.defineProperty(window.HTMLMediaElement.prototype, 'play', {
    configurable: true,
    value: mockPlay,
  })
  Object.defineProperty(window.HTMLMediaElement.prototype, 'pause', {
    configurable: true,
    value: mockPause,
  })
})

describe('AudioPlayer', () => {
  it('renders music toggle button', () => {
    render(<AudioPlayer />)
    expect(screen.getByRole('button', { name: /배경음악/ })).toBeTruthy()
  })

  it('shows "켜기" label initially (not playing)', () => {
    render(<AudioPlayer />)
    expect(screen.getByLabelText('배경음악 켜기')).toBeTruthy()
  })

  it('toggles to playing state on click', async () => {
    render(<AudioPlayer />)
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(mockPlay).toHaveBeenCalled()
  })

  it('pauses when clicked while playing', async () => {
    render(<AudioPlayer />)

    // Start playing and wait for state to update
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })

    // Wait for playing state — label changes to "끄기"
    await vi.waitFor(() => {
      expect(screen.getByLabelText('배경음악 끄기')).toBeInTheDocument()
    })

    // Click again to pause
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })

    expect(mockPause).toHaveBeenCalled()
  })
})

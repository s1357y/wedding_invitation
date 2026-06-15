import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import FloatingUI from './FloatingUI'

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
  Object.defineProperty(window, 'scrollY', { configurable: true, value: 0 })
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('FloatingUI', () => {
  it('음악 토글 버튼이 렌더링된다', () => {
    render(<FloatingUI />)
    expect(screen.getByLabelText('배경음악 켜기')).toBeInTheDocument()
  })

  it('공유 버튼이 렌더링된다', () => {
    render(<FloatingUI />)
    expect(screen.getByLabelText('공유하기')).toBeInTheDocument()
  })

  it('음악 버튼 클릭 시 play가 호출된다', async () => {
    render(<FloatingUI />)
    await act(async () => {
      fireEvent.click(screen.getByLabelText('배경음악 켜기'))
    })
    expect(mockPlay).toHaveBeenCalled()
  })

  it('공유 버튼 클릭 시 navigator.share 또는 clipboard.writeText가 호출된다', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, share: shareMock })
    render(<FloatingUI />)
    await act(async () => {
      fireEvent.click(screen.getByLabelText('공유하기'))
    })
    expect(shareMock).toHaveBeenCalled()
  })

  it('navigator.share 미지원 시 clipboard.writeText가 호출된다', async () => {
    const writeMock = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', {
      ...navigator,
      share: undefined,
      clipboard: { writeText: writeMock },
    })
    render(<FloatingUI />)
    await act(async () => {
      fireEvent.click(screen.getByLabelText('공유하기'))
    })
    expect(writeMock).toHaveBeenCalled()
  })

  it('scrollY가 0이면 스크롤 업 버튼이 숨겨진다', () => {
    render(<FloatingUI />)
    expect(screen.queryByLabelText('최상단으로 이동')).not.toBeInTheDocument()
  })
})

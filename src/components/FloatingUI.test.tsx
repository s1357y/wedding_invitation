import { render, screen, fireEvent, act } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import FloatingUI from './FloatingUI'

const mockPlay = vi.fn().mockResolvedValue(undefined)
const mockPause = vi.fn()
const defaultSharePath = '/invitation'
const deployedShareUrl = 'https://mobileweddinginvitation.vercel.app'

function getDefaultShareUrl() {
  return deployedShareUrl
}

function getDefaultShareImageUrl() {
  return new URL('/images/og.jpg', getDefaultShareUrl()).toString()
}

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
  delete window.Kakao
  window.history.replaceState({}, '', defaultSharePath)
})

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('FloatingUI', () => {
  it('음악 토글 버튼이 렌더링된다', () => {
    render(<FloatingUI />)
    expect(screen.getByLabelText('음소거 해제')).toBeInTheDocument()
  })

  it('카카오 SDK가 준비되면 카카오 공유 버튼과 일반 공유 버튼이 렌더링된다', () => {
    window.Kakao = {
      init: vi.fn(),
      isInitialized: () => true,
      Share: { createDefaultButton: vi.fn(), sendDefault: vi.fn() },
    }

    render(<FloatingUI />)
    expect(screen.getByLabelText('카카오톡으로 공유')).toBeInTheDocument()
    expect(screen.getByLabelText('공유하기')).toBeInTheDocument()
  })

  it('카카오 SDK가 준비되면 카카오 공유 버튼이 숨김 처리되지 않는다', () => {
    window.Kakao = {
      init: vi.fn(),
      isInitialized: () => true,
      Share: { createDefaultButton: vi.fn(), sendDefault: vi.fn() },
    }

    render(<FloatingUI />)
    expect(screen.getByLabelText('카카오톡으로 공유')).not.toHaveStyle({
      opacity: '0',
      visibility: 'hidden',
    })
  })

  it('음악 버튼 클릭 시 play가 호출된다', async () => {
    render(<FloatingUI />)
    await act(async () => {
      fireEvent.click(screen.getByLabelText('음소거 해제'))
    })
    expect(mockPlay).toHaveBeenCalled()
  })

  it('카카오 공유 버튼을 createDefaultButton으로 바인딩한다', async () => {
    const createDefaultButtonMock = vi.fn()
    window.Kakao = {
      init: vi.fn(),
      isInitialized: () => true,
      Share: { createDefaultButton: createDefaultButtonMock, sendDefault: vi.fn() },
    }

    await act(async () => {
      render(<FloatingUI />)
    })

    expect(createDefaultButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        container: '#kakaotalk-sharing-btn',
        objectType: 'feed',
        installTalk: true,
        content: expect.objectContaining({
          title: '임은총 ♥ 김세연 결혼합니다',
          description: '10월 24일 토요일 오후 4시 · 주님의교회 중예배실 루이스홀',
          imageUrl: getDefaultShareImageUrl(),
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            mobileWebUrl: getDefaultShareUrl(),
            webUrl: getDefaultShareUrl(),
          },
        }),
        social: {
          likeCount: 0,
          commentCount: 0,
          sharedCount: 0,
        },
      }),
    )
  })

  it('공식 샘플 구조의 버튼 링크를 포함해 바인딩한다', async () => {
    const createDefaultButtonMock = vi.fn()
    window.Kakao = {
      init: vi.fn(),
      isInitialized: () => true,
      Share: { createDefaultButton: createDefaultButtonMock, sendDefault: vi.fn() },
    }

    await act(async () => {
      render(<FloatingUI />)
    })

    expect(createDefaultButtonMock).toHaveBeenCalledWith(
      expect.objectContaining({
        objectType: 'feed',
        installTalk: true,
        content: expect.objectContaining({
          title: '임은총 ♥ 김세연 결혼합니다',
          description: '10월 24일 토요일 오후 4시 · 주님의교회 중예배실 루이스홀',
          imageUrl: getDefaultShareImageUrl(),
          imageWidth: 1200,
          imageHeight: 630,
          link: {
            mobileWebUrl: getDefaultShareUrl(),
            webUrl: getDefaultShareUrl(),
          },
        }),
        buttons: [
          {
            title: '모바일 청첩장 보러가기',
            link: {
              mobileWebUrl: getDefaultShareUrl(),
              webUrl: getDefaultShareUrl(),
            },
          },
        ],
      }),
    )
  })

  it('공유 문구에 연도가 포함되지 않는다', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, share: shareMock })

    render(<FloatingUI />)
    await act(async () => {
      fireEvent.click(screen.getByLabelText('공유하기'))
    })

    expect(shareMock).toHaveBeenCalledWith(
      expect.objectContaining({
        text: '10월 24일 토요일 오후 4시 · 주님의교회 중예배실 루이스홀',
      }),
    )
  })

  it('카카오 SDK가 없으면 카카오 공유 버튼 DOM은 남기고 숨긴다', () => {
    render(<FloatingUI />)
    expect(screen.getByLabelText('카카오톡으로 공유')).toHaveStyle({
      opacity: '0',
      visibility: 'hidden',
    })
  })

  it('createDefaultButton 미지원 시 카카오 공유 버튼 DOM은 남기고 숨긴다', () => {
    window.Kakao = {
      init: vi.fn(),
      isInitialized: () => true,
      Share: { sendDefault: vi.fn() },
    }

    render(<FloatingUI />)
    expect(screen.getByLabelText('카카오톡으로 공유')).toHaveStyle({
      opacity: '0',
      visibility: 'hidden',
    })
  })

  it('공유 버튼 클릭 시 navigator.share가 호출된다', async () => {
    const shareMock = vi.fn().mockResolvedValue(undefined)
    vi.stubGlobal('navigator', { ...navigator, share: shareMock })

    render(<FloatingUI />)
    await act(async () => {
      fireEvent.click(screen.getByLabelText('공유하기'))
    })

    expect(shareMock).toHaveBeenCalledWith(
      expect.objectContaining({
        url: getDefaultShareUrl(),
      }),
    )
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
    expect(writeMock).toHaveBeenCalledWith(getDefaultShareUrl())
  })

  it('scrollY가 0이면 스크롤 업 버튼이 숨겨진다', () => {
    render(<FloatingUI />)
    expect(screen.queryByLabelText('최상단으로 이동')).not.toBeInTheDocument()
  })
})

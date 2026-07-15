import { useEffect, useMemo, useRef, useState } from 'react'
import { wedding } from '../config/wedding'

const KAKAO_SHARE_BUTTON_ID = 'kakaotalk-sharing-btn'

declare global {
  interface Window {
    Kakao?: {
      init: (key: string) => void
      isInitialized: () => boolean
      Share?: {
        createDefaultButton?: (opts: object) => void
        sendDefault: (opts: object) => void
      }
    }
  }
}

function getShareUrl() {
  if (wedding.siteUrl) return wedding.siteUrl

  const { origin, pathname } = window.location
  return `${origin}${pathname}`.replace(/\/$/, '') || window.location.href
}

function getShareImageUrl(shareUrl: string) {
  return new URL(wedding.shareImagePath, shareUrl).toString()
}

function getKakaoSharePayload(shareUrl: string, shareImageUrl: string, shareTitle: string, shareDescription: string) {
  return {
    objectType: 'feed',
    content: {
      title: shareTitle,
      description: shareDescription,
      imageUrl: shareImageUrl,
      imageWidth: 1200,
      imageHeight: 630,
      link: {
        mobileWebUrl: shareUrl,
        webUrl: shareUrl,
      },
    },
    social: {
      likeCount: 0,
      commentCount: 0,
      sharedCount: 0,
    },
    buttons: [
      {
        title: '모바일 청첩장 보러가기',
        link: {
          mobileWebUrl: shareUrl,
          webUrl: shareUrl,
        },
      },
    ],
    installTalk: true,
  }
}

function getKakaoButtonVisibilityStyle(isKakaoShareReady: boolean) {
  if (isKakaoShareReady) return undefined

  return {
    opacity: 0,
    pointerEvents: 'none' as const,
    visibility: 'hidden' as const,
  }
}

export default function FloatingUI() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [copied, setCopied] = useState(false)
  const [isKakaoShareReady, setIsKakaoShareReady] = useState(false)
  const shareUrl = getShareUrl()
  const { title: shareTitle, description: shareDescription } = wedding.share
  const shareImageUrl = getShareImageUrl(shareUrl)
  const kakaoSharePayload = useMemo(
    () => getKakaoSharePayload(shareUrl, shareImageUrl, shareTitle, shareDescription),
    [shareDescription, shareImageUrl, shareTitle, shareUrl],
  )

  /* ── 카카오 SDK 로드 ── */
  useEffect(() => {
    const key = wedding.kakaoJavaScriptKey
    if (!key) return

    function bindKakaoShareButton() {
      if (!window.Kakao?.Share?.createDefaultButton) return false

      window.Kakao.Share.createDefaultButton({
        container: `#${KAKAO_SHARE_BUTTON_ID}`,
        ...kakaoSharePayload,
      })
      setIsKakaoShareReady(true)
      return true
    }

    if (window.Kakao?.isInitialized()) {
      if (!bindKakaoShareButton()) {
        setIsKakaoShareReady(false)
      }
      return
    }

    const script = document.createElement('script')
    script.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.8.1/kakao.min.js'
    script.async = true
    script.onload = () => {
      if (window.Kakao && !window.Kakao.isInitialized()) {
        window.Kakao.init(key)
      }
      if (!bindKakaoShareButton()) {
        setIsKakaoShareReady(false)
      }
    }
    document.head.appendChild(script)
  }, [kakaoSharePayload])

  /*
  function handleKakaoShare() {
    if (!window.Kakao?.Share?.sendDefault) {
      void handleShare()
      return
    }

    window.Kakao.Share.sendDefault(kakaoSharePayload)
  }
  */

  /* ── 오디오: 음소거로 자동재생 → 첫 터치 시 언뮤트 ── */
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.loop = true
    audio.volume = 0.4
    audio.muted = true

    // 음소거 자동재생 시도 (iOS 포함 대부분 허용)
    audio.play().catch(() => {})

    const unmute = () => {
      audio.muted = false
      setMuted(false)
    }
    document.addEventListener('touchstart', unmute, { once: true, passive: true })
    document.addEventListener('click', unmute, { once: true })

    return () => {
      document.removeEventListener('touchstart', unmute)
      document.removeEventListener('click', unmute)
    }
  }, [])

  /* ── 스크롤 감지 ── */
  useEffect(() => {
    function onScroll() {
      setShowScrollTop(window.scrollY > 300)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function toggleMute() {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = !audio.muted
    setMuted(audio.muted)
  }

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareDescription,
          url: shareUrl,
        })
      } catch {
        // 사용자가 취소한 경우 무시
      }
    } else {
      await navigator.clipboard.writeText(shareUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const btnBase =
    'pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white shadow-lg hover:bg-black/60 transition-colors'

  return (
    <>
      <audio ref={audioRef} src={wedding.audioSrc} preload="metadata" loop />

      {/* fixed 오버레이 — max-w-xl 안에 버튼 고정 */}
      <div className="fixed inset-x-0 top-0 bottom-0 pointer-events-none z-50">
        <div className="relative max-w-xl h-full mx-auto">

          {/* 음악 토글 — 우상단 */}
          <button
            aria-label={muted ? '음소거 해제' : '음소거'}
            onClick={toggleMute}
            className={`absolute top-4 right-4 ${btnBase}`}
          >
            {muted ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM17.78 9.22a.75.75 0 1 0-1.06 1.06L18.44 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L19.5 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L20.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L19.5 10.94l-1.72-1.72Z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 0 0 1.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06ZM18.584 5.106a.75.75 0 0 1 1.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 0 1-1.06-1.06 8.25 8.25 0 0 0 0-11.668.75.75 0 0 1 0-1.06Z" />
                <path d="M15.932 7.757a.75.75 0 0 1 1.061 0 6 6 0 0 1 0 8.486.75.75 0 0 1-1.06-1.061 4.5 4.5 0 0 0 0-6.364.75.75 0 0 1 0-1.06Z" />
              </svg>
            )}
          </button>

          {/* 카카오 공유 + 공유 버튼 — 우하단 */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            {copied && (
              <span className="pointer-events-none text-xs bg-black/70 text-white px-2 py-1 rounded-full whitespace-nowrap">
                링크 복사됨
              </span>
            )}
            {/* 카카오톡 공유 */}
            <button
              id={KAKAO_SHARE_BUTTON_ID}
              aria-label="카카오톡으로 공유"
              className="pointer-events-auto w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-opacity hover:opacity-90"
              style={{ background: '#FEE500', ...getKakaoButtonVisibilityStyle(isKakaoShareReady) }}
              type="button"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="#3A1D1D" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 3C6.48 3 2 6.72 2 11.28c0 2.9 1.58 5.46 4 7.02l-.9 3.3 3.78-1.86C9.86 19.9 10.92 20 12 20c5.52 0 10-3.93 10-8.72S17.52 3 12 3z"/>
              </svg>
            </button>

            {/* 링크 공유 */}
            <button
              aria-label="공유하기"
              onClick={handleShare}
              className={btnBase}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M15.75 4.5a3 3 0 1 1 .825 2.066l-8.421 4.679a3.002 3.002 0 0 1 0 1.51l8.421 4.679a3 3 0 1 1-.729 1.31l-8.421-4.678a3 3 0 1 1 0-4.132l8.421-4.679a3 3 0 0 1-.096-.755Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>

          {/* 스크롤 최상단 — 우하단 (공유 버튼 위) */}
          {showScrollTop && (
            <button
              aria-label="최상단으로 이동"
              onClick={scrollToTop}
              className={`absolute bottom-28 right-4 ${btnBase}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z" clipRule="evenodd" />
              </svg>
            </button>
          )}

        </div>
      </div>
    </>
  )
}

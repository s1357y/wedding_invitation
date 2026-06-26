import { useEffect, useRef, useState } from 'react'
import { wedding } from '../config/wedding'

export default function FloatingUI() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [muted, setMuted] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [copied, setCopied] = useState(false)

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
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${wedding.groom.name} ♥ ${wedding.bride.name} 결혼합니다`,
          url,
        })
      } catch {
        // 사용자가 취소한 경우 무시
      }
    } else {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const btnBase =
    'pointer-events-auto w-10 h-10 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white shadow-lg hover:bg-black/60 transition-colors'

  return (
    <>
      <audio ref={audioRef} src={wedding.audioSrc} preload="metadata" loop />

      {/* fixed 오버레이 — max-w-md 안에 버튼 고정 */}
      <div className="fixed inset-x-0 top-0 bottom-0 pointer-events-none z-50">
        <div className="relative max-w-md h-full mx-auto">

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

          {/* 공유 버튼 — 우하단 */}
          <div className="absolute bottom-4 right-4 flex flex-col items-end gap-2">
            {copied && (
              <span className="pointer-events-none text-xs bg-black/70 text-white px-2 py-1 rounded-full whitespace-nowrap">
                링크 복사됨
              </span>
            )}
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
              className={`absolute bottom-[3.75rem] right-4 ${btnBase}`}
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

import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'

interface LightboxProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

const ACCENT = '#bca38a'

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const swiperRef = useRef<SwiperType | null>(null)
  const touchStartX = useRef<number | null>(null)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') swiperRef.current?.slidePrev()
      if (e.key === 'ArrowRight') swiperRef.current?.slideNext()
    }
    window.addEventListener('keydown', handleKey)

    function preventPinch(e: TouchEvent) {
      if (e.touches.length > 1) e.preventDefault()
    }
    document.addEventListener('touchmove', preventPinch, { passive: false })

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKey)
      document.removeEventListener('touchmove', preventPinch)
    }
  }, [onClose])

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
      onClick={handleOverlayClick}
    >
      {/* 닫기 */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 leading-none"
        style={{ color: ACCENT, fontSize: '1.5rem' }}
        aria-label="닫기"
      >
        ✕
      </button>

      {/* 이미지 */}
      <div
        className="w-full max-w-lg px-4"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => { touchStartX.current = e.touches[0].clientX }}
        onTouchEnd={(e) => {
          if (touchStartX.current === null) return
          const dx = Math.abs(e.changedTouches[0].clientX - touchStartX.current)
          const x = e.changedTouches[0].clientX
          touchStartX.current = null
          if (dx > 10) return
          if (x > window.innerWidth / 2) swiperRef.current?.slideNext()
          else swiperRef.current?.slidePrev()
        }}
      >
        <Swiper
          initialSlide={initialIndex}
          loop
          onSwiper={(swiper) => { swiperRef.current = swiper; setCurrentIndex(swiper.realIndex) }}
          onSlideChange={(swiper) => setCurrentIndex(swiper.realIndex)}
          style={{ height: '75vh' }}
          className="w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '75vh' }}>
              <img
                src={src}
                alt={`갤러리 ${i + 1}`}
                style={{ maxWidth: '100%', maxHeight: '75vh', objectFit: 'contain', display: 'block' }}
                onError={(e) => { e.currentTarget.style.display = 'none' }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 컨트롤: ← 1/32 → */}
      <div
        className="flex items-center gap-8 mt-4"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          aria-label="이전 사진"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT, fontSize: '1.4rem', lineHeight: 1, padding: '0.5rem' }}
        >
          ‹
        </button>
        <span style={{ color: ACCENT, fontSize: '0.85rem', letterSpacing: '0.12em', fontFamily: 'sans-serif', minWidth: '4rem', textAlign: 'center' }}>
          {currentIndex + 1} / {images.length}
        </span>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          aria-label="다음 사진"
          style={{ background: 'none', border: 'none', cursor: 'pointer', color: ACCENT, fontSize: '1.4rem', lineHeight: 1, padding: '0.5rem' }}
        >
          ›
        </button>
      </div>
    </div>,
    document.body
  )
}

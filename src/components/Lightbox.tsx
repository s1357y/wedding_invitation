import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation } from 'swiper/modules'
import type { Swiper as SwiperType } from 'swiper'
import 'swiper/css'
import 'swiper/css/navigation'

interface LightboxProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(initialIndex)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
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

  function handleSlideChange(swiper: SwiperType) {
    setCurrentIndex(swiper.realIndex)
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/90"
      onClick={handleOverlayClick}
    >
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 text-white/80 hover:text-white text-3xl leading-none"
        aria-label="닫기"
      >
        ✕
      </button>

      <div className="w-full max-w-lg px-4" onClick={(e) => e.stopPropagation()}>
        <Swiper
          modules={[Navigation]}
          navigation
          initialSlide={initialIndex}
          loop
          onSlideChange={handleSlideChange}
          onSwiper={(swiper: SwiperType) => setCurrentIndex(swiper.realIndex)}
          className="w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img
                src={src}
                alt={`갤러리 ${i + 1}`}
                style={{ maxWidth: '100%', maxHeight: '80vh', objectFit: 'contain', display: 'block', margin: '0 auto' }}
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* 카운터 */}
      <p
        onClick={(e) => e.stopPropagation()}
        style={{
          marginTop: '1rem',
          color: 'rgba(255,255,255,0.7)',
          fontSize: '0.85rem',
          letterSpacing: '0.1em',
          fontFamily: 'sans-serif',
        }}
      >
        {currentIndex + 1} / {images.length}
      </p>
    </div>,
    document.body
  )
}

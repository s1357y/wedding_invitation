import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

interface LightboxProps {
  images: string[]
  initialIndex: number
  onClose: () => void
}

export default function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const overlayRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)

    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  function handleOverlayClick(e: React.MouseEvent) {
    if (e.target === overlayRef.current) onClose()
  }

  return createPortal(
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
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
          modules={[Navigation, Pagination]}
          navigation
          pagination={{ clickable: true }}
          initialSlide={initialIndex}
          loop
          className="w-full"
        >
          {images.map((src, i) => (
            <SwiperSlide key={i}>
              <img
                src={src}
                alt={`갤러리 ${i + 1}`}
                className="w-full max-h-[80vh] object-contain"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>,
    document.body
  )
}

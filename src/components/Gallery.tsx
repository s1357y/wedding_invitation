import { useState } from 'react'
import { wedding } from '../config/wedding'
import Lightbox from './Lightbox'

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = wedding.gallery

  return (
    <section className="py-16 px-0" style={{ background: '#fdfcf9' }}>
      <div className="text-center mb-8 px-8">
        <p className="text-lg font-serif-theme font-medium mb-3" style={{ color: '#5a3020' }}>우리의 이야기</p>
        <p className="text-xs font-light" style={{ color: '#8a7a6a' }}>since 2013~</p>
      </div>

      <div className="grid grid-cols-3 gap-0.5 max-w-md mx-auto">
        {images.map((src, i) => (
          <button
            key={i}
            className="overflow-hidden focus:outline-none focus-visible:ring-2"
            style={{ aspectRatio: '1/1' }}
            onClick={() => setLightboxIndex(i)}
            aria-label={`갤러리 사진 ${i + 1} 크게 보기`}
          >
            <img
              src={src}
              alt={`갤러리 ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              onError={(e) => {
                const el = e.currentTarget
                if (el.parentElement) el.parentElement.style.backgroundColor = '#f0ede9'
                el.style.display = 'none'
              }}
            />
          </button>
        ))}
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  )
}

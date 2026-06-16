import { useState } from 'react'
import { wedding } from '../config/wedding'
import Lightbox from './Lightbox'

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = wedding.gallery

  return (
    <section className="py-16 px-0" style={{ background: '#fdfcf9' }}>
      <div className="text-center mb-8 px-8">
        <p className="text-base font-serif-theme font-medium mb-1" style={{ color: '#4a4a4a' }}>
          Our Moments <span className="font-light text-sm" style={{ color: '#8a7a6a' }}>since 2013</span>
        </p>
        <p className="text-[10px] tracking-[0.35em] uppercase font-medium" style={{ color: '#bca38a' }}>Our Gallery</p>
      </div>

      <div className="grid grid-cols-2 gap-0.5 max-w-md mx-auto">
        {images.map((src, i) => (
          <button
            key={i}
            className="overflow-hidden focus:outline-none focus-visible:ring-2"
            style={{ aspectRatio: '3/4' }}
            onClick={() => setLightboxIndex(i)}
            aria-label={`갤러리 사진 ${i + 1} 크게 보기`}
          >
            <img
              src={src}
              alt={`갤러리 ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
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

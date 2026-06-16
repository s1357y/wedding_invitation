import { useState } from 'react'
import { wedding } from '../config/wedding'
import Lightbox from './Lightbox'

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = wedding.gallery

  return (
    <section className="py-16 px-0" style={{ background: '#fdfcf9' }}>
      <p
        className="text-[10px] tracking-[0.35em] uppercase text-center mb-8 font-medium"
        style={{ color: '#bca38a' }}
      >
        Gallery
      </p>

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

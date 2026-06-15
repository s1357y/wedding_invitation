import { useState } from 'react'
import { wedding } from '../config/wedding'
import Lightbox from './Lightbox'

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const images = wedding.gallery

  return (
    <section className="px-6 py-20 bg-theme-bg">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-10 text-center">
        Gallery
      </p>

      <div className="grid grid-cols-3 gap-1 max-w-sm mx-auto">
        {images.map((src, i) => (
          <button
            key={i}
            className="aspect-square overflow-hidden bg-theme-surface focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-accent"
            onClick={() => setLightboxIndex(i)}
            aria-label={`갤러리 사진 ${i + 1} 크게 보기`}
          >
            <img
              src={src}
              alt={`갤러리 ${i + 1}`}
              className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                const el = e.currentTarget
                el.parentElement!.style.backgroundColor = 'var(--color-surface)'
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

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { wedding } from '../config/wedding'
import Lightbox from './Lightbox'

const INITIAL_COUNT = 9
const EAGER_COUNT = 9  // 처음 보이는 9장은 즉시 로드

export default function Gallery() {
  const [showAll, setShowAll] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [loaded, setLoaded] = useState<Record<number, boolean>>({})
  const images = wedding.gallery
  const visible = showAll ? images : images.slice(0, INITIAL_COUNT)

  return (
    <section className="py-16 px-0" style={{ background: '#fdfcf9' }}>
      <div className="text-center mb-8 px-8">
        <p className="text-lg font-serif-theme font-medium mb-3" style={{ color: '#5a3020' }}>우리의 시간</p>
        <p className="text-xs font-light" style={{ color: '#8a7a6a' }}>since 2013~</p>
      </div>

      <div className="grid grid-cols-3 gap-0.5 max-w-xl mx-auto">
        {visible.map((src, i) => (
          <button
            key={i}
            className="overflow-hidden focus:outline-none"
            style={{ aspectRatio: '1/1', userSelect: 'none', background: '#f0ede9' }}
            onClick={() => setLightboxIndex(i)}
            onContextMenu={(e) => e.preventDefault()}
            aria-label={`갤러리 사진 ${i + 1} 크게 보기`}
          >
            <img
              src={src}
              alt={`갤러리 ${i + 1}`}
              className="w-full h-full object-cover"
              loading={i < EAGER_COUNT ? 'eager' : 'lazy'}
              fetchPriority={i < 3 ? 'high' : 'auto'}
              decoding="async"
              draggable={false}
              onLoad={() => setLoaded(prev => ({ ...prev, [i]: true }))}
              onContextMenu={(e) => e.preventDefault()}
              style={{
                opacity: loaded[i] ? 1 : 0,
                transition: 'opacity 0.3s ease',
              }}
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

      {!showAll && images.length > INITIAL_COUNT && (
        <div className="text-center mt-6">
          <button
            onClick={() => setShowAll(true)}
            className="inline-flex flex-col items-center gap-1"
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#8a7a6a' }}
            aria-label="사진 더 보기"
          >
            <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.78rem', letterSpacing: '0.08em' }}>
              더 보기
            </span>
            <ChevronDown className="w-4 h-4 animate-bounce" style={{ color: '#bca38a' }} />
          </button>
        </div>
      )}
    </section>
  )
}

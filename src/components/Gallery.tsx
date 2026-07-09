import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { wedding } from '../config/wedding'

const INITIAL_COUNT = 9

export default function Gallery() {
  const [showAll, setShowAll] = useState(false)
  const images = wedding.gallery
  const visible = showAll ? images : images.slice(0, INITIAL_COUNT)

  return (
    <section className="py-16 px-0" style={{ background: '#fdfcf9' }}>
      <div className="text-center mb-8 px-8">
        <p className="text-lg font-serif-theme font-medium mb-3" style={{ color: '#5a3020' }}>우리의 이야기</p>
        <p className="text-xs font-light" style={{ color: '#8a7a6a' }}>since 2013~</p>
      </div>

      <div className="grid grid-cols-3 gap-0.5 max-w-md mx-auto">
        {visible.map((src, i) => (
          <div
            key={i}
            className="overflow-hidden"
            style={{ aspectRatio: '1/1', userSelect: 'none' }}
            onContextMenu={(e) => e.preventDefault()}
          >
            <img
              src={src}
              alt={`갤러리 ${i + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
              draggable={false}
              onContextMenu={(e) => e.preventDefault()}
              onError={(e) => {
                const el = e.currentTarget
                if (el.parentElement) el.parentElement.style.backgroundColor = '#f0ede9'
                el.style.display = 'none'
              }}
            />
          </div>
        ))}
      </div>

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

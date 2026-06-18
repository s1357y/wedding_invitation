import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Pagination } from 'swiper/modules'
import { X } from 'lucide-react'
import 'swiper/css'
import 'swiper/css/pagination'

interface Entry {
  name: string
  message: string
  ts: number
}

interface Props {
  entries: Entry[]
  onClose: () => void
}

export default function GuestBookViewer({ entries, onClose }: Props) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const handleKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handleKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', handleKey)
    }
  }, [onClose])

  return createPortal(
    <div className="fixed inset-0 z-50 flex flex-col" style={{ background: '#fdfcf9' }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.1rem 1.25rem',
        borderBottom: '1px solid #ede4da',
        background: '#fdfcf9',
        flexShrink: 0,
      }}>
        <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.95rem', fontWeight: 700, color: '#3a2e28', letterSpacing: '0.08em' }}>
          기도편지함
        </span>
        <button
          onClick={onClose}
          style={{ position: 'absolute', right: '1.25rem', color: '#a09080', lineHeight: 1 }}
          aria-label="닫기"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* 카드 슬라이더 */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <Swiper
          modules={[Pagination]}
          pagination={{ clickable: true }}
          style={{ height: '100%' }}
        >
          {entries.map((entry) => (
            <SwiperSlide key={entry.ts}>
              <div style={{
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '2rem 2.5rem 4rem',
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '320px',
                  background: '#fff',
                  border: '1px solid #ede4da',
                  borderRadius: '20px',
                  padding: '2.5rem 2rem',
                  boxShadow: '0 4px 24px rgba(60,40,20,0.06)',
                  textAlign: 'center',
                }}>
                  <p style={{
                    fontFamily: "'Gowun Batang', serif",
                    fontSize: '0.88rem',
                    color: '#5a4a3a',
                    lineHeight: 2,
                    marginBottom: '2rem',
                    whiteSpace: 'pre-wrap',
                    wordBreak: 'break-word',
                  }}>
                    {entry.message}
                  </p>
                  <div style={{ borderTop: '1px dashed #ddd0c4', paddingTop: '1rem' }}>
                    <span style={{
                      fontFamily: "'Gowun Batang', serif",
                      fontSize: '0.8rem',
                      color: '#9a8070',
                    }}>
                      — {entry.name}
                    </span>
                    <span style={{
                      display: 'block',
                      fontFamily: "'Gowun Batang', serif",
                      fontSize: '0.7rem',
                      color: '#bca38a',
                      marginTop: '0.25rem',
                    }}>
                      {new Date(entry.ts).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>,
    document.body
  )
}

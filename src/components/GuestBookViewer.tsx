import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

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
        position: 'relative',
      }}>
        <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.95rem', fontWeight: 700, color: '#3a2e28', letterSpacing: '0.08em' }}>
          편지함
        </span>
        <button
          onClick={onClose}
          style={{ position: 'absolute', right: '1.25rem', color: '#a09080', lineHeight: 1 }}
          aria-label="닫기"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* 스크롤 가능한 리스트 */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1.25rem 1.25rem 3rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '480px', margin: '0 auto' }}>
          {entries.map((entry) => (
            <div
              key={entry.ts}
              style={{
                background: '#fff',
                border: '1px solid #ede4da',
                borderRadius: '16px',
                padding: '1.25rem 1.25rem 1rem',
                boxShadow: '0 2px 12px rgba(60,40,20,0.04)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.85rem', fontWeight: 700, color: '#7a5a3a' }}>
                  {entry.name}
                </span>
                <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.7rem', color: '#bca38a' }}>
                  {new Date(entry.ts).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                </span>
              </div>
              <p style={{
                fontFamily: "'Gowun Batang', serif",
                fontSize: '0.85rem',
                color: '#5a4a3a',
                lineHeight: 1.9,
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                margin: 0,
              }}>
                {entry.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>,
    document.body
  )
}

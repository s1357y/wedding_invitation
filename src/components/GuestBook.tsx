import { useState, useEffect, type FormEvent } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'
import GuestBookViewer from './GuestBookViewer'

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string
const PREVIEW_COUNT = 3

interface Entry {
  name: string
  message: string
  ts: number
}

function formatDate(ts: number) {
  const d = new Date(ts)
  return `${d.getMonth() + 1}월 ${d.getDate()}일`
}

async function fetchEntries(): Promise<Entry[]> {
  try {
    const res = await fetch(`${SHEETS_URL}?type=guestbook`)
    return await res.json()
  } catch {
    return []
  }
}

function WriteModal({ onClose, onSubmit }: { onClose: () => void; onSubmit: (name: string, message: string) => Promise<void> }) {
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = prev }
  }, [])

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    setStatus('loading')
    await onSubmit(name.trim(), message.trim())
    setStatus('success')
    setTimeout(onClose, 1200)
  }

  return createPortal(
    <div className="fixed inset-0 z-60 flex flex-col" style={{ background: '#fdfcf9', zIndex: 60 }}>
      {/* 헤더 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.1rem 1.25rem',
        borderBottom: '1px solid #ede4da',
        background: '#fdfcf9',
        position: 'sticky', top: 0, zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '1rem', fontWeight: 700, color: '#3a2e28', letterSpacing: '0.08em' }}>
          방명록 작성
        </span>
        <button onClick={onClose} style={{ position: 'absolute', right: '1.25rem', color: '#a09080', lineHeight: 1 }} aria-label="닫기">
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* 폼 */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '1.75rem 1.5rem 3rem' }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '1rem', color: '#3a2e28', marginBottom: '0.5rem' }}>
              편지가 전달되었습니다.
            </p>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.85rem', color: '#a08878' }}>
              소중한 마음 감사합니다.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div>
              <label style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.9rem', color: '#4a4a4a', display: 'block', marginBottom: '0.5rem' }}>
                성함
              </label>
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                maxLength={20}
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  border: '1px solid #e2d8ce', borderRadius: '8px',
                  background: '#fff', color: '#4a4a4a',
                  fontFamily: "'Gowun Batang', serif", fontSize: '0.9rem',
                  outline: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '0.5rem' }}>
                <label style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.9rem', color: '#4a4a4a' }}>
                  내용
                </label>
                <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.75rem', color: message.length >= 450 ? '#c0805a' : '#b0a090' }}>
                  {message.length} / 500
                </span>
              </div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                maxLength={500}
                rows={10}
                required
                style={{
                  width: '100%', padding: '0.75rem 1rem',
                  border: '1px solid #e2d8ce', borderRadius: '8px',
                  background: '#fff', color: '#4a4a4a',
                  fontFamily: "'Gowun Batang', serif", fontSize: '0.9rem',
                  outline: 'none', resize: 'none', boxSizing: 'border-box',
                }}
              />
            </div>
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%', padding: '0.95rem',
                borderRadius: '10px', background: '#7a6454',
                color: '#fff', fontFamily: "'Gowun Batang', serif",
                fontSize: '0.9rem', fontWeight: 700, border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.6 : 1,
                letterSpacing: '0.08em',
              }}
            >
              {status === 'loading' ? '전송 중...' : '작성'}
            </button>
          </form>
        )}
      </div>
    </div>,
    document.body
  )
}

export default function GuestBook() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [showForm, setShowForm] = useState(false)
  const [showViewer, setShowViewer] = useState(false)
  const [fetching, setFetching] = useState(true)

  async function load() {
    setFetching(true)
    const data = await fetchEntries()
    if (data.length > 0) setEntries(data)
    setFetching(false)
  }

  useEffect(() => { load() }, [])

  async function handleSubmit(name: string, message: string) {
    const entry: Entry = { name, message, ts: Date.now() }
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'guestbook', ...entry }),
    })
    setEntries(prev => [entry, ...prev])
  }

  const preview = entries.slice(0, PREVIEW_COUNT)

  return (
    <section className="py-16 px-8" style={{ background: '#fdfcf9' }}>
      <div className="max-w-xl mx-auto text-center">
        {/* 헤더 */}
        <p className="text-lg font-serif-theme font-medium mb-2" style={{ color: '#5a3020' }}>편지함</p>
        <p className="text-xs font-light leading-loose mb-8" style={{ color: '#8a7a6a' }}>축하 메시지를 남겨주세요.</p>

        {/* 미리보기 카드 */}
        {!fetching && preview.length > 0 && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem', textAlign: 'left' }}>
            {preview.map(entry => (
              <div
                key={entry.ts}
                style={{
                  background: '#fff',
                  border: '1px solid #ede4da',
                  borderRadius: '14px',
                  padding: '1rem 1.1rem',
                  position: 'relative',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.6rem', marginBottom: '0.4rem' }}>
                  <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.85rem', fontWeight: 700, color: '#7a5a3a' }}>{entry.name}</span>
                  <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.7rem', color: '#aaa090' }}>{formatDate(entry.ts)}</span>
                </div>
                <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.8rem', color: '#5a4a3a', lineHeight: 1.8, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                  {entry.message}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* 하단 버튼 */}
        <button
          onClick={() => setShowForm(true)}
          style={{
            padding: '0.9rem 3rem',
            borderRadius: '12px',
            background: '#7a6454',
            color: '#ffffff',
            fontFamily: "'Gowun Batang', serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            border: 'none',
            cursor: 'pointer',
            letterSpacing: '0.08em',
            marginBottom: '1rem',
          }}
        >
          편지 남기기
        </button>
        {entries.length > 0 && (
          <button
            onClick={() => setShowViewer(true)}
            style={{
              display: 'block', margin: '0 auto',
              background: 'none', border: 'none', cursor: 'pointer',
              fontFamily: "'Gowun Batang', serif", fontSize: '0.75rem',
              color: '#bca38a', letterSpacing: '0.05em',
            }}
          >
            더 보기
          </button>
        )}
      </div>

      {showForm && (
        <WriteModal onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
      )}
      {showViewer && (
        <GuestBookViewer entries={entries} onClose={() => setShowViewer(false)} />
      )}
    </section>
  )
}

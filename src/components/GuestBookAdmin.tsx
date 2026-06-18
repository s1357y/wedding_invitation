import { useState, useEffect, type FormEvent } from 'react'
import { Trash2, RefreshCw } from 'lucide-react'

const SHEETS_URL = import.meta.env.VITE_GOOGLE_SHEETS_URL as string
const ADMIN_PASSWORD = import.meta.env.VITE_ADMIN_PASSWORD as string

interface Entry {
  name: string
  message: string
  ts: number
}

export default function GuestBookAdmin() {
  const [authed, setAuthed] = useState(false)
  const [input, setInput] = useState('')
  const [entries, setEntries] = useState<Entry[]>([])
  const [loading, setLoading] = useState(false)
  const [deletingTs, setDeletingTs] = useState<number | null>(null)

  async function load() {
    setLoading(true)
    try {
      const res = await fetch(`${SHEETS_URL}?type=guestbook`)
      const data = await res.json()
      setEntries(data)
    } catch {
      alert('불러오기 실패. Apps Script URL을 확인해주세요.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (authed) load()
  }, [authed])

  async function handleDelete(ts: number) {
    if (!confirm('이 편지를 삭제하시겠습니까?')) return
    setDeletingTs(ts)
    await fetch(SHEETS_URL, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'guestbook', action: 'delete', ts }),
    })
    // Optimistic removal
    setEntries(prev => prev.filter(e => e.ts !== ts))
    setDeletingTs(null)
    // Sync after delay
    setTimeout(load, 2000)
  }

  function handleLogin(e: FormEvent) {
    e.preventDefault()
    if (input === ADMIN_PASSWORD) {
      setAuthed(true)
    } else {
      alert('비밀번호가 올바르지 않습니다.')
      setInput('')
    }
  }

  if (!authed) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#fdfcf9' }}>
        <form onSubmit={handleLogin} style={{ padding: '2.5rem', width: '100%', maxWidth: '320px' }}>
          <p style={{
            fontFamily: "'Gowun Batang', serif",
            fontSize: '1.1rem',
            color: '#3a2e28',
            textAlign: 'center',
            marginBottom: '1.75rem',
            letterSpacing: '0.08em',
          }}>
            관리자
          </p>
          <input
            type="password"
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="비밀번호"
            autoFocus
            style={{
              width: '100%',
              padding: '0.8rem 1rem',
              border: '1px solid #e2d8ce',
              borderRadius: '10px',
              background: '#fff',
              fontFamily: "'Gowun Batang', serif",
              fontSize: '0.9rem',
              color: '#4a4a4a',
              outline: 'none',
              marginBottom: '0.75rem',
              boxSizing: 'border-box',
            }}
          />
          <button
            type="submit"
            style={{
              width: '100%',
              padding: '0.85rem',
              borderRadius: '10px',
              background: '#7a6454',
              color: '#fff',
              fontFamily: "'Gowun Batang', serif",
              fontSize: '0.9rem',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            확인
          </button>
        </form>
      </div>
    )
  }

  return (
    <div style={{ background: '#fdfcf9', minHeight: '100vh', padding: '2rem 1.5rem' }}>
      <div style={{ maxWidth: '480px', margin: '0 auto' }}>
        {/* 헤더 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '1rem', color: '#3a2e28', fontWeight: 700 }}>
            기도편지함 관리
          </p>
          <button
            onClick={load}
            style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#bca38a', background: 'none', border: 'none', cursor: 'pointer', fontSize: '0.8rem' }}
          >
            <RefreshCw size={13} />
            새로고침
          </button>
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', color: '#8a7a6a', fontSize: '0.85rem', padding: '3rem 0' }}>불러오는 중...</p>
        ) : entries.length === 0 ? (
          <p style={{ textAlign: 'center', color: '#8a7a6a', fontSize: '0.85rem', padding: '3rem 0' }}>편지가 없습니다.</p>
        ) : (
          <>
            <p style={{ fontSize: '0.75rem', color: '#bca38a', marginBottom: '1rem' }}>총 {entries.length}개</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {entries.map(entry => (
                <div
                  key={entry.ts}
                  style={{
                    background: '#fff',
                    border: '1px solid #f0ede9',
                    borderRadius: '14px',
                    padding: '1rem 1.25rem',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '0.75rem',
                    opacity: deletingTs === entry.ts ? 0.4 : 1,
                    transition: 'opacity 0.2s',
                  }}
                >
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                      <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.82rem', fontWeight: 700, color: '#4a4a4a' }}>
                        {entry.name}
                      </span>
                      <span style={{ fontSize: '0.7rem', color: '#8a7a6a' }}>
                        {new Date(entry.ts).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                      </span>
                    </div>
                    <p style={{
                      fontFamily: "'Gowun Batang', serif",
                      fontSize: '0.8rem',
                      color: '#6a5a4a',
                      lineHeight: 1.8,
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}>
                      {entry.message}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(entry.ts)}
                    disabled={deletingTs === entry.ts}
                    style={{ flexShrink: 0, background: 'none', border: 'none', cursor: 'pointer', padding: '2px', marginTop: '2px' }}
                  >
                    <Trash2 size={14} style={{ color: '#c9a0a0' }} />
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

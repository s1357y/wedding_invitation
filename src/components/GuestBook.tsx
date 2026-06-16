import { useState, useEffect, type FormEvent } from 'react'
import { MessageCircleHeart } from 'lucide-react'

const STORAGE_KEY = 'wedding_guestbook'

interface Entry {
  name: string
  message: string
  ts: number
}

function loadEntries(): Entry[] {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
  } catch {
    return []
  }
}

export default function GuestBook() {
  const [entries, setEntries] = useState<Entry[]>([])
  const [name, setName] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  useEffect(() => {
    setEntries(loadEntries())
  }, [])

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!name.trim() || !message.trim()) return
    const next: Entry[] = [{ name: name.trim(), message: message.trim(), ts: Date.now() }, ...loadEntries()]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setEntries(next)
    setName('')
    setMessage('')
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  return (
    <section className="py-16 px-8" style={{ background: '#ffffff' }}>
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <MessageCircleHeart className="w-5 h-5 mx-auto mb-3 opacity-70" style={{ color: '#bca38a' }} aria-hidden />
          <p className="text-[10px] tracking-[0.35em] uppercase font-medium" style={{ color: '#bca38a' }}>
            Guest Book
          </p>
          <p className="text-xs mt-1 font-light" style={{ color: '#8a7a6a' }}>축하 메시지를 남겨주세요</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 mb-8">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="성함"
            maxLength={20}
            required
            className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none"
            style={{ borderColor: '#f0ede9', background: '#fdfcf9', color: '#4a4a4a' }}
          />
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="축하의 말씀을 적어주세요"
            maxLength={200}
            rows={3}
            required
            className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none resize-none"
            style={{ borderColor: '#f0ede9', background: '#fdfcf9', color: '#4a4a4a' }}
          />
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-sm font-medium border transition-colors"
            style={{ borderColor: '#bca38a', color: '#bca38a', background: '#ffffff' }}
          >
            {submitted ? '감사합니다 ♡' : '메시지 남기기'}
          </button>
        </form>

        {entries.length > 0 && (
          <div className="space-y-3">
            {entries.map((entry) => (
              <div
                key={entry.ts}
                className="rounded-xl px-5 py-4 border"
                style={{ background: '#fdfcf9', borderColor: '#f0ede9' }}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium" style={{ color: '#4a4a4a' }}>{entry.name}</span>
                  <span className="text-[10px]" style={{ color: '#8a7a6a' }}>
                    {new Date(entry.ts).toLocaleDateString('ko-KR', { month: 'long', day: 'numeric' })}
                  </span>
                </div>
                <p className="text-xs leading-relaxed font-light" style={{ color: '#6a5a4a' }}>{entry.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

import { useState, type FormEvent } from 'react'
import { wedding } from '../config/wedding'

type Status = 'idle' | 'loading' | 'success' | 'error'

export default function Rsvp() {
  const [status, setStatus] = useState<Status>('idle')
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formspreeId = wedding.rsvp.formspreeId
    if (!formspreeId) {
      alert('RSVP 설정이 완료되지 않았습니다. (VITE_FORMSPREE_ID 필요)')
      return
    }

    setStatus('loading')
    const form = e.currentTarget
    const data = Object.fromEntries(new FormData(form).entries())

    try {
      const res = await fetch(`https://formspree.io/f/${formspreeId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(data),
      })
      if (!res.ok) throw new Error('서버 오류')
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'success') {
    return (
      <section className="px-6 py-20 bg-theme-bg text-center">
        <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-10">RSVP</p>
        <p className="text-theme-text text-lg font-serif-theme mb-2">참석 의사를 전달해 주셨습니다.</p>
        <p className="text-theme-muted text-sm">소중한 답변 감사합니다.</p>
      </section>
    )
  }

  return (
    <section className="px-6 py-20 bg-theme-bg">
      <p className="font-serif-theme text-sm tracking-[0.25em] text-theme-accent uppercase mb-2 text-center">
        RSVP
      </p>
      <p className="text-theme-muted text-xs text-center mb-10">
        참석 여부를 {wedding.rsvp.deadline}까지 알려주세요.
      </p>

      <form onSubmit={handleSubmit} className="max-w-sm mx-auto space-y-4">
        <input
          name="name"
          required
          placeholder="성함"
          className="w-full border border-theme-border rounded-xl px-4 py-3 text-sm bg-theme-surface text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-theme-accent"
        />

        <input
          name="phone"
          placeholder="연락처 (선택)"
          className="w-full border border-theme-border rounded-xl px-4 py-3 text-sm bg-theme-surface text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-theme-accent"
        />

        <div className="flex gap-3">
          {(['yes', 'no'] as const).map((val) => (
            <label
              key={val}
              className={`flex-1 flex items-center justify-center py-3 rounded-xl border text-sm cursor-pointer transition-colors ${
                attendance === val
                  ? 'border-theme-accent bg-theme-accent text-white'
                  : 'border-theme-border bg-theme-surface text-theme-muted'
              }`}
            >
              <input
                type="radio"
                name="attendance"
                value={val}
                required
                className="sr-only"
                onChange={() => setAttendance(val)}
              />
              {val === 'yes' ? '참석' : '불참'}
            </label>
          ))}
        </div>

        <input
          name="guests"
          placeholder="참석 인원 (선택)"
          type="number"
          min="1"
          className="w-full border border-theme-border rounded-xl px-4 py-3 text-sm bg-theme-surface text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-theme-accent"
        />

        <textarea
          name="message"
          placeholder="축하 메시지 (선택)"
          rows={3}
          className="w-full border border-theme-border rounded-xl px-4 py-3 text-sm bg-theme-surface text-theme-text placeholder:text-theme-muted focus:outline-none focus:border-theme-accent resize-none"
        />

        {status === 'error' && (
          <p className="text-red-400 text-xs text-center">
            전송에 실패했습니다. 잠시 후 다시 시도해 주세요.
          </p>
        )}

        <button
          type="submit"
          disabled={status === 'loading'}
          className="w-full py-4 rounded-xl bg-theme-accent text-white text-sm font-medium tracking-widest disabled:opacity-50"
        >
          {status === 'loading' ? '전송 중...' : '참석 의사 전달하기'}
        </button>
      </form>
    </section>
  )
}

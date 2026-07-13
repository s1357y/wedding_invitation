import { useState, type FormEvent } from 'react'
import { ChevronRight } from 'lucide-react'
import { wedding } from '../config/wedding'

type Status = 'idle' | 'open' | 'loading' | 'success' | 'error'

export default function Rsvp() {
  const [status, setStatus] = useState<Status>('idle')
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('')

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formspreeId = wedding.rsvp.formspreeId
    if (!formspreeId) {
      alert('RSVP 설정이 완료되지 않았습니다.')
      return
    }
    const data = Object.fromEntries(new FormData(e.currentTarget).entries())
    setStatus('success')
    fetch(`https://formspree.io/f/${formspreeId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(data),
    }).catch(() => {})
  }

  return (
    <section className="py-16 px-8" style={{ background: '#fdfcf9' }}>
      <div className="max-w-md mx-auto">
        {status === 'success' ? (
          <div className="text-center py-8">
            <p className="font-serif-theme text-lg mb-2" style={{ color: '#4a4a4a' }}>
              참석 의사를 전달해 주셨습니다.
            </p>
            <p className="text-sm font-light" style={{ color: '#8a7a6a' }}>소중한 답변 감사합니다.</p>
          </div>
        ) : status === 'idle' ? (
          <button
            onClick={() => setStatus('open')}
            className="w-full rounded-3xl p-8 shadow-sm text-center group transition-all hover:shadow-md border"
            style={{ background: '#ffffff', borderColor: '#f0ede9' }}
          >
            <h2 className="text-lg font-serif-theme mb-2" style={{ color: '#4a4a4a' }}>
              참석 여부 전달
            </h2>
            <div className="w-8 mx-auto mb-4 opacity-50" style={{ height: '1px', background: '#bca38a' }} />
            <p className="text-sm font-light leading-relaxed mb-6 whitespace-pre-line" style={{ color: '#6a5a4a' }}>
              {'귀한 발걸음, 정성껏 맞이하고 싶습니다.\n'}{wedding.rsvp.description ?? `${wedding.rsvp.deadline}까지 참석 여부를 알려주시면 감사하겠습니다.`}
            </p>
            <span
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-widest"
              style={{ color: '#bca38a' }}
            >
              의사 전달하기
              <ChevronRight className="w-3 h-3" aria-hidden />
            </span>
          </button>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <h2 className="text-lg font-serif-theme text-center mb-6" style={{ color: '#4a4a4a' }}>
              참석 여부 전달
            </h2>
            {[
              { name: 'name', placeholder: '성함', required: true },
              { name: 'phone', placeholder: '연락처 (선택)', required: false },
            ].map(({ name, placeholder, required }) => (
              <input
                key={name}
                name={name}
                placeholder={placeholder}
                required={required}
                className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none"
                style={{ borderColor: '#f0ede9', background: '#ffffff', color: '#4a4a4a' }}
              />
            ))}
            <div className="flex gap-3">
              {(['yes', 'no'] as const).map((val) => (
                <label
                  key={val}
                  className="flex-1 flex items-center justify-center py-3 rounded-xl border text-sm cursor-pointer transition-colors"
                  style={{
                    borderColor: attendance === val ? '#bca38a' : '#f0ede9',
                    background: attendance === val ? '#bca38a' : '#ffffff',
                    color: attendance === val ? '#ffffff' : '#8a7a6a',
                  }}
                >
                  <input
                    type="radio" name="attendance" value={val} required className="sr-only"
                    onChange={() => setAttendance(val)}
                  />
                  {val === 'yes' ? '참석' : '불참'}
                </label>
              ))}
            </div>
            <input
              name="guests" placeholder="참석 인원 (선택)" type="number" min="1"
              className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none"
              style={{ borderColor: '#f0ede9', background: '#ffffff', color: '#4a4a4a' }}
            />
            <textarea
              name="message" placeholder="축하 메시지 (선택)" rows={3}
              className="w-full rounded-xl px-4 py-3 text-sm border focus:outline-none resize-none"
              style={{ borderColor: '#f0ede9', background: '#ffffff', color: '#4a4a4a' }}
            />
            {status === 'error' && (
              <p className="text-red-400 text-xs text-center">전송에 실패했습니다. 잠시 후 다시 시도해 주세요.</p>
            )}
            <button
              type="submit" disabled={status === 'loading'}
              className="w-full py-4 rounded-xl text-white text-sm font-medium tracking-widest disabled:opacity-50"
              style={{ background: '#bca38a' }}
            >
              {status === 'loading' ? '전송 중...' : '의사 전달하기'}
            </button>
          </form>
        )}
      </div>
    </section>
  )
}

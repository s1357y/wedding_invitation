import { useState, type FormEvent } from 'react'
import { X } from 'lucide-react'
import { wedding } from '../config/wedding'

interface Props {
  onClose: () => void
}

function ToggleBtn({
  selected, onClick, children,
}: {
  selected: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      style={{
        flex: 1,
        padding: '0.72rem 0.5rem',
        border: `1px solid ${selected ? '#c9a98a' : '#e2d8ce'}`,
        borderRadius: '8px',
        background: selected ? '#f5ede3' : '#ffffff',
        color: selected ? '#6a4a2a' : '#a09080',
        fontFamily: "'Gowun Batang', serif",
        fontSize: '0.85rem',
        fontWeight: selected ? 700 : 400,
        cursor: 'pointer',
        transition: 'all 0.15s',
      }}
    >
      {children}
    </button>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.75rem 1rem',
  border: '1px solid #e2d8ce',
  borderRadius: '8px',
  background: '#ffffff',
  color: '#4a3a2a',
  fontFamily: "'Gowun Batang', serif",
  fontSize: '0.85rem',
  outline: 'none',
}

const labelStyle = {
  fontFamily: "'Gowun Batang', serif",
  fontSize: '0.85rem',
  color: '#4a3a2a',
  marginBottom: '0.5rem',
  display: 'block',
}

const requiredDot = (
  <span style={{ color: '#c97a6a', marginLeft: '3px' }}>*</span>
)

export default function RsvpPage({ onClose }: Props) {
  const [side, setSide] = useState<'groom' | 'bride' | ''>('')
  const [attendance, setAttendance] = useState<'yes' | 'no' | ''>('')
  const [meal, setMeal] = useState<'yes' | 'no' | 'undecided' | ''>('')
  const [name, setName] = useState('')
  const [companion, setCompanion] = useState('')
  const [message, setMessage] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  function validate() {
    if (!side) { alert('어느 측 하객인지 선택해주세요.'); return false }
    if (!attendance) { alert('참석여부를 선택해주세요.'); return false }
    if (!meal) { alert('식사여부를 선택해주세요.'); return false }
    if (!name.trim()) { alert('성함을 입력해주세요.'); return false }
    return true
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!validate()) return

    const sheetsUrl = import.meta.env.VITE_GOOGLE_SHEETS_URL as string | undefined
    if (!sheetsUrl || sheetsUrl.includes('여기에')) {
      alert('Google Sheets URL을 .env에 설정해주세요.')
      return
    }

    setStatus('loading')
    try {
      await fetch(sheetsUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          측: side === 'groom' ? '신랑 측' : '신부 측',
          참석여부: attendance === 'yes' ? '참석' : '불참',
          식사여부: meal === 'yes' ? '○' : meal === 'no' ? '×' : '미정',
          성함: name,
          동행인: companion,
          전달사항: message,
        }),
      })
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return (
    <div
      className="fixed inset-0 z-60 flex flex-col"
      style={{ background: '#fdfcf9', zIndex: 60 }}
    >
      {/* 헤더 */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '1.1rem 1.25rem',
        borderBottom: '1px solid #ede4da',
        position: 'sticky', top: 0,
        background: '#fdfcf9',
        zIndex: 1,
      }}>
        <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '1rem', fontWeight: 700, color: '#3a2e28', letterSpacing: '0.08em' }}>
          참석 여부 전달
        </span>
        <button
          onClick={onClose}
          style={{ position: 'absolute', right: '1.25rem', color: '#a09080', lineHeight: 1 }}
          aria-label="닫기"
        >
          <X size={20} strokeWidth={1.5} />
        </button>
      </div>

      {/* 폼 또는 완료 */}
      <div style={{ overflowY: 'auto', flex: 1, padding: '1.75rem 1.5rem 3rem' }}>
        {status === 'success' ? (
          <div style={{ textAlign: 'center', paddingTop: '4rem' }}>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '1.05rem', color: '#3a2e28', marginBottom: '0.75rem' }}>
              참석 의사를 전달해 주셨습니다.
            </p>
            <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.85rem', color: '#a08878', marginBottom: '2.5rem' }}>
              소중한 답변 감사합니다.
            </p>
            <button
              onClick={onClose}
              style={{
                padding: '0.85rem 2.5rem',
                borderRadius: '10px',
                background: '#7a6454',
                color: '#fff',
                fontFamily: "'Gowun Batang', serif",
                fontSize: '0.88rem',
                fontWeight: 700,
                border: 'none',
                cursor: 'pointer',
                letterSpacing: '0.08em',
              }}
            >
              닫기
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>

            {/* 어느 측 하객 */}
            <div>
              <label style={labelStyle}>어느 측 하객이신가요? {requiredDot}</label>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <ToggleBtn selected={side === 'groom'} onClick={() => setSide('groom')}>신랑</ToggleBtn>
                <ToggleBtn selected={side === 'bride'} onClick={() => setSide('bride')}>신부</ToggleBtn>
              </div>
            </div>

            {/* 참석여부 */}
            <div>
              <label style={labelStyle}>참석여부 {requiredDot}</label>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <ToggleBtn selected={attendance === 'yes'} onClick={() => setAttendance('yes')}>참석</ToggleBtn>
                <ToggleBtn selected={attendance === 'no'} onClick={() => setAttendance('no')}>불참석</ToggleBtn>
              </div>
            </div>

            {/* 식사여부 */}
            <div>
              <label style={labelStyle}>식사여부 {requiredDot}</label>
              <div style={{ display: 'flex', gap: '0.6rem' }}>
                <ToggleBtn selected={meal === 'yes'} onClick={() => setMeal('yes')}>○</ToggleBtn>
                <ToggleBtn selected={meal === 'no'} onClick={() => setMeal('no')}>×</ToggleBtn>
                <ToggleBtn selected={meal === 'undecided'} onClick={() => setMeal('undecided')}>미정</ToggleBtn>
              </div>
            </div>

            {/* 성함 */}
            <div>
              <label style={labelStyle}>성함 {requiredDot}</label>
              <input
                style={inputStyle}
                placeholder="성함을 입력해주세요"
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </div>

            {/* 동행인 성함 */}
            <div>
              <label style={labelStyle}>동행인 성함</label>
              <input
                style={inputStyle}
                placeholder="동행인이 있으시면 입력해주세요"
                value={companion}
                onChange={e => setCompanion(e.target.value)}
              />
            </div>

            {/* 전달사항 */}
            <div>
              <label style={labelStyle}>전달사항</label>
              <textarea
                style={{ ...inputStyle, resize: 'none', minHeight: '7rem' }}
                placeholder="전달하실 말씀이 있으시면 입력해주세요"
                value={message}
                onChange={e => setMessage(e.target.value)}
              />
            </div>

            {status === 'error' && (
              <p style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.8rem', color: '#c97a6a', textAlign: 'center' }}>
                전송에 실패했습니다. 잠시 후 다시 시도해주세요.
              </p>
            )}

            {/* 전달 버튼 */}
            <button
              type="submit"
              disabled={status === 'loading'}
              style={{
                width: '100%',
                padding: '0.95rem',
                borderRadius: '10px',
                background: '#7a6454',
                color: '#fff',
                fontFamily: "'Gowun Batang', serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.1em',
                border: 'none',
                cursor: status === 'loading' ? 'not-allowed' : 'pointer',
                opacity: status === 'loading' ? 0.6 : 1,
                marginTop: '0.5rem',
              }}
            >
              {status === 'loading' ? '전송 중...' : '전달'}
            </button>

          </form>
        )}
      </div>
    </div>
  )
}

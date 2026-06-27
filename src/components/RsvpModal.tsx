import { X, Calendar, MapPin } from 'lucide-react'
import { wedding } from '../config/wedding'

const { groom, bride, date, venue } = wedding

interface Props {
  onClose: () => void
  onConfirm: () => void
  onHideToday: () => void
}

export default function RsvpModal({ onClose, onConfirm, onHideToday }: Props) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-5"
      style={{ background: 'rgba(40, 30, 25, 0.5)', backdropFilter: 'blur(3px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl shadow-2xl"
        style={{ background: '#fdfcf9', padding: '2rem 1.75rem 1.6rem' }}
        onClick={e => e.stopPropagation()}
      >
        {/* X 닫기 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4"
          style={{ color: '#b0a090', padding: '4px', lineHeight: 1 }}
          aria-label="닫기"
        >
          <X size={18} strokeWidth={1.5} />
        </button>

        {/* 제목 */}
        <p style={{
          fontFamily: "'Gowun Batang', serif",
          fontSize: '1.1rem',
          fontWeight: 700,
          color: '#3a2e28',
          textAlign: 'center',
          letterSpacing: '0.1em',
          marginBottom: '1.5rem',
        }}>
          참석 여부 전달
        </p>

        {/* 본문 */}
        <p style={{
          fontFamily: "'Gowun Batang', serif",
          fontSize: '0.83rem',
          color: '#5a4a3a',
          textAlign: 'center',
          lineHeight: '2',
          marginBottom: '1.5rem',
        }}>
          귀한 발걸음, 정성껏 맞이하고 싶습니다.<br />
          동행인 수와 식사 여부 조사를 위해<br />
          참석 여부를 알려주시면<br />
          더욱 감사하겠습니다.
        </p>

        {/* 점선 구분선 */}
        <div style={{ borderTop: '1px dashed #ddd0c4', marginBottom: '1.4rem' }} />

        {/* 예식 정보 */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', marginBottom: '1.75rem', paddingLeft: '0.25rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <svg viewBox="0 0 32 29" style={{ width: '0.85rem', height: '0.85rem', flexShrink: 0 }} xmlns="http://www.w3.org/2000/svg">
              <path d="M16 27 C16 27 2 18 2 9.5 C2 5.36 5.36 2 9.5 2 C12.04 2 14.28 3.28 16 5.18 C17.72 3.28 19.96 2 22.5 2 C26.64 2 30 5.36 30 9.5 C30 18 16 27 16 27Z" fill="#c9a98a" />
            </svg>
            <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.82rem', color: '#5a4a3a' }}>
              <span style={{ color: '#9a7a60' }}>신랑</span> {groom.name} &nbsp;·&nbsp; <span style={{ color: '#9a7a60' }}>신부</span> {bride.name}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
            <Calendar size={13} strokeWidth={1.5} style={{ color: '#c9a98a', flexShrink: 0 }} />
            <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.82rem', color: '#5a4a3a' }}>
              {date.year}년 {date.month}월 {date.day}일 {date.dayOfWeek} {date.time}
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.65rem' }}>
            <MapPin size={13} strokeWidth={1.5} style={{ color: '#c9a98a', flexShrink: 0, marginTop: '2px' }} />
            <span style={{ fontFamily: "'Gowun Batang', serif", fontSize: '0.82rem', color: '#5a4a3a', lineHeight: 1.6 }}>
              {venue.name}<br />{venue.hall}
            </span>
          </div>
        </div>

        {/* 참석 의사 전달 버튼 */}
        <button
          onClick={onConfirm}
          style={{
            width: '100%',
            padding: '0.9rem',
            borderRadius: '12px',
            background: '#7a6454',
            color: '#fff',
            fontFamily: "'Gowun Batang', serif",
            fontSize: '0.9rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            border: 'none',
            cursor: 'pointer',
            marginBottom: '1rem',
          }}
        >
          참석 의사 전달하기
        </button>

        {/* 오늘 하루 보지않기 */}
        <button
          onClick={onHideToday}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            margin: '0 auto',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#b0a090',
            fontFamily: "'Gowun Batang', serif",
            fontSize: '0.73rem',
          }}
        >
          <span style={{
            width: '14px', height: '14px',
            border: '1px solid #c9b8a8',
            borderRadius: '50%',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg viewBox="0 0 10 10" width="7" height="7">
              <path d="M1.5 5l2.5 2.5 4.5-4.5" stroke="#c9a98a" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          오늘 하루 보지않기
        </button>
      </div>
    </div>
  )
}
